import React from 'react';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Video, Trophy, MapPin, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  const handleNav = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050807] border-t border-[#111A13] text-[#A7B2AA] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#111A13]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-sm text-[#A7B2AA] leading-relaxed max-w-sm mt-3">
              The premier football goal submission and competition platform for Nigeria.
              Record your best strike, verify the recording timestamp, represent your state,
              and win weekly cash prizes.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]" />
              <span>Week 42 ₦500,000 Prize Pool Verified & Active</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-white font-display uppercase tracking-wider text-sm font-bold">Competition</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('submit')} className="hover:text-[#39FF14] transition-colors">
                  Submit a Goal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('explore')} className="hover:text-[#39FF14] transition-colors">
                  Explore Top Goals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('leaderboard')} className="hover:text-[#39FF14] transition-colors">
                  Weekly Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('weekly-prizes')} className="hover:text-[#39FF14] transition-colors">
                  Cash Prizes & Payouts
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('nigeria-map')} className="hover:text-[#39FF14] transition-colors">
                  Nigeria State Map
                </button>
              </li>
            </ul>
          </div>

          {/* Integrity & Rules */}
          <div className="space-y-3">
            <h4 className="text-white font-display uppercase tracking-wider text-sm font-bold">Rules & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  Competition Rules
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  Timestamp Verification Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  100-Point Scoring System
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  Prize Verification & Anti-Fraud
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  Minor Protection & Consent
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-display uppercase tracking-wider text-sm font-bold">About & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  About GoalShelf
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  Terms of Participation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('rules')} className="hover:text-[#39FF14] transition-colors">
                  Contact & Video Dispute
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Nigerian Flag Accent */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            {/* Nigerian Flag Accent Pill */}
            <div className="flex items-center h-3 w-5 overflow-hidden rounded-xs border border-white/20">
              <span className="w-1/3 h-full bg-[#008751]" />
              <span className="w-1/3 h-full bg-[#FFFFFF]" />
              <span className="w-1/3 h-full bg-[#008751]" />
            </div>
            <span>Proudly built for Nigerian grassroots football · 36 States + FCT</span>
          </div>
          <div>
            © {new Date().getFullYear()} GOALSHELF Football Platform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
