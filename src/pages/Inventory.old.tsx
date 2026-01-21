import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { TRUCKS } from '@/lib/truckData';
import { toggleSavedTruck, isTruckSaved } from '@/lib/truckStorage';
import { useLanguage } from '@/context/LanguageContext';

export default function Inventory() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    model: 'all',
    year: 'all',
    condition: 'all',
    location: 'all',
  });
  
  const [savedTrucks, setSavedTrucks] = useState<number[]>([]);

  // Initialize saved trucks from localStorage
  useState(() => {
    const saved = TRUCKS.filter(t => isTruckSaved(t.id)).map(t => t.id);
    setSavedTrucks(saved);
  });

  // Filter trucks based on selected filters
  const filteredTrucks = useMemo(() => {
    return TRUCKS.filter(truck => {
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
    const truck = TRUCKS.find(t => t.id === truckId);
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
      
      setSavedTrucks(prev => 
        nowSaved ? [...prev, truckId] : prev.filter(id => id !== truckId)
      );
    }
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length;

  return (
    <div className="min-h-screen bg-white-smoke">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-charcoal-900 mb-2">{t('inventory.title')}</h1>
          <p className="text-charcoal-500">
            {filteredTrucks.length} {t('inventory.vehiclesAvailable')} • {t('inventory.updated')}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-charcoal-200 p-6 mb-8 shadow-subtle">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-600 mb-2 uppercase tracking-wide">Model</label>
              <select
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                className="w-full px-3 py-2.5 border border-charcoal-300 bg-white text-charcoal-900 text-sm focus:outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-500 transition-colors"
              >
                <option value="all">All Models</option>
                <option value="actros">Actros</option>
                <option value="arocs">Arocs</option>
                <option value="atego">Atego</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-600 mb-2 uppercase tracking-wide">Year</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="w-full px-3 py-2.5 border border-charcoal-300 bg-white text-charcoal-900 text-sm focus:outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-500 transition-colors"
              >
                <option value="all">All Years</option>
                <option value="2020">2020+</option>
                <option value="2018">2018-2019</option>
                <option value="2015">2015-2017</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-600 mb-2 uppercase tracking-wide">Condition</label>
              <select
                value={filters.condition}
                onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                className="w-full px-3 py-2.5 border border-charcoal-300 bg-white text-charcoal-900 text-sm focus:outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-500 transition-colors"
              >
                <option value="all">All</option>
                <option value="fleet">Fleet</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-600 mb-2 uppercase tracking-wide">Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-3 py-2.5 border border-charcoal-300 bg-white text-charcoal-900 text-sm focus:outline-none focus:border-mint-500 focus:ring-1 focus:ring-mint-500 transition-colors"
              >
                <option value="all">All Locations</option>
                <option value="Hamburg">Hamburg</option>
                <option value="München">München</option>
                <option value="Berlin">Berlin</option>
              </select>
            </div>

            <div className="flex items-end">
              {activeFilterCount > 0 && (
                <button 
                  onClick={clearFilters}
                  className="w-full px-4 py-2.5 border border-charcoal-400 text-charcoal-700 text-sm font-medium hover:border-charcoal-900 hover:text-charcoal-900 transition-colors"
                >
                  Clear ({activeFilterCount})
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Inventory Grid */}
        {filteredTrucks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal-500 mb-4">No vehicles match your filters.</p>
            <button 
              onClick={clearFilters}
              className="px-6 py-3 border border-charcoal-400 text-charcoal-700 font-medium hover:border-charcoal-900 hover:text-charcoal-900 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrucks.map((truck) => {
              const isSaved = savedTrucks.includes(truck.id);
              
              return (
                <Link
                  key={truck.id}
                  to={`/truck/${truck.id}`}
                  className="group border border-charcoal-200 bg-white hover:border-charcoal-400 hover:shadow-card transition-all relative"
                >
                  {/* Save button with improved UX */}
                  <button
                    onClick={(e) => handleSaveToggle(e, truck.id)}
                    className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm transition-all transform hover:scale-105 ${
                      isSaved 
                        ? 'bg-claret-600 text-white border-2 border-claret-600' 
                        : 'bg-white/95 text-charcoal-700 border-2 border-charcoal-300 hover:border-claret-600 hover:text-claret-600'
                    }`}
                    title={isSaved ? "Saved to watchlist" : "Save for later"}
                  >
                    <svg 
                      className={`w-4 h-4 transition-transform ${isSaved ? 'scale-110' : ''}`}
                      viewBox="0 0 24 24" 
                      fill={isSaved ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="text-xs font-semibold">{isSaved ? 'Saved' : 'Save'}</span>
                  </button>

                  {/* Badges - Mint background with Claret text */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {truck.immediateExport && (
                      <span className="px-3 py-1.5 rounded-full bg-mint-100 text-claret-700 text-xs font-bold uppercase tracking-wide shadow-md border border-mint-300">
                        Immediate Export
                      </span>
                    )}
                    {truck.updatedDaysAgo <= 3 && (
                      <span className="px-3 py-1.5 rounded-full bg-mint-100 text-claret-700 text-xs font-semibold shadow-md border border-mint-300">
                        Updated {truck.updatedDaysAgo}d ago
                      </span>
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <img 
                      src={truck.image} 
                      alt={`${truck.brand} ${truck.model}`}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-5">
                    <div className="text-xs text-charcoal-500 mb-1 font-medium tracking-wide">{truck.brand.toUpperCase()}</div>
                    <h3 className="text-lg font-semibold text-charcoal-900 mb-3 group-hover:text-claret-600 transition-colors">{truck.model}</h3>
                    
                    <div className="text-sm text-charcoal-600 space-y-1.5 mb-4">
                      <div className="flex justify-between">
                        <span>Year</span>
                        <span className="font-medium text-charcoal-900">{truck.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mileage</span>
                        <span className="font-medium text-charcoal-900">{truck.mileage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Condition</span>
                        <span className="font-medium text-charcoal-900">{truck.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location</span>
                        <span className="font-medium text-charcoal-900">{truck.location}</span>
                      </div>
                    </div>
                    
                    {/* Available Regions */}
                    <div className="mb-4 pb-4 border-b border-charcoal-200">
                      <div className="text-xs font-semibold text-charcoal-600 mb-2">Ships to:</div>
                      <div className="flex flex-wrap gap-1">
                        {truck.availableRegions.slice(0, 3).map(region => (
                          <span key={region} className="text-xs px-2 py-0.5 bg-mint-50 text-mint-700 border border-mint-200">
                            {region}
                          </span>
                        ))}
                        {truck.availableRegions.length > 3 && (
                          <span className="text-xs px-2 py-0.5 bg-charcoal-100 text-charcoal-600">
                            +{truck.availableRegions.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-semibold px-2 py-1 ${
                        truck.status === 'Available' 
                          ? 'bg-mint-100 text-mint-700' 
                          : 'bg-charcoal-100 text-charcoal-600'
                      }`}>
                        {truck.status}
                      </span>
                      <span className="text-sm text-claret-600 font-medium group-hover:translate-x-1 transition-transform">View Details →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        
        <div className="mt-12 pt-8 border-t border-charcoal-200">
          <div className="bg-white border border-charcoal-200 p-8 shadow-subtle">
            <h2 className="text-xl font-semibold text-charcoal-900 mb-3">Need Specific Requirements?</h2>
            <p className="text-charcoal-600 mb-6">
              Looking for a particular model, configuration, or quantity? Contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/491234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-claret-600 text-white font-medium py-3 px-6 hover:bg-claret-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:info@eurotruckexport.com"
                className="inline-flex items-center justify-center border border-charcoal-400 text-charcoal-700 font-medium py-3 px-6 hover:border-charcoal-900 hover:text-charcoal-900 transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
