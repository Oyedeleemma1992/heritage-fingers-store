import React, { useEffect } from 'react';

export const About = () => {
  useEffect(() => {
    document.title = 'About Us | Heritage Finger';
  }, []);

  return (
    <div className="bg-transparent min-h-screen">
      {/* Header */}
      <div className="bg-[#183C2B] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-gray-200">Bringing the authentic taste of Africa to your kitchen.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#183C2B] mb-6">Our Heritage</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Heritage Finger was born out of a simple desire: to make authentic African food and ingredients easily accessible to the community in Birmingham and across the UK.
              </p>
              <p>
                We understand that food is more than just sustenance; it's a connection to culture, family, and home. Our mission is to provide you with the highest quality ingredients so you can recreate those cherished flavours in your own kitchen.
              </p>
              <p>
                Whether you're looking for staple grains, traditional spices, or your favourite childhood snacks, we are committed to sourcing authentic products that meet our high standards of quality.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=1200" 
                alt="Cooking African food" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#C96B3B] rounded-full -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#183C2B] rounded-full -z-10 opacity-20"></div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Quality Products', desc: 'We carefully select our suppliers to ensure you receive only the best authentic ingredients.' },
            { title: 'Community Focus', desc: 'We are proud to serve the diverse communities in Birmingham, celebrating African culinary traditions.' },
            { title: 'Convenience', desc: 'Through our simple ordering process and flexible delivery options, getting your groceries has never been easier.' }
          ].map((val, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-[#C96B3B]/10 text-[#C96B3B] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-serif font-bold text-xl">{idx + 1}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#183C2B] mb-3">{val.title}</h3>
              <p className="text-gray-600">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
