export default function ExportProcess() {
  return (
    <div className="min-h-screen bg-white-smoke">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="text-xs uppercase tracking-[0.3em] text-charcoal-500 mb-3">Terms & Export Process</div>
          <h1 className="text-4xl md:text-5xl font-black text-mint-700 mb-3">Terms & Export Process</h1>
          <p className="text-charcoal-600 text-lg">How we operate and what to expect.</p>
        </div>

        <div className="space-y-10">
          <section className="surface-panel rounded-3xl p-8">
            <h2 className="text-2xl font-black text-mint-700 mb-6">Export Process</h2>

            <div className="space-y-6 text-charcoal-700">
              {[
                {
                  title: 'Initial Inquiry',
                  text: 'You send us vehicle requirements (model, year, quantity, destination). We respond within 24 hours with availability and initial information.',
                },
                {
                  title: 'Vehicle Sourcing & Verification',
                  text: 'We locate the vehicle from our German supplier network. Vehicle is inspected. Photos, service records, and condition report are shared with you for approval before any commitment.',
                },
                {
                  title: 'Documentation Preparation',
                  text: 'All export documents are prepared: export license, customs forms, bill of lading, certificate of origin, vehicle registration. Copies provided to you before shipping.',
                },
                {
                  title: 'Port Delivery & Shipping',
                  text: 'Vehicle delivered to Hamburg or Bremerhaven. Loaded into container. You receive tracking number, vessel name, and estimated arrival date.',
                },
              ].map((step, index) => (
                <div key={step.title} className="bg-white border border-charcoal-200 rounded-2xl p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-charcoal-500 mb-2">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="font-bold text-mint-700 mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-charcoal-900 text-white rounded-2xl p-6">
              <div className="text-sm text-charcoal-200">
                <span className="font-semibold text-white">Typical Timeline:</span> 3-5 weeks from order confirmation to port arrival. Timeline depends on vehicle availability and shipping schedules.
              </div>
            </div>
          </section>

          <section className="surface-panel rounded-3xl p-8">
            <h2 className="text-2xl font-black text-mint-700 mb-6">How We Work</h2>

            <div className="space-y-4 text-charcoal-700">
              {[
                {
                  title: 'Sourcing',
                  text: 'All vehicles sourced from verified German suppliers: commercial fleets, leasing companies, and authorized dealers.',
                },
                {
                  title: 'Documentation',
                  text: 'All documents are verified and legitimate. We handle German export regulations and provide documentation for your customs clearance.',
                },
                {
                  title: 'Payment Terms',
                  text: 'Payment structure and terms discussed directly for each order. Bank transfer. No payment until vehicle is verified and approved by you.',
                },
                {
                  title: 'Communication',
                  text: 'Direct contact with assigned representative. Language-specific contacts available (Arabic, French, English, German).',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white border border-charcoal-200 rounded-2xl p-5">
                  <div className="font-bold text-mint-700 mb-1">{item.title}</div>
                  <p className="text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="surface-panel rounded-3xl p-8">
            <h2 className="text-2xl font-black text-mint-700 mb-6">What is Included</h2>

            <div className="bg-white border border-charcoal-200 rounded-2xl p-6">
              <ul className="space-y-3 text-charcoal-700 text-sm">
                {[
                  'Vehicle inspection and condition report',
                  'German export license preparation',
                  'Customs documentation',
                  'Port delivery (Hamburg or Bremerhaven)',
                  'Container loading and shipping arrangement',
                  'Tracking and documentation copies',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-charcoal-400">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
