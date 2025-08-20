import OrderForm from './OrderForm';

export default function Hero() {
  return (
    <section className="pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Title Section - Right Side */}
          <div className="lg:text-right text-center lg:w-1/2 order-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary-text mt-6 mb-6">
               از دیده شدن تا برند شدن با<span className="text-[#279EFD]">  لایکینو  </span>
            </h1>
            <p className="text-lg text-gray-600 font-regular">
              در لایکینو، خدمات افزایش فالوور، لایک، بازدید و کامنت را برای اینستاگرام، تیک‌تاک، یوتیوب و توییتر با تحویل فوری و بدون نیاز به رمز عبور ارائه می‌دهیم.
            </p>
            <div className="hidden lg:flex flex-col lg:flex-row gap-4 mt-10 justify-center lg:justify-start">
              <button className="bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white px-6 py-3 rounded-lg text-base font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all">
                لیست خدمات
              </button>
              <button className="bg-[#2D323D] text-white px-6 py-3 rounded-lg text-base font-bold hover:bg-gray-700 transition-colors">
                درباره ما
              </button>
            </div>
          </div>
          {/* Order Form - Left Side */}
          <div className="lg:w-1/2 w-full flex justify-center order-2 lg:mt-18 mb-10">
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  );
} 