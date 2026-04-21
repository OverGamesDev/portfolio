"use client";

import { useLang } from "@/lib/useLang";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem",
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <span style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
        Joffrey · {t.footer.tagline}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
        <span style={{ fontSize: "0.75rem", color: "var(--green)", fontWeight: 600 }}>
          {t.footer.available}
        </span>
      </div>
    </footer>
  );
}
