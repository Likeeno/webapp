import { Header, Footer } from '../../components';
import {
  FaHeadset,
  FaWhatsapp,
  FaTelegram,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
} from 'react-icons/fa';

export default function SupportPage() {
  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-primary-text mb-6 text-4xl font-bold lg:text-5xl">
            <span className="text-[#279EFD]">پشتیبانی</span> ۲۴/۷
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            تیم پشتیبانی لایکینو آماده پاسخگویی به سوالات و حل مشکلات شما در تمام ساعات شبانه‌روز
            است
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* WhatsApp Support */}
            <div className="group rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#25D366]/30">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] transition-transform duration-300 group-hover:scale-110">
                  <FaWhatsapp className="text-2xl text-white" />
                </div>
                <h3 className="text-primary-text mb-4 text-xl font-bold">واتساپ</h3>
                <p className="mb-6 text-gray-600">پشتیبانی فوری از طریق واتساپ</p>
                <a
                  href="https://wa.me/989123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-3 font-bold text-white transition-all duration-300 hover:shadow-xl"
                >
                  شروع چت
                </a>
              </div>
            </div>

            {/* Telegram Support */}
            <div className="group rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#0088cc]/30">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#0088cc] to-[#005580] transition-transform duration-300 group-hover:scale-110">
                  <FaTelegram className="text-2xl text-white" />
                </div>
                <h3 className="text-primary-text mb-4 text-xl font-bold">تلگرام</h3>
                <p className="mb-6 text-gray-600">پشتیبانی از طریق کانال تلگرام</p>
                <a
                  href="https://t.me/likeeno_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-2xl bg-gradient-to-r from-[#0088cc] to-[#005580] px-6 py-3 font-bold text-white transition-all duration-300 hover:shadow-xl"
                >
                  عضویت در کانال
                </a>
              </div>
            </div>

            {/* Email Support */}
            <div className="group rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:border-[#279EFD]/30">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] transition-transform duration-300 group-hover:scale-110">
                  <FaEnvelope className="text-2xl text-white" />
                </div>
                <h3 className="text-primary-text mb-4 text-xl font-bold">ایمیل</h3>
                <p className="mb-6 text-gray-600">ارسال تیکت از طریق ایمیل</p>
                <a
                  href="mailto:support@likeeno.com"
                  className="inline-block rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-6 py-3 font-bold text-white transition-all duration-300 hover:shadow-xl"
                >
                  ارسال ایمیل
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-primary-text mb-12 text-center text-3xl font-bold">سوالات متداول</h2>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-primary-text mb-3 text-lg font-bold">
                چقدر طول می‌کشد تا سفارش تحویل شود؟
              </h3>
              <p className="text-gray-600">
                سفارشات معمولاً در مدت ۱ تا ۲۴ ساعت تحویل می‌شوند. زمان دقیق بستگی به نوع سرویس و
                حجم سفارش دارد.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-primary-text mb-3 text-lg font-bold">آیا خدمات شما امن است؟</h3>
              <p className="text-gray-600">
                بله، تمام خدمات ما کاملاً امن و بدون نیاز به رمز عبور ارائه می‌شوند. ما از روش‌های
                استاندارد و ایمن استفاده می‌کنیم.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-primary-text mb-3 text-lg font-bold">
                چطور می‌توانم سفارش خود را پیگیری کنم؟
              </h3>
              <p className="text-gray-600">
                پس از ثبت سفارش، کد پیگیری برای شما ارسال می‌شود که می‌توانید از طریق بخش
                &quot;پیگیری سفارش&quot; وضعیت آن را بررسی کنید.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-primary-text mb-3 text-lg font-bold">
                آیا امکان بازگشت وجه وجود دارد؟
              </h3>
              <p className="text-gray-600">
                در صورت عدم تحویل سفارش در زمان مقرر، وجه شما به طور کامل بازگردانده می‌شود.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <h3 className="text-primary-text mb-3 text-lg font-bold">
                از چه شبکه‌های اجتماعی پشتیبانی می‌کنید؟
              </h3>
              <p className="text-gray-600">
                ما از اینستاگرام، تیک‌تاک، یوتیوب و توییتر پشتیبانی می‌کنیم و خدمات متنوعی برای هر
                کدام ارائه می‌دهیم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-primary-text mb-12 text-center text-3xl font-bold">اطلاعات تماس</h2>

          <div className="grid justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center">
                <FaClock className="ml-3 text-xl text-[#279EFD]" />
                <h3 className="text-primary-text text-lg font-bold">ساعات کاری</h3>
              </div>
              <p className="text-gray-600">شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر</p>
              <p className="text-gray-600">پنجشنبه: ۹ صبح تا ۱ ظهر</p>
              <p className="text-gray-600">جمعه: تعطیل</p>
            </div>

            <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center">
                <FaPhone className="ml-3 text-xl text-[#279EFD]" />
                <h3 className="text-primary-text text-lg font-bold">تلفن تماس</h3>
              </div>
              <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
              <p className="text-gray-600">۰۹۱۲-۳۴۵-۶۷۸۹</p>
            </div>

            <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center">
                <FaEnvelope className="ml-3 text-xl text-[#279EFD]" />
                <h3 className="text-primary-text text-lg font-bold">ایمیل</h3>
              </div>
              <p className="text-gray-600">support@likeeno.com</p>
              <p className="text-gray-600">info@likeeno.com</p>
            </div>

            <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center">
                <FaMapMarkerAlt className="ml-3 text-xl text-[#279EFD]" />
                <h3 className="text-primary-text text-lg font-bold">آدرس</h3>
              </div>
              <p className="text-gray-600">تهران، خیابان ولیعصر</p>
              <p className="text-gray-600">برج لایکینو، طبقه ۵</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-3xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] p-12 text-white">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <FaHeadset className="text-3xl text-white" />
            </div>
            <h2 className="mb-4 text-3xl font-bold">نیاز به کمک فوری دارید؟</h2>
            <p className="mb-8 text-xl opacity-90">تیم پشتیبانی ما آماده پاسخگویی به شما است</p>
            <button className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-[#279EFD] transition-all duration-300 hover:bg-gray-100">
              شروع چت زنده
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
