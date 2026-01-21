import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export const Footer = () => {
  const { t, language, isRTL } = useLanguage();
  const brandName = 'Euro Trucks';

  const isArabic = language === 'ar';
  const primaryContact = isArabic
    ? { phone: '+966 53 587 7310', whatsapp: 'https://wa.me/966535877310', email: 'medvip66@gmail.com' }
    : { phone: '+41 78 713 77 77', whatsapp: 'https://wa.me/41787137777', email: 'as.trucks@gmx.ch' };

  const languages = ['English', 'Deutsch', 'Francais', 'Nederlands', 'Arabic'];
  const locations = ['Hamburg', 'Munich', 'Berlin'];

  return (
    <footer className={`bg-white-smoke text-charcoal-900 border-t-2 border-mint-600 ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className="text-lg font-black text-mint-700 mb-4 uppercase tracking-wide">{brandName}</h3>
            <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
              {t('footer.companyDesc')}
            </p>
            <div className="text-charcoal-500 text-xs uppercase tracking-[0.2em]">
              {t('footer.basedIn')}
            </div>
          </div>

            <div className={isRTL ? 'text-right' : ''}>
            <h4 className="text-sm font-black text-mint-700 mb-4 uppercase tracking-wider">{t('footer.navigation')}</h4>
            <ul className="space-y-2.5">
              {[
                  { to: '/', label: t('nav.home') },
                  { to: '/inventory', label: t('nav.inventory') },
                  { to: '/markets', label: t('nav.markets') },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                    className="text-charcoal-600 hover:text-charcoal-900 text-sm transition-colors inline-block font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
                ))}
              </ul>
            </div>

            <div className={isRTL ? 'text-right' : ''}>
            <h4 className="text-sm font-black text-mint-700 mb-4 uppercase tracking-wider">{t('footer.exportRegions')}</h4>
            <ul className="space-y-2.5 text-charcoal-600 text-sm font-medium">
              <li>{t('markets.northAfrica')}</li>
              <li>{t('markets.westAfrica')}</li>
                <li>{t('markets.eastAfrica')}</li>
                <li>{t('markets.middleEast')}</li>
                <li>{t('markets.centralAsia')}</li>
                <li>{t('markets.easternEurope')}</li>
              </ul>
            </div>

            <div className={isRTL ? 'text-right' : ''}>
            <h4 className="text-sm font-black text-mint-700 mb-4 uppercase tracking-wider">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-charcoal-600 text-sm mb-6">
              <li>
                <a href={`mailto:${primaryContact.email}`} className="hover:text-charcoal-900 transition-colors font-medium">
                  {primaryContact.email}
                </a>
              </li>
                <li>
                  <a
                    href={primaryContact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-charcoal-900 transition-colors flex items-center gap-2 font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>{primaryContact.phone}</span>
                  </a>
                </li>
              </ul>

              <div className="text-xs font-black text-mint-700 mb-2 uppercase tracking-wider">{t('footer.languages')}</div>
              <div className="text-charcoal-500 text-xs font-medium">
                {languages.join(' / ')}
              </div>
            </div>
          </div>

          <div className={`border-t border-charcoal-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-charcoal-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} {brandName}. {t('footer.allRightsReserved')}
            </p>
            <div className="flex flex-wrap gap-4 text-charcoal-500 text-sm font-medium">
              <button className="hover:text-charcoal-900 transition-colors">{t('footer.terms')}</button>
              <span className="text-charcoal-400">/</span>
              <button className="hover:text-charcoal-900 transition-colors">{t('footer.privacy')}</button>
              <span className="text-charcoal-400">/</span>
              <span>{locations.join(' / ')}</span>
            </div>
          </div>
      </div>
    </footer>
  );
};
