import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-white-smoke text-charcoal-900">
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-trucks.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative min-h-screen">
          <div className="absolute -top-14 -left-14">
            <img
              src="/logo-euro-truck-export.png"
              alt="Euro Truck Export"
              className="h-32 w-auto sm:h-40 md:h-56 lg:h-80 drop-shadow-[0_16px_32px_rgba(11,47,28,0.28)]"
            />
          </div>

          <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black text-mint-700 mb-6"
            >
              {t('home.heroTitle')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-charcoal-700 max-w-2xl mb-10"
            >
              {t('home.heroDescription')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/inventory"
                className="inline-flex items-center justify-center px-8 py-4 bg-mint-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-mint-700 transition-colors"
              >
                {t('home.heroCta')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
