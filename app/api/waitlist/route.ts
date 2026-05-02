import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { waitlistEmailHtml } from "@/lib/waitlistEmail";

const redis = new Redis({
  url: process.env["findyourtrade_KV_REST_API_URL"]!,
  token: process.env["findyourtrade_KV_REST_API_TOKEN"]!,
});
const KEY = "waitlist:emails";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.WAITLIST_FROM_EMAIL || "fyt <onboarding@resend.dev>";
const REPLY_TO = process.env.WAITLIST_REPLY_TO_EMAIL;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (
      typeof email !== "string" ||
      email.length > 320 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const exists = await redis.hexists(KEY, email);
    if (!exists) {
      await redis.hset(KEY, { [email]: new Date().toISOString() });
    }
    const count = await redis.hlen(KEY);

    if (!exists && resend) {
      try {
        await resend.emails.send({
          from: FROM,
          to: email,
          replyTo: REPLY_TO,
          subject: "You're on the fyt waitlist",
          html: waitlistEmailHtml(),
        });
      } catch (err) {
        console.error("Resend confirmation failed:", err);
      }
      if (REPLY_TO) {
        try {
          const safe = escapeHtml(email);
          await resend.emails.send({
            from: FROM,
            to: REPLY_TO,
            subject: `New waitlist signup: ${email}`,
            html: `<div style="font-family:-apple-system,sans-serif;font-size:14px;line-height:1.6;color:#18181B;">
              <p style="margin:0 0 12px 0;"><strong>New fyt waitlist signup</strong></p>
              <p style="margin:0 0 4px 0;">Email: <strong>${safe}</strong></p>
              <p style="margin:0;">Total on waitlist: <strong>${count}</strong></p>
            </div>`,
          });
        } catch (err) {
          console.error("Resend notification failed:", err);
        }
      }
    }

    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const count = await redis.hlen(KEY);
  return NextResponse.json({ count });
}
