import { NextResponse } from "next/server";
import { backendBaseUrl } from "../../../../lib/backend";

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  const response = await fetch(new URL(`/api/media/${key.map(encodeURIComponent).join("/")}`, backendBaseUrl()));
  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
