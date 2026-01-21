import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import RecentlyViewed from '../components/RecentlyViewed';
import { motion } from 'framer-motion';
import { TRUCKS } from '@/lib/truckData';

export default function Home() {
  const { t, isRTL } = useLanguage();

  const featuredTrucks = TRUCKS.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <main className="min-h-screen">
      {/* Stats Bar - Professional Trust Indicators */}
      <section className="bg-charcoal-900 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-mint-400 mb-1">247+</div>
              <div className="text-sm text-charcoal-400 font-medium">{t('home.stats.trucksExported')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-mint-400 mb-1">38</div>
              <div className="text-sm text-charcoal-400 font-medium">{t('home.stats.countries')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-mint-400 mb-1">12+</div>
              <div className="text-sm text-charcoal-400 font-medium">{t('home.stats.yearsExperience')}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-mint-400 mb-1">98%</div>
              <div className="text-sm text-charcoal-400 font-medium">{t('home.stats.satisfaction')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Section - Premium with gradient overlay */}
      <section className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-mint-500/10 via-transparent to-claret-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 rounded-full bg-mint-500/20 border border-mint-500/30 text-mint-300 text-sm font-semibold backdrop-blur-sm">
                {t('home.heroSubtitle')}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              {t('home.heroTitle')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl"
            >
              {t('home.heroDescription')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
            >
              <Link
                to="/inventory"
                className="group relative px-8 py-4 bg-mint-500 text-charcoal-900 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-mint-500/30"
              >
                <span className="relative z-10">{t('home.browseInventory')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-mint-400 to-mint-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <a
                href="https://wa.me/966535877310"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>{t('common.whatsapp')}</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white-smoke to-transparent"></div>
      </section>

      {/* Why Choose Section - Layered cards with depth */}
      <section className="py-20 bg-white-smoke relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint-50/30 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
              {t('home.whyChoose')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-mint-500 to-claret-600 mx-auto rounded-full"></div>
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
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-2xl p-8 shadow-subtle hover:shadow-lifted transition-all duration-300 border border-charcoal-100 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mint-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-900 mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Inventory - Premium marketplace feel */}
      <section className="py-20 bg-gradient-to-b from-white-smoke to-smoke-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-mint-500/20 via-transparent to-claret-500/20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className={`flex justify-between items-end mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-2">
                {t('home.featuredInventory')}
              </h2>
              <p className="text-charcoal-600 text-lg">{t('inventory.updated')}</p>
            </motion.div>
            
            <Link 
              to="/inventory"
              className={`group text-claret-600 hover:text-claret-700 font-bold text-lg transition-colors flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span>{t('home.viewAllTrucks')}</span>
              <span className={`group-hover:${isRTL ? '-translate-x-2' : 'translate-x-2'} transition-transform`}>
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
                  className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lifted transition-all duration-300 border border-charcoal-100"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                      src={truck.image}
                      alt={`${truck.brand} ${truck.model}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} flex flex-col gap-2`}>
                      {truck.immediateExport && (
                        <motion.span 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-3 py-1.5 rounded-full bg-mint-100 text-claret-700 text-xs font-bold shadow-lg border border-mint-300 backdrop-blur-sm"
                        >
                          {t('common.immediateExport')}
                        </motion.span>
                      )}
                    </div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="text-xs text-charcoal-500 mb-1 font-semibold tracking-wide">
                      {truck.brand.toUpperCase()}
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal-900 mb-4 group-hover:text-claret-600 transition-colors">
                      {truck.model}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-charcoal-600">{t('inventory.specs.year')}</span>
                        <span className="font-bold text-charcoal-900">{truck.year}</span>
                      </div>
                      <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-charcoal-600">{t('inventory.specs.mileage')}</span>
                        <span className="font-bold text-charcoal-900">{truck.mileage}</span>
                      </div>
                      <div className={`flex justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-charcoal-600">{t('inventory.specs.location')}</span>
                        <span className="font-bold text-charcoal-900">{truck.location}</span>
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-between pt-4 border-t border-charcoal-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="px-3 py-1 rounded-full bg-mint-50 text-mint-700 text-xs font-semibold border border-mint-200">
                        {t(`common.${truck.status.toLowerCase()}`)}
                      </span>
                      <span className={`text-claret-600 font-bold group-hover:${isRTL ? '-translate-x-2' : 'translate-x-2'} transition-transform`}>
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

      {/* Export Destinations - Visual map feel */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
              {t('home.exportDestinations')}
            </h2>
            <p className="text-charcoal-600 text-xl max-w-2xl mx-auto">
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
                className="group bg-gradient-to-br from-white to-mint-50/30 rounded-xl p-6 border border-charcoal-100 hover:border-mint-500 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-charcoal-900 mb-3 group-hover:text-mint-600 transition-colors">
                  {t(`markets.regions.${dest.region}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dest.countries.map((country, i) => (
                    <span key={i} className="text-sm px-3 py-1 bg-white rounded-full text-charcoal-600 border border-charcoal-200">
                      {country}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Export Process - Timeline feel */}
      <section className="py-20 bg-gradient-to-br from-smoke-dark via-white-smoke to-smoke-dark relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-900 mb-4">
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
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-mint-500 to-mint-600 text-white text-3xl font-bold mb-6 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal-900 mb-3">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
                
                {index < 2 && (
                  <div className={`hidden md:block absolute top-10 ${isRTL ? 'right-0' : 'left-full'} w-full h-0.5 bg-gradient-to-${isRTL ? 'l' : 'r'} from-mint-500 to-mint-300`}></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="py-16 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-6">
          <RecentlyViewed />
        </div>
      </section>

      {/* CTA Section - Premium with depth */}
      <section className="relative py-24 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mint-500/10 via-transparent to-claret-600/10"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('home.readyToStart')}
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              {t('home.contactToday')}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href="https://wa.me/491234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-mint-500 text-charcoal-900 font-bold rounded-lg hover:bg-mint-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-mint-500/30 flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>{t('common.whatsapp')}</span>
              </a>
              
              <a
                href="mailto:info@eurotruckexport.com"
                className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105"
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
