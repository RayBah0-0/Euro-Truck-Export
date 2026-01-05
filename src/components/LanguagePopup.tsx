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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          Select Your Language
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Choose your preferred language
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                language === lang.code
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              <div className="text-2xl mb-1">{lang.flag}</div>
              <div className="text-sm">{lang.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
