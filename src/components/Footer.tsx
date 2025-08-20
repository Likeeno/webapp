import { FaTelegramPlane, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className=" border-t border-blue-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-primary-text mb-4">لایکینو</h3>
            <p className="text-gray-600 font-regular text-sm leading-relaxed">
              ارائه خدمات حرفه‌ای افزایش تعامل در شبکه‌های اجتماعی با کیفیت بالا و قیمت مناسب
            </p>
          </div>

          {/* Services */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-primary-text mb-4">خدمات ما</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 font-regular">افزایش فالوور</li>
              <li className="text-gray-600 font-regular">افزایش لایک</li>
              <li className="text-gray-600 font-regular">افزایش بازدید</li>
              <li className="text-gray-600 font-regular">افزایش کامنت</li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-primary-text mb-4">پلتفرم‌ها</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 font-regular">اینستاگرام</li>
              <li className="text-gray-600 font-regular">تیک تاک</li>
              <li className="text-gray-600 font-regular">یوتیوب</li>
              <li className="text-gray-600 font-regular">توییتر</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-primary-text mb-4">ارتباط با ما</h4>
            <div className="flex flex-col space-y-3">
              <a
                href="https://t.me/YourTelegramSupport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-gray-600 hover:text-[#279EFD] transition-colors"
              >
                <FaTelegramPlane className="text-lg" />
                <span className="text-sm font-regular">پشتیبانی تلگرام</span>
              </a>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" className="text-gray-400 hover:text-[#279EFD] transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#279EFD] transition-colors">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#279EFD] transition-colors">
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 font-regular text-sm text-center md:text-right">
              &copy; ۱۴۰۳ لایکینو. تمامی حقوق محفوظ است.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-[#279EFD] transition-colors font-regular">
                حریم خصوصی
              </a>
              <a href="#" className="text-gray-600 hover:text-[#279EFD] transition-colors font-regular">
                شرایط استفاده
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 