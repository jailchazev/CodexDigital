"use client";

import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    icon: "⚡",
    title: "Tecnología de Vanguardia",
    description: "Usamos las últimas tecnologías para crear soluciones rápidas, seguras y escalables",
  },
  {
    icon: "🎯",
    title: "Enfoque en Resultados",
    description: "No solo creamos software bonito, resolvemos problemas reales de tu negocio",
  },
  {
    icon: "🤝",
    title: "Soporte Continuo",
    description: "Estamos contigo después de la entrega con soporte técnico y actualizaciones",
  },
  {
    icon: "💰",
    title: "Precios Transparentes",
    description: "Sin costos ocultos. Sabes exactamente qué obtienes y cuánto pagas",
  },
  {
    icon: "🚀",
    title: "Entrega Rápida",
    description: "Metodología ágil que te permite ver avances cada semana",
  },
  {
    icon: "🔒",
    title: "Seguridad Garantizada",
    description: "Protegemos tu información y la de tus clientes con los más altos estándares",
  },
];

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="absolute inset-0 grid-background opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
            ¿Por Qué Elegir Gaming Digital?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Somos más que desarrolladores, somos tu socio tecnológico
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-5xl mb-4">{reason.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-cyan-400">
                  {reason.title}
                </h3>
                <p className="text-gray-300">{reason.description}</p>
              </div>

              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
