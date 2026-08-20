import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface OrderItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  total: number;
}

interface OrderContextType {
  items: OrderItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearOrder: () => void;
  submitOrder: (customer: CustomerDetails) => Promise<boolean>;
  totalItems: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => 
      prev.map(item => item.id === productId ? { ...item, quantity } : item)
    );
  };

  const clearOrder = () => setItems([]);

  // LIVE API: Sends customer order & cart items to info@heritagefingers.com via api.php
  const submitOrder = async (customer: CustomerDetails): Promise<boolean> => {
    try {
      const payload = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        total: customer.total.toFixed(2),
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await fetch('https://heritagefingers.com/api.php?action=send_order_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        clearOrder(); // Clear cart automatically on successful order email
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error submitting order email:', error);
      return false;
    }
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <OrderContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearOrder, submitOrder, totalItems }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};