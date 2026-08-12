import { NextResponse } from "next/server";

export async function PATCH() {
  return NextResponse.json({ error: "Section media is not available until it is implemented in the Go backend." }, { status: 501 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Section media is not available until it is implemented in the Go backend." }, { status: 501 });
}
