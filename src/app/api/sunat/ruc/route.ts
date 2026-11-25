import { NextResponse } from "next/server";
import { hasValidSession } from "@/lib/sunat-session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!(await hasValidSession())) {
    return NextResponse.json({ error: "Inicia sesión para consultar." }, { status: 401 });
  }

  const ruc = new URL(request.url).searchParams.get("number") ?? "";
  if (!/^\d{11}$/.test(ruc)) {
    return NextResponse.json({ error: "El RUC debe contener exactamente 11 dígitos." }, { status: 400 });
  }

  const token = process.env.SUNAT_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "La conexión SUNAT aún no está configurada en el servidor." }, { status: 503 });
  }

  try {
    const response = await fetch(`https://api.endpoint.pe/v1/ruc/${ruc}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const status = response.status === 404 ? 404 : response.status === 429 ? 429 : 502;
      return NextResponse.json({ error: response.status === 404 ? "No se encontró el RUC." : "El proveedor no pudo completar la consulta." }, { status });
    }
    return NextResponse.json({ data: result?.data ?? result, source: "SUNAT vía Endpoint.pe", consultedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: "No se pudo conectar con el servicio de consulta. Intenta nuevamente." }, { status: 502 });
  }
}
