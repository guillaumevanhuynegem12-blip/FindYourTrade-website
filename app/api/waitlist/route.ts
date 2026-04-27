import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env["findyourtrade_KV_REST_API_URL"]!,
  token: process.env["findyourtrade_KV_REST_API_TOKEN"]!,
});
const KEY = "waitlist:emails";

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
    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const count = await redis.hlen(KEY);
  return NextResponse.json({ count });
}
