import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import herologo from "../assets/hero-logo.png";
import praveensir from "../assets/guests/praveensir.jpeg";


// Import guest images - add your guest images here
// Format: import guestName from "../assets/guests/guest-1.jpg"
// If image doesn't exist, it will show "Revealing Soon"

interface GuestCard {
  id: number;
  name: string;
  image: any;
  status: "revealing-soon" | "revealed";
}

// List of 12 guests - using praveensir.jpeg as placeholder
const guestsList: GuestCard[] = [
  { id: 1, name: "Guest Speaker 1", image: praveensir, status: "revealed" },
  { id: 2, name: "Guest Speaker 2", image: praveensir, status: "revealed" },
  { id: 3, name: "Guest Speaker 3", image: praveensir, status: "revealed" },
  { id: 4, name: "Guest Speaker 4", image: praveensir, status: "revealed" },
  { id: 5, name: "Guest Speaker 5", image: praveensir, status: "revealed" },
  { id: 6, name: "Guest Speaker 6", image: praveensir, status: "revealed" },
  { id: 7, name: "Guest Speaker 7", image: praveensir, status: "revealed" },
  { id: 8, name: "Guest Speaker 8", image: praveensir, status: "revealed" },
  { id: 9, name: "Guest Speaker 9", image: praveensir, status: "revealed" },
  { id: 10, name: "Guest Speaker 10", image: praveensir, status: "revealed" },
  { id: 11, name: "Guest Speaker 11", image: praveensir, status: "revealed" },
  { id: 12, name: "Guest Speaker 12", image: praveensir, status: "revealed" },
];

function GuestCard({ guest }: { guest: GuestCard }) {
  const [imageError, setImageError] = useState(false);

  // Use the image from guest object
  const imagePath = guest.image;

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6 w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-yellow-600/50 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-lg hover:shadow-yellow-500/20 transition-all">
        {!imageError ? (
          <img
            src={imagePath}
            alt={guest.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : null}
        
        {imageError && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
            <svg
              className="w-20 h-20 text-yellow-400/50 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className="text-yellow-300/70 text-sm font-semibold">REVEALING SOON</p>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <h3 className="text-lg md:text-xl font-bold text-white mb-1">{guest.name}</h3>
        <p className="text-yellow-300/60 text-xs md:text-sm font-medium">
          {!imageError ? "Distinguished Speaker" : "Coming Soon"}
        </p>
      </div>
    </div>
  );
}

function GuestRevealCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Show 3 guests at a time (left, center, right)
  const getVisibleGuests = () => {
    const guests = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + guestsList.length) % guestsList.length;
      guests.push({
        ...guestsList[index],
        position: i,
      });
    }
    return guests;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % guestsList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + guestsList.length) % guestsList.length);
  };

  const visibleGuests = getVisibleGuests();

  return (
    <section
      ref={ref}
      className={`py-20 px-6 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Guest <span className="text-yellow-300">Reveal</span>
        </h1>
        <p className="text-neutral-300 text-lg">Meet the visionaries shaping the future</p>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mb-12">
        {guestsList.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-yellow-300 w-8"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to guest ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-6 mb-12 min-h-[400px]">
          {visibleGuests.map((guest) => (
            <div
              key={guest.id}
              className={`transition-all duration-500 flex flex-col items-center ${
                guest.position === 0
                  ? "scale-100 opacity-100 z-10"
                  : guest.position === -1 || guest.position === 1
                  ? "scale-75 opacity-50 z-0"
                  : "scale-50 opacity-0 hidden"
              }`}
            >
              <GuestCard guest={guest} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-8">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 transition-colors shadow-lg"
            aria-label="Previous guest"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 transition-colors shadow-lg"
            aria-label="Next guest"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function GuestReveal() {
  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      
      {/* Header with logo */}
      <div className="fixed top-0 left-0 right-0 z-50 py-6 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <img src={herologo} alt="E-Horyzon" className="h-12 w-auto" />
        </div>
      </div>

      {/* Main content with top padding */}
      <div className="pt-24">
        <GuestRevealCarousel />
      </div>

      <footer className="py-8 text-center text-neutral-400">
        &copy; {new Date().getFullYear()} E-Horyzon 2K26
      </footer>
    </div>
  );
}
