"use client";

import { useEffect, useRef, useState } from "react";

interface Package {
  name: string;
  level: "basic" | "professional" | "enterprise";
  features: string[];
  color: string;
  glowColor: string;
}

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  packages: Package[];
}

const defaultServices: Service[] = [
  {
    id: "web",
    icon: "🌐",
    title: "Desarrollo de Páginas Web",
    description: "Sitios web profesionales, rápidos y optimizados para convertir visitantes en clientes",
    packages: [
      {
        name: "Básico",
        level: "basic",
        color: "from-green-500 to-emerald-500",
        glowColor: "rgba(34, 197, 94, 0.3)",
        features: [
          "Web informativa profesional",
          "Diseño responsive",
          "Formulario de contacto",
          "SEO básico",
          "Hosting 1 año",
        ],
      },
      {
        name: "Profesional",
        level: "professional",
        color: "from-blue-500 to-cyan-500",
        glowColor: "rgba(59, 130, 246, 0.3)",
        features: [
          "Todo lo del plan Básico",
          "Panel admin",
          "Blog",
          "WhatsApp",
          "Correo corporativo",
          "Analytics",
        ],
      },
      {
        name: "Empresarial",
        level: "enterprise",
        color: "from-purple-500 to-pink-500",
        glowColor: "rgba(168, 85, 247, 0.3)",
        features: [
          "Todo lo del Profesional",
          "Sistema a medida",
          "Multi idioma",
          "Integraciones",
          "Soporte 24/7",
        ],
      },
    ],
  },
];

export default function Services() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Cargar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("services");
    if (stored) {
      try {
        setServices(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading services:", e);
      }
    }
  }, []);

  // Animación al aparecer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePackageClick = (serviceTitle: string, packageName: string) => {
    const message = `Hola, quiero el servicio *${serviceTitle}* – Plan *${packageName}* de Gaming Digital.`;
    window.open(`https://wa.me/51932531871?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section ref={sectionRef} id="services" className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text">Nuestros Servicios</h2>
          <p className="text-xl text-gray-300 mt-4">
            Soluciones digitales para hacer crecer tu negocio
          </p>
        </div>

        {services.map((service, i) => (
          <div
            key={service.id}
            className={`${isVisible ? "animate-slide-up" : "opacity-0"}`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <div className="text-center mb-8">
              <div className="text-6xl">{service.icon}</div>
              <h3 className="text-4xl font-bold text-cyan-400">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {service.packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl hover:scale-105 transition"
                  style={{ boxShadow: `0 0 20px ${pkg.glowColor}` }}
                >
                  <h4 className={`text-2xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                    {pkg.name}
                  </h4>

                  <ul className="my-4 space-y-2 text-gray-300 text-sm">
                    {pkg.features.map((f, j) => <li key={j}>✔ {f}</li>)}
                  </ul>

                  <button
                    onClick={() => handlePackageClick(service.title, pkg.name)}
                    className={`w-full py-3 bg-gradient-to-r ${pkg.color} rounded-lg text-white font-bold`}
                  >
                    Lo quiero 👉
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
