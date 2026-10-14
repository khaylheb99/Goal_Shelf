import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Award,
  Lock,
  HelpCircle,
  FileText,
  Mail,
  ChevronDown,
  AlertCircle,
  UploadCloud,
} from 'lucide-react';

export const RulesAndTrustPages: React.FC = () => {
  const { setActivePage } = useApp();
  const [activeTab, setActiveTab] = useState<'rules' | 'about' | 'privacy' | 'faq' | 'contact'>('rules');

  const faqs = [
    {
      q: 'Why is an on-screen timestamp strictly required?',
      a: 'GoalShelf celebrates current, genuine grassroots football. The timestamp camera overlay guarantees that the footage was captured during the active competition week, preventing internet reruns, recycled academy clips, or footage filmed years ago.',
    },
    {
      q: 'Which camera apps can I use to record the timestamp?',
      a: 'Any app that embeds the live date and time directly onto the video frames is accepted. Popular free examples include Timestamp Camera Free (Android & iOS), Open Camera, GPS Map Camera, or Timestamp Photo and Video.',
    },
    {
      q: 'How is the 100-point judging score calculated?',
      a: 'Accredited NFF-licensed coaches and GoalShelf technical panelists score five distinct criteria: Technique & Execution (30 pts), Difficulty & Distance (25 pts), Accuracy & Placement (20 pts), Creativity & Flair (15 pts), and Overall Visual Impact (10 pts).',
    },
    {
      q: 'Do public likes decide the ₦500,000 cash prizes?',
      a: 'No. Community likes offer engagement, support, and spotlight recognition. Official cash prize winners are determined 100% by the certified judging panel scores to prevent botting or unfair social media popularity contests.',
    },
    {
      q: 'How and when are winners paid?',
      a: 'Competitions close Sunday at 23:59 WAT. Integrity and identity checks occur on Monday. Payouts are transferred directly to verified Nigerian bank accounts on Tuesday mornings (1st Place: ₦250,000; 2nd Place: ₦150,000; 3rd Place: ₦100,000).',
    },
    {
      q: 'What is the tie-breaking procedure?',
      a: 'If two goals have identical final scores, the tie is broken by: 1) Highest Technique & Execution score; 2) Highest Difficulty score; 3) Panel chairman consensus.',
    },
    {
      q: 'Are players under 18 eligible?',
      a: 'Yes! Grassroots players aged 16 and 17 may participate with parental or legal guardian consent. Payouts for minors are routed through verified guardian accounts in accordance with Nigerian child protection guidelines.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050807] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="pb-6 border-b border-[#111A13]">
          <span className="text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold">
            TRANSPARENCY & INTEGRITY CHARTER
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase font-display text-white mt-1">
            RULES, TRUST & <span className="text-[#39FF14]">COMPETITION GOVERNANCE</span>
          </h1>
          <p className="text-sm text-[#A7B2AA] mt-2">
            GoalShelf is built on fair play, verified grassroots authenticity, and guaranteed cash prize payouts.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#111A13] text-xs font-display uppercase tracking-wider font-bold">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'rules'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            Competition Rules
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            About GoalShelf
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            Privacy & Security
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'faq'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            Frequently Asked Questions
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap ${
              activeTab === 'contact'
                ? 'bg-[#39FF14] text-black shadow-md'
                : 'bg-[#0B110D] text-[#A7B2AA] hover:text-white border border-[#16241a]'
            }`}
          >
            Dispute & Reporting
          </button>
        </div>

        {/* TAB 1: OFFICIAL COMPETITION RULES */}
        {activeTab === 'rules' && (
          <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-8 space-y-8 text-neutral-300 text-xs sm:text-sm leading-relaxed">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold font-display uppercase text-white">
                1. Eligibility & Video Timestamp Protocol
              </h2>
              <p>
                Every participant in the GoalShelf weekly tournament must submit authentic, unaltered footage.
                To be eligible for the ₦500,000 weekly prize pool, all videos must contain a clearly legible,
                uninterrupted timestamp camera watermark showing the date and time of the recording.
              </p>
              <div className="bg-[#111A13] p-4 rounded-xl border border-[#39FF14]/30 text-xs font-mono text-neutral-300">
                <span className="text-[#39FF14] font-bold block mb-1">Mandatory Notice:</span>
                “IMPORTANT: Your goal video MUST show a visible recording date and time. Videos without a readable timestamp may be rejected.”
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold font-display uppercase text-white">
                2. 100-Point Transparent Scoring Rubric
              </h2>
              <p>
                Approved goals are evaluated by independent technical judges. Each goal is graded across five metrics:
              </p>
              <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-neutral-300">
                <li><strong>Technique and Execution:</strong> 30 points maximum</li>
                <li><strong>Difficulty and Distance:</strong> 25 points maximum</li>
                <li><strong>Accuracy and Placement:</strong> 20 points maximum</li>
                <li><strong>Creativity and Originality:</strong> 15 points maximum</li>
                <li><strong>Overall Visual Impact:</strong> 10 points maximum</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold font-display uppercase text-white">
                3. Cash Prizes & Disbursement
              </h2>
              <p>
                The ₦500,000 pool is split into ₦250,000 (1st Place), ₦150,000 (2nd Place), and ₦100,000 (3rd Place).
                Prizes are only labeled confirmed when the competition is funded and verified by the integrity officer.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActivePage('submit')}
                className="px-6 py-3 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-bold text-sm uppercase rounded-xl"
              >
                Accept Rules & Submit Your Goal
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT GOALSHELF */}
        {activeTab === 'about' && (
          <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-8 space-y-6 text-neutral-300 text-xs sm:text-sm leading-relaxed">
            <h2 className="text-2xl font-bold font-display uppercase text-white">
              YOUR GOALS. YOUR GLORY. YOUR SHELF.
            </h2>
            <p>
              GOALSHELF is Nigeria's dedicated sports technology platform built to discover, archive,
              and reward grassroots football brilliance. Across the 36 states and the FCT, millions of young Nigerians
              play exceptional football daily on community sand pitches, school grounds, and local turf arenas.
            </p>
            <p>
              Until now, spectacular strikes went unrecorded or disappeared into fleeting chat groups.
              GoalShelf provides a permanent national shelf where every worthy strike is celebrated, rated,
              and rewarded with life-changing weekly cash prizes.
            </p>
          </div>
        )}

        {/* TAB 3: PRIVACY & SECURITY */}
        {activeTab === 'privacy' && (
          <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-8 space-y-6 text-neutral-300 text-xs sm:text-sm leading-relaxed">
            <h2 className="text-xl font-bold font-display uppercase text-white">
              Player Privacy & Data Protection Standard
            </h2>
            <p>
              We protect our players' personal data. Phone numbers, email addresses, and full bank account numbers
              are never displayed publicly. Only public display names, playing states, and approved football footage are visible on the website.
            </p>
            <p>
              Users have full rights to request account and footage removal at any time through their Player Profile.
            </p>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0B110D] border border-[#16241a] rounded-2xl p-5 space-y-2">
                <h3 className="text-base font-bold font-display uppercase text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#39FF14]" />
                  {faq.q}
                </h3>
                <p className="text-xs text-[#A7B2AA] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: CONTACT & DISPUTE */}
        {activeTab === 'contact' && (
          <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold font-display uppercase text-white">
              Video Disputes, Ownership Claims & Fraud Reporting
            </h2>
            <p className="text-xs text-[#A7B2AA] leading-relaxed">
              If you suspect a video is fraudulent, infringes your copyright, or contains an altered timestamp, contact our integrity board immediately with the Submission ID.
            </p>
            <div className="p-4 bg-[#111A13] border border-[#16241a] rounded-xl text-xs font-mono space-y-2 text-white">
              <div>Email: <span className="text-[#39FF14]">integrity@goalshelf.ng</span></div>
              <div>WhatsApp Hotline: <span className="text-[#39FF14]">+234 800 GOALSHELF</span></div>
              <div>Location: <span className="text-neutral-300">Garki, Abuja & Surulere, Lagos, Nigeria</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
