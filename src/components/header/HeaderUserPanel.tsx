'use client';

import Link from 'next/link';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

interface HeaderUserPanelProps {
  user: any;
  onSignOut: () => void;
}

export default function HeaderUserPanel({ user, onSignOut }: HeaderUserPanelProps) {
  return (
    <>
      {/* Desktop User Panel */}
      <Link
        href="/login"
        className="group relative hidden rounded-2xl border border-white/20 bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-4 py-2 text-sm font-bold text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1] hover:shadow-2xl lg:flex lg:px-6 lg:text-base"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <span className="relative z-10">پنل کاربری</span>
      </Link>

      {/* Mobile User Panel */}
      <div className="lg:hidden">
        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="group relative flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-4 py-2 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <FaUser className="relative z-10 ml-2 h-4 w-4" />
              <span className="relative z-10 text-sm">پنل کاربری</span>
            </Link>
            <button
              onClick={onSignOut}
              className="group relative flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/20 p-3 text-red-600 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-red-500/30"
            >
              <FaSignOutAlt className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="group relative flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-3 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <FaUser className="relative z-10 h-5 w-5" />
          </Link>
        )}
      </div>
    </>
  );
}
