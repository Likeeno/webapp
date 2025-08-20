import { FaTelegramPlane } from 'react-icons/fa';

export default function SupportBox() {
  return (
    <div className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 border border-blue-100 shadow-lg rounded-2xl p-6 w-full flex flex-col lg:flex-row items-center justify-between text-center lg:text-right gap-4 lg:gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary-text mb-2 lg:mb-1">سوالی دارید؟ ما برای شما اینجا هستیم!</h3>
            <p className="text-gray-600 font-regular text-base">
              برای دریافت مشاورۀ رایگان، همین حالا با کارشناسان ما تماس بگیرید.
            </p>
          </div>
          <a
            href="https://t.me/YourTelegramSupport" // آیدی یا لینک تلگرام خود را جایگزین کنید
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-[#279EFD] to-[#1565C0] hover:from-[#1E88E5] hover:to-[#0D47A1] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md mt-2 lg:mt-0 whitespace-nowrap"
          >
            <FaTelegramPlane className="text-2xl" />
            پشتیبانی تلگرام
          </a>
        </div>
      </div>
    </div>
  );
} 