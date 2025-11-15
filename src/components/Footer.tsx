import { FaTelegramPlane, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-blue-100 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="text-center md:text-right">
            <h3 className="text-primary-text mb-4 text-xl font-bold">لایکینو</h3>
            <p className="font-regular text-sm leading-relaxed text-gray-600">
              ارائه خدمات حرفه‌ای افزایش تعامل در شبکه‌های اجتماعی با کیفیت بالا و قیمت مناسب
            </p>
          </div>

          {/* Services */}
          <div className="text-center md:text-right">
            <h4 className="text-primary-text mb-4 text-lg font-bold">خدمات ما</h4>
            <ul className="space-y-2 text-sm">
              <li className="font-regular text-gray-600">افزایش فالوور</li>
              <li className="font-regular text-gray-600">افزایش لایک</li>
              <li className="font-regular text-gray-600">افزایش بازدید</li>
              <li className="font-regular text-gray-600">افزایش کامنت</li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="text-center md:text-right">
            <h4 className="text-primary-text mb-4 text-lg font-bold">پلتفرم‌ها</h4>
            <ul className="space-y-2 text-sm">
              <li className="font-regular text-gray-600">اینستاگرام</li>
              <li className="font-regular text-gray-600">تیک تاک</li>
              <li className="font-regular text-gray-600">یوتیوب</li>
              <li className="font-regular text-gray-600">توییتر</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-primary-text mb-4 text-lg font-bold">ارتباط با ما</h4>
            <div className="flex flex-col space-y-3">
              <a
                href="https://t.me/YourTelegramSupport"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-gray-600 transition-colors hover:text-[#279EFD] md:justify-start"
              >
                <FaTelegramPlane className="text-lg" />
                <span className="font-regular text-sm">پشتیبانی تلگرام</span>
              </a>
              <div className="flex justify-center gap-4 md:justify-start">
                <a href="#" className="text-gray-400 transition-colors hover:text-[#279EFD]">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#279EFD]">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-[#279EFD]">
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-100 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-regular text-center text-sm text-gray-600 md:text-right">
              &copy; ۱۴۰۳ لایکینو. تمامی حقوق محفوظ است.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="font-regular text-gray-600 transition-colors hover:text-[#279EFD]"
              >
                حریم خصوصی
              </a>
              <a
                href="#"
                className="font-regular text-gray-600 transition-colors hover:text-[#279EFD]"
              >
                شرایط استفاده
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
