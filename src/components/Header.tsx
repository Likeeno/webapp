'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

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

  // Calculate wave animation based on scroll
  const waveOffset = scrollY * 0.1;
  const liquidDistortion = Math.sin(scrollY * 0.01) * 2;

  return (
    <header className="sticky top-6 z-50 mx-4">
      <div 
        className="bg-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/30 relative overflow-hidden transition-all duration-500 max-w-7xl mx-auto"
        style={{
          transform: `translateY(${liquidDistortion}px)`,
          borderRadius: `${16 + Math.abs(liquidDistortion)}px`
        }}
      >
        {/* Liquid Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
        
        {/* Wave Effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
            backgroundSize: '200% 200%',
            animation: `wave 3s ease-in-out infinite, waveMove ${5 + scrollY * 0.001}s linear infinite`
          }}
        ></div>
        
        {/* Water Droplet Effect */}
        <div 
          className="absolute top-0 left-1/4 w-2 h-2 bg-white/40 rounded-full blur-sm"
          style={{
            animation: `droplet 4s ease-in-out infinite ${scrollY * 0.1}s`
          }}
        ></div>
        <div 
          className="absolute top-2 right-1/3 w-1 h-1 bg-white/30 rounded-full blur-sm"
          style={{
            animation: `droplet 3s ease-in-out infinite ${scrollY * 0.15}s`
          }}
        ></div>
        
        {/* Glossy Top Edge with Wave */}
        <div 
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{
            transform: `translateX(${waveOffset}px)`,
            filter: `blur(${0.5 + Math.abs(liquidDistortion) * 0.1}px)`
          }}
        ></div>
        <div 
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{
            transform: `translateX(${-waveOffset * 0.5}px)`,
            filter: `blur(${0.3 + Math.abs(liquidDistortion) * 0.05}px)`
          }}
        ></div>
        
        {/* Glossy Left Edge with Wave */}
        <div 
          className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent"
          style={{
            transform: `translateY(${waveOffset * 0.3}px)`,
            filter: `blur(${0.5 + Math.abs(liquidDistortion) * 0.1}px)`
          }}
        ></div>
        <div 
          className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent"
          style={{
            transform: `translateY(${-waveOffset * 0.2}px)`,
            filter: `blur(${0.3 + Math.abs(liquidDistortion) * 0.05}px)`
          }}
        ></div>
        
        {/* Glossy Right Edge with Wave */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent"
          style={{
            transform: `translateY(${-waveOffset * 0.3}px)`,
            filter: `blur(${0.5 + Math.abs(liquidDistortion) * 0.1}px)`
          }}
        ></div>
        <div 
          className="absolute top-0 bottom-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent"
          style={{
            transform: `translateY(${waveOffset * 0.2}px)`,
            filter: `blur(${0.3 + Math.abs(liquidDistortion) * 0.05}px)`
          }}
        ></div>
        
        {/* Glossy Bottom Edge with Wave */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{
            transform: `translateX(${-waveOffset * 0.7}px)`,
            filter: `blur(${0.5 + Math.abs(liquidDistortion) * 0.1}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          style={{
            transform: `translateX(${waveOffset * 0.3}px)`,
            filter: `blur(${0.3 + Math.abs(liquidDistortion) * 0.05}px)`
          }}
        ></div>
        
        {/* Inner Glow with Liquid Motion */}
        <div 
          className="absolute inset-1 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-2xl"
          style={{
            transform: `rotate(${liquidDistortion * 0.5}deg)`,
            filter: `blur(${1 + Math.abs(liquidDistortion) * 0.2}px)`
          }}
        ></div>
        
        <div className="container mx-auto px-6 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo - سمت راست */}
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="لایکینو"
                width={80}
                height={30}
                className="h-8 w-auto hidden lg:block"
              />
            </div>

            {/* Navigation Menu - وسط */}
            <nav className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-primary-text/90 hover:text-primary-highlight transition-all duration-500 font-regular px-6 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-white/30 hover:to-white/10 hover:backdrop-blur-sm hover:shadow-xl relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-highlight/20 via-primary-highlight/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></div>
                  <span className="relative z-10 font-medium">صفحه اصلی</span>
                </Link>
                <Link href="/services" className="text-primary-text/90 hover:text-primary-highlight transition-all duration-500 font-regular px-6 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-white/30 hover:to-white/10 hover:backdrop-blur-sm hover:shadow-xl relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-highlight/20 via-primary-highlight/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></div>
                  <span className="relative z-10 font-medium">خدمات ما</span>
                </Link>
                <Link href="/orders" className="text-primary-text/90 hover:text-primary-highlight transition-all duration-500 font-regular px-6 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-white/30 hover:to-white/10 hover:backdrop-blur-sm hover:shadow-xl relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-highlight/20 via-primary-highlight/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></div>
                  <span className="relative z-10 font-medium">پیگیری سفارش</span>
                </Link>
                <Link href="/blog" className="text-primary-text/90 hover:text-primary-highlight transition-all duration-500 font-regular px-6 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-white/30 hover:to-white/10 hover:backdrop-blur-sm hover:shadow-xl relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-highlight/20 via-primary-highlight/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></div>
                  <span className="relative z-10 font-medium">بلاگ</span>
                </Link>
                <Link href="/support" className="text-primary-text/90 hover:text-primary-highlight transition-all duration-500 font-regular px-6 py-3 rounded-2xl hover:bg-gradient-to-r hover:from-white/30 hover:to-white/10 hover:backdrop-blur-sm hover:shadow-xl relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-highlight/20 via-primary-highlight/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></div>
                  <span className="relative z-10 font-medium">پشتیبانی</span>
                </Link>
              </div>
            </nav>

            {/* User Panel Button - سمت چپ (دسکتاپ) */}
            <Link href="/login" className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-4 lg:px-6 py-2 rounded-2xl hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 font-bold text-sm lg:text-base shadow-xl hover:shadow-2xl lg:flex hidden border border-white/20 backdrop-blur-sm relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">پنل کاربری</span>
            </Link>
          </div>

          {/* Mobile/Tablet Layout - لوگو وسط، دکمه‌ها در دو طرف */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Mobile Menu Button - سمت چپ */}
            <button 
              className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white p-3 rounded-full hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 shadow-xl border border-white/20 backdrop-blur-sm relative group"
              onClick={toggleMobileMenu}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo - وسط */}
            <div className="flex-1 flex justify-center">
              <Image
                src="/logo.png"
                alt="لایکینو"
                width={80}
                height={30}
                className="h-8 w-auto"
              />
            </div>

            {/* User Icon - سمت راست */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-4 py-2 rounded-full hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 shadow-xl flex items-center justify-center border border-white/20 backdrop-blur-sm relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaUser className="w-4 h-4 relative z-10 ml-2" />
                  <span className="relative z-10 text-sm">پنل کاربری</span>
                </Link>
                <button
                  onClick={signOut}
                  className="bg-red-500/20 text-red-600 p-3 rounded-full hover:bg-red-500/30 transition-all duration-300 shadow-xl flex items-center justify-center border border-red-500/30 backdrop-blur-sm relative group"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white p-3 rounded-full hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 shadow-xl flex items-center justify-center border border-white/20 backdrop-blur-sm relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <FaUser className="w-5 h-5 relative z-10" />
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 border-t border-white/20 pt-4">
              <nav className="flex flex-col">
                <Link 
                  href="/" 
                  className="text-primary-text/90 hover:text-primary-highlight transition-all duration-300 font-regular py-3 px-4 rounded-2xl hover:bg-white/30 hover:backdrop-blur-sm border-b border-white/10 relative group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">صفحه اصلی</span>
                </Link>
                <Link 
                  href="/services" 
                  className="text-primary-text/90 hover:text-primary-highlight transition-all duration-300 font-regular py-3 px-4 rounded-2xl hover:bg-white/30 hover:backdrop-blur-sm border-b border-white/10 relative group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">خدمات ما</span>
                </Link>
                <Link 
                  href="/orders" 
                  className="text-primary-text/90 hover:text-primary-highlight transition-all duration-300 font-regular py-3 px-4 rounded-2xl hover:bg-white/30 hover:backdrop-blur-sm border-b border-white/10 relative group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">پیگیری سفارش</span>
                </Link>
                <Link 
                  href="/blog" 
                  className="text-primary-text/90 hover:text-primary-highlight transition-all duration-300 font-regular py-3 px-4 rounded-2xl hover:bg-white/30 hover:backdrop-blur-sm border-b border-white/10 relative group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">بلاگ</span>
                </Link>
                <Link 
                  href="/support" 
                  className="text-primary-text/90 hover:text-primary-highlight transition-all duration-300 font-regular py-3 px-4 rounded-2xl hover:bg-white/30 hover:backdrop-blur-sm relative group"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">پشتیبانی</span>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes waveMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes droplet {
          0%, 100% { 
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