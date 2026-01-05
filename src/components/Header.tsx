import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { useState } from 'react';

export const Header = () => {
  const { language, setLanguage } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/export-process', label: 'Export Process' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-4xl font-bold text-yellow-400">∑ T</div>
            <div>
              <h1 className="text-2xl font-bold">Euro Truck Export</h1>
              <p className="text-xs text-yellow-300">Trusted Mercedes Export Since 2007</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="hover:text-yellow-300 transition-colors font-medium text-sm uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold text-lg transition-colors"
            >
              {languages.find((l) => l.code === language)?.flag} {language.toUpperCase()}
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50 min-w-max">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-100 ${
                      language === lang.code ? 'bg-blue-50 font-bold' : ''
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:hidden mt-4 flex flex-wrap gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
