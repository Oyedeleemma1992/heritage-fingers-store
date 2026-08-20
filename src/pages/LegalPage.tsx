import React from 'react';

export const LegalPage: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="bg-transparent min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#183C2B] mb-8">{title}</h1>
          <div className="prose prose-green max-w-none text-gray-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
