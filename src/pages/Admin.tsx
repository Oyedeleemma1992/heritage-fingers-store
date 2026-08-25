import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { Product, ProductVariant } from '../types';
import { Plus, Edit2, Trash2, X, Save, LogOut } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('isAdminLoggedIn') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Success2025@') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminLoggedIn', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminLoggedIn');
    setPassword('');
  };

  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [variantsList, setVariantsList] = useState<ProductVariant[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleAdd = () => {
    setCurrentProduct({
      name: '',
      description: '',
      price: 0,
      size: '',
      category: CATEGORIES[1] || '',
      imageUrl: '',
      available: true
    });
    setVariantsList([]);
    setImageFile(null);
    setIsEditing(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setVariantsList(product.variants || []);
    setImageFile(null);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleAddVariant = () => {
    setVariantsList([...variantsList, { size: '', price: 0 }]);
  };

  const handleVariantChange = (index: number, field: 'size' | 'price', value: string | number) => {
    const updated = [...variantsList];
    updated[index] = { ...updated[index], [field]: field === 'price' ? parseFloat(value as string) || 0 : value };
    setVariantsList(updated);
  };

  const handleRemoveVariant = (index: number) => {
    setVariantsList(variantsList.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalImageUrl = currentProduct.imageUrl;

    // If a new image file was chosen from the device, upload it via upload.php first
    if (imageFile) {
      const formData = new FormData();
      formData.append('product_image', imageFile);

      try {
        const uploadResponse = await fetch('/upload.php', {
          method: 'POST',
          body: formData,
        });
        
        const uploadData = await uploadResponse.json();
        
        if (uploadData.success) {
          finalImageUrl = uploadData.imageUrl;
        } else {
          alert('Image upload failed. Please try again.');
          return;
        }
      } catch (err) {
        console.error('Upload error:', err);
        alert('Error connecting to image server.');
        return;
      }
    }

    const productPayload = {
      ...currentProduct,
      imageUrl: finalImageUrl,
      variants: variantsList.length > 0 ? variantsList : undefined
    };

    if (currentProduct.id) {
      await updateProduct(currentProduct.id, productPayload);
    } else {
      await addProduct(productPayload as Omit<Product, 'id'>);
    }
    
    setIsEditing(false);
    setCurrentProduct({});
    setVariantsList([]);
    setImageFile(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-transparent min-h-screen py-12 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md w-full">
          <h1 className="font-serif text-2xl font-bold text-[#183C2B] mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#183C2B]"
                placeholder="Enter admin password"
              />
              {authError && <p className="text-red-500 text-sm mt-1">{authError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#183C2B] text-white rounded-lg hover:bg-[#11331e] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-transparent min-h-screen py-12 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-[#183C2B]/20 border-t-[#183C2B] rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading inventory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-transparent min-h-screen py-12 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-red-500 font-medium mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#183C2B] text-white rounded-lg hover:bg-[#11331e] transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#183C2B]">Store Admin Portal</h1>
            <p className="text-gray-600 mt-2">Manage your products and inventory</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAdd}
              className="flex items-center px-4 py-2 bg-[#183C2B] text-white rounded-lg hover:bg-[#11331e] transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Product
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-xl font-bold text-[#183C2B]">
                {currentProduct.id ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={currentProduct.name || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#183C2B]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  required
                  value={currentProduct.category || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#183C2B]"
                >
                  {CATEGORIES.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Price (£) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={currentProduct.price || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#183C2B]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Size / Unit *</label>
                <input
                  type="text"
                  required
                  value={currentProduct.size || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, size: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#183C2B]"
                  placeholder="e.g. 1kg, 1L, 3 Pieces"
                />
              </div>

              <div className="md:col-span-2 border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">Size & Price Variants (Optional)</label>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="text-xs px-3 py-1.5 bg-gray-100 text-[#183C2B] font-semibold rounded-md hover:bg-gray-200 transition-colors"
                  >
                    + Add Variant Option
                  </button>
                </div>
                {variantsList.map((variant, index) => (
                  <div key={index} className="flex gap-4 items-center mb-3">
                    <input
                      type="text"
                      placeholder="Size/Unit (e.g., 4L or 1 Box)"
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price (£)"
                      value={variant.price || ''}
                      onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                      className="w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Product Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#183C2B]"
                />
                {currentProduct.imageUrl && !imageFile && (
                  <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                    Current image: <img src={currentProduct.imageUrl} alt="preview" className="h-10 w-10 mt-1 rounded object-cover inline-block" />
                  </p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                <textarea
                  required
                  rows={3}
                  value={currentProduct.description || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#183C2B]"
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center px-6 py-2 bg-[#C96B3B] text-white rounded-lg hover:bg-[#b05a2f] transition-colors"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price / Variants</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      £{product.price?.toFixed(2) || '0.00'}
                      {product.variants && product.variants.length > 0 && (
                        <span className="block text-xs text-indigo-600 font-medium">
                          (+{product.variants.length} size tiers)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-[#183C2B] hover:text-[#C96B3B] mr-4"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};