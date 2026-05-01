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
      if (resend) {
        try {
          await resend.emails.send({
            from: FROM,
            to: email,
            replyTo: REPLY_TO,
            subject: "You're on the fyt waitlist",
            html: waitlistEmailHtml(),
          });
        } catch (err) {
          console.error("Resend send failed:", err);
        }
      }
    }
    const count = await redis.hlen(KEY);
    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const count = await redis.hlen(KEY);
  return NextResponse.json({ count });
}
