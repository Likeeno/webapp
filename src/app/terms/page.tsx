'use client';

import { Header, Footer } from '../../components';
import { FaShieldAlt, FaUserCheck, FaLock, FaHandshake, FaGavel, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Terms Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-text mb-4">قوانین و شرایط لایکینو</h1>
            <p className="text-gray-600 text-lg">آخرین به‌روزرسانی: دی ۱۴۰۲</p>
          </div>

          {/* Terms Content */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            
            {/* Introduction */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaInfoCircle className="text-[#279EFD] text-xl" />
                <h2 className="text-2xl font-bold text-primary-text">مقدمه</h2>
              </div>
              <p className="text-gray-800 leading-relaxed">
                با استفاده از خدمات لایکینو، شما موافقت می‌کنید که این قوانین و شرایط را رعایت کنید. 
                لایکینو یک پلتفرم ارائه خدمات افزایش فالوور و لایک برای شبکه‌های اجتماعی است که 
                با رعایت قوانین و اصول اخلاقی فعالیت می‌کند.
              </p>
            </div>

            {/* User Responsibilities */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaUserCheck className="text-[#279EFD] text-xl" />
                <h2 className="text-2xl font-bold text-primary-text">مسئولیت‌های کاربر</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">استفاده قانونی</h3>
                                     <p className="text-gray-800 text-sm">
                     کاربران موظفند از خدمات لایکینو فقط برای اهداف قانونی و مشروع استفاده کنند.
                   </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">محتویات مناسب</h3>
                                     <p className="text-gray-800 text-sm">
                     محتویات ارسالی نباید شامل مطالب توهین‌آمیز، غیراخلاقی یا نقض کننده حقوق دیگران باشد.
                   </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">حساب کاربری</h3>
                                     <p className="text-gray-800 text-sm">
                     کاربران مسئول حفظ امنیت حساب کاربری خود و عدم اشتراک‌گذاری اطلاعات ورود هستند.
                   </p>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaLock className="text-[#279EFD] text-xl" />
                <h2 className="text-2xl font-bold text-primary-text">حریم خصوصی و امنیت</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">حفاظت از اطلاعات</h3>
                                     <p className="text-gray-800 text-sm">
                     لایکینو متعهد به حفاظت از اطلاعات شخصی کاربران و عدم اشتراک‌گذاری آن‌ها با اشخاص ثالث است.
                   </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">رمزگذاری داده‌ها</h3>
                                     <p className="text-gray-800 text-sm">
                     تمام اطلاعات کاربران با استفاده از پروتکل‌های امنیتی پیشرفته رمزگذاری می‌شود.
                   </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">دسترسی محدود</h3>
                                     <p className="text-gray-800 text-sm">
                     فقط کارکنان مجاز و ضروری به اطلاعات کاربران دسترسی دارند.
                   </p>
                </div>
              </div>
            </div>

            {/* Service Terms */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaHandshake className="text-[#279EFD] text-xl" />
                <h2 className="text-2xl font-bold text-primary-text">شرایط خدمات</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">کیفیت خدمات</h3>
                                     <p className="text-gray-800 text-sm">
                     لایکینو متعهد به ارائه خدمات با کیفیت بالا و پشتیبانی ۲۴/۷ است.
                   </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">زمان تحویل</h3>
                                     <p className="text-gray-800 text-sm">
                     خدمات معمولاً در بازه زمانی مشخص شده تحویل می‌شود، اما ممکن است به دلیل شرایط خاص تأخیر داشته باشد.
                   </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">بازگشت وجه</h3>
                                     <p className="text-gray-800 text-sm">
                     در صورت عدم رضایت از خدمات، امکان بازگشت وجه طبق شرایط مندرج در سیاست بازگشت وجود دارد.
                   </p>
                </div>
              </div>
            </div>

            {/* Prohibited Activities */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaExclamationTriangle className="text-red-500 text-xl" />
                <h2 className="text-2xl font-bold text-primary-text">فعالیت‌های ممنوع</h2>
              </div>
              <div className="space-y-3">
                                 <div className="flex items-start gap-3">
                   <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                   <p className="text-gray-800 text-sm">استفاده از ربات‌ها یا اسکریپت‌های خودکار</p>
                 </div>
                 <div className="flex items-start gap-3">
                   <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                   <p className="text-gray-800 text-sm">ایجاد حساب‌های جعلی یا تقلبی</p>
                 </div>
                 <div className="flex items-start gap-3">
                   <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                   <p className="text-gray-800 text-sm">نقض قوانین شبکه‌های اجتماعی</p>
                 </div>
                 <div className="flex items-start gap-3">
                   <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                   <p className="text-gray-800 text-sm">ارسال محتویات نامناسب یا غیرقانونی</p>
                 </div>
                 <div className="flex items-start gap-3">
                   <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                   <p className="text-gray-800 text-sm">تلاش برای هک یا نفوذ به سیستم</p>
                 </div>
              </div>
            </div>

            {/* Legal */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FaGavel className="text-[#279EFD] text-xl" />
                <h2 className="text-2xl font-bold text-primary-text">مسائل حقوقی</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">قانون حاکم</h3>
                                     <p className="text-gray-800 text-sm">
                     این قوانین و شرایط تحت قوانین جمهوری اسلامی ایران تفسیر و اجرا می‌شود.
                   </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">حل اختلاف</h3>
                                     <p className="text-gray-800 text-sm">
                     در صورت بروز اختلاف، ابتدا از طریق مذاکره و در صورت عدم حل، از طریق مراجع قضایی پیگیری می‌شود.
                   </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="font-bold text-primary-text mb-2">تغییرات قوانین</h3>
                                     <p className="text-gray-800 text-sm">
                     لایکینو حق تغییر این قوانین را در هر زمان با اطلاع قبلی کاربران محفوظ می‌دارد.
                   </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-[#279EFD]/20 to-[#1565C0]/20 rounded-2xl p-6 border border-[#279EFD]/30">
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-[#279EFD] text-xl" />
                <h2 className="text-xl font-bold text-primary-text">تماس با ما</h2>
              </div>
                             <p className="text-gray-800 text-sm mb-4">
                 در صورت داشتن سوال یا ابهام در مورد این قوانین، می‌توانید از طریق روش‌های زیر با ما تماس بگیرید:
               </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#279EFD] font-bold mb-1">ایمیل:</p>
                                     <p className="text-gray-800">support@likeeno.com</p>
                </div>
                <div>
                  <p className="text-[#279EFD] font-bold mb-1">تلگرام:</p>
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