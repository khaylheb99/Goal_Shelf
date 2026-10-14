import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_STATES, GEOPOLITICAL_ZONES } from '../../data/nigeriaData';
import { NigerianState, GoalSubmission } from '../../types';
import { GoalDetailModal } from '../explore/GoalDetailModal';
import {
  MapPin,
  Play,
  Trophy,
  Filter,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const NigeriaMapPage: React.FC = () => {
  const { submissions, setSelectedStateFilter, setActivePage, selectedGoal, setSelectedGoal } = useApp();

  const [activeStateCode, setActiveStateCode] = useState<string>('LA'); // Default to Lagos
  const [activeZone, setActiveZone] = useState<string>('all');

  const currentState = NIGERIAN_STATES.find((s) => s.code === activeStateCode) || NIGERIAN_STATES[24]; // Lagos

  // Calculate dynamic stats for states
  const stateGoals = submissions.filter((s) => s.state === currentState.name && s.status === 'approved');
  const allSubmissionsInState = submissions.filter((s) => s.state === currentState.name);

  const filteredStatesList = activeZone === 'all'
    ? NIGERIAN_STATES
    : NIGERIAN_STATES.filter((s) => s.geopoliticalZone === activeZone);

  const handleStateSelect = (state: NigerianState) => {
    setActiveStateCode(state.code);
  };

  const handleViewAllInExplore = (stateName: string) => {
    setSelectedStateFilter(stateName);
    setActivePage('explore');
  };

  return (
    <div className="min-h-screen bg-[#050807] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="max-w-3xl pb-6 border-b border-[#111A13]">
          <span className="text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold">
            NATIONWIDE GRASSROOTS RADAR
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-white mt-1">
            FROM EVERY STREET TO EVERY STATE. <br />
            <span className="text-[#39FF14] neon-glow">NIGERIA PLAYS HERE.</span>
          </h1>
          <p className="text-sm text-[#A7B2AA] mt-2 leading-relaxed">
            Explore genuine football strikes emerging from all 36 Nigerian states and the Federal Capital Territory.
            Click any territory on the map or select from the regional list to view local strikers.
          </p>
        </div>

        {/* Geopolitical Zone Quick Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0B110D] border border-[#16241a] rounded-xl overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveZone('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              activeZone === 'all'
                ? 'bg-[#39FF14] text-black font-bold'
                : 'text-[#A7B2AA] hover:text-white'
            }`}
          >
            All 6 Zones
          </button>
          {GEOPOLITICAL_ZONES.map((zone) => (
            <button
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeZone === zone
                  ? 'bg-[#39FF14] text-black font-bold'
                  : 'text-[#A7B2AA] hover:text-white'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Interactive Map & State Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map & Territory Matrix */}
          <div className="lg:col-span-7 bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#16241a]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#39FF14]" />
                <span className="text-sm font-bold font-display uppercase tracking-wider text-white">
                  Interactive Nigerian Territory Radar
                </span>
              </div>
              <span className="text-xs font-mono text-[#39FF14] bg-[#111A13] px-2.5 py-1 rounded">
                Selected: {currentState.name}
              </span>
            </div>

            {/* Geographically accurate Nigeria SVG canvas layout */}
            <div className="relative w-full aspect-[4/3] bg-[#050807] rounded-2xl border border-[#16241a] p-4 flex items-center justify-center overflow-hidden">
              {/* Pitch grid lines in map background */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#39FF14_1px,transparent_1px)] [background-size:16px_16px]" />

              <svg
                viewBox="0 0 100 100"
                className="w-full h-full max-h-[460px] filter drop-shadow-[0_0_15px_rgba(57,255,20,0.15)]"
              >
                {/* Nigeria Outer Boundary Silhouette */}
                <path
                  d="M18,30 L28,15 L46,12 L64,15 L78,20 L92,22 L93,35 L88,52 L78,65 L68,78 L60,86 L44,88 L35,82 L20,78 L12,72 L18,52 L15,40 Z"
                  fill="#0B110D"
                  stroke="#39FF14"
                  strokeWidth="0.8"
                  strokeDasharray="1.5 1"
                  className="opacity-40"
                />

                {/* State Centroid Points with Interactive Glow */}
                {NIGERIAN_STATES.map((state) => {
                  const isSelected = state.code === activeStateCode;
                  const goalsCount = submissions.filter((s) => s.state === state.name).length;

                  return (
                    <g
                      key={state.code}
                      onClick={() => handleStateSelect(state)}
                      className="cursor-pointer group"
                    >
                      {/* State Hover Pulsing Halo */}
                      <circle
                        cx={state.x}
                        cy={state.y}
                        r={isSelected ? 4.5 : 2.5}
                        fill={isSelected ? '#39FF14' : goalsCount > 0 ? '#00C853' : '#111A13'}
                        fillOpacity={isSelected ? 0.35 : 0.8}
                        stroke={isSelected ? '#39FF14' : '#2a3d2e'}
                        strokeWidth={isSelected ? 1.2 : 0.5}
                        className="transition-all duration-300 group-hover:scale-125"
                      />

                      {/* State Center Dot */}
                      <circle
                        cx={state.x}
                        cy={state.y}
                        r={isSelected ? 2 : 1.2}
                        fill={isSelected ? '#FFFFFF' : '#39FF14'}
                      />

                      {/* State Label */}
                      <text
                        x={state.x}
                        y={state.y - 2.8}
                        textAnchor="middle"
                        fontSize={isSelected ? '3.4' : '2.2'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        fill={isSelected ? '#FFFFFF' : '#A7B2AA'}
                        className="font-mono pointer-events-none select-none transition-all"
                      >
                        {state.name.length > 8 && !isSelected ? `${state.name.slice(0, 6)}..` : state.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend overlay */}
              <div className="absolute bottom-3 left-3 bg-[#0B110D]/90 border border-[#16241a] px-3 py-2 rounded-xl text-[10px] font-mono text-[#A7B2AA] space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#39FF14]" />
                  <span>Selected State</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00C853]" />
                  <span>Active Strikes Uploaded</span>
                </div>
              </div>
            </div>

            {/* Quick State Selector Buttons for Mobile & Fast Browsing */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#A7B2AA] block mb-2.5">
                Quick Select State ({filteredStatesList.length} States in View):
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1 bg-[#111A13] border border-[#16241a] rounded-xl">
                {filteredStatesList.map((state) => {
                  const isSelected = state.code === activeStateCode;
                  const count = submissions.filter((s) => s.state === state.name).length;
                  return (
                    <button
                      key={state.code}
                      onClick={() => handleStateSelect(state)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-colors flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#39FF14] text-black font-bold shadow-sm'
                          : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
                      }`}
                    >
                      <span>{state.name}</span>
                      {count > 0 && (
                        <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-black text-[#39FF14]' : 'bg-[#16241a] text-neutral-300'}`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: State Spotlight Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-7 space-y-6 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold">
                    STATE SPOTLIGHT
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase font-display text-white mt-1">
                    {currentState.name}
                  </h2>
                  <p className="text-xs text-[#A7B2AA] font-mono mt-0.5">
                    Capital: {currentState.capital} · {currentState.geopoliticalZone}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-[#A7B2AA] block">Approved Goals</span>
                  <span className="text-2xl font-mono font-bold text-[#39FF14] tabular-nums">
                    {stateGoals.length}
                  </span>
                </div>
              </div>

              {/* State Summary Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#111A13] border border-[#16241a] p-3 rounded-xl">
                  <span className="text-neutral-400 block text-[10px] uppercase">Total Submissions</span>
                  <span className="text-lg font-bold text-white tabular-nums mt-0.5 block">
                    {allSubmissionsInState.length}
                  </span>
                </div>
                <div className="bg-[#111A13] border border-[#16241a] p-3 rounded-xl">
                  <span className="text-neutral-400 block text-[10px] uppercase">Top Technical Score</span>
                  <span className="text-lg font-bold text-[#FFD700] tabular-nums mt-0.5 block">
                    {stateGoals[0]?.finalScore ? `${stateGoals[0].finalScore}/100` : '—'}
                  </span>
                </div>
              </div>

              {/* Featured Goal in this State */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A7B2AA] font-semibold mb-3">
                  Top Ranked Strike from {currentState.name}
                </h4>

                {stateGoals.length > 0 ? (
                  <div className="bg-[#111A13] border border-[#16241a] rounded-2xl overflow-hidden group hover:border-[#39FF14]/50 transition-colors">
                    <div
                      className="relative aspect-video bg-black cursor-pointer"
                      onClick={() => setSelectedGoal(stateGoals[0])}
                    >
                      <img
                        src={stateGoals[0].thumbnailUrl}
                        alt={stateGoals[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-[#39FF14] text-black flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-300 bg-black/80 px-2 py-0.5 rounded">
                        {stateGoals[0].timestampVerifiedTime}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h5
                        onClick={() => setSelectedGoal(stateGoals[0])}
                        className="text-sm font-bold uppercase font-display text-white hover:text-[#39FF14] cursor-pointer line-clamp-1"
                      >
                        {stateGoals[0].title}
                      </h5>
                      <div className="flex items-center justify-between text-xs text-[#A7B2AA]">
                        <span>By {stateGoals[0].playerName}</span>
                        <span className="text-[#39FF14] font-mono font-bold">
                          {stateGoals[0].finalScore}/100
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#111A13] border border-dashed border-[#16241a] rounded-2xl p-6 text-center space-y-2">
                    <Sparkles className="w-6 h-6 text-neutral-500 mx-auto" />
                    <p className="text-xs text-[#A7B2AA]">
                      No approved goals for {currentState.name} yet in the active week.
                    </p>
                    <button
                      onClick={() => setActivePage('submit')}
                      className="text-xs text-[#39FF14] font-semibold hover:underline"
                    >
                      Be the first striker to represent {currentState.name} →
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#16241a] flex flex-col gap-2.5">
                <button
                  onClick={() => handleViewAllInExplore(currentState.name)}
                  className="w-full py-3 bg-[#111A13] hover:bg-[#16241a] text-white text-xs font-semibold rounded-xl border border-[#39FF14]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Filter className="w-4 h-4 text-[#39FF14]" />
                  <span>View All {currentState.name} Strikes in Explore</span>
                </button>

                <button
                  onClick={() => setActivePage('submit')}
                  className="w-full py-3 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-bold text-sm uppercase rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit Goal for {currentState.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Detail Modal */}
      <GoalDetailModal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
    </div>
  );
};
