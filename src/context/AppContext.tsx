import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Competition,
  CompetitionStatus,
  GoalSubmission,
  JudgeScore,
  NotificationItem,
  PayoutStatus,
  PrizePayout,
  User,
  UserRole,
} from '../types';
import {
  INITIAL_COMPETITIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PAYOUTS,
  INITIAL_SUBMISSIONS,
  INITIAL_USERS,
} from '../data/seedData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  submissions: GoalSubmission[];
  competitions: Competition[];
  activeCompetition: Competition;
  payouts: PrizePayout[];
  notifications: NotificationItem[];
  likedSubmissionIds: string[];
  activePage: string;
  selectedGoal: GoalSubmission | null;
  selectedStateFilter: string;
  
  // Navigation
  setActivePage: (page: string) => void;
  setSelectedGoal: (goal: GoalSubmission | null) => void;
  setSelectedStateFilter: (state: string) => void;

  // User & Auth
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: UserRole) => void;
  loginUser: (email: string) => boolean;
  logoutUser: () => void;
  updateProfile: (updated: Partial<User>) => void;
  requestAccountDeletion: () => void;

  // Submissions
  submitGoal: (data: {
    fullName: string;
    displayName: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    title: string;
    description: string;
    dateRecorded: string;
    category: GoalSubmission['category'];
    videoBlobUrl: string;
    thumbnailUrl: string;
    timestampTime: string;
  }) => Promise<string>;
  approveSubmission: (id: string, notes?: string) => void;
  rejectSubmission: (id: string, reason: string, notes?: string) => void;
  requestAdditionalVerification: (id: string, notes: string) => void;
  toggleFeatured: (id: string) => void;
  scoreSubmission: (id: string, score: Omit<JudgeScore, 'id' | 'scoredAt'>) => void;
  toggleLike: (id: string) => void;

  // Competition & Payouts
  createCompetition: (comp: Omit<Competition, 'id'>) => void;
  updateCompetitionStatus: (id: string, status: CompetitionStatus) => void;
  updatePayoutStatus: (id: string, status: PayoutStatus, paymentRef?: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'goalshelf_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state or use initial seed
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}currentUser`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USERS[0]; // Ebuka Eze
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}users`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USERS;
  });

  const [submissions, setSubmissions] = useState<GoalSubmission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}submissions`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SUBMISSIONS;
  });

  const [competitions, setCompetitions] = useState<Competition[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}competitions`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_COMPETITIONS;
  });

  const [payouts, setPayouts] = useState<PrizePayout[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}payouts`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PAYOUTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}notifications`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [likedSubmissionIds, setLikedSubmissionIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}likes`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['GS-2026-W42-101'];
  });

  const [activePage, setActivePage] = useState<string>('home');
  const [selectedGoal, setSelectedGoal] = useState<GoalSubmission | null>(null);
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('all');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}currentUser`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}submissions`, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}competitions`, JSON.stringify(competitions));
  }, [competitions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}payouts`, JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}likes`, JSON.stringify(likedSubmissionIds));
  }, [likedSubmissionIds]);

  const activeCompetition = competitions.find((c) => c.status === 'active') || competitions[0];

  // Helper to calculate rank and tie-break
  const recalculateLeaderboard = (list: GoalSubmission[]): GoalSubmission[] => {
    const scoredApproved = list.filter((s) => s.status === 'approved' && s.scores.length > 0);
    // Sort by finalScore desc; tie-breaker: technique score desc, then difficulty desc
    scoredApproved.sort((a, b) => {
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

    return list.map((item) => {
      const idx = scoredApproved.findIndex((s) => s.id === item.id);
      if (idx !== -1) {
        return { ...item, rank: idx + 1 };
      }
      return item;
    });
  };

  const switchRole = (role: UserRole) => {
    const targetUser = users.find((u) => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    } else {
      // Create user if not present
      const newUser: User = {
        id: `usr-${role}-${Date.now()}`,
        name: role === 'admin' ? 'Babatunde Adeleke' : role === 'judge' ? 'Daniel Amokachi Jr.' : 'Grassroots Player',
        displayName: role === 'admin' ? 'AdminBabatunde' : role === 'judge' ? 'JudgeAmokachi' : 'NaijaBaller',
        email: `${role}@goalshelf.ng`,
        phone: '+234 800 000 0000',
        state: 'Lagos',
        city: 'Surulere',
        avatar: '/src/assets/images/striker_avatar_winner_1791991464659.jpg',
        role,
        goalsSubmitted: role === 'player' ? 2 : 0,
        prizesWonNaira: 0,
        joinedDate: '2026-01-01',
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
    }
  };

  const loginUser = (email: string) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return true;
    }
    // Create new player user
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      displayName: email.split('@')[0],
      email,
      phone: '+234 800 000 0000',
      state: 'Lagos',
      city: 'Lagos',
      avatar: '/src/assets/images/striker_avatar_winner_1791991464659.jpg',
      role: 'player',
      goalsSubmitted: 0,
      prizesWonNaira: 0,
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updated };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
  };

  const requestAccountDeletion = () => {
    if (!currentUser) return;
    setSubmissions((prev) => prev.filter((s) => s.playerId !== currentUser.id));
    setUsers((prev) => prev.filter((u) => u.id !== currentUser.id));
    setCurrentUser(null);
    setActivePage('home');
  };

  const submitGoal = async (data: {
    fullName: string;
    displayName: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    title: string;
    description: string;
    dateRecorded: string;
    category: GoalSubmission['category'];
    videoBlobUrl: string;
    thumbnailUrl: string;
    timestampTime: string;
  }): Promise<string> => {
    const submissionId = `GS-2026-W${activeCompetition.weekNumber}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSubmission: GoalSubmission = {
      id: submissionId,
      title: data.title,
      description: data.description,
      videoUrl: data.videoBlobUrl,
      thumbnailUrl: data.thumbnailUrl || '/src/assets/images/hero_stadium_strike_1791991464710.jpg',
      playerId: currentUser ? currentUser.id : `usr-guest-${Date.now()}`,
      playerName: data.fullName,
      playerDisplayName: data.displayName,
      playerAvatar: currentUser?.avatar || '/src/assets/images/striker_avatar_winner_1791991464659.jpg',
      state: data.state,
      city: data.city,
      dateRecorded: data.dateRecorded,
      category: data.category,
      competitionId: activeCompetition.id,
      competitionWeek: activeCompetition.weekNumber,
      status: 'timestamp_verification',
      timestampVisible: true,
      timestampVerifiedTime: data.timestampTime,
      scores: [],
      likesCount: 1,
      viewsCount: 1,
      createdAt: new Date().toISOString(),
      moderationNotes: 'Queued for human video moderation and timestamp consistency check.',
    };

    setSubmissions((prev) => [newSubmission, ...prev]);

    // Update user submission count if logged in
    if (currentUser) {
      updateProfile({ goalsSubmitted: (currentUser.goalsSubmitted || 0) + 1 });
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: currentUser?.id || 'all',
      title: 'Submission Received',
      message: `Goal "${data.title}" (${submissionId}) is in Timestamp Verification queue. Moderation takes under 2 hours.`,
      type: 'timestamp',
      timestamp: new Date().toISOString(),
      isRead: false,
      linkPage: 'profile',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return submissionId;
  };

  const approveSubmission = (id: string, notes?: string) => {
    setSubmissions((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'approved' as const,
            moderationNotes: notes || 'Video and visible timestamp verified by administrative review.',
          };
        }
        return item;
      });
      return recalculateLeaderboard(updated);
    });

    const sub = submissions.find((s) => s.id === id);
    if (sub) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: sub.playerId,
        title: 'Goal Approved!',
        message: `Your goal "${sub.title}" passed timestamp review and is now live on the public leaderboard.`,
        type: 'approval',
        timestamp: new Date().toISOString(),
        isRead: false,
        linkPage: 'explore',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const rejectSubmission = (id: string, reason: string, notes?: string) => {
    setSubmissions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'rejected' as const,
            rejectionReason: reason,
            moderationNotes: notes || reason,
          };
        }
        return item;
      })
    );

    const sub = submissions.find((s) => s.id === id);
    if (sub) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: sub.playerId,
        title: 'Submission Feedback',
        message: `Goal "${sub.title}" could not be approved: ${reason}. You may re-record and submit again.`,
        type: 'rejection',
        timestamp: new Date().toISOString(),
        isRead: false,
        linkPage: 'profile',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const requestAdditionalVerification = (id: string, notes: string) => {
    setSubmissions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'timestamp_verification' as const,
            moderationNotes: notes,
          };
        }
        return item;
      })
    );
  };

  const toggleFeatured = (id: string) => {
    setSubmissions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, isFeatured: !item.isFeatured };
        }
        return item;
      })
    );
  };

  const scoreSubmission = (id: string, scoreData: Omit<JudgeScore, 'id' | 'scoredAt'>) => {
    const newScore: JudgeScore = {
      ...scoreData,
      id: `sc-${Date.now()}`,
      scoredAt: new Date().toISOString(),
    };

    setSubmissions((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const scores = [newScore, ...item.scores.filter((s) => s.judgeId !== scoreData.judgeId)];
          const avgScore = Number((scores.reduce((sum, s) => sum + s.total, 0) / scores.length).toFixed(1));
          return {
            ...item,
            scores,
            finalScore: avgScore,
            status: 'approved' as const,
          };
        }
        return item;
      });
      return recalculateLeaderboard(updated);
    });

    const sub = submissions.find((s) => s.id === id);
    if (sub) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: sub.playerId,
        title: 'Judge Score Recorded',
        message: `Judge awarded ${scoreData.total}/100 points for "${sub.title}". Check your ranking on the leaderboard.`,
        type: 'leaderboard',
        timestamp: new Date().toISOString(),
        isRead: false,
        linkPage: 'leaderboard',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const toggleLike = (id: string) => {
    const isLiked = likedSubmissionIds.includes(id);
    setLikedSubmissionIds((prev) => (isLiked ? prev.filter((i) => i !== id) : [...prev, id]));
    setSubmissions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            likesCount: isLiked ? Math.max(0, item.likesCount - 1) : item.likesCount + 1,
          };
        }
        return item;
      })
    );
  };

  const createCompetition = (compData: Omit<Competition, 'id'>) => {
    const newComp: Competition = {
      ...compData,
      id: `comp-w${compData.weekNumber}-${new Date().getFullYear()}`,
    };
    setCompetitions((prev) => [newComp, ...prev]);
  };

  const updateCompetitionStatus = (id: string, status: CompetitionStatus) => {
    setCompetitions((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, status };
        }
        return c;
      })
    );
  };

  const updatePayoutStatus = (id: string, status: PayoutStatus, paymentRef?: string) => {
    setPayouts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status,
            paymentRef: paymentRef || p.paymentRef,
            confirmedDate: status === 'paid' ? new Date().toISOString().split('T')[0] : p.confirmedDate,
          };
        }
        return p;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        submissions,
        competitions,
        activeCompetition,
        payouts,
        notifications,
        likedSubmissionIds,
        activePage,
        selectedGoal,
        selectedStateFilter,
        setActivePage,
        setSelectedGoal,
        setSelectedStateFilter,
        setCurrentUser,
        switchRole,
        loginUser,
        logoutUser,
        updateProfile,
        requestAccountDeletion,
        submitGoal,
        approveSubmission,
        rejectSubmission,
        requestAdditionalVerification,
        toggleFeatured,
        scoreSubmission,
        toggleLike,
        createCompetition,
        updateCompetitionStatus,
        updatePayoutStatus,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
