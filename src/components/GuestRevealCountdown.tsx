import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Lock, Gift } from "lucide-react";

const GuestRevealCountdown = () => {
  // Mock guest data - 12 guests
  const guests = [
    { id: 1, name: "Rajesh Kumar", role: "Startup Founder", gif: "/assets/guests/guest-1.gif" },
    { id: 2, name: "Priya Sharma", role: "Tech Innovator", gif: "/assets/guests/guest-2.gif" },
    { id: 3, name: "Arun Patel", role: "Business Leader", gif: "/assets/guests/guest-3.gif" },
    { id: 4, name: "Deepa Gupta", role: "Investment Expert", gif: "/assets/guests/guest-4.gif" },
    { id: 5, name: "Vikram Singh", role: "Tech Entrepreneur", gif: "/assets/guests/guest-5.gif" },
    { id: 6, name: "Neha Desai", role: "Marketing Strategist", gif: "/assets/guests/guest-6.gif" },
    { id: 7, name: "Arjun Menon", role: "Product Manager", gif: "/assets/guests/guest-7.gif" },
    { id: 8, name: "Sakshi Verma", role: "Brand Builder", gif: "/assets/guests/guest-8.gif" },
    { id: 9, name: "Rohan Iyer", role: "Finance Expert", gif: "/assets/guests/guest-9.gif" },
    { id: 10, name: "Anaya Nair", role: "Creative Director", gif: "/assets/guests/guest-10.gif" },
    { id: 11, name: "Sanjay Chopra", role: "Growth Hacker", gif: "/assets/guests/guest-11.gif" },
    { id: 12, name: "Isha Malhotra", role: "Visionary Leader", gif: "/assets/guests/guest-12.gif" },
  ];

  const eventDate = new Date("2026-02-23"); // Event date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [countdownText, setCountdownText] = useState("");
  const [unlockedCards, setUnlockedCards] = useState<number[]>([]);
  const [animatingCard, setAnimatingCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Calculate unlocked cards based on current date
  useEffect(() => {
    const daysElapsed = Math.floor((currentDate.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
    const cardsUnlocked = Math.min(daysElapsed * 2, 12);
    const newUnlockedCards = Array.from({ length: cardsUnlocked }, (_, i) => i + 1);
    setUnlockedCards(newUnlockedCards);
  }, [currentDate]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate countdown to next reveal
  useEffect(() => {
    const calculateCountdown = () => {
      const daysElapsed = Math.floor((currentDate.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
      const nextRevealDay = Math.ceil((unlockedCards.length + 1) / 2);

      if (unlockedCards.length >= 12) {
        setCountdownText("All Guests Revealed! 🎉");
        return;
      }

      const nextRevealDate = new Date(eventDate);
      nextRevealDate.setDate(nextRevealDate.getDate() + nextRevealDay);

      const timeUntilNextReveal = nextRevealDate.getTime() - currentDate.getTime();

      if (timeUntilNextReveal <= 0) {
        setCountdownText("Guest Revealing Now! ✨");
      } else {
        const days = Math.floor(timeUntilNextReveal / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeUntilNextReveal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilNextReveal % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setCountdownText(`${days}d ${hours}h until next reveal`);
        } else if (hours > 0) {
          setCountdownText(`${hours}h ${minutes}m until next reveal`);
        } else {
          setCountdownText(`${minutes}m until next reveal`);
        }
      }
    };

    calculateCountdown();
  }, [currentDate, unlockedCards.length]);

  const isCardUnlocked = (cardId: number) => unlockedCards.includes(cardId);

  const handleCardUnlock = (cardId: number) => {
    if (!isCardUnlocked(cardId) && animatingCard === null) {
      setAnimatingCard(cardId);
      setTimeout(() => setAnimatingCard(null), 1000);
    }
  };

  const handlePrevious = () => {
    setCarouselIndex(Math.max(0, carouselIndex - 1));
  };

  const handleNext = () => {
    setCarouselIndex(Math.min(guests.length - 2, carouselIndex + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) {
      handleNext();
    } else if (touchEndX - touchStartX.current > 50) {
      handlePrevious();
    }
  };

  const currentGuests = guests.slice(carouselIndex, carouselIndex + 2);

  return (
    <div className="w-full bg-gradient-to-b from-black via-black to-black/95 py-20 px-6 border-t border-yellow-600/20">
      <style>{`
        @keyframes unlock-glow {
          0% { box-shadow: 0 0 0 rgba(255, 211, 0, 0), inset 0 0 20px rgba(0, 0, 0, 0.8); }
          50% { box-shadow: 0 0 40px rgba(255, 211, 0, 0.8), inset 0 0 20px rgba(255, 211, 0, 0.2); }
          100% { box-shadow: 0 0 0 rgba(255, 211, 0, 0), inset 0 0 0px rgba(0, 0, 0, 0); }
        }

        @keyframes flip-unlock {
          0% { transform: rotateY(0deg); opacity: 1; }
          50% { transform: rotateY(90deg); opacity: 0.5; }
          100% { transform: rotateY(0deg); opacity: 1; }
        }

        @keyframes curtain-open {
          0% { clip-path: inset(0 0 0 0); }
          50% { clip-path: inset(0 25% 0 25%); }
          100% { clip-path: inset(0 0 0 0); }
        }

        @keyframes confetti-fall {
          0% { 
            transform: translate(0, -10px) rotate(0deg);
            opacity: 1;
          }
          100% { 
            transform: translate(var(--tx), 100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes lock-bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }

        @keyframes fade-in-up {
          0% { 
            opacity: 0;
            transform: translateY(20px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          0% { 
            opacity: 0;
            transform: translateX(-30px);
          }
          100% { 
            opacity: 1;
            transform: translateX(0);
          }
        }

        .guest-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .guest-card:hover {
          transform: translateY(-8px);
        }

        .guest-card.unlocking {
          animation: unlock-glow 0.8s ease-out;
        }

        .guest-card.unlocking .card-inner {
          animation: flip-unlock 0.8s ease-out;
        }

        .locked-overlay {
          backdrop-filter: blur(8px);
        }

        .lock-icon {
          animation: lock-bounce 0.6s ease-in-out;
        }

        .confetti {
          position: fixed;
          pointer-events: none;
          font-size: 20px;
        }

        .confetti.animate {
          animation: confetti-fall 0.8s ease-out forwards;
        }

        .timeline-dot {
          transition: all 0.3s ease;
        }

        .timeline-dot.revealed {
          background-color: #ffd300;
          box-shadow: 0 0 20px rgba(255, 211, 0, 0.6);
        }

        .timeline-connector {
          transition: background-color 0.3s ease;
        }

        .timeline-connector.revealed {
          background-color: #ffd300;
        }

        .carousel-transition {
          animation: fade-in-up 0.5s ease-out;
        }

        .section-title {
          animation: slide-in-left 0.6s ease-out;
        }

        .countdown-badge {
          animation: fade-in-up 0.6s ease-out 0.2s both;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16 section-title">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-white">Guest </span>
            <span className="text-yellow-400">Reveal Countdown</span>
          </h2>
          <p className="text-white/70 text-lg">Meet the visionaries shaping the future</p>
        </div>

        {/* Timeline Indicator */}
        <div className="mb-16 flex justify-center">
          <div className="flex items-center gap-2 md:gap-4">
            {Array.from({ length: 6 }).map((_, dayIndex) => {
              const cardsRevealedForDay = Math.min(2, Math.max(0, unlockedCards.length - dayIndex * 2));
              const isRevealed = cardsRevealedForDay > 0;

              return (
                <div key={dayIndex} className="flex items-center gap-2 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`timeline-dot w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                        isRevealed
                          ? "border-yellow-400 bg-yellow-400 text-black"
                          : "border-yellow-600/30 bg-black text-white/50"
                      }`}
                    >
                      {dayIndex + 1}
                    </div>
                    <span className="text-xs text-white/50 mt-2">
                      {isRevealed ? "✓" : "Locked"}
                    </span>
                  </div>

                  {dayIndex < 5 && (
                    <div
                      className={`timeline-connector h-1 w-4 md:w-8 transition-colors ${
                        isRevealed ? "bg-yellow-400" : "bg-yellow-600/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-16 countdown-badge">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-yellow-400/30 bg-yellow-400/5 backdrop-blur-md">
            <Gift className="text-yellow-400" size={20} />
            <span className="text-yellow-300 font-bold">{countdownText}</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative carousel-transition">
          {/* Left Button */}
          <button
            onClick={handlePrevious}
            disabled={carouselIndex === 0}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
            aria-label="Previous guests"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Cards Container */}
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="no-scrollbar px-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {currentGuests.map((guest) => {
                const unlocked = isCardUnlocked(guest.id);
                const isAnimating = animatingCard === guest.id;

                return (
                  <div
                    key={guest.id}
                    className={`guest-card relative group cursor-pointer ${
                      isAnimating ? "unlocking" : ""
                    }`}
                    onClick={() => handleCardUnlock(guest.id)}
                  >
                    {/* Card Container */}
                    <div className="card-inner rounded-2xl overflow-hidden border border-yellow-600/20 bg-black/40 backdrop-blur-md h-full">
                      {/* Image Container */}
                      <div className="aspect-square relative bg-black overflow-hidden">
                        {unlocked ? (
                          <>
                            <img
                              src={guest.gif}
                              alt={guest.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23222' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3EGuest%3C/text%3E%3C/svg%3E";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-black/80" />
                            <div className="locked-overlay absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                              <Lock className="lock-icon text-yellow-400" size={48} />
                              <span className="text-white/70 font-semibold">Revealing Soon</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Guest Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {unlocked ? guest.name : "Mystery Guest"}
                        </h3>
                        <p className="text-yellow-400 font-medium text-sm">
                          {unlocked ? guest.role : "Coming Soon"}
                        </p>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    {unlocked && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/20 group-hover:to-yellow-400/0 transition pointer-events-none" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            disabled={carouselIndex >= guests.length - 2}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
            aria-label="Next guests"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(guests.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCarouselIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === carouselIndex ? "bg-yellow-400 w-6" : "bg-yellow-600/30 w-2"
              }`}
              aria-label={`Go to guest group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestRevealCountdown;
