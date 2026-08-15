import { NextResponse } from "next/server";
import { backendBaseUrl } from "../../../lib/backend";

export async function POST(request: Request) {
  const target = new URL("/api/admin/properties", backendBaseUrl());
  const headers = new Headers(request.headers);
  headers.delete("host");
  const response = await fetch(target, {
    method: "POST",
    headers,
    body: request.body,
    redirect: "manual",
  });
  return new NextResponse(response.body, { status: response.status, statusText: response.statusText, headers: response.headers });
}
