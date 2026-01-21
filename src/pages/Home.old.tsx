import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import RecentlyViewed from '../components/RecentlyViewed';

export default function Home() {
  const { t } = useLanguage();

  const featuredTrucks = [
    {
      id: 1,
      brand: 'Mercedes-Benz',
      model: 'Actros 1851',
      year: 2020,
      mileage: '290,000 km',
      condition: 'Fleet',
      euro: 'Euro 6',
      location: 'Hamburg',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80'
    },
    {
      id: 2,
      brand: 'Mercedes-Benz',
      model: 'Arocs 3340',
      year: 2019,
      mileage: '380,000 km',
      condition: 'Fleet',
      euro: 'Euro 6',
      location: 'München',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80'
    },
    {
      id: 3,
      brand: 'Mercedes-Benz',
      model: 'Actros 1848',
      year: 2021,
      mileage: '180,000 km',
      condition: 'Fleet',
      euro: 'Euro 6',
      location: 'Hamburg',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80'
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-off-black text-warm-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-off-black via-soft-charcoal to-steel-800 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="text-steel-300 text-sm font-medium tracking-wider mb-4 animate-fade-in">
              SINCE 2007
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              Mercedes-Benz Commercial Vehicles from Germany
            </h1>
            
            <p className="text-lg md:text-xl text-steel-300 mb-10 leading-relaxed animate-slide-up-delay-1">
              Export-ready trucks sourced from German fleets and dealers. Full documentation, customs clearance, and port delivery included.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-delay-2">
              <Link
                to="/inventory"
                className="inline-flex items-center justify-center bg-warm-white text-off-black font-semibold py-4 px-8 hover:bg-canvas transition-all hover:scale-105"
              >
                View Inventory
              </Link>
              
              <a
                href="https://wa.me/491234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-warm-white text-warm-white font-semibold py-4 px-8 hover:bg-warm-white hover:text-off-black transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Inventory */}
      <section className="py-16 md:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-off-black mb-2">
                Current Stock
              </h2>
              <p className="text-steel-600">Updated weekly from German sources</p>
            </div>
            <Link 
              to="/inventory" 
              className="text-accent hover:text-accent-hover font-semibold transition-colors flex items-center gap-2 group"
            >
              <span>View All</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTrucks.map((truck, index) => (
              <Link 
                key={truck.id}
                to={`/truck/${truck.id}`}
                className="group border border-steel-300 bg-white hover:border-steel-600 hover:shadow-card transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="overflow-hidden">
                  <img 
                    src={truck.image}
                    alt={`${truck.brand} ${truck.model}`}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-steel-500 font-medium tracking-wide mb-1">
                    {truck.brand.toUpperCase()}
                  </div>
                  <h3 className="text-xl font-semibold text-off-black mb-3 group-hover:text-accent transition-colors">
                    {truck.model}
                  </h3>
                  <div className="text-sm text-steel-600 space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Year</span>
                      <span className="font-medium text-off-black">{truck.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mileage</span>
                      <span className="font-medium text-off-black">{truck.mileage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location</span>
                      <span className="font-medium text-off-black">{truck.location}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-steel-300 flex justify-between items-center">
                    <span className="text-xs font-semibold px-2 py-1 bg-canvas text-steel-700">
                      {truck.status}
                    </span>
                    <span className="text-sm text-accent font-medium group-hover:translate-x-1 transition-transform">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Export Destinations */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-off-black mb-3">
              Export to Your Region
            </h2>
            <p className="text-steel-600 text-lg">
              We ship Mercedes-Benz commercial vehicles to over 40 countries. Full customs clearance and documentation included.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['North Africa', 'West Africa', 'East Africa', 'Middle East', 'Central Asia', 'Eastern Europe'].map((region) => (
              <div key={region} className="p-4 border border-steel-300 hover:border-accent hover:shadow-subtle transition-all">
                <div className="text-sm font-semibold text-off-black">{region}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              to="/markets" 
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors group"
            >
              <span>View All Export Markets</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-off-black mb-12 text-center">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-steel-300 hover:shadow-card transition-all">
              <div className="text-4xl font-bold text-accent mb-4">01</div>
              <h3 className="text-xl font-bold text-off-black mb-3">Browse & Select</h3>
              <p className="text-steel-600 leading-relaxed">
                Filter inventory by model, year, and condition. All vehicles sourced from verified German suppliers.
              </p>
            </div>
            <div className="bg-white p-8 border border-steel-300 hover:shadow-card transition-all">
              <div className="text-4xl font-bold text-accent mb-4">02</div>
              <h3 className="text-xl font-bold text-off-black mb-3">Request Documentation</h3>
              <p className="text-steel-600 leading-relaxed">
                Contact directly for detailed photos, service history, inspection reports, and VIN verification.
              </p>
            </div>
            <div className="bg-white p-8 border border-steel-300 hover:shadow-card transition-all">
              <div className="text-4xl font-bold text-accent mb-4">03</div>
              <h3 className="text-xl font-bold text-off-black mb-3">Export & Delivery</h3>
              <p className="text-steel-600 leading-relaxed">
                We handle all documentation, customs clearance, and port delivery. Timeline: 3-5 weeks to your destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed Section */}
      <section className="py-16 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-6">
          <RecentlyViewed />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-charcoal-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Looking for Specific Requirements?
          </h2>
          <p className="text-steel-300 text-lg mb-8">
            Contact us for bulk orders, specific models, or custom export arrangements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/491234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-warm-white text-off-black font-semibold py-4 px-8 hover:bg-canvas transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp: +49 123 456 7890</span>
            </a>
            <a
              href="mailto:info@eurotruckexport.com"
              className="inline-flex items-center justify-center border-2 border-warm-white text-warm-white font-semibold py-4 px-8 hover:bg-warm-white hover:text-off-black transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
