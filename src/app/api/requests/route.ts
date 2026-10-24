import { NextResponse } from "next/server";
import { z } from "zod";
import { saveRequest } from "@/lib/submissions";

const schema = z.object({
  kind: z.enum(["need", "topic"]),
  message: z.string().trim().min(12).max(2000),
  name: z.string().trim().max(80).optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .max(160)
    .refine((value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)),
  locale: z.enum(["ne", "en"]),
  company: z.string().optional(),
});

const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 60_000);
  if (recent.length >= 8) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "limited" }, { status: 429 });

  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  if (parsed.data.company) return NextResponse.json({ ok: true, persisted: "none" });

  try {
    const persisted = await saveRequest({
      kind: parsed.data.kind,
      message: parsed.data.message,
      name: parsed.data.name || undefined,
      email: parsed.data.email || undefined,
      locale: parsed.data.locale,
    });
    return NextResponse.json({ ok: true, persisted });
  } catch {
    return NextResponse.json({ ok: false, error: "save" }, { status: 500 });
  }
}
