import Image from 'next/image';

const features = [
  {
    icon: '/images/feature1.png',
    title: 'جبران ریزش',
    desc: 'جبران ریزش خودکار بدون هماهنگی با پشتیبانی',
  },
  {
    icon: '/images/feature2.png',
    title: 'تحویل فوق سریع',
    desc: 'ثبت سفارش آنی و تحویل چند ساعته',
  },
  {
    icon: '/images/feature3.png',
    title: 'تضمین قیمت',
    desc: 'بهترین کیفیت با کمترین هزینه',
  },
  {
    icon: '/images/feature4.png',
    title: 'اتوماتیک بودن',
    desc: 'خودکار بودن همه مراحل',
  },
];

export default function WhyLikeeno() {
  return (
    <section className="w-full px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-primary-text text-3xl font-bold">چرا لایکینو؟</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex h-48 flex-col items-center justify-center gap-4 rounded-2xl border border-blue-100 bg-white p-6 text-center shadow-md"
            >
              <Image
                src={f.icon}
                alt={f.title}
                width={80}
                height={80}
                className="mx-auto h-20 w-20 object-contain"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-primary-text text-lg font-bold">{f.title}</h3>
                <p className="font-regular text-sm text-gray-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
