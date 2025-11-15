'use client';

import Link from 'next/link';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeaderMobileMenu({ isOpen, onClose }: HeaderMobileMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/services', label: 'خدمات ما' },
    { href: '/orders', label: 'پیگیری سفارش' },
    { href: '/blog', label: 'بلاگ' },
    { href: '/support', label: 'پشتیبانی' },
  ];

  return (
    <div className="mt-4 border-t border-white/20 pt-4 lg:hidden">
      <nav className="flex flex-col">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-primary-text/90 hover:text-primary-highlight font-regular group relative rounded-2xl border-b border-white/10 px-4 py-3 transition-all duration-300 hover:bg-white/30 hover:backdrop-blur-sm"
            onClick={onClose}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <span className="relative z-10">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
