import { motion } from "framer-motion";
import { PigeonCard } from "./PigeonCard";
import { pigeons, type Pigeon } from "@/data/pigeons";

interface GalleryGridProps {
  onSelectPigeon: (pigeon: Pigeon) => void;
}

export const GalleryGrid = ({ onSelectPigeon }: GalleryGridProps) => {
  return (
    <section className="relative py-24 px-4">
      {/* Section header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 border border-primary/30 rounded-full text-xs tracking-[0.2em] text-primary/70 uppercase mb-4"
        >
          Pełna Kolekcja
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold gold-text mb-4"
        >
          Hall of Champions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Każdy gołąb w naszej kolekcji to historia sukcesu i determinacji
        </motion.p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pigeons.map((pigeon, index) => (
          <PigeonCard
            key={pigeon.id}
            pigeon={pigeon}
            index={index}
            onSelect={onSelectPigeon}
          />
        ))}
      </div>
    </section>
  );
};
