import { NextResponse } from "next/server";
import { backendBaseUrl } from "../../../lib/backend";

function clean(value: unknown, max: number) {
  return String(value || "").trim().slice(0, max);
}

export async function POST(request: Request) {
  const data = await request.json() as Record<string, unknown>;
  const firstName = clean(data.firstName, 80);
  const lastName = clean(data.lastName, 80);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 40);
  const interest = clean(data.lookingToDo || data.interest || "Not specified", 80);
  if (!firstName || !lastName || !phone || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Please provide a valid name, phone, and email." }, { status: 400 });

  const response = await fetch(new URL("/api/leads", backendBaseUrl()), {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      address: clean(data.address, 250),
      preferredContactDate: clean(data.preferredContactDate, 10),
      bestTimeToContact: clean(data.bestTimeToContact, 40),
      lookingToDo: interest,
      idealTimeframe: clean(data.idealTimeframe || "Not specified", 40),
      investmentType: clean(data.investmentType || "Not specified", 80),
      message: clean(data.message, 4000),
      nonMarketingSmsConsent: data.nonMarketingSmsConsent === true,
      marketingSmsConsent: data.marketingSmsConsent === true,
      source: "website",
    }),
  });

  const body = await response.json().catch(() => ({}));
  return NextResponse.json(body, { status: response.status });
}
