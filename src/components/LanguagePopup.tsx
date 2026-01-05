import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

export const LanguagePopup = () => {
  const { language, setLanguage } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('languageSelected');
    if (!hasSelectedLanguage) {
      const timer = setTimeout(() => setShowPopup(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('languageSelected', 'true');
    setShowPopup(false);
  };

  if (!showPopup) return null;

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Select language</h2>
          <button
            onClick={() => setShowPopup(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Language List */}
        <div className="max-h-96 overflow-y-auto">
          <ul className="divide-y divide-gray-100">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    language === lang.code ? 'bg-blue-50' : ''
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl w-8 h-8 flex items-center justify-center">{lang.flag}</span>
                    <span className="text-base font-medium text-gray-900">{lang.name}</span>
                  </span>
                  {language === lang.code && (
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
