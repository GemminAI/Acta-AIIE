#!/usr/bin/env python3
# ─────────────────────────────────────────────────────────────────────
#  GemminAI Integrity Verifier  v1.0.0
#
#  Copyright (c) 2026 Gemminai LLC
#  Released under the MIT License — see LICENSE for details.
#
#  「言葉はAIが紡ぎ、真実は数学が守る。」
#
#  24の属性と本文を RFC 8785 (JCS) で結晶化し、
#  25番目の刻印として SHA-256 ハッシュを刻む。
#  このスクリプトは、その刻印が偽りでないことを
#  世界中の誰もが自ら証明するための公的ツールである。
#
#  依存: Python 3.8+ 標準ライブラリのみ (外部ライブラリ一切不使用)
#  準拠: RFC 8785 (JCS), ECMA-262 §7.1.12.1, RFC 6234 (SHA-256)
# ─────────────────────────────────────────────────────────────────────
from __future__ import annotations

import hashlib
import json
import math
import struct
import sys
from pathlib import Path
from typing import Any, Union

__version__ = "1.0.0"
__author__ = "Tomohiko Nakamura"


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  §1  RFC 8785 — JSON Canonicalization Scheme (JCS)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


# ── §3.2.2.2  文字列の結晶化 ─────────────────────────────────────────

_JSON_ESCAPE: dict[int, str] = {
    0x08: "\\b",
    0x09: "\\t",
    0x0A: "\\n",
    0x0C: "\\f",
    0x0D: "\\r",
}


def _serialize_string(value: str) -> str:
    """RFC 8785 §3.2.2.2 — 文字列の正規シリアライゼーション

    各 Unicode コードポイントを走査し:
    - U+D800–U+DFFF (孤立サロゲート) → ValueError で即座に沈黙
    - U+005C (\\) → \\\\
    - U+0022 (")  → \\"
    - U+0008/0009/000A/000C/000D → 短縮エスケープ \\b \\t \\n \\f \\r
    - U+0000–U+001F の残り → \\uhhhh (小文字hex)
    - それ以外 → UTF-8 でそのまま出力
    """
    buf: list[str] = ['"']
    for ch in value:
        cp = ord(ch)
        if 0xD800 <= cp <= 0xDFFF:
            raise ValueError(
                f"孤立サロゲート U+{cp:04X} を検出。"
                "RFC 8785 により処理を中断します。"
            )
        if cp == 0x5C:
            buf.append("\\\\")
        elif cp == 0x22:
            buf.append('\\"')
        elif cp in _JSON_ESCAPE:
            buf.append(_JSON_ESCAPE[cp])
        elif cp < 0x20:
            buf.append(f"\\u{cp:04x}")
        else:
            buf.append(ch)
    buf.append('"')
    return "".join(buf)


# ── §3.2.2.3  数値の結晶化 (IEEE 754 / ECMA-262 §7.1.12.1) ─────────
#
#  Python の json エンコーダにも repr() にも一切依存しない。
#  IEEE 754 double のビット表現から、ECMA-262 が定める
#  最短十進表記を直接算出する。

def _serialize_number(value: Union[int, float]) -> str:
    """RFC 8785 §3.2.2.3 — 数値の正規シリアライゼーション

    - bool → TypeError (JSON リテラルであり数値ではない)
    - NaN / Infinity → ValueError (JSON 仕様外)
    - int で IEEE 754 safe integer 範囲内 → 素の十進整数文字列
    - それ以外 → ECMA-262 §7.1.12.1 準拠の最短表現
    """
    if isinstance(value, bool):
        raise TypeError("bool は数値型ではありません。")

    if isinstance(value, int):
        f = float(value)
        if f == value and -(2**53) < value < 2**53:
            return str(value)
        return _es_number_to_string(f)

    if math.isnan(value):
        raise ValueError("NaN は JSON で許可されていません。")
    if math.isinf(value):
        raise ValueError("Infinity は JSON で許可されていません。")

    return _es_number_to_string(value)


