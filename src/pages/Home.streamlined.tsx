import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { TRUCKS } from '@/lib/truckData';

export default function Home() {
  const { t, isRTL, language } = useLanguage();

  const featuredTrucks = TRUCKS.slice(0, 3);

  // Contact routing based on language
  const isArabic = language === 'ar';
  const primaryWhatsApp = isArabic ? 'https://wa.me/966535877310' : 'https://wa.me/41787137777';

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
      {/* Hero Section - Powerful and Focused */}
      <section className="relative bg-charcoal-950 text-white overflow-hidden">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900/50 via-transparent to-charcoal-950"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-48">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tight"
            >
              {t('home.heroTitle')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl font-medium"
            >
              {t('home.heroDescription')}
            </motion.p>

            {/* Stats integrated into hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-4 gap-8 mb-12 pb-12 border-b border-charcoal-800"
            >
              {[
                { value: '247+', label: t('home.stats.trucksExported') },
                { value: '38', label: t('home.stats.countries') },
                { value: '12+', label: t('home.stats.yearsExperience') },
                { value: '98%', label: t('home.stats.satisfaction') }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-5xl font-black text-mint-400 mb-2">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`flex flex-col sm:flex-row gap-5 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
            >
              <Link
                to="/inventory"
                className="group px-10 py-5 bg-gradient-to-r from-mint-600 to-mint-700 text-charcoal-950 font-black text-lg uppercase tracking-wide rounded-sm border-2 border-mint-500 transition-all duration-300 hover:scale-105 shadow-2xl shadow-mint-500/20 hover:shadow-mint-500/40"
              >
                <span className="relative z-10">{t('home.browseInventory')}</span>
              </Link>
              
              <a
                href={primaryWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 border-2 border-charcoal-700 text-white font-bold text-lg uppercase tracking-wide rounded-sm hover:bg-charcoal-800 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
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

      {/* Featured Inventory - Curated Selection */}
      <section className="py-32 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              {t('home.featuredInventory')}
            </h2>
            <p className="text-xl text-gray-400 font-medium">
              Premium selection updated weekly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredTrucks.map((truck, index) => (
              <motion.div
                key={truck.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <Link
                  to={`/truck/${truck.id}`}
                  className="group block bg-charcoal-800 rounded-sm overflow-hidden border-2 border-charcoal-700 hover:border-mint-600 transition-all duration-500 shadow-2xl hover:shadow-mint-500/20"
                >
                  {/* Image with dark overlay */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                      src={truck.image} 
                      alt={`${truck.brand} ${truck.model}`}
                      className="w-full h-full object-cover brightness-90 contrast-110 saturate-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent"></div>
                    
                    {truck.immediateExport && (
                      <span className="absolute top-4 left-4 px-4 py-2 bg-mint-500/90 text-charcoal-950 text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                        {t('common.immediateExport')}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">
                      {truck.brand}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-mint-400 transition-colors">
                      {truck.model}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <div className="text-gray-500 font-medium mb-1">{truck.year}</div>
                        <div className="text-gray-400 text-xs">{truck.mileage}</div>
                      </div>
                      <div className={`px-4 py-2 rounded-sm font-bold text-xs uppercase ${
                        truck.status === 'Available' 
                          ? 'bg-mint-500/20 text-mint-400 border border-mint-500/30' 
                          : 'bg-charcoal-700 text-gray-400'
                      }`}>
                        {t(`common.${truck.status.toLowerCase()}`)}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/inventory"
              className="inline-block px-10 py-4 border-2 border-charcoal-700 text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-charcoal-800 hover:border-mint-600 transition-all duration-300"
            >
              {t('home.viewAllTrucks')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Social Proof */}
      <section className="py-32 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-400 font-medium">
              {t('home.testimonials.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ahmed Al-Mansouri',
                company: 'Gulf Heavy Transport',
                country: 'UAE',
                rating: 5,
                text: 'home.testimonials.review1',
                date: 'December 2025'
              },
              {
                name: 'Pierre Dubois',
                company: 'Trans-Sahara Logistics',
                country: 'Senegal',
                rating: 4,
                text: 'home.testimonials.review2',
                date: 'November 2025'
              },
              {
                name: 'Yusuf Okonkwo',
                company: 'West Africa Freight Solutions',
                country: 'Nigeria',
                rating: 5,
                text: 'home.testimonials.review3',
                date: 'October 2025'
              }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-charcoal-900 border-2 border-charcoal-800 p-8 rounded-sm hover:border-mint-600/30 transition-all shadow-2xl"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? 'text-mint-500' : 'text-charcoal-700'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-300 mb-8 leading-relaxed font-medium italic">
                  "{t(review.text)}"
                </p>

                <div className="border-t border-charcoal-800 pt-6">
                  <div className="font-black text-white text-lg">{review.name}</div>
                  <div className="text-sm text-gray-400 font-medium mt-1">{review.company}</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{review.country}</span>
                    <span className="text-xs text-gray-600">{review.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Strong and Direct */}
      <section className="relative py-32 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white overflow-hidden border-t-2 border-charcoal-800">
        <div className="absolute inset-0 bg-gradient-to-br from-mint-500/5 via-transparent to-claret-600/5"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              {t('home.readyToStart')}
            </h2>
            <p className="text-2xl text-gray-400 mb-12 font-medium leading-relaxed">
              {t('home.contactToday')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-5 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <a
                href={primaryWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-mint-600 to-mint-700 text-charcoal-950 font-black text-lg uppercase tracking-wide rounded-sm border-2 border-mint-500 transition-all duration-300 hover:scale-105 shadow-2xl shadow-mint-500/30"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>{t('common.whatsapp')}</span>
              </a>
              <Link
                to="/inventory"
                className="inline-block px-10 py-5 border-2 border-charcoal-700 text-white font-bold text-lg uppercase tracking-wide rounded-sm hover:bg-charcoal-800 hover:border-mint-600 transition-all duration-300"
              >
                {t('home.browseInventory')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
