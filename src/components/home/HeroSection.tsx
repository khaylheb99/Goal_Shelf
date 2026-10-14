import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { UploadCloud, Play, Trophy, Clock, ShieldCheck, Flame, ChevronRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActivePage, activeCompetition, submissions, users } = useApp();

  // Dynamic countdown timer based on active competition submission deadline
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 3,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const calculateTime = () => {
      const deadline = new Date(activeCompetition.submissionDeadline).getTime();
      const now = new Date().getTime();
      const difference = Math.max(0, deadline - now);

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [activeCompetition.submissionDeadline]);

  // Real database metrics
  const approvedCount = submissions.filter((s) => s.status === 'approved').length;
  const registeredPlayersCount = users.length;
  const participatingStatesCount = new Set(submissions.map((s) => s.state)).size;

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex flex-col justify-center bg-[#050807] border-b border-[#111A13]">
      {/* Background Cinematic Stadium Image with measured overlay scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_stadium_strike_1791991464710.jpg"
          alt="Night Football Stadium Striker in Nigeria"
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-[#050807]/80 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#050807]/60 to-[#050807]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        {/* Top Announcement Bar */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111A13]/90 border border-[#39FF14]/30 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          <span className="text-xs uppercase tracking-wider font-mono text-[#39FF14] font-semibold">
            Week {activeCompetition.weekNumber} Official Competition Active
          </span>
          <span className="text-neutral-500">·</span>
          <span className="text-xs text-white font-medium">₦500,000 Guaranteed Pool</span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white font-display leading-[0.95]">
              EVERY GOAL <br />
              <span className="text-[#39FF14] neon-glow">DESERVES A SHELF.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#A7B2AA] max-w-xl leading-relaxed">
              Record your best strike. Upload your goal with visible timestamp camera verification.
              Represent your area across Nigeria and compete for weekly cash prizes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setActivePage('submit')}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-extrabold text-xl tracking-wider rounded-xl transition-transform active:scale-95 shadow-[0_0_25px_rgba(57,255,20,0.35)]"
              >
                <UploadCloud className="w-5 h-5 stroke-[2.5]" />
                SUBMIT YOUR GOAL
              </button>

              <button
                onClick={() => setActivePage('explore')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-[#111A13] hover:bg-[#16241a] text-white font-display font-bold text-lg tracking-wide rounded-xl border border-[#39FF14]/30 transition-colors"
              >
                <Play className="w-4 h-4 fill-current text-[#39FF14]" />
                EXPLORE TOP GOALS
              </button>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center gap-5 pt-4 text-xs text-[#A7B2AA]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#39FF14]" />
                <span>Mandatory Timestamp Verification</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#FFD700]" />
                <span>100-Point Transparent Technical Judging</span>
              </div>
            </div>
          </div>

          {/* Right Column: Active Prize Banner & Countdown Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B110D]/90 border border-[#39FF14]/30 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#39FF14]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Prize Pool Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#16241a]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-mono text-[#A7B2AA]">
                    Weekly Competition Status
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#00C853]" />
                    <span className="text-xs text-[#39FF14] font-semibold uppercase">
                      Admin Verified & Funded
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#111A13] border border-[#FFD700]/40 rounded-lg text-right">
                  <span className="text-[10px] text-[#A7B2AA] block uppercase font-mono">Total Pool</span>
                  <span className="text-lg font-bold text-[#FFD700] font-mono tabular-nums">₦500,000</span>
                </div>
              </div>

              {/* Countdown Unit */}
              <div className="py-6 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#A7B2AA] uppercase font-mono tracking-wider mb-3">
                  <Clock className="w-4 h-4 text-[#39FF14]" />
                  <span>Week {activeCompetition.weekNumber} Submission Deadline In</span>
                </div>

                <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto font-mono">
                  <div className="bg-[#111A13] border border-[#16241a] rounded-xl p-3">
                    <span className="block text-3xl font-extrabold text-white tabular-nums">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-[#A7B2AA]">Days</span>
                  </div>
                  <div className="bg-[#111A13] border border-[#16241a] rounded-xl p-3">
                    <span className="block text-3xl font-extrabold text-white tabular-nums">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-[#A7B2AA]">Hours</span>
                  </div>
                  <div className="bg-[#111A13] border border-[#16241a] rounded-xl p-3">
                    <span className="block text-3xl font-extrabold text-[#39FF14] tabular-nums">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-[#A7B2AA]">Mins</span>
                  </div>
                  <div className="bg-[#111A13] border border-[#16241a] rounded-xl p-3">
                    <span className="block text-3xl font-extrabold text-[#39FF14] tabular-nums">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-[#A7B2AA]">Secs</span>
                  </div>
                </div>
              </div>

              {/* Prize Podium Teaser */}
              <div className="bg-[#111A13] rounded-xl p-3.5 border border-[#16241a] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-white font-medium">
                    <span className="text-[#FFD700]">🥇 1st Place Trophy</span>
                  </span>
                  <span className="font-bold text-[#FFD700] font-mono tabular-nums">₦250,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-neutral-300">
                    <span>🥈 2nd Place</span>
                  </span>
                  <span className="font-semibold text-neutral-200 font-mono tabular-nums">₦150,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <span>🥉 3rd Place</span>
                  </span>
                  <span className="font-semibold text-[#cd7f32] font-mono tabular-nums">₦100,000</span>
                </div>
              </div>

              {/* Action Link */}
              <button
                onClick={() => setActivePage('weekly-prizes')}
                className="w-full mt-4 flex items-center justify-center gap-1.5 text-xs text-[#39FF14] hover:underline font-semibold"
              >
                <span>View Full Prize Rules & Payout Structure</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Database-backed Stats Strip */}
        <div className="mt-14 pt-8 border-t border-[#111A13] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#0B110D]/60 border border-[#16241a] p-4 rounded-xl">
            <span className="text-xs uppercase text-[#A7B2AA] font-mono tracking-wider block">Approved Goals</span>
            <span className="text-3xl font-display font-extrabold text-white tabular-nums mt-1 block">
              {approvedCount} <span className="text-xs font-sans font-normal text-[#39FF14]">Verified</span>
            </span>
          </div>

          <div className="bg-[#0B110D]/60 border border-[#16241a] p-4 rounded-xl">
            <span className="text-xs uppercase text-[#A7B2AA] font-mono tracking-wider block">Registered Strikers</span>
            <span className="text-3xl font-display font-extrabold text-white tabular-nums mt-1 block">
              {registeredPlayersCount} <span className="text-xs font-sans font-normal text-neutral-400">Players</span>
            </span>
          </div>

          <div className="bg-[#0B110D]/60 border border-[#16241a] p-4 rounded-xl">
            <span className="text-xs uppercase text-[#A7B2AA] font-mono tracking-wider block">States Represented</span>
            <span className="text-3xl font-display font-extrabold text-[#39FF14] tabular-nums mt-1 block">
              {participatingStatesCount} <span className="text-xs font-sans font-normal text-white">/ 37 Regions</span>
            </span>
          </div>

          <div className="bg-[#0B110D]/60 border border-[#16241a] p-4 rounded-xl">
            <span className="text-xs uppercase text-[#A7B2AA] font-mono tracking-wider block">Cash Prizes Awarded</span>
            <span className="text-3xl font-display font-extrabold text-[#FFD700] tabular-nums mt-1 block">
              ₦500,000 <span className="text-xs font-sans font-normal text-[#A7B2AA]">Week 41 Disbursed</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
