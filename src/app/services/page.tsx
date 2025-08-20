'use client';

import { Header, Footer } from '../../components';
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaUsers, FaCheck, FaStar, FaClock, FaShieldAlt, FaHeadset } from 'react-icons/fa';
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
        'پشتیبانی ۲۴/۷'
      ],
      packages: [
        { name: 'پکیج برنزی', quantity: '۱۰۰۰', price: '۵۰,۰۰۰', delivery: '۲۴ ساعت' },
        { name: 'پکیج نقره‌ای', quantity: '۲۵۰۰', price: '۱۲۰,۰۰۰', delivery: '۱۲ ساعت', popular: true },
        { name: 'پکیج طلایی', quantity: '۵۰۰۰', price: '۲۲۰,۰۰۰', delivery: '۶ ساعت' },
        { name: 'پکیج الماس', quantity: '۱۰,۰۰۰', price: '۴۰۰,۰۰۰', delivery: '۳ ساعت' }
      ]
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
        'امنیت کامل'
      ],
      packages: [
        { name: 'پکیج برنزی', quantity: '۵۰۰', price: '۴۰,۰۰۰', delivery: '۲۴ ساعت' },
        { name: 'پکیج نقره‌ای', quantity: '۱۲۰۰', price: '۹۰,۰۰۰', delivery: '۱۲ ساعت', popular: true },
        { name: 'پکیج طلایی', quantity: '۲۵۰۰', price: '۱۸۰,۰۰۰', delivery: '۶ ساعت' },
        { name: 'پکیج الماس', quantity: '۵۰۰۰', price: '۳۵۰,۰۰۰', delivery: '۳ ساعت' }
      ]
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
        'رعایت قوانین یوتیوب'
      ],
      packages: [
        { name: 'پکیج برنزی', quantity: '۱۰۰۰', price: '۸۰,۰۰۰', delivery: '۴۸ ساعت' },
        { name: 'پکیج نقره‌ای', quantity: '۲۵۰۰', price: '۱۸۰,۰۰۰', delivery: '۲۴ ساعت', popular: true },
        { name: 'پکیج طلایی', quantity: '۵۰۰۰', price: '۳۵۰,۰۰۰', delivery: '۱۲ ساعت' },
        { name: 'پکیج الماس', quantity: '۱۰,۰۰۰', price: '۶۵۰,۰۰۰', delivery: '۶ ساعت' }
      ]
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
        'پشتیبانی فوری'
      ],
      packages: [
        { name: 'پکیج برنزی', quantity: '۵۰۰', price: '۳۰,۰۰۰', delivery: '۲۴ ساعت' },
        { name: 'پکیج نقره‌ای', quantity: '۱۲۰۰', price: '۷۰,۰۰۰', delivery: '۱۲ ساعت', popular: true },
        { name: 'پکیج طلایی', quantity: '۲۵۰۰', price: '۱۴۰,۰۰۰', delivery: '۶ ساعت' },
        { name: 'پکیج الماس', quantity: '۵۰۰۰', price: '۲۷۰,۰۰۰', delivery: '۳ ساعت' }
      ]
    }
  ];

  const platforms = [
    { id: 'all', name: 'همه', icon: FaUsers },
    { id: 'instagram', name: 'اینستاگرام', icon: FaInstagram },
    { id: 'tiktok', name: 'تیک‌تاک', icon: FaTiktok },
    { id: 'youtube', name: 'یوتیوب', icon: FaYoutube },
    { id: 'twitter', name: 'توییتر', icon: FaTwitter }
  ];

  const filteredServices = selectedPlatform === 'all' 
    ? services 
    : services.filter(service => service.id === selectedPlatform);

  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-text mb-6">
            <span className="text-[#279EFD]">خدمات</span> لایکینو
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ارائه بهترین خدمات افزایش فالوور، لایک، بازدید و کامنت برای تمام شبکه‌های اجتماعی
          </p>
        </div>
      </section>

      {/* Platform Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map(platform => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? 'bg-[#279EFD] text-white shadow-xl'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-primary-text hover:bg-white/20'
                }`}
              >
                {React.createElement(platform.icon, { className: "text-xl" })}
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {filteredServices.map(service => (
              <div key={service.id} className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 hover:border-[#279EFD]/30 transition-all duration-500">
                {/* Service Header */}
                <div className={`${service.bgColor} p-8 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    {React.createElement(service.icon, { className: "text-4xl" })}
                    <div>
                      <h3 className="text-2xl font-bold">{service.name}</h3>
                      <p className="opacity-90">{service.description}</p>
                    </div>
                  </div>
                </div>

                {/* Service Features */}
                <div className="p-8">
                  <h4 className="text-lg font-bold text-primary-text mb-6">ویژگی‌های سرویس</h4>
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FaCheck className="text-green-500 text-sm" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Service Packages */}
                  <h4 className="text-lg font-bold text-primary-text mb-6">پکیج‌های موجود</h4>
                  <div className="space-y-4">
                    {service.packages.map((pkg, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-2xl border transition-all duration-300 ${
                          pkg.popular 
                            ? 'border-[#279EFD] bg-[#279EFD]/10' 
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-bold text-primary-text">{pkg.name}</h5>
                          {pkg.popular && (
                            <span className="bg-[#279EFD] text-white px-3 py-1 rounded-full text-xs font-bold">
                              محبوب
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">تعداد:</span>
                            <div className="font-bold text-primary-text">{pkg.quantity}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">قیمت:</span>
                            <div className="font-bold text-[#279EFD]">{pkg.price} تومان</div>
                          </div>
                          <div>
                            <span className="text-gray-500">تحویل:</span>
                            <div className="font-bold text-primary-text">{pkg.delivery}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full mt-6 bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white py-4 rounded-2xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300">
                    سفارش {service.platform}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-text text-center mb-12">چرا لایکینو؟</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-primary-text mb-2">امنیت کامل</h3>
              <p className="text-gray-600 text-sm">تمام خدمات ما کاملاً امن و بدون نیاز به رمز عبور ارائه می‌شوند</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-primary-text mb-2">تحویل فوری</h3>
              <p className="text-gray-600 text-sm">سفارشات شما در کمترین زمان ممکن تحویل داده می‌شوند</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-primary-text mb-2">پشتیبانی ۲۴/۷</h3>
              <p className="text-gray-600 text-sm">تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده خدمت‌رسانی است</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-white text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-primary-text mb-2">کیفیت برتر</h3>
              <p className="text-gray-600 text-sm">ارائه بهترین کیفیت خدمات با بالاترین استانداردها</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">آمار و ارقام لایکینو</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">۵۰,۰۰۰+</div>
                <div className="opacity-90">مشتری راضی</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">۱۰۰,۰۰۰+</div>
                <div className="opacity-90">سفارش موفق</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">۲۴/۷</div>
                <div className="opacity-90">پشتیبانی</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">۹۹%</div>
                <div className="opacity-90">رضایت مشتری</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl font-bold text-primary-text mb-4">آماده شروع هستید؟</h2>
            <p className="text-xl text-gray-600 mb-8">همین حالا سفارش خود را ثبت کنید و شاهد رشد حساب کاربری خود باشید</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300">
                شروع سفارش
              </button>
              <a 
                href="/support" 
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-primary-text px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
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