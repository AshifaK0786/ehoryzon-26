import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import herologo from "../assets/hero-logo.png";
import iic from "../assets/IIC_Logo_Transparent.png";
import emdc from "../assets/EMDC Transpernt.png";
import kec from "../assets/kec.png";
import tbi from "../assets/tbi1.png";

import heroVideo from "../assets/hero.mp4";
import parameshwaransir from "../assets/parameshwaransir.jpeg";
import kannansir from "../assets/kannansir.jpeg";
import praveensir from "../assets/praveensir.jpeg";

const logos = [kec, herologo, iic, emdc];

const staffData = [
  {
    img: parameshwaransir,
    name: "Mr E R K Krishnan",
    role: "Correspondent @KEC",
    desc: "Leads the incubation cell with focus on industry partnerships and research commercialization.",
  },
  {
    img: parameshwaransir,
    name: "Dr.R .Parameshwaran",
    role: "Principal",
    desc: "Oversees student initiatives and mentors startup teams.",
  },
  {
    img: kannansir,
    name: "Mr.P.S.Kannan",
    role: "Executive Director @KonguTBI",
    desc: "Manages funds and sponsorships for incubation programmes.",
  },
  {
    img: praveensir,
    name: "Dr.Praveen Kumar Subramanian",
    role: "president @KonguTBI",
    desc: "Provides academic guidance and facilitates collaborations.",
  },
];

// Team Members Data
const teamMembers = [
  {
    id: 1,
    name: "V HarrisjayaKumar",
    photo: "/assets/coordinatorspic/harrisjaya kumar.jpeg",
    linkedin: "https://www.linkedin.com/in/harrisjayakumar-v/",
    whatsapp: "https://wa.me/918838416061",
  },
  {
    id: 2,
    name: "G V Dheepiga",
    photo: "/assets/coordinatorspic/deepiga.jpeg",
    linkedin: " https://www.linkedin.com/in/dheepiga-gv-992b4b379/",
    whatsapp: "https://wa.me/9095060234",
  },
  {
    id: 3,
    name: "G HariHaran",
    photo: "/assets/coordinatorspic/HariHaran.jpeg",
    linkedin: "https://www.linkedin.com/in/hariharan-ganeshpandian-89296a300/",
    whatsapp: "https://wa.me/916383828539",
  },
  {
    id: 4,
    name: "S Praneshbalaji",
    photo: "/assets/coordinatorspic/pranesh.jpeg",
    linkedin: " https://www.linkedin.com/in/praneshbalaji30/",
    whatsapp: "https://wa.me/919566822541",
  },
  {
    id: 5,
    name: "M K Sai Sanjay",
    photo: "/assets/coordinatorspic/SaiSanjay.jpeg",
    linkedin: "- https://www.linkedin.com/in/sai-sanjay-8a8044280/",
    whatsapp: "https://wa.me/919080938997",
  },
  {
    id: 6,
    name: "S Kanika",
    photo: "/assets/coordinatorspic/kanika.jpeg",
    linkedin: " https://www.linkedin.com/in/kanika-sakthivel/",
    whatsapp: "https://wa.me/916374424880",
  },
  {
    id: 7,
    name: "A S Haryni",
    photo: "/assets/coordinatorspic/Haryni.jpeg",
    linkedin: "-https://www.linkedin.com/in/haryni-a-s-2b75b1324/",
    whatsapp: "https://wa.me/918015977095",
  },
  {
    id: 8,
    name: "K Ashifa ",
    photo: "/assets/coordinatorspic/Ashifa.jpeg",
    linkedin: "https://www.linkedin.com/in/ashifa-k786/",
    whatsapp: "https://wa.me/919344939976",
  },
  {
    id: 9,
    name: "P Santhosh",
    photo: "/assets/coordinatorspic/",
    linkedin: " https://www.linkedin.com/in/santhosh-p-30a78933b/",
    whatsapp: "https://wa.me/919566971605",
  },
  {
    id: 10,
    name: "M Abdul Sahith",
    photo: "/assets/coordinatorspic/abdul.jpeg",
    linkedin: " https://www.linkedin.com/in/abdulsahith/",
    whatsapp: "https://wa.me/918056712504",
  },
  {
    id: 11,
    name: "J Yuga Bharathi",
    photo: "/assets/coordinatorspic/",
    linkedin: "https://www.linkedin.com/in/yugabharathi21/",
    whatsapp: "https://wa.me/918838144028",
  },
  {
    id: 12,
    name: "M Harini",
    photo: "/assets/coordinatorspic/harinicsd.jpeg",
    linkedin: "https://www.linkedin.com/in/harinim14/",
    whatsapp: "https://wa.me/916380154463",
  },
  
  {
    id: 13,
    name: "L V Suriya",
    photo: "",
    linkedin: "#",
    whatsapp: "https://wa.me/918870331488",
  },
  {
    id: 14,
    name: "V Dharshan Roshanth",
    photo: "/assets/coordinatorspic/dharsan.png",
    linkedin: "https://www.linkedin.com/in/dharshan-roshanth-25jun2005/",
    whatsapp: "https://wa.me/919363197993",
  },
  {
    id: 15,
    name: "S Pragatheeswari",
    photo: "/assets/coordinatorspic/pragatheeshwari.jpeg", 
    linkedin: "https://www.linkedin.com/in/pragatheeswari-selvaraj-62527a320/",
    whatsapp: "https://wa.me/9163740 43056",

  }
];

