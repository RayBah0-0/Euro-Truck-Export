export const translations = {
  en: { nav: { home: 'Home' } },
  de: { nav: { home: 'Startseite' } },
  fr: { nav: { home: 'Accueil' } },
  nl: { nav: { home: 'Startpagina' } },
  ar: { nav: { home: 'الرئيسية' } },
};

export type Language = keyof typeof translations;
