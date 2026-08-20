import React, { useEffect } from 'react';

export const Delivery = () => {
  useEffect(() => {
    document.title = 'Delivery & Collection | Heritage Finger';
  }, []);

  return (
    <div className="bg-transparent min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-[#183C2B] mb-8 text-center">Delivery & Collection</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">
          
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#C96B3B] mb-4 border-b border-gray-100 pb-2">Delivery Areas</h2>
            <div className="prose text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-[#183C2B]">Local Birmingham Delivery:</strong> Handsworth, Perry Barr, Erdington, Smethwick, Aston, West Bromwich, and central Birmingham postcodes (B1 – B45).</li>
                <li><strong className="text-[#183C2B]">UK Nationwide Delivery:</strong> We ship non-perishable food items, spices, and dry goods across England, Wales, Scotland, and Northern Ireland via tracked courier.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#C96B3B] mb-4 border-b border-gray-100 pb-2">Delivery Charges</h2>
            <div className="prose text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-[#183C2B]">Local Birmingham Express:</strong> £3.99 flat rate (Free on local orders over £50).</li>
                <li><strong className="text-[#183C2B]">UK Standard Courier (Dry Goods):</strong> £5.99 (Free on UK Mainland orders over £75).</li>
                <li><strong className="text-[#183C2B]">Frozen & Chilled Foods Courier:</strong> £8.99 (Shipped in temperature-controlled insulated packaging with ice packs to ensure freshness).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#C96B3B] mb-4 border-b border-gray-100 pb-2">Delivery Times</h2>
            <div className="prose text-gray-700">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-[#183C2B]">Local Delivery:</strong> Orders placed before 1:00 PM are delivered same-day (Monday to Saturday, 3:00 PM – 8:00 PM).</li>
                <li><strong className="text-[#183C2B]">UK Mainland Courier:</strong> 1 – 3 business days. Tracking details are sent directly via WhatsApp or email once dispatched.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#C96B3B] mb-4 border-b border-gray-100 pb-2">Collection Information</h2>
            <div className="prose text-gray-700">
              <p className="mb-4">You can collect your order for free directly from our Handsworth store:</p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong className="text-[#183C2B]">Address:</strong>
                  <address className="not-italic mt-1 text-gray-600 block pl-4 border-l-2 border-[#183C2B]">
                    Heritage Fingers Pan-African Stores Ltd,<br />
                    10 Robert Road, Handsworth,<br />
                    Birmingham, B20 3RT
                  </address>
                </li>
                <li><strong className="text-[#183C2B]">Collection Hours:</strong> Monday – Saturday: 9:00 AM – 7:00 PM | Sunday: 11:00 AM – 5:00 PM</li>
                <li><strong className="text-[#183C2B]">Instructions:</strong> Please bring your order confirmation email or order number when collecting. Orders are usually ready within 2 hours.</li>
              </ul>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};
