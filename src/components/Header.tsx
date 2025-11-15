'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import HeaderGlassEffects from './header/HeaderGlassEffects';
import HeaderNavigation from './header/HeaderNavigation';
import HeaderMobileMenu from './header/HeaderMobileMenu';
import HeaderUserPanel from './header/HeaderUserPanel';

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const waveOffset = scrollY * 0.1;
  const liquidDistortion = Math.sin(scrollY * 0.01) * 2;

  return (
    <header className="sticky top-6 z-50 mx-4">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-2xl transition-all duration-500"
        style={{
          transform: `translateY(${liquidDistortion}px)`,
          borderRadius: `${16 + Math.abs(liquidDistortion)}px`,
        }}
      >
        <HeaderGlassEffects waveOffset={waveOffset} liquidDistortion={liquidDistortion} />

        <div className="relative z-10 container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="لایکینو"
                width={80}
                height={30}
                className="hidden h-8 w-auto lg:block"
              />
            </div>

            <HeaderNavigation />
            <HeaderUserPanel user={user} onSignOut={signOut} />
          </div>

          <div className="flex items-center justify-between lg:hidden">
            <button
              className="group relative rounded-full border border-white/20 bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-3 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]"
              onClick={toggleMobileMenu}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <svg
                className="relative z-10 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex flex-1 justify-center">
              <Image src="/logo.png" alt="لایکینو" width={80} height={30} className="h-8 w-auto" />
            </div>

            <HeaderUserPanel user={user} onSignOut={signOut} />
          </div>

          <HeaderMobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes waveMove {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes droplet {
          0%,
          100% {
            opacity: 0.3;
            transform: translateY(0px) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-10px) scale(1.2);
          }
        }
      `}</style>
    </header>
  );
}
