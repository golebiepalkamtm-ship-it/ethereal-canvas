 import { useRef, useEffect } from "react";
 import { motion, useScroll, useTransform } from "framer-motion";
 import { gsap } from "gsap";
 import { ScrollTrigger } from "gsap/ScrollTrigger";
 import { ArrowLeft, Sparkles, Zap, Filter } from "lucide-react";
 import { Link } from "react-router-dom";
 import { ParticleBackground } from "@/components/gallery/ParticleBackground";
 import { AuctionsSection } from "@/components/auctions/AuctionsSection";
 import { Button } from "@/components/ui/button";
 
 gsap.registerPlugin(ScrollTrigger);
 
 const Auctions = () => {
   const heroRef = useRef<HTMLDivElement>(null);
   const titleRef = useRef<HTMLHeadingElement>(null);
   const { scrollY } = useScroll();
   
   // Parallax effect for hero
   const heroY = useTransform(scrollY, [0, 500], [0, 150]);
   const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
   const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
 
   useEffect(() => {
     const ctx = gsap.context(() => {
       // Animated title reveal
       if (titleRef.current) {
         const chars = titleRef.current.querySelectorAll(".char");
         gsap.fromTo(
           chars,
           { 
             opacity: 0, 
             y: 100,
             rotateX: -90,
           },
           {
             opacity: 1,
             y: 0,
             rotateX: 0,
             duration: 1.2,
             stagger: 0.05,
             ease: "power4.out",
           }
         );
       }
 
       // Floating elements animation
       gsap.to(".floating-orb", {
         y: -20,
         duration: 3,
         ease: "sine.inOut",
         yoyo: true,
         repeat: -1,
         stagger: 0.5,
       });
     });
 
     return () => ctx.revert();
   }, []);
 
   const titleText = "AUKCJE";
 
   return (
     <main className="relative min-h-screen overflow-x-hidden bg-background">
       <ParticleBackground />
       
       {/* Animated gradient orbs */}
       <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="floating-orb absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
         <div className="floating-orb absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
         <div className="floating-orb absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
       </div>
 
       {/* Hero Section */}
       <motion.div
         ref={heroRef}
         style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
         className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-20"
       >
         {/* Back button */}
         <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.5 }}
           className="absolute top-8 left-8 z-20"
         >
           <Link to="/">
             <Button variant="ghost" className="gap-2 group">
               <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
               Powrót
             </Button>
           </Link>
         </motion.div>
 
         {/* Decorative elements */}
         <motion.div
           initial={{ scale: 0, rotate: -180 }}
           animate={{ scale: 1, rotate: 0 }}
           transition={{ delay: 0.3, duration: 1, ease: "backOut" }}
           className="absolute top-1/4 left-1/4 hidden lg:block"
         >
           <Sparkles className="w-8 h-8 text-primary/40" />
         </motion.div>
         <motion.div
           initial={{ scale: 0, rotate: 180 }}
           animate={{ scale: 1, rotate: 0 }}
           transition={{ delay: 0.5, duration: 1, ease: "backOut" }}
           className="absolute bottom-1/3 right-1/4 hidden lg:block"
         >
           <Zap className="w-10 h-10 text-amber-500/40" />
         </motion.div>
 
         {/* Main title with character animation */}
         <div className="text-center space-y-6 relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
           >
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
               <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
             </span>
             <span className="text-sm font-medium text-primary">Aktywne aukcje</span>
           </motion.div>
 
           <h1
             ref={titleRef}
             className="font-display text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter"
             style={{ perspective: "1000px" }}
           >
             {titleText.split("").map((char, i) => (
               <span
                 key={i}
                 className="char inline-block bg-gradient-to-br from-primary via-amber-300 to-primary bg-clip-text text-transparent"
                 style={{ transformStyle: "preserve-3d" }}
               >
                 {char}
               </span>
             ))}
           </h1>
 
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.2 }}
             className="text-xl text-muted-foreground max-w-2xl mx-auto"
           >
             Ekskluzywna kolekcja mistrzowskich gołębi pocztowych.
             <br />
             <span className="text-foreground font-medium">Licytuj i zdobądź zwycięzców.</span>
           </motion.p>
 
           {/* Stats row */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.4 }}
             className="flex flex-wrap items-center justify-center gap-8 pt-8"
           >
             {[
               { value: "24", label: "Aktywne aukcje" },
               { value: "€85K+", label: "Łączna wartość" },
               { value: "156", label: "Licytujących" },
             ].map((stat, i) => (
               <div key={i} className="text-center">
                 <p className="font-display text-3xl font-bold gold-text">{stat.value}</p>
                 <p className="text-sm text-muted-foreground">{stat.label}</p>
               </div>
             ))}
           </motion.div>
         </div>
 
         {/* Scroll indicator */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2 }}
           className="absolute bottom-8 left-1/2 -translate-x-1/2"
         >
           <motion.div
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="flex flex-col items-center gap-2 text-muted-foreground"
           >
             <span className="text-xs uppercase tracking-widest">Przewiń</span>
             <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
           </motion.div>
         </motion.div>
       </motion.div>
 
       {/* Auctions content */}
       <div className="relative z-10">
         <AuctionsSection />
       </div>
 
       {/* Footer */}
       <footer className="relative z-10 py-12 text-center border-t border-border/20">
         <p className="text-muted-foreground text-sm">
           © 2024 Champions Gallery — Ekskluzywna Hodowla Gołębi Pocztowych
         </p>
       </footer>
     </main>
   );
 };
 
 export default Auctions;