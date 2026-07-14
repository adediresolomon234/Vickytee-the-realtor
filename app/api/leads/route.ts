import { NextResponse } from "next/server";
import { ensureSchema, getDatabase } from "../../../lib/storage";

export async function POST(request: Request) {
  const data = await request.json() as Record<string, unknown>;
  const firstName = String(data.firstName || "").trim().slice(0, 80);
  const lastName = String(data.lastName || "").trim().slice(0, 80);
  const email = String(data.email || "").trim().slice(0, 200);
  if (!firstName || !lastName || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Please provide a valid name and email." }, { status: 400 });
  await ensureSchema();
  await getDatabase().prepare("INSERT INTO leads (id, created_at, first_name, last_name, email, phone, interest, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')")
    .bind(crypto.randomUUID(), new Date().toISOString(), firstName, lastName, email, String(data.phone || "").slice(0, 40), String(data.interest || "General question").slice(0, 80), String(data.message || "").slice(0, 3000)).run();
  return NextResponse.json({ ok: true });
}
