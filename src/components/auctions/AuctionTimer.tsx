import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface AuctionTimerProps {
  endTime: Date;
  compact?: boolean;
}

export const AuctionTimer = ({ endTime, compact = false }: AuctionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = endTime.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isExpired: true, isUrgent: false };
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const isUrgent = hours < 1;

    return { hours, minutes, seconds, isExpired: false, isUrgent };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.isExpired) {
    return (
      <div className={`flex items-center gap-1.5 text-destructive ${compact ? "text-xs" : "text-sm"}`}>
        <Clock className={compact ? "w-3 h-3" : "w-4 h-4"} />
        <span className="font-medium">Zakończona</span>
      </div>
    );
  }

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 ${timeLeft.isUrgent ? "text-destructive animate-pulse" : "text-muted-foreground"}`}>
        <Clock className="w-3 h-3" />
        <span className="font-mono text-xs font-medium">
          {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${timeLeft.isUrgent ? "text-destructive" : "text-foreground"}`}>
      <Clock className={`w-4 h-4 ${timeLeft.isUrgent ? "animate-pulse" : ""}`} />
      <div className="flex gap-1 font-mono">
        <TimeBlock value={formatNumber(timeLeft.hours)} label="godz" isUrgent={timeLeft.isUrgent} />
        <span className="text-muted-foreground">:</span>
        <TimeBlock value={formatNumber(timeLeft.minutes)} label="min" isUrgent={timeLeft.isUrgent} />
        <span className="text-muted-foreground">:</span>
        <TimeBlock value={formatNumber(timeLeft.seconds)} label="sek" isUrgent={timeLeft.isUrgent} />
      </div>
    </div>
  );
};

const TimeBlock = ({ value, label, isUrgent }: { value: string; label: string; isUrgent: boolean }) => (
  <div className="flex flex-col items-center">
    <span className={`text-lg font-bold ${isUrgent ? "text-destructive" : "text-primary"}`}>
      {value}
    </span>
    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
  </div>
);
