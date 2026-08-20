import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { cn } from '../lib/utils';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = 'Contact Us | Heritage Finger';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '97a78619-99b3-4a77-b03a-4c60c4efaf34',
          subject: 'New Website Contact Message – Heritage Finger',
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Subject: formData.subject,
          Message: formData.message
        })
      });
      
      const json = await res.json();
      
      if (res.status === 200 && json.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-transparent min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#183C2B] mb-4">Get in Touch</h1>
          <p className="text-gray-600 text-lg">
            Have a question about our products or need help with an order? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-2xl font-bold text-[#183C2B] mb-6">Contact Details</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#183C2B]/10 flex items-center justify-center text-[#183C2B]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-[#171717]">Address</p>
                    <p className="text-gray-600 mt-1">
                      Heritage Finger<br />
                      10 Robert Road<br />
                      Handsworth<br />
                      Birmingham<br />
                      B20 3RT<br />
                      United Kingdom
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#183C2B]/10 flex items-center justify-center text-[#183C2B]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-[#171717]">WhatsApp / Phone</p>
                    <a href="https://wa.me/447464053335" target="_blank" rel="noopener noreferrer" className="text-[#C96B3B] hover:underline mt-1 block">
                      +44 7464 053335
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#183C2B]/10 flex items-center justify-center text-[#183C2B]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-[#171717]">Email</p>
                    <a href="mailto:info@heritagefingers.com" className="text-[#C96B3B] hover:underline mt-1 block">
                      info@heritagefingers.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#183C2B]/10 flex items-center justify-center text-[#183C2B]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-[#171717]">Opening Hours</p>
                    <p className="text-gray-600 mt-1">
                      Online Store — Open 24/7
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-serif text-2xl font-bold text-[#183C2B] mb-6">Send us a Message</h3>
            
            {status === 'success' ? (
              <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center border border-green-200">
                <p className="font-bold text-lg mb-2">Message Sent!</p>
                <p>Thank you for contacting Heritage Finger. Your message has been sent successfully. Our team will get back to you as soon as possible.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-green-700 underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">Sorry, your message could not be sent. Please try again or contact us directly on WhatsApp.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={cn(
                    "w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#183C2B] hover:bg-[#11331e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#183C2B] transition-colors",
                    status === 'submitting' && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {status === 'submitting' ? 'Sending...' : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
