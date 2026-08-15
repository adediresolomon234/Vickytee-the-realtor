import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ items: [] });
}

export async function POST() {
  return NextResponse.json({ error: "Social media uploads must be added to the Go backend before this feature can be used." }, { status: 501 });
}
