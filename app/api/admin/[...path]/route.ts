import { NextRequest, NextResponse } from "next/server";
import { serverBackendUrl } from "../../../../lib/backend";

export const dynamic = "force-dynamic";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "keep-alive",
  "transfer-encoding",
  "upgrade",
]);

async function proxyAdminRequest(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const target = new URL(`/api/admin/${path.join("/")}`, serverBackendUrl());
  target.search = request.nextUrl.search;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");
  if (contentType) headers.set("content-type", contentType);
  if (cookie) headers.set("cookie", cookie);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const backendResponse = await fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  backendResponse.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase()) && key.toLowerCase() !== "set-cookie") {
      responseHeaders.set(key, value);
    }
  });

  const response = new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });

  const setCookie = backendResponse.headers.get("set-cookie");
  if (setCookie) response.headers.append("set-cookie", setCookie);

  return response;
}

export const GET = proxyAdminRequest;
export const POST = proxyAdminRequest;
export const PATCH = proxyAdminRequest;
export const DELETE = proxyAdminRequest;
