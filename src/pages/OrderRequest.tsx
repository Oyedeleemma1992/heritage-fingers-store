import React, { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, MessageCircle, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const WEB3FORMS_ACCESS_KEY = '97a78619-99b3-4a77-b03a-4c60c4efaf34';

export const OrderRequest = () => {
  const { items, updateQuantity, removeItem, clearOrder, totalItems } = useOrder();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryPreference: 'Collection',
    address: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Order Request | Heritage Finger';
  }, []);

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      if (item.price) {
        return total + (item.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const hasUnpricedItems = items.some(item => !item.price);
  const subtotal = calculateSubtotal();

  const validateForm = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your Name and Phone Number.');
      return false;
    }
    if (formData.deliveryPreference === 'Delivery' && !formData.address.trim()) {
      alert('Please enter a Delivery Address.');
      return false;
    }
    return true;
  };

  const handleWhatsAppSubmit = () => {
    if (!validateForm()) return;

    const itemList = items.map(item => `- ${item.name} (Qty: ${item.quantity})`).join('\n');
    const text = `Hello Heritage Finger, I would like to place an order request:

*My Order:*
${itemList}

*My Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Preference: ${formData.deliveryPreference}
${formData.deliveryPreference === 'Delivery' && formData.address ? `Address: ${formData.address}` : ''}
${formData.notes ? `\nNotes: ${formData.notes}` : ''}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/447464053335?text=${encodedText}`, '_blank');
    setIsSuccess(true);
    clearOrder();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const itemListFormatted = items
        .map(item => `- ${item.name} | Qty: ${item.quantity} | Price: £${((item.price || 0) * item.quantity).toFixed(2)}`)
        .join('\n');

      const messageBody = `
NEW STORE ORDER REQUEST

--- CUSTOMER DETAILS ---
Name: ${formData.name}
Email: ${formData.email || 'N/A'}
Phone: ${formData.phone}
Fulfilment Preference: ${formData.deliveryPreference}
${formData.deliveryPreference === 'Delivery' ? `Delivery Address: ${formData.address}` : 'Store Collection'}
${formData.notes ? `Notes: ${formData.notes}` : ''}

--- ORDERED ITEMS ---
${itemListFormatted}

TOTAL ESTIMATED AMOUNT: £${subtotal.toFixed(2)}
      `.trim();

      const apiFormData = new FormData();
      apiFormData.append('access_key', WEB3FORMS_ACCESS_KEY);
      apiFormData.append('subject', `New Store Order Request from ${formData.name}`);
      apiFormData.append('from_name', 'Heritage Fingers Online Store');
      apiFormData.append('name', formData.name);
      apiFormData.append('email', formData.email || 'info@heritagefingers.com');
      apiFormData.append('phone', formData.phone);
      apiFormData.append('message', messageBody);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: apiFormData
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        clearOrder();
      } else {
        alert('Web3Forms Response: ' + (data.message || 'Submission failed.'));
      }
    } catch (error: any) {
      console.error('Web3Forms Error:', error);
      alert('Error sending request: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-transparent min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-[#183C2B]/10 text-[#183C2B] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#183C2B] mb-4">Request Received</h1>
            <p className="text-gray-600 text-lg mb-8">
              Thank you. Your order request has been received. Our team will contact you shortly to confirm availability, delivery or collection arrangements, and payment details.
            </p>
            <Link to="/shop" className="inline-flex justify-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#183C2B] hover:bg-[#11331e]">
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-transparent min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[#183C2B] mb-4">Your order is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products yet.</p>
          <Link to="/shop" className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#183C2B] hover:bg-[#11331e]">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center mb-8">
          <Link to="/shop" className="text-gray-500 hover:text-[#183C2B] flex items-center transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Shop
          </Link>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#183C2B] mb-8">Order Request</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Order Items */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-serif text-xl font-bold text-[#171717]">Selected Products ({totalItems})</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <li key={item.id} className="p-6 flex py-6 sm:py-8">
                    <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-base font-bold text-[#171717] line-clamp-2">{item.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                        </div>
                        <p className="text-base font-medium text-[#171717] ml-4">
                          {item.price ? `£${(item.price * item.quantity).toFixed(2)}` : 'TBD'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 text-sm font-medium text-gray-900 border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                  <p>Estimated Subtotal</p>
                  <p>£{subtotal.toFixed(2)}</p>
                </div>
                {hasUnpricedItems && (
                  <p className="text-xs text-[#C96B3B]">
                    * Some items do not have a listed price. Final total will be confirmed by our team.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-28">
              <h2 className="font-serif text-2xl font-bold text-[#183C2B] mb-6">Your Details</h2>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <span className="font-bold">Note:</span> We do not take online payments. Submit your request below, and we will contact you to confirm stock, delivery, and payment.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number / WhatsApp *</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preference</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, deliveryPreference: 'Collection'})}
                      className={cn(
                        "py-2 px-4 rounded-lg border text-sm font-medium transition-colors",
                        formData.deliveryPreference === 'Collection'
                          ? "border-[#183C2B] bg-[#183C2B]/5 text-[#183C2B]"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      Store Collection
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, deliveryPreference: 'Delivery'})}
                      className={cn(
                        "py-2 px-4 rounded-lg border text-sm font-medium transition-colors",
                        formData.deliveryPreference === 'Delivery'
                          ? "border-[#183C2B] bg-[#183C2B]/5 text-[#183C2B]"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      Delivery
                    </button>
                  </div>
                </div>

                {formData.deliveryPreference === 'Delivery' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                    <textarea
                      id="address"
                      required={formData.deliveryPreference === 'Delivery'}
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none resize-none"
                    ></textarea>
                  </motion.div>
                )}

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                  <textarea
                    id="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#183C2B]/50 focus:border-[#183C2B] outline-none resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 space-y-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">How would you like to send this request?</p>
                  
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-[#25D366] hover:bg-[#1DA851] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send via WhatsApp
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <Mail className="w-5 h-5 mr-2 text-gray-500" />
                        Send via Email
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};