import { motion } from "framer-motion";
import { Trophy, Star, Award, Zap } from "lucide-react";
import { achievementsData } from "@/data/achievements";

const icons = [Trophy, Star, Award, Zap];

export const AchievementsTimeline = () => {
  return (
    <section className="relative py-24 px-4">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Section header */}
      <div className="text-center mb-16 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1 border border-primary/30 rounded-full text-xs tracking-[0.2em] text-primary/70 uppercase mb-4 neon-border"
        >
          Historia Sukcesu
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold gold-text mb-4 animate-text-flicker"
        >
          Osiągnięcia Hodowli
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="w-24 h-0.5 mx-auto mb-6 neon-border"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(45 80% 55%), transparent)",
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Kompletna kronika wszystkich sezonów hodowli Pałka MTM
        </motion.p>
      </div>

      {/* Timeline grid */}
      <motion.div
        className="max-w-6xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {achievementsData.map((yearData, yearIndex) => (
          <motion.div
            key={yearData.year}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                },
              },
            }}
            className="group relative"
          >
            <div className="relative glass-card rounded-2xl p-5 border border-border/30 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-glow-sm">
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer pointer-events-none" />

              {/* Year header */}
              <div className="relative z-10 flex justify-between items-baseline gap-3 mb-4">
                <motion.span 
                  className="text-2xl md:text-3xl font-bold text-primary tracking-wider"
                  whileHover={{ scale: 1.05 }}
                >
                  {yearData.year}
                </motion.span>
                <span className="text-muted-foreground text-sm">
                  {yearData.achievements.length} osiągnięć
                </span>
              </div>

              {/* Achievements list */}
              <ul className="relative z-10 space-y-2.5">
                {yearData.achievements.map((ach, achIndex) => {
                  const IconComponent = icons[achIndex % icons.length];
                  return (
                    <motion.li
                      key={achIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * achIndex }}
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
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: "inset 0 0 20px hsl(45 80% 55% / 0.1)",
                        }}
                      />
                    </motion.li>
                  );
                })}
              </ul>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rotate-45" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground text-sm mt-12 relative z-10"
      >
        Dane z oficjalnej historii hodowli Pałka MTM • 2001–2024
      </motion.p>
    </section>
  );
};