// Coordinator carousels removed per request

function LogoMarquee() {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 py-4 border-b border-white/5">
      <div className="relative">
        <div className="flex gap-60
         items-center justify-center px-6">
          {logos.map((src, i) => (
            <div key={i} className="flex items-center justify-center">
              <img src={src} alt={`logo-${i}`} className="h-12 w-auto opacity-95 object-contain" onError={(e)=> (e.currentTarget.style.display='none')} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
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

  return (
    <section
      ref={ref}
      className={`py-16 text-center px-6 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "0.8s",
        transitionTimingFunction: "ease-out",
      }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">About the Incubation & Innovation Cell</h1>
      <p className="max-w-3xl mx-auto text-neutral-300 text-lg md:text-xl opacity-90">
        Our incubation cell empowers students and faculty to transform ideas into impactful ventures. We
        foster innovation through mentorship, funding support, and industry collaborations.
      </p>
    </section>
  );
}

function VideoSection() {
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

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center justify-center pt-24 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "0.8s",
        transitionTimingFunction: "ease-out",
      }}
    >
      <LogoMarquee />
      <div className="absolute inset-0">
        <video src={heroVideo} autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>Our Ecosystem</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* IEF@KEC */}

          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>About IEF@KEC</h3>
            <p className="text-white text-lg mb-4 transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>
              The KEC Innovation and Entrepreneurship Forum (IEF@KEC) is the unified innovation and entrepreneurship ecosystem of Kongu Engineering College. It brings together institutional and national initiatives to nurture creativity, innovation, and startup culture among students and faculty.
            </p>
            <p className="text-white text-lg transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>
              IEF@KEC integrates KISP, EMDC, IIC@KEC, MoE Innovation Ambassadors, SIH & YUKTI, KEC Spark Fund, and the Technology Business Incubator (TBI@KEC) to support innovators from idea generation to startup commercialization.
            </p>
          </div>

          {/* EMDC */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>Entrepreneurship and Management Development Centre (EMDC)</h3>
            <p className="text-white text-lg transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>
              Established in 1993 with Central Government support, EMDC promotes entrepreneurship as a viable career option. It creates awareness, provides pre-incubation support, and helps students and innovators transform ideas into campus startups and new ventures.
            </p>
          </div>

          {/* IIC@KEC */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>Institution's Innovation Council (IIC@KEC)</h3>
            <p className="text-white text-lg transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>
              Established in 2018–19 under the guidance of the MoE Innovation Cell, IIC@KEC drives innovation-led activities as per the national calendar. It organizes workshops, hackathons, idea competitions, prototype expos, and industry interactions to strengthen the innovation ecosystem.
            </p>
          </div>

          {/* TBI@KEC */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>Technology Business Incubator (TBI@KEC)</h3>
            <p className="text-white text-lg transition-colors cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.color = "#ac791b"} onMouseLeave={(e) => e.currentTarget.style.color = "white"}>
              Established in 2003 with support from Department of Science and Technology, TBI@KEC provides end-to-end support from concept to commercialization. With world-class infrastructure, mentoring, funding assistance, and investor networking, it focuses on nurturing technology-based startups, especially in Electronics and ICT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaffSection() {
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

  return (
    <section
      ref={ref}
      className={`py-6 px-6 max-w-6xl mx-auto transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "0.8s",
        transitionTimingFunction: "ease-out",
      }}
    >
      <h3 className="text-3xl font-bold text-center mb-8">Head Staff</h3>
      <div className="space-y-10">
        {staffData.map((s, i) => (
          <div key={i} className="grid gap-6 items-center md:grid-cols-2">
            {i % 2 === 0 ? (
              <>
                <div className="flex justify-center md:justify-start">
                  <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover" onError={(e)=> (e.currentTarget.style.display='none')} />
                  </div>
                </div>
                <div>
                  <div className="p-6 rounded-xl bg-white/3 border border-white/6 shadow-inner">
                    <h4 className="text-2xl font-semibold">{s.name}</h4>
                    <div className="text-yellow-300 font-medium my-1">{s.role}</div>
                    <p className="text-neutral-300">{s.desc}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="p-6 rounded-xl bg-white/3 border border-white/6 shadow-inner">
                    <h4 className="text-2xl font-semibold">{s.name}</h4>
                    <div className="text-yellow-300 font-medium my-1">{s.role}</div>
                    <p className="text-neutral-300">{s.desc}</p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover" onError={(e)=> (e.currentTarget.style.display='none')} />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Organization content
const organizationContent = [
  {
    id: 1,
    title: "About IEF@KEC",
    text: "The KEC Innovation and Entrepreneurship Forum (IEF@KEC) is the unified innovation and entrepreneurship ecosystem of Kongu Engineering College. It brings together institutional and national initiatives to nurture creativity, innovation, and startup culture among students and faculty.\n\nIEF@KEC integrates KISP, EMDC, IIC@KEC, MoE Innovation Ambassadors, SIH & YUKTI, KEC Spark Fund, and the Technology Business Incubator (TBI@KEC) to support innovators from idea generation to startup commercialization.",
  },
  {
    id: 2,
    title: "Entrepreneurship and Management Development Centre (EMDC)",
    text: "Established in 1993 with Central Government support, EMDC promotes entrepreneurship as a viable career option. It creates awareness, provides pre-incubation support, and helps students and innovators transform ideas into campus startups and new ventures.",
  },
  {
    id: 3,
    title: "Institution's Innovation Council (IIC@KEC)",
    text: "Established in 2018–19 under the guidance of the MoE Innovation Cell, IIC@KEC drives innovation-led activities as per the national calendar. It organizes workshops, hackathons, idea competitions, prototype expos, and industry interactions to strengthen the innovation ecosystem.",
  },
  {
    id: 4,
    title: "Technology Business Incubator (TBI@KEC)",
    text: "Established in 2003 with support from Department of Science and Technology, TBI@KEC provides end-to-end support from concept to commercialization. With world-class infrastructure, mentoring, funding assistance, and investor networking, it focuses on nurturing technology-based startups, especially in Electronics and ICT.",
  },
];

function ContentBlock({ title, text }: { title: string; text: string }) {
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
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "0.8s",
        transitionTimingFunction: "ease-out",
      }}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-3">
        {title}
      </h3>
      <p className="text-base md:text-lg leading-relaxed text-yellow-200 whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}

function OrganizationsSection() {
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(false);
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-6 bg-transparent">
    </section>
  );
}

function TeamMembersCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
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

  // Auto-advance carousel every 2 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get 5 members to show (2 on left, 1 center zoomed, 2 on right)
  const getVisibleMembers = () => {
    const members = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + teamMembers.length) % teamMembers.length;
      members.push({
        ...teamMembers[index],
        position: i, // -2, -1, 0 (center), 1, 2
      });
    }
    return members;
  };

  const visibleMembers = getVisibleMembers();

  return (
    <section
      id="our-team"
      ref={ref}
      className={`py-16 px-6 max-w-7xl mx-auto transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "0.8s",
        transitionTimingFunction: "ease-out",
      }}
    >
      <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>

      <div className="relative">
        {/* Carousel Container */}
        <div className="flex items-center justify-center gap-4 mb-12 min-h-[500px]">
          {visibleMembers.map((member) => (
            <div
              key={member.id}
              className={`transition-all duration-500 flex flex-col items-center ${
                member.position === 0
                  ? "scale-110 opacity-100 z-10"
                  : member.position === -1 || member.position === 1
                  ? "scale-75 opacity-60 z-0"
                  : "scale-50 opacity-0 hidden"
              }`}
            >
              {/* Photo Card */}
              <div className="relative mb-6">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 shadow-xl aspect-square flex items-center justify-center w-64 h-64">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
                      <svg
                        className="w-24 h-24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Member Details Card */}
              <div
                className={`bg-white/3 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm transition-all ${
                  member.position === 0 ? "w-72" : "w-56"
                }`}
              >
                <h3 className="text-xl font-bold mb-4">{member.name}</h3>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-700 hover:bg-yellow-300 flex items-center justify-center transition-colors"
                    title="LinkedIn"
                  >
                    <svg
                      className="w-5 h-5 text-white hover:text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.469v6.766z" />
                    </svg>
                  </a>
                  <a
                    href={member.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-700 hover:bg-yellow-300 flex items-center justify-center transition-colors"
                    title="WhatsApp"
                  >
                    <svg
                      className="w-5 h-5 text-white hover:text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-6 mb-8">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 transition-colors shadow-lg"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-2 hidden">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-yellow-300 w-8"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-yellow-300 text-black hover:bg-yellow-400 transition-colors shadow-lg"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

function PosterCarousel({ images = [] }) {
  const scrollerRef = useRef(null);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition"
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => scrollByCard(1)}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition"
        aria-label="Scroll right"
      >
        <ChevronRight size={18} />
      </button>

      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex gap-6 pr-[120px]">
          {images.map((src, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[260px] sm:w-[320px] md:w-[340px] aspect-[3/4] rounded-2xl overflow-hidden border border-yellow-600/20 bg-black relative"
            >
              <img
                src={src}
                alt={`carousel-${i}`}
                className="relative z-10 w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CoordinatorCarousel removed

export default function AboutUs() {
  // mark todo step progress
  const highlightCarousel = [
    "/assets/highlights/h1.jpg",
    "/assets/highlights/h2.jpg",
    "/assets/highlights/h3.jpg",
    "/assets/highlights/last-event.jpg",
  ];

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <VideoSection />
      <OrganizationsSection />
      <StaffSection />
      <TeamMembersCarousel />

      {/* Student Coordinators section removed per request */}

      {/* Highlights Carousel */}
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Highlights Carousel
          </h3>
        </div>
        <PosterCarousel images={highlightCarousel} />
      </div>

      <footer className="py-8 text-center text-neutral-400">&copy; {new Date().getFullYear()} Incubation & Innovation Cell</footer>
    </div>
  );
}
