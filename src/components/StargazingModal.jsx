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
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeCanvas } from 'qrcode.react';

const API_BASE = 'https://aerocon-backend.onrender.com/api';

export default function StargazingModal({ isOpen, onClose }) {
  // Slots State
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState('');

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

  // Fetch slots whenever the modal opens
  const fetchSlots = async () => {
    setLoadingSlots(true);
    setSlotsError(null);
    try {
      const res = await fetch(`${API_BASE}/slots`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      const slotList = data.data || [];
      setSlots(slotList);

      // Auto-select first available slot if none selected or current is full
      const firstAvailable = slotList.find((s) => !s.isFull && s.remainingSeats > 0);
      if (firstAvailable) {
        setSelectedSlotId(firstAvailable._id);
      }
    } catch (err) {
      console.error('Failed to fetch slots:', err);
      setSlotsError('Could not connect to the reservation server. Please ensure you have an active internet connection.');
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSlots();
    }
  }, [isOpen]);

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
        const slotInfo = result.data.slot?.displayTime || '07:00 PM - 08:00 PM';

        setPassData({
          code: passCode,
          name: formData.name.trim(),
          email: formData.email.trim(),
          roll: formData.roll.trim().toUpperCase(),
          batch: formData.batch,
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
        fetchSlots();
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
    fetchSlots();
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
            Book Your Stargazing Slot
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Reserve your 10-minute observation slot at the high-powered telescope array.
          </p>
        </div>

        {!confirmed ? (
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

            {/* SLOTS DROPDOWN */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span>Select Observation Slot *</span>
                </label>
                <button
                  type="button"
                  onClick={fetchSlots}
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
                      onClick={fetchSlots}
                      className="mt-2 px-2.5 py-1 bg-white text-black font-bold text-[10px] uppercase hover:bg-zinc-200"
                    >
                      Retry Connecting
                    </button>
                  </div>
                </div>
              ) : slots.length === 0 ? (
                <div className="p-3 bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-500 text-center">
                  No slots currently available. Please click Refresh or check back soon.
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
                        -- Choose an Observation Slot --
                      </option>
                      {slots.map((slot) => {
                        const isFull = slot.isFull || slot.remainingSeats <= 0;
                        return (
                          <option
                            key={slot._id}
                            value={slot._id}
                            disabled={isFull}
                            className="bg-zinc-900 text-white font-mono"
                          >
                            Slot #{slot.slotNumber}: {slot.displayTime} {isFull ? '(FULL)' : `(${slot.remainingSeats} seats left)`}
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
                    const sel = slots.find((s) => s._id === selectedSlotId);
                    if (!sel) return null;
                    return (
                      <div className="flex items-center justify-between px-2.5 py-1.5 bg-zinc-950/60 border border-white/10 text-[11px] font-mono text-zinc-400">
                        <span className="text-zinc-300">
                          Slot #{sel.slotNumber}: <strong className="text-white">{sel.displayTime}</strong>
                        </span>
                        <span className={sel.remainingSeats <= 2 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                          {sel.remainingSeats} seats left
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
                  placeholder="e.g. Aayush Sharma"
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
                  placeholder="student@college.edu"
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
                    placeholder="e.g. 25BCS101"
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
            <div className="pt-2 border-t border-white/10 flex justify-end">
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
            </div>
          </form>
        ) : (
          /* CONFIRMED BOARDING PASS WITH QR CODE */
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="inline-flex p-2 bg-emerald-950 border border-emerald-500/40 text-emerald-400 rounded-full mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Slot Reserved!</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Your official Stargazing Boarding Pass has been issued.
              </p>
            </div>

            {/* BOARDING PASS CONTAINER */}
            <div className="border border-white/20 bg-zinc-950 p-4 sm:p-5 font-mono text-xs space-y-4 relative">
              
              {/* Pass Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                    AEROCON 2026 // PASSCODE
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
                    size={150}
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
                  <span className="text-zinc-500 uppercase block text-[9px]">Time Slot</span>
                  <span className="text-white font-bold block">{passData?.displayTime}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[9px]">Status</span>
                  <span className="text-emerald-400 font-bold block">CONFIRMED</span>
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
                onClick={handleResetRegistration}
                className="py-2.5 px-4 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 text-xs font-mono uppercase tracking-wider transition-colors border border-white/10"
              >
                Book Another
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



