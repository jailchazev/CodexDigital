"use client";

import { useState, useEffect } from "react";
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
  	const mounted = typeof window !== "undefined";
	
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Hero />
      <Problems />
      <Services />
      <Offers />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
