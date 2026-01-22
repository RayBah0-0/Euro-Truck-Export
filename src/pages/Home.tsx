import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t, isRTL } = useLanguage();

  const stats = [
    { value: '247+', label: t('home.stats.trucksExported') },
    { value: '38', label: t('home.stats.countries') },
    { value: '12+', label: t('home.stats.yearsExperience') },
    { value: '98%', label: t('home.stats.satisfaction') },
  ];

  const features = [
    {
      title: t('home.feature1Title'),
      description: t('home.feature1Desc'),
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3l7 3v5c0 5-3.4 8.3-7 10-3.6-1.7-7-5-7-10V6l7-3z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M8.5 12l2.4 2.4 4.6-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: t('home.feature2Title'),
      description: t('home.feature2Desc'),
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3c-3.3 0-6 2.7-6 6 0 4.3 6 11 6 11s6-6.7 6-11c0-3.3-2.7-6-6-6z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ),
    },
    {
      title: t('home.feature3Title'),
      description: t('home.feature3Desc'),
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 3h7l4 4v14H7V3z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: t('home.feature4Title'),
      description: t('home.feature4Desc'),
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <main className="min-h-screen bg-white-smoke text-charcoal-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-surface"></div>
        <div className="absolute inset-0 section-grid opacity-25"></div>
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-mint-200/50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-claret-200/50 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pb-32">
          <div className={`flex flex-col lg:flex-row items-center gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`w-full lg:w-[52%] text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}
            >
              <motion.div variants={itemVariants} className={`w-full flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                <span className="inline-flex items-center rounded-full border border-charcoal-200 bg-white/70 px-4 py-2 text-[0.65rem] font-black uppercase tracking-[0.3em] text-charcoal-600 shadow-sm">
                  {t('home.heroSubtitle')}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-charcoal-900"
              >
                {t('home.heroTitle')}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg text-charcoal-600 max-w-xl mx-auto lg:mx-0"
              >
                {t('home.heroDescription')}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${isRTL ? 'sm:flex-row-reverse lg:justify-end' : ''}`}
              >
                <Link
                  to="/inventory"
                  className="inline-flex items-center justify-center px-8 py-4 bg-mint-600 text-white text-xs font-black uppercase tracking-[0.25em] rounded-full hover:bg-mint-700 transition-colors shadow-lg shadow-mint-500/20"
                >
                  {t('home.heroCta')}
                </Link>
                <Link
                  to="/export-process"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-charcoal-300 text-charcoal-800 text-xs font-black uppercase tracking-[0.25em] rounded-full hover:border-mint-600 hover:text-mint-700 transition-colors bg-white/70"
                >
                  {t('home.exportProcess')}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full lg:w-[48%]"
            >
              <motion.div variants={itemVariants} className="relative">
                <div className={`absolute -top-6 ${isRTL ? '-left-6' : '-right-6'} h-24 w-24 rounded-3xl border border-mint-200/70`}></div>
                <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_60px_rgba(11,47,28,0.25)]">
                  <img
                    src="/hero-trucks.jpg"
                    alt="Euro Truck Export fleet"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-900/35 via-transparent to-white/60"></div>
                </div>

                <motion.div
                  variants={itemVariants}
                  className="mt-6 lg:mt-0 lg:absolute lg:-bottom-12 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-xl"
                >
                  <div className="surface-panel rounded-3xl px-6 py-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      {stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-2xl font-black text-mint-700">{stat.value}</div>
                          <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-charcoal-500">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white-smoke via-mint-50/40 to-white-smoke"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="text-xs uppercase tracking-[0.35em] text-charcoal-500 mb-4">
              {t('home.whyChoose')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal-900 mb-5">
              {t('home.servingWorldwide')}
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="surface-panel rounded-3xl p-6 transition-transform"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-600 text-white shadow-lg shadow-mint-500/30">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-black text-charcoal-900">{feature.title}</h3>
                <p className="mt-3 text-sm text-charcoal-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-panel-dark relative overflow-hidden rounded-[36px] px-8 py-12 md:px-12"
          >
            <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-mint-500/20 blur-3xl"></div>
            <div className="absolute -bottom-20 left-0 h-48 w-48 rounded-full bg-claret-500/20 blur-3xl"></div>

            <div className={`relative ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                {t('home.readyToStart')}
              </h2>
              <p className="text-sm md:text-base text-charcoal-100 mb-8 max-w-2xl">
                {t('home.contactToday')}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <Link
                  to="/inventory"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-charcoal-900 text-xs font-black uppercase tracking-[0.25em] rounded-full hover:bg-mint-100 transition-colors"
                >
                  {t('home.browseInventory')}
                </Link>
                <Link
                  to="/export-process"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white text-xs font-black uppercase tracking-[0.25em] rounded-full hover:border-mint-200 hover:text-mint-200 transition-colors"
                >
                  {t('home.exportProcess')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
