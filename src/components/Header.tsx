import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/lib/translations';
import { getSavedTrucks, TruckBasic } from '@/lib/truckStorage';
import { useEffect, useState } from 'react';
import AuthModal from './AuthModal';

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [watchlist, setWatchlist] = useState<TruckBasic[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const languages: { code: Language; name: string; short: string }[] = [
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'de', name: 'Deutsch', short: 'DE' },
    { code: 'fr', name: 'Francais', short: 'FR' },
    { code: 'nl', name: 'Nederlands', short: 'NL' },
    { code: 'ar', name: 'Arabic', short: 'AR' },
  ];

  const navLinks = [
    { href: '/inventory', label: t('nav.inventory') },
    { href: '/markets', label: t('nav.markets') },
  ];

  const isArabic = language === 'ar';
  const whatsappLink = isArabic ? 'https://wa.me/966535877310' : 'https://wa.me/41787137777';

  useEffect(() => {
    const updateWatchlist = () => {
      setWatchlist(getSavedTrucks());
    };
    updateWatchlist();
    window.addEventListener('savedTrucksUpdated', updateWatchlist);
    window.addEventListener('storage', updateWatchlist);
    return () => {
      window.removeEventListener('savedTrucksUpdated', updateWatchlist);
      window.removeEventListener('storage', updateWatchlist);
    };
  }, []);

  useEffect(() => {
    if (watchlist.length === 0) {
      setWatchlistOpen(false);
    }
  }, [watchlist.length]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white-smoke/95 border-b border-charcoal-200/70 shadow-[0_18px_40px_rgba(11,47,28,0.08)] backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-mint-700">
              <div className="text-lg font-black tracking-tight uppercase font-display">Euro Trucks</div>
              <div className="text-xs text-charcoal-500 font-semibold tracking-[0.22em] uppercase">Export Specialists</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all border-2 ${
                    isActive
                      ? 'text-mint-700 border-mint-500 bg-mint-50'
                      : 'text-charcoal-600 border-transparent hover:border-charcoal-200 hover:text-charcoal-900 hover:bg-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 border-2 border-charcoal-200 text-xs text-charcoal-800 hover:border-mint-500 hover:bg-white rounded-full transition-all font-black uppercase tracking-[0.16em]"
                >
                  <div className="w-6 h-6 bg-mint-600 rounded-full flex items-center justify-center text-white text-xs font-black">
                    {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                  </div>
                  <span>{currentUser.displayName || 'Account'}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-charcoal-200 rounded-2xl shadow-[0_20px_40px_rgba(18,22,28,0.12)] z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-charcoal-100">
                      <div className="text-sm font-semibold text-charcoal-900 truncate">{currentUser.displayName || 'User'}</div>
                      <div className="text-xs text-charcoal-500 truncate">{currentUser.email}</div>
                    </div>
                    <button
                      onClick={async () => {
                        await logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal-800 text-white text-xs font-black rounded-full hover:bg-charcoal-900 transition-all uppercase tracking-[0.18em]"
              >
                Sign In
              </button>
            )}
            {watchlist.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setWatchlistOpen((prev) => !prev)}
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 border-2 border-charcoal-200 text-xs text-charcoal-800 hover:border-mint-500 hover:bg-white rounded-full transition-all font-black uppercase tracking-[0.16em]"
                >
                  <span>Watchlist</span>
                  <span className="px-2 py-1 text-[0.6rem] rounded-full bg-mint-600 text-white font-black">
                    {watchlist.length}
                  </span>
                </button>
                <AnimatePresence>
                  {watchlistOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="absolute right-0 mt-2 w-72 bg-white border-2 border-charcoal-200 rounded-2xl shadow-[0_20px_40px_rgba(25,29,25,0.12)] z-50 overflow-hidden origin-top-right"
                    >
                    <div className="px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-charcoal-500 border-b border-charcoal-100">
                      Saved Trucks
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {watchlist.slice(0, 4).map((truck) => (
                        <Link
                          key={truck.id}
                          to={`/truck/${truck.id}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-charcoal-50 transition-colors"
                          onClick={() => setWatchlistOpen(false)}
                        >
                          <img src={truck.image} alt={truck.model} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <div className="text-sm font-semibold text-charcoal-900">{truck.model}</div>
                            <div className="text-xs text-charcoal-500">{truck.year}</div>
                          </div>
                        </Link>
                      ))}
                      {watchlist.length > 4 && (
                        <div className="px-4 py-3 text-xs text-charcoal-500 border-t border-charcoal-100">
                          +{watchlist.length - 4} more saved
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-3 border-t border-charcoal-100">
                      <Link
                        to="/inventory"
                        className="text-xs font-black uppercase tracking-[0.2em] text-charcoal-700 hover:text-charcoal-900"
                        onClick={() => setWatchlistOpen(false)}
                      >
                        View inventory
                      </Link>
                    </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-mint-600 text-white text-xs font-black rounded-full hover:bg-mint-700 hover:shadow-[0_14px_30px_rgba(11,47,28,0.2)] transition-all uppercase tracking-[0.18em]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-charcoal-200 text-xs text-charcoal-700 hover:border-mint-500 hover:bg-white rounded-full transition-all font-bold uppercase tracking-[0.16em]"
              >
                <span className="text-xs bg-mint-600 text-white px-2 py-1 rounded-full font-black">
                  {languages.find((l) => l.code === language)?.short}
                </span>
                <span className="hidden sm:inline text-xs uppercase tracking-wide">{language.toUpperCase()}</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border-2 border-charcoal-200 rounded-2xl shadow-[0_20px_40px_rgba(18,22,28,0.12)] z-50 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-charcoal-50 transition-colors flex items-center gap-3 ${
                        language === lang.code ? 'bg-mint-50 text-charcoal-900 font-black' : 'text-charcoal-700 font-semibold'
                      }`}
                    >
                      <span className="text-xs bg-mint-600 text-white px-2 py-1 rounded-full font-black">
                        {lang.short}
                      </span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal-700 hover:text-charcoal-900 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-charcoal-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `mx-4 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-mint-50 text-charcoal-900 border border-mint-200'
                        : 'text-charcoal-700 hover:bg-charcoal-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-4 mt-2 px-4 py-3 bg-mint-600 text-white text-sm font-bold text-center hover:bg-mint-700 transition-colors rounded-2xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
};
