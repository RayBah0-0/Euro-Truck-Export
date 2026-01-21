import { Link } from 'react-router-dom';
import { getRecentlyViewed } from '@/lib/truckStorage';
import { getTruckById } from '@/lib/truckData';

export default function RecentlyViewed() {
  const recentlyViewedIds = getRecentlyViewed();
  
  // Get full truck data for recently viewed IDs
  const recentTrucks = recentlyViewedIds
    .map(item => getTruckById(item.id))
    .filter((truck): truck is NonNullable<typeof truck> => truck !== undefined)
    .slice(0, 6);

  if (recentTrucks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-charcoal-200 p-6 md:p-8 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-charcoal-900">Recently Viewed</h2>
        <span className="text-sm text-charcoal-500">Last {recentTrucks.length} viewed</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentTrucks.map((truck) => (
          <Link
            key={truck.id}
            to={`/truck/${truck.id}`}
            className="group border border-charcoal-200 bg-white hover:border-charcoal-400 hover:shadow-card transition-all"
          >
            <div className="relative overflow-hidden">
              <img 
                src={truck.image} 
                alt={`${truck.brand} ${truck.model}`}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Quick status badge */}
              {truck.immediateExport && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 rounded-full bg-mint-100 text-claret-700 text-xs font-bold shadow-md border border-mint-300">
                    Immediate Export
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="text-xs text-charcoal-500 mb-1 font-medium">{truck.brand.toUpperCase()}</div>
              <h3 className="text-base font-semibold text-charcoal-900 mb-2 group-hover:text-claret-600 transition-colors">
                {truck.model}
              </h3>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-charcoal-600">{truck.year}</span>
                <span className="text-claret-600 font-medium group-hover:translate-x-1 transition-transform">
                  View →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
