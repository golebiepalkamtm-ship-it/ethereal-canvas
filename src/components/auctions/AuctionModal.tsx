import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Heart, Share2, ChevronLeft, ChevronRight, Gavel, User, MapPin, Calendar, Dna } from "lucide-react";
import { type Auction } from "@/data/auctions";
import { AuctionTimer } from "./AuctionTimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AuctionModalProps {
  auction: Auction | null;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export const AuctionModal = ({ auction, onClose, onNavigate }: AuctionModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };

    if (auction) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [auction, onClose, onNavigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {auction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Navigation arrows */}
          <button
            onClick={() => onNavigate("prev")}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-card/80 border border-border/30 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => onNavigate("next")}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-card/80 border border-border/30 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-border/30 shadow-glow"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 border border-border/30 flex items-center justify-center text-foreground hover:bg-destructive hover:text-destructive-foreground transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image section */}
              <div className="relative aspect-square md:aspect-auto md:min-h-[500px]">
                <img
                  src={auction.image}
                  alt={auction.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-r" />
                
                {/* Floating badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {auction.achievements && auction.achievements.length > 0 && (
                    <Badge className="bg-primary text-primary-foreground gap-1">
                      <Trophy className="w-3 h-3" />
                      Champion
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content section */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Header */}
                <div>
                  <p className="text-sm text-muted-foreground font-mono mb-1">
                    {auction.ringNumber}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold gold-text mb-2">
                    {auction.name}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {auction.sex === "samiec" ? "♂ Samiec" : "♀ Samica"}
                    </Badge>
                    <Badge variant="outline">{auction.year}</Badge>
                    <Badge variant="outline">{auction.color}</Badge>
                  </div>
                </div>

                <Separator className="bg-border/30" />

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Hodowca</p>
                      <p className="font-medium">{auction.breeder}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pochodzenie</p>
                      <p className="font-medium">{auction.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rocznik</p>
                      <p className="font-medium">{auction.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Gavel className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Liczba ofert</p>
                      <p className="font-medium">{auction.bids}</p>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                {auction.achievements && auction.achievements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-primary" />
                      Osiągnięcia
                    </h4>
                    <ul className="space-y-1">
                      {auction.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pedigree */}
                {auction.pedigree && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Dna className="w-4 h-4 text-primary" />
                      Rodowód
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                        <p className="text-[10px] text-muted-foreground uppercase mb-0.5">Ojciec</p>
                        <p className="text-sm font-mono">{auction.pedigree.father}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                        <p className="text-[10px] text-muted-foreground uppercase mb-0.5">Matka</p>
                        <p className="text-sm font-mono">{auction.pedigree.mother}</p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator className="bg-border/30" />

                {/* Timer and price */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      Koniec aukcji za
                    </p>
                    <AuctionTimer endTime={auction.endTime} />
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          Aktualna cena
                        </p>
                        <p className="text-3xl font-bold text-primary">
                          {formatPrice(auction.currentPrice)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Cena wywoławcza</p>
                        <p className="text-sm text-muted-foreground">{formatPrice(auction.startPrice)}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 gap-2 neon-border" size="lg">
                        <Gavel className="w-5 h-5" />
                        Licytuj teraz
                      </Button>
                      <Button variant="outline" size="lg" className="px-4">
                        <Heart className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="lg" className="px-4">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
