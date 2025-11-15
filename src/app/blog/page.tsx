'use client';

import { Header, Footer } from '../../components';
import { FaCalendarAlt, FaUser, FaEye, FaTags, FaSearch, FaFilter } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  views: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');

  // نمونه مقالات بلاگ
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'راهنمای کامل افزایش فالوور اینستاگرام در سال ۱۴۰۳',
      excerpt:
        'در این مقاله، بهترین روش‌های افزایش فالوور اینستاگرام را بررسی می‌کنیم و نکات مهم برای رشد حساب کاربری شما را ارائه می‌دهیم.',
      content: 'محتوی کامل مقاله...',
      author: 'تیم لایکینو',
      date: '۱۴۰۲/۱۰/۲۰',
      readTime: '۸ دقیقه',
      views: '۲,۵۴۷',
      category: 'اینستاگرام',
      tags: ['فالوور', 'اینستاگرام', 'رشد'],
      image: '/images/blog/instagram-growth.jpg',
      featured: true,
    },
    {
      id: '2',
      title: 'چگونه محتوای جذاب برای تیک‌تاک تولید کنیم؟',
      excerpt:
        'تیک‌تاک یکی از محبوب‌ترین پلتفرم‌های شبکه اجتماعی است. در این مقاله، اصول تولید محتوای جذاب را یاد می‌گیرید.',
      content: 'محتوی کامل مقاله...',
      author: 'سارا احمدی',
      date: '۱۴۰۲/۱۰/۱۸',
      readTime: '۶ دقیقه',
      views: '۱,۸۹۲',
      category: 'تیک‌تاک',
      tags: ['تیک‌تاک', 'محتوا', 'ویدیو'],
      image: '/images/blog/tiktok-content.jpg',
    },
    {
      id: '3',
      title: 'استراتژی‌های بازاریابی در یوتیوب برای کسب‌وکارها',
      excerpt:
        'یوتیوب فرصت‌های بی‌نظیری برای بازاریابی و تبلیغات فراهم می‌کند. در این مقاله، استراتژی‌های موثر را بررسی می‌کنیم.',
      content: 'محتوی کامل مقاله...',
      author: 'محمد رضایی',
      date: '۱۴۰۲/۱۰/۱۵',
      readTime: '۱۰ دقیقه',
      views: '۳,۲۱۴',
      category: 'یوتیوب',
      tags: ['یوتیوب', 'بازاریابی', 'تبلیغات'],
      image: '/images/blog/youtube-marketing.jpg',
    },
    {
      id: '4',
      title: 'نکات مهم برای افزایش تعامل در توییتر',
      excerpt:
        'توییتر پلتفرمی است که تعامل و گفتگو در آن اهمیت زیادی دارد. در این مقاله، روش‌های افزایش تعامل را بررسی می‌کنیم.',
      content: 'محتوی کامل مقاله...',
      author: 'فاطمه کریمی',
      date: '۱۴۰۲/۱۰/۱۲',
      readTime: '۵ دقیقه',
      views: '۱,۵۶۷',
      category: 'توییتر',
      tags: ['توییتر', 'تعامل', 'شبکه‌سازی'],
      image: '/images/blog/twitter-engagement.jpg',
    },
    {
      id: '5',
      title: 'راهنمای انتخاب بهترین سرویس افزایش فالوور',
      excerpt:
        'انتخاب سرویس مناسب برای افزایش فالوور بسیار مهم است. در این مقاله، معیارهای انتخاب را بررسی می‌کنیم.',
      content: 'محتوی کامل مقاله...',
      author: 'علی محمدی',
      date: '۱۴۰۲/۱۰/۱۰',
      readTime: '۷ دقیقه',
      views: '۲,۸۹۱',
      category: 'راهنما',
      tags: ['فالوور', 'سرویس', 'انتخاب'],
      image: '/images/blog/choose-service.jpg',
    },
    {
      id: '6',
      title: 'تاثیر شبکه‌های اجتماعی بر کسب‌وکارهای آنلاین',
      excerpt:
        'شبکه‌های اجتماعی نقش مهمی در موفقیت کسب‌وکارهای آنلاین دارند. در این مقاله، این تاثیرات را بررسی می‌کنیم.',
      content: 'محتوی کامل مقاله...',
      author: 'زهرا نوری',
      date: '۱۴۰۲/۱۰/۰۸',
      readTime: '۹ دقیقه',
      views: '۲,۳۴۵',
      category: 'کسب‌وکار',
      tags: ['کسب‌وکار', 'آنلاین', 'شبکه‌های اجتماعی'],
      image: '/images/blog/social-business.jpg',
    },
  ];

  const categories = ['همه', 'اینستاگرام', 'تیک‌تاک', 'یوتیوب', 'توییتر', 'راهنما', 'کسب‌وکار'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'همه' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-primary-text mb-6 text-4xl font-bold lg:text-5xl">
            <span className="text-[#279EFD]">بلاگ</span> لایکینو
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            آخرین اخبار، نکات و راهنماهای مربوط به شبکه‌های اجتماعی و خدمات لایکینو
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="جستجو در مقالات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-primary-text w-full rounded-2xl border border-white/30 bg-white/20 px-6 py-3 placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-[#279EFD] focus:ring-2 focus:ring-[#279EFD]/20 focus:outline-none"
              />
              <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-[#279EFD]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-primary-text rounded-2xl border border-white/30 bg-white/20 px-4 py-3 backdrop-blur-sm transition-all duration-300 focus:border-[#279EFD] focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-primary-text mb-8 text-center text-2xl font-bold">مقاله ویژه</h2>
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-500 hover:border-[#279EFD]/30">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="rounded-full bg-[#279EFD] px-3 py-1 text-sm font-bold text-white">
                      {featuredPost.category}
                    </span>
                    <span className="text-sm text-gray-400">{featuredPost.readTime}</span>
                  </div>

                  <h3 className="text-primary-text mb-4 text-2xl leading-tight font-bold lg:text-3xl">
                    {featuredPost.title}
                  </h3>

                  <p className="mb-6 leading-relaxed text-gray-600">{featuredPost.excerpt}</p>

                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaUser />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEye />
                        <span>{featuredPost.views}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-block rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-8 py-3 font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]"
                  >
                    ادامه مطلب
                  </Link>
                </div>

                <div className="flex items-center justify-center bg-gradient-to-br from-[#279EFD]/20 to-[#1565C0]/20 p-8 lg:p-12">
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-[#279EFD] to-[#1565C0]">
                      <FaTags className="text-4xl text-white" />
                    </div>
                    <p className="text-gray-600">تصویر مقاله</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-primary-text mb-8 text-center text-2xl font-bold">آخرین مقالات</h2>

          {regularPosts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600">هیچ مقاله‌ای یافت نشد.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-500 hover:border-[#279EFD]/30"
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="rounded-full bg-[#279EFD]/20 px-3 py-1 text-sm font-bold text-[#279EFD]">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-400">{post.readTime}</span>
                    </div>

                    <h3 className="text-primary-text mb-4 text-xl leading-tight font-bold transition-colors duration-300 group-hover:text-[#279EFD]">
                      {post.title}
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>

                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaUser />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaEye />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-block rounded-xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-6 py-2 text-sm font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]"
                    >
                      ادامه مطلب
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-3xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-12 text-white">
            <h2 className="mb-4 text-3xl font-bold">عضویت در خبرنامه</h2>
            <p className="mb-8 text-xl opacity-90">از آخرین مقالات و اخبار لایکینو باخبر شوید</p>
            <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 rounded-2xl px-6 py-4 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none"
              />
              <button className="rounded-2xl bg-white px-8 py-4 font-bold text-[#279EFD] transition-all duration-300 hover:bg-gray-100">
                عضویت
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
