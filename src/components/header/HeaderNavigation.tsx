'use client';

import HeaderNavLink from './HeaderNavLink';

export default function HeaderNavigation() {
  return (
    <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center lg:flex">
      <div className="flex items-center gap-4">
        <HeaderNavLink href="/">صفحه اصلی</HeaderNavLink>
        <HeaderNavLink href="/services">خدمات ما</HeaderNavLink>
        <HeaderNavLink href="/orders">پیگیری سفارش</HeaderNavLink>
        <HeaderNavLink href="/blog">بلاگ</HeaderNavLink>
        <HeaderNavLink href="/support">پشتیبانی</HeaderNavLink>
      </div>
    </nav>
  );
}
