import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import events from "../data/events";

export default function RegistrationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8">All Events</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((e, i) => {
            const isLastSingle = i === events.length - 1 && events.length % 3 === 1;
            const cardClass = "rounded-2xl border bg-black p-0" + (isLastSingle ? " justify-self-center" : "");

            return (
              <div key={e.slug || i} className={cardClass}>
                <div style={{ position: "relative", paddingTop: "133%", overflow: "hidden" }}>
                  {e.image && (
                    // show image if present
                    // use a simple img without absolute positioning to avoid parser issues
                    <img src={e.image} alt={e.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>

                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ fontWeight: 800 }}>{e.title}</h4>

                    <button
                      onClick={() => navigate(e.registerUrl)}
                      style={{ background: "#FBBF24", color: "#000", padding: "8px 12px", borderRadius: 999 }}
                    >
                      Register <ArrowRight size={14} />
                    </button>
                  </div>

                  <p style={{ marginTop: 8, color: "#bbb" }}>Click register to book your slot.</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
