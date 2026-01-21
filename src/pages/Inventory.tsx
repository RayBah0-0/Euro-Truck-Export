import { Link } from 'react-router-dom';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { TRUCKS } from '@/lib/truckData';
import { toggleSavedTruck, isTruckSaved } from '@/lib/truckStorage';
import { useLanguage } from '@/context/LanguageContext';

type RegionKey = 'northAfrica' | 'westAfrica' | 'eastAfrica' | 'middleEast' | 'centralAsia' | 'easternEurope';

const GEO_URL = '/data/countries-110m.json';

const normalizeCountryName = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');

const getGeoName = (geo: any) =>
  geo?.properties?.name ||
  geo?.properties?.NAME ||
  geo?.properties?.ADMIN ||
  geo?.properties?.admin ||
  '';

const regionMapConfig: Record<
  RegionKey,
  {
    exportCountries: string[];
    contextCountries: string[];
    center: [number, number];
    scale: number;
  }
> = {
  northAfrica: {
    exportCountries: ['Morocco', 'Algeria', 'Tunisia', 'Libya', 'Egypt'],
    contextCountries: ['W. Sahara', 'Mauritania', 'Mali', 'Niger', 'Chad', 'Sudan', 'Spain', 'Portugal', 'Italy', 'Greece', 'Turkey'],
    center: [10, 26],
    scale: 560,
  },
  westAfrica: {
    exportCountries: ['Senegal', 'Mali', "Cote d'Ivoire", 'Ghana', 'Nigeria'],
    contextCountries: ['Mauritania', 'Gambia', 'Guinea', 'Guinea-Bissau', 'Sierra Leone', 'Liberia', 'Burkina Faso', 'Niger', 'Benin', 'Togo', 'Cameroon'],
    center: [-4, 12],
    scale: 700,
  },
  eastAfrica: {
    exportCountries: ['Kenya', 'Tanzania', 'Uganda', 'Ethiopia'],
    contextCountries: ['Somalia', 'S. Sudan', 'Sudan', 'Rwanda', 'Burundi', 'Dem. Rep. Congo', 'Eritrea', 'Djibouti', 'Zambia', 'Malawi', 'Mozambique'],
    center: [36, 4],
    scale: 700,
  },
  middleEast: {
    exportCountries: ['United Arab Emirates', 'Saudi Arabia', 'Jordan', 'Iraq', 'Yemen'],
    contextCountries: ['Oman', 'Qatar', 'Kuwait', 'Syria', 'Lebanon', 'Israel', 'Palestine', 'Egypt', 'Iran', 'Turkey'],
    center: [45, 24],
    scale: 750,
  },
  centralAsia: {
    exportCountries: ['Kazakhstan', 'Uzbekistan', 'Turkmenistan'],
    contextCountries: ['Kyrgyzstan', 'Tajikistan', 'Afghanistan', 'Russia', 'China', 'Iran', 'Pakistan'],
    center: [66, 43],
    scale: 750,
  },
  easternEurope: {
    exportCountries: ['Poland', 'Romania', 'Bulgaria', 'Ukraine'],
    contextCountries: ['Germany', 'Hungary', 'Slovakia', 'Czechia', 'Moldova', 'Belarus', 'Serbia', 'Greece', 'Turkey'],
    center: [20, 50],
    scale: 800,
  },
};

