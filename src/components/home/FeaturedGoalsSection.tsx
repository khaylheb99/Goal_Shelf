import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Heart, Trophy, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { GoalSubmission } from '../../types';

export const FeaturedGoalsSection: React.FC = () => {
  const { submissions, setActivePage, setSelectedGoal, toggleLike, likedSubmissionIds } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const approvedGoals = submissions.filter((s) => s.status === 'approved');

  const filteredGoals = selectedCategory === 'all'
    ? approvedGoals
    : approvedGoals.filter((s) => s.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Top Strikes' },
    { id: 'volley', label: 'Volleys' },
    { id: 'bicycle_kick', label: 'Bicycle Kicks' },
    { id: 'free_kick', label: 'Free Kicks' },
    { id: 'solo_run', label: 'Solo Runs' },
    { id: 'long_range', label: 'Long Range' },
  ];

  return (
    <section className="py-20 bg-[#0B110D] border-b border-[#111A13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold">
              WEEKLY HIGHLIGHTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white font-display mt-1">
              APPROVED GOALS <br />
              <span className="text-[#39FF14]">ON THE SHELF.</span>
            </h2>
            <p className="text-sm text-[#A7B2AA] mt-2">
              Human-moderated strikes with verified timestamps competing for this week's ₦500,000 pool.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#111A13] border border-[#16241a] rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#39FF14] text-black shadow-sm'
                    : 'text-[#A7B2AA] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.slice(0, 6).map((goal) => {
            const isLiked = likedSubmissionIds.includes(goal.id);
            return (
              <div
                key={goal.id}
                className="bg-[#111A13] border border-[#16241a] rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#39FF14]/50 transition-all duration-300"
              >
                {/* Media Thumbnail & Play Trigger */}
                <div className="relative aspect-video bg-black overflow-hidden cursor-pointer" onClick={() => setSelectedGoal(goal)}>
                  <img
                    src={goal.thumbnailUrl}
                    alt={goal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#39FF14]/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Top Bar Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {goal.rank && goal.rank <= 3 && (
                      <span className="px-2.5 py-1 rounded bg-[#FFD700] text-black font-mono text-[11px] font-bold shadow-md">
                        {goal.rank === 1 ? '🥇 RANK #1' : goal.rank === 2 ? '🥈 RANK #2' : '🥉 RANK #3'}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#39FF14] border border-[#39FF14]/30">
                      WEEK {goal.competitionWeek}
                    </span>
                  </div>

                  {/* Verified Timestamp Watermark Tag */}
                  <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-neutral-300 bg-black/80 px-2 py-0.5 rounded flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C853]" />
                    <span>{goal.timestampVerifiedTime}</span>
                  </div>

                  {/* Score Tag */}
                  {goal.finalScore && (
                    <div className="absolute bottom-2.5 right-3 bg-[#0B110D] border border-[#39FF14]/40 px-2.5 py-0.5 rounded text-xs font-mono font-bold text-white">
                      <span className="text-[#39FF14]">{goal.finalScore}</span>
                      <span className="text-[10px] text-neutral-400">/100</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata: category · state · date */}
                    <div className="flex items-center gap-2 text-xs text-[#A7B2AA] mb-2 font-mono">
                      <span className="capitalize text-[#39FF14]">{goal.category.replace('_', ' ')}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        {goal.city || goal.state}
                      </span>
                    </div>

                    <h3
                      onClick={() => setSelectedGoal(goal)}
                      className="text-lg font-bold font-display uppercase tracking-wide text-white group-hover:text-[#39FF14] transition-colors cursor-pointer line-clamp-2 leading-tight"
                    >
                      {goal.title}
                    </h3>

                    <p className="text-xs text-[#A7B2AA] mt-2 line-clamp-2 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>

                  {/* Player & Action Footer */}
                  <div className="mt-5 pt-3 border-t border-[#16241a] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={goal.playerAvatar}
                        alt={goal.playerDisplayName}
                        className="w-7 h-7 rounded-full object-cover border border-[#39FF14]/30"
                      />
                      <div>
                        <span className="text-xs font-semibold text-white block leading-tight">
                          {goal.playerName}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          @{goal.playerDisplayName}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(goal.id);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                        isLiked
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
                      }`}
                      aria-label="Like goal"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                      <span className="tabular-nums">{goal.likesCount}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setActivePage('explore')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111A13] hover:bg-[#16241a] border border-[#39FF14]/40 text-white font-display font-bold text-base uppercase rounded-xl transition-colors shadow-md"
          >
            <span>Explore All 37 Nigerian Regions & Goals</span>
            <ArrowRight className="w-4 h-4 text-[#39FF14]" />
          </button>
        </div>
      </div>
    </section>
  );
};
