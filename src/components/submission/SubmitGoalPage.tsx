import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { NIGERIAN_STATES, GOAL_CATEGORIES } from '../../data/nigeriaData';
import { GoalCategory } from '../../types';
import confetti from 'canvas-confetti';
import {
  UploadCloud,
  Camera,
  AlertTriangle,
  CheckCircle,
  FileVideo,
  Play,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  X,
} from 'lucide-react';

export const SubmitGoalPage: React.FC = () => {
  const { currentUser, submitGoal, activeCompetition, setActivePage } = useApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [state, setState] = useState(currentUser?.state || 'Lagos');
  const [city, setCity] = useState(currentUser?.city || '');
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [dateRecorded, setDateRecorded] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState<GoalCategory>('long_range');
  const [ownershipAccepted, setOwnershipAccepted] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);

  // Video State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [timestampNoticeSeen, setTimestampNoticeSeen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Success State
  const [submissionSuccessId, setSubmissionSuccessId] = useState<string | null>(null);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation: MP4 / MOV
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-m4v'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|webm)$/i)) {
      setErrorMessage('Please upload a valid MP4 or MOV video file.');
      return;
    }

    // Validation: Max 100MB
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('Video file exceeds maximum limit of 100MB. Please trim or compress.');
      return;
    }

    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|mov)$/i)) {
      setErrorMessage('Please drop an MP4 or MOV video.');
      return;
    }

    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !displayName.trim()) {
      setErrorMessage('Please enter your full name and public display name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address for competition notification.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Phone number is required for prize verification.');
      return;
    }

    if (!goalTitle.trim()) {
      setErrorMessage('Please provide a descriptive goal title.');
      return;
    }

    if (!videoFile && !videoPreviewUrl) {
      setErrorMessage('Please select and upload your goal video footage.');
      return;
    }

    if (!ownershipAccepted || !rulesAccepted) {
      setErrorMessage('You must confirm ownership of the footage and agree to competition rules.');
      return;
    }

    // Begin Simulated Upload Progress
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 20;
      });
    }, 250);

    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1400));
      clearInterval(interval);
      setUploadProgress(100);

      const timestampTime = `${dateRecorded} 17:30 WAT (${city || state})`;
      const id = await submitGoal({
        fullName,
        displayName,
        email,
        phone,
        state,
        city: city || state,
        title: goalTitle,
        description: goalDescription || 'Genuine recorded goal strike submitted to GoalShelf.',
        dateRecorded,
        category,
        videoBlobUrl: videoPreviewUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        thumbnailUrl: '/src/assets/images/hero_stadium_strike_1791991464710.jpg',
        timestampTime,
      });

      setIsUploading(false);
      setSubmissionSuccessId(id);

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#39FF14', '#FFD700', '#00C853', '#FFFFFF'],
      });
    } catch (err) {
      clearInterval(interval);
      setIsUploading(false);
      setErrorMessage('Failed to submit goal. Please try again.');
    }
  };

  const handleReset = () => {
    setSubmissionSuccessId(null);
    setGoalTitle('');
    setGoalDescription('');
    setVideoFile(null);
    setVideoPreviewUrl('');
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#050807] py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background radial football pitch lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#39FF14]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb / Top Info */}
        <div className="flex items-center justify-between pb-6 border-b border-[#111A13] mb-8">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold">
              OFFICIAL SUBMISSION PORTAL
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-white mt-1">
              SUBMIT YOUR <span className="text-[#39FF14]">GOAL TO THE SHELF</span>
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-[11px] font-mono text-[#A7B2AA] uppercase block">Active Competition</span>
            <span className="text-sm font-bold text-[#FFD700] font-mono">Week {activeCompetition.weekNumber} · ₦500k Pool</span>
          </div>
        </div>

        {/* Success Modal / Screen */}
        {submissionSuccessId ? (
          <div className="bg-[#0B110D] border-2 border-[#39FF14] rounded-3xl p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(57,255,20,0.2)]">
            <div className="w-20 h-20 rounded-full bg-[#39FF14]/20 border border-[#39FF14] mx-auto flex items-center justify-center text-[#39FF14] mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#39FF14] font-semibold">
              SUBMISSION RECEIVED & QUEUED
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase text-white mt-2">
              YOUR GOAL IS ON ITS WAY TO THE SHELF!
            </h2>

            <div className="my-6 max-w-md mx-auto bg-[#111A13] border border-[#16241a] rounded-2xl p-5 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-[#16241a]">
                <span className="text-xs text-[#A7B2AA] uppercase font-mono">Unique Tracking ID</span>
                <span className="text-sm font-bold text-[#39FF14] font-mono select-all">
                  {submissionSuccessId}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 text-xs">
                <span className="text-[#A7B2AA]">Initial Status</span>
                <span className="text-amber-400 font-semibold font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Timestamp Verification
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#16241a] text-xs">
                <span className="text-[#A7B2AA]">Competition Week</span>
                <span className="text-white font-mono">Week {activeCompetition.weekNumber} (Active)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A7B2AA] max-w-lg mx-auto leading-relaxed mb-8">
              Our human moderation panel will inspect the visible timestamp on your footage and confirm compliance.
              Once approved, your strike will immediately enter the active leaderboard where certified judges will score it out of 100 points!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setActivePage('profile')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-bold text-base uppercase rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Track in My Player Profile
              </button>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#111A13] hover:bg-[#16241a] text-white font-display font-bold text-base uppercase rounded-xl border border-[#16241a] transition-colors"
              >
                Submit Another Goal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-sm flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* MANDATORY TIMESTAMP NOTICE CARD (Prominent before upload) */}
            <div className="bg-gradient-to-r from-[#111A13] via-[#0B110D] to-[#111A13] border-2 border-[#FFD700]/70 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FFD700]/20 border border-[#FFD700] flex items-center justify-center text-[#FFD700] shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[#FFD700] text-black">
                      MANDATORY REQUIREMENT
                    </span>
                    <span className="text-xs text-[#A7B2AA]">Integrity Standard</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display uppercase tracking-wide text-white">
                    “IMPORTANT: Your goal video MUST show a visible recording date and time.
                    Videos without a readable timestamp may be rejected.”
                  </h3>
                  <p className="text-xs text-[#A7B2AA] leading-relaxed">
                    Use a camera app that embeds the live date, time, and optional location in your video frame
                    (e.g. <em>Timestamp Camera Free</em> or <em>Open Camera</em>). If you recorded with your standard phone camera,
                    ensure the metadata or recording timestamp is intact and legible.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1: Video Upload Area */}
            <div className="bg-[#0B110D] border border-[#16241a] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-display uppercase tracking-wide text-white flex items-center gap-2">
                  <FileVideo className="w-5 h-5 text-[#39FF14]" />
                  1. Video Footage Upload
                </h3>
                <span className="text-xs font-mono text-[#A7B2AA]">MP4 or MOV · Max 100MB</span>
              </div>

              {/* Drag & Drop Area */}
              {!videoPreviewUrl ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#16241a] hover:border-[#39FF14]/60 rounded-2xl p-10 text-center cursor-pointer transition-colors bg-[#111A13]/50 group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm"
                    onChange={handleVideoSelect}
                    className="hidden"
                  />
                  <div className="w-16 h-16 rounded-2xl bg-[#0B110D] border border-[#39FF14]/30 mx-auto flex items-center justify-center text-[#39FF14] group-hover:scale-110 transition-transform mb-4">
                    <UploadCloud className="w-8 h-8 stroke-[2]" />
                  </div>
                  <p className="text-base font-semibold text-white">
                    Drag and drop your goal video here, or <span className="text-[#39FF14] underline">browse files</span>
                  </p>
                  <p className="text-xs text-[#A7B2AA] mt-2">
                    Supports high-definition clips up to 60 seconds. Must show the strike clearly.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Video Player Preview */}
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-[#16241a]">
                    <video
                      src={videoPreviewUrl}
                      controls
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setVideoFile(null);
                        setVideoPreviewUrl('');
                      }}
                      className="absolute top-3 right-3 p-2 bg-black/80 hover:bg-black text-white rounded-lg border border-neutral-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#A7B2AA] bg-[#111A13] p-3 rounded-xl">
                    <span className="font-mono truncate max-w-xs">{videoFile?.name || 'Selected Footage'}</span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#39FF14] hover:underline font-semibold"
                    >
                      Change Video
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Goal Details */}
            <div className="bg-[#0B110D] border border-[#16241a] rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold font-display uppercase tracking-wide text-white">
                2. Goal Details & Classification
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Goal Title *</label>
                  <input
                    type="text"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    placeholder="e.g. 35-Yard Half-Volley Dipping Under Crossbar @ Ajegunle Arena"
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14] text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Goal Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GoalCategory)}
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white focus:outline-none focus:border-[#39FF14] text-sm"
                  >
                    {GOAL_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Date Recorded (Must match video timestamp) *</label>
                  <input
                    type="date"
                    value={dateRecorded}
                    onChange={(e) => setDateRecorded(e.target.value)}
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white focus:outline-none focus:border-[#39FF14] text-sm font-mono"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Goal Description</label>
                  <textarea
                    rows={3}
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    placeholder="Describe how the strike was set up, distance from goal, curvature, opponent, match context..."
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14] text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Striker Location & Identity */}
            <div className="bg-[#0B110D] border border-[#16241a] rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold font-display uppercase tracking-wide text-white">
                3. Striker Profile & State Representation
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Full Legal Name * (For bank payout)</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Chukwuebuka Eze"
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14] text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Public Display Name * (Appears on Leaderboard)</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ebuka_Skiller"
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14] text-sm font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ebuka@example.com"
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14] text-sm"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Phone Number * (Prize verification only)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 123 4567"
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14] text-sm font-mono"
                    required
                  />
                  <span className="text-[10px] text-neutral-500 block">Never published publicly.</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Nigerian State or FCT *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white focus:outline-none focus:border-[#39FF14] text-sm"
                  >
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s.code} value={s.name}>
                        {s.name} ({s.geopoliticalZone})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">City or Local Area *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Surulere, Ajegunle, Sabon Gari"
                    className="w-full px-4 py-3 bg-[#111A13] border border-[#16241a] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#39FF14] text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Verification & Ownership Checkboxes */}
            <div className="bg-[#0B110D] border border-[#16241a] rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-bold font-display uppercase tracking-wide text-white">
                4. Declarations & Consent
              </h3>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ownershipAccepted}
                    onChange={(e) => setOwnershipAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded bg-[#111A13] border-neutral-600 text-[#39FF14] focus:ring-[#39FF14]"
                    required
                  />
                  <span className="text-xs text-[#A7B2AA] leading-relaxed">
                    I declare that I own this video footage or have obtained explicit permission from the player and recorder to submit it to GOALSHELF. The goal was scored in a genuine match or practice session and is not altered.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rulesAccepted}
                    onChange={(e) => setRulesAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded bg-[#111A13] border-neutral-600 text-[#39FF14] focus:ring-[#39FF14]"
                    required
                  />
                  <span className="text-xs text-[#A7B2AA] leading-relaxed">
                    I accept the GOALSHELF Competition Rules, 100-Point Judging Matrix, and Privacy Policy. I understand that videos without a verifiable timestamp will be rejected by moderation.
                  </span>
                </label>
              </div>
            </div>

            {/* Upload Progress Bar if submitting */}
            {isUploading && (
              <div className="bg-[#111A13] border border-[#39FF14]/40 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-semibold">Uploading video footage to secure storage...</span>
                  <span className="text-[#39FF14] font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full h-3 bg-[#050807] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#39FF14] transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="text-[11px] text-neutral-400 block">
                  Generating SHA-256 video hash to prevent duplicate submissions...
                </span>
              </div>
            )}

            {/* Submit Action Button */}
            <div>
              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-4 bg-[#39FF14] hover:bg-[#32e012] disabled:opacity-50 text-black font-display font-extrabold text-xl uppercase tracking-wider rounded-2xl transition-transform active:scale-95 shadow-[0_0_30px_rgba(57,255,20,0.35)] flex items-center justify-center gap-3"
              >
                <UploadCloud className="w-6 h-6 stroke-[2.5]" />
                <span>{isUploading ? 'VERIFYING & UPLOADING...' : 'SUBMIT GOAL TO WEEK 42 COMPETITION'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
