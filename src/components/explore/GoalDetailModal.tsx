import React, { useState } from 'react';
import { GoalSubmission } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Heart,
  Share2,
  Trophy,
  MapPin,
  Calendar,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface GoalDetailModalProps {
  goal: GoalSubmission | null;
  onClose: () => void;
}

export const GoalDetailModal: React.FC<GoalDetailModalProps> = ({ goal, onClose }) => {
  const { toggleLike, likedSubmissionIds } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!goal) return null;

  const isLiked = likedSubmissionIds.includes(goal.id);
  const primaryScore = goal.scores[0];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out this incredible goal by ${goal.playerName} on GOALSHELF: "${goal.title}"! Scored: ${goal.finalScore || 'Pending'}/100. ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      `Watch "${goal.title}" by ${goal.playerDisplayName} from ${goal.state} competing on @GoalShelf for ₦500k weekly cash prize! #GoalShelf #NigeriaFootball`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#0B110D] border border-[#16241a] rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Section */}
        <div className="relative aspect-video bg-black w-full overflow-hidden">
          <video
            src={goal.videoUrl}
            controls
            autoPlay={false}
            poster={goal.thumbnailUrl}
            className="w-full h-full object-contain"
          />

          {/* Watermark Tag */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-[#39FF14]/40 text-xs font-mono text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
            <span className="text-[#39FF14]">{goal.timestampVerifiedTime}</span>
          </div>
        </div>

        {/* Details & Scoring Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#16241a]">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#A7B2AA] mb-2">
                <span className="text-[#39FF14] uppercase font-bold tracking-wider">
                  {goal.category.replace('_', ' ')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  {goal.city || goal.state}
                </span>
                <span aria-hidden="true">·</span>
                <span>Week {goal.competitionWeek}</span>
                <span aria-hidden="true">·</span>
                <span>{goal.dateRecorded}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-white tracking-wide">
                {goal.title}
              </h2>
            </div>

            {/* Score & Rank Cluster */}
            <div className="flex items-center gap-3 shrink-0">
              {goal.rank && goal.rank <= 3 && (
                <div className="px-3 py-1.5 rounded-xl bg-[#FFD700] text-black font-display font-extrabold text-sm uppercase shadow-md flex items-center gap-1.5">
                  <Trophy className="w-4 h-4" />
                  <span>Rank #{goal.rank}</span>
                </div>
              )}

              {goal.finalScore && (
                <div className="px-4 py-2 bg-[#111A13] border border-[#39FF14]/40 rounded-xl text-center">
                  <span className="text-[10px] text-[#A7B2AA] block uppercase font-mono">Official Score</span>
                  <span className="text-2xl font-extrabold text-[#39FF14] font-mono tabular-nums leading-none">
                    {goal.finalScore}
                    <span className="text-xs text-neutral-400 font-normal">/100</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description & Player Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Description & 100-Point Rubric */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A7B2AA] font-semibold mb-2">
                  Goal Description & Strike Notes
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed bg-[#111A13] p-4 rounded-xl border border-[#16241a]">
                  {goal.description}
                </p>
              </div>

              {/* 100-Point Score Rubric Breakdown if scored */}
              {primaryScore && (
                <div className="bg-[#111A13] border border-[#16241a] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#16241a]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#39FF14]" />
                      <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                        Official Technical Scorecard
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A7B2AA] font-mono">
                      Judge: {primaryScore.judgeName}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-neutral-300 mb-1">
                        <span>Technique & Execution</span>
                        <span className="text-[#39FF14] font-bold">{primaryScore.technique} / 30</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#050807] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#39FF14]"
                          style={{ width: `${(primaryScore.technique / 30) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-neutral-300 mb-1">
                        <span>Difficulty & Distance</span>
                        <span className="text-[#39FF14] font-bold">{primaryScore.difficulty} / 25</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#050807] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#39FF14]"
                          style={{ width: `${(primaryScore.difficulty / 25) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-neutral-300 mb-1">
                        <span>Accuracy & Placement</span>
                        <span className="text-[#39FF14] font-bold">{primaryScore.accuracy} / 20</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#050807] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#39FF14]"
                          style={{ width: `${(primaryScore.accuracy / 20) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-neutral-300 mb-1">
                        <span>Creativity & Originality</span>
                        <span className="text-[#39FF14] font-bold">{primaryScore.creativity} / 15</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#050807] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#39FF14]"
                          style={{ width: `${(primaryScore.creativity / 15) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-neutral-300 mb-1">
                        <span>Visual Impact</span>
                        <span className="text-[#39FF14] font-bold">{primaryScore.impact} / 10</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#050807] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#39FF14]"
                          style={{ width: `${(primaryScore.impact / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {primaryScore.notes && (
                    <p className="text-xs text-[#A7B2AA] italic pt-2 border-t border-[#16241a]">
                      "{primaryScore.notes}"
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Striker Card & Sharing Actions */}
            <div className="lg:col-span-5 space-y-4">
              {/* Player Card */}
              <div className="bg-[#111A13] border border-[#16241a] rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={goal.playerAvatar}
                    alt={goal.playerDisplayName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#39FF14]/50"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-white">{goal.playerName}</h5>
                    <p className="text-xs text-[#39FF14] font-mono">@{goal.playerDisplayName}</p>
                    <p className="text-[11px] text-[#A7B2AA] mt-0.5">{goal.state} State · Striker</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#16241a] grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="bg-[#0B110D] p-2 rounded-lg">
                    <span className="text-[10px] text-neutral-400 block uppercase">Submission Code</span>
                    <span className="text-neutral-200 font-bold">{goal.id}</span>
                  </div>
                  <div className="bg-[#0B110D] p-2 rounded-lg">
                    <span className="text-[10px] text-neutral-400 block uppercase">Status</span>
                    <span className="text-[#39FF14] font-bold capitalize">{goal.status}</span>
                  </div>
                </div>
              </div>

              {/* Social Reaction & Sharing */}
              <div className="bg-[#111A13] border border-[#16241a] rounded-xl p-5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A7B2AA] font-semibold block">
                  Support & Share This Strike
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(goal.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                      isLiked
                        ? 'bg-rose-500 text-white'
                        : 'bg-[#0B110D] hover:bg-[#16241a] text-white border border-[#16241a]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{goal.likesCount} {isLiked ? 'Liked' : 'Like'}</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#0B110D] hover:bg-[#16241a] text-white text-xs font-mono rounded-lg border border-[#16241a] transition-colors"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-[#39FF14]" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Copied' : 'Link'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={handleWhatsAppShare}
                    className="py-2 px-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Share on WhatsApp</span>
                  </button>
                  <button
                    onClick={handleTwitterShare}
                    className="py-2 px-3 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Share on X</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
