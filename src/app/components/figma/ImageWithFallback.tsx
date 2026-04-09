import React, { useState } from "react";

/** プレースホルダー用（単色アイコン SVG、ASCII のみ） */
const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjNjA3ODg4IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** ドキュメント暗色テーマ用のフォールバック枠（ホワイトペーパー等） */
  variant?: "default" | "docDark";
};

export function ImageWithFallback({
  variant = "default",
  className,
  style,
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const docDarkFallback: React.CSSProperties =
    variant === "docDark"
      ? {
          display: "block",
          width: "100%",
          minHeight: "120px",
          margin: "24px 0",
          padding: "24px",
          border: "1px solid #1a2530",
          background: "#080c10",
          boxSizing: "border-box",
        }
      : {};

  const defaultFallback: React.CSSProperties =
    variant === "default"
      ? {
          display: "inline-block",
          textAlign: "center",
          verticalAlign: "middle",
        }
      : {};

  if (didError) {
    return (
      <div
        className={variant === "default" ? `inline-block bg-gray-100 text-center align-middle ${className ?? ""}` : className}
        style={{ ...defaultFallback, ...docDarkFallback, ...style }}
        role="img"
        aria-label={alt ? `Figure unavailable: ${alt}` : "Figure unavailable"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <img src={ERROR_IMG_SRC} alt="" width={48} height={48} aria-hidden />
          {variant === "docDark" ? (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "#8098ae",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Figure could not be loaded.
              <br />
              <span style={{ color: "#5a7a8e", fontSize: "10px" }}>
                Check that PNG assets exist under <code style={{ color: "#9fc1d6" }}>public/figures/</code> (run{" "}
                <code style={{ color: "#9fc1d6" }}>npm run copy:figures</code>).
              </span>
            </span>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <img
      {...rest}
      alt={alt ?? ""}
      className={className}
      style={style}
      onError={handleError}
    />
  );
}
