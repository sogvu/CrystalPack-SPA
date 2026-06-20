import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Check, ChevronRight, Eye } from 'lucide-react';
import { products } from '../data/products';

export default function ProductCarousel({ onSelectProduct, savedIds, onToggleSave, searchFilter }) {
  const [activeCategory, setActiveCategory] = useState('all'); // all, fresh, fruits, snacks

  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', desc: 'Xem toàn bộ' },
    { id: 'fresh', name: 'Thực phẩm tươi sống', desc: 'Đựng thịt, cá, tôm' },
    { id: 'fruits', name: 'Trái cây/Rau củ', desc: 'Bảo quản tươi xanh' },
    { id: 'snacks', name: 'Đồ khô/Bánh kẹo', desc: 'Chống ẩm, giòn lâu' }
  ];

  // Map category ID to its corresponding key in the product images object
  const getCategoryImage = (product, category) => {
    switch(category) {
      case 'fresh': return product.images.fresh;
      case 'fruits': return product.images.fruits;
      case 'snacks': return product.images.snacks;
      default: return product.images.all;
    }
  };

  // Filter products based on smart search query (if search query is active)
  const filteredProducts = products.filter(p => {
    if (!searchFilter) return true;
    return (
      p.name.toLowerCase().includes(searchFilter) ||
      p.slogan.toLowerCase().includes(searchFilter) ||
      p.searchKeywords.some(kw => kw.toLowerCase().includes(searchFilter))
    );
  });

  return (
    <section id="products" className="py-12 bg-white scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Row Header with Netflix-style category tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-bold text-brand-lightEmerald uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Shield className="h-4 w-4" /> BẢO QUẢN THÔNG MINH
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-brand-emerald tracking-tight">
              Danh Mục Sản Phẩm Phân Phối
            </h2>
          </div>

          {/* Netflix Categories Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-start px-4 py-2 rounded-xl transition-all duration-300 text-left min-w-[120px] md:min-w-0 ${
                  activeCategory === cat.id 
                    ? 'bg-brand-emerald text-white shadow-md' 
                    : 'bg-brand-lightBg text-brand-textGray hover:bg-gray-100 hover:text-brand-textDark'
                }`}
              >
                <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
                <span className={`text-[9px] leading-none ${activeCategory === cat.id ? 'text-emerald-200' : 'text-gray-400'}`}>
                  {cat.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-brand-textGray">
            <p className="text-lg font-medium">Không tìm thấy sản phẩm phù hợp với bộ lọc hiện tại.</p>
            <button 
              onClick={() => setActiveCategory('all')} 
              className="mt-4 text-sm font-bold text-brand-lightEmerald underline"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          /* Netflix Grid of rows */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isSaved = savedIds.includes(product.id);
                const displayImage = getCategoryImage(product, activeCategory);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -6 }}
                    className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-premium overflow-hidden transition-all duration-300"
                  >
                    {/* Badge status */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-brand-emerald text-white px-2.5 py-1 rounded-full shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        {product.safetyCert.split(',')[0]}
                      </span>
                      {activeCategory !== 'all' && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-brand-lightEmerald text-white px-2 py-0.5 rounded-full shadow-sm">
                          Đang thử nghiệm: {categories.find(c => c.id === activeCategory)?.name}
                        </span>
                      )}
                    </div>

                    {/* Image Area - Smart Crop for each bag */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                      <motion.img 
                        key={displayImage} // forces refresh animation on image swap
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        src={displayImage} 
                        alt={product.name} 
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${product.cropClass}`}
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <button 
                          onClick={() => onSelectProduct(product)}
                          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-brand-lightBg text-brand-emerald py-2.5 text-xs font-bold shadow-md hover:shadow-lg transition-all"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Xem chi tiết Netflix View</span>
                        </button>
                      </div>

                      {/* Accent Red Line visualization on Zipper Bag Card */}
                      {product.id === 'zipper-bag' && (
                        <div className="absolute top-0 right-0 left-0 h-[2px] bg-brand-accentRed/70 pointer-events-none" />
                      )}
                    </div>

                    {/* Card details */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-lightEmerald">
                          {product.englishName}
                        </span>
                        <h3 className="text-lg font-black text-brand-emerald uppercase leading-tight mt-0.5 group-hover:text-brand-lightEmerald transition-colors">
                          {product.shortName}
                        </h3>
                      </div>
                      
                      <p className="text-xs text-brand-textGray italic mb-4 leading-relaxed">
                        "{product.slogan}"
                      </p>

                      {/* Feature Checklist */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {product.features.slice(0, 3).map((feat, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 text-brand-emerald text-[9px] font-bold px-2 py-0.5"
                          >
                            <Check className="h-2.5 w-2.5" />
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-brand-textGray block leading-none mb-0.5">Giá chỉ từ</span>
                          <span className="text-sm font-black text-brand-emerald">
                            {product.prices.retail.toLocaleString()}đ
                          </span>
                          <span className="text-[9px] text-brand-textGray"> / đơn vị</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => onToggleSave(product.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              isSaved 
                                ? 'bg-brand-accentRed/10 text-brand-accentRed hover:bg-brand-accentRed/20' 
                                : 'bg-brand-lightBg text-brand-textGray hover:bg-gray-100 hover:text-brand-textDark'
                            }`}
                          >
                            {isSaved ? 'Đã lưu mẫu' : 'Lưu mẫu thử'}
                          </button>
                          
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="p-1.5 rounded-lg bg-brand-emerald/10 text-brand-emerald hover:bg-brand-emerald hover:text-white transition-all flex items-center justify-center"
                            title="Xem chi tiết"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
