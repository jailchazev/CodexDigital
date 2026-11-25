import { NextResponse } from "next/server";
import { createSession, safePasswordMatch } from "@/lib/sunat-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const configured = process.env.SUNAT_PANEL_PASSWORD;
  if (!configured) {
    return NextResponse.json({ error: "El acceso privado aún no está configurado en el servidor." }, { status: 503 });
  }

  let body: { password?: unknown };
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (typeof body.password !== "string" || !safePasswordMatch(body.password, configured)) {
    return NextResponse.json({ error: "Credenciales incorrectas." }, { status: 401 });
  }

  try {
    await createSession();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "La sesión no pudo iniciarse. Revisa la configuración del servidor." }, { status: 503 });
  }
}
