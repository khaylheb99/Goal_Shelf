export type UserRole = 'player' | 'judge' | 'admin';

export interface User {
  id: string;
  name: string;
  displayName: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  avatar: string;
  role: UserRole;
  bio?: string;
  preferredFoot?: 'Left' | 'Right' | 'Both';
  position?: 'Striker' | 'Winger' | 'Midfielder' | 'Defender' | 'Goalkeeper';
  goalsSubmitted: number;
  prizesWonNaira: number;
  joinedDate: string;
}

export type SubmissionStatus =
  | 'pending_review'
  | 'timestamp_verification'
  | 'approved'
  | 'rejected'
  | 'featured'
  | 'disqualified';

export type GoalCategory =
  | 'long_range'
  | 'free_kick'
  | 'bicycle_kick'
  | 'solo_run'
  | 'team_goal'
  | 'header'
  | 'volley'
  | 'skills_creativity';

export interface JudgeScore {
  id: string;
  judgeId: string;
  judgeName: string;
  technique: number; // Max 30
  difficulty: number; // Max 25
  accuracy: number; // Max 20
  creativity: number; // Max 15
  impact: number; // Max 10
  total: number; // Max 100
  notes: string;
  scoredAt: string;
}

export interface GoalSubmission {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  playerId: string;
  playerName: string;
  playerDisplayName: string;
  playerAvatar: string;
  state: string;
  city: string;
  dateRecorded: string;
  category: GoalCategory;
  competitionId: string;
  competitionWeek: number;
  status: SubmissionStatus;
  timestampVisible: boolean;
  timestampVerifiedTime: string;
  scores: JudgeScore[];
  finalScore?: number;
  rank?: number;
  likesCount: number;
  viewsCount: number;
  createdAt: string;
  moderationNotes?: string;
  rejectionReason?: string;
  isFeatured?: boolean;
}

export type CompetitionStatus = 'draft' | 'active' | 'judging' | 'finalized';

export interface Competition {
  id: string;
  weekNumber: number;
  title: string;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  recordingWindowStart: string;
  recordingWindowEnd: string;
  prizePool: number; // ₦500,000
  prizes: {
    first: number; // ₦250,000
    second: number; // ₦150,000
    third: number; // ₦100,000
  };
  status: CompetitionStatus;
  isFundedConfirmed: boolean;
  rulesPublished: boolean;
}

export type PayoutStatus =
  | 'pending_verification'
  | 'approved'
  | 'processing'
  | 'paid'
  | 'on_hold';

export interface PrizePayout {
  id: string;
  competitionId: string;
  weekNumber: number;
  position: 1 | 2 | 3;
  prizeAmount: number;
  winnerPlayerId: string;
  winnerName: string;
  winnerDisplayName: string;
  winnerState: string;
  goalTitle: string;
  status: PayoutStatus;
  paymentRef?: string;
  confirmedDate?: string;
  bankDetailsMasked?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'approval' | 'rejection' | 'timestamp' | 'deadline' | 'featured' | 'leaderboard' | 'prize';
  timestamp: string;
  isRead: boolean;
  linkPage?: string;
}

export interface NigerianState {
  code: string;
  name: string;
  capital: string;
  geopoliticalZone: 'North Central' | 'North East' | 'North West' | 'South East' | 'South South' | 'South West';
  x: number; // SVG map position percentage
  y: number;
  totalSubmissions?: number;
  approvedGoals?: number;
  featuredStriker?: string;
}
