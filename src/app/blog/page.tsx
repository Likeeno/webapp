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
      excerpt: 'در این مقاله، بهترین روش‌های افزایش فالوور اینستاگرام را بررسی می‌کنیم و نکات مهم برای رشد حساب کاربری شما را ارائه می‌دهیم.',
      content: 'محتوی کامل مقاله...',
      author: 'تیم لایکینو',
      date: '۱۴۰۲/۱۰/۲۰',
      readTime: '۸ دقیقه',
      views: '۲,۵۴۷',
      category: 'اینستاگرام',
      tags: ['فالوور', 'اینستاگرام', 'رشد'],
      image: '/images/blog/instagram-growth.jpg',
      featured: true
    },
    {
      id: '2',
      title: 'چگونه محتوای جذاب برای تیک‌تاک تولید کنیم؟',
      excerpt: 'تیک‌تاک یکی از محبوب‌ترین پلتفرم‌های شبکه اجتماعی است. در این مقاله، اصول تولید محتوای جذاب را یاد می‌گیرید.',
      content: 'محتوی کامل مقاله...',
      author: 'سارا احمدی',
      date: '۱۴۰۲/۱۰/۱۸',
      readTime: '۶ دقیقه',
      views: '۱,۸۹۲',
      category: 'تیک‌تاک',
      tags: ['تیک‌تاک', 'محتوا', 'ویدیو'],
      image: '/images/blog/tiktok-content.jpg'
    },
    {
      id: '3',
      title: 'استراتژی‌های بازاریابی در یوتیوب برای کسب‌وکارها',
      excerpt: 'یوتیوب فرصت‌های بی‌نظیری برای بازاریابی و تبلیغات فراهم می‌کند. در این مقاله، استراتژی‌های موثر را بررسی می‌کنیم.',
      content: 'محتوی کامل مقاله...',
      author: 'محمد رضایی',
      date: '۱۴۰۲/۱۰/۱۵',
      readTime: '۱۰ دقیقه',
      views: '۳,۲۱۴',
      category: 'یوتیوب',
      tags: ['یوتیوب', 'بازاریابی', 'تبلیغات'],
      image: '/images/blog/youtube-marketing.jpg'
    },
    {
      id: '4',
      title: 'نکات مهم برای افزایش تعامل در توییتر',
      excerpt: 'توییتر پلتفرمی است که تعامل و گفتگو در آن اهمیت زیادی دارد. در این مقاله، روش‌های افزایش تعامل را بررسی می‌کنیم.',
      content: 'محتوی کامل مقاله...',
      author: 'فاطمه کریمی',
      date: '۱۴۰۲/۱۰/۱۲',
      readTime: '۵ دقیقه',
      views: '۱,۵۶۷',
      category: 'توییتر',
      tags: ['توییتر', 'تعامل', 'شبکه‌سازی'],
      image: '/images/blog/twitter-engagement.jpg'
    },
    {
      id: '5',
      title: 'راهنمای انتخاب بهترین سرویس افزایش فالوور',
      excerpt: 'انتخاب سرویس مناسب برای افزایش فالوور بسیار مهم است. در این مقاله، معیارهای انتخاب را بررسی می‌کنیم.',
      content: 'محتوی کامل مقاله...',
      author: 'علی محمدی',
      date: '۱۴۰۲/۱۰/۱۰',
      readTime: '۷ دقیقه',
      views: '۲,۸۹۱',
      category: 'راهنما',
      tags: ['فالوور', 'سرویس', 'انتخاب'],
      image: '/images/blog/choose-service.jpg'
    },
    {
      id: '6',
      title: 'تاثیر شبکه‌های اجتماعی بر کسب‌وکارهای آنلاین',
      excerpt: 'شبکه‌های اجتماعی نقش مهمی در موفقیت کسب‌وکارهای آنلاین دارند. در این مقاله، این تاثیرات را بررسی می‌کنیم.',
      content: 'محتوی کامل مقاله...',
      author: 'زهرا نوری',
      date: '۱۴۰۲/۱۰/۰۸',
      readTime: '۹ دقیقه',
      views: '۲,۳۴۵',
      category: 'کسب‌وکار',
      tags: ['کسب‌وکار', 'آنلاین', 'شبکه‌های اجتماعی'],
      image: '/images/blog/social-business.jpg'
    }
  ];

  const categories = ['همه', 'اینستاگرام', 'تیک‌تاک', 'یوتیوب', 'توییتر', 'راهنما', 'کسب‌وکار'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'همه' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-text mb-6">
            <span className="text-[#279EFD]">بلاگ</span> لایکینو
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            آخرین اخبار، نکات و راهنماهای مربوط به شبکه‌های اجتماعی و خدمات لایکینو
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="جستجو در مقالات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-primary-text placeholder-gray-400 focus:outline-none focus:border-[#279EFD] focus:ring-2 focus:ring-[#279EFD]/20 transition-all duration-300"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-[#279EFD]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-primary-text focus:outline-none focus:border-[#279EFD] transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-primary-text mb-8 text-center">مقاله ویژه</h2>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 hover:border-[#279EFD]/30 transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#279EFD] text-white px-3 py-1 rounded-full text-sm font-bold">
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-400 text-sm">{featuredPost.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-primary-text mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
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
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map(tag => (
                      <span key={tag} className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/blog/${featuredPost.id}`}
                    className="inline-block bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-8 py-3 rounded-2xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300"
                  >
                    ادامه مطلب
                  </Link>
                </div>
                
                <div className="bg-gradient-to-br from-[#279EFD]/20 to-[#1565C0]/20 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaTags className="text-white text-4xl" />
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-primary-text mb-8 text-center">آخرین مقالات</h2>
          
          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">هیچ مقاله‌ای یافت نشد.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map(post => (
                <article key={post.id} className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-[#279EFD]/30 transition-all duration-500 group">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-[#279EFD]/20 text-[#279EFD] px-3 py-1 rounded-full text-sm font-bold">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-sm">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-primary-text mb-4 leading-tight group-hover:text-[#279EFD] transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
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
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-white/10 px-2 py-1 rounded-full text-xs text-gray-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-block bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-6 py-2 rounded-xl font-bold text-sm hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300"
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
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">عضویت در خبرنامه</h2>
            <p className="text-xl mb-8 opacity-90">از آخرین مقالات و اخبار لایکینو باخبر شوید</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-[#279EFD] px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300">
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