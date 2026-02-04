import { useState } from "react";
import { motion } from "framer-motion";
import { Gavel, Heart, Eye, Trophy, Info } from "lucide-react";
import { type Auction } from "@/data/auctions";
import { AuctionTimer } from "./AuctionTimer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AuctionCardProps {
  auction: Auction;
  index: number;
  onSelect: (auction: Auction) => void;
}

export const AuctionCard = ({ auction, index, onSelect }: AuctionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const timeUntilEnd = auction.endTime.getTime() - new Date().getTime();
  const isEndingSoon = timeUntilEnd < 60 * 60 * 1000; // less than 1 hour

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative perspective-1000"
    >
      <div 
        className={`
          relative glass-card rounded-2xl overflow-hidden border transition-all duration-500
          ${isEndingSoon ? "border-destructive/50" : "border-border/30"}
          ${isHovered ? "border-primary/50 shadow-glow-sm" : ""}
        `}
      >
        {/* Ending soon badge */}
        {isEndingSoon && (
          <div className="absolute top-3 left-3 z-20">
            <Badge variant="destructive" className="animate-pulse font-semibold">
              Kończy się!
            </Badge>
          </div>
        )}

        {/* Like button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
          />
        </button>

        {/* Image container */}
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={auction.image}
            alt={auction.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
          
          {/* Quick info overlay on hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-0 left-0 right-0 p-4 flex gap-2"
          >
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-background/90 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
              onClick={() => onSelect(auction)}
            >
              <Eye className="w-4 h-4 mr-1" />
              Szczegóły
            </Button>
          </motion.div>

          {/* Achievements badge */}
          {auction.achievements && auction.achievements.length > 0 && (
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                <Trophy className="w-3 h-3" />
                {auction.achievements.length}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Ring number & name */}
          <div>
            <p className="text-xs text-muted-foreground font-mono mb-0.5">
              {auction.ringNumber}
            </p>
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {auction.name}
            </h3>
          </div>

          {/* Specs row */}
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="text-[10px] px-2 py-0.5">
              {auction.sex === "samiec" ? "♂ Samiec" : "♀ Samica"}
            </Badge>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5">
              {auction.year}
            </Badge>
            <Badge variant="outline" className="text-[10px] px-2 py-0.5">
              {auction.color}
            </Badge>
          </div>

          {/* Timer */}
          <div className="pt-2 border-t border-border/30">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              Koniec aukcji
            </p>
            <AuctionTimer endTime={auction.endTime} />
          </div>

          {/* Price section */}
          <div className="pt-3 border-t border-border/30 flex items-end justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Aktualna cena
              </p>
              <p className="text-2xl font-bold text-primary">
                {formatPrice(auction.currentPrice)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">
                {auction.bids} ofert
              </p>
              <p className="text-xs text-muted-foreground">
                Start: {formatPrice(auction.startPrice)}
              </p>
            </div>
          </div>

          {/* Bid button */}
          <Button 
            className="w-full gap-2 neon-border bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all"
            onClick={() => onSelect(auction)}
          >
            <Gavel className="w-4 h-4" />
            Licytuj teraz
          </Button>
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />
      </div>
    </motion.div>
  );
};
