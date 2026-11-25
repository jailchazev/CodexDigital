import { NextResponse } from "next/server";
import { hasValidSession } from "@/lib/sunat-session";

export async function GET() {
  return NextResponse.json({ authenticated: await hasValidSession() });
}
