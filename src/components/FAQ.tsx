'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'آیا خدمات شما امن و قانونی است؟',
    answer:
      'بله، تمام خدمات ما کاملاً امن و مطابق با قوانین پلتفرم‌های مختلف ارائه می‌شود. ما از روش‌های طبیعی و تدریجی برای افزایش تعامل استفاده می‌کنیم.',
  },
  {
    question: 'چقدر طول می‌کشد تا سفارش تحویل شود؟',
    answer:
      'زمان تحویل بسته به نوع سرویس متفاوت است. لایک و کامنت معمولاً در عرض چند ساعت، فالوور در 24-48 ساعت و بازدید در همان روز تحویل می‌شود.',
  },
  {
    question: 'آیا ریزش فالوور جبران می‌شود؟',
    answer:
      'بله، ما تضمین می‌کنیم که در صورت ریزش فالوور در 30 روز اول، به صورت خودکار جبران خواهد شد بدون نیاز به هماهنگی با پشتیبانی.',
  },
  {
    question: 'آیا می‌توانم چندین پلتفرم را همزمان سفارش دهم؟',
    answer:
      'بله، شما می‌توانید برای اینستاگرام، تیک تاک، یوتیوب و توییتر همزمان سفارش دهید. هر پلتفرم حساب کاربری جداگانه دارد.',
  },
  {
    question: 'آیا پشتیبانی 24 ساعته دارید؟',
    answer:
      'بله، تیم پشتیبانی ما 24/7 آماده پاسخگویی به سوالات و حل مشکلات شما است. می‌توانید از طریق چت آنلاین یا واتساپ با ما در ارتباط باشید.',
  },
  {
    question: 'آیا اطلاعات حساب من محفوظ می‌ماند؟',
    answer:
      'بله، تمام اطلاعات حساب شما کاملاً محرمانه و امن است. ما هیچ‌گونه اطلاعات شخصی شما را با شخص ثالث به اشتراک نمی‌گذاریم.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-primary-text mb-16 text-center text-4xl font-bold">سوالات متداول</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-4 text-right transition-colors hover:bg-gray-50"
              >
                <span className="text-primary-text text-lg font-bold">{faq.question}</span>
                <span
                  className={`text-2xl text-[#279EFD] transition-transform ${openIndex === index ? 'rotate-45' : ''}`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="font-regular leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
