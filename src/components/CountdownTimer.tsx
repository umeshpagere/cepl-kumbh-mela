import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  // Target date for main Shahi Snan (hardcoded as requested)
  const targetDate = new Date('2027-02-16T06:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'text-primary' },
    { label: 'Hours', value: timeLeft.hours, color: 'text-secondary' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'text-accent' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'text-primary-glow' },
  ];

  return (
    <div className="bg-card/80 backdrop-blur-md rounded-2xl p-8 shadow-warm border border-border/50">
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          Countdown to Main Shahi Snan
        </h3>
        <p className="text-muted-foreground">February 16, 2027 • 6:00 AM</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => (
          <div 
            key={unit.label}
            className="text-center group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="bg-gradient-hero p-4 rounded-xl shadow-card group-hover:shadow-glow transition-smooth">
              <div className={`text-3xl md:text-4xl font-bold text-white ${unit.color}`}>
                {unit.value.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="mt-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Join millions of devotees at the world's largest spiritual gathering
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;