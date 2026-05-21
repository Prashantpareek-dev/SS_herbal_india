'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../components/product/ProductCard';
import Breadcrumb from '../components/common/Breadcrumb';
import { FiFilter, FiGrid, FiList, FiRefreshCw } from 'react-icons/fi';
import { fetchProducts, fetchProductsByCategory } from '../services/api';
import { normalizeProductList } from '../services/normalizers';

// Map sort UI values → API sortBy/sortOrder params
const sortMap = {
  featured:   { sortBy: 'createdAt',              sortOrder: 'desc' },
  'price-low':{ sortBy: 'pricing.sellingPrice',   sortOrder: 'asc'  },
  'price-high':{ sortBy: 'pricing.sellingPrice',  sortOrder: 'desc' },
  rating:     { sortBy: 'metrics.averageRating',  sortOrder: 'desc' },
  newest:     { sortBy: 'createdAt',              sortOrder: 'desc' },
};

const CATEGORIES = ['Immunity', 'Digestive Health', 'Energy & Vitality', 'Brain Health'];

const ProductListingPage = ({ initialProducts = [], initialPagination = null, categorySlug = null }) => {
  const { category: categoryParam } = useParams();
  const activeCategory = categorySlug || categoryParam;

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState(
    activeCategory ? [activeCategory] : []
  );

  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(
    initialPagination || { currentPage: 1, totalPages: 1, totalProducts: 0 }
  );
  const [page, setPage] = useState(1);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { sortBy: apiSortBy, sortOrder } = sortMap[sortBy] || sortMap.featured;
      const params = {
        page,
        limit: 20,
        sortBy: apiSortBy,
        sortOrder,
        minPrice: priceRange[0] || undefined,
        maxPrice: priceRange[1] < 2000 ? priceRange[1] : undefined,
      };

      let res;
      if (selectedCategories.length === 1) {
        const slug = selectedCategories[0].toLowerCase().replace(/\s+/g, '-');
        res = await fetchProductsByCategory(slug, params);
      } else {
        res = await fetchProducts(params);
      }

      console.log('[ProductListingPage] response received:', JSON.stringify(res?.data).slice(0, 600));

      const rawProducts = res?.data?.products || [];
      const list = rawProducts;
      if (list.length > 0) {
        const normalizedList = normalizeProductList(list);
        console.log('[ProductListingPage] normalized data sent to state:', JSON.stringify({ count: normalizedList.length, pagination: res?.data?.pagination, first: normalizedList[0] }).slice(0, 600));
        setProducts(normalizedList);
        if (res?.data?.pagination) setPagination(res.data.pagination);
      } else {
        setProducts([]);
        setPagination({ currentPage: 1, totalPages: 1, totalProducts: 0 });
      }
    } catch {
      setProducts([]);
      setPagination({ currentPage: 1, totalPages: 1, totalProducts: 0 });
    } finally {
      setLoading(false);
    }
  }, [sortBy, priceRange, selectedCategories, page]);

  // Track whether the first render already has SSR data so we skip the initial fetch
  const hasInitialData = useRef(initialProducts.length > 0);

  useEffect(() => {
    if (hasInitialData.current) {
      hasInitialData.current = false; // allow subsequent filter-triggered fetches
      return;
    }
    loadProducts();
  }, [loadProducts]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [sortBy, priceRange, selectedCategories]);

  const clearFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedCategories([]);
    setSortBy('featured');
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Products' }]} />
      
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-card sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FiFilter />
                  Filters
                </h3>
                <button onClick={clearFilters} className="text-sm text-primary">Clear All</button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                    className="w-20 px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary"
                        checked={selectedCategories.includes(cat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, cat]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== cat));
                          }
                        }}
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">All Products</h1>
                <p className="text-gray-600">{pagination.totalProducts} products found</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>

                {/* View Mode */}
                <div className="hidden md:flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  >
                    <FiGrid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  >
                    <FiList size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <FiRefreshCw size={32} className="animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No products found matching your criteria.</p>
                  </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100 transition-colors"
                    >
                      ‹ Prev
                    </button>
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          p === page ? 'bg-primary text-white border-primary' : 'hover:bg-gray-100'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                      disabled={page === pagination.totalPages}
                      className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-100 transition-colors"
                    >
                      Next ›
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
