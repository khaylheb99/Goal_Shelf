import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const PrizeCardsSection: React.FC = () => {
  const { setActivePage, activeCompetition } = useApp();

  return (
    <section className="py-20 bg-[#0B110D] border-b border-[#111A13] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#39FF14]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111A13] border border-[#FFD700]/30 text-xs font-mono text-[#FFD700] uppercase mb-4">
            <Trophy className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>Guaranteed Weekly Payouts</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
            PUT YOUR GOAL ON THE SHELF. <br />
            <span className="text-[#39FF14] neon-glow">TAKE HOME THE PRIZE.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#A7B2AA] leading-relaxed">
            Every week, three Nigerian grassroots football goals claim their spot on the official shelf.
            Official scores are calculated on a transparent 100-point rubric, and cash is paid directly to bank accounts.
          </p>
        </div>

        {/* 3 Prize Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* 2nd Place Card (Silver) */}
          <div className="order-2 md:order-1 bg-[#111A13] rounded-2xl border border-neutral-700/60 p-7 flex flex-col justify-between relative group hover:border-neutral-400 transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold">
                  RUNNER UP
                </span>
                <span className="text-2xl">🥈</span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-display uppercase tracking-wide text-neutral-200">
                  SECOND PLACE
                </h3>
                <div className="text-4xl lg:text-5xl font-extrabold font-mono text-white tabular-nums mt-2">
                  ₦150,000
                </div>
                <span className="text-xs text-[#A7B2AA] block mt-1">Direct Bank Transfer</span>
              </div>

              <div className="pt-4 border-t border-[#16241a] space-y-2 text-xs text-[#A7B2AA]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Official Silver GoalShelf Plaque</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Rank #2 on National Leaderboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Feature spot across GoalShelf channels</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => setActivePage('submit')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#16241a] hover:bg-[#1f3325] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Submit for 2nd Place
              </button>
            </div>
          </div>

          {/* 1st Place Card (Gold Champion) - Elevated */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-[#16241a] to-[#111A13] rounded-2xl border-2 border-[#FFD700] p-8 flex flex-col justify-between relative shadow-[0_0_35px_rgba(255,215,0,0.15)] md:-translate-y-3">
            {/* Top Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFD700] text-black text-[11px] font-bold font-mono uppercase tracking-widest rounded-full shadow-md">
              👑 CHAMPION OF THE WEEK
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs uppercase font-mono tracking-widest text-[#FFD700] font-bold">
                  NATIONAL WINNER
                </span>
                <span className="text-3xl">🥇</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold font-display uppercase tracking-wide text-white">
                  FIRST PLACE
                </h3>
                <div className="text-5xl lg:text-6xl font-extrabold font-mono text-[#FFD700] gold-glow tabular-nums mt-2">
                  ₦250,000
                </div>
                <span className="text-xs text-[#39FF14] block mt-1 font-medium">Guaranteed Instant Payout</span>
              </div>

              {/* Trophy Artwork Preview */}
              <div className="w-full h-32 rounded-xl overflow-hidden border border-[#FFD700]/30 relative my-2">
                <img
                  src="/src/assets/images/golden_shelf_trophy_1791991463956.jpg"
                  alt="Golden GoalShelf Trophy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-mono text-white">The Golden GoalShelf Award</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#16241a] space-y-2 text-xs text-neutral-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#39FF14]" />
                  <span>Permanent placement on the National Shelf</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#39FF14]" />
                  <span>₦250,000 cash disbursed via NIP / Bank Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#39FF14]" />
                  <span>Public Hall of Fame permanent showcase</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => setActivePage('submit')}
                className="w-full py-3 px-4 rounded-xl bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-extrabold text-base uppercase tracking-wider transition-transform active:scale-95 shadow-[0_0_20px_rgba(57,255,20,0.35)]"
              >
                SUBMIT YOUR STRIKE
              </button>
            </div>
          </div>

          {/* 3rd Place Card (Bronze) */}
          <div className="order-3 bg-[#111A13] rounded-2xl border border-[#cd7f32]/40 p-7 flex flex-col justify-between relative group hover:border-[#cd7f32] transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-widest text-[#cd7f32] font-bold">
                  PODIUM FINISH
                </span>
                <span className="text-2xl">🥉</span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-display uppercase tracking-wide text-neutral-200">
                  THIRD PLACE
                </h3>
                <div className="text-4xl lg:text-5xl font-extrabold font-mono text-[#cd7f32] tabular-nums mt-2">
                  ₦100,000
                </div>
                <span className="text-xs text-[#A7B2AA] block mt-1">Direct Bank Transfer</span>
              </div>

              <div className="pt-4 border-t border-[#16241a] space-y-2 text-xs text-[#A7B2AA]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#cd7f32]" />
                  <span>Official Bronze GoalShelf Recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#cd7f32]" />
                  <span>Rank #3 on National Leaderboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#cd7f32]" />
                  <span>State Spotlight promotion</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => setActivePage('submit')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#16241a] hover:bg-[#1f3325] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Submit for 3rd Place
              </button>
            </div>
          </div>
        </div>

        {/* Total Weekly Banner & Integrity Note */}
        <div className="mt-12 bg-[#111A13] border border-[#39FF14]/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#39FF14]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
                  TOTAL WEEKLY PRIZE POOL: ₦500,000
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#00C853]/20 text-[#39FF14] font-bold">
                  CONFIRMED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A7B2AA] mt-1">
                Prizes are verified and guaranteed by administrative funding before competitions open.
                Payout references are tracked transparently in the platform database.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivePage('weekly-prizes')}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#39FF14] hover:underline whitespace-nowrap"
          >
            <span>Read Prize Disbursement & Verification FAQ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
