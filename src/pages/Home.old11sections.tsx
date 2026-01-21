import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import RecentlyViewed from '../components/RecentlyViewed';
import { motion } from 'framer-motion';
import { TRUCKS } from '@/lib/truckData';

export default function Home() {
  const { t, isRTL, language } = useLanguage();

  const featuredTrucks = TRUCKS.slice(0, 3);

  // Contact routing based on language
  const isArabic = language === 'ar';
  const primaryWhatsApp = isArabic ? 'https://wa.me/966535877310' : 'https://wa.me/41787137777';
  const primaryEmail = isArabic ? 'medvip66@gmail.com' : 'as.trucks@gmx.ch';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  return (
    <main className="min-h-screen bg-charcoal-950">
      {/* Stats Bar - Dark Industrial with Glow */}
      <section className="bg-charcoal-950 border-b border-charcoal-800 relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(charcoal-800 1px, transparent 1px), linear-gradient(90deg, charcoal-800 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-6 py-10 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-mint-400 mb-2 tracking-tight" style={{textShadow: '0 0 20px rgba(62, 179, 124, 0.3)'}}>247+</div>
              <div className="text-sm text-charcoal-400 font-bold uppercase tracking-wider">{t('home.stats.trucksExported')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center border-l border-charcoal-800"
            >
              <div className="text-4xl md:text-5xl font-black text-mint-400 mb-2 tracking-tight" style={{textShadow: '0 0 20px rgba(62, 179, 124, 0.3)'}}>38</div>
              <div className="text-sm text-charcoal-400 font-bold uppercase tracking-wider">{t('home.stats.countries')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center border-l border-charcoal-800"
            >
              <div className="text-4xl md:text-5xl font-black text-mint-400 mb-2 tracking-tight" style={{textShadow: '0 0 20px rgba(62, 179, 124, 0.3)'}}>12+</div>
              <div className="text-sm text-charcoal-400 font-bold uppercase tracking-wider">{t('home.stats.yearsExperience')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-center border-l border-charcoal-800"
            >
              <div className="text-4xl md:text-5xl font-black text-mint-400 mb-2 tracking-tight" style={{textShadow: '0 0 20px rgba(62, 179, 124, 0.3)'}}>98%</div>
              <div className="text-sm text-charcoal-400 font-bold uppercase tracking-wider">{t('home.stats.satisfaction')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Section - Dark with heavy overlays */}
      <section className="relative bg-charcoal-900 text-white overflow-hidden">
        {/* Industrial grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-5 py-2.5 rounded-sm bg-mint-500/10 border border-mint-500/30 text-mint-300 text-sm font-black backdrop-blur-sm uppercase tracking-widest">
                {t('home.heroSubtitle')}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tight uppercase"
            >
              {t('home.heroTitle')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-charcoal-400 mb-12 leading-relaxed max-w-3xl font-medium"
            >
              {t('home.heroDescription')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`flex flex-col sm:flex-row gap-5 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
            >
              <Link
                to="/inventory"
                className="group relative px-10 py-5 bg-gradient-to-br from-mint-500 to-mint-600 text-charcoal-950 font-black rounded-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-mint-500/40 uppercase tracking-widest text-sm"
              >
                <span className="relative z-10">{t('home.browseInventory')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-mint-400 to-mint-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <a
                href={primaryWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 border-3 border-charcoal-700 text-white font-black rounded-sm backdrop-blur-sm hover:bg-charcoal-800 hover:border-mint-500 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>{t('common.whatsapp')}</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose - Dark cards with metal aesthetic */}
      <section className="py-24 bg-charcoal-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-900"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
              {t('home.whyChoose')}
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-mint-500 to-mint-600 mx-auto rounded-full shadow-lg shadow-mint-500/50"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: '✓', titleKey: 'home.feature1Title', descKey: 'home.feature1Desc' },
              { icon: '🇩🇪', titleKey: 'home.feature2Title', descKey: 'home.feature2Desc' },
              { icon: '📋', titleKey: 'home.feature3Title', descKey: 'home.feature3Desc' },
              { icon: '🌍', titleKey: 'home.feature4Title', descKey: 'home.feature4Desc' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-charcoal-900 rounded-sm p-8 shadow-2xl hover:shadow-mint-500/20 transition-all duration-300 border-2 border-charcoal-800 hover:border-charcoal-700 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-mint-500/5 to-transparent rounded-full -translate-y-24 translate-x-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-sm bg-gradient-to-br from-charcoal-800 to-charcoal-700 border border-charcoal-600 flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:scale-110 group-hover:shadow-mint-500/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-4 uppercase tracking-wide">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-charcoal-400 leading-relaxed font-medium">
                    {t(feature.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Inventory - Dark with image overlays */}
      <section className="py-24 bg-charcoal-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-mint-500/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className={`flex justify-between items-end mb-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight uppercase">
                {t('home.featuredInventory')}
              </h2>
              <p className="text-charcoal-400 text-lg font-bold uppercase tracking-wide">{t('inventory.updated')}</p>
            </motion.div>
            
            <Link 
              to="/inventory"
              className={`group text-mint-400 hover:text-mint-300 font-black text-lg transition-colors flex items-center gap-2 uppercase tracking-wide ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span>{t('home.viewAllTrucks')}</span>
              <span className={`group-hover:${isRTL ? '-translate-x-2' : 'translate-x-2'} transition-transform text-2xl`}>
                {isRTL ? '←' : '→'}
              </span>
            </Link>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredTrucks.map((truck, index) => (
              <motion.div
                key={truck.id}
                variants={itemVariants}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                <Link 
                  to={`/truck/${truck.id}`}
                  className="group block bg-charcoal-900 rounded-sm overflow-hidden shadow-2xl hover:shadow-mint-500/20 transition-all duration-300 border-2 border-charcoal-800 hover:border-charcoal-700"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    {/* Dark overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-charcoal-900/20 z-10"></div>
                    
                    <img 
                      src={truck.image}
                      alt={`${truck.brand} ${truck.model}`}
                      className="w-full h-full object-cover brightness-90 contrast-110 saturate-90 group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Badges */}
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} flex flex-col gap-2 z-20`}>
                      {truck.immediateExport && (
                        <motion.span 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-4 py-2 rounded-sm bg-claret-600 text-white text-xs font-black shadow-2xl backdrop-blur-sm uppercase tracking-widest border border-claret-500"
                        >
                          {t('common.immediateExport')}
                        </motion.span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-7 bg-charcoal-900">
                    <div className="text-xs text-charcoal-500 mb-2 font-black tracking-widest">
                      {truck.brand.toUpperCase()}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-5 group-hover:text-mint-400 transition-colors uppercase tracking-tight">
                      {truck.model}
                    </h3>
                    
                    <div className="space-y-3 mb-5 bg-charcoal-950 p-4 rounded-sm border border-charcoal-800">
                      <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-charcoal-500 font-bold uppercase tracking-wide">{t('inventory.specs.year')}</span>
                        <span className="font-black text-white">{truck.year}</span>
                      </div>
                      <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-charcoal-500 font-bold uppercase tracking-wide">{t('inventory.specs.mileage')}</span>
                        <span className="font-black text-white">{truck.mileage}</span>
                      </div>
                      <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-charcoal-500 font-bold uppercase tracking-wide">{t('inventory.specs.location')}</span>
                        <span className="font-black text-white">{truck.location}</span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-between pt-5 border-t-2 border-charcoal-800 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="px-4 py-2 rounded-sm bg-mint-500/10 text-mint-400 text-xs font-black border border-mint-500/30 uppercase tracking-widest">
                        {t(`common.${truck.status.toLowerCase()}`)}
                      </span>
                      <span className={`text-mint-400 font-black text-sm group-hover:${isRTL ? '-translate-x-2' : 'translate-x-2'} transition-transform uppercase tracking-wide`}>
                        {t('common.viewDetails')} {isRTL ? '←' : '→'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Dark with realistic reviews */}
      <section className="py-24 bg-charcoal-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-charcoal-400 text-xl font-bold uppercase tracking-wide">{t('home.testimonials.subtitle')}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {['review1', 'review2', 'review3'].map((reviewKey, index) => {
              const review = t(`home.testimonials.${reviewKey}`);
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-charcoal-950 rounded-sm p-8 shadow-2xl border-2 border-charcoal-800 hover:border-charcoal-700 transition-all duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < review.rating ? 'text-mint-400' : 'text-charcoal-700'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-charcoal-300 leading-relaxed mb-6 font-medium text-lg italic">
                    "{review.text}"
                  </p>
                  
                  <div className="pt-6 border-t-2 border-charcoal-800">
                    <p className="font-black text-white mb-1 uppercase tracking-wide">{review.name}</p>
                    <p className="text-sm text-charcoal-500 font-bold">{review.company}</p>
                    <p className="text-sm text-mint-400 font-bold mt-1">{review.location}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Partners - Mercedes Badge */}
      <section className="py-20 bg-charcoal-950 border-y-2 border-charcoal-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-sm text-charcoal-500 mb-8 font-black uppercase tracking-widest">{t('home.partners.title')}</h3>
            
            <div className="flex flex-wrap items-center justify-center gap-12">
              {/* Mercedes-Benz Logo Text */}
              <div className="flex items-center gap-4 px-8 py-6 bg-charcoal-900 rounded-sm border-2 border-charcoal-800 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-charcoal-800 border-2 border-charcoal-700 flex items-center justify-center">
                  <svg className="w-10 h-10 text-charcoal-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" fill="none" strokeWidth="1"/>
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-black text-white uppercase tracking-tight">Mercedes-Benz</div>
                  <div className="text-xs text-mint-400 font-black uppercase tracking-widest">{t('home.partners.authorized')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Export Destinations - Dark treatment */}
      <section className="py-24 bg-charcoal-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
              {t('home.exportDestinations')}
            </h2>
            <p className="text-charcoal-400 text-xl font-bold max-w-2xl mx-auto uppercase tracking-wide">
              {t('home.servingWorldwide')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { region: 'westAfrica', countries: ['Ghana', 'Nigeria', 'Senegal', 'Côte d\'Ivoire'] },
              { region: 'eastAfrica', countries: ['Kenya', 'Tanzania', 'Uganda', 'Ethiopia'] },
              { region: 'northAfrica', countries: ['Egypt', 'Morocco', 'Tunisia', 'Algeria'] },
              { region: 'middleEast', countries: ['UAE', 'Saudi Arabia', 'Jordan', 'Iraq'] },
              { region: 'centralAsia', countries: ['Kazakhstan', 'Uzbekistan', 'Turkmenistan'] },
              { region: 'europe', countries: ['Poland', 'Romania', 'Bulgaria', 'Ukraine'] },
            ].map((dest, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="group bg-charcoal-950 rounded-sm p-7 border-2 border-charcoal-800 hover:border-mint-500/30 hover:shadow-2xl hover:shadow-mint-500/10 transition-all duration-300"
              >
                <h3 className="text-xl font-black text-white mb-4 group-hover:text-mint-400 transition-colors uppercase tracking-wide">
                  {t(`markets.regions.${dest.region}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dest.countries.map((country, i) => (
                    <span key={i} className="text-sm px-3 py-2 bg-charcoal-900 rounded-sm text-charcoal-400 border border-charcoal-800 font-bold uppercase tracking-wide">
                      {country}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Export Process - Dark industrial timeline */}
      <section className="py-24 bg-charcoal-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">
              {t('home.exportProcess')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: '01', titleKey: 'home.step1', descKey: 'home.step1Desc' },
              { num: '02', titleKey: 'home.step2', descKey: 'home.step2Desc' },
              { num: '03', titleKey: 'home.step3', descKey: 'home.step3Desc' },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-sm bg-gradient-to-br from-mint-500 to-mint-600 text-charcoal-950 text-4xl font-black mb-8 shadow-2xl shadow-mint-500/30 border-2 border-mint-400">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wide">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-charcoal-400 leading-relaxed font-medium text-lg">
                    {t(step.descKey)}
                  </p>
                </div>
                
                {index < 2 && (
                  <div className={`hidden md:block absolute top-12 ${isRTL ? 'right-0' : 'left-full'} w-full h-1 bg-gradient-to-${isRTL ? 'l' : 'r'} from-mint-500 to-charcoal-800`}></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed - Dark */}
      <section className="py-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6">
          <RecentlyViewed />
        </div>
      </section>

      {/* About Us Section - Optional Dark */}
      <section className="py-24 bg-charcoal-950 border-y-2 border-charcoal-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight uppercase">
              {t('home.about.title')}
            </h2>
            <p className="text-xl text-charcoal-400 leading-relaxed font-medium">
              {t('home.about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Dark industrial with correct WhatsApp */}
      <section className="relative py-28 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mint-500/5 via-transparent to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight uppercase">
              {t('home.readyToStart')}
            </h2>
            <p className="text-2xl text-charcoal-400 mb-12 leading-relaxed font-bold">
              {t('home.contactToday')}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-5 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href={primaryWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 bg-gradient-to-br from-mint-500 to-mint-600 text-charcoal-950 font-black rounded-sm hover:from-mint-400 hover:to-mint-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-mint-500/50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>{t('common.whatsapp')}</span>
              </a>
              
              <a
                href={`mailto:${primaryEmail}`}
                className="px-10 py-5 border-3 border-charcoal-700 text-white font-black rounded-sm backdrop-blur-sm hover:bg-charcoal-800 hover:border-mint-500 transition-all duration-300 hover:scale-105 uppercase tracking-widest text-sm"
              >
                {t('common.email')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
