import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div
      style={{
        background: "#070a0d",
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <Sidebar />
      <main
        style={{
          marginLeft: "280px",
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid #1a2530",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