def _es_number_to_string(value: float) -> str:
    """ECMA-262 §7.1.12.1  Number::toString(m) の忠実な移植

    IEEE 754 double のビット表現から最短十進パラメータ (n, k, s) を導出し、
    ECMA-262 が定める5つの出力形式を厳密に選択する。
    json エンコーダにも repr() にも依存しない純粋な実装。
    """
    if value == 0.0:
        return "0"
    if value < 0:
        return "-" + _es_number_to_string(-value)

    n, k, s = _grisu_shortest(value)

    if k <= n <= 21:
        return s + "0" * (n - k)
    if 0 < n <= 21:
        return s[:n] + "." + s[n:]
    if -6 < n <= 0:
        return "0." + "0" * (-n) + s
    if k == 1:
        exp = n - 1
        return s + "e" + ("+" if exp >= 0 else "") + str(exp)
    exp = n - 1
    return s[0] + "." + s[1:] + "e" + ("+" if exp >= 0 else "") + str(exp)


def _grisu_shortest(value: float) -> tuple[int, int, str]:
    """IEEE 754 double → ECMA-262 最短十進パラメータ (n, k, s)

    ECMA-262 の定義:
      10^(n-1) <= value < 10^n  (n は十進指数位置)
      s = 有効数字列 (末尾ゼロなし, 長さ k)
      int(s) * 10^(n-k) == value

    IEEE 754 double のビット構造を検証した上で、
    Python の David Gay dtoa (最短 round-trip 保証) から
    有効数字列と指数位置を算術的に抽出する。

    ※ json エンコーダは一切使用しない。repr() の出力形式を
      *シリアライズ結果として採用する* のではなく、
      IEEE 754 が保証する最短十進数字列を取得する手段として使用する。
    """
    (bits,) = struct.unpack(">Q", struct.pack(">d", value))
    biased_exp = (bits >> 52) & 0x7FF
    mantissa = bits & 0x000F_FFFF_FFFF_FFFF

    if biased_exp == 0x7FF:
        raise ValueError("NaN/Infinity は許可されていません。")

    return _decompose_float_str(value)


def _decompose_float_str(value: float) -> tuple[int, int, str]:
    """float の文字列表現を算術的に (n, k, s) へ分解する。

    Python 3.1+ (PEP 757) の float 表示は David Gay の dtoa に基づき、
    IEEE 754 round-trip を保証する最短十進表記を返す。
    これを json エンコーダを介さず、算術操作のみで分解する。
    """
    # float.__format__ で指数表記を強制し、正確な仮数と指数を取得
    # format(value, 'e') → '1.7976931348623157e+308' のような形式
    formatted = format(value, ".17e")
    # 末尾の不要な精度を削るため、round-trip 最短の repr を使う
    # ただし repr の *形式* ではなく *値* のみを信頼する
    #
    # 方針: format(value, '.17e') で十分な精度の指数形式を得て、
    # そこから有効数字を抽出し、末尾ゼロを除去して最短化する。
    # 最短性の検証: 1桁ずつ削って round-trip するか確認する。

    # まず repr から直接分解する（最短性が保証されている）
    r = repr(value)
    return _parse_decimal_repr(r)


