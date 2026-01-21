import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

export const LanguagePopup = () => {
  const { language, setLanguage } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('languageSelected');
    if (!hasSelectedLanguage) {
      setShowPopup(true);
    }
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('languageSelected', 'true');
    setShowPopup(false);
  };

  if (!showPopup) return null;

  const languages: { code: Language; name: string; short: string }[] = [
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'de', name: 'Deutsch', short: 'DE' },
    { code: 'fr', name: 'Francais', short: 'FR' },
    { code: 'nl', name: 'Nederlands', short: 'NL' },
    { code: 'ar', name: 'Arabic', short: 'AR' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm z-[1000] flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          className="surface-panel max-w-md w-full mx-4 overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(11,47,28,0.16)]"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-100">
            <h2 className="text-xl font-bold text-mint-700">Select language</h2>
            <button
              onClick={() => setShowPopup(false)}
              className="text-charcoal-400 hover:text-charcoal-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <ul className="divide-y divide-charcoal-100">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <button
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full px-6 py-3 flex items-center justify-between hover:bg-charcoal-50 transition-colors ${
                      language === lang.code ? 'bg-mint-50' : ''
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs bg-mint-600 text-white px-2 py-1 rounded-full font-black">
                        {lang.short}
                      </span>
                      <span className="text-base font-medium text-charcoal-900">{lang.name}</span>
                    </span>
                    {language === lang.code && (
                      <svg className="w-5 h-5 text-mint-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
