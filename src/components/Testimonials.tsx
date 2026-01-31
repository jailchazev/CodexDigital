"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Carlos Mendoza",
    company: "Seguridad Total SAC",
    role: "Gerente General",
    text: "CodeX Digital transformó nuestra empresa. Antes todo era en Excel y WhatsApp, ahora tenemos un sistema que gestiona guardias, turnos y reportes automáticamente. Increíble.",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    name: "María González",
    company: "Restaurante El Sabor",
    role: "Propietaria",
    text: "La app de pedidos que nos hicieron aumentó nuestras ventas un 40%. Los clientes pueden pedir desde su celular y todo llega directo a la cocina. Excelente inversión.",
    rating: 5,
    avatar: "👩‍🍳",
  },
  {
    name: "Roberto Silva",
    company: "TechStore Perú",
    role: "Dueño",
    text: "Necesitaba una tienda online profesional y CodeX Digital la entregó en tiempo récord. El panel de administración es súper fácil de usar. 100% recomendado.",
    rating: 5,
    avatar: "👨‍💻",
  },
  {
    name: "Ana Ramírez",
    company: "Clínica Dental Sonrisa",
    role: "Administradora",
    text: "El sistema de citas online nos ahorró horas de trabajo. Los pacientes reservan por la web y reciben recordatorios automáticos. Ya no tenemos citas olvidadas.",
    rating: 5,
    avatar: "👩‍⚕️",
  },
];

export default function Testimonials() {
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
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Empresas reales que transformaron su negocio con CodeX Digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-cyan-400">{testimonial.role}</p>
                    <p className="text-sm text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">¿Quieres ser el próximo caso de éxito?</p>
          <button
            onClick={() => {
              const message = "Hola, quiero transformar mi negocio con CodeX Digital.";
              window.open(`https://wa.me/51932531871?text=${encodeURIComponent(message)}`, "_blank");
            }}
            className="px-8 py-3 bg-transparent border-2 border-cyan-500 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
          >
            Empezar ahora
          </button>
        </div>
      </div>
    </section>
  );
}
