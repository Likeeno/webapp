import { FaTelegramPlane } from 'react-icons/fa';

export default function SupportBox() {
  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex w-full flex-col items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-white/90 p-6 text-center shadow-lg lg:flex-row lg:gap-8 lg:text-right">
          <div className="flex-1">
            <h3 className="text-primary-text mb-2 text-xl font-bold lg:mb-1">
              سوالی دارید؟ ما برای شما اینجا هستیم!
            </h3>
            <p className="font-regular text-base text-gray-600">
              برای دریافت مشاورۀ رایگان، همین حالا با کارشناسان ما تماس بگیرید.
            </p>
          </div>
          <a
            href="https://t.me/YourTelegramSupport" // آیدی یا لینک تلگرام خود را جایگزین کنید
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-6 py-3 font-bold whitespace-nowrap text-white shadow-md transition-all hover:from-[#1E88E5] hover:to-[#0D47A1] lg:mt-0"
          >
            <FaTelegramPlane className="text-2xl" />
            پشتیبانی تلگرام
          </a>
        </div>
      </div>
    </div>
  );
}
