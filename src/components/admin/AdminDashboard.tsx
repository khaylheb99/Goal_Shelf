import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Trophy,
  Sliders,
  DollarSign,
  Calendar,
  Layers,
  FileCheck,
  Eye,
  Plus,
  RefreshCw,
  Clock,
  UserCheck,
} from 'lucide-react';
import { CompetitionStatus, GoalSubmission, PayoutStatus } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    submissions,
    competitions,
    activeCompetition,
    payouts,
    users,
    approveSubmission,
    rejectSubmission,
    requestAdditionalVerification,
    toggleFeatured,
    scoreSubmission,
    updateCompetitionStatus,
    updatePayoutStatus,
    createCompetition,
  } = useApp();

  const [activeModule, setActiveModule] = useState<'moderation' | 'judging' | 'competitions' | 'payouts' | 'analytics'>('moderation');

  // Moderation state
  const [selectedSubForReview, setSelectedSubForReview] = useState<GoalSubmission | null>(
    submissions.find((s) => s.status === 'timestamp_verification' || s.status === 'pending_review') || submissions[0]
  );
  const [rejectionReason, setRejectionReason] = useState('Blurry or unreadable timestamp');
  const [moderatorNotes, setModeratorNotes] = useState('');

  // Judging state
  const [subForScoring, setSubForScoring] = useState<GoalSubmission | null>(
    submissions.find((s) => s.status === 'approved') || submissions[0]
  );
  const [technique, setTechnique] = useState(27);
  const [difficulty, setDifficulty] = useState(23);
  const [accuracy, setAccuracy] = useState(18);
  const [creativity, setCreativity] = useState(13);
  const [impact, setImpact] = useState(9);
  const [judgeNotes, setJudgeNotes] = useState('Spectacular trajectory and pristine connection on the volley.');
  const [scoreSuccessMsg, setScoreSuccessMsg] = useState(false);

  // New Competition modal
  const [newWeekNum, setNewWeekNum] = useState(43);
  const [newCompTitle, setNewCompTitle] = useState('National Grassroots Cup — Week 43');
  const [createCompOpen, setCreateCompOpen] = useState(false);

  // Calculated Real Analytics
  const totalSubmissions = submissions.length;
  const approvedCount = submissions.filter((s) => s.status === 'approved').length;
  const pendingCount = submissions.filter(
    (s) => s.status === 'pending_review' || s.status === 'timestamp_verification'
  ).length;
  const rejectedCount = submissions.filter((s) => s.status === 'rejected').length;
  const uniqueStates = new Set(submissions.map((s) => s.state)).size;
  const totalPrizesDisbursed = payouts.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.prizeAmount, 0);

  const handleApprove = (sub: GoalSubmission) => {
    approveSubmission(sub.id, moderatorNotes || 'Timestamp verified: continuous unedited camera recording.');
    setModeratorNotes('');
  };

  const handleReject = (sub: GoalSubmission) => {
    rejectSubmission(sub.id, rejectionReason, moderatorNotes || rejectionReason);
    setModeratorNotes('');
  };

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subForScoring) return;

    const total = technique + difficulty + accuracy + creativity + impact;
    scoreSubmission(subForScoring.id, {
      judgeId: currentUser?.id || 'usr-judge-chief',
      judgeName: currentUser?.name || 'Daniel Amokachi Jr.',
      technique,
      difficulty,
      accuracy,
      creativity,
      impact,
      total,
      notes: judgeNotes,
    });

    setScoreSuccessMsg(true);
    setTimeout(() => setScoreSuccessMsg(false), 2500);
  };

  const handleCreateComp = (e: React.FormEvent) => {
    e.preventDefault();
    createCompetition({
      weekNumber: newWeekNum,
      title: newCompTitle,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 86400000).toISOString(),
      submissionDeadline: new Date(Date.now() + 6 * 86400000).toISOString(),
      recordingWindowStart: new Date(Date.now() - 14 * 86400000).toISOString(),
      recordingWindowEnd: new Date(Date.now() + 6 * 86400000).toISOString(),
      prizePool: 500000,
      prizes: {
        first: 250000,
        second: 150000,
        third: 100000,
      },
      status: 'active',
      isFundedConfirmed: true,
      rulesPublished: true,
    });
    setCreateCompOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050807] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Dashboard Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#111A13]">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" />
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                GOALSHELF SECURE CONTROL CENTER
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold uppercase font-display text-white mt-1">
              ADMINISTRATION & INTEGRITY DASHBOARD
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A7B2AA] bg-[#0B110D] px-3.5 py-2 rounded-xl border border-[#16241a]">
            <span>Active Admin:</span>
            <span className="text-white font-bold">{currentUser?.name}</span>
            <span className="text-emerald-400">(All Privileges)</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#111A13] text-xs font-display uppercase tracking-wider font-bold">
          <button
            onClick={() => setActiveModule('moderation')}
            className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeModule === 'moderation'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timestamp Moderation ({pendingCount})</span>
          </button>

          <button
            onClick={() => setActiveModule('judging')}
            className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeModule === 'judging'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>100-Point Judging Suite</span>
          </button>

          <button
            onClick={() => setActiveModule('competitions')}
            className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeModule === 'competitions'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Competition Cycles</span>
          </button>

          <button
            onClick={() => setActiveModule('payouts')}
            className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeModule === 'payouts'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>₦500k Payout Ledger</span>
          </button>

          <button
            onClick={() => setActiveModule('analytics')}
            className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeModule === 'analytics'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Live Metrics</span>
          </button>
        </div>

        {/* MODULE 1: TIMESTAMP & SUBMISSION MODERATION */}
        {activeModule === 'moderation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Queue List */}
            <div className="lg:col-span-5 bg-[#0B110D] border border-[#16241a] rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#16241a]">
                <h3 className="text-sm font-bold uppercase font-display text-white">
                  Submissions Queue ({submissions.length})
                </h3>
                <span className="text-xs text-amber-400 font-mono">
                  {pendingCount} Awaiting Review
                </span>
              </div>

              <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
                {submissions.map((sub) => {
                  const isSelected = selectedSubForReview?.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubForReview(sub)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#111A13] border-[#39FF14] shadow-md'
                          : 'bg-[#050807] border-[#16241a] hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 font-mono">
                        <span className="text-[#A7B2AA]">{sub.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            sub.status === 'approved'
                              ? 'bg-emerald-950 text-emerald-400'
                              : sub.status === 'timestamp_verification'
                              ? 'bg-amber-950 text-amber-400'
                              : sub.status === 'rejected'
                              ? 'bg-red-950 text-red-400'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          {sub.status.replace('_', ' ')}
                        </span>
                      </div>

                      <h4 className="font-bold text-white line-clamp-1">{sub.title}</h4>
                      <div className="flex items-center gap-2 text-neutral-400 mt-1">
                        <span>{sub.playerName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{sub.state}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Review & Actions */}
            {selectedSubForReview ? (
              <div className="lg:col-span-7 bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 space-y-6">
                <div className="flex items-start justify-between pb-4 border-b border-[#16241a]">
                  <div>
                    <span className="text-xs text-[#39FF14] font-mono">
                      Inspecting: {selectedSubForReview.id} · Week {selectedSubForReview.competitionWeek}
                    </span>
                    <h2 className="text-xl font-bold font-display uppercase text-white mt-0.5">
                      {selectedSubForReview.title}
                    </h2>
                    <p className="text-xs text-[#A7B2AA]">
                      Submitted by {selectedSubForReview.playerName} ({selectedSubForReview.city}, {selectedSubForReview.state})
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-[#111A13] text-[#39FF14] border border-[#39FF14]/30">
                    {selectedSubForReview.status}
                  </span>
                </div>

                {/* Video Playback & Timestamp Inspector */}
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-[#16241a]">
                  <video
                    src={selectedSubForReview.videoUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#39FF14]/50 text-xs font-mono text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Reported Timestamp: {selectedSubForReview.timestampVerifiedTime}</span>
                  </div>
                </div>

                {/* Submission Description */}
                <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a] text-xs space-y-1">
                  <span className="text-[#A7B2AA] uppercase font-mono block">Player Description:</span>
                  <p className="text-white leading-relaxed">{selectedSubForReview.description}</p>
                </div>

                {/* Action Form */}
                <div className="bg-[#111A13] p-5 rounded-xl border border-[#16241a] space-y-4">
                  <h4 className="text-xs font-mono uppercase text-[#39FF14] font-bold">
                    Integrity Moderation Action
                  </h4>

                  <div className="space-y-1.5 text-xs">
                    <label className="text-neutral-300 font-semibold">Moderator Feedback / Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Timestamp verified. Clean strike in daylight match."
                      value={moderatorNotes}
                      onChange={(e) => setModeratorNotes(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#050807] border border-[#16241a] rounded-lg text-white text-xs focus:outline-none focus:border-[#39FF14]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleApprove(selectedSubForReview)}
                      className="px-5 py-2.5 bg-[#00C853] hover:bg-[#00b047] text-black font-display font-bold uppercase rounded-lg text-sm flex items-center gap-1.5 shadow"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve & Make Eligible</span>
                    </button>

                    <button
                      onClick={() => handleReject(selectedSubForReview)}
                      className="px-4 py-2.5 bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-700 font-display font-bold uppercase rounded-lg text-sm flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject Submission</span>
                    </button>

                    <button
                      onClick={() =>
                        requestAdditionalVerification(
                          selectedSubForReview.id,
                          'Additional wide-angle proof or uncropped timestamp requested by panel.'
                        )
                      }
                      className="px-4 py-2.5 bg-[#16241a] hover:bg-[#1f3325] text-amber-300 font-display font-bold uppercase rounded-lg text-sm flex items-center gap-1.5"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Request Re-verification</span>
                    </button>

                    <button
                      onClick={() => toggleFeatured(selectedSubForReview.id)}
                      className="px-4 py-2.5 bg-[#16241a] hover:bg-[#1f3325] text-white font-mono text-xs rounded-lg border border-[#16241a] ml-auto"
                    >
                      {selectedSubForReview.isFeatured ? '★ Unfeature' : '☆ Mark Featured'}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* MODULE 2: 100-POINT JUDGING SUITE */}
        {activeModule === 'judging' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Goal Selector for Scoring */}
            <div className="lg:col-span-5 bg-[#0B110D] border border-[#16241a] rounded-3xl p-5 space-y-4">
              <h3 className="text-sm font-bold uppercase font-display text-white pb-3 border-b border-[#16241a]">
                Approved Goals for Technical Scoring
              </h3>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {submissions
                  .filter((s) => s.status === 'approved')
                  .map((sub) => {
                    const isSelected = subForScoring?.id === sub.id;
                    return (
                      <div
                        key={sub.id}
                        onClick={() => {
                          setSubForScoring(sub);
                          const sc = sub.scores[0];
                          if (sc) {
                            setTechnique(sc.technique);
                            setDifficulty(sc.difficulty);
                            setAccuracy(sc.accuracy);
                            setCreativity(sc.creativity);
                            setImpact(sc.impact);
                            setJudgeNotes(sc.notes);
                          }
                        }}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#111A13] border-[#39FF14]'
                            : 'bg-[#050807] border-[#16241a] hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex justify-between font-mono mb-1">
                          <span className="text-[#39FF14]">{sub.id}</span>
                          <span className="font-bold text-white">
                            {sub.finalScore ? `${sub.finalScore}/100` : 'Not Scored'}
                          </span>
                        </div>
                        <p className="font-bold text-white line-clamp-1">{sub.title}</p>
                        <span className="text-[11px] text-[#A7B2AA]">{sub.playerName} · {sub.state}</span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Judging Scoring Form */}
            {subForScoring && (
              <form
                onSubmit={handleScoreSubmit}
                className="lg:col-span-7 bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-8 space-y-6"
              >
                <div className="flex justify-between items-start pb-4 border-b border-[#16241a]">
                  <div>
                    <span className="text-xs text-[#39FF14] font-mono">
                      Official Technical Scorecard · {subForScoring.id}
                    </span>
                    <h3 className="text-xl font-bold font-display uppercase text-white mt-0.5">
                      {subForScoring.title}
                    </h3>
                    <p className="text-xs text-[#A7B2AA]">Striker: {subForScoring.playerName}</p>
                  </div>

                  <div className="px-4 py-2 bg-[#111A13] border border-[#39FF14]/40 rounded-xl text-center">
                    <span className="text-[10px] text-[#A7B2AA] block uppercase font-mono">Calculated Total</span>
                    <span className="text-3xl font-extrabold text-[#39FF14] font-mono tabular-nums">
                      {technique + difficulty + accuracy + creativity + impact}
                      <span className="text-xs text-neutral-400 font-normal">/100</span>
                    </span>
                  </div>
                </div>

                {scoreSuccessMsg && (
                  <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-mono">
                    ✓ Score successfully submitted and leaderboard rankings recalculated!
                  </div>
                )}

                {/* 5 Scoring Sliders */}
                <div className="space-y-4 text-xs font-mono">
                  {/* Technique */}
                  <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a] space-y-2">
                    <div className="flex justify-between text-neutral-200">
                      <span>1. Technique & Clean Execution (Max 30 pts)</span>
                      <span className="text-[#39FF14] font-bold text-sm">{technique} / 30</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={30}
                      value={technique}
                      onChange={(e) => setTechnique(Number(e.target.value))}
                      className="w-full accent-[#39FF14]"
                    />
                  </div>

                  {/* Difficulty */}
                  <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a] space-y-2">
                    <div className="flex justify-between text-neutral-200">
                      <span>2. Difficulty & Distance from Goal (Max 25 pts)</span>
                      <span className="text-[#39FF14] font-bold text-sm">{difficulty} / 25</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={difficulty}
                      onChange={(e) => setDifficulty(Number(e.target.value))}
                      className="w-full accent-[#39FF14]"
                    />
                  </div>

                  {/* Accuracy */}
                  <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a] space-y-2">
                    <div className="flex justify-between text-neutral-200">
                      <span>3. Accuracy & Woodwork Placement (Max 20 pts)</span>
                      <span className="text-[#39FF14] font-bold text-sm">{accuracy} / 20</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      value={accuracy}
                      onChange={(e) => setAccuracy(Number(e.target.value))}
                      className="w-full accent-[#39FF14]"
                    />
                  </div>

                  {/* Creativity */}
                  <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a] space-y-2">
                    <div className="flex justify-between text-neutral-200">
                      <span>4. Creativity & Flair (Max 15 pts)</span>
                      <span className="text-[#39FF14] font-bold text-sm">{creativity} / 15</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      value={creativity}
                      onChange={(e) => setCreativity(Number(e.target.value))}
                      className="w-full accent-[#39FF14]"
                    />
                  </div>

                  {/* Visual Impact */}
                  <div className="bg-[#111A13] p-4 rounded-xl border border-[#16241a] space-y-2">
                    <div className="flex justify-between text-neutral-200">
                      <span>5. Overall Visual & Dramatic Impact (Max 10 pts)</span>
                      <span className="text-[#39FF14] font-bold text-sm">{impact} / 10</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={impact}
                      onChange={(e) => setImpact(Number(e.target.value))}
                      className="w-full accent-[#39FF14]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-neutral-300 font-semibold">Judge Evaluation Notes</label>
                  <textarea
                    rows={2}
                    value={judgeNotes}
                    onChange={(e) => setJudgeNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-[#111A13] border border-[#16241a] rounded-xl text-white text-xs focus:outline-none focus:border-[#39FF14]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-extrabold uppercase rounded-xl text-base shadow-md transition-transform active:scale-95"
                >
                  Confirm & Commit Official Score
                </button>
              </form>
            )}
          </div>
        )}

        {/* MODULE 3: COMPETITION MANAGEMENT */}
        {activeModule === 'competitions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display uppercase text-white">
                Weekly Competition Cycles
              </h3>
              <button
                onClick={() => setCreateCompOpen(!createCompOpen)}
                className="px-4 py-2 bg-[#39FF14] text-black font-display font-bold text-xs uppercase rounded-xl hover:bg-[#32e012] flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Week</span>
              </button>
            </div>

            {/* Create Comp Dialog */}
            {createCompOpen && (
              <form onSubmit={handleCreateComp} className="bg-[#0B110D] border border-[#39FF14]/40 rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-bold font-display uppercase text-white">Create New Weekly Cycle</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-neutral-300 block mb-1">Week Number</label>
                    <input
                      type="number"
                      value={newWeekNum}
                      onChange={(e) => setNewWeekNum(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#111A13] border border-[#16241a] rounded-lg text-white"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-neutral-300 block mb-1">Competition Title</label>
                    <input
                      type="text"
                      value={newCompTitle}
                      onChange={(e) => setNewCompTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#111A13] border border-[#16241a] rounded-lg text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCreateCompOpen(false)}
                    className="px-4 py-2 bg-[#111A13] text-neutral-400 rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#39FF14] text-black font-display font-bold uppercase rounded-lg text-xs"
                  >
                    Publish Week {newWeekNum}
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competitions.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-[#0B110D] border border-[#16241a] rounded-2xl p-6 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono text-[#39FF14] font-bold">
                        WEEK {comp.weekNumber}
                      </span>
                      <h4 className="text-lg font-bold font-display uppercase text-white mt-0.5">
                        {comp.title}
                      </h4>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold uppercase ${
                        comp.status === 'active'
                          ? 'bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/40'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      {comp.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-300 bg-[#111A13] p-3 rounded-xl">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Prize Pool:</span>
                      <span className="font-bold text-[#FFD700]">₦{comp.prizePool.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">Funding Verified:</span>
                      <span className="font-bold text-[#39FF14]">Yes (Escrow)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 text-xs">
                    <button
                      onClick={() => updateCompetitionStatus(comp.id, 'active')}
                      className="px-3 py-1.5 bg-[#16241a] hover:bg-[#1f3325] text-white rounded-lg"
                    >
                      Set Active
                    </button>
                    <button
                      onClick={() => updateCompetitionStatus(comp.id, 'judging')}
                      className="px-3 py-1.5 bg-[#16241a] hover:bg-[#1f3325] text-amber-300 rounded-lg"
                    >
                      Set In Judging
                    </button>
                    <button
                      onClick={() => updateCompetitionStatus(comp.id, 'finalized')}
                      className="px-3 py-1.5 bg-[#16241a] hover:bg-[#1f3325] text-neutral-300 rounded-lg"
                    >
                      Finalize & Lock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 4: PAYOUT LEDGER */}
        {activeModule === 'payouts' && (
          <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#16241a]">
              <div>
                <h3 className="text-lg font-bold font-display uppercase text-white">
                  Prize Payout Management (₦500k Pool)
                </h3>
                <p className="text-xs text-[#A7B2AA]">
                  Confirm winner eligibility, generate payment reference codes, and update bank transfer statuses.
                </p>
              </div>
              <span className="text-xs font-mono text-[#39FF14] bg-[#111A13] px-3 py-1 rounded">
                Admin Escrow Confirmed
              </span>
            </div>

            <div className="space-y-4">
              {payouts.map((payout) => (
                <div
                  key={payout.id}
                  className="bg-[#111A13] border border-[#16241a] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-[#FFD700]">
                        Week {payout.weekNumber} · {payout.position === 1 ? '🥇 1st' : payout.position === 2 ? '🥈 2nd' : '🥉 3rd'} Place
                      </span>
                      <span className="text-neutral-500">|</span>
                      <span className="text-white font-bold">₦{payout.prizeAmount.toLocaleString()}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{payout.winnerName} (@{payout.winnerDisplayName})</h4>
                    <p className="text-xs text-[#A7B2AA]">{payout.goalTitle} · {payout.winnerState}</p>
                    <p className="text-[11px] font-mono text-neutral-400">
                      Bank Ref: {payout.paymentRef || 'Unassigned'} · {payout.bankDetailsMasked || 'Pending'}
                    </p>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-2">
                    <select
                      value={payout.status}
                      onChange={(e) => updatePayoutStatus(payout.id, e.target.value as PayoutStatus)}
                      className="px-3 py-2 bg-[#050807] border border-[#16241a] rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#39FF14]"
                    >
                      <option value="pending_verification">Pending Verification</option>
                      <option value="approved">Approved</option>
                      <option value="processing">Processing</option>
                      <option value="paid">Paid & Confirmed</option>
                      <option value="on_hold">On Hold</option>
                    </select>

                    {payout.status !== 'paid' && (
                      <button
                        onClick={() =>
                          updatePayoutStatus(
                            payout.id,
                            'paid',
                            `NG-PAY-W${payout.weekNumber}-0${payout.position}-AUTO-${Math.floor(10000 + Math.random() * 90000)}`
                          )
                        }
                        className="px-3 py-2 bg-[#39FF14] text-black font-display font-bold text-xs uppercase rounded-xl hover:bg-[#32e012]"
                      >
                        Confirm Payout
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 5: ANALYTICS */}
        {activeModule === 'analytics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-display uppercase text-white">
              Database-Backed Performance Metrics
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
              <div className="bg-[#0B110D] border border-[#16241a] p-5 rounded-2xl">
                <span className="text-[#A7B2AA] text-xs uppercase block">Total Submissions</span>
                <span className="text-3xl font-bold text-white mt-1 block tabular-nums">{totalSubmissions}</span>
              </div>
              <div className="bg-[#0B110D] border border-[#16241a] p-5 rounded-2xl">
                <span className="text-[#A7B2AA] text-xs uppercase block">Approved Goals</span>
                <span className="text-3xl font-bold text-[#39FF14] mt-1 block tabular-nums">{approvedCount}</span>
              </div>
              <div className="bg-[#0B110D] border border-[#16241a] p-5 rounded-2xl">
                <span className="text-[#A7B2AA] text-xs uppercase block">Active States</span>
                <span className="text-3xl font-bold text-white mt-1 block tabular-nums">{uniqueStates} / 37</span>
              </div>
              <div className="bg-[#0B110D] border border-[#16241a] p-5 rounded-2xl">
                <span className="text-[#A7B2AA] text-xs uppercase block">Prizes Confirmed</span>
                <span className="text-3xl font-bold text-[#FFD700] mt-1 block tabular-nums">
                  ₦{totalPrizesDisbursed.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
