import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <main className="bg-white">
      {/* Hero Section - Premium Design */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-2 bg-yellow-400/20 border-2 border-yellow-400 rounded-full backdrop-blur-sm">
              <span className="text-yellow-300 font-bold text-sm tracking-wider">TRUSTED SINCE 2007</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              {t('home.heroTitle')}
              <br />
              <span className="text-yellow-400">{t('home.heroSubtitle')}</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('home.heroDescription')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                to="/inventory"
                className="group relative px-10 py-4 bg-yellow-400 text-blue-900 font-bold text-lg rounded-xl shadow-2xl hover:shadow-yellow-400/50 hover:scale-105 transform transition-all duration-300"
              >
                <span className="relative z-10">{t('home.heroBtn1')} →</span>
                <div className="absolute inset-0 bg-yellow-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              
              <Link
                to="/contact"
                className="px-10 py-4 bg-white/10 text-white font-bold text-lg rounded-xl border-2 border-white/30 backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-300"
              >
                {t('home.heroBtn2')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-blue-900 mb-2">42+</div>
              <div className="text-gray-600 font-semibold">{t('home.stats.units')}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-900 mb-2">100%</div>
              <div className="text-gray-600 font-semibold">{t('home.stats.german')}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-900 mb-2">19+</div>
              <div className="text-gray-600 font-semibold">{t('home.stats.experience')}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-900 mb-2">50+</div>
              <div className="text-gray-600 font-semibold">{t('home.stats.countries')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              {t('home.whyChoose')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                titleKey: 'home.feature1Title',
                descKey: 'home.feature1Desc'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                ),
                titleKey: 'home.feature2Title',
                descKey: 'home.feature2Desc'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                ),
                titleKey: 'home.feature3Title',
                descKey: 'home.feature3Desc'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                ),
                titleKey: 'home.feature4Title',
                descKey: 'home.feature4Desc'
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-yellow-400 transition-all duration-300 h-full">
                  <div className="text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t(item.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            {t('home.ctaDescription')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-10 py-4 bg-yellow-400 text-blue-900 font-bold text-lg rounded-xl shadow-2xl hover:bg-yellow-300 hover:shadow-yellow-400/50 hover:scale-105 transform transition-all duration-300"
            >
              {t('home.ctaBtn2')} →
            </Link>
            <Link
              to="/inventory"
              className="px-10 py-4 bg-white/10 text-white font-bold text-lg rounded-xl border-2 border-white/30 backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-300"
            >
              {t('home.ctaBtn1')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
