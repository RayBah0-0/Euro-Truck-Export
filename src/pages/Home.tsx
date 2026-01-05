import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Premium Mercedes-Benz Trucks for Global Markets
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            100% German Quality | Ready for Export | B2B Specialists
          </p>
          <Link
            to="/inventory"
            className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors text-lg"
          >
            View Inventory
          </Link>
        </div>
      </section>

      {/* Trust Points */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Euro Truck Export?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Verified Mercedes-Benz Units', '100% German Manufactured', 'Ready for Immediate Export', 'Professional Documentation'].map((point, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-yellow-400 mb-3">✓</div>
                <p className="text-gray-700 font-semibold">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Truck?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today for more information about our inventory.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition-colors text-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
