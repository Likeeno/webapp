'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'علی احمدی',
    platform: 'اینستاگرام',
    rating: 5,
    comment:
      'خدمات فوق‌العاده! فالوورهای واقعی و با کیفیت دریافت کردم. پشتیبانی هم خیلی سریع پاسخ می‌داد.',
    date: '2 روز پیش',
  },
  {
    id: 2,
    name: 'سارا محمدی',
    platform: 'تیک تاک',
    rating: 5,
    comment:
      'برای اولین بار از لایکینو استفاده کردم و واقعاً راضی شدم. قیمت‌ها مناسب و تحویل سریع بود.',
    date: '1 هفته پیش',
  },
  {
    id: 3,
    name: 'محمد رضایی',
    platform: 'یوتیوب',
    rating: 5,
    comment:
      'بیش از 6 ماه است که از خدمات لایکینو استفاده می‌کنم. هیچ‌وقت مشکلی نداشتم و همیشه راضی بودم.',
    date: '2 هفته پیش',
  },
  {
    id: 4,
    name: 'فاطمه کریمی',
    platform: 'اینستاگرام',
    rating: 5,
    comment:
      'جبران ریزش عالی کار می‌کند. چند بار فالوور ریزش داشت ولی خودکار جبران شد. واقعاً قابل اعتماد.',
    date: '3 هفته پیش',
  },
  {
    id: 5,
    name: 'حسین نوری',
    platform: 'توییتر',
    rating: 5,
    comment:
      'پشتیبانی 24 ساعته واقعاً عالی است. هر سوالی داشتم فوراً پاسخ دادند. کیفیت خدمات هم فوق‌العاده.',
    date: '1 ماه پیش',
  },
];

export default function Testimonials() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-primary-text mb-16 text-center text-4xl font-bold">نظرات مشتریان</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          speed={800}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="mx-auto flex min-h-[300px] max-w-3xl items-center rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
                <div className="w-full text-center">
                  {/* Rating */}
                  <div className="mb-6 flex justify-center">{renderStars(testimonial.rating)}</div>

                  {/* Comment */}
                  <blockquote className="mb-6 text-lg leading-relaxed text-gray-700">
                    &ldquo;{testimonial.comment}&rdquo;
                  </blockquote>

                  {/* Customer Info */}
                  <div>
                    <h4 className="text-primary-text text-lg font-bold">{testimonial.name}</h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Pagination */}
          <div className="swiper-pagination !bottom-0 !mt-8"></div>
        </Swiper>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <div className="min-w-[120px] text-center">
            <div className="mb-2 text-3xl font-bold text-[#279EFD]">۱۰,۰۰۰+</div>
            <div className="text-gray-600">مشتری راضی</div>
          </div>
          <div className="min-w-[120px] text-center">
            <div className="mb-2 text-3xl font-bold text-[#279EFD]">۵۰,۰۰۰+</div>
            <div className="text-gray-600">سفارش موفق</div>
          </div>
          <div className="min-w-[120px] text-center">
            <div className="mb-2 text-3xl font-bold text-[#279EFD]">۴.۹</div>
            <div className="text-gray-600">امتیاز کلی</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .testimonials-swiper .swiper-button-next,
        .testimonials-swiper .swiper-button-prev {
          color: #6b7280;
          display: none;
        }

        @media (min-width: 1024px) {
          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            display: flex;
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
            transition: box-shadow 0.2s;
          }

          .testimonials-swiper .swiper-button-next:hover,
          .testimonials-swiper .swiper-button-prev:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
        }

        .testimonials-swiper .swiper-button-next:after,
        .testimonials-swiper .swiper-button-prev:after {
          display: none;
        }

        .testimonials-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #279efd;
          transform: scale(1.25);
        }
      `}</style>
    </section>
  );
}
