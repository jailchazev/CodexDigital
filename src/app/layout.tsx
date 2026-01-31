import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaming Digital - Transformamos Negocios en Sistemas Digitales Inteligentes",
  description: "Desarrollo de páginas web, aplicaciones web a medida y apps móviles Android/iOS. Automatización y tecnología avanzada para empresas de seguridad, negocios locales y emprendedores.",
  keywords: "desarrollo web, aplicaciones móviles, sistemas web, automatización, Gaming Digital, apps Android, apps iOS, páginas web Perú",
  authors: [{ name: "Gaming Digital" }],
  openGraph: {
    title: "Gaming Digital - Sistemas Digitales Inteligentes",
    description: "Transformamos negocios tradicionales en sistemas digitales automatizados",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
