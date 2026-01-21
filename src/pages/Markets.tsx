import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Markets() {
  const { t, isRTL, language } = useLanguage();

  const regions = [
    {
      name: t('markets.northAfrica'),
      countries: t('markets.northAfricaCountries'),
      notes: t('markets.northAfricaNotes'),
      accent: 'mint',
    },
    {
      name: t('markets.westAfrica'),
      countries: t('markets.westAfricaCountries'),
      notes: t('markets.westAfricaNotes'),
      accent: 'claret',
    },
    {
      name: t('markets.eastAfrica'),
      countries: t('markets.eastAfricaCountries'),
      notes: t('markets.eastAfricaNotes'),
      accent: 'charcoal',
    },
    {
      name: t('markets.middleEast'),
      countries: t('markets.middleEastCountries'),
      notes: t('markets.middleEastNotes'),
      accent: 'mint',
    },
    {
      name: t('markets.centralAsia'),
      countries: t('markets.centralAsiaCountries'),
      notes: t('markets.centralAsiaNotes'),
      accent: 'claret',
    },
    {
      name: t('markets.easternEurope'),
      countries: t('markets.easternEuropeCountries'),
      notes: t('markets.easternEuropeNotes'),
      accent: 'charcoal',
    },
  ];

  const accentClasses: Record<string, { border: string; badge: string }> = {
    mint: {
      border: 'border-mint-200',
      badge: 'bg-mint-50 text-mint-700 border-mint-200',
    },
    claret: {
      border: 'border-claret-200',
      badge: 'bg-claret-50 text-claret-700 border-claret-200',
    },
    charcoal: {
      border: 'border-charcoal-200',
      badge: 'bg-charcoal-100 text-charcoal-700 border-charcoal-200',
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const isArabic = language === 'ar';
  const whatsappContact = isArabic
    ? { phone: '+966 53 587 7310', link: 'https://wa.me/966535877310' }
    : { phone: '+41 78 713 77 77', link: 'https://wa.me/41787137777' };

  return (
    <div className={`min-h-screen bg-white-smoke ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-mint-700 mb-4"
          >
            {t('markets.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal-600 max-w-3xl mx-auto"
          >
            {t('markets.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {regions.map((region) => {
            const styles = accentClasses[region.accent];
            return (
              <motion.div
                key={region.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`surface-panel rounded-3xl p-6 border-2 ${styles.border}`}
              >
                <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs uppercase tracking-[0.3em] text-charcoal-500">{t('markets.region')}</span>
                  <span className="text-xs text-charcoal-400">/</span>
                  <span className="text-sm font-black text-mint-700">{region.name}</span>
                </div>

                <div className="mb-4">
                  <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {region.countries.split(', ').map((country) => (
                      <motion.span
                        key={country}
                        whileHover={{ scale: 1.03 }}
                        className={`px-3 py-1 text-[0.65rem] border font-bold uppercase tracking-[0.2em] rounded-full ${styles.badge}`}
                      >
                        {country}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <p className={`text-sm text-charcoal-600 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                  {region.notes}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-panel rounded-3xl p-8 md:p-12 mb-16"
        >
          <h2 className={`text-3xl font-black text-mint-700 mb-8 ${isRTL ? 'text-right' : ''}`}>
            {t('markets.howItWorks')}
          </h2>
          <div className={`grid md:grid-cols-3 gap-8 ${isRTL ? 'text-right' : ''}`}>
            {[
              {
                step: '01',
                title: t('markets.step1Title'),
                desc: t('markets.step1Desc'),
              },
              {
                step: '02',
                title: t('markets.step2Title'),
                desc: t('markets.step2Desc'),
              },
              {
                step: '03',
                title: t('markets.step3Title'),
                desc: t('markets.step3Desc'),
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-full bg-mint-600 text-white flex items-center justify-center text-xs font-black tracking-[0.2em]">
                    {item.step}
                  </div>
                </div>
                <div className="font-bold text-mint-700 mb-2 text-lg">{item.title}</div>
                <p className="text-sm text-charcoal-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-panel rounded-3xl p-8 md:p-12 mb-16"
        >
          <h2 className={`text-3xl font-black text-mint-700 mb-8 ${isRTL ? 'text-right' : ''}`}>
            {t('markets.whyExport')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[t('markets.whyPoint1'), t('markets.whyPoint2'), t('markets.whyPoint3'), t('markets.whyPoint4')].map(
              (point, idx) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  className={`flex items-start gap-4 p-4 bg-white border border-charcoal-200 rounded-2xl ${
                    isRTL ? 'flex-row-reverse text-right' : ''
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-charcoal-500">{String(idx + 1).padStart(2, '0')}</span>
                  <p className="text-charcoal-700 font-medium">{point}</p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-panel rounded-[32px] p-12 text-center"
        >
          <h2 className="text-3xl font-black text-mint-700 mb-4">{t('markets.readyToExport')}</h2>
          <p className="text-lg text-charcoal-600 mb-8 max-w-2xl mx-auto">
            {t('markets.getInTouch')}
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={whatsappContact.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-8 py-4 bg-mint-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-mint-700 ${
                isRTL ? 'flex-row-reverse' : ''
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>{t('common.whatsapp')}: {whatsappContact.phone}</span>
            </motion.a>

            <Link to="/inventory">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-charcoal-200 text-charcoal-800 font-black uppercase tracking-[0.2em] text-xs rounded-full hover:border-mint-600"
              >
                {t('home.browseInventory')}
              </motion.button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-charcoal-500">
            {t('markets.destinationNotListed')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
