"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Reunión y Análisis",
    description: "Escuchamos tus necesidades y analizamos tu negocio para diseñar la mejor solución",
    icon: "🤝",
  },
  {
    number: "02",
    title: "Desarrollo",
    description: "Creamos tu sistema con actualizaciones semanales para que veas el progreso",
    icon: "⚙️",
  },
  {
    number: "03",
    title: "Entrega y Capacitación",
    description: "Te entregamos el sistema completo y capacitamos a tu equipo para usarlo",
    icon: "🎓",
  },
  {
    number: "04",
    title: "Soporte Continuo",
    description: "Seguimos contigo con mantenimiento, actualizaciones y soporte técnico",
    icon: "🛠️",
  },
];

export default function Process() {
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
    <section ref={sectionRef} className="relative py-20 bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-800/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Nuestro Proceso de Trabajo
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Un proceso simple y transparente de principio a fin
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-6xl font-bold gradient-text opacity-30">
                        {step.number}
                      </span>
                      <span className="text-4xl">{step.icon}</span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-cyan-400">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <svg
                      className="w-8 h-8 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const message = "Hola, quiero iniciar un proyecto con Gaming Digital.";
              window.open(`https://wa.me/51932531871?text=${encodeURIComponent(message)}`, "_blank");
            }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-lg text-white transition-all duration-300 hover:scale-105 glow-box"
          >
            Iniciar mi proyecto ahora
          </button>
        </div>
      </div>
    </section>
  );
}
