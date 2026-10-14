import React from 'react';
import { useApp } from '../../context/AppContext';
import { Camera, UploadCloud, CheckCircle2, Trophy, AlertTriangle, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { setActivePage } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Record with Timestamp Camera',
      description:
        'Use any free timestamp camera app (Timestamp Camera Free, Open Camera, or GPS Camera) to capture your strike with a clear embedded date, time, and location watermark.',
      icon: Camera,
      tag: 'Mandatory',
    },
    {
      num: '02',
      title: 'Upload to GoalShelf',
      description:
        'Fill in your goal title, local area, and state. Drag & drop your MP4 or MOV footage. Submissions take seconds and instantly receive a tracking code.',
      icon: UploadCloud,
      tag: 'Fast & Mobile',
    },
    {
      num: '03',
      title: 'Human Review & 100-Pt Score',
      description:
        'Integrity moderators verify footage authenticity and timestamp visibility. Authorized judges score technique, difficulty, accuracy, creativity, and visual impact.',
      icon: CheckCircle2,
      tag: 'Fair & Transparent',
    },
    {
      num: '04',
      title: 'Win Cash & Claim Your Shelf',
      description:
        'Top 3 goals on Sunday midnight take home ₦250k, ₦150k, and ₦100k. Bank accounts are verified privately and paid out via instant transfer.',
      icon: Trophy,
      tag: '₦500k Weekly',
    },
  ];

  return (
    <section className="py-20 bg-[#050807] border-b border-[#111A13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold">
            THE INTEGRITY STANDARD
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display mt-2">
            HOW TO GET YOUR GOAL <br />
            <span className="text-[#39FF14]">ON THE NATIONAL SHELF.</span>
          </h2>
          <p className="mt-3 text-base text-[#A7B2AA]">
            We celebrate genuine grassroots football talent. Our strict timestamp protocol ensures
            every winning goal was struck within the active competition window.
          </p>
        </div>

        {/* 4-Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#0B110D] border border-[#16241a] rounded-2xl p-6 relative flex flex-col justify-between hover:border-[#39FF14]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-display font-extrabold text-[#39FF14]/50">
                      {step.num}
                    </span>
                    <span className="text-[11px] font-mono text-[#A7B2AA] uppercase bg-[#111A13] px-2.5 py-1 rounded">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#111A13] border border-[#39FF14]/20 flex items-center justify-center mb-4 text-[#39FF14]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold font-display uppercase tracking-wide text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#A7B2AA] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timestamp Verification Banner & Mockup */}
        <div className="mt-12 bg-[#111A13] border border-[#39FF14]/30 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Example Mockup */}
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-neutral-700 bg-black aspect-video group">
              <img
                src="/src/assets/images/hero_stadium_strike_1791991464710.jpg"
                alt="Sample video with timestamp overlay"
                className="w-full h-full object-cover opacity-70"
              />
              {/* Timestamp Watermark Overlay (Visual Guide) */}
              <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md border border-[#39FF14]/60 px-3 py-1.5 rounded text-[11px] font-mono text-white flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[#39FF14]">2026-10-13 17:28:14 WAT</span>
                <span className="text-neutral-400">· Ajegunle, Lagos (GPS)</span>
              </div>

              <div className="absolute top-3 right-3 bg-black/75 px-2.5 py-1 rounded text-[10px] font-mono uppercase text-[#39FF14] border border-[#39FF14]/40">
                VERIFIED FORMAT
              </div>
            </div>

            {/* Explanation & Clear Notice */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Mandatory Authenticity Requirement</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold font-display uppercase text-white">
                “IMPORTANT: Your goal video MUST show a visible recording date and time.
                Videos without a readable timestamp may be rejected.”
              </h4>

              <p className="text-xs sm:text-sm text-[#A7B2AA] leading-relaxed">
                To prevent recycled professional clips or goals recorded months ago, our moderation panel
                examines the visible watermark embedded by your camera app. Continuous footage from the setup
                to the strike and celebration is preferred.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActivePage('submit')}
                  className="px-5 py-2.5 bg-[#39FF14] text-black font-display font-bold text-sm uppercase rounded-lg hover:bg-[#32e012] transition-colors flex items-center gap-2"
                >
                  <span>Ready? Submit Your Strike Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePage('rules')}
                  className="px-5 py-2.5 bg-[#16241a] text-white text-xs font-semibold rounded-lg hover:bg-[#1f3325] transition-colors"
                >
                  View Timestamp Guidelines & Recommended Apps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
