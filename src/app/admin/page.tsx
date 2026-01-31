"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  packages: Array<{
    name: string;
    level: string;
    features: string[];
    color: string;
    glowColor: string;
  }>;
}

interface Offer {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  active: boolean;
}

export default function AdminPanel() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"services" | "offers">("services");
  const [services, setServices] = useState<Service[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);

  const loadData = () => {
    const storedServices = localStorage.getItem("gamingDigitalServices");
    const storedOffers = localStorage.getItem("gamingDigitalOffers");
    
    if (storedServices) {
      try {
        setServices(JSON.parse(storedServices));
      } catch (e) {
        console.error("Error loading services:", e);
      }
    }
    
    if (storedOffers) {
      try {
        setOffers(JSON.parse(storedOffers));
      } catch (e) {
        console.error("Error loading offers:", e);
      }
    }
  };

const [isAuthenticated, setIsAuthenticated] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminAuth") === "authenticated";
  }
  return false;
});


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "gaming2024") {
      localStorage.setItem("adminAuth", "authenticated");
      setIsAuthenticated(true);
      loadData();
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    router.push("/");
  };

  const saveServices = (newServices: Service[]) => {
    localStorage.setItem("gamingDigitalServices", JSON.stringify(newServices));
    setServices(newServices);
  };

  const saveOffers = (newOffers: Offer[]) => {
    localStorage.setItem("gamingDigitalOffers", JSON.stringify(newOffers));
    setOffers(newOffers);
  };

  const toggleOfferActive = (offerId: string) => {
    const newOffers = offers.map(offer =>
      offer.id === offerId ? { ...offer, active: !offer.active } : offer
    );
    saveOffers(newOffers);
  };

  const deleteOffer = (offerId: string) => {
    if (confirm("¿Estás seguro de eliminar esta oferta?")) {
      const newOffers = offers.filter(offer => offer.id !== offerId);
      saveOffers(newOffers);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800 rounded-xl p-8 border border-cyan-500/30 glow-box">
            <h1 className="text-3xl font-bold gradient-text mb-6 text-center">
              Panel de Administración
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Ingresa la contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300"
              >
                Ingresar
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-4 text-center">
              Contraseña por defecto: gaming2024
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">Panel de Administración</h1>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Ver Sitio
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("services")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "services"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Servicios
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === "offers"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Ofertas
          </button>
        </div>

        {/* Content */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Gestión de Servicios</h2>
              <p className="text-gray-400 mb-4">
                Los servicios están configurados en el código. Para modificarlos, edita el archivo{" "}
                <code className="bg-gray-700 px-2 py-1 rounded">src/components/Services.tsx</code>
              </p>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{service.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        <p className="text-gray-400">{service.description}</p>
                        <p className="text-sm text-cyan-400 mt-2">
                          {service.packages.length} paquetes configurados
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "offers" && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Gestión de Ofertas</h2>
              <div className="space-y-4">
                {offers.map((offer) => (
                  <div key={offer.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{offer.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{offer.title}</h3>
                        <p className="text-gray-400">{offer.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleOfferActive(offer.id)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                            offer.active
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-gray-600 hover:bg-gray-500"
                          }`}
                        >
                          {offer.active ? "Activa" : "Inactiva"}
                        </button>
                        <button
                          onClick={() => deleteOffer(offer.id)}
                          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">💡 Instrucciones</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Activa/desactiva ofertas para mostrarlas u ocultarlas en el sitio</li>
                <li>• Las ofertas inactivas no se mostrarán a los visitantes</li>
                <li>• Para agregar nuevas ofertas, edita el archivo <code className="bg-gray-700 px-2 py-1 rounded">src/components/Offers.tsx</code></li>
                <li>• Los cambios se guardan automáticamente en el navegador</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
