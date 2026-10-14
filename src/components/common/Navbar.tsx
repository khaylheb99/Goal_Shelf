import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import {
  Bell,
  Menu,
  X,
  User as UserIcon,
  Shield,
  Award,
  ChevronDown,
  LogOut,
  UploadCloud,
  CheckCircle,
} from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    currentUser,
    switchRole,
    logoutUser,
    notifications,
    markAllNotificationsRead,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore Goals' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'weekly-prizes', label: 'Weekly Prizes' },
    { id: 'nigeria-map', label: 'Nigeria Map' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050807]/95 backdrop-blur-md border-b border-[#111A13]">
      {/* Role Testing Bar for Evaluation */}
      <div className="bg-[#0B110D] border-b border-[#16241a] px-4 py-1.5 text-xs text-[#A7B2AA]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-[#39FF14] font-mono font-semibold">Active Role:</span>
            <span className="capitalize text-white font-medium">
              {currentUser?.role === 'admin'
                ? 'Admin (Moderation & Payouts)'
                : currentUser?.role === 'judge'
                ? 'Chief Judge (Scoring Panel)'
                : 'Player / Striker'}
            </span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline text-[#A7B2AA]">Switch role to test live workflows:</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleRoleChange('player')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                currentUser?.role === 'player'
                  ? 'bg-[#39FF14] text-black font-bold'
                  : 'text-neutral-400 hover:text-white bg-[#111A13]'
              }`}
            >
              Player
            </button>
            <button
              onClick={() => handleRoleChange('judge')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                currentUser?.role === 'judge'
                  ? 'bg-[#FFD700] text-black font-bold'
                  : 'text-neutral-400 hover:text-white bg-[#111A13]'
              }`}
            >
              Judge
            </button>
            <button
              onClick={() => handleRoleChange('admin')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                currentUser?.role === 'admin'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'text-neutral-400 hover:text-white bg-[#111A13]'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-5 Nav Links) - Zone 3 (CTA & User Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand element */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14] rounded-lg"
        >
          <Logo size="md" />
        </button>

        {/* Zone 2: 4-5 single-line clean navigation text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 text-[15px] ${
                  isActive
                    ? 'text-[#39FF14] font-semibold border-b-2 border-[#39FF14]'
                    : 'text-[#A7B2AA] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 text-[15px] ${
                activePage === 'admin'
                  ? 'text-[#39FF14] font-semibold border-b-2 border-[#39FF14]'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              Admin Dashboard
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* In-App Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                setProfileDropdownOpen(false);
              }}
              className="p-2 text-[#A7B2AA] hover:text-[#39FF14] transition-colors relative rounded-lg hover:bg-[#111A13]"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#39FF14] rounded-full ring-2 ring-[#050807]" />
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0B110D] border border-[#16241a] rounded-xl shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-[#16241a]">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg font-bold tracking-wide">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-[#39FF14]/20 text-[#39FF14] px-2 py-0.5 rounded font-mono">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-[#A7B2AA] hover:text-white"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="mt-3 max-h-72 overflow-y-auto space-y-2.5">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-lg border text-xs transition-colors ${
                        notif.isRead
                          ? 'bg-[#111A13]/40 border-transparent text-[#A7B2AA]'
                          : 'bg-[#111A13] border-[#39FF14]/30 text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold mb-1">
                        <span className="text-white">{notif.title}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#A7B2AA] leading-relaxed">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotifDropdownOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#111A13] transition-colors border border-transparent hover:border-[#16241a]"
            >
              <img
                src={currentUser?.avatar || '/src/assets/images/striker_avatar_winner_1791991464659.jpg'}
                alt={currentUser?.displayName || 'User'}
                className="w-8 h-8 rounded-full object-cover border border-[#39FF14]/40"
              />
              <span className="hidden md:inline text-xs font-semibold text-white max-w-[100px] truncate">
                {currentUser?.displayName || 'Account'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#A7B2AA]" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0B110D] border border-[#16241a] rounded-xl shadow-2xl p-3 z-50">
                <div className="px-3 py-2 border-b border-[#16241a] mb-2">
                  <p className="text-sm font-semibold text-white truncate">{currentUser?.name || 'Guest User'}</p>
                  <p className="text-xs text-[#39FF14] font-mono">@{currentUser?.displayName || 'guest'}</p>
                  <p className="text-[11px] text-[#A7B2AA] mt-1">{currentUser?.state || 'Nigeria'} · {currentUser?.role}</p>
                </div>

                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setActivePage('profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#111A13] text-neutral-300 hover:text-white flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-[#39FF14]" />
                    My Player Shelf & History
                  </button>

                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setActivePage('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#111A13] text-amber-400 hover:text-amber-300 flex items-center gap-2 font-medium"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Moderation Console
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setActivePage('rules');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#111A13] text-neutral-300 hover:text-white flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-neutral-400" />
                    Competition Rules & Trust
                  </button>

                  <div className="pt-2 border-t border-[#16241a]">
                    <button
                      onClick={() => {
                        logoutUser();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-950/40 text-red-400 hover:text-red-300 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA: SUBMIT GOAL */}
          <button
            onClick={() => handleNavClick('submit')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-bold text-base tracking-wider rounded-lg transition-transform active:scale-95 shadow-[0_0_15px_rgba(57,255,20,0.3)] whitespace-nowrap shrink-0"
          >
            <UploadCloud className="w-4 h-4 stroke-[2.5]" />
            SUBMIT GOAL
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#A7B2AA] hover:text-white rounded-lg hover:bg-[#111A13]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B110D] border-b border-[#16241a] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === item.id
                    ? 'bg-[#111A13] text-[#39FF14] font-semibold'
                    : 'text-[#A7B2AA] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-amber-400 bg-[#111A13]"
              >
                Admin Dashboard
              </button>
            )}
            <button
              onClick={() => handleNavClick('profile')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-300 hover:text-white"
            >
              My Player Profile
            </button>
            <button
              onClick={() => handleNavClick('rules')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-300 hover:text-white"
            >
              Competition Rules & FAQs
            </button>
          </nav>

          <div className="pt-2 border-t border-[#16241a]">
            <button
              onClick={() => handleNavClick('submit')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#39FF14] text-black font-display font-bold text-lg rounded-lg shadow-md"
            >
              <UploadCloud className="w-5 h-5 stroke-[2.5]" />
              SUBMIT YOUR GOAL
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
