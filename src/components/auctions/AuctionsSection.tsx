import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 import { motion, AnimatePresence } from "framer-motion";
import { Filter, SortAsc, Clock, Flame, DollarSign, Grid3X3, LayoutList } from "lucide-react";
import { auctionsData, auctionInfo, type Auction } from "@/data/auctions";
import { AuctionCard } from "./AuctionCard";
import { AuctionModal } from "./AuctionModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

gsap.registerPlugin(ScrollTrigger);

type SortOption = "ending-soon" | "price-high" | "price-low" | "most-bids";
type ViewMode = "grid" | "list";

export const AuctionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("ending-soon");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Animate header on scroll
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;

    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Sort auctions
  const sortedAuctions = [...auctionsData].sort((a, b) => {
    switch (sortBy) {
      case "ending-soon":
        return a.endTime.getTime() - b.endTime.getTime();
      case "price-high":
        return b.currentPrice - a.currentPrice;
      case "price-low":
        return a.currentPrice - b.currentPrice;
      case "most-bids":
        return b.bids - a.bids;
      default:
        return 0;
    }
  });

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedAuction) return;
    
    const currentIndex = sortedAuctions.findIndex((a) => a.id === selectedAuction.id);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % sortedAuctions.length
        : (currentIndex - 1 + sortedAuctions.length) % sortedAuctions.length;
    
    setSelectedAuction(sortedAuctions[newIndex]);
  };

  const sortOptions = [
    { value: "ending-soon", label: "Kończy się najszybciej", icon: Clock },
    { value: "price-high", label: "Najwyższa cena", icon: DollarSign },
    { value: "price-low", label: "Najniższa cena", icon: DollarSign },
    { value: "most-bids", label: "Najwięcej ofert", icon: Flame },
  ];

  const activeSortOption = sortOptions.find((o) => o.value === sortBy);

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden" id="auctions">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="inline-block px-4 py-1 border border-primary/30 rounded-full text-xs tracking-[0.2em] text-primary/70 uppercase mb-4 neon-border">
            Aukcja Online
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold gold-text mb-4 animate-text-flicker">
            {auctionInfo.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {auctionInfo.description}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="text-sm px-3 py-1">
              {auctionInfo.totalLots} gołębi
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Aktywna aukcja
            </Badge>
          </div>
        </div>

        {/* Controls bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 glass-card rounded-xl border border-border/30"
        >
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              <span className="text-foreground font-semibold">{sortedAuctions.length}</span> aukcji
            </span>
            <span className="text-muted-foreground">
              <span className="text-primary font-semibold">
                {sortedAuctions.filter((a) => a.endTime.getTime() - new Date().getTime() < 60 * 60 * 1000).length}
              </span> kończy się wkrótce
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {activeSortOption && <activeSortOption.icon className="w-4 h-4" />}
                  <span className="hidden sm:inline">{activeSortOption?.label}</span>
                  <SortAsc className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-border/30">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortBy(option.value as SortOption)}
                    className={sortBy === option.value ? "text-primary" : ""}
                  >
                    <option.icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View mode toggle */}
            <div className="flex rounded-lg border border-border/30 overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Auctions grid */}
         <motion.div
           layout
          className={`
            grid gap-6
            ${viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 lg:grid-cols-2"
            }
          `}
        >
           <AnimatePresence mode="popLayout">
             {sortedAuctions.map((auction, index) => (
               <AuctionCard
                 key={auction.id}
                 auction={auction}
                 index={index}
                 onSelect={setSelectedAuction}
               />
             ))}
           </AnimatePresence>
         </motion.div>

        {/* Load more button (static for now) */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" className="gap-2 neon-border">
            Załaduj więcej aukcji
          </Button>
        </div>
      </div>

      {/* Auction modal */}
      <AuctionModal
        auction={selectedAuction}
        onClose={() => setSelectedAuction(null)}
        onNavigate={handleNavigate}
      />
    </section>
  );
};
