import Image from 'next/image';

const features = [
  {
    icon: '/images/feature1.png',
    title: 'جبران ریزش',
    desc: 'جبران ریزش خودکار بدون هماهنگی با پشتیبانی'
  },
  {
    icon: '/images/feature2.png',
    title: 'تحویل فوق سریع',
    desc: 'ثبت سفارش آنی و تحویل چند ساعته'
  },
  {
    icon: '/images/feature3.png',
    title: 'تضمین قیمت',
    desc: 'بهترین کیفیت با کمترین هزینه'
  },
  {
    icon: '/images/feature4.png',
    title: 'اتوماتیک بودن',
    desc: 'خودکار بودن همه مراحل'
  },
];

export default function WhyLikeeno() {
  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary-text">
            چرا لایکینو؟
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white border border-blue-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-4 h-48 justify-center">
              <Image src={f.icon} alt={f.title} width={80} height={80} className="w-20 h-20 object-contain mx-auto" />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-primary-text">{f.title}</h3>
                <p className="text-gray-600 font-regular text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 