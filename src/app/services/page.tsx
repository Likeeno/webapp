'use client';

import { Header, Footer } from '../../components';
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaUsers,
  FaCheck,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaHeadset,
} from 'react-icons/fa';
import { useState } from 'react';
import React from 'react';

interface Service {
  id: string;
  platform: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  packages: Package[];
  color: string;
  bgColor: string;
}

interface Package {
  name: string;
  quantity: string;
  price: string;
  delivery: string;
  popular?: boolean;
}

export default function ServicesPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const services: Service[] = [
    {
      id: 'instagram',
      platform: 'اینستاگرام',
      name: 'خدمات اینستاگرام',
      description: 'افزایش فالوور، لایک، بازدید و کامنت برای پست‌ها و استوری‌های اینستاگرام',
      icon: FaInstagram,
      color: '#E4405F',
      bgColor: 'bg-gradient-to-r from-[#E4405F] to-[#C13584]',
      features: [
        'افزایش فالوور واقعی و فعال',
        'لایک و کامنت طبیعی',
        'بازدید استوری و پست',
        'تحویل فوری و امن',
        'بدون نیاز به رمز عبور',
        'پشتیبانی ۲۴/۷',
      ],
      packages: [
        { name: 'پکیج برنزی', quantity: '۱۰۰۰', price: '۵۰,۰۰۰', delivery: '۲۴ ساعت' },
        {
          name: 'پکیج نقره‌ای',
          quantity: '۲۵۰۰',
          price: '۱۲۰,۰۰۰',
          delivery: '۱۲ ساعت',
          popular: true,
        },
        { name: 'پکیج طلایی', quantity: '۵۰۰۰', price: '۲۲۰,۰۰۰', delivery: '۶ ساعت' },
        { name: 'پکیج الماس', quantity: '۱۰,۰۰۰', price: '۴۰۰,۰۰۰', delivery: '۳ ساعت' },
      ],
    },
    {
      id: 'tiktok',
      platform: 'تیک‌تاک',
      name: 'خدمات تیک‌تاک',
      description: 'افزایش فالوور، لایک و بازدید برای ویدیوهای تیک‌تاک',
      icon: FaTiktok,
      color: '#000000',
      bgColor: 'bg-gradient-to-r from-[#000000] to-[#25F4EE]',
      features: [
        'افزایش فالوور تیک‌تاک',
        'لایک و کامنت ویدیوها',
        'بازدید ویدیو',
        'تحویل سریع',
        'حساب‌های واقعی',
        'امنیت کامل',
      ],
      packages: [
        { name: 'پکیج برنزی', quantity: '۵۰۰', price: '۴۰,۰۰۰', delivery: '۲۴ ساعت' },
        {
          name: 'پکیج نقره‌ای',
          quantity: '۱۲۰۰',
          price: '۹۰,۰۰۰',
          delivery: '۱۲ ساعت',
          popular: true,
        },
        { name: 'پکیج طلایی', quantity: '۲۵۰۰', price: '۱۸۰,۰۰۰', delivery: '۶ ساعت' },
        { name: 'پکیج الماس', quantity: '۵۰۰۰', price: '۳۵۰,۰۰۰', delivery: '۳ ساعت' },
      ],
    },
    {
      id: 'youtube',
      platform: 'یوتیوب',
      name: 'خدمات یوتیوب',
      description: 'افزایش بازدید، لایک و کامنت برای ویدیوهای یوتیوب',
      icon: FaYoutube,
      color: '#FF0000',
      bgColor: 'bg-gradient-to-r from-[#FF0000] to-[#FF6B6B]',
      features: [
        'افزایش بازدید ویدیو',
        'لایک و کامنت',
        'افزایش ساب‌اسکرایبر',
        'تحویل تدریجی',
        'بازدیدهای واقعی',
        'رعایت قوانین یوتیوب',
      ],
      packages: [
        { name: 'پکیج برنزی', quantity: '۱۰۰۰', price: '۸۰,۰۰۰', delivery: '۴۸ ساعت' },
        {
          name: 'پکیج نقره‌ای',
          quantity: '۲۵۰۰',
          price: '۱۸۰,۰۰۰',
          delivery: '۲۴ ساعت',
          popular: true,
        },
        { name: 'پکیج طلایی', quantity: '۵۰۰۰', price: '۳۵۰,۰۰۰', delivery: '۱۲ ساعت' },
        { name: 'پکیج الماس', quantity: '۱۰,۰۰۰', price: '۶۵۰,۰۰۰', delivery: '۶ ساعت' },
      ],
    },
    {
      id: 'twitter',
      platform: 'توییتر',
      name: 'خدمات توییتر',
      description: 'افزایش فالوور، ریتویت و لایک برای توییت‌ها',
      icon: FaTwitter,
      color: '#1DA1F2',
      bgColor: 'bg-gradient-to-r from-[#1DA1F2] to-[#0D8BD9]',
      features: [
        'افزایش فالوور توییتر',
        'ریتویت و لایک',
        'کامنت و منشن',
        'حساب‌های واقعی',
        'تحویل امن',
        'پشتیبانی فوری',
      ],
      packages: [
        { name: 'پکیج برنزی', quantity: '۵۰۰', price: '۳۰,۰۰۰', delivery: '۲۴ ساعت' },
        {
          name: 'پکیج نقره‌ای',
          quantity: '۱۲۰۰',
          price: '۷۰,۰۰۰',
          delivery: '۱۲ ساعت',
          popular: true,
        },
        { name: 'پکیج طلایی', quantity: '۲۵۰۰', price: '۱۴۰,۰۰۰', delivery: '۶ ساعت' },
        { name: 'پکیج الماس', quantity: '۵۰۰۰', price: '۲۷۰,۰۰۰', delivery: '۳ ساعت' },
      ],
    },
  ];

  const platforms = [
    { id: 'all', name: 'همه', icon: FaUsers },
    { id: 'instagram', name: 'اینستاگرام', icon: FaInstagram },
    { id: 'tiktok', name: 'تیک‌تاک', icon: FaTiktok },
    { id: 'youtube', name: 'یوتیوب', icon: FaYoutube },
    { id: 'twitter', name: 'توییتر', icon: FaTwitter },
  ];

  const filteredServices =
    selectedPlatform === 'all'
      ? services
      : services.filter((service) => service.id === selectedPlatform);

  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-primary-text mb-6 text-4xl font-bold lg:text-5xl">
            <span className="text-[#279EFD]">خدمات</span> لایکینو
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            ارائه بهترین خدمات افزایش فالوور، لایک، بازدید و کامنت برای تمام شبکه‌های اجتماعی
          </p>
        </div>
      </section>

      {/* Platform Filter */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-3 rounded-2xl px-6 py-3 font-bold transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? 'bg-[#279EFD] text-white shadow-xl'
                    : 'text-primary-text border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20'
                }`}
              >
                {React.createElement(platform.icon, { className: 'text-xl' })}
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-500 hover:border-[#279EFD]/30"
              >
                {/* Service Header */}
                <div className={`${service.bgColor} p-8 text-white`}>
                  <div className="mb-4 flex items-center gap-4">
                    {React.createElement(service.icon, { className: 'text-4xl' })}
                    <div>
                      <h3 className="text-2xl font-bold">{service.name}</h3>
                      <p className="opacity-90">{service.description}</p>
                    </div>
                  </div>
                </div>

                {/* Service Features */}
                <div className="p-8">
                  <h4 className="text-primary-text mb-6 text-lg font-bold">ویژگی‌های سرویس</h4>
                  <div className="mb-8 grid gap-4 sm:grid-cols-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FaCheck className="text-sm text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Service Packages */}
                  <h4 className="text-primary-text mb-6 text-lg font-bold">پکیج‌های موجود</h4>
                  <div className="space-y-4">
                    {service.packages.map((pkg, index) => (
                      <div
                        key={index}
                        className={`rounded-2xl border p-4 transition-all duration-300 ${
                          pkg.popular
                            ? 'border-[#279EFD] bg-[#279EFD]/10'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h5 className="text-primary-text font-bold">{pkg.name}</h5>
                          {pkg.popular && (
                            <span className="rounded-full bg-[#279EFD] px-3 py-1 text-xs font-bold text-white">
                              محبوب
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">تعداد:</span>
                            <div className="text-primary-text font-bold">{pkg.quantity}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">قیمت:</span>
                            <div className="font-bold text-[#279EFD]">{pkg.price} تومان</div>
                          </div>
                          <div>
                            <span className="text-gray-500">تحویل:</span>
                            <div className="text-primary-text font-bold">{pkg.delivery}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-4 font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]">
                    سفارش {service.platform}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-primary-text mb-12 text-center text-3xl font-bold">چرا لایکینو؟</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#279EFD] to-[#1565C0]">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <h3 className="text-primary-text mb-2 text-lg font-bold">امنیت کامل</h3>
              <p className="text-sm text-gray-600">
                تمام خدمات ما کاملاً امن و بدون نیاز به رمز عبور ارائه می‌شوند
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#279EFD] to-[#1565C0]">
                <FaClock className="text-2xl text-white" />
              </div>
              <h3 className="text-primary-text mb-2 text-lg font-bold">تحویل فوری</h3>
              <p className="text-sm text-gray-600">
                سفارشات شما در کمترین زمان ممکن تحویل داده می‌شوند
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#279EFD] to-[#1565C0]">
                <FaHeadset className="text-2xl text-white" />
              </div>
              <h3 className="text-primary-text mb-2 text-lg font-bold">پشتیبانی ۲۴/۷</h3>
              <p className="text-sm text-gray-600">
                تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده خدمت‌رسانی است
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#279EFD] to-[#1565C0]">
                <FaStar className="text-2xl text-white" />
              </div>
              <h3 className="text-primary-text mb-2 text-lg font-bold">کیفیت برتر</h3>
              <p className="text-sm text-gray-600">
                ارائه بهترین کیفیت خدمات با بالاترین استانداردها
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-12 text-white">
            <h2 className="mb-12 text-center text-3xl font-bold">آمار و ارقام لایکینو</h2>

            <div className="grid gap-8 text-center md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mb-2 text-4xl font-bold">۵۰,۰۰۰+</div>
                <div className="opacity-90">مشتری راضی</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold">۱۰۰,۰۰۰+</div>
                <div className="opacity-90">سفارش موفق</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold">۲۴/۷</div>
                <div className="opacity-90">پشتیبانی</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold">۹۹%</div>
                <div className="opacity-90">رضایت مشتری</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-3xl border border-white/20 bg-white/10 p-12 backdrop-blur-xl">
            <h2 className="text-primary-text mb-4 text-3xl font-bold">آماده شروع هستید؟</h2>
            <p className="mb-8 text-xl text-gray-600">
              همین حالا سفارش خود را ثبت کنید و شاهد رشد حساب کاربری خود باشید
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]">
                شروع سفارش
              </button>
              <a
                href="/support"
                className="text-primary-text rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-lg font-bold backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                تماس با پشتیبانی
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
