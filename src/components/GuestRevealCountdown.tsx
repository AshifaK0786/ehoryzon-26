import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";

const GuestRevealCountdown = () => {
  // ✅ MANUALLY CONTROL REVEAL HERE (0 to 12)
  const revealedCount = 0; 

  const guests = [
    { id: 1, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-1.gif" },
    { id: 2, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-2.gif" },
    { id: 3, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-3.gif" },
    { id: 4, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-4.gif" },
    { id: 5, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-5.gif" },
    { id: 6, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-6.gif" },
    { id: 7, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-7.gif" },
    { id: 8, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-8.gif" },
    { id: 9, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-9.gif" },
    { id: 10, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-10.gif" },
    { id: 11, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-11.gif" },
    { id: 12, name: "Mystery Guest", role: "Coming Soon", gif: "/assets/guests/guest-12.gif" },
  ];

  const [carouselIndex, setCarouselIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  const unlockedCards = Array.from({ length: revealedCount }, (_, i) => i + 1);
  const isCardUnlocked = (cardId: number) => unlockedCards.includes(cardId);

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
    <div className="w-full bg-transparent py-20 px-6 border-t border-yellow-600/20">
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes lock-bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }

        .guest-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .guest-card:hover {
          transform: translateY(-8px);
        }

        .locked-overlay {
          backdrop-filter: blur(8px);
        }

        .lock-icon {
          animation: lock-bounce 2s ease-in-out infinite;
        }

        .carousel-transition {
          animation: fade-in-up 0.5s ease-out;
        }

        .section-title {
          animation: slide-in-left 0.6s ease-out;
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
            <span className="text-yellow-400">Reveal</span>
          </h2>
          <p className="text-white/70 text-lg">Meet the visionaries shaping the future</p>
        </div>

        {/* Timeline Indicator */}
        <div className="mb-16 flex justify-center">
          <div className="flex items-center gap-2 md:gap-4">
            {Array.from({ length: 6 }).map((_, dayIndex) => {
              const cardsInThisStep = (dayIndex + 1) * 2;
              const isRevealed = revealedCount >= cardsInThisStep;

              return (
                <div key={dayIndex} className="flex items-center gap-2 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                        isRevealed
                          ? "border-yellow-400 bg-yellow-400 text-black shadow-[0_0_20px_rgba(255,211,0,0.4)]"
                          : "border-yellow-600/30 bg-black text-white/50"
                      }`}
                    >
                      {dayIndex + 1}
                    </div>
                  </div>

                  {dayIndex < 5 && (
                    <div
                      className={`h-1 w-4 md:w-8 transition-colors duration-500 ${
                        revealedCount >= (dayIndex + 2) * 2 ? "bg-yellow-400" : "bg-yellow-600/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative carousel-transition">
          {/* Left Button */}
          <button
            onClick={handlePrevious}
            disabled={carouselIndex === 0}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-lg shadow-yellow-400/20"
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

                return (
                  <div key={guest.id} className="guest-card relative group cursor-pointer">
                    <div className="rounded-2xl overflow-hidden border border-yellow-600/20 bg-black/40 backdrop-blur-md h-full transition-all duration-500 hover:border-yellow-400/50">
                      {/* Image Container */}
                      <div className="aspect-square relative bg-black overflow-hidden">
                        {unlocked ? (
                          <>
                            <img
                              src={guest.gif}
                              alt={guest.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                              <span className="text-white/70 font-semibold tracking-widest uppercase text-xs">Revealing Soon</span>
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            disabled={carouselIndex >= guests.length - 2}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-lg shadow-yellow-400/20"
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
              onClick={() => setCarouselIndex(i * 2)}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(carouselIndex / 2) === i ? "bg-yellow-400 w-8" : "bg-yellow-600/30 w-2"
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
