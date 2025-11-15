'use client';

import { FaHome, FaBox, FaCreditCard, FaCog } from 'react-icons/fa';

interface MobileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function MobileNavigation({
  activeSection,
  onSectionChange,
}: MobileNavigationProps) {
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: FaHome },
    { id: 'orders', label: 'سفارشات', icon: FaBox },
    { id: 'wallet', label: 'کیف پول', icon: FaCreditCard },
    { id: 'settings', label: 'تنظیمات', icon: FaCog },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 border-t border-white/20 bg-white/10 px-4 py-2 shadow-xl backdrop-blur-xl">
      <div className="flex justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors duration-300 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white shadow-lg'
                  : 'text-primary-text bg-white/20'
              }`}
            >
              <Icon className="text-lg" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
