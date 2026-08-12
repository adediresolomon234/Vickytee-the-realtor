import { NextResponse } from "next/server";
import { backendBaseUrl } from "../../../../lib/backend";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return proxy(request, id);
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return proxy(request, id);
}

async function proxy(request: Request, id: string) {
  const target = new URL(`/api/admin/properties/${encodeURIComponent(id)}`, backendBaseUrl());
  const headers = new Headers(request.headers);
  headers.delete("host");
  const response = await fetch(target, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "manual",
  });
  return new NextResponse(response.body, { status: response.status, statusText: response.statusText, headers: response.headers });
}
