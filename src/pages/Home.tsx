import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section - Ultra Premium */}
      <section className="relative bg-slate-950 text-white py-32 md:py-40 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-amber-400 font-bold text-sm tracking-wider uppercase">{t('home.tagline')}</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {t('home.heroTitle')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-light">
              {t('home.heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                to="/inventory"
                className="group relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-slate-950 font-bold py-5 px-12 rounded-2xl transition-all duration-500 text-lg shadow-[0_20px_60px_-15px_rgba(251,191,36,0.5)] hover:shadow-[0_20px_80px_-10px_rgba(251,191,36,0.7)] hover:-translate-y-1 hover:scale-105"
                style={{ backgroundSize: '200% auto' }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  {t('home.cta')}
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              <Link
                to="/contact"
                className="group bg-white/5 backdrop-blur-xl text-white font-bold py-5 px-12 rounded-2xl border-2 border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-lg hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  {t('contact.title')}
                  <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section - Modern Glassmorphism */}
      <section className="relative bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: '42+', label: t('home.stats.units') || 'Premium Units' },
              { number: '100%', label: t('home.stats.german') || 'German Made' },
              { number: '19+', label: t('home.stats.experience') || 'Years Experience' },
              { number: '50+', label: t('home.stats.countries') || 'Countries' }
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Premium Cards */}
      <section className="py-28 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-bold text-sm tracking-wide">
              WHY CHOOSE US
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Unmatched <span className="text-amber-600">Excellence</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
              Premium Mercedes-Benz trucks backed by decades of expertise and uncompromising quality standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-amber-400 hover:-translate-y-3 cursor-default"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-amber-500/30 text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t(item.titleKey)}</h3>
                  <p className="text-slate-600 leading-relaxed">{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* German Quality - Premium Dark Section */}
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950 to-slate-950"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-sm">
              <span className="text-4xl">🇩🇪</span>
              <span className="text-amber-400 font-bold tracking-wider uppercase">Authentic German Engineering</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              100% German <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Manufactured</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
              Every Mercedes-Benz truck is sourced directly from Germany, ensuring unmatched quality, reliability, and lasting value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔍', title: 'Quality Assurance', desc: 'Thorough inspection and documentation for every vehicle' },
              { icon: '🚛', title: 'Direct Sourcing', desc: 'Direct partnerships with verified German suppliers' },
              { icon: '🤝', title: 'Full Service', desc: 'Complete transparency from inquiry to delivery' }
            ].map((item, i) => (
              <div key={i} className="group relative bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Premium */}
      <section className="relative py-28 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-5 py-3 rounded-full font-bold mb-8">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            42+ Premium Units Available
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8">
            Ready to <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">Get Started?</span>
          </h2>
          <p className="text-xl text-slate-600 mb-12 font-light leading-relaxed">
            Contact our team today for detailed information, custom quotes, and expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 font-bold py-6 px-14 rounded-2xl hover:scale-105 transition-all duration-300 text-xl shadow-[0_20px_60px_-15px_rgba(251,191,36,0.6)] hover:shadow-[0_25px_80px_-10px_rgba(251,191,36,0.8)]"
              style={{ backgroundSize: '200% auto' }}
            >
              Get in Touch
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/inventory"
              className="inline-flex items-center gap-3 bg-slate-950 text-white font-bold py-6 px-14 rounded-2xl hover:bg-slate-900 transition-all duration-300 shadow-2xl hover:-translate-y-2 text-xl"
            >
              View Inventory
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
