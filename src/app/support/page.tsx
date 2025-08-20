import { Header, Footer } from '../../components';
import { FaHeadset, FaWhatsapp, FaTelegram, FaEnvelope, FaClock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-primary-text mb-6">
            <span className="text-[#279EFD]">پشتیبانی</span> ۲۴/۷
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            تیم پشتیبانی لایکینو آماده پاسخگویی به سوالات و حل مشکلات شما در تمام ساعات شبانه‌روز است
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* WhatsApp Support */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#25D366]/30 transition-all duration-500 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaWhatsapp className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-primary-text mb-4">واتساپ</h3>
                <p className="text-gray-600 mb-6">پشتیبانی فوری از طریق واتساپ</p>
                <a 
                  href="https://wa.me/989123456789" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-6 py-3 rounded-2xl font-bold hover:shadow-xl transition-all duration-300"
                >
                  شروع چت
                </a>
              </div>
            </div>

            {/* Telegram Support */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#0088cc]/30 transition-all duration-500 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0088cc] to-[#005580] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaTelegram className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-primary-text mb-4">تلگرام</h3>
                <p className="text-gray-600 mb-6">پشتیبانی از طریق کانال تلگرام</p>
                <a 
                  href="https://t.me/likeeno_support" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-[#0088cc] to-[#005580] text-white px-6 py-3 rounded-2xl font-bold hover:shadow-xl transition-all duration-300"
                >
                  عضویت در کانال
                </a>
              </div>
            </div>

            {/* Email Support */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#279EFD]/30 transition-all duration-500 group">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-primary-text mb-4">ایمیل</h3>
                <p className="text-gray-600 mb-6">ارسال تیکت از طریق ایمیل</p>
                <a 
                  href="mailto:support@likeeno.com" 
                  className="inline-block bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-6 py-3 rounded-2xl font-bold hover:shadow-xl transition-all duration-300"
                >
                  ارسال ایمیل
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-text text-center mb-12">سوالات متداول</h2>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-primary-text mb-3">چقدر طول می‌کشد تا سفارش تحویل شود؟</h3>
              <p className="text-gray-600">سفارشات معمولاً در مدت ۱ تا ۲۴ ساعت تحویل می‌شوند. زمان دقیق بستگی به نوع سرویس و حجم سفارش دارد.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-primary-text mb-3">آیا خدمات شما امن است؟</h3>
              <p className="text-gray-600">بله، تمام خدمات ما کاملاً امن و بدون نیاز به رمز عبور ارائه می‌شوند. ما از روش‌های استاندارد و ایمن استفاده می‌کنیم.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-primary-text mb-3">چطور می‌توانم سفارش خود را پیگیری کنم؟</h3>
              <p className="text-gray-600">پس از ثبت سفارش، کد پیگیری برای شما ارسال می‌شود که می‌توانید از طریق بخش &quot;پیگیری سفارش&quot; وضعیت آن را بررسی کنید.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-primary-text mb-3">آیا امکان بازگشت وجه وجود دارد؟</h3>
              <p className="text-gray-600">در صورت عدم تحویل سفارش در زمان مقرر، وجه شما به طور کامل بازگردانده می‌شود.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-primary-text mb-3">از چه شبکه‌های اجتماعی پشتیبانی می‌کنید؟</h3>
              <p className="text-gray-600">ما از اینستاگرام، تیک‌تاک، یوتیوب و توییتر پشتیبانی می‌کنیم و خدمات متنوعی برای هر کدام ارائه می‌دهیم.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-text text-center mb-12">اطلاعات تماس</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 w-full max-w-xs">
              <div className="flex items-center mb-4">
                <FaClock className="text-[#279EFD] text-xl ml-3" />
                <h3 className="text-lg font-bold text-primary-text">ساعات کاری</h3>
              </div>
              <p className="text-gray-600">شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر</p>
              <p className="text-gray-600">پنجشنبه: ۹ صبح تا ۱ ظهر</p>
              <p className="text-gray-600">جمعه: تعطیل</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 w-full max-w-xs">
              <div className="flex items-center mb-4">
                <FaPhone className="text-[#279EFD] text-xl ml-3" />
                <h3 className="text-lg font-bold text-primary-text">تلفن تماس</h3>
              </div>
              <p className="text-gray-600">۰۲۱-۱۲۳۴۵۶۷۸</p>
              <p className="text-gray-600">۰۹۱۲-۳۴۵-۶۷۸۹</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 w-full max-w-xs">
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-[#279EFD] text-xl ml-3" />
                <h3 className="text-lg font-bold text-primary-text">ایمیل</h3>
              </div>
              <p className="text-gray-600">support@likeeno.com</p>
              <p className="text-gray-600">info@likeeno.com</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 w-full max-w-xs">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-[#279EFD] text-xl ml-3" />
                <h3 className="text-lg font-bold text-primary-text">آدرس</h3>
              </div>
              <p className="text-gray-600">تهران، خیابان ولیعصر</p>
              <p className="text-gray-600">برج لایکینو، طبقه ۵</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] rounded-3xl p-12 text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeadset className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold mb-4">نیاز به کمک فوری دارید؟</h2>
            <p className="text-xl mb-8 opacity-90">تیم پشتیبانی ما آماده پاسخگویی به شما است</p>
            <button className="bg-white text-[#279EFD] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300">
              شروع چت زنده
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 