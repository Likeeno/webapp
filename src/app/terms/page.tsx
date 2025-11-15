'use client';

import { Header, Footer } from '../../components';
import {
  FaShieldAlt,
  FaUserCheck,
  FaLock,
  FaHandshake,
  FaGavel,
  FaInfoCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

export default function TermsPage() {
  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      {/* Terms Section */}
      <section className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-primary-text mb-4 text-4xl font-bold">قوانین و شرایط لایکینو</h1>
            <p className="text-lg text-gray-600">آخرین به‌روزرسانی: دی ۱۴۰۲</p>
          </div>

          {/* Terms Content */}
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
            {/* Introduction */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <FaInfoCircle className="text-xl text-[#279EFD]" />
                <h2 className="text-primary-text text-2xl font-bold">مقدمه</h2>
              </div>
              <p className="leading-relaxed text-gray-800">
                با استفاده از خدمات لایکینو، شما موافقت می‌کنید که این قوانین و شرایط را رعایت کنید.
                لایکینو یک پلتفرم ارائه خدمات افزایش فالوور و لایک برای شبکه‌های اجتماعی است که با
                رعایت قوانین و اصول اخلاقی فعالیت می‌کند.
              </p>
            </div>

            {/* User Responsibilities */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <FaUserCheck className="text-xl text-[#279EFD]" />
                <h2 className="text-primary-text text-2xl font-bold">مسئولیت‌های کاربر</h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">استفاده قانونی</h3>
                  <p className="text-sm text-gray-800">
                    کاربران موظفند از خدمات لایکینو فقط برای اهداف قانونی و مشروع استفاده کنند.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">محتویات مناسب</h3>
                  <p className="text-sm text-gray-800">
                    محتویات ارسالی نباید شامل مطالب توهین‌آمیز، غیراخلاقی یا نقض کننده حقوق دیگران
                    باشد.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">حساب کاربری</h3>
                  <p className="text-sm text-gray-800">
                    کاربران مسئول حفظ امنیت حساب کاربری خود و عدم اشتراک‌گذاری اطلاعات ورود هستند.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <FaLock className="text-xl text-[#279EFD]" />
                <h2 className="text-primary-text text-2xl font-bold">حریم خصوصی و امنیت</h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">حفاظت از اطلاعات</h3>
                  <p className="text-sm text-gray-800">
                    لایکینو متعهد به حفاظت از اطلاعات شخصی کاربران و عدم اشتراک‌گذاری آن‌ها با اشخاص
                    ثالث است.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">رمزگذاری داده‌ها</h3>
                  <p className="text-sm text-gray-800">
                    تمام اطلاعات کاربران با استفاده از پروتکل‌های امنیتی پیشرفته رمزگذاری می‌شود.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">دسترسی محدود</h3>
                  <p className="text-sm text-gray-800">
                    فقط کارکنان مجاز و ضروری به اطلاعات کاربران دسترسی دارند.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Terms */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <FaHandshake className="text-xl text-[#279EFD]" />
                <h2 className="text-primary-text text-2xl font-bold">شرایط خدمات</h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">کیفیت خدمات</h3>
                  <p className="text-sm text-gray-800">
                    لایکینو متعهد به ارائه خدمات با کیفیت بالا و پشتیبانی ۲۴/۷ است.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">زمان تحویل</h3>
                  <p className="text-sm text-gray-800">
                    خدمات معمولاً در بازه زمانی مشخص شده تحویل می‌شود، اما ممکن است به دلیل شرایط
                    خاص تأخیر داشته باشد.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">بازگشت وجه</h3>
                  <p className="text-sm text-gray-800">
                    در صورت عدم رضایت از خدمات، امکان بازگشت وجه طبق شرایط مندرج در سیاست بازگشت
                    وجود دارد.
                  </p>
                </div>
              </div>
            </div>

            {/* Prohibited Activities */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <FaExclamationTriangle className="text-xl text-red-500" />
                <h2 className="text-primary-text text-2xl font-bold">فعالیت‌های ممنوع</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></div>
                  <p className="text-sm text-gray-800">استفاده از ربات‌ها یا اسکریپت‌های خودکار</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></div>
                  <p className="text-sm text-gray-800">ایجاد حساب‌های جعلی یا تقلبی</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></div>
                  <p className="text-sm text-gray-800">نقض قوانین شبکه‌های اجتماعی</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></div>
                  <p className="text-sm text-gray-800">ارسال محتویات نامناسب یا غیرقانونی</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></div>
                  <p className="text-sm text-gray-800">تلاش برای هک یا نفوذ به سیستم</p>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <FaGavel className="text-xl text-[#279EFD]" />
                <h2 className="text-primary-text text-2xl font-bold">مسائل حقوقی</h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">قانون حاکم</h3>
                  <p className="text-sm text-gray-800">
                    این قوانین و شرایط تحت قوانین جمهوری اسلامی ایران تفسیر و اجرا می‌شود.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">حل اختلاف</h3>
                  <p className="text-sm text-gray-800">
                    در صورت بروز اختلاف، ابتدا از طریق مذاکره و در صورت عدم حل، از طریق مراجع قضایی
                    پیگیری می‌شود.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <h3 className="text-primary-text mb-2 font-bold">تغییرات قوانین</h3>
                  <p className="text-sm text-gray-800">
                    لایکینو حق تغییر این قوانین را در هر زمان با اطلاع قبلی کاربران محفوظ می‌دارد.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-2xl border border-[#279EFD]/30 bg-gradient-to-r from-[#279EFD]/20 to-[#1565C0]/20 p-6">
              <div className="mb-4 flex items-center gap-3">
                <FaShieldAlt className="text-xl text-[#279EFD]" />
                <h2 className="text-primary-text text-xl font-bold">تماس با ما</h2>
              </div>
              <p className="mb-4 text-sm text-gray-800">
                در صورت داشتن سوال یا ابهام در مورد این قوانین، می‌توانید از طریق روش‌های زیر با ما
                تماس بگیرید:
              </p>
              <div className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <p className="mb-1 font-bold text-[#279EFD]">ایمیل:</p>
                  <p className="text-gray-800">support@likeeno.com</p>
                </div>
                <div>
                  <p className="mb-1 font-bold text-[#279EFD]">تلگرام:</p>
                  <p className="text-gray-800">@likeeno_support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
