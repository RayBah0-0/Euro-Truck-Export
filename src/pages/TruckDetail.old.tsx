import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

export default function TruckDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - would come from API in real app
  const truck = {
    id: 1,
    brand: 'Mercedes-Benz',
    model: 'Actros 1851',
    year: 2018,
    mileage: '420,000 km',
    condition: 'Used',
    euro: 'Euro 6',
    status: 'Available',
    location: 'Hamburg, Germany',
    engine: 'OM 471 LA - 375 kW (510 HP)',
    transmission: 'Mercedes PowerShift 3',
    axle: '4x2',
    cabin: 'StreamSpace',
    images: [
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=80',
    ]
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-steel-600 flex items-center gap-2">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/inventory" className="hover:text-accent transition-colors">Inventory</Link>
          <span>/</span>
          <span className="text-off-black font-medium">{truck.brand} {truck.model}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Status */}
            <div>
              <div className="text-xs text-steel-500 font-semibold tracking-wider mb-2">{truck.brand.toUpperCase()}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-off-black mb-4">
                {truck.model}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-steel-600">{truck.year}</span>
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  truck.status === 'Available' 
                    ? 'bg-canvas text-steel-700' 
                    : 'bg-steel-200 text-steel-600'
                }`}>
                  {truck.status}
                </span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white border border-steel-300 shadow-card">
              <div className="relative overflow-hidden">
                <img 
                  src={truck.images[selectedImage]} 
                  alt={`${truck.brand} ${truck.model}`}
                  className="w-full aspect-[16/9] object-cover transition-opacity duration-300"
                />
                {/* Export Ready Badge */}
                <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 text-sm font-bold">
                  EXPORT READY
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 p-4 bg-canvas">
                {truck.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative overflow-hidden transition-all ${
                      selectedImage === i 
                        ? 'ring-2 ring-accent' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`View ${i+1}`}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white border border-steel-300 p-8 shadow-subtle">
              <h2 className="text-2xl font-bold text-off-black mb-6">Technical Specifications</h2>
              
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {[
                  { label: 'Mileage', value: truck.mileage },
                  { label: 'Condition', value: truck.condition },
                  { label: 'Engine', value: truck.engine },
                  { label: 'Euro Standard', value: truck.euro },
                  { label: 'Transmission', value: truck.transmission },
                  { label: 'Axle Config.', value: truck.axle },
                  { label: 'Cabin Type', value: truck.cabin },
                  { label: 'Location', value: truck.location },
                ].map((spec) => (
                  <div key={spec.label} className="flex justify-between border-b border-steel-200 pb-3">
                    <span className="text-sm font-semibold text-steel-600">{spec.label}</span>
                    <span className="text-sm font-bold text-off-black">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-steel-300 p-8 shadow-subtle">
              <h2 className="text-2xl font-bold text-off-black mb-4">Vehicle Information</h2>
              <div className="text-steel-700 space-y-4 leading-relaxed">
                <p>
                  This {truck.brand} {truck.model} ({truck.year}) has been sourced from a verified German commercial fleet operator with complete service history and maintenance records.
                </p>
                <p>
                  The vehicle has undergone thorough inspection and is certified export-ready. All documentation is prepared including German registration papers, service records, export license, and customs declaration.
                </p>
                <div className="mt-6 pt-6 border-t border-steel-300">
                  <div className="font-bold text-off-black mb-3">Included Documentation:</div>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      <span>German Registration Papers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      <span>Complete Service History</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      <span>Export License</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      <span>Customs Declaration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      <span>Inspection Report</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      <span>Bill of Lading</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Block */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-steel-400 p-8 sticky top-24 shadow-card">
              <h2 className="text-xl font-bold text-off-black mb-6">Inquire About This Vehicle</h2>
              
              {/* Arabic Speaker */}
              <div className="mb-6 pb-6 border-b border-steel-300">
                <div className="text-xs text-steel-500 font-semibold uppercase tracking-wide mb-2">Arabic Speaker</div>
                <div className="text-lg font-bold text-off-black mb-3">Ayman</div>
                <div className="space-y-2.5">
                  <a 
                    href="https://wa.me/491234567890" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-steel-700 hover:text-accent transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>+49 123 456 7890 (WhatsApp)</span>
                  </a>
                  <a 
                    href="mailto:ayman@eurotruckexport.com"
                    className="flex items-center gap-2 text-sm text-steel-700 hover:text-accent transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>ayman@eurotruckexport.com</span>
                  </a>
                </div>
              </div>
              
              {/* French/English/German Speaker */}
              <div className="mb-6">
                <div className="text-xs text-steel-500 font-semibold uppercase tracking-wide mb-2">French / English / German</div>
                <div className="text-lg font-bold text-off-black mb-3">Mrs. Kämpfer</div>
                <div className="space-y-2.5">
                  <a 
                    href="tel:+491234567891"
                    className="flex items-center gap-2 text-sm text-steel-700 hover:text-accent transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+49 123 456 7891</span>
                  </a>
                  <a 
                    href="mailto:kaempfer@eurotruckexport.com"
                    className="flex items-center gap-2 text-sm text-steel-700 hover:text-accent transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>kaempfer@eurotruckexport.com</span>
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-steel-300 mb-6">
                <div className="font-bold text-off-black mb-3 text-sm">What We'll Provide:</div>
                <ul className="space-y-2 text-sm text-steel-600">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Additional detailed photos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Video walkaround inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Complete service history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>VIN verification documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Export timeline estimate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Pricing details</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/491234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-off-black text-warm-white font-semibold py-4 px-6 hover:bg-steel-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Contact via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Back to Inventory */}
        <div className="mt-12">
          <Link 
            to="/inventory"
            className="inline-flex items-center gap-2 text-steel-600 hover:text-accent font-medium transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Inventory</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
