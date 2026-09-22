import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How do I register for AEROCON events?',
      answer: 'Click the "Register Now" button on any event card. It directs you straight to the official Google Form for that specific competition.'
    },
    {
      question: 'Where will the events take place?',
      answer: 'All events take place on-campus across NCC Ground, Lawn Circle, Room 217, Room 219, Room 220, and the Main Hall as specified on each event briefing.'
    },
    {
      question: 'Can I participate in multiple events?',
      answer: 'Yes! Check the schedule for 25th, 26th, and 27th September to make sure timings do not overlap, and register for each event via its respective Google Form.'
    },
    {
      question: 'Who can I contact for queries?',
      answer: 'Contact numbers for student coordinators are listed on each event card, or reach out to AeroSoc via email at aerocon@aerosoc.org.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#09090b] border-b border-white/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
            HELP & QUERIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Asked Questions.
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-zinc-300 transition-colors">
                    {faq.question}
                  </span>
                  <span className="p-1 text-white shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3 text-sm text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
