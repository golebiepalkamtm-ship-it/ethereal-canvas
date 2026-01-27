import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Star, Award, Zap } from "lucide-react";
import { achievementsData } from "@/data/achievements";

gsap.registerPlugin(ScrollTrigger);

const icons = [Trophy, Star, Award, Zap];

export const AchievementsTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const progress = progressRef.current;
    const cards = cardsRef.current;

    if (!section || !timeline || !progress || cards.length === 0) return;

    // Create scroll trigger context
    const ctx = gsap.context(() => {
      // Animate the timeline progress line
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      // Animate each card flying in
      cards.forEach((card, index) => {
        if (!card) return;

        const isEven = index % 2 === 0;
        
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isEven ? -150 : 150,
            y: 80,
            rotateY: isEven ? -25 : 25,
            rotateX: 10,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.5,
              toggleActions: "play none none reverse",
            },
          }
        );

        // Add glow effect on scroll
        gsap.to(card, {
          boxShadow: "0 0 40px hsl(45 80% 55% / 0.3)",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            end: "top 40%",
            scrub: true,
          },
        });
      });

      // Animate timeline dots
      const dots = timeline.querySelectorAll(".timeline-dot");
      dots.forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: cards[index] || dot,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Section header */}
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block px-4 py-1 border border-primary/30 rounded-full text-xs tracking-[0.2em] text-primary/70 uppercase mb-4 neon-border">
          Historia Sukcesu
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-bold gold-text mb-4 animate-text-flicker">
          Osiągnięcia Hodowli
        </h2>
        <div
          className="w-24 h-0.5 mx-auto mb-6 neon-border"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(45 80% 55%), transparent)",
          }}
        />
        <p className="text-muted-foreground max-w-xl mx-auto">
          Kompletna kronika wszystkich sezonów hodowli Pałka MTM
        </p>
      </div>

      {/* Timeline container */}
      <div className="max-w-5xl mx-auto relative">
        {/* Timeline line - left side */}
        <div
          ref={timelineRef}
          className="absolute left-4 md:left-8 top-0 bottom-0 w-1 z-20"
        >
          {/* Background track */}
          <div className="absolute inset-0 bg-border/30 rounded-full" />
          
          {/* Animated progress */}
          <div
            ref={progressRef}
            className="absolute inset-0 rounded-full origin-top"
            style={{
              background: "linear-gradient(180deg, hsl(45 80% 55%), hsl(45 70% 40%), hsl(45 80% 55%))",
              boxShadow: "0 0 20px hsl(45 80% 55% / 0.5), 0 0 40px hsl(45 80% 55% / 0.3)",
            }}
          />

          {/* Timeline dots */}
          {achievementsData.map((yearData, index) => (
            <div
              key={yearData.year}
              className="timeline-dot absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
              style={{
                top: `${(index / (achievementsData.length - 1)) * 100}%`,
                boxShadow: "0 0 15px hsl(45 80% 55% / 0.6)",
              }}
            />
          ))}
        </div>

        {/* Cards */}
        <div className="relative z-10 space-y-8 pl-16 md:pl-24">
          {achievementsData.map((yearData, yearIndex) => {
            return (
              <div
                key={yearData.year}
                ref={(el) => setCardRef(el, yearIndex)}
                className="group relative perspective-1000"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Connector line from timeline to card */}
                <div
                  className="absolute left-[-3rem] md:left-[-4.5rem] top-8 w-8 md:w-12 h-0.5"
                  style={{
                    background: "linear-gradient(90deg, hsl(45 80% 55%), transparent)",
                  }}
                />

                <div className="relative glass-card rounded-2xl p-5 border border-border/30 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-glow-sm">
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />

                  {/* Year header */}
                  <div className="relative z-10 flex justify-between items-baseline gap-3 mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-primary tracking-wider">
                      {yearData.year}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {yearData.achievements.length} osiągnięć
                    </span>
                  </div>

                  {/* Achievements list */}
                  <ul className="relative z-10 space-y-2.5">
                    {yearData.achievements.map((ach, achIndex) => {
                      const IconComponent = icons[achIndex % icons.length];
                      return (
                        <li
                          key={achIndex}
                          className="group/item relative bg-background/30 border border-border/20 rounded-xl p-3 transition-all duration-300 hover:bg-background/50 hover:border-primary/30"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary/20 transition-colors">
                              <IconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-foreground font-medium text-sm leading-tight">
                                {ach.title}
                              </p>
                              {ach.detail && (
                                <p className="text-muted-foreground text-xs mt-0.5">
                                  {ach.detail}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Hover glow */}
                          <div
                            className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              boxShadow: "inset 0 0 20px hsl(45 80% 55% / 0.1)",
                            }}
                          />
                        </li>
                      );
                    })}
                  </ul>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rotate-45" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-muted-foreground text-sm mt-12 relative z-10">
        Dane z oficjalnej historii hodowli Pałka MTM • 2001–2024
      </p>
    </section>
  );
};