export default function Inventory() {
  const { t, isRTL } = useLanguage();
  const [filters, setFilters] = useState({
    model: 'all',
    year: 'all',
    condition: 'all',
    location: 'all',
  });

  const [savedTrucks, setSavedTrucks] = useState<number[]>([]);

  useEffect(() => {
    const saved = TRUCKS.filter((truck) => isTruckSaved(truck.id)).map((truck) => truck.id);
    setSavedTrucks(saved);
  }, []);

  const filteredTrucks = useMemo(() => {
    return TRUCKS.filter((truck) => {
      if (filters.model !== 'all' && truck.modelType !== filters.model) return false;
      if (filters.condition !== 'all' && truck.condition.toLowerCase() !== filters.condition) return false;
      if (filters.location !== 'all' && truck.location !== filters.location) return false;

      if (filters.year !== 'all') {
        if (filters.year === '2020' && truck.year < 2020) return false;
        if (filters.year === '2018' && (truck.year < 2018 || truck.year > 2019)) return false;
        if (filters.year === '2015' && (truck.year < 2015 || truck.year > 2017)) return false;
      }

      return true;
    });
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      model: 'all',
      year: 'all',
      condition: 'all',
      location: 'all',
    });
  };

  const handleSaveToggle = (e: React.MouseEvent, truckId: number) => {
    e.preventDefault();
    e.stopPropagation();
    const truck = TRUCKS.find((candidate) => candidate.id === truckId);
    if (truck) {
      const nowSaved = toggleSavedTruck({
        id: truck.id,
        brand: truck.brand,
        model: truck.model,
        year: truck.year,
        image: truck.image,
        status: truck.status,
        location: truck.location,
        mileage: truck.mileage,
      });

      setSavedTrucks((prev) => (nowSaved ? [...prev, truckId] : prev.filter((id) => id !== truckId)));
    }
  };

  const activeFilterCount = Object.values(filters).filter((value) => value !== 'all').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const splitCountries = (text: string) => {
    if (text.includes(',')) {
      return text.split(', ').map((item) => item.trim()).filter(Boolean);
    }
    if (text.includes('\u060C')) {
      return text.split('\u060C').map((item) => item.trim()).filter(Boolean);
    }
    return text ? [text] : [];
  };

  const exportRegions: { key: RegionKey; label: string; countries: string[] }[] = [
    {
      key: 'northAfrica',
      label: t('markets.northAfrica'),
      countries: splitCountries(t('markets.northAfricaCountries')),
    },
    {
      key: 'westAfrica',
      label: t('markets.westAfrica'),
      countries: splitCountries(t('markets.westAfricaCountries')),
    },
    {
      key: 'eastAfrica',
      label: t('markets.eastAfrica'),
      countries: splitCountries(t('markets.eastAfricaCountries')),
    },
    {
      key: 'middleEast',
      label: t('markets.middleEast'),
      countries: splitCountries(t('markets.middleEastCountries')),
    },
    {
      key: 'centralAsia',
      label: t('markets.centralAsia'),
      countries: splitCountries(t('markets.centralAsiaCountries')),
    },
    {
      key: 'easternEurope',
      label: t('markets.easternEurope'),
      countries: splitCountries(t('markets.easternEuropeCountries')),
    },
  ];

  const [activeRegion, setActiveRegion] = useState<RegionKey | null>(null);
  const mapBoundsRef = useRef<HTMLDivElement | null>(null);
  const mapConfig = activeRegion ? regionMapConfig[activeRegion] : null;

  const exportCountrySet = useMemo(() => {
    if (!mapConfig) return new Set<string>();
    return new Set(mapConfig.exportCountries.map(normalizeCountryName));
  }, [mapConfig]);

  const displayCountrySet = useMemo(() => {
    if (!mapConfig) return new Set<string>();
    return new Set([...mapConfig.exportCountries, ...mapConfig.contextCountries].map(normalizeCountryName));
  }, [mapConfig]);

  const activeRegionData = activeRegion
    ? exportRegions.find((region) => region.key === activeRegion)
    : null;
  const activeRegionCountries = activeRegionData?.countries || [];
  const activeRegionLabel = activeRegionData?.label || '';

  return (
    <div className="min-h-screen bg-white-smoke">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={isRTL ? 'text-right mb-10' : 'mb-10'}
        >
          <h1 className="text-5xl md:text-6xl font-black text-mint-700 mb-4 uppercase tracking-tight">
            {t('inventory.title')}
          </h1>
          <div className={`flex items-center gap-4 text-lg text-charcoal-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <p className="font-medium">
              <span className="font-black text-charcoal-900 text-2xl">{filteredTrucks.length}</span>{' '}
              {t('inventory.vehiclesAvailable')}
            </p>
            <span className="text-charcoal-400">/</span>
            <p className="text-charcoal-500 font-bold uppercase tracking-wide">{t('inventory.updated')}</p>
          </div>
        </motion.div>

        <div className={`lg:flex gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10 lg:mb-0 lg:w-72 xl:w-80"
          >
            <div className="surface-panel rounded-3xl p-6">
              <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className="text-lg font-black text-mint-700 uppercase tracking-wide">{t('inventory.filters')}</h2>
                {activeFilterCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-4 py-2 text-[0.6rem] font-black text-charcoal-700 border-2 border-charcoal-300 hover:border-mint-500 rounded-full transition-colors uppercase tracking-[0.2em]"
                  >
                    {t('inventory.clearFilters')} ({activeFilterCount})
                  </motion.button>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-black text-charcoal-500 mb-2 uppercase tracking-wider">
                    {t('inventory.model')}
                  </label>
                  <select
                    value={filters.model}
                    onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-charcoal-200 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-all bg-white text-charcoal-900 font-bold"
                  >
                    <option value="all">{t('inventory.allModels')}</option>
                    <option value="actros">Actros</option>
                    <option value="atego">Atego</option>
                    <option value="arocs">Arocs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-charcoal-500 mb-2 uppercase tracking-wider">
                    {t('inventory.year')}
                  </label>
                  <select
                    value={filters.year}
                    onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-charcoal-200 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-all bg-white text-charcoal-900 font-bold"
                  >
                    <option value="all">{t('inventory.allYears')}</option>
                    <option value="2020">2020+</option>
                    <option value="2018">2018-2019</option>
                    <option value="2015">2015-2017</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-charcoal-500 mb-2 uppercase tracking-wider">
                    {t('inventory.condition')}
                  </label>
                  <select
                    value={filters.condition}
                    onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-charcoal-200 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-all bg-white text-charcoal-900 font-bold"
                  >
                    <option value="all">{t('inventory.allConditions')}</option>
                    <option value="used">{t('inventory.conditionUsed')}</option>
                    <option value="fleet">{t('inventory.conditionFleet')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-charcoal-500 mb-2 uppercase tracking-wider">
                    {t('inventory.location')}
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-charcoal-200 focus:border-mint-500 focus:ring-2 focus:ring-mint-500/20 transition-all bg-white text-charcoal-900 font-bold"
                  >
                    <option value="all">{t('inventory.allLocations')}</option>
                    <option value="Hamburg">Hamburg</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Munich">Munich</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 border-t border-charcoal-200 pt-6">
                <div className="text-xs font-black text-mint-700 uppercase tracking-[0.2em] mb-4">
                  Export Regions
                </div>
                <div className="space-y-3">
                  {exportRegions.map((region) => (
                    <button
                      key={region.key}
                      onClick={() => setActiveRegion(region.key)}
                      className={`w-full text-left px-4 py-3 rounded-2xl border transition-colors ${
                        activeRegion === region.key
                          ? 'border-mint-600 bg-mint-50'
                          : 'border-charcoal-200 bg-white hover:border-mint-600'
                      }`}
                    >
                        <div className="text-sm font-bold text-mint-700">{region.label}</div>
                      <div className="text-[0.65rem] text-charcoal-500 mt-1">
                        {region.countries.slice(0, 4).join(', ')}
                        {region.countries.length > 4 ? '...' : ''}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 space-y-10">
            <AnimatePresence mode="wait">
              {filteredTrucks.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-20 surface-panel rounded-3xl"
                >
                  <div className="text-2xl font-black text-charcoal-900 mb-6">{t('inventory.noResults')}</div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-8 py-4 bg-mint-600 text-white font-black rounded-full transition-colors shadow-lg uppercase tracking-[0.2em] text-xs hover:bg-mint-700"
                  >
                    {t('inventory.clearAll')}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                >
              {filteredTrucks.map((truck) => {
                const isSaved = savedTrucks.includes(truck.id);
                const savedLabel = isSaved ? 'Saved' : t('common.save');
                
                return (
                  <motion.div key={truck.id} variants={itemVariants} whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                    <Link to={`/truck/${truck.id}`} className="block surface-panel rounded-3xl overflow-hidden transition-all">
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent z-10"></div>
                        <motion.img
                          src={truck.image}
                          alt={`${truck.brand} ${truck.model}`}
                          className="w-full h-56 object-cover brightness-95 contrast-110"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />

                        <motion.button
                          onClick={(e) => handleSaveToggle(e, truck.id)}
                          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-20 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 shadow-lg border ${
                            isSaved
                              ? 'bg-[#CBA24A] text-white border-[#CBA24A] shadow-[0_10px_20px_rgba(203,162,74,0.35)]'
                              : 'bg-white/90 text-charcoal-700 hover:bg-white border-charcoal-200'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill={isSaved ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                          </svg>
                          <span className="text-[0.6rem] font-black uppercase tracking-[0.2em]">
                            {savedLabel}
                          </span>
                        </motion.button>

                        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} flex flex-col gap-2 z-20`}>
                          {truck.immediateExport && (
                            <span className="px-3 py-1 rounded-full bg-mint-600 text-white text-[0.6rem] font-black uppercase tracking-[0.2em]">
                              {t('common.immediateExport')}
                            </span>
                          )}
                          {truck.updatedDaysAgo <= 3 && (
                            <span className="px-3 py-1 rounded-full bg-white/90 text-charcoal-700 text-[0.6rem] font-black uppercase tracking-[0.2em]">
                              {t('inventory.updated')} {truck.updatedDaysAgo}d
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="text-xs text-charcoal-500 mb-2 font-black tracking-[0.3em]">
                          {truck.brand}
                        </div>
                        <h3 className="text-2xl font-black text-mint-700 mb-4">{truck.model}</h3>

                        <div className="grid grid-cols-2 gap-4 text-xs text-charcoal-600 mb-5">
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="uppercase tracking-[0.2em]">{t('inventory.year')}</span>
                            <span className="font-bold text-charcoal-900">{truck.year}</span>
                          </div>
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="uppercase tracking-[0.2em]">{t('truckDetail.mileage')}</span>
                            <span className="font-bold text-charcoal-900">{truck.mileage}</span>
                          </div>
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="uppercase tracking-[0.2em]">{t('inventory.condition')}</span>
                            <span className="font-bold text-charcoal-900">{truck.condition}</span>
                          </div>
                          <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className="uppercase tracking-[0.2em]">{t('inventory.location')}</span>
                            <span className="font-bold text-charcoal-900">{truck.location}</span>
                          </div>
                        </div>

                        <div className="mb-5">
                          <div className="text-[0.65rem] font-black text-charcoal-500 mb-3 uppercase tracking-[0.2em]">
                            {t('common.shipsTo')}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {truck.availableRegions.slice(0, 3).map((region) => (
                              <span
                                key={region}
                                className="text-[0.6rem] px-3 py-2 bg-mint-50 text-mint-700 rounded-full border border-mint-200 font-bold uppercase tracking-[0.18em]"
                              >
                                {region}
                              </span>
                            ))}
                            {truck.availableRegions.length > 3 && (
                              <span className="text-[0.6rem] px-3 py-2 bg-charcoal-100 text-charcoal-600 rounded-full border border-charcoal-200 font-bold uppercase tracking-[0.18em]">
                                +{truck.availableRegions.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <span className="px-3 py-2 rounded-full bg-charcoal-100 text-charcoal-700 text-[0.6rem] font-black uppercase tracking-[0.2em]">
                            {t(`common.${truck.status.toLowerCase()}`)}
                          </span>
                          <span className="text-charcoal-700 font-black text-xs uppercase tracking-[0.2em]">
                            {t('common.viewDetails')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="surface-panel rounded-[32px] p-12 md:p-16">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase text-mint-700">
                {t('inventory.needSpecific')}
              </h2>
              <p className="text-lg text-charcoal-600 mb-10 leading-relaxed font-semibold">
                {t('inventory.needSpecificDesc')}
              </p>
              <div className={`flex flex-col sm:flex-row gap-5 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/966535877310"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-mint-600 text-white font-black px-8 py-4 rounded-full transition-colors uppercase tracking-[0.2em] text-xs hover:bg-mint-700"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>{t('common.whatsapp')}</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:medvip66@gmail.com"
                  className="inline-flex items-center justify-center border border-charcoal-200 text-charcoal-800 font-black px-8 py-4 rounded-full hover:border-mint-600 transition-all uppercase tracking-[0.2em] text-xs"
                >
                  {t('common.email')}
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    <AnimatePresence>
      {activeRegion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/40 px-6"
          onClick={() => setActiveRegion(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-4xl surface-panel rounded-[32px] p-6 shadow-[0_30px_60px_rgba(11,47,28,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-charcoal-500">Export Map</div>
                <div className="text-2xl font-black text-mint-700">{activeRegionLabel}</div>
              </div>
              <button
                onClick={() => setActiveRegion(null)}
                className="text-sm font-black uppercase tracking-[0.2em] text-charcoal-500 hover:text-charcoal-900"
              >
                Close
              </button>
            </div>

            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
              <div className="relative rounded-[28px] border border-charcoal-200 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-smoke-dark/70 via-white to-white pointer-events-none"></div>
                <div ref={mapBoundsRef} className="relative w-full aspect-[4/3] overflow-hidden">
                  <motion.div
                    drag
                    dragConstraints={mapBoundsRef}
                    dragElastic={0.12}
                    dragMomentum={false}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    <ComposableMap
                      projection="geoMercator"
                      projectionConfig={{
                        center: mapConfig?.center ?? [0, 0],
                        scale: mapConfig?.scale ?? 1,
                      }}
                      width={760}
                      height={520}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                          geographies
                            .filter((geo) => displayCountrySet.has(normalizeCountryName(getGeoName(geo))))
                            .map((geo) => {
                              const name = getGeoName(geo);
                              const normalizedName = normalizeCountryName(name);
                              const isExport = exportCountrySet.has(normalizedName);
                              const baseFill = isExport ? '#0B2F1C' : '#D6CEC2';
                              const hoverFill = isExport ? '#1B7A45' : '#CFC7BC';

                              return (
                                <Geography
                                  key={geo.rsmKey}
                                  geography={geo}
                                  stroke="#BFC7BB"
                                  strokeWidth={0.6}
                                  className={isExport ? 'cursor-pointer' : 'cursor-default'}
                                  style={{
                                    default: { fill: baseFill, outline: 'none' },
                                    hover: { fill: hoverFill, outline: 'none' },
                                    pressed: { fill: hoverFill, outline: 'none' },
                                  }}
                                  title={name}
                                />
                              );
                            })
                        }
                      </Geographies>
                    </ComposableMap>
                  </motion.div>
                </div>
                <div className="absolute bottom-4 right-4 text-[0.6rem] font-semibold text-charcoal-500 uppercase tracking-[0.2em]">
                  Drag to explore
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.25em] text-mint-700">Countries</div>
                <div className="flex flex-wrap gap-2">
                  {activeRegionCountries.map((country) => (
                    <span
                      key={country}
                      className="px-3 py-2 rounded-full bg-mint-50 text-mint-700 border border-mint-200 text-[0.65rem] font-bold uppercase tracking-[0.2em]"
                    >
                      {country}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  Hover export countries to highlight. Drag the map to explore the region.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
  );
}
