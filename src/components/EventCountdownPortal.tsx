import React, { useState, useEffect } from "react";

const EventCountdownPortal = () => {
  const eventStartDate = new Date("2026-03-02");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate time remaining
  useEffect(() => {
    const now = new Date(currentTime);
    const diff = eventStartDate.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeRemaining({ days, hours, minutes, seconds });
  }, [currentTime]);

  return (
    <div className="w-full bg-black py-32 px-6 border-t border-yellow-600/20">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(255, 211, 0, 0.4), 
                        inset 0 0 20px rgba(255, 211, 0, 0.1);
          }
          50% { 
            box-shadow: 0 0 50px rgba(255, 211, 0, 0.8), 
                        inset 0 0 30px rgba(255, 211, 0, 0.2);
          }
        }

        @keyframes slide-in-down {
          0% { 
            opacity: 0;
            transform: translateY(-30px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .timer-container {
          animation: pulse-glow 2.5s ease-in-out infinite;
        }

        .timer-digit {
          font-variant-numeric: tabular-nums;
          font-family: 'Arial Black', Arial, sans-serif;
          font-weight: 900;
          letter-spacing: 0.05em;
        }

        .timer-label {
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .section-title {
          animation: slide-in-down 0.8s ease-out;
        }
        
        .glow-text {
          color: #ffd300 !important;
          text-shadow: 0 0 20px rgba(255, 211, 0, 0.6);
        }
      `}</style>

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Title */}
        <div className="text-center mb-16 section-title">
          <h2 className="text-4xl md:text-5xl font-black mb-3 glow-text">
            <span>E-Horyzon </span>
            <span>2026</span>
          </h2>
          <p className="text-white/60 text-lg glow-text">Get ready for the ultimate innovation experience</p>
        </div>

        {/* Main Timer */}
        <div className="timer-container rounded-3xl border-4 border-yellow-400 bg-gradient-to-br from-black via-black to-black/90 p-10 md:p-16 w-full max-w-3xl backdrop-blur-xl">
          {/* Timer Grid */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 mb-8">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="timer-digit text-5xl md:text-7xl text-yellow-400 leading-none">
                {String(timeRemaining.days).padStart(2, "0")}
              </div>
              <div className="timer-label text-yellow-600 text-sm md:text-base mt-4">
                Days
              </div>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="timer-digit text-5xl md:text-7xl text-yellow-400 leading-none">
                {String(timeRemaining.hours).padStart(2, "0")}
              </div>
              <div className="timer-label text-yellow-600 text-sm md:text-base mt-4">
                Hours
              </div>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="timer-digit text-5xl md:text-7xl text-yellow-400 leading-none">
                {String(timeRemaining.minutes).padStart(2, "0")}
              </div>
              <div className="timer-label text-yellow-600 text-sm md:text-base mt-4">
                Mins
              </div>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="timer-digit text-5xl md:text-7xl text-yellow-400 leading-none">
                {String(timeRemaining.seconds).padStart(2, "0")}
              </div>
              <div className="timer-label text-yellow-600 text-sm md:text-base mt-4">
                Secs
              </div>
            </div>
          </div>

          {/* Coming Soon Text */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl md:text-3xl text-yellow-400 font-bold">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCountdownPortal;
