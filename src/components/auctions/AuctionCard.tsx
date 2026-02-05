import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
 import { Gavel, Heart, Trophy, Clock, Sparkles, Eye } from "lucide-react";
import { type Auction } from "@/data/auctions";
import { AuctionTimer } from "./AuctionTimer";
import { Badge } from "@/components/ui/badge";

interface AuctionCardProps {
  auction: Auction;
  index: number;
  onSelect: (auction: Auction) => void;
}

export const AuctionCard = ({ auction, index, onSelect }: AuctionCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
   const [viewCount] = useState(() => Math.floor(Math.random() * 50) + 10);

  // Physics-based mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth follow
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Lighting effect position
  const lightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const lightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const timeUntilEnd = auction.endTime.getTime() - new Date().getTime();
  const isEndingSoon = timeUntilEnd < 60 * 60 * 1000; // less than 1 hour
  const isHot = auction.bids > 20;

   // Staggered cascade animation variants
   const cardVariants = {
     hidden: {
       opacity: 0,
       y: 80,
       rotateX: 25,
       scale: 0.9,
     },
     visible: {
       opacity: 1,
       y: 0,
       rotateX: 0,
       scale: 1,
       transition: {
         type: "spring",
         stiffness: 100,
         damping: 15,
         delay: index * 0.12,
       },
     },
   };
 
  return (
    <motion.div
      ref={cardRef}
       variants={cardVariants}
       initial="hidden"
       whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(auction)}
      className="group relative cursor-pointer"
      whileHover={{ z: 50 }}
    >
      {/* Main card container */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/80 via-card to-card/90 backdrop-blur-xl"
        animate={{
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(212, 175, 55, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
            : "0 10px 40px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Dynamic lighting overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [lightX, lightY],
              ([x, y]) =>
                `radial-gradient(600px circle at ${x}% ${y}%, rgba(212, 175, 55, 0.15), transparent 40%)`
            ),
          }}
        />

        {/* Status indicators - floating pills */}
        <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
          {isEndingSoon && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 rounded-full bg-destructive/90 px-3 py-1.5 text-xs font-semibold text-destructive-foreground backdrop-blur-sm"
            >
              <Clock className="h-3 w-3 animate-pulse" />
              KOŃCZY SIĘ
            </motion.div>
          )}
          {isHot && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3" />
              HOT
            </motion.div>
          )}
        </div>

        {/* Like button - floating action */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/20 backdrop-blur-md transition-colors hover:bg-background/40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-white/70 hover:text-white"
              }`}
            />
          </motion.div>
        </motion.button>

        {/* Hero image section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Image skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}

          {/* Main image with parallax effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              x: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
              y: useTransform(mouseY, [-0.5, 0.5], [-10, 10]),
            }}
          >
            <motion.img
              src={auction.image}
              alt={auction.name}
              className="h-full w-full object-cover"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Achievements badge - bottom corner */}
          {auction.achievements && auction.achievements.length > 0 && (
            <motion.div
              className="absolute bottom-4 right-4 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg backdrop-blur-sm">
                <Trophy className="h-3.5 w-3.5" />
                <span>{auction.achievements.length} osiągnięć</span>
              </div>
            </motion.div>
         )}
 
         {/* View count badge */}
         {viewCount > 0 && (
           <motion.div
             className="absolute bottom-4 left-4 z-10"
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
           >
             <div className="flex items-center gap-1.5 rounded-full bg-background/60 px-2.5 py-1 text-xs text-foreground/80 backdrop-blur-sm">
               <Eye className="h-3 w-3" />
               <span>{viewCount}</span>
             </div>
           </motion.div>
          )}
        </div>

        {/* Content section with layered design */}
        <div className="relative space-y-4 p-5">
          {/* Ring number - monospace accent */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-wider text-primary/70">
              {auction.ringNumber}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          {/* Name & specs */}
          <div className="space-y-2">
            <motion.h3
              className="font-display text-xl font-bold tracking-tight text-foreground"
              animate={{ color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
              transition={{ duration: 0.3 }}
            >
              {auction.name}
            </motion.h3>

            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-primary/30 bg-primary/5 text-[10px] font-medium"
              >
                {auction.sex === "samiec" ? "♂ Samiec" : "♀ Samica"}
              </Badge>
              <Badge
                variant="outline"
                className="border-muted-foreground/30 text-[10px] font-medium"
              >
                {auction.year}
              </Badge>
              <Badge
                variant="outline"
                className="border-muted-foreground/30 text-[10px] font-medium"
              >
                {auction.color}
              </Badge>
            </div>
          </div>

          {/* Divider with timer */}
          <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-3">
            <div className="flex-1">
              <p className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                Koniec za
              </p>
              <AuctionTimer endTime={auction.endTime} compact />
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Oferty
              </p>
              <p className="font-mono text-sm font-semibold text-foreground">
                {auction.bids}
              </p>
            </div>
          </div>

          {/* Price section - hero element */}
          <div className="flex items-end justify-between pt-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Aktualna cena
              </p>
              <motion.p
                className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text font-display text-3xl font-bold text-transparent"
                animate={{
                  backgroundPosition: isHovered ? "100% 50%" : "0% 50%",
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                style={{ backgroundSize: "200% 100%" }}
              >
                {formatPrice(auction.currentPrice)}
              </motion.p>
            </div>
            <p className="text-xs text-muted-foreground">
              od {formatPrice(auction.startPrice)}
            </p>
          </div>

          {/* CTA Button with glow */}
          <motion.button
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary to-amber-500 py-3.5 font-semibold text-primary-foreground shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
             style={{
               boxShadow: isHovered
                 ? "0 10px 40px -10px rgba(212, 175, 55, 0.5)"
                 : "0 5px 20px -5px rgba(212, 175, 55, 0.3)",
             }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <span className="relative flex items-center justify-center gap-2">
              <Gavel className="h-4 w-4" />
              Licytuj teraz
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Ambient glow effect behind card */}
      <motion.div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isEndingSoon
            ? "radial-gradient(circle, rgba(239, 68, 68, 0.15), transparent 70%)"
            : "radial-gradient(circle, rgba(212, 175, 55, 0.2), transparent 70%)",
        }}
      />
    </motion.div>
  );
};
