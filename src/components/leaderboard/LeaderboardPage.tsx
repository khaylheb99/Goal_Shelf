import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GoalDetailModal } from '../explore/GoalDetailModal';
import {
  Trophy,
  Award,
  Play,
  Heart,
  ShieldCheck,
  Info,
  Calendar,
  ChevronRight,
  HelpCircle,
  Clock,
} from 'lucide-react';
import { GoalSubmission } from '../../types';

export const LeaderboardPage: React.FC = () => {
  const {
    submissions,
    competitions,
    activeCompetition,
    selectedGoal,
    setSelectedGoal,
    toggleLike,
    likedSubmissionIds,
    setActivePage,
  } = useApp();

  const [selectedWeek, setSelectedWeek] = useState<number>(activeCompetition.weekNumber);
  const [showRubricInfo, setShowRubricInfo] = useState(false);

  const comp = competitions.find((c) => c.weekNumber === selectedWeek) || activeCompetition;
  const isFinalized = comp.status === 'finalized';

  // Filter approved scored submissions for the selected competition week
  const weekSubmissions = submissions
    .filter((s) => s.status === 'approved' && s.competitionWeek === selectedWeek)
    .sort((a, b) => {
      const aScore = a.finalScore || 0;
      const bScore = b.finalScore || 0;
      if (bScore !== aScore) return bScore - aScore;

      // Tie breaker 1: Technique
      const aTech = a.scores[0]?.technique || 0;
      const bTech = b.scores[0]?.technique || 0;
      if (bTech !== aTech) return bTech - aTech;

      // Tie breaker 2: Difficulty
      const aDiff = a.scores[0]?.difficulty || 0;
      const bDiff = b.scores[0]?.difficulty || 0;
      return bDiff - aDiff;
    });

  const top3 = weekSubmissions.slice(0, 3);
  const remainingEntries = weekSubmissions.slice(3);

  return (
    <div className="min-h-screen bg-[#050807] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header & Week Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#111A13]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold">
                NATIONAL RANKINGS & PRIZE SHELF
              </span>
              <span className="text-neutral-500">·</span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                  isFinalized
                    ? 'bg-neutral-800 text-neutral-300'
                    : 'bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/30'
                }`}
              >
                {isFinalized ? 'Finalized Results' : 'Provisional Live Board'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-white">
              WEEKLY GOAL <span className="text-[#39FF14]">LEADERBOARD</span>
            </h1>

            <p className="text-sm text-[#A7B2AA] mt-2 max-w-xl">
              Transparent rankings based on our verified 100-point technical rubric. Top 3 contenders
              claim the weekly ₦500,000 cash prizes when the window closes Sunday midnight.
            </p>
          </div>

          {/* Week Selector Tabs */}
          <div className="flex items-center gap-2 bg-[#0B110D] p-1.5 rounded-xl border border-[#16241a] self-start md:self-end">
            {competitions.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedWeek(c.weekNumber)}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-colors whitespace-nowrap ${
                  selectedWeek === c.weekNumber
                    ? 'bg-[#39FF14] text-black shadow-md'
                    : 'text-[#A7B2AA] hover:text-white'
                }`}
              >
                Week {c.weekNumber} {c.status === 'active' ? '(Live)' : '(Final)'}
              </button>
            ))}
          </div>
        </div>

        {/* 100-Point Rubric Disclosure Accordion / Panel */}
        <div className="bg-[#0B110D] border border-[#16241a] rounded-2xl p-5 sm:p-6 space-y-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowRubricInfo(!showRubricInfo)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/30 flex items-center justify-center text-[#39FF14]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase font-display text-white">
                  Transparent 100-Point Judging Criteria & Tie-Breaker Policy
                </h4>
                <p className="text-xs text-[#A7B2AA]">
                  Scores are entered independently by accredited technical judges. Click to view breakdown.
                </p>
              </div>
            </div>
            <button className="text-xs font-mono text-[#39FF14] hover:underline">
              {showRubricInfo ? 'Hide Criteria' : 'View Criteria'}
            </button>
          </div>

          {showRubricInfo && (
            <div className="pt-4 border-t border-[#16241a] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-mono">
              <div className="bg-[#111A13] p-3 rounded-xl border border-[#16241a]">
                <span className="text-[#39FF14] font-bold block text-sm">30 Points Max</span>
                <span className="text-white font-medium block mt-1">Technique & Execution</span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Body shape, clean connection, follow-through mechanics.</span>
              </div>
              <div className="bg-[#111A13] p-3 rounded-xl border border-[#16241a]">
                <span className="text-[#39FF14] font-bold block text-sm">25 Points Max</span>
                <span className="text-white font-medium block mt-1">Difficulty & Distance</span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Distance from goal, match pressure, angle tight-ness.</span>
              </div>
              <div className="bg-[#111A13] p-3 rounded-xl border border-[#16241a]">
                <span className="text-[#39FF14] font-bold block text-sm">20 Points Max</span>
                <span className="text-white font-medium block mt-1">Accuracy & Placement</span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Upper corners, postage stamp, underside of crossbar.</span>
              </div>
              <div className="bg-[#111A13] p-3 rounded-xl border border-[#16241a]">
                <span className="text-[#39FF14] font-bold block text-sm">15 Points Max</span>
                <span className="text-white font-medium block mt-1">Creativity & Flair</span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Bicycle kick, rabona, volley swerve, audacity.</span>
              </div>
              <div className="bg-[#111A13] p-3 rounded-xl border border-[#16241a]">
                <span className="text-[#39FF14] font-bold block text-sm">10 Points Max</span>
                <span className="text-white font-medium block mt-1">Overall Visual Impact</span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Spectator reaction, net bulge, sheer aesthetic glory.</span>
              </div>
            </div>
          )}
        </div>

        {/* Podium for Top 3 Entries */}
        {top3.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-wider text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FFD700]" />
                Prize Podium Positions (Top 3)
              </h2>
              <span className="text-xs font-mono text-[#A7B2AA]">
                Total Weekly Pool: ₦500,000
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Rank 2 - Silver */}
              {top3[1] && (
                <div className="order-2 md:order-1 bg-[#111A13] border border-neutral-700 rounded-2xl overflow-hidden p-6 flex flex-col justify-between relative group hover:border-neutral-400 transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-neutral-800 text-neutral-200 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5">
                        <span>🥈 RANK #2</span>
                      </span>
                      <span className="text-xl font-mono font-bold text-neutral-200 tabular-nums">
                        ₦150,000
                      </span>
                    </div>

                    <div
                      className="relative aspect-video rounded-xl overflow-hidden bg-black cursor-pointer"
                      onClick={() => setSelectedGoal(top3[1])}
                    >
                      <img
                        src={top3[1].thumbnailUrl}
                        alt={top3[1].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-300 bg-black/80 px-2 py-0.5 rounded">
                        {top3[1].timestampVerifiedTime}
                      </div>
                    </div>

                    <div>
                      <h3
                        onClick={() => setSelectedGoal(top3[1])}
                        className="text-base font-bold font-display uppercase tracking-wide text-white cursor-pointer hover:text-[#39FF14] line-clamp-2"
                      >
                        {top3[1].title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#A7B2AA] mt-1 font-mono">
                        <span className="text-white font-medium">{top3[1].playerName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{top3[1].state}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#16241a] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 font-mono block uppercase">Final Score</span>
                      <span className="text-2xl font-mono font-extrabold text-[#39FF14] tabular-nums">
                        {top3[1].finalScore} <span className="text-xs text-neutral-400 font-normal">/100</span>
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedGoal(top3[1])}
                      className="px-3.5 py-1.5 bg-[#16241a] hover:bg-[#1f3325] text-xs font-semibold rounded-lg text-white"
                    >
                      Inspect Video
                    </button>
                  </div>
                </div>
              )}

              {/* Rank 1 - Gold Champion */}
              {top3[0] && (
                <div className="order-1 md:order-2 bg-gradient-to-b from-[#16241a] to-[#111A13] border-2 border-[#FFD700] rounded-2xl overflow-hidden p-7 flex flex-col justify-between relative shadow-[0_0_35px_rgba(255,215,0,0.15)] md:-translate-y-3">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#FFD700] text-black text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 shadow-md">
                        <span>🥇 RANK #1 (LEADER)</span>
                      </span>
                      <span className="text-2xl font-mono font-extrabold text-[#FFD700] gold-glow tabular-nums">
                        ₦250,000
                      </span>
                    </div>

                    <div
                      className="relative aspect-video rounded-xl overflow-hidden bg-black cursor-pointer border border-[#FFD700]/30"
                      onClick={() => setSelectedGoal(top3[0])}
                    >
                      <img
                        src={top3[0].thumbnailUrl}
                        alt={top3[0].title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#39FF14] text-black flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/90 px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
                        <span>{top3[0].timestampVerifiedTime}</span>
                      </div>
                    </div>

                    <div>
                      <h3
                        onClick={() => setSelectedGoal(top3[0])}
                        className="text-lg font-bold font-display uppercase tracking-wide text-white cursor-pointer hover:text-[#39FF14] line-clamp-2"
                      >
                        {top3[0].title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#A7B2AA] mt-1 font-mono">
                        <span className="text-white font-semibold">{top3[0].playerName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-[#39FF14]">{top3[0].state}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#16241a] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-mono block uppercase">Official Score</span>
                      <span className="text-3xl font-mono font-extrabold text-[#39FF14] neon-glow tabular-nums">
                        {top3[0].finalScore} <span className="text-xs text-neutral-300 font-normal">/100</span>
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedGoal(top3[0])}
                      className="px-4 py-2 bg-[#39FF14] hover:bg-[#32e012] text-black text-xs font-display font-bold uppercase rounded-lg shadow-md"
                    >
                      Watch Strike
                    </button>
                  </div>
                </div>
              )}

              {/* Rank 3 - Bronze */}
              {top3[2] && (
                <div className="order-3 bg-[#111A13] border border-[#cd7f32]/50 rounded-2xl overflow-hidden p-6 flex flex-col justify-between relative group hover:border-[#cd7f32] transition-colors">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#cd7f32]/20 text-[#cd7f32] text-xs font-mono font-bold rounded-lg border border-[#cd7f32]/40 flex items-center gap-1.5">
                        <span>🥉 RANK #3</span>
                      </span>
                      <span className="text-xl font-mono font-bold text-[#cd7f32] tabular-nums">
                        ₦100,000
                      </span>
                    </div>

                    <div
                      className="relative aspect-video rounded-xl overflow-hidden bg-black cursor-pointer"
                      onClick={() => setSelectedGoal(top3[2])}
                    >
                      <img
                        src={top3[2].thumbnailUrl}
                        alt={top3[2].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-300 bg-black/80 px-2 py-0.5 rounded">
                        {top3[2].timestampVerifiedTime}
                      </div>
                    </div>

                    <div>
                      <h3
                        onClick={() => setSelectedGoal(top3[2])}
                        className="text-base font-bold font-display uppercase tracking-wide text-white cursor-pointer hover:text-[#39FF14] line-clamp-2"
                      >
                        {top3[2].title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#A7B2AA] mt-1 font-mono">
                        <span className="text-white font-medium">{top3[2].playerName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{top3[2].state}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#16241a] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 font-mono block uppercase">Final Score</span>
                      <span className="text-2xl font-mono font-extrabold text-[#39FF14] tabular-nums">
                        {top3[2].finalScore} <span className="text-xs text-neutral-400 font-normal">/100</span>
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedGoal(top3[2])}
                      className="px-3.5 py-1.5 bg-[#16241a] hover:bg-[#1f3325] text-xs font-semibold rounded-lg text-white"
                    >
                      Inspect Video
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Complete Table of All Eligible Competitors */}
        <div className="bg-[#0B110D] border border-[#16241a] rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-[#16241a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-display uppercase text-white">
                Full Official Standings — Week {selectedWeek}
              </h3>
              <p className="text-xs text-[#A7B2AA]">
                Accredited scores out of 100 with technique and difficulty tie-break metrics.
              </p>
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              {weekSubmissions.length} Verified Submissions
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111A13] text-[#A7B2AA] font-mono uppercase text-[11px] border-b border-[#16241a]">
                <tr>
                  <th className="py-3.5 px-4 w-16">Rank</th>
                  <th className="py-3.5 px-4">Goal Title & Player</th>
                  <th className="py-3.5 px-4">State</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-center">Technique (30)</th>
                  <th className="py-3.5 px-4 text-center">Difficulty (25)</th>
                  <th className="py-3.5 px-4 text-right">Official Score</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#16241a]">
                {weekSubmissions.map((entry, index) => {
                  const score = entry.scores[0];
                  return (
                    <tr
                      key={entry.id}
                      className={`hover:bg-[#111A13]/80 transition-colors ${
                        index === 0
                          ? 'bg-[#FFD700]/5'
                          : index === 1
                          ? 'bg-neutral-800/10'
                          : index === 2
                          ? 'bg-amber-900/10'
                          : ''
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-3 px-4 font-mono font-bold">
                        {index === 0 ? (
                          <span className="text-[#FFD700] text-sm">🥇 #1</span>
                        ) : index === 1 ? (
                          <span className="text-neutral-200 text-sm">🥈 #2</span>
                        ) : index === 2 ? (
                          <span className="text-[#cd7f32] text-sm">🥉 #3</span>
                        ) : (
                          <span className="text-[#A7B2AA]">#{index + 1}</span>
                        )}
                      </td>

                      {/* Goal & Player */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            onClick={() => setSelectedGoal(entry)}
                            className="w-12 h-8 rounded bg-black overflow-hidden relative shrink-0 cursor-pointer"
                          >
                            <img
                              src={entry.thumbnailUrl}
                              alt={entry.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Play className="w-3.5 h-3.5 text-white fill-current" />
                            </div>
                          </div>

                          <div>
                            <span
                              onClick={() => setSelectedGoal(entry)}
                              className="font-bold text-white hover:text-[#39FF14] cursor-pointer block line-clamp-1"
                            >
                              {entry.title}
                            </span>
                            <span className="text-[11px] text-[#A7B2AA] font-mono">
                              {entry.playerName} (@{entry.playerDisplayName})
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* State */}
                      <td className="py-3 px-4 text-neutral-300 font-mono whitespace-nowrap">
                        {entry.state}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-[#A7B2AA] capitalize font-mono whitespace-nowrap">
                        {entry.category.replace('_', ' ')}
                      </td>

                      {/* Technique Score */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-white tabular-nums">
                        {score?.technique ?? '—'}
                      </td>

                      {/* Difficulty Score */}
                      <td className="py-3 px-4 text-center font-mono font-bold text-white tabular-nums">
                        {score?.difficulty ?? '—'}
                      </td>

                      {/* Final Score */}
                      <td className="py-3 px-4 text-right font-mono font-extrabold text-[#39FF14] text-sm tabular-nums">
                        {entry.finalScore ? `${entry.finalScore}` : 'Pending'}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setSelectedGoal(entry)}
                          className="px-2.5 py-1 bg-[#16241a] hover:bg-[#1f3325] text-white text-[11px] font-medium rounded transition-colors whitespace-nowrap"
                        >
                          Watch Video
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Public Voting Disclaimer Notice */}
        <div className="bg-[#111A13] border border-[#16241a] rounded-2xl p-5 flex items-start gap-3.5 text-xs text-[#A7B2AA] leading-relaxed">
          <Info className="w-5 h-5 text-[#39FF14] shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-semibold">Integrity Rule on Public Votes:</span> Community likes provide encouragement and engagement, but official prize winners are determined exclusively by the authorized judging panel scores on the 100-point rubric. Public likes never determine cash prize disbursement.
          </div>
        </div>
      </div>

      {/* Goal Detail Modal */}
      <GoalDetailModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
    </div>
  );
};
