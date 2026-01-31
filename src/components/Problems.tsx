"use client";

import { useEffect, useRef, useState } from "react";

const problems = [
  {
    icon: "📊",
    title: "Tu negocio depende de Excel",
    description: "Pierdes tiempo y cometes errores con hojas de cálculo desorganizadas",
  },
  {
    icon: "❌",
    title: "Pierdes clientes por no tener sistema",
    description: "Tus competidores ya tienen plataformas digitales que les dan ventaja",
  },
  {
    icon: "💬",
    title: "Todo lo haces por WhatsApp",
    description: "Gestionar pedidos, inventario y clientes por chat es caótico e ineficiente",
  },
  {
    icon: "🌐",
    title: "No tienes presencia digital profesional",
    description: "Sin una web o app moderna, tu negocio parece obsoleto",
  },
];

export default function Problems() {
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
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
            ¿Te suena familiar?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Estos son los problemas que enfrentan miles de negocios cada día
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-500/30 hover:border-red-500 transition-all duration-300 hover:scale-105 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-5xl mb-4">{problem.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-red-400">
                  {problem.title}
                </h3>
                <p className="text-gray-300">{problem.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/30 glow-box">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Gaming Digital convierte tu negocio en una máquina digital automatizada
            </h3>
            <p className="text-lg text-gray-300">
              Dejamos atrás el caos y llevamos tu empresa a la era digital
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
