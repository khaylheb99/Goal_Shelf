import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_STATES, GOAL_CATEGORIES } from '../../data/nigeriaData';
import { GoalDetailModal } from './GoalDetailModal';
import {
  Search,
  Filter,
  Play,
  Heart,
  MapPin,
  Trophy,
  SlidersHorizontal,
  RotateCcw,
  UploadCloud,
} from 'lucide-react';

export const ExploreGoalsPage: React.FC = () => {
  const {
    submissions,
    selectedGoal,
    setSelectedGoal,
    toggleLike,
    likedSubmissionIds,
    selectedStateFilter,
    setSelectedStateFilter,
    setActivePage,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [weekFilter, setWeekFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'likes'>('rating');

  // Filter approved goals only
  const filteredGoals = useMemo(() => {
    return submissions.filter((goal) => {
      // Must be approved for public exploration
      if (goal.status !== 'approved') return false;

      // State Filter
      if (selectedStateFilter !== 'all' && goal.state !== selectedStateFilter) {
        return false;
      }

      // Category Filter
      if (categoryFilter !== 'all' && goal.category !== categoryFilter) {
        return false;
      }

      // Week Filter
      if (weekFilter !== 'all' && String(goal.competitionWeek) !== weekFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = goal.title.toLowerCase().includes(query);
        const matchesPlayer = goal.playerName.toLowerCase().includes(query) || goal.playerDisplayName.toLowerCase().includes(query);
        const matchesCity = goal.city.toLowerCase().includes(query) || goal.state.toLowerCase().includes(query);
        if (!matchesTitle && !matchesPlayer && !matchesCity) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.finalScore || 0) - (a.finalScore || 0);
      }
      if (sortBy === 'likes') {
        return b.likesCount - a.likesCount;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [submissions, selectedStateFilter, categoryFilter, weekFilter, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSelectedStateFilter('all');
    setCategoryFilter('all');
    setWeekFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#050807] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#111A13]">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold">
              NATIONAL GOAL DISCOVERY
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-white mt-1">
              EXPLORE TOP <span className="text-[#39FF14]">NIGERIAN STRIKES</span>
            </h1>
            <p className="text-sm text-[#A7B2AA] mt-2 max-w-xl">
              Watch genuine grassroots goals verified with on-screen timestamps from Lagos to Kano.
              Filter by region, category, or technical judge scores.
            </p>
          </div>

          <button
            onClick={() => setActivePage('submit')}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-extrabold text-base uppercase rounded-xl shadow-lg transition-transform active:scale-95 whitespace-nowrap self-start md:self-end"
          >
            <UploadCloud className="w-5 h-5 stroke-[2.5]" />
            SUBMIT YOUR GOAL
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0B110D] border border-[#16241a] rounded-2xl p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search strikes, players, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14]"
              />
            </div>

            {/* State Filter Dropdown */}
            <div>
              <select
                value={selectedStateFilter}
                onChange={(e) => setSelectedStateFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-xs text-white focus:outline-none focus:border-[#39FF14]"
              >
                <option value="all">All 36 States + FCT</option>
                {NIGERIAN_STATES.map((s) => (
                  <option key={s.code} value={s.name}>
                    {s.name} ({s.geopoliticalZone})
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter Dropdown */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-xs text-white focus:outline-none focus:border-[#39FF14]"
              >
                {GOAL_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-xs text-white focus:outline-none focus:border-[#39FF14]"
              >
                <option value="rating">Highest Technical Score</option>
                <option value="newest">Newest Approved</option>
                <option value="likes">Most Community Likes</option>
              </select>
            </div>
          </div>

          {/* Active Filter Indicators */}
          {(selectedStateFilter !== 'all' || categoryFilter !== 'all' || searchQuery) && (
            <div className="flex items-center justify-between pt-2 border-t border-[#16241a] text-xs">
              <div className="flex items-center gap-2 text-[#A7B2AA]">
                <span>Showing filtered results</span>
                {selectedStateFilter !== 'all' && (
                  <span className="text-[#39FF14] font-medium">State: {selectedStateFilter}</span>
                )}
                {categoryFilter !== 'all' && (
                  <span className="text-[#39FF14] font-medium">Category: {categoryFilter}</span>
                )}
              </div>
              <button
                onClick={handleClearFilters}
                className="text-neutral-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Goals Grid */}
        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.map((goal) => {
              const isLiked = likedSubmissionIds.includes(goal.id);
              return (
                <div
                  key={goal.id}
                  className="bg-[#111A13] border border-[#16241a] rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#39FF14]/50 transition-all duration-300"
                >
                  {/* Thumbnail / Video click trigger */}
                  <div
                    onClick={() => setSelectedGoal(goal)}
                    className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                  >
                    <img
                      src={goal.thumbnailUrl}
                      alt={goal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#39FF14]/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Top Status */}
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

                    {/* Watermark preview tag */}
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

                  {/* Body Content */}
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
                        <span aria-hidden="true">·</span>
                        <span>{goal.dateRecorded}</span>
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

                    {/* Footer Row */}
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
        ) : (
          <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#111A13] border border-[#39FF14]/20 mx-auto flex items-center justify-center text-neutral-400">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display uppercase text-white">No Goals Found</h3>
            <p className="text-xs text-[#A7B2AA] leading-relaxed">
              No approved strikes match your current filter selections. Try clearing your search or represent {selectedStateFilter !== 'all' ? selectedStateFilter : 'your area'} by submitting a goal!
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-[#111A13] text-white text-xs font-medium rounded-lg hover:bg-[#16241a]"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setActivePage('submit')}
                className="px-4 py-2 bg-[#39FF14] text-black text-xs font-bold font-display uppercase rounded-lg hover:bg-[#32e012]"
              >
                Submit Goal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Goal Detail & Video Modal */}
      <GoalDetailModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
    </div>
  );
};
