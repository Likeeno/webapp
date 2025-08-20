export default function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'سریع و مطمئن',
      description: 'تحویل سریع و تضمین شده در کمترین زمان ممکن'
    },
    {
      icon: '🔒',
      title: 'امن و محافظت شده',
      description: 'اطلاعات شما کاملاً محفوظ و امن است'
    },
    {
      icon: '💰',
      title: 'قیمت مناسب',
      description: 'بهترین قیمت‌ها با کیفیت تضمین شده'
    }
  ];

  return (
    <section className="py-20 px-4 bg-primary-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-primary-text mb-16">
          چرا لایکینو؟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#279EFD] via-[#1E88E5] to-[#1565C0] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-2">{feature.title}</h3>
              <p className="text-gray-600 font-regular">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 