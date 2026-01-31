"use client";

import { useState, useEffect, useRef } from "react";

interface Offer {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  active: boolean;
}

const defaultOffers: Offer[] = [
  {
    id: "excel",
    icon: "📊",
    title: "Digitaliza tu negocio que aún usa Excel",
    description: "Convierte tus hojas de cálculo en un sistema web profesional con base de datos real",
    color: "from-green-500 to-emerald-600",
    active: true,
  },
  {
    id: "restaurant",
    icon: "🍽️",
    title: "Sistema de pedidos para restaurantes",
    description: "App móvil + panel web para gestionar pedidos, delivery y cocina en tiempo real",
    color: "from-orange-500 to-red-600",
    active: true,
  },
  {
    id: "security",
    icon: "🛡️",
    title: "Sistema de reportes para empresas de seguridad",
    description: "Gestión de guardias, turnos, incidentes y reportes automáticos con geolocalización",
    color: "from-blue-500 to-indigo-600",
    active: true,
  },
  {
    id: "ecommerce",
    icon: "🛒",
    title: "Tienda online para emprendedores",
    description: "E-commerce completo con catálogo, carrito, pagos online y panel de administración",
    color: "from-purple-500 to-pink-600",
    active: true,
  },
  {
    id: "inventory",
    icon: "📦",
    title: "Sistema de inventario inteligente",
    description: "Control de stock, alertas automáticas, códigos de barras y reportes en tiempo real",
    color: "from-cyan-500 to-blue-600",
    active: true,
  },
  {
    id: "appointments",
    icon: "📅",
    title: "Agenda digital para clínicas y consultorios",
    description: "Reserva de citas online, recordatorios automáticos e historial de pacientes",
    color: "from-teal-500 to-green-600",
    active: true,
  },
];

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("offers");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Error loading offers:", e);
        }
      }
    }
    return defaultOffers;
  });

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

  const handleOfferClick = (offerTitle: string) => {
    const message = `Hola, me interesa la oferta: *${offerTitle}* de Gaming Digital.`;
    window.open(`https://wa.me/51932531871?text=${encodeURIComponent(message)}`, "_blank");
  };

  const activeOffers = offers.filter(offer => offer.active);

  return (
    <section ref={sectionRef} className="relative py-20 bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-bold mb-4 animate-pulse-slow">
            🎁 OFERTAS DIGITALES
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Soluciones Listas Para Tu Industria
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Sistemas especializados diseñados para resolver problemas específicos de tu sector
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOffers.map((offer, index) => (
            <div
              key={offer.id}
              className={`group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 overflow-hidden ${
                isVisible ? "animate-slide-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="text-5xl mb-4">{offer.icon}</div>
                
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                  {offer.title}
                </h3>
                
                <p className="text-gray-300 mb-6 min-h-[60px]">
                  {offer.description}
                </p>

                <button
                  onClick={() => handleOfferClick(offer.title)}
                  className={`w-full py-3 bg-gradient-to-r ${offer.color} rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2`}
                >
                  <span>Lo quiero</span>
                  <span>👉</span>
                </button>
              </div>

              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">¿No encuentras lo que buscas?</p>
          <button
            onClick={() => {
              const message = "Hola, necesito una solución personalizada de Gaming Digital.";
              window.open(`https://wa.me/51932531871?text=${encodeURIComponent(message)}`, "_blank");
            }}
            className="px-8 py-3 bg-transparent border-2 border-cyan-500 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
          >
            Solicitar solución personalizada
          </button>
        </div>
      </div>
    </section>
  );
}
