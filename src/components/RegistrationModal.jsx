import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Ticket, Download, ArrowRight, UserPlus, Trash2, AlertCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { eventsData } from '../data/eventsData';
import blackLogo from '../assets/aerocon-black.png';

export default function RegistrationModal({ isOpen, onClose, defaultEventId }) {
  const [selectedEventId, setSelectedEventId] = useState(defaultEventId || eventsData[0].id);
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    email: '',
    phone: '',
    college: '',
    degreeYear: '3rd Year B.Tech',
    additionalMembers: [''],
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    if (defaultEventId) {
      setSelectedEventId(defaultEventId);
    }
  }, [defaultEventId]);

  if (!isOpen) return null;

  const currentEvent = eventsData.find((e) => e.id === selectedEventId) || eventsData[0];

  const handleAddMember = () => {
    if (formData.additionalMembers.length < 4) {
      setFormData({
        ...formData,
        additionalMembers: [...formData.additionalMembers, ''],
      });
    }
  };

  const handleMemberChange = (index, value) => {
    const updated = [...formData.additionalMembers];
    updated[index] = value;
    setFormData({ ...formData, additionalMembers: updated });
  };

  const handleRemoveMember = (index) => {
    const updated = formData.additionalMembers.filter((_, i) => i !== index);
    setFormData({ ...formData, additionalMembers: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passNumber = `AC26-${Math.floor(1000 + Math.random() * 9000)}-${currentEvent.category.slice(0, 3).toUpperCase()}`;
    setTicketData({
      passNumber,
      teamName: formData.teamName || 'Team Mach-1',
      leaderName: formData.leaderName,
      college: formData.college,
      eventTitle: currentEvent.title,
      category: currentEvent.category,
      venue: currentEvent.venue,
      date: currentEvent.date,
      registeredAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    });
    setSubmitted(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#000000', '#71717a', '#ffffff', '#27272a']
      });
    } catch (err) {
      // Confetti fallback safe
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setTicketData(null);
    setFormData({
      teamName: '',
      leaderName: '',
      email: '',
      phone: '',
      college: '',
      degreeYear: '3rd Year B.Tech',
      additionalMembers: [''],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border-2 border-black max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto">
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <img src={blackLogo} alt="AEROCON" className="h-7 w-auto object-contain" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 border-l border-zinc-200 pl-3">
              Registration Portal
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-black hover:bg-zinc-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                  OFFICIAL REGISTRATION // AEROSOC
                </span>
                <h3 className="text-2xl font-bold text-black">
                  Enter The Flight Arena
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                  Secure your slot for AEROCON 2026. Complete the details below to receive your official digital pass.
                </p>
              </div>

              {/* Event Selector */}
              <div className="p-4 bg-zinc-50 border border-black/15 space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-700 font-semibold">
                  Select Target Competition *
                </label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-black/20 text-sm font-medium text-black focus:outline-none focus:border-black"
                >
                  {eventsData.map((evt) => (
                    <option key={evt.id} value={evt.id}>
                      {evt.title} ({evt.category}) — {evt.prizePool}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
                  <span>Entry Fee: {currentEvent.entryFee}</span>
                  <span>Team Size: {currentEvent.teamSize}</span>
                </div>
              </div>

              {/* Team & Leader Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-700 mb-1">
                    Team Name / Call Sign *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Falcons"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full p-2.5 border border-black/20 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-700 mb-1">
                    Team Leader Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.leaderName}
                    onChange={(e) => setFormData({ ...formData, leaderName: e.target.value })}
                    className="w-full p-2.5 border border-black/20 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="leader@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 border border-black/20 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-700 mb-1">
                    WhatsApp / Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 border border-black/20 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* College & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-700 mb-1">
                    College / University *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Institution Name"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full p-2.5 border border-black/20 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-700 mb-1">
                    Year & Branch *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3rd Year Aerospace / Mech"
                    value={formData.degreeYear}
                    onChange={(e) => setFormData({ ...formData, degreeYear: e.target.value })}
                    className="w-full p-2.5 border border-black/20 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Additional Team Members */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono uppercase text-zinc-700 font-semibold">
                    Additional Team Members (Optional)
                  </label>
                  {formData.additionalMembers.length < 4 && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="text-xs font-mono text-black hover:underline flex items-center gap-1 font-semibold"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add Member</span>
                    </button>
                  )}
                </div>

                {formData.additionalMembers.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Team Member ${idx + 2} Name`}
                      value={member}
                      onChange={(e) => handleMemberChange(idx, e.target.value)}
                      className="flex-1 p-2 border border-black/20 text-sm focus:outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(idx)}
                      className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-black" />
                  Verified AeroSoc Registration
                </span>
                <button
                  type="submit"
                  className="px-8 py-3 bg-black text-white font-semibold text-sm hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-md"
                >
                  <span>Confirm Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Digital Boarding Pass / Ticket Presentation */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center">
                <div className="inline-flex p-3 bg-emerald-50 rounded-full border border-emerald-200 text-emerald-600 mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-black">Registration Confirmed!</h3>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                  Your entry for AEROCON 2026 has been successfully logged with AeroSoc flight control.
                </p>
              </div>

              {/* Aerospace Boarding Pass Card */}
              <div className="border-2 border-black bg-white p-6 relative overflow-hidden shadow-lg">
                {/* Boarding Pass Header */}
                <div className="flex items-center justify-between border-b-2 border-dashed border-black/20 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img src={blackLogo} alt="AEROCON" className="h-8 w-auto object-contain" />
                    <span className="text-[10px] font-mono tracking-widest uppercase bg-black text-white px-2 py-0.5">
                      OFFICIAL BOARDING PASS
                    </span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[10px] text-zinc-400 block">PASS CODE</span>
                    <span className="text-sm font-bold text-black">{ticketData.passNumber}</span>
                  </div>
                </div>

                {/* Pass Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs mb-6">
                  <div>
                    <span className="text-zinc-400 text-[10px] block uppercase">Event</span>
                    <span className="font-bold text-black text-sm">{ticketData.eventTitle}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] block uppercase">Team / Call Sign</span>
                    <span className="font-bold text-black text-sm">{ticketData.teamName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] block uppercase">Team Leader</span>
                    <span className="font-bold text-black text-sm">{ticketData.leaderName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] block uppercase">Institution</span>
                    <span className="text-zinc-800">{ticketData.college}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] block uppercase">Date & Venue</span>
                    <span className="text-zinc-800">{ticketData.date} &bull; {ticketData.venue}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] block uppercase">Issued Date</span>
                    <span className="text-zinc-800">{ticketData.registeredAt}</span>
                  </div>
                </div>

                {/* Barcode Simulation */}
                <div className="pt-4 border-t-2 border-dashed border-black/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    {/* CSS Barcode lines */}
                    <div className="flex items-center gap-[2.5px] h-8">
                      {[4, 2, 6, 1, 3, 5, 2, 7, 3, 1, 4, 6, 2, 5, 3, 1, 6, 2, 4, 3, 5, 2, 1, 6, 4, 2, 5].map((w, i) => (
                        <span key={i} className="bg-black inline-block h-full" style={{ width: `${w}px` }}></span>
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 tracking-widest block">
                      AEROSOC-SECURITY-HASH-2026-VERIFIED
                    </span>
                  </div>

                  <div className="text-center sm:text-right font-mono text-[10px] text-zinc-500">
                    <div>GATE: AERODROME ALPHA</div>
                    <div>SECTOR: CONCLAVE-2026</div>
                  </div>
                </div>
              </div>

              {/* Post-Registration Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 bg-zinc-100 text-black text-xs font-mono uppercase font-semibold hover:bg-zinc-200 transition-colors"
                >
                  Register Another Event
                </button>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-black text-white text-xs font-mono uppercase font-semibold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print / Save Pass</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-initial px-5 py-2.5 bg-zinc-200 text-black text-xs font-mono uppercase font-semibold hover:bg-zinc-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

