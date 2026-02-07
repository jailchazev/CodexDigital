"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Services from "@/components/Services";
import Offers from "@/components/Offers";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  // Evita mismatches si algún componente usa localStorage/window en el primer render
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Render estable (mismo contenedor siempre)
  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Hero />
      <Problems />

      {hydrated && (
        <>
          <Services />
          <Offers />
        </>
      )}

      <WhyChooseUs />
      <Process />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
