import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Download,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Loader2,
  Sparkles,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeCanvas } from 'qrcode.react';
import { API_BASE, prefetchSlots, getCachedSlots } from '../services/slotService';

export default function StargazingModal({ isOpen, onClose, initialMode = 'book' }) {
  const [activeTab, setActiveTab] = useState(initialMode); // 'book' | 'view'

  // Lookup state
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState(null);

  // Date selection state ('26' or '27' September)
  const [selectedDate, setSelectedDate] = useState('26');

  // Slots State
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState('');

  // Filter slots for the selected date ('26' or '27')
  const filteredSlots = slots.filter((slot) => {
    if (!slot.date) return true;
    const clean = String(slot.date).replace(/[^0-9]/g, '');
    return clean === selectedDate || clean === '';
  });

  // Whenever selectedDate or slots change, auto-select first available slot for that date
  useEffect(() => {
    const available = filteredSlots.find((s) => !s.isFull && (s.remainingSeats === null || s.remainingSeats > 0));
    if (available) {
      setSelectedSlotId(available._id);
    } else {
      setSelectedSlotId('');
    }
  }, [selectedDate, slots]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roll: '',
    batch: 'k25',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [duplicatePass, setDuplicatePass] = useState(null);

  // Success State
  const [confirmed, setConfirmed] = useState(false);
  const [passData, setPassData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialMode);
      setLookupError(null);
      setSubmitError(null);
      setConfirmed(false);
    }
  }, [isOpen, initialMode]);

  // Lookup registration by email
  const handleLookupSubmit = async (e) => {
    e.preventDefault();
    const query = lookupEmail.trim().toLowerCase();
    if (!query) return;

    setLookingUp(true);
    setLookupError(null);

    try {
      const res = await fetch(`${API_BASE}/registrations`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const result = await res.json();
      const list = result.data || [];

      const matched = list.find((r) => r.email && r.email.trim().toLowerCase() === query);

      if (matched) {
        setPassData({
          code: matched.passCode,
          name: matched.name,
          email: matched.email,
          roll: matched.roll,
          batch: matched.batch,
          date: matched.slot?.date ? `${matched.slot.date} Sep` : '26/27 Sep',
          slotNumber: matched.slot?.slotNumber || 1,
          slotId: matched.slot?._id || matched.slot?.id || '—',
          displayTime: matched.slot?.displayTime || 'Assigned Slot',
          venue: 'Lawn Circle',
        });
        setConfirmed(true);
      } else {
        setLookupError(`No slot registration found for "${lookupEmail.trim()}". Please verify the email address or book a new slot.`);
      }
    } catch (err) {
      console.error('Lookup error:', err);
      setLookupError('Network error connecting to reservation server. The server may still be waking up. Please try again.');
    } finally {
      setLookingUp(false);
    }
  };

  // Fetch or retrieve pre-fetched slots
  const fetchSlots = async (force = false) => {
    // If not forcing refresh, check if slots were already pre-fetched on website load
    if (!force) {
      const cached = getCachedSlots();
      const has26 = cached?.some((s) => String(s.date).includes('26'));
      const has27 = cached?.some((s) => String(s.date).includes('27'));
      if (cached && cached.length > 0 && has26 && has27) {
        setSlots(cached);
        return;
      }
    }

    setLoadingSlots(true);
    setSlotsError(null);
    try {
      const slotList = await prefetchSlots(force);
      setSlots(slotList || []);
    } catch (err) {
      console.error('Failed to fetch slots:', err);
      setSlotsError('Could not connect to the reservation server. The server on Render may still be waking up. Please click Refresh in a few seconds.');
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSlots(false);
    }
  }, [isOpen]);

  // When selectedDate changes, if filteredSlots is empty, force refresh
  useEffect(() => {
    if (isOpen && filteredSlots.length === 0 && slots.length > 0) {
      fetchSlots(true);
    }
  }, [selectedDate, isOpen]);

  if (!isOpen) return null;

  // Handle student registration submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlotId) {
      setSubmitError('Please select an observation time slot.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setDuplicatePass(null);

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          roll: formData.roll.trim().toUpperCase(),
          batch: formData.batch,
          slotId: selectedSlotId,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        // Success
        const passCode = result.data.passCode;
        const slotInfo = result.data.slot?.displayTime || '06:30 PM - 08:00 PM';
        const chosenSlot = filteredSlots.find((s) => s._id === selectedSlotId);

        setPassData({
          code: passCode,
          name: formData.name.trim(),
          email: formData.email.trim(),
          roll: formData.roll.trim().toUpperCase(),
          batch: formData.batch,
          date: chosenSlot?.date ? `${chosenSlot.date} Sep` : `${selectedDate} Sep`,
          slotNumber: chosenSlot?.slotNumber || 1,
          slotId: selectedSlotId,
          displayTime: slotInfo,
          venue: 'Lawn Circle',
        });
        setConfirmed(true);

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#a855f7', '#38bdf8', '#fbbf24'],
          });
        } catch (err) {}

        // Refresh slots in background so remaining seats are accurate
        fetchSlots(true);
      } else {
        // Error from server (e.g. duplicate or full)
        setSubmitError(result.message || 'Registration failed. Please try another slot.');
        if (result.data?.passCode) {
          setDuplicatePass({
            code: result.data.passCode,
            displayTime: result.data.slot?.displayTime || 'Assigned Slot',
          });
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setSubmitError('Network error connecting to reservation server. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  // View existing pass when duplicate detected
  const handleViewExistingPass = () => {
    if (duplicatePass) {
      setPassData({
        code: duplicatePass.code,
        name: formData.name.trim() || 'Student',
        email: formData.email.trim(),
        roll: formData.roll.trim().toUpperCase(),
        batch: formData.batch,
        displayTime: duplicatePass.displayTime,
        venue: 'Lawn Circle',
      });
      setConfirmed(true);
    }
  };

  // Download Boarding Pass QR Code as PNG
  const handleDownloadQR = () => {
    const canvas = document.getElementById('stargazing-qr-canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `AEROCON-Stargazing-${passData?.code || 'Pass'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleResetRegistration = () => {
    setConfirmed(false);
    setPassData(null);
    setSubmitError(null);
    setDuplicatePass(null);
    setFormData({
      name: '',
      email: '',
      roll: '',
      batch: 'k25',
    });
    fetchSlots(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-white/20 max-w-xl w-full p-5 sm:p-7 relative shadow-2xl text-white my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors z-20"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-white text-black font-bold">
              STARGAZING
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              AEROCON 2026 // LAWN CIRCLE
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {activeTab === 'view' ? 'View Your Stargazing Pass' : 'Book Your Stargazing Slot'}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            {activeTab === 'view'
              ? 'Enter your email to retrieve your assigned time slot, slot ID, and download your QR boarding pass.'
              : 'Reserve your 10-minute observation slot at the high-powered telescope array.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        {!confirmed && (
          <div className="flex border-b border-white/10 mb-5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('book');
                setSubmitError(null);
              }}
              className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-colors border-b-2 -mb-[1px] ${
                activeTab === 'book'
                  ? 'border-white text-white bg-zinc-800/40'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Book a Slot
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('view');
                setLookupError(null);
              }}
              className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-colors border-b-2 -mb-[1px] flex items-center justify-center gap-1.5 ${
                activeTab === 'view'
                  ? 'border-white text-white bg-zinc-800/40'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>View Your Slot</span>
            </button>
          </div>
        )}

        {!confirmed && activeTab === 'book' ? (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            {/* Meta Summary Box */}
            <div className="p-3 bg-zinc-950 border border-white/10 grid grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>Lawn Circle</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>26 & 27 Sep 2026</span>
              </div>
            </div>

            {/* DATE SELECTOR (26 Sep or 27 Sep) */}
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>1. Select Observation Date *</span>
              </label>
              <div className="space-y-1.5">
                <div className="relative">
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 bg-zinc-950 border border-white/15 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-white transition-colors cursor-pointer appearance-none pr-8"
                  >
                    <option value="26">26 September 2026 (Day 1 - Friday)</option>
                    <option value="27">27 September 2026 (Day 2 - Saturday)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-zinc-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>

                {/* Quick Date Switcher Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setSelectedDate('26')}
                    className={`py-1.5 px-3 text-xs font-mono border transition-all text-center flex items-center justify-center gap-1.5 ${
                      selectedDate === '26'
                        ? 'bg-white text-black font-bold border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                        : 'bg-zinc-950 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span>26 Sep (Day 1)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDate('27')}
                    className={`py-1.5 px-3 text-xs font-mono border transition-all text-center flex items-center justify-center gap-1.5 ${
                      selectedDate === '27'
                        ? 'bg-white text-black font-bold border-white shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                        : 'bg-zinc-950 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span>27 Sep (Day 2)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SLOTS DROPDOWN */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span>2. Select Slot ({selectedDate} Sep • 6:30 PM - 8:00 PM) *</span>
                </label>
                <button
                  type="button"
                  onClick={() => fetchSlots(true)}
                  disabled={loadingSlots}
                  className="text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                  title="Refresh available slots"
                >
                  <RefreshCw className={`w-3 h-3 ${loadingSlots ? 'animate-spin text-white' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {loadingSlots ? (
                <div className="p-3 bg-zinc-950 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-zinc-400">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Fetching live slots from server...</span>
                </div>
              ) : slotsError ? (
                <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p>{slotsError}</p>
                    <button
                      type="button"
                      onClick={() => fetchSlots(true)}
                      className="mt-2 px-2.5 py-1 bg-white text-black font-bold text-[10px] uppercase hover:bg-zinc-200"
                    >
                      Retry Connecting
                    </button>
                  </div>
                </div>
              ) : filteredSlots.length === 0 ? (
                <div className="p-3 bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-400 text-center space-y-1">
                  <p className="text-zinc-300 font-semibold">No slots listed yet for {selectedDate} September.</p>
                  <p className="text-[11px] text-zinc-500">
                    Slots for this date will open shortly. Please select {selectedDate === '26' ? '27 Sep' : '26 Sep'} or click Refresh.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="relative">
                    <select
                      value={selectedSlotId}
                      onChange={(e) => setSelectedSlotId(e.target.value)}
                      className="w-full p-2.5 bg-zinc-950 border border-white/15 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-white transition-colors cursor-pointer appearance-none pr-8"
                    >
                      <option value="" disabled>
                        -- Choose an Observation Slot ({selectedDate} Sep) --
                      </option>
                      {filteredSlots.map((slot) => {
                        const isFull = slot.isFull || (slot.remainingSeats !== null && slot.remainingSeats <= 0);
                        return (
                          <option
                            key={slot._id}
                            value={slot._id}
                            disabled={isFull}
                            className="bg-zinc-900 text-white font-mono"
                          >
                            Slot #{slot.slotNumber}: {slot.displayTime} {isFull ? '(FULL)' : `(${slot.remainingSeats ?? 7} seats left)`}
                          </option>
                        );
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-zinc-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>

                  {/* Selected Slot Quick Badge */}
                  {selectedSlotId && (() => {
                    const sel = filteredSlots.find((s) => s._id === selectedSlotId);
                    if (!sel) return null;
                    const seats = sel.remainingSeats ?? 7;
                    return (
                      <div className="flex items-center justify-between px-2.5 py-1.5 bg-zinc-950/60 border border-white/10 text-[11px] font-mono text-zinc-400">
                        <span className="text-zinc-300">
                          {selectedDate} Sep • Slot #{sel.slotNumber}: <strong className="text-white">{sel.displayTime}</strong>
                        </span>
                        <span className={seats <= 2 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                          {seats} / {sel.maxCapacity || 7} seats left
                        </span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* ATTENDEE FORM FIELDS */}
            <div className="space-y-3 pt-1">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aayush Raj"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* College Email */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                  College Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="btech10xxx.2x@bitmesra.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-zinc-950 border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Roll & Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="BTECH/10XXX/2X"
                    value={formData.roll}
                    onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                    className="w-full p-2.5 bg-zinc-950 border border-white/15 text-sm text-white uppercase focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                    Batch *
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['k24', 'k25', 'k26'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData({ ...formData, batch: b })}
                        className={`py-2 px-2 text-xs font-mono font-bold uppercase transition-colors border ${
                          formData.batch === b
                            ? 'bg-white text-black border-white'
                            : 'bg-zinc-950 text-zinc-400 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Banner with Duplicate Pass Recovery */}
            {submitError && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{submitError}</span>
                </div>
                {duplicatePass && (
                  <button
                    type="button"
                    onClick={handleViewExistingPass}
                    className="mt-1 px-3 py-1.5 bg-white text-black font-bold text-[10px] uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>View Your Existing Boarding Pass ({duplicatePass.code})</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                type="submit"
                disabled={submitting || slots.length === 0}
                className="w-full py-3 bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Securing Your Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Stargazing Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('view');
                    setLookupError(null);
                  }}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  Already booked? View or Download your slot pass
                </button>
              </div>
            </div>
          </form>
        ) : !confirmed && activeTab === 'view' ? (
          /* VIEW YOUR SLOT FORM (EMAIL LOOKUP) */
          <form onSubmit={handleLookupSubmit} className="space-y-4">
            <div className="p-3 bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-400 leading-relaxed">
              Enter the email address you registered with to retrieve your assigned observation slot, slot ID/passcode, and download your QR boarding pass.
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Registered Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. student@college.edu"
                value={lookupEmail}
                onChange={(e) => setLookupEmail(e.target.value)}
                className="w-full p-2.5 bg-zinc-950 border border-white/15 text-sm text-white focus:outline-none focus:border-white transition-colors font-mono"
              />
            </div>

            {lookupError && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{lookupError}</span>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('book')}
                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                &larr; Need to reserve a new slot?
              </button>

              <button
                type="submit"
                disabled={lookingUp || !lookupEmail.trim()}
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {lookingUp ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Finding Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Find My Slot Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* CONFIRMED BOARDING PASS WITH QR CODE & SLOT ID */
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="inline-flex p-2 bg-emerald-950 border border-emerald-500/40 text-emerald-400 rounded-full mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeTab === 'view' ? 'Slot Details Found!' : 'Slot Reserved!'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Your official Stargazing Boarding Pass and QR Code.
              </p>
            </div>

            {/* BOARDING PASS CONTAINER */}
            <div className="border border-white/20 bg-zinc-950 p-4 sm:p-5 font-mono text-xs space-y-4 relative">
              
              {/* Pass Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                    AEROCON 2026 // PASSCODE / SLOT ID
                  </span>
                  <span className="text-2xl font-black text-white tracking-wider font-mono">
                    {passData?.code}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 uppercase block">Venue</span>
                  <span className="font-bold text-white">{passData?.venue}</span>
                </div>
              </div>

              {/* QR CODE DISPLAY */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="p-3 bg-white rounded-sm shadow-xl inline-block">
                  <QRCodeCanvas
                    id="stargazing-qr-canvas"
                    value={passData?.code || 'AEROCON'}
                    size={140}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-2">
                  Scan at Lawn Circle Gate
                </span>
              </div>

              {/* Attendee Metadata */}
              <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-[11px]">
                <div>
                  <span className="text-zinc-500 uppercase block text-[9px]">Attendee</span>
                  <span className="text-white font-bold truncate block">{passData?.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[9px]">Roll & Batch</span>
                  <span className="text-white font-bold block">{passData?.roll} ({passData?.batch})</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[9px]">Date & Slot</span>
                  <span className="text-white font-bold block">
                    {passData?.date || `${selectedDate} Sep`} • Slot #{passData?.slotNumber || 1}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[9px]">Time & Slot ID</span>
                  <span className="text-white font-bold block truncate" title={passData?.displayTime}>
                    {passData?.displayTime} <span className="text-emerald-400 font-mono">({passData?.code})</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={handleDownloadQR}
                className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-white/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download QR Pass</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setConfirmed(false);
                  setPassData(null);
                  if (activeTab === 'view') {
                    setLookupEmail('');
                  } else {
                    handleResetRegistration();
                  }
                }}
                className="py-2.5 px-4 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 text-xs font-mono uppercase tracking-wider transition-colors border border-white/10"
              >
                {activeTab === 'view' ? 'Search Another' : 'Book Another'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 bg-white text-black font-bold text-xs font-mono uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}



