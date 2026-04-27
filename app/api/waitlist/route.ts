import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "waitlist.json");

async function readList(): Promise<{ email: string; at: string }[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
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
    const list = await readList();
    if (!list.some((e) => e.email === email)) {
      list.push({ email, at: new Date().toISOString() });
      await fs.writeFile(FILE, JSON.stringify(list, null, 2));
    }
    return NextResponse.json({ ok: true, count: list.length });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const list = await readList();
  return NextResponse.json({ count: list.length });
}
