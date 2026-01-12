import { Check } from 'lucide-react';
import type { Filters } from '../Pages/ProductsPage';

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const categories = [
    { id: 'tas-aksesori', label: 'Tas & Aksesori', count: 45 },
    { id: 'home-living', label: 'Home & Living', count: 32 },
    { id: 'fashion', label: 'Fashion Sustainable', count: 28 },
    { id: 'tanaman', label: 'Tanaman & Berkebun', count: 38 },
    { id: 'skincare', label: 'Skincare & Beauty', count: 25 },
    { id: 'perlengkapan', label: 'Perlengkapan Rumah', count: 19 },
  ];

  const priceRanges = [
    { label: 'Semua Harga', min: 0, max: 1000000 },
    { label: 'Di bawah Rp 50.000', min: 0, max: 50000 },
    { label: 'Rp 50.000 - Rp 100.000', min: 50000, max: 100000 },
    { label: 'Rp 100.000 - Rp 200.000', min: 100000, max: 200000 },
    { label: 'Rp 200.000 - Rp 500.000', min: 200000, max: 500000 },
    { label: 'Di atas Rp 500.000', min: 500000, max: 1000000 },
  ];

  const ratings = [5, 4, 3, 2, 1];

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.category.includes(categoryId)
      ? filters.category.filter((c) => c !== categoryId)
      : [...filters.category, categoryId];
    onFilterChange({ category: newCategories });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({ priceRange: [min, max] });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ rating: filters.rating === rating ? 0 : rating });
  };

  const handleResetFilters = () => {
    onFilterChange({
      category: [],
      priceRange: [0, 1000000],
      rating: 0,
      searchQuery: '',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      {/* Reset Button */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h3 className="font-bold text-lg">Filter</h3>
        <button
          onClick={handleResetFilters}
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          Reset
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-3 text-gray-900">Kategori</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${filters.category.includes(category.id)
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 group-hover:border-green-400'
                  }`}
              >
                {filters.category.includes(category.id) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters.category.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
              />
              <span className="flex-1 text-gray-700 group-hover:text-gray-900">
                {category.label}
              </span>
              <span className="text-sm text-gray-400">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-semibold mb-3 text-gray-900">Rentang Harga</h4>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${filters.priceRange[0] === range.min &&
                  filters.priceRange[1] === range.max
                  ? 'border-green-500'
                  : 'border-gray-300 group-hover:border-green-400'
                  }`}
              >
                {filters.priceRange[0] === range.min &&
                  filters.priceRange[1] === range.max && (
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  )}
              </div>
              <input
                type="radio"
                name="price"
                className="hidden"
                checked={
                  filters.priceRange[0] === range.min &&
                  filters.priceRange[1] === range.max
                }
                onChange={() => handlePriceRangeChange(range.min, range.max)}
              />
              <span className="text-gray-700 group-hover:text-gray-900">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-semibold mb-3 text-gray-900">Rating Minimum</h4>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${filters.rating === rating
                  ? 'border-green-500'
                  : 'border-gray-300 group-hover:border-green-400'
                  }`}
              >
                {filters.rating === rating && (
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                )}
              </div>
              <input
                type="radio"
                name="rating"
                className="hidden"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <span key={i} className="text-gray-300">
                    ★
                  </span>
                ))}
                <span className="text-gray-600 ml-1">& keatas</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Eco Badge */}
      <div className="pt-4 border-t border-gray-200">
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌿</span>
            <span className="font-semibold text-green-800">Eco Certified</span>
          </div>
          <p className="text-sm text-green-700">
            Semua produk kami telah tersertifikasi ramah lingkungan
          </p>
        </div>
      </div>
    </div>
  );
}
