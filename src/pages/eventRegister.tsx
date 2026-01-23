import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import events from "../data/events";

type Person = {
  name: string;
  roll: string;
  department: string;
  collegeName?: string;
  year: string;
  mobile: string;
  email: string;
  collegeType?: "intra" | "inter";
};

export function EventRegisterForm({ event }: { event?: any }) {
  const navigate = useNavigate();
  const [collegeType, setCollegeType] = useState<"intra" | "inter" | "">("");

  const [person, setPerson] = useState<Person>({
    name: "",
    roll: "",
    department: "",
    year: "1",
    mobile: "",
    email: "",
    collegeType: undefined,
  });

  const [team, setTeam] = useState<Person[]>([]);
  const [teamName, setTeamName] = useState("");
  const [qrMissing, setQrMissing] = useState(false);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const guidelineUrl = event?.guidelinesFile ? `/assets/guidelines/${event.guidelinesFile}` : null;

  const departments = [
    "Automobile Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Mechatronics Engineering",
    "Electronics and Instrumentation Engineering",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Computer Science Engineering",
    "Information Technology",
    "Artificial Intelligence and Data Science",
    "Artificial Intelligence and Machine Learning",
    "Computer Science and Design",
    "Chemical Engineering",
    "Food Technology",
    "Architecture",
  ];

  const handlePersonChange = (k: keyof Person, v: string) => {
    setPerson((p) => ({ ...p, [k]: v }));
  };

  const maxTeam = event?.maxTeamMembers ?? 3;
  const allowedExtra = Math.max(0, maxTeam - 1); // extra members excluding the team lead

  const addTeamMember = () => {
    if (team.length >= allowedExtra) return;
    setTeam((t) => [...t, { name: "", roll: "", department: "", collegeName: "", year: "1", mobile: "", email: "" }]);
  };

  const updateTeamMember = (index: number, k: keyof Person, v: string) => {
    setTeam((t) => t.map((m, i) => (i === index ? { ...m, [k]: v } : m)));
  };

  const removeTeamMember = (index: number) => {
    setTeam((t) => t.filter((_, i) => i !== index));
  };

  const handleScreenshots = (fl?: FileList | null) => {
    if (!fl) return;
    setScreenshots(Array.from(fl));
  };

  const validate = () => {
    if (!collegeType) return "Please select Intra-college or Inter-college first";
    if (!person.name.trim()) return "Name is required";
    if (!person.roll.trim()) return "Roll number is required";
    if (!person.department) return "Department is required";
    if (collegeType === "inter" && !person.collegeName?.trim()) return "College name is required for Inter-college";
    if (!person.mobile.trim()) return "Mobile number is required";
    if (!person.email.trim()) return "Email is required";
    
    if (collegeType === "intra") {
      if (!person.email.endsWith("@kongu.edu")) return "Email must be a kongu.edu address for Intra-college";
    }
    
    for (let i = 0; i < team.length; i++) {
      const m = team[i];
      if (!m.name.trim()) return `Team member ${i + 1} name required`;
      if (!m.roll.trim()) return `Team member ${i + 1} roll required`;
      if (!m.department) return `Team member ${i + 1} department required`;
      if (collegeType === "inter" && !m.collegeName?.trim()) return `Team member ${i + 1} college name required for Inter-college`;
      if (!m.email.trim()) return `Team member ${i + 1} email required`;
      
      if (collegeType === "intra" && !m.email.endsWith("@kongu.edu")) return `Team member ${i + 1} must use kongu.edu email for Intra-college`;
    }
    return "";
  };

  const onSubmit = async (ev: React.FormEvent) => {
  ev.preventDefault();
  setError("");

  const msg = validate();
  if (msg) {
    setError(msg);
    return;
  }

  setSubmitting(true);

  try {
    const fd = new FormData();
    fd.append("team_name", teamName);

    // lead fields
    fd.append("lead_name", person.name);
    fd.append("lead_roll", person.roll);
    fd.append("lead_department", person.department);
    fd.append("lead_year", person.year);
    fd.append("lead_mobile", person.mobile);
    fd.append("lead_email", person.email);

    // team members JSON string
    fd.append("team_members", JSON.stringify(team));

     

    // (optional) single file example:
    if (screenshots[0]) fd.append("payment_screenshots", screenshots[0]);

    const res = await fetch(`https://sahith.xyz/${event.slug}/register/`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const data = await res.json().catch(async () => ({ error: await res.text() }));
      throw new Error(JSON.stringify(data));
    }

    alert("Registered successfully!");
    navigate(-1);
  } catch (err: any) {
    setError(err.message || "Submission failed");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-3 text-white/90 hover:text-yellow-400">
          <span className="p-2 rounded-full bg-black/20">
            <ArrowLeft size={18} />
          </span>
          <span className="text-lg font-semibold">Back</span>
        </button>

        <h1 className="text-3xl font-black mb-4">{event ? event.title : "Event Registration"}</h1>

        {/* Event description (3 lines) and Guidelines button */}
        {event?.descriptionLines && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="text-white/80 space-y-1">
              {event.descriptionLines.slice(0, 3).map((ln: string, i: number) => (
                <p key={i} className="leading-6">{ln}</p>
              ))}
            </div>
            {event?.guidelinesFile ? (
              <div className="flex-shrink-0">
                <button type="button" onClick={() => setShowGuidelines(true)} className="px-4 py-2 bg-yellow-400 text-black rounded-full font-bold">Guidelines</button>
              </div>
            ) : null}
          </div>
        )}

        {/* Contacts: left and right with hover effect (event-specific). Smaller buttons, larger font, show coordinator name then number */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <a
              href={event?.contactLeft ? `tel:${event.contactLeft}` : "tel:+919999999999"}
              className="flex-1 max-w-[47%] inline-flex flex-col items-center justify-center gap-1 rounded-full px-5 py-2 bg-white/10 backdrop-blur-md text-white/85 hover:bg-yellow-400 hover:text-black transition"
            >
              <div className="text-sm font-medium text-white">{event?.contactLeftName ?? "Coordinator"}</div>
              <div className="text-sm font-medium text-white">{event?.contactLeft ?? "+91 99999 99999"}</div>
            </a>

            <a
              href={event?.contactRight ? `tel:${event.contactRight}` : "tel:+919999999998"}
              className="flex-1 max-w-[47%] inline-flex flex-col items-center justify-center gap-1 rounded-full px-5 py-2 bg-white/10 backdrop-blur-md text-white/85 hover:bg-yellow-400 hover:text-black transition"
            >
              <div className="text-sm font-medium text-white">{event?.contactRightName ?? "Coordinator"}</div>
              <div className="text-sm font-medium text-white">{event?.contactRight ?? "+91 99999 99998"}</div>
            </a>
          </div>
        </div>

        {/* WhatsApp group button (event-specific) */}
        {event?.whatsappLink ? (
          <div className="mb-6 flex justify-center">
            <a
              href={event.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-sm transition-transform hover:scale-105"
            >
              Join WhatsApp Group
            </a>
          </div>
        ) : null}

        <div className="mt-4 rounded-3xl border border-yellow-600/25 bg-white/5 backdrop-blur-xl p-6 md:p-8">
          <form onSubmit={onSubmit} className="grid gap-6">
            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-200">
                {error}
              </div>
            )}

            {/* College Type Selection - Must be done first */}
            <div>
              <label className="text-sm text-white/70 font-semibold">Participation Type * (Select First)</label>
              <div className="mt-3 flex gap-4">
                <button
                  type="button"
                  onClick={() => setCollegeType("intra")}
                  className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition ${
                    collegeType === "intra"
                      ? "bg-yellow-400 text-black border border-yellow-400"
                      : "bg-black/40 border border-yellow-600/20 text-white hover:border-yellow-500/60"
                  }`}
                >
                  Intra-College (KEC)
                </button>
                <button
                  type="button"
                  onClick={() => setCollegeType("inter")}
                  className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition ${
                    collegeType === "inter"
                      ? "bg-yellow-400 text-black border border-yellow-400"
                      : "bg-black/40 border border-yellow-600/20 text-white hover:border-yellow-500/60"
                  }`}
                >
                  Inter-College
                </button>
              </div>
              {!collegeType && <p className="mt-2 text-xs text-yellow-300">Please select your participation type to continue</p>}
            </div>

            {/* Only show form if college type is selected */}
            {!collegeType ? (
              <div className="text-center py-8">
                <p className="text-white/70">👆 Please select Intra-College or Inter-College above to begin registration</p>
              </div>
            ) : (
              <>
            {maxTeam > 1 && (
              <div>
                <label className="text-sm text-white/70">Team Name </label>
                <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team name / group name" className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60" />
              </div>
            )}
            <section className="space-y-4">
              <h2 className="text-xl font-extrabold text-white">
                {maxTeam > 1 ? "Team Lead (You)" : "Participant Details"}
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">{maxTeam > 1 ? "Full Name *" : "Name *"}</label>
                  <input value={person.name} onChange={(e) => handlePersonChange("name", e.target.value)} placeholder="Full name" className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60" />
                </div>

                <div>
                  <label className="text-sm text-white/70">Roll Number *</label>
                  <input value={person.roll} onChange={(e) => handlePersonChange("roll", e.target.value)} placeholder="Roll number" className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {collegeType === "intra" ? (
                  <div>
                    <label className="text-sm text-white/70">Department *</label>
                    <select value={person.department} onChange={(e) => handlePersonChange("department", e.target.value)} className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60">
                      <option value="">Select department</option>
                      {departments.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-sm text-white/70">College Name *</label>
                      <input value={person.collegeName || ""} onChange={(e) => handlePersonChange("collegeName", e.target.value)} placeholder="Your college name" className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60" />
                    </div>
                    <div>
                      <label className="text-sm text-white/70">Department *</label>
                      <input value={person.department} onChange={(e) => handlePersonChange("department", e.target.value)} placeholder="Your department" className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60" />
                    </div>
                  </>
                )}

                <div>
                  <label className="text-sm text-white/70">Year of study *</label>
                  <select value={person.year} onChange={(e) => handlePersonChange("year", e.target.value)} className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Mobile Number *</label>
                  <input value={person.mobile} onChange={(e) => handlePersonChange("mobile", e.target.value)} placeholder="Mobile number" className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60" />
                </div>

                <div>
                  <label className="text-sm text-white/70">Email ID {collegeType === "intra" ? "(must be @kongu.edu)" : "(any email)"} *</label>
                  <input value={person.email} onChange={(e) => handlePersonChange("email", e.target.value)} placeholder={collegeType === "intra" ? "your@kongu.edu" : "your@email.com"} className="mt-2 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none focus:border-yellow-500/60" />
                  <p className="mt-1 text-xs text-white/50">{collegeType === "intra" ? "Use your Kongu Engineering College email" : "Use your college or personal email"}</p>
                </div>
              </div>
            </section>

            {maxTeam > 1 && (
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Team Members (total team size up to {maxTeam}, including team lead)</h3>
                  <button
                    type="button"
                    onClick={addTeamMember}
                    disabled={team.length >= allowedExtra}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold transition ${team.length < allowedExtra ? "bg-yellow-400 text-black" : "bg-white/10 text-white/40 cursor-not-allowed"}`}
                  >
                    Add member
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {team.map((m, idx) => (
                    <div key={idx} className="rounded-3xl border border-yellow-600/20 bg-black/30 p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-white font-extrabold">Member {idx + 1}</div>
                        <button type="button" onClick={() => removeTeamMember(idx)} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm bg-white/10 text-white/80 hover:bg-white/15">Remove</button>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div>
                          <label className="text-sm text-white/70">Full name</label>
                          <input value={m.name} onChange={(e) => updateTeamMember(idx, "name", e.target.value)} placeholder="Full name" className="mt-1 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none" />
                        </div>

                        <div>
                          <label className="text-sm text-white/70">Roll number</label>
                          <input value={m.roll} onChange={(e) => updateTeamMember(idx, "roll", e.target.value)} placeholder="Roll number" className="mt-1 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none" />
                        </div>

                        {collegeType === "intra" ? (
                          <div>
                            <label className="text-sm text-white/70">Department</label>
                            <select value={m.department} onChange={(e) => updateTeamMember(idx, "department", e.target.value)} className="mt-1 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none">
                              <option value="">Select department</option>
                              {departments.map((d) => (<option key={d} value={d}>{d}</option>))}
                            </select>
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-white/70">College Name</label>
                              <input value={m.collegeName || ""} onChange={(e) => updateTeamMember(idx, "collegeName", e.target.value)} placeholder="College name" className="mt-1 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none" />
                            </div>
                            <div>
                              <label className="text-sm text-white/70">Department</label>
                              <input value={m.department} onChange={(e) => updateTeamMember(idx, "department", e.target.value)} placeholder="Your department" className="mt-1 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none" />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="text-sm text-white/70">Year of study</label>
                          <select value={m.year} onChange={(e) => updateTeamMember(idx, "year", e.target.value)} className="mt-1 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm text-white/70">Mobile</label>
                          <input value={m.mobile} onChange={(e) => updateTeamMember(idx, "mobile", e.target.value)} placeholder="Mobile" className="mt-1 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none" />
                        </div>

                        <div>
                          <label className="text-sm text-white/70">Email {collegeType === "intra" ? "(kongu.edu)" : "(any email)"}</label>
                          <input value={m.email} onChange={(e) => updateTeamMember(idx, "email", e.target.value)} placeholder={collegeType === "intra" ? "email@kongu.edu" : "email@domain.com"} className="mt-1 w-full rounded-2xl bg-black/40 border border-yellow-600/20 px-4 py-3 outline-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close the conditional collegeType wrapper */}
              </>
            )}

            {collegeType && (
              <>
              <div>
              <label className="block text-sm text-white/80 mb-1">Payment QR</label>
              <p className="text-white/70 mb-4">Scan the QR below to pay the event fee.</p>

              <div className="flex justify-center mb-4">
                {event?.qrImage && !qrMissing ? (
                  <img
                    src={event.qrImage}
                    alt="Payment QR"
                    onError={() => setQrMissing(true)}
                    onLoad={() => setQrMissing(false)}
                    className="w-56 h-56 md:w-64 md:h-64 object-contain mb-2 rounded-lg shadow-lg"
                  />
                ) : qrMissing ? (
                  <div className="w-56 h-56 md:w-64 md:h-64 flex items-center justify-center mb-2 rounded-lg border border-yellow-600/20 text-white/70">
                    QR not available
                  </div>
                ) : null}
              </div>

              <div>
                <label className="block text-sm text-white/80 mb-2">Upload payment screenshot(s)</label>
                <div className="mt-2 border-2 border-dashed border-yellow-600/20 rounded-2xl p-4 bg-black/25 flex items-center justify-between gap-4">
                  <div className="flex-1 text-sm text-white/70">
                    {screenshots.length > 0 ? (
                      <div className="space-y-1">
                        {screenshots.map((s, idx) => (
                          <div key={idx} className="truncate">{s.name}</div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-white/60">No files selected</div>
                    )}
                  </div>

                  <label className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full cursor-pointer">
                    <input type="file" accept="image/*,application/pdf" multiple onChange={(e) => handleScreenshots(e.target.files)} className="hidden" />
                    Choose files
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="px-6 py-3 bg-yellow-400 text-black rounded font-bold">Submit Registration</button>
            </div>
            </>
            )}
          </form>
        </div>
        {showGuidelines && guidelineUrl ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-4xl h-[80vh] bg-black/90 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-black/80">
                <div className="text-white font-bold">Guidelines - {event?.title}</div>
                <div className="flex items-center gap-2">
                  <a href={guidelineUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-white/90 underline mr-2">Open in new tab</a>
                  <button onClick={() => setShowGuidelines(false)} className="text-white/80 bg-white/10 px-3 py-1 rounded">Close</button>
                </div>
              </div>
              <iframe src={guidelineUrl} className="w-full h-full" title="Guidelines PDF"></iframe>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function EventRegister() {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);
  return <EventRegisterForm event={event} />;
}
