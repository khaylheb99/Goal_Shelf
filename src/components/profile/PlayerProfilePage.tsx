import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_STATES } from '../../data/nigeriaData';
import {
  User as UserIcon,
  Trophy,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
  Play,
  Settings,
  Trash2,
  ShieldAlert,
  Save,
  MapPin,
} from 'lucide-react';

export const PlayerProfilePage: React.FC = () => {
  const {
    currentUser,
    updateProfile,
    submissions,
    setSelectedGoal,
    setActivePage,
    requestAccountDeletion,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'shelf' | 'settings'>('shelf');
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Edit fields
  const [name, setName] = useState(currentUser?.name || '');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [state, setState] = useState(currentUser?.state || 'Lagos');
  const [city, setCity] = useState(currentUser?.city || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [preferredFoot, setPreferredFoot] = useState(currentUser?.preferredFoot || 'Right');
  const [position, setPosition] = useState(currentUser?.position || 'Striker');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#050807] flex items-center justify-center p-4">
        <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-8 max-w-md text-center space-y-4">
          <UserIcon className="w-12 h-12 text-[#39FF14] mx-auto" />
          <h2 className="text-2xl font-bold font-display uppercase text-white">Player Profile</h2>
          <p className="text-xs text-[#A7B2AA]">
            You are currently browsing as a guest. Please sign in or switch to a player account in the top bar.
          </p>
          <button
            onClick={() => setActivePage('home')}
            className="px-6 py-2.5 bg-[#39FF14] text-black font-display font-bold uppercase rounded-xl"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Filter player's submitted goals
  const myGoals = submissions.filter((s) => s.playerId === currentUser.id);
  const approvedGoals = myGoals.filter((s) => s.status === 'approved');
  const pendingGoals = myGoals.filter(
    (s) => s.status === 'pending_review' || s.status === 'timestamp_verification'
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      displayName,
      state,
      city,
      bio,
      preferredFoot,
      position,
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteAccount = () => {
    requestAccountDeletion();
  };

  return (
    <div className="min-h-screen bg-[#050807] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header Hero */}
        <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={currentUser.avatar || '/src/assets/images/striker_avatar_winner_1791991464659.jpg'}
                  alt={currentUser.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#39FF14]/50 shadow-lg"
                />
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#39FF14] text-black shadow">
                  {currentUser.role}
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold uppercase font-display text-white">
                  {currentUser.name}
                </h1>
                <p className="text-xs text-[#39FF14] font-mono">@{currentUser.displayName}</p>
                <div className="flex items-center gap-3 text-xs text-[#A7B2AA] pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    {currentUser.city || currentUser.state}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{currentUser.position || 'Striker'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentUser.preferredFoot || 'Right'} Foot</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 self-stretch sm:self-auto">
              <button
                onClick={() => setActivePage('submit')}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-bold text-sm uppercase rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <UploadCloud className="w-4 h-4 stroke-[2.5]" />
                <span>Submit New Goal</span>
              </button>
            </div>
          </div>

          {/* Player Stats Counter Strip */}
          <div className="mt-8 pt-6 border-t border-[#16241a] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-[#111A13] p-3.5 rounded-xl border border-[#16241a]">
              <span className="text-[#A7B2AA] block text-[10px] uppercase">Goals On Shelf</span>
              <span className="text-2xl font-bold text-white tabular-nums mt-0.5 block">
                {myGoals.length}
              </span>
            </div>

            <div className="bg-[#111A13] p-3.5 rounded-xl border border-[#16241a]">
              <span className="text-[#A7B2AA] block text-[10px] uppercase">Approved & Ranked</span>
              <span className="text-2xl font-bold text-[#39FF14] tabular-nums mt-0.5 block">
                {approvedGoals.length}
              </span>
            </div>

            <div className="bg-[#111A13] p-3.5 rounded-xl border border-[#16241a]">
              <span className="text-[#A7B2AA] block text-[10px] uppercase">Prizes Won</span>
              <span className="text-2xl font-bold text-[#FFD700] tabular-nums mt-0.5 block">
                ₦{currentUser.prizesWonNaira.toLocaleString()}
              </span>
            </div>

            <div className="bg-[#111A13] p-3.5 rounded-xl border border-[#16241a]">
              <span className="text-[#A7B2AA] block text-[10px] uppercase">Top National Rank</span>
              <span className="text-2xl font-bold text-white tabular-nums mt-0.5 block">
                #1 (Week 41)
              </span>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-3 border-b border-[#111A13] pb-2 text-sm font-display font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('shelf')}
            className={`pb-2 px-1 transition-colors ${
              activeTab === 'shelf'
                ? 'text-[#39FF14] border-b-2 border-[#39FF14]'
                : 'text-[#A7B2AA] hover:text-white'
            }`}
          >
            My Goal Shelf & Submissions ({myGoals.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-2 px-1 transition-colors ${
              activeTab === 'settings'
                ? 'text-[#39FF14] border-b-2 border-[#39FF14]'
                : 'text-[#A7B2AA] hover:text-white'
            }`}
          >
            Profile & Account Settings
          </button>
        </div>

        {/* Tab 1: My Goal Shelf */}
        {activeTab === 'shelf' && (
          <div className="space-y-6">
            {myGoals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="bg-[#0B110D] border border-[#16241a] rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#39FF14]/40 transition-colors"
                  >
                    <div>
                      {/* Media Header */}
                      <div
                        className="relative aspect-video bg-black cursor-pointer"
                        onClick={() => setSelectedGoal(goal)}
                      >
                        <img
                          src={goal.thumbnailUrl}
                          alt={goal.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-current" />
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold uppercase ${
                              goal.status === 'approved'
                                ? 'bg-[#00C853] text-black'
                                : goal.status === 'timestamp_verification'
                                ? 'bg-amber-500 text-black'
                                : goal.status === 'rejected'
                                ? 'bg-red-500 text-white'
                                : 'bg-neutral-700 text-white'
                            }`}
                          >
                            {goal.status.replace('_', ' ')}
                          </span>
                        </div>

                        {goal.finalScore && (
                          <div className="absolute bottom-3 right-3 bg-black/85 px-2.5 py-1 rounded text-xs font-mono font-bold text-[#39FF14]">
                            Score: {goal.finalScore}/100
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono text-[#A7B2AA]">
                          <span>ID: {goal.id}</span>
                          <span>Week {goal.competitionWeek}</span>
                        </div>

                        <h3
                          onClick={() => setSelectedGoal(goal)}
                          className="text-base font-bold font-display uppercase text-white hover:text-[#39FF14] cursor-pointer line-clamp-1"
                        >
                          {goal.title}
                        </h3>

                        <p className="text-xs text-[#A7B2AA] line-clamp-2 leading-relaxed">
                          {goal.description}
                        </p>

                        {/* Moderation Feedback Box */}
                        {goal.moderationNotes && (
                          <div className="bg-[#111A13] p-3 rounded-xl border border-[#16241a] text-xs space-y-1">
                            <span className="text-[10px] uppercase font-mono text-[#39FF14] font-bold block">
                              Moderation Review Feedback:
                            </span>
                            <p className="text-neutral-300 leading-relaxed">
                              {goal.moderationNotes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between border-t border-[#16241a] mt-4 pt-4 text-xs font-mono text-[#A7B2AA]">
                      <span>{goal.likesCount} community likes</span>
                      <button
                        onClick={() => setSelectedGoal(goal)}
                        className="text-[#39FF14] hover:underline font-semibold"
                      >
                        Inspect Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#0B110D] border border-dashed border-[#16241a] rounded-3xl p-12 text-center space-y-4">
                <UploadCloud className="w-12 h-12 text-neutral-500 mx-auto" />
                <h3 className="text-xl font-bold font-display uppercase text-white">Your Shelf is Empty</h3>
                <p className="text-xs text-[#A7B2AA] max-w-sm mx-auto">
                  You haven't submitted any goals yet. Record your best strike using a timestamp camera app and upload to compete for ₦500k.
                </p>
                <button
                  onClick={() => setActivePage('submit')}
                  className="px-6 py-3 bg-[#39FF14] text-black font-display font-bold uppercase rounded-xl hover:bg-[#32e012]"
                >
                  Submit First Goal
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile Settings */}
        {activeTab === 'settings' && (
          <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-8 space-y-8">
            {saveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                ✓ Profile details successfully updated and saved to local storage!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <h3 className="text-lg font-bold font-display uppercase text-white">
                Player Details & Public Bio
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-white focus:outline-none focus:border-[#39FF14]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">Public Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-white font-mono focus:outline-none focus:border-[#39FF14]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">State of Origin / Representation</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-white focus:outline-none focus:border-[#39FF14]"
                  >
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s.code} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">City / Pitch Area</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Surulere, Ajegunle, Garki"
                    className="w-full px-3.5 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-white focus:outline-none focus:border-[#39FF14]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">Playing Position</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-white focus:outline-none focus:border-[#39FF14]"
                  >
                    <option value="Striker">Striker</option>
                    <option value="Winger">Winger</option>
                    <option value="Midfielder">Attacking Midfielder</option>
                    <option value="Defender">Defender</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-neutral-300">Stronger Foot</label>
                  <select
                    value={preferredFoot}
                    onChange={(e) => setPreferredFoot(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-white focus:outline-none focus:border-[#39FF14]"
                  >
                    <option value="Right">Right Foot</option>
                    <option value="Left">Left Foot</option>
                    <option value="Both">Both / Ambidextrous</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="font-semibold text-neutral-300">Player Bio</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#111A13] border border-[#16241a] rounded-xl text-white focus:outline-none focus:border-[#39FF14]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#39FF14] text-black font-display font-bold uppercase rounded-xl hover:bg-[#32e012] flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>

            {/* Danger Zone: Request Account Deletion */}
            <div className="pt-8 border-t border-[#16241a] space-y-4">
              <div className="flex items-center gap-2 text-red-400 text-sm font-bold font-display uppercase">
                <ShieldAlert className="w-5 h-5" />
                <span>Account Privacy & Deletion</span>
              </div>
              <p className="text-xs text-[#A7B2AA] max-w-xl leading-relaxed">
                Under our Privacy Policy and data protection standards, you have the right to request full account and footage deletion. This permanently removes your submissions, scores, and profile.
              </p>

              {!deleteConfirmOpen ? (
                <button
                  onClick={() => setDeleteConfirmOpen(true)}
                  className="px-4 py-2 bg-red-950/60 hover:bg-red-900/80 text-red-400 text-xs font-semibold rounded-xl border border-red-800 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Request Account Deletion</span>
                </button>
              ) : (
                <div className="p-4 bg-red-950/80 border border-red-500 rounded-xl space-y-3">
                  <p className="text-xs text-white font-medium">
                    Are you sure? This will permanently delete your player profile and all submitted videos.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                    >
                      Yes, Delete My Account
                    </button>
                    <button
                      onClick={() => setDeleteConfirmOpen(false)}
                      className="px-4 py-1.5 bg-[#111A13] text-neutral-300 text-xs rounded-lg hover:bg-[#16241a]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
