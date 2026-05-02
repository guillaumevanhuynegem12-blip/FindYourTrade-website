import { waitlistEmailHtml } from "@/lib/waitlistEmail";

export default function EmailPreview() {
  const html = waitlistEmailHtml("/logo.png");
  return (
    <div style={{ background: "#f4f4f5", minHeight: "100vh", padding: "40px 20px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 12,
            color: "#71717a",
            marginBottom: 12,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Subject: <strong>You&apos;re on the fyt waitlist</strong> · From: hello@findyourtrade.eu
        </div>
        <div
          style={{ background: "white", borderRadius: 8, overflow: "hidden" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
