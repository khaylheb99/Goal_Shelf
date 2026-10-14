import React from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, ShieldCheck, CheckCircle2, Lock, ArrowRight, HelpCircle } from 'lucide-react';

export const WeeklyPrizesPage: React.FC = () => {
  const { payouts, activeCompetition, setActivePage } = useApp();

  return (
    <div className="min-h-screen bg-[#050807] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl pb-6 border-b border-[#111A13]">
          <span className="text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold">
            CASH PRIZE DISBURSEMENT & VERIFICATION
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-white mt-1">
            PUT YOUR GOAL ON THE SHELF. <br />
            <span className="text-[#39FF14] neon-glow">TAKE HOME THE PRIZE.</span>
          </h1>
          <p className="text-sm text-[#A7B2AA] mt-2 leading-relaxed">
            Every week, ₦500,000 in cash prizes is awarded to the top three verified strikes.
            Prizes are transferred directly to winners' Nigerian bank accounts following integrity verification.
          </p>
        </div>

        {/* 3 Prize Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* 2nd Place */}
          <div className="order-2 md:order-1 bg-[#0B110D] border border-neutral-700/60 rounded-3xl p-7 flex flex-col justify-between">
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
                <span className="text-xs text-[#A7B2AA] block mt-1">Direct Bank Payout</span>
              </div>

              <div className="pt-4 border-t border-[#16241a] space-y-2 text-xs text-[#A7B2AA]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Silver GoalShelf Digital Plaque</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Permanent placement on National Archive</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Feature on social spotlight</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => setActivePage('submit')}
                className="w-full py-3 bg-[#111A13] hover:bg-[#16241a] text-white text-xs font-semibold rounded-xl border border-[#16241a] transition-colors"
              >
                Submit for 2nd Place
              </button>
            </div>
          </div>

          {/* 1st Place - Gold Champion */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-[#16241a] to-[#0B110D] border-2 border-[#FFD700] rounded-3xl p-8 flex flex-col justify-between shadow-[0_0_35px_rgba(255,215,0,0.15)] md:-translate-y-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-widest text-[#FFD700] font-bold">
                  NATIONAL CHAMPION
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

              {/* Trophy Artwork */}
              <div className="w-full h-36 rounded-xl overflow-hidden border border-[#FFD700]/30 relative my-2">
                <img
                  src="/src/assets/images/golden_shelf_trophy_1791991463956.jpg"
                  alt="Golden GoalShelf Trophy"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="pt-4 border-t border-[#16241a] space-y-2 text-xs text-neutral-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14]" />
                  <span>Gold GoalShelf Official Trophy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14]" />
                  <span>₦250,000 disbursed to bank account</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39FF14]" />
                  <span>Permanent #1 National Shelf Badge</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => setActivePage('submit')}
                className="w-full py-3.5 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-extrabold text-base uppercase rounded-xl transition-transform active:scale-95 shadow-lg"
              >
                SUBMIT YOUR STRIKE
              </button>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 bg-[#0B110D] border border-[#cd7f32]/50 rounded-3xl p-7 flex flex-col justify-between">
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
                <span className="text-xs text-[#A7B2AA] block mt-1">Direct Bank Payout</span>
              </div>

              <div className="pt-4 border-t border-[#16241a] space-y-2 text-xs text-[#A7B2AA]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#cd7f32]" />
                  <span>Bronze GoalShelf Plaque</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#cd7f32]" />
                  <span>State representation promotion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#cd7f32]" />
                  <span>Eligible for Monthly Best-of-the-Best</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => setActivePage('submit')}
                className="w-full py-3 bg-[#111A13] hover:bg-[#16241a] text-white text-xs font-semibold rounded-xl border border-[#16241a] transition-colors"
              >
                Submit for 3rd Place
              </button>
            </div>
          </div>
        </div>

        {/* Transparent Verification & Payout Protocol */}
        <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#16241a]">
            <ShieldCheck className="w-6 h-6 text-[#39FF14]" />
            <div>
              <h3 className="text-lg font-bold font-display uppercase text-white">
                How Cash Prizes Are Verified & Disbursed
              </h3>
              <p className="text-xs text-[#A7B2AA]">
                Strict 5-stage pipeline to ensure zero fraud and timely payouts every Tuesday.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-mono">
            <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a]">
              <span className="text-[#39FF14] font-bold block mb-1">Step 1</span>
              <span className="text-white font-bold block mb-1">Deadline Closes</span>
              <span className="text-[11px] text-neutral-400">Sunday 23:59 WAT. Leaderboard locks for final review.</span>
            </div>

            <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a]">
              <span className="text-[#39FF14] font-bold block mb-1">Step 2</span>
              <span className="text-white font-bold block mb-1">Timestamp Audit</span>
              <span className="text-[11px] text-neutral-400">Chief Judge & Integrity Officer re-verify raw camera metadata.</span>
            </div>

            <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a]">
              <span className="text-[#39FF14] font-bold block mb-1">Step 3</span>
              <span className="text-white font-bold block mb-1">Winner Contact</span>
              <span className="text-[11px] text-neutral-400">Winners receive official phone & in-app verification prompt.</span>
            </div>

            <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a]">
              <span className="text-[#39FF14] font-bold block mb-1">Step 4</span>
              <span className="text-white font-bold block mb-1">Bank Processing</span>
              <span className="text-[11px] text-neutral-400">Payout executed via Nigerian NIP instant transfer to player account.</span>
            </div>

            <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a]">
              <span className="text-[#FFD700] font-bold block mb-1">Step 5</span>
              <span className="text-white font-bold block mb-1">Published Audit</span>
              <span className="text-[11px] text-neutral-400">Payout reference logged publicly in Hall of Fame.</span>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a] flex items-center gap-3 text-xs text-[#A7B2AA]">
            <Lock className="w-5 h-5 text-neutral-400 shrink-0" />
            <span>
              <strong>Bank Security Guarantee:</strong> GoalShelf never publishes full bank account numbers.
              Only verified masked audit references (e.g. <code>Zenith Bank •••• 3042</code>) appear in records.
            </span>
          </div>
        </div>

        {/* Official Payout Audit History (Week 41 Winners) */}
        <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-[#16241a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-display uppercase text-white">
                Confirmed Prize Disbursements & Hall of Fame
              </h3>
              <p className="text-xs text-[#A7B2AA]">
                Official audit trail of disbursed weekly prizes.
              </p>
            </div>
            <span className="text-xs font-mono text-[#39FF14] bg-[#111A13] px-3 py-1 rounded">
              ₦500,000 Disbursed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111A13] text-[#A7B2AA] font-mono uppercase text-[11px] border-b border-[#16241a]">
                <tr>
                  <th className="py-3.5 px-4">Week & Place</th>
                  <th className="py-3.5 px-4">Winner Name</th>
                  <th className="py-3.5 px-4">State</th>
                  <th className="py-3.5 px-4">Winning Goal Strike</th>
                  <th className="py-3.5 px-4">Prize Amount</th>
                  <th className="py-3.5 px-4">Payment Ref Code</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16241a] font-mono">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#111A13]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      Week {p.weekNumber} · {p.position === 1 ? '🥇 1st' : p.position === 2 ? '🥈 2nd' : '🥉 3rd'}
                    </td>
                    <td className="py-3.5 px-4 text-white font-semibold">
                      {p.winnerName}
                      <span className="text-neutral-400 block text-[11px]">@{p.winnerDisplayName}</span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-300">{p.winnerState}</td>
                    <td className="py-3.5 px-4 text-neutral-300 max-w-xs truncate">{p.goalTitle}</td>
                    <td className="py-3.5 px-4 font-bold text-[#FFD700] tabular-nums">
                      ₦{p.prizeAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-[#A7B2AA] select-all">
                      {p.paymentRef || 'PENDING'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
