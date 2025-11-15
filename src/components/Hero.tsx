import OrderForm from './OrderForm';

export default function Hero() {
  return (
    <section className="px-4 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* Title Section - Right Side */}
          <div className="order-1 text-center lg:w-1/2 lg:text-right">
            <h1 className="text-primary-text mt-6 mb-6 text-3xl font-bold lg:text-4xl">
              از دیده شدن تا برند شدن با<span className="text-[#279EFD]"> لایکینو </span>
            </h1>
            <p className="font-regular text-lg text-gray-600">
              در لایکینو، خدمات افزایش فالوور، لایک، بازدید و کامنت را برای اینستاگرام، تیک‌تاک،
              یوتیوب و توییتر با تحویل فوری و بدون نیاز به رمز عبور ارائه می‌دهیم.
            </p>
            <div className="mt-10 hidden flex-col justify-center gap-4 lg:flex lg:flex-row lg:justify-start">
              <button className="rounded-lg bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-6 py-3 text-base font-bold text-white transition-all hover:from-[#1E88E5] hover:to-[#0D47A1]">
                لیست خدمات
              </button>
              <button className="rounded-lg bg-[#2D323D] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-gray-700">
                درباره ما
              </button>
            </div>
          </div>
          {/* Order Form - Left Side */}
          <div className="order-2 mb-10 flex w-full justify-center lg:mt-18 lg:w-1/2">
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
