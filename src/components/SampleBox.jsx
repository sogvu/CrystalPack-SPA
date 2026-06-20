import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Send, Bookmark, History, Sparkles, AlertCircle } from 'lucide-react';
import { products } from '../data/products';

export default function SampleBox({ 
  isOpen, 
  onClose, 
  savedIds, 
  recentlyViewedIds, 
  onToggleSave, 
  onSelectProduct,
  user
}) {
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    phone: '',
    address: user?.address || '',
    businessType: user?.role === 'distributor' ? 'Đại Lý / Siêu Thị' : 'Hộ gia đình / Cá nhân',
    note: ''
  });
  const [isOrdering, setIsOrdering] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  // Retrieve matching products
  const savedProducts = products.filter(p => savedIds.includes(p.id));
  const recentlyViewedProducts = products.filter(p => recentlyViewedIds.includes(p.id));

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (savedProducts.length === 0) {
      alert("Hộp mẫu đang trống. Hãy lưu ít nhất 1 loại túi bọc thực phẩm!");
      return;
    }
    
    setIsOrdering(true);
    
    // Simulate API call loading animation
    setTimeout(() => {
      setIsOrdering(false);
      setIsOrdered(true);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Drawer Wrapper */}
          <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden rounded-l-3xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-brand-emerald text-white">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-emerald-300 fill-current animate-pulse" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider">Hộp Mẫu Thử Miễn Phí</h3>
                    <p className="text-[10px] text-emerald-200">Chọn tối đa 3 loại túi mẫu</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-emerald-600 text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* 1. Saved bags (Bookmarks) */}
                <div>
                  <h4 className="text-xs font-black text-brand-emerald uppercase tracking-wider flex items-center gap-1.5 mb-4">
                    <Bookmark className="h-4 w-4 fill-current text-brand-lightEmerald" />
                    Túi đã lưu ({savedProducts.length})
                  </h4>

                  {savedProducts.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-gray-100 p-6 text-center text-xs text-brand-textGray flex flex-col items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-gray-300" />
                      <span>Chưa có sản phẩm nào trong Hộp mẫu thử.</span>
                      <span className="text-[10px]">Nhấp vào nút "Lưu mẫu thử" trên thẻ sản phẩm để gom mẫu.</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedProducts.map((product) => (
                        <div 
                          key={product.id}
                          className="flex items-center gap-3 p-3 bg-brand-lightBg border border-gray-100 rounded-2xl relative group overflow-hidden"
                        >
                          <div 
                            onClick={() => { onClose(); onSelectProduct(product); }}
                            className="h-12 w-16 rounded-xl bg-gray-200 overflow-hidden cursor-pointer relative border border-gray-100 flex-shrink-0"
                          >
                            <img 
                              src={product.images.all} 
                              alt={product.name} 
                              className={`h-full w-full object-cover ${product.cropClass}`}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h5 
                              onClick={() => { onClose(); onSelectProduct(product); }}
                              className="text-xs font-black text-brand-emerald hover:text-brand-lightEmerald cursor-pointer truncate"
                            >
                              {product.name}
                            </h5>
                            <p className="text-[10px] text-brand-textGray truncate">{product.slogan}</p>
                          </div>

                          <button
                            onClick={() => onToggleSave(product.id)}
                            className="p-2 text-brand-textGray hover:text-brand-accentRed hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                            title="Xóa khỏi hộp mẫu"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Order Form */}
                {savedProducts.length > 0 && (
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-xs font-black text-brand-emerald uppercase tracking-wider flex items-center gap-1.5 mb-4">
                      <Send className="h-4 w-4 text-brand-lightEmerald" />
                      Thông tin gửi mẫu
                    </h4>

                    {isOrdered ? (
                      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center flex flex-col items-center gap-3">
                        <div className="h-10 w-10 bg-brand-lightEmerald text-white rounded-full flex items-center justify-center font-bold text-lg">✓</div>
                        <div>
                          <h5 className="text-xs font-bold text-brand-emerald">Yêu cầu đã được gửi đi!</h5>
                          <p className="text-[10px] text-brand-textGray mt-1 leading-relaxed">
                            CrystalPack đã tiếp nhận thông tin đăng ký nhận Hộp Mẫu Thử Miễn Phí của <strong>{shippingInfo.name}</strong>. Gói hàng thử sẽ được giao tới địa chỉ: <strong>{shippingInfo.address}</strong> trong 2-3 ngày làm việc.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleOrderSubmit} className="space-y-3">
                        <div>
                          <label className="text-[9px] font-bold text-brand-textGray block mb-1">Người nhận hàng *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={shippingInfo.name}
                            onChange={handleInputChange}
                            placeholder="Nguyễn Văn A"
                            className="w-full rounded-xl bg-brand-lightBg border border-gray-200 p-2.5 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] font-bold text-brand-textGray block mb-1">Số điện thoại *</label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={shippingInfo.phone}
                              onChange={handleInputChange}
                              placeholder="0912345678"
                              className="w-full rounded-xl bg-brand-lightBg border border-gray-200 p-2.5 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-brand-textGray block mb-1">Loại hình đối tác</label>
                            <select
                              name="businessType"
                              value={shippingInfo.businessType}
                              onChange={handleInputChange}
                              className="w-full rounded-xl bg-brand-lightBg border border-gray-200 p-2.5 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                            >
                              <option>Hộ gia đình / Cá nhân</option>
                              <option>Đại Lý / Siêu Thị</option>
                              <option>Công ty Thực Phẩm / Nhà Hàng</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-brand-textGray block mb-1">Địa chỉ nhận mẫu thử *</label>
                          <input
                            type="text"
                            name="address"
                            required
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            placeholder="Địa chỉ số nhà, ngõ phố, tỉnh thành..."
                            className="w-full rounded-xl bg-brand-lightBg border border-gray-200 p-2.5 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-brand-textGray block mb-1">Ghi chú (Yêu cầu kích thước đặc biệt...)</label>
                          <textarea
                            name="note"
                            rows="2"
                            value={shippingInfo.note}
                            onChange={handleInputChange}
                            placeholder="Ví dụ: Đóng gói thêm size L..."
                            className="w-full rounded-xl bg-brand-lightBg border border-gray-200 p-2.5 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isOrdering}
                          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-brand-emerald hover:bg-brand-lightEmerald text-white py-3 text-xs font-bold transition-all shadow-md"
                        >
                          {isOrdering ? (
                            <span>Đang xử lý đăng ký...</span>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4 text-emerald-300" />
                              <span>Gửi yêu cầu Hộp Mẫu Thử Miễn Phí</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* 3. Recently viewed bags (Lịch sử xem) */}
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-xs font-black text-brand-emerald uppercase tracking-wider flex items-center gap-1.5 mb-4">
                    <History className="h-4 w-4 text-brand-lightEmerald" />
                    Sản phẩm vừa xem
                  </h4>

                  {recentlyViewedProducts.length === 0 ? (
                    <p className="text-[10px] text-brand-textGray italic">Chưa xem sản phẩm nào trong phiên này.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {recentlyViewedProducts.map((product) => (
                        <div 
                          key={product.id}
                          onClick={() => { onClose(); onSelectProduct(product); }}
                          className="p-2 border border-gray-100 bg-brand-lightBg rounded-2xl flex flex-col gap-2 cursor-pointer hover:border-brand-lightEmerald transition-all"
                        >
                          <div className="h-16 w-full rounded-lg overflow-hidden bg-gray-200 border border-gray-100 relative">
                            <img 
                              src={product.images.all} 
                              alt={product.name} 
                              className={`h-full w-full object-cover ${product.cropClass}`}
                            />
                          </div>
                          <span className="text-[10px] font-black text-brand-emerald truncate px-1 text-center">
                            {product.shortName}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