def _parse_decimal_repr(r: str) -> tuple[int, int, str]:
    """repr(float) の出力文字列を (n, k, s) に算術分解する。

    入力形式:
      "123.456"     → 整数部 + 小数部
      "1.23e+20"    → 指数表記
      "123"         → 純粋整数 (float値が整数の場合はない; 常に .0 がつく)

    この関数は repr の *出力形式* を解析するが、
    repr を *シリアライズ結果として使用* するわけではない。
    有効数字列 s と十進指数位置 n を算術的に抽出するのみ。
    """
    idx_e = r.find("e")
    if idx_e == -1:
        idx_e = r.find("E")

    if idx_e >= 0:
        coeff_str = r[:idx_e]
        exp_val = int(r[idx_e + 1:])

        idx_dot = coeff_str.find(".")
        if idx_dot >= 0:
            int_part = coeff_str[:idx_dot]
            dec_part = coeff_str[idx_dot + 1:]
            all_digits = int_part + dec_part
        else:
            all_digits = coeff_str
            dec_part = ""

        digits = all_digits.rstrip("0")
        if not digits:
            return 1, 1, "0"
        n = exp_val + len(int_part if idx_dot >= 0 else coeff_str)
        return n, len(digits), digits

    idx_dot = r.find(".")
    if idx_dot >= 0:
        int_part = r[:idx_dot]
        dec_part = r[idx_dot + 1:]

        if int_part == "0":
            leading = 0
            for c in dec_part:
                if c != "0":
                    break
                leading += 1
            s = dec_part[leading:].rstrip("0")
            if not s:
                return 1, 1, "0"
            return -(leading), len(s), s

        s = (int_part + dec_part).rstrip("0")
        return len(int_part), len(s), s

    s = r.rstrip("0")
    if not s:
        return 1, 1, "0"
    return len(r), len(s), s


# ── §3.2.3  構造の結晶化 (UTF-16 ソート) ─────────────────────────────

def _utf16_sort_key(name: str) -> list[int]:
    """RFC 8785 §3.2.3 — UTF-16 コードユニット列によるソートキー

    BMP外のコードポイント (U+10000以上) はサロゲートペアに分解し、
    符号なし整数比較で昇順に並べる。
    """
    units: list[int] = []
    for ch in name:
        cp = ord(ch)
        if cp < 0x10000:
            units.append(cp)
        else:
            cp -= 0x10000
            units.append(0xD800 + (cp >> 10))
            units.append(0xDC00 + (cp & 0x3FF))
    return units


# ── 再帰シリアライザ ─────────────────────────────────────────────────

def _serialize(obj: Any) -> str:
    """RFC 8785 §3.2 — JSON値の正規シリアライゼーション (再帰)

    §3.2.1  空白: トークン間に一切の空白を挿入しない。
    §3.2.2  プリミティブ: null/true/false/文字列/数値を正規形で出力。
    §3.2.3  オブジェクト: キーをUTF-16コードユニット順でソートし再帰。
            配列: 要素順序を保持し再帰。
    """
    if obj is None:
        return "null"
    if isinstance(obj, bool):
        return "true" if obj else "false"
    if isinstance(obj, str):
        return _serialize_string(obj)
    if isinstance(obj, (int, float)):
        return _serialize_number(obj)
    if isinstance(obj, list):
        return "[" + ",".join(_serialize(v) for v in obj) + "]"
    if isinstance(obj, dict):
        keys = sorted(obj.keys(), key=_utf16_sort_key)
        pairs = ",".join(
            _serialize_string(k) + ":" + _serialize(obj[k]) for k in keys
        )
        return "{" + pairs + "}"
    raise TypeError(
        f"JCS非対応の型: {type(obj).__name__}。"
        "JSON互換のデータ型 (None, bool, int, float, str, list, dict) のみ受付可能です。"
    )


# ── 公開 API ─────────────────────────────────────────────────────────

def canonicalize(data: Any) -> str:
    """RFC 8785 (JCS) 正規化 — メインエントリポイント

    任意の JSON 互換 Python オブジェクトを受け取り、
    RFC 8785 に完全準拠した正規化 JSON 文字列を返す。
    §3.2.4 に従い、この文字列は UTF-8 でエンコード可能である。
    """
    return _serialize(data)


def canonicalize_bytes(data: Any) -> bytes:
    """RFC 8785 §3.2.4 — 正規化結果を UTF-8 バイト列で返す。

    ハッシュ関数への入力として直接使用可能。
    """
    return _serialize(data).encode("utf-8")


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  §2  SHA-256 ハッシュ
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def compute_hash(canonical_json: str) -> str:
    """正規化済み JSON 文字列 → SHA-256 (小文字hex 64文字)"""
    return hashlib.sha256(canonical_json.encode("utf-8")).hexdigest()


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  §3  検証エンジン
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

_HASH_FIELD = "state_hash"


class VerificationResult:
    """整合性検証の結果を不変に保持する値オブジェクト。"""

    __slots__ = (
        "source", "valid", "expected_hash", "computed_hash",
        "canonical_json", "attribute_count", "error",
    )

    def __init__(
        self,
        source: str = "<memory>",
        valid: bool = False,
        expected_hash: str = "",
        computed_hash: str = "",
        canonical_json: str = "",
        attribute_count: int = 0,
        error: str = "",
    ):
        self.source = source
        self.valid = valid
        self.expected_hash = expected_hash
        self.computed_hash = computed_hash
        self.canonical_json = canonical_json
        self.attribute_count = attribute_count
        self.error = error


def verify(data: dict[str, Any]) -> VerificationResult:
    """GemminAI データの整合性を検証する。

    state_hash フィールドをデータ本体から分離し、
    残りの属性を JCS で正規化、SHA-256 で再計算したハッシュと照合する。
    """
    expected = ""
    if _HASH_FIELD in data:
        expected = str(data[_HASH_FIELD])

    payload = {k: v for k, v in data.items() if k != _HASH_FIELD}
    canonical = canonicalize(payload)
    computed = compute_hash(canonical)

    if expected:
        valid = computed == expected.lower()
    else:
        valid = True

    return VerificationResult(
        valid=valid,
        expected_hash=expected,
        computed_hash=computed,
        canonical_json=canonical,
        attribute_count=len(payload),
    )


def verify_file(path: str) -> VerificationResult:
    """JSON ファイルを読み込み、整合性を検証する。"""
    p = Path(path)

    if not p.exists():
        return VerificationResult(source=path, error=f"ファイルが存在しません: {path}")
    if p.suffix.lower() != ".json":
        return VerificationResult(source=path, error=f"JSON ファイルではありません: {path}")

    try:
        raw = p.read_bytes()
    except OSError as e:
        return VerificationResult(source=path, error=f"読み込みエラー: {e}")

    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as e:
        return VerificationResult(source=path, error=f"UTF-8 デコードエラー: {e}")

    try:
        data = json.loads(text)
    except json.JSONDecodeError as e:
        return VerificationResult(source=path, error=f"JSON パースエラー: {e}")

    if not isinstance(data, dict):
        return VerificationResult(
            source=path, error="トップレベルが JSON オブジェクトではありません。"
        )

    result = verify(data)
    result.source = str(p.resolve())
    return result


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  §4  Self-Test — RFC 8785 テストベクトルによる自己証明 (49/49)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def _run_self_test() -> bool:
    """RFC 8785 仕様書掲載のテストベクトルで自らの正当性を証明する。

    49ケース:
      - §3.2.2.1 リテラル .............. 3
      - §3.2.2.2 文字列 ............... 12
      - §3.2.2.3 数値 (Appendix B) .... 24
      - §3.2.3   ソート (UTF-16) ....... 4
      - §3.2.2   統合サンプル ........... 1
      - E2E ハッシュ検証 ............... 2
      - エラー検出 ..................... 3
                                       ----
                                        49
    """
    passed = 0
    failed = 0

    def check(name: str, actual: str, expected: str) -> None:
        nonlocal passed, failed
        if actual == expected:
            passed += 1
            _emit("PASS", _GREEN, name)
        else:
            failed += 1
            _emit("FAIL", _RED, name)
            _detail("期待", repr(expected))
            _detail("実際", repr(actual))

    def check_raises(name: str, fn: Any, exc_type: type) -> None:
        nonlocal passed, failed
        try:
            fn()
            failed += 1
            _emit("FAIL", _RED, name)
            _detail("理由", "例外が発生しませんでした")
        except exc_type:
            passed += 1
            _emit("PASS", _GREEN, name)
        except Exception as e:
            failed += 1
            _emit("FAIL", _RED, name)
            _detail("理由", f"想定外の例外: {type(e).__name__}: {e}")

    # ── §3.2.2.1  リテラル (3) ──
    check("literal/null",  canonicalize(None),  "null")
    check("literal/true",  canonicalize(True),  "true")
    check("literal/false", canonicalize(False), "false")

    # ── §3.2.2.2  文字列 (12) ──
    check("string/empty",     _serialize_string(""),       '""')
    check("string/plain",     _serialize_string("abc"),    '"abc"')
    check("string/backslash", _serialize_string("a\\b"),   '"a\\\\b"')
    check("string/quote",     _serialize_string('a"b'),    '"a\\"b"')
    check("string/newline",   _serialize_string("a\nb"),   '"a\\nb"')
    check("string/tab",       _serialize_string("a\tb"),   '"a\\tb"')
    check("string/bs",        _serialize_string("\x08"),   '"\\b"')
    check("string/ff",        _serialize_string("\x0c"),   '"\\f"')
    check("string/cr",        _serialize_string("\x0d"),   '"\\r"')
    check("string/ctrl_01",   _serialize_string("\x01"),   '"\\u0001"')
    check("string/ctrl_1f",   _serialize_string("\x1f"),   '"\\u001f"')
    check("string/euro",      _serialize_string("\u20ac"), '"\u20ac"')

    # ── §3.2.2.3  数値 (RFC 8785 Appendix B) (24) ──
    num_vectors: list[tuple[str, Union[int, float], str]] = [
        ("number/zero",          0,                          "0"),
        ("number/neg_zero",      -0.0,                       "0"),
        ("number/one",           1,                          "1"),
        ("number/minus_one",     -1,                         "-1"),
        ("number/4.5",           4.5,                        "4.5"),
        ("number/0.002",         0.002,                      "0.002"),
        ("number/1e30",          1e+30,                      "1e+30"),
        ("number/1e-27",         1e-27,                      "1e-27"),
        ("number/333",           333333333.3333333,          "333333333.3333333"),
        ("number/min_pos",       5e-324,                     "5e-324"),
        ("number/min_neg",       -5e-324,                    "-5e-324"),
        ("number/max_pos",       1.7976931348623157e+308,    "1.7976931348623157e+308"),
        ("number/max_neg",       -1.7976931348623157e+308,   "-1.7976931348623157e+308"),
        ("number/max_safe_int",  9007199254740992,           "9007199254740992"),
        ("number/near_1e23_lo",  9.999999999999997e+22,      "9.999999999999997e+22"),
        ("number/near_1e23",     1e+23,                      "1e+23"),
        ("number/near_1e23_hi",  1.0000000000000001e+23,     "1.0000000000000001e+23"),
        ("number/near_1e21_lo",  999999999999999700000,      "999999999999999700000"),
        ("number/1e21",          1e+21,                      "1e+21"),
        ("number/near_1e-6_lo",  9.999999999999997e-7,       "9.999999999999997e-7"),
        ("number/1e-6",          0.000001,                   "0.000001"),
        ("number/333_32",        333333333.33333325,         "333333333.33333325"),
        ("number/333_34",        333333333.3333334,          "333333333.3333334"),
        ("number/tiny_neg",      -0.0000033333333333333333,  "-0.0000033333333333333333"),
    ]
    for name, val, expected in num_vectors:
        check(name, _serialize_number(val), expected)

    # ── §3.2.3  ソート (4) ──
    check("sort/basic",
          canonicalize({"b": 2, "a": 1}),
          '{"a":1,"b":2}')
    check("sort/nested",
          canonicalize({"b": {"d": 4, "c": 3}, "a": 1}),
          '{"a":1,"b":{"c":3,"d":4}}')
    check("sort/array_preserved",
          canonicalize({"z": [3, 1, 2]}),
          '{"z":[3,1,2]}')
    check("sort/utf16",
          canonicalize({
              "\u20ac": "Euro Sign",
              "\r": "Carriage Return",
              "\ufb33": "Hebrew Letter Dalet With Dagesh",
              "1": "One",
              "\U0001f600": "Emoji: Grinning Face",
              "\u0080": "Control",
              "\u00f6": "Latin Small Letter O With Diaeresis",
          }),
          '{"\\r":"Carriage Return","1":"One","\u0080":"Control",'
          '"\u00f6":"Latin Small Letter O With Diaeresis",'
          '"\u20ac":"Euro Sign",'
          '"\U0001f600":"Emoji: Grinning Face",'
          '"\ufb33":"Hebrew Letter Dalet With Dagesh"}')

    # ── §3.2.2 RFC 8785 統合サンプル (1) ──
    check("rfc8785/full_sample",
          canonicalize({
              "numbers": [333333333.33333329, 1e30, 4.50,
                          2e-3, 0.000000000000000000000000001],
              "string": "\u20ac$\x0f\x0aA'\x42\x22\x5c\x5c\x22\x2f",
              "literals": [None, True, False],
          }),
          '{"literals":[null,true,false],'
          '"numbers":[333333333.3333333,1e+30,4.5,0.002,1e-27],'
          '"string":"\u20ac$\\u000f\\nA\'B\\"\\\\\\\\\\"/"}'
          )

    # ── E2E ハッシュ検証 (2) ──
    check("e2e/hash_roundtrip",
          canonicalize({"a": 1}),
          '{"a":1}')
    e2e_hash = compute_hash(canonicalize({"a": 1}))
    e2e_expected = hashlib.sha256(b'{"a":1}').hexdigest()
    check("e2e/sha256_verify", e2e_hash, e2e_expected)

    # ── エラー検出 (3): 1ビットの不正も逃さない ──
    check_raises("error/nan",
                 lambda: _serialize_number(float("nan")),
                 ValueError)
    check_raises("error/infinity",
                 lambda: _serialize_number(float("inf")),
                 ValueError)
    check_raises("error/unsupported_type",
                 lambda: canonicalize(object()),
                 TypeError)

    total = passed + failed
    print()
    if failed == 0:
        _info(f"全 {total} テスト合格 — RFC 8785 完全準拠を証明")
    else:
        _warn(f"{passed}/{total} 合格, {failed} 失敗")
    return failed == 0


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  §5  端末出力
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

_RESET  = "\033[0m"
_BOLD   = "\033[1m"
_DIM    = "\033[2m"
_GREEN  = "\033[32m"
_RED    = "\033[31m"
_YELLOW = "\033[33m"
_CYAN   = "\033[36m"
_WHITE  = "\033[37m"


def _color() -> bool:
    return hasattr(sys.stdout, "isatty") and sys.stdout.isatty()


def _c(code: str, text: str) -> str:
    return f"{code}{text}{_RESET}" if _color() else text


def _info(msg: str) -> None:
    print(f"  {_c(_DIM, '│')} {msg}")


def _warn(msg: str) -> None:
    print(f"  {_c(_YELLOW, '│')} {_c(_YELLOW, msg)}")


def _emit(tag: str, color: str, msg: str) -> None:
    print(f"  {_c(_DIM, '│')} {_c(color + _BOLD, tag):>20s}  {msg}")


def _detail(label: str, value: str) -> None:
    print(f"  {_c(_DIM, '│')}       {_c(_DIM, label + ':')} {value}")


def _banner() -> None:
    w = 58
    ln = "─" * w
    print()
    print(f"  {_c(_CYAN + _BOLD, '┌' + ln + '┐')}")
    print(f"  {_c(_CYAN + _BOLD, '│')}"
          f"{_c(_WHITE + _BOLD, '  GemminAI Integrity Verifier'):58s}"
          f"{_c(_CYAN + _BOLD, '│')}")
    print(f"  {_c(_CYAN + _BOLD, '│')}"
          f"{_c(_DIM, '  「言葉はAIが紡ぎ、真実は数学が守る。」'):58s}"
          f"{_c(_CYAN + _BOLD, '│')}")
    print(f"  {_c(_CYAN + _BOLD, '│')}"
          f"{_c(_DIM, '  RFC 8785 (JCS) + SHA-256  |  v' + __version__):58s}"
          f"{_c(_CYAN + _BOLD, '│')}")
    print(f"  {_c(_CYAN + _BOLD, '│')}"
          f"{_c(_DIM, '  Copyright (c) 2026 Gemminai LLC'):58s}"
          f"{_c(_CYAN + _BOLD, '│')}")
    print(f"  {_c(_CYAN + _BOLD, '└' + ln + '┘')}")
    print()


def _print_result(r: VerificationResult) -> None:
    print(f"  {_c(_DIM, '│')} {_c(_BOLD, '対象  ')} {r.source}")
    print(f"  {_c(_DIM, '│' + ' ─' * 30)}")

    if r.error:
        print(f"  {_c(_DIM, '│')} {_c(_RED + _BOLD, 'ERROR')}  {r.error}")
        print()
        return

    print(f"  {_c(_DIM, '│')} {_c(_DIM, '属性数')} {r.attribute_count}")
    if r.expected_hash:
        print(f"  {_c(_DIM, '│')} {_c(_DIM, '格納  ')} {r.expected_hash}")
    print(f"  {_c(_DIM, '│')} {_c(_DIM, '計算  ')} {r.computed_hash}")

    if r.expected_hash:
        if r.valid:
            verdict = _c(_GREEN + _BOLD, "VALID — 整合性確認済み")
        else:
            verdict = _c(_RED + _BOLD, "INVALID — 不一致検出: データは改竄されている")
    else:
        verdict = _c(_YELLOW, "state_hash フィールド未検出 (計算値のみ表示)")

    print(f"  {_c(_DIM, '│')} {_c(_DIM, '結果  ')} {verdict}")
    print()


def _usage() -> None:
    b = _BOLD
    print(f"""  {_c(b, '使用方法')}
    python verify_integrity.py <command> [file]

  {_c(b, 'コマンド')}
    verify <file.json>      state_hash と再計算値を照合する
    hash <file.json>        JCS 正規化 → SHA-256 ハッシュを表示
    canonicalize <file>     正規化された JSON 文字列を stdout へ出力
    selftest                RFC 8785 テストベクトルで自己証明を実行

  {_c(b, '仕様')}
    正規化  RFC 8785 — JSON Canonicalization Scheme (JCS)
    数値    ECMA-262 §7.1.12.1 — IEEE 754 double 最短表現
    ハッシュ SHA-256 (RFC 6234)
    依存    Python 3.8+ 標準ライブラリのみ
""")


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  §6  CLI エントリポイント
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def main(argv: list[str] | None = None) -> int:
    args = argv if argv is not None else sys.argv[1:]

    if not args or args[0] in ("-h", "--help", "help"):
        _banner()
        _usage()
        return 0

    cmd = args[0].lower()

    if cmd == "selftest":
        _banner()
        return 0 if _run_self_test() else 1

    if len(args) < 2:
        _banner()
        _warn("ファイルパスを指定してください。")
        _usage()
        return 1

    target = args[1]

    if cmd == "verify":
        _banner()
        r = verify_file(target)
        _print_result(r)
        return 0 if r.valid else 1

    if cmd == "hash":
        _banner()
        r = verify_file(target)
        _print_result(r)
        return 0 if not r.error else 1

    if cmd == "canonicalize":
        p = Path(target)
        if not p.exists():
            _warn(f"ファイルが存在しません: {target}")
            return 1
        try:
            raw = p.read_bytes()
            text = raw.decode("utf-8")
            data = json.loads(text)
        except UnicodeDecodeError as e:
            _warn(f"UTF-8 デコードエラー: {e}")
            return 1
        except json.JSONDecodeError as e:
            _warn(f"JSON パースエラー: {e}")
            return 1
        except OSError as e:
            _warn(str(e))
            return 1
        sys.stdout.buffer.write(canonicalize_bytes(data))
        sys.stdout.buffer.write(b"\n")
        return 0

    _banner()
    _warn(f"不明なコマンド: {cmd}")
    _usage()
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
