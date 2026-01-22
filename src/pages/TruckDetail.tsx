import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTruckById } from '@/lib/truckData';
import { addToRecentlyViewed, toggleSavedTruck, isTruckSaved } from '@/lib/truckStorage';
import { useLanguage } from '@/context/LanguageContext';

export default function TruckDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const { t, language, isRTL } = useLanguage();

  const truck = getTruckById(Number(id));

  useEffect(() => {
    if (truck) {
      addToRecentlyViewed({
        id: truck.id,
        brand: truck.brand,
        model: truck.model,
        year: truck.year,
        image: truck.image,
        status: truck.status,
        location: truck.location,
        mileage: truck.mileage,
      });
      
      setIsSaved(isTruckSaved(truck.id));
    }
  }, [truck]);

  if (!truck) {
    return (
      <div className="min-h-screen bg-white-smoke flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-mint-700 mb-4">{t('truckDetail.notFound')}</h1>
          <Link to="/inventory" className="text-charcoal-700 hover:text-charcoal-900 font-medium">
             {t('common.backToInventory')}
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveToggle = () => {
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
    setIsSaved(nowSaved);
  };

  const docsReady = Object.values(truck.documentation).filter(status => status === 'ready').length;
  const docsTotal = Object.keys(truck.documentation).length;

  // Contact information based on language
  const isArabic = language === 'ar';
  const primaryContact = isArabic
    ? {
        name: 'Ayman',
        phone: '+966 53 587 7310',
        whatsapp: 'https://wa.me/966535877310',
        email: 'medvip66@gmail.com',
        label: t('truckDetail.arabicSpeaker'),
      }
    : {
        name: 'Mrs. Kampfer',
        phone: '+41 78 713 77 77',
        whatsapp: 'https://wa.me/41787137777',
        email: 'as.trucks@gmx.ch',
        label: t('truckDetail.frenchEnglishGerman'),
      };

  const secondaryContact = isArabic
    ? {
        name: 'Mrs. Kampfer',
        phone: '+41 78 713 77 77',
        whatsapp: 'https://wa.me/41787137777',
        email: 'as.trucks@gmx.ch',
        label: t('truckDetail.frenchEnglishGerman'),
      }
    : {
        name: 'Ayman',
        phone: '+966 53 587 7310',
        whatsapp: 'https://wa.me/966535877310',
        email: 'medvip66@gmail.com',
        label: t('truckDetail.arabicSpeaker'),
      };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const docLabels: { [key: string]: string } = {
    coc: t('truckDetail.cofi'),
    registration: t('truckDetail.registration'),
    serviceHistory: t('truckDetail.serviceHistory'),
    exportLicense: t('truckDetail.exportLicense'),
    customsForms: t('truckDetail.customsForms'),
  };

  return (
    <div className={`min-h-screen bg-white-smoke ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 text-sm text-charcoal-500 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Link to="/" className="hover:text-mint-600 transition-colors">{t('truckDetail.home')}</Link>
          <span>/</span>
          <Link to="/inventory" className="hover:text-mint-600 transition-colors">{t('nav.inventory')}</Link>
          <span>/</span>
          <span className="text-charcoal-900 font-medium">{truck.brand} {truck.model}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-8"
          >
            {/* Title, Status and Save */}
            <motion.div variants={itemVariants} className={`flex justify-between items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : ''}>
                <div className={`text-xs text-charcoal-500 font-semibold tracking-wider mb-2 ${isRTL ? 'text-right' : ''}`}>{truck.brand.toUpperCase()}</div>
                <h1 className="text-4xl md:text-5xl font-bold text-mint-700 mb-4">
                  {truck.model}
                </h1>
                <div className={`flex items-center gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-2xl font-semibold text-charcoal-600">{truck.year}</span>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
                    truck.status === 'Available' 
                      ? 'bg-mint-100 text-mint-700 border border-mint-300' 
                      : 'bg-charcoal-100 text-charcoal-600'
                  }`}>
                    {t(`common.${truck.status.toLowerCase()}`)}
                  </span>
                  {truck.immediateExport && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="px-3 py-1.5 rounded-full bg-gradient-to-r from-mint-100 to-mint-200 text-mint-700 text-xs font-bold uppercase tracking-wide shadow-sm border border-mint-300"
                    >
                      {t('truckDetail.immediateExportReady')}
                    </motion.span>
                  )}
                  <span className="text-sm text-charcoal-500">
                    {t('truckDetail.updatedDaysAgo')} {truck.updatedDaysAgo} {truck.updatedDaysAgo === 1 ? t('truckDetail.dayAgo') : t('truckDetail.daysAgo')}
                  </span>
                </div>
              </div>
              
              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveToggle}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all ${
                  isSaved 
                    ? 'bg-mint-600 text-white border-2 border-mint-600' 
                    : 'bg-white text-charcoal-700 border-2 border-charcoal-200 hover:border-mint-600 hover:text-charcoal-900'
                }`}
                title={isSaved ? t('truckDetail.savedToWatchlist') : t('truckDetail.saveForLater')}
              >
                <motion.svg 
                  animate={isSaved ? { scale: [1, 1.2, 1] } : {}}
                  className="w-5 h-5"
                  viewBox="0 0 24 24" 
                  fill={isSaved ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </motion.svg>
                <span className="font-semibold">{isSaved ? t('truckDetail.savedToWatchlist') : t('truckDetail.saveForLater')}</span>
              </motion.button>
            </motion.div>

            {/* Image Gallery */}
            <motion.div variants={itemVariants} className="surface-panel rounded-3xl overflow-hidden">
              {/* Videos Section - Show First */}
              {truck.videos && truck.videos.length > 0 && (
                <div className="p-6 bg-charcoal-900">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
                    {t('truckDetail.videos') || 'Videos'}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {truck.videos.map((video, i) => (
                      <div key={i} className="relative">
                        <video 
                          controls 
                          className="w-full rounded-lg"
                          preload="metadata"
                          poster={truck.image}
                        >
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Image Gallery */}
              <div className="relative bg-charcoal-900">
                {/* Dark industrial overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-charcoal-900/20 z-10 pointer-events-none"></div>
                
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={truck.images[selectedImage]} 
                    alt={`${truck.brand} ${truck.model}`}
                    className="w-full aspect-[16/9] object-cover brightness-90 contrast-110 saturate-90"
                  />
                </AnimatePresence>
                <div className="absolute top-4 right-4 bg-charcoal-900/80 text-white px-3 py-1 rounded-full text-sm z-20">
                  {selectedImage + 1} / {truck.images.length}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 p-4 bg-smoke-dark">
                {truck.images.map((img, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(i)}
                    className={`relative overflow-hidden transition-all border-2 ${
                      selectedImage === i 
                        ? 'border-mint-500 shadow-lg' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`View ${i+1}`}
                      className="w-full aspect-[4/3] object-cover brightness-90 contrast-110 saturate-90"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Available Regions */}
            <motion.div variants={itemVariants} className="surface-panel rounded-3xl p-6">
              <h2 className={`text-xl font-bold text-mint-700 mb-4 ${isRTL ? 'text-right' : ''}`}>{t('truckDetail.shipsTo')}</h2>
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {truck.availableRegions.map((region, idx) => (
                  <motion.span
                    key={region}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-mint-50 text-mint-700 border border-mint-300 font-medium"
                  >
                    {region}
                  </motion.span>
                ))}
              </div>
              <p className={`text-sm text-charcoal-600 mt-4 ${isRTL ? 'text-right' : ''}`}>
                {t('truckDetail.shipsToDesc')}
              </p>
            </motion.div>

            {/* Technical Specifications */}
            <motion.div variants={itemVariants} className="surface-panel rounded-3xl p-8">
              <h2 className={`text-2xl font-bold text-mint-700 mb-6 ${isRTL ? 'text-right' : ''}`}>{t('truckDetail.technicalSpecs')}</h2>
              
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {[
                  { label: t('truckDetail.mileage'), value: truck.mileage },
                  { label: t('truckDetail.condition'), value: truck.condition },
                  { label: t('truckDetail.engine'), value: truck.engine },
                  { label: t('truckDetail.euroStandard'), value: truck.euro },
                  { label: t('truckDetail.transmission'), value: truck.transmission },
                  { label: t('truckDetail.axleConfig'), value: truck.axle },
                  { label: t('truckDetail.cabinType'), value: truck.cabin },
                  { label: t('truckDetail.location'), value: truck.location },
                ].map((spec, idx) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex justify-between border-b border-charcoal-200 pb-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <span className="text-sm font-semibold text-charcoal-600">{spec.label}</span>
                    <span className="text-sm font-bold text-charcoal-900">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Documentation Status */}
            <motion.div variants={itemVariants} className="surface-panel rounded-3xl p-8">
              <div className={`flex justify-between items-start mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <h2 className="text-2xl font-bold text-mint-700 mb-2">{t('truckDetail.documentation')}</h2>
                  <p className="text-sm text-charcoal-600">
                    {docsReady} {t('truckDetail.docsReady')} / {docsTotal}
                  </p>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className={`px-4 py-2 font-bold text-sm ${
                    docsReady === docsTotal 
                      ? 'bg-mint-100 text-mint-700' 
                      : 'bg-charcoal-100 text-charcoal-700'
                  }`}
                >
                  {docsReady === docsTotal ? t('truckDetail.allReady') : t('truckDetail.preparing')}
                </motion.div>
              </div>
              
              <div className="space-y-3">
                {Object.entries(truck.documentation).map(([key, status], idx) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className={`flex items-center justify-between p-4 bg-smoke-dark border border-charcoal-200 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.08 + 0.2 }}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          status === 'ready' ? 'bg-mint-500' : 'bg-charcoal-300'
                        }`}
                      >
                        {status === 'ready' && (
                          <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.08 + 0.3 }}
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </motion.svg>
                        )}
                      </motion.div>
                      <span className="font-medium text-charcoal-900">
                        {docLabels[key] || key}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wide ${
                      status === 'ready' ? 'text-mint-700' : 'text-charcoal-600'
                    }`}>
                      {status === 'ready' ? t('truckDetail.ready') : t('truckDetail.availableOnRequest')}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vehicle Information */}
            <motion.div variants={itemVariants} className="surface-panel rounded-3xl p-8">
              <h2 className={`text-2xl font-bold text-mint-700 mb-4 ${isRTL ? 'text-right' : ''}`}>{t('truckDetail.vehicleInfo')}</h2>
              <div className={`text-charcoal-700 space-y-4 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                <p>
                  {truck.brand} {truck.model} ({truck.year}) {t('truckDetail.vehicleInfoDesc1')}
                </p>
                <p>
                  {t('truckDetail.vehicleInfoDesc2')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Sidebar - Contact Block */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="surface-panel rounded-3xl p-8 sticky top-24"
            >
              <h2 className={`text-xl font-bold text-mint-700 mb-6 ${isRTL ? 'text-right' : ''}`}>{t('truckDetail.inquire')}</h2>
              
              {/* Primary Contact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`mb-6 pb-6 border-b border-charcoal-200 ${isRTL ? 'text-right' : ''}`}
              >
                <div className="text-xs text-charcoal-500 font-semibold uppercase tracking-wide mb-2">{primaryContact.label}</div>
                <div className="text-lg font-bold text-charcoal-900 mb-3">{primaryContact.name}</div>
                <div className="space-y-2.5">
                  <motion.a
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    href={primaryContact.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm text-charcoal-700 hover:text-mint-600 transition-colors ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>{primaryContact.phone}</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    href={`mailto:${primaryContact.email}`}
                    className={`flex items-center gap-2 text-sm text-charcoal-700 hover:text-mint-600 transition-colors ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{primaryContact.email}</span>
                  </motion.a>
                </div>
              </motion.div>
              
              {/* Secondary Contact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`mb-6 ${isRTL ? 'text-right' : ''}`}
              >
                <div className="text-xs text-charcoal-500 font-semibold uppercase tracking-wide mb-2">{secondaryContact.label}</div>
                <div className="text-lg font-bold text-charcoal-900 mb-3">{secondaryContact.name}</div>
                <div className="space-y-2.5">
                  <motion.a
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    href={`tel:${secondaryContact.phone}`}
                    className={`flex items-center gap-2 text-sm text-charcoal-700 hover:text-mint-600 transition-colors ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{secondaryContact.phone}</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ x: isRTL ? -5 : 5 }}
                    href={`mailto:${secondaryContact.email}`}
                    className={`flex items-center gap-2 text-sm text-charcoal-700 hover:text-mint-600 transition-colors ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{secondaryContact.email}</span>
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={`pt-6 border-t border-charcoal-200 mb-6 ${isRTL ? 'text-right' : ''}`}
              >
                <div className="font-bold text-charcoal-900 mb-3 text-sm">{t('truckDetail.whatWeProvide')}</div>
                <ul className="space-y-2 text-sm text-charcoal-600">
                  {[
                    t('truckDetail.provideItem1'),
                    t('truckDetail.provideItem2'),
                    t('truckDetail.provideItem3'),
                    t('truckDetail.provideItem4'),
                    t('truckDetail.provideItem5'),
                    t('truckDetail.provideItem6'),
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + idx * 0.05 }}
                      className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <span className="text-charcoal-500 mt-0.5">-</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={primaryContact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full bg-mint-600 text-white font-semibold py-4 px-6 hover:bg-mint-700 transition-all shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>{t('truckDetail.contactViaWhatsapp')}</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Back to Inventory */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Link 
            to="/inventory"
            className={`inline-flex items-center gap-2 text-charcoal-600 hover:text-charcoal-900 font-medium transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <motion.span
              className="transition-transform"
              whileHover={{ x: isRTL ? 5 : -5 }}
            >
              {isRTL ? '>' : '<'}
            </motion.span>
            <span>{t('common.backToInventory')}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}






