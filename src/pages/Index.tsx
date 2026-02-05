import { useState } from "react";
import { ParticleBackground } from "@/components/gallery/ParticleBackground";
import { HeroSection } from "@/components/gallery/HeroSection";
import { Carousel3D } from "@/components/gallery/Carousel3D";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { AchievementsTimeline } from "@/components/gallery/AchievementsTimeline";
import { PigeonModal } from "@/components/gallery/PigeonModal";
import { pigeons, type Pigeon } from "@/data/pigeons";
 import { Link } from "react-router-dom";
 import { motion } from "framer-motion";
 import { ArrowRight, Gavel } from "lucide-react";
 import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedPigeon, setSelectedPigeon] = useState<Pigeon | null>(null);

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedPigeon) return;
    
    const currentIndex = pigeons.findIndex((p) => p.id === selectedPigeon.id);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % pigeons.length
        : (currentIndex - 1 + pigeons.length) % pigeons.length;
    
    setSelectedPigeon(pigeons[newIndex]);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ParticleBackground />
      
      <HeroSection />
      
      <Carousel3D />
      
      <GalleryGrid onSelectPigeon={setSelectedPigeon} />
      
       {/* Auctions CTA Section */}
       <section className="relative py-24 px-4">
         <div className="max-w-4xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="space-y-6"
           >
             <span className="inline-block px-4 py-1 border border-primary/30 rounded-full text-xs tracking-[0.2em] text-primary/70 uppercase">
               Aktywne aukcje
             </span>
             <h2 className="font-display text-4xl md:text-5xl font-bold gold-text">
               Ekskluzywne Aukcje Online
             </h2>
             <p className="text-muted-foreground max-w-xl mx-auto">
               Licytuj najlepsze gołębie pocztowe z naszej hodowli. 
               Każdy ptak to potencjalny mistrz.
             </p>
             <Link to="/auctions">
               <Button size="lg" className="gap-2 mt-4 group">
                 <Gavel className="w-5 h-5" />
                 Zobacz aukcje
                 <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
               </Button>
             </Link>
           </motion.div>
         </div>
       </section>
      
      <AchievementsTimeline />
      
      <PigeonModal
        pigeon={selectedPigeon}
        onClose={() => setSelectedPigeon(null)}
        onNavigate={handleNavigate}
      />

      <footer className="relative z-10 py-12 text-center border-t border-border/20">
        <p className="text-muted-foreground text-sm">
          © 2024 Champions Gallery — Ekskluzywna Hodowla Gołębi Pocztowych
        </p>
      </footer>
    </main>
  );
};

export default Index;
