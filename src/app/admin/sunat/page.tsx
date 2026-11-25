"use client";

import { FormEvent, useState } from "react";

type RecordData = Record<string, unknown>;

const DISPLAY_FIELDS = [
  ["ruc", "RUC"], ["numero_ruc", "RUC"], ["razon_social", "Razón social"],
  ["nombre_o_razon_social", "Nombre / razón social"], ["estado", "Estado"],
  ["estado_contribuyente", "Estado del contribuyente"], ["condicion", "Condición"],
  ["condicion_domicilio", "Condición del domicilio"], ["direccion", "Domicilio fiscal"],
  ["domicilio_fiscal", "Domicilio fiscal"], ["departamento", "Departamento"],
  ["provincia", "Provincia"], ["distrito", "Distrito"], ["actividad_economica", "Actividad económica"],
  ["fecha_inscripcion", "Fecha de inscripción"], ["fecha_inicio_actividades", "Inicio de actividades"],
] as const;

function findValue(data: RecordData, keys: readonly string[]) {
  const key = keys.find((candidate) => data[candidate] !== undefined && data[candidate] !== null && data[candidate] !== "");
  return key ? String(data[key]) : "";
}

export default function SunatPrivatePage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [ruc, setRuc] = useState("");
  const [record, setRecord] = useState<RecordData | null>(null);
  const [sourceDate, setSourceDate] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/sunat/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "No se pudo iniciar sesión");
      setAuthenticated(true); setPassword("");
    } catch (e) { setError(e instanceof Error ? e.message : "Error de conexión"); }
    finally { setBusy(false); }
  }

  async function lookup(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setRecord(null);
    try {
      const response = await fetch(`/api/sunat/ruc?number=${encodeURIComponent(ruc)}`, { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Consulta fallida");
      setRecord(result.data && typeof result.data === "object" ? result.data : { resultado: result.data });
      setSourceDate(result.consultedAt);
    } catch (e) { setError(e instanceof Error ? e.message : "Error de conexión"); }
    finally { setBusy(false); }
  }

  async function logout() {
    await fetch("/api/sunat/logout", { method: "POST" });
    setAuthenticated(false); setRecord(null);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="text-sm text-cyan-300 hover:text-cyan-200">← CodexDigital-Perú</a>
        <header className="mb-8 mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">Área privada · CodexData</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Consulta empresarial SUNAT</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Verificación de datos públicos de contribuyentes por número de RUC. Las credenciales de conexión se mantienen en el servidor.</p>
        </header>

        {!authenticated ? (
          <form onSubmit={login} className="max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">Acceso autorizado</h2>
            <label htmlFor="password" className="mb-2 block text-sm text-slate-300">Contraseña del área privada</label>
            <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400" />
            <button disabled={busy} className="mt-4 w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 disabled:opacity-60">{busy ? "Verificando…" : "Ingresar"}</button>
          </form>
        ) : (
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Buscar por RUC</h2>
              <button onClick={logout} className="text-sm text-slate-400 hover:text-white">Cerrar sesión</button>
            </div>
            <form onSubmit={lookup} className="flex flex-col gap-3 sm:flex-row">
              <input aria-label="RUC de 11 dígitos" inputMode="numeric" pattern="[0-9]{11}" maxLength={11} required value={ruc} onChange={(e) => setRuc(e.target.value.replace(/\D/g, ""))} placeholder="Ej. 20100070970" className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 tracking-widest outline-none focus:border-cyan-400" />
              <button disabled={busy} className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 disabled:opacity-60">{busy ? "Consultando…" : "Consultar"}</button>
            </form>
            {record && <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-semibold">Resultado de consulta</h3><span className="text-xs text-slate-500">Consulta: {new Date(sourceDate).toLocaleString("es-PE")}</span></div>
              <dl className="grid gap-4 sm:grid-cols-2">
                {DISPLAY_FIELDS.map(([key, label]) => {
                  const value = findValue(record, [key]);
                  return value ? <div key={key}><dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 break-words text-slate-100">{value}</dd></div> : null;
                })}
              </dl>
              <details className="mt-5 border-t border-slate-800 pt-4"><summary className="cursor-pointer text-sm text-cyan-300">Ver respuesta técnica</summary><pre className="mt-3 overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-300">{JSON.stringify(record, null, 2)}</pre></details>
            </div>}
          </section>
        )}
        {error && <p role="alert" className="mt-4 rounded-lg border border-rose-900 bg-rose-950/50 p-3 text-sm text-rose-300">{error}</p>}
        <p className="mt-6 text-xs leading-5 text-slate-500">Uso interno autorizado. Datos consultados desde un proveedor de integración de información SUNAT; confirma siempre la información vigente en el portal oficial antes de decisiones contractuales o tributarias.</p>
      </div>
    </main>
  );
}
