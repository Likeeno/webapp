'use client';

import Link from 'next/link';

interface HeaderNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function HeaderNavLink({ href, children }: HeaderNavLinkProps) {
  return (
    <Link
      href={href}
      className="text-primary-text/90 hover:text-primary-highlight font-regular group relative overflow-hidden rounded-2xl px-6 py-3 transition-all duration-500 hover:bg-gradient-to-r hover:from-white/30 hover:to-white/10 hover:shadow-xl hover:backdrop-blur-sm"
    >
      <div className="from-primary-highlight/20 via-primary-highlight/10 absolute inset-0 scale-0 transform rounded-2xl bg-gradient-to-r to-transparent opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"></div>
      <div className="absolute inset-0 -translate-x-full transform rounded-2xl bg-gradient-to-r from-white/40 to-transparent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"></div>
      <span className="relative z-10 font-medium">{children}</span>
    </Link>
  );
}
