import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, ProductVariant } from '../data/products';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to fetch live database products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://heritagefingers.com/api.php?action=get_products', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const productsData = Array.isArray(data) ? data : (data.data || []);
      
      // Parse multi-image comma separated strings, variants JSON, and format products
      const formattedProducts = productsData.map((p: any) => {
        const rawImg = p.image_url || p.imageUrl || '';
        const imgArray = typeof rawImg === 'string'
          ? rawImg.split(',').map((u: string) => u.trim()).filter(Boolean)
          : (Array.isArray(rawImg) ? rawImg : []);

        // Parse variants JSON from database if available
        let parsedVariants: ProductVariant[] = [];
        if (p.variants) {
          try {
            parsedVariants = typeof p.variants === 'string' ? JSON.parse(p.variants) : p.variants;
          } catch (e) {
            console.error('Failed to parse product variants:', e);
          }
        }

        return {
          id: p.id ? String(p.id) : `prod_${Math.random()}`,
          name: p.name || 'Unnamed Product',
          description: p.description || '',
          price: parseFloat(p.price) || 0,
          size: p.size || 'N/A',
          category: p.category || 'Uncategorized',
          imageUrl: imgArray[0] || rawImg || 'https://via.placeholder.com/400',
          imageUrls: imgArray.length > 0 ? imgArray : [rawImg || 'https://via.placeholder.com/400'],
          available: p.available !== false && p.available !== 0 && p.available !== '0',
          variants: parsedVariants.length > 0 ? parsedVariants : undefined,
        };
      });
      
      setProducts(formattedProducts);
    } catch (err: any) {
      console.error('Failed to fetch products:', err);
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // LIVE API: Add Product to MySQL
  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const payload = {
        name: newProduct.name,
        category: newProduct.category,
        description: newProduct.description,
        price: newProduct.price,
        size: newProduct.size || 'N/A',
        image_url: newProduct.imageUrl || (newProduct as any).image_url || '',
        available: newProduct.available ?? true,
        variants: newProduct.variants || null
      };

      const response = await fetch('https://heritagefingers.com/api.php?action=add_product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        await fetchProducts(); // Refetch live list from MySQL
      } else {
        console.error('Failed to add product to database:', result);
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  // LIVE API: Update Product in MySQL
  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    try {
      const existing = products.find((p) => p.id === id);
      if (!existing) return;

      const merged = { ...existing, ...updatedFields };

      // CRITICAL FIX: Prioritize the explicitly updated imageUrl string from Admin.tsx.
      // If we don't do this, the old broken link trapped in merged.imageUrls will overwrite the new upload!
      const imageUrlString = updatedFields.imageUrl !== undefined 
        ? updatedFields.imageUrl 
        : (Array.isArray(merged.imageUrls) && merged.imageUrls.length > 0
            ? merged.imageUrls.join(',')
            : (merged.imageUrl || ''));

      const payload = {
        id: Number(id),
        name: merged.name,
        category: merged.category,
        description: merged.description,
        price: merged.price,
        size: merged.size,
        image_url: imageUrlString,
        available: merged.available ? 1 : 0,
        variants: merged.variants || null
      };

      const response = await fetch('https://heritagefingers.com/api.php?action=update_product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        await fetchProducts(); // Refetch live database to update Shop UI instantly
      } else {
        console.error('Failed to update product in database:', result);
      }
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  // LIVE API: Delete Product from MySQL
  const deleteProduct = async (id: string) => {
    try {
      // Optimistically remove from state so UI updates instantly
      setProducts((prev) => prev.filter((p) => p.id !== id));

      const response = await fetch(`https://heritagefingers.com/api.php?action=delete_product&id=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Number(id) })
      });

      const result = await response.json();
      if (result.success) {
        await fetchProducts(); // Sync state with database
      } else {
        console.error('Failed to delete product from database:', result);
        await fetchProducts(); // Revert state if server delete failed
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      await fetchProducts(); // Revert state if network error occurred
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, refetchProducts: fetchProducts, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};