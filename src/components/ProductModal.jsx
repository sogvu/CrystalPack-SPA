import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Bookmark, FileText, Send, BadgeAlert, Sparkles, Building } from 'lucide-react';

export default function ProductModal({ product, onClose, isSaved, onToggleSave, user }) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(10); // packs or rolls
  const [quoteRequest, setQuoteRequest] = useState({
    name: user?.name || '',
    phone: '',
    company: user?.company || '',
    note: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQuoteCalculator, setShowQuoteCalculator] = useState(false);

  if (!product) return null;

  // Pricing calculations
  const unitPrice = user?.role === 'distributor' ? product.prices.wholesale : product.prices.retail;
  const originalUnitPrice = product.prices.retail;
  const discountRate = user ? (user.role === 'distributor' ? 35 : 15) : 0;
  
  const totalPrice = unitPrice * quantity;
  const retailTotalPrice = originalUnitPrice * quantity;
  const savedAmount = retailTotalPrice - totalPrice;

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    if (!quoteRequest.phone) {
      alert("Vui lòng nhập số điện thoại để liên hệ!");
      return;
    }
    setIsSubmitted(true);
  };

  const currentSpec = product.specs.find(s => s.size === selectedSize);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-brand-emerald shadow-md hover:bg-brand-emerald hover:text-white transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left: Material close-up view */}
        <div className="w-full md:w-1/2 relative bg-gray-50 flex flex-col min-h-[300px] md:min-h-0">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={product.images.all} 
              alt={product.name} 
              className="h-full w-full object-cover object-center scale-[1.05]"
            />
            {/* Visual Highlight indicator */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Tag labels */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-brand-emerald text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              {product.material}
            </span>
            <span className="bg-white/90 text-brand-emerald text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 w-max">
              <Sparkles className="h-3 w-3 text-brand-lightEmerald" />
              Đường seal bền vững {product.thickness}
            </span>
          </div>

          {/* Product name overlay at bottom */}
          <div className="mt-auto p-8 relative z-10 text-white">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-300">
              Chi tiết vật liệu
            </span>
            <h2 className="text-3xl font-black text-white leading-tight uppercase mt-1">
              {product.shortName}
            </h2>
            <p className="text-xs text-emerald-100 mt-2">
              Bề mặt trong suốt màng bọc giúp nhận diện thực phẩm rõ ràng, đạt chứng chỉ vệ sinh an toàn thực phẩm.
            </p>
          </div>

          {/* Red line representation for Zipper seal visual aid */}
          {product.id === 'zipper-bag' && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-accentRed" />
          )}
        </div>

        {/* Right: Sizing table & Quote requests */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <div>
            <h3 className="text-2xl font-black text-brand-emerald uppercase tracking-tight">
              {product.name}
            </h3>
            <p className="text-xs font-bold text-brand-lightEmerald mt-1">
              "{product.slogan}"
            </p>
            <p className="text-xs text-brand-textGray mt-4 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications S/M/L Selection */}
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-emerald mb-3">
              Chọn kích thước & thông số:
            </h4>
            <div className="flex gap-2">
              {product.specs.map((spec) => (
                <button
                  key={spec.size}
                  onClick={() => setSelectedSize(spec.size)}
                  className={`flex-1 flex flex-col items-center py-2.5 rounded-2xl border text-center transition-all ${
                    selectedSize === spec.size 
                      ? 'border-brand-emerald bg-brand-emerald/5 text-brand-emerald font-bold' 
                      : 'border-gray-200 text-brand-textGray hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-black">{spec.size}</span>
                  <span className="text-[10px]">{spec.dimension}</span>
                </button>
              ))}
            </div>
            
            {/* Spec details row */}
            <div className="mt-3 bg-brand-lightBg rounded-2xl p-4 grid grid-cols-3 gap-2 text-center border border-gray-100">
              <div>
                <span className="text-[9px] uppercase font-bold text-brand-textGray block">Quy cách</span>
                <span className="text-xs font-bold text-brand-emerald">{currentSpec.quantity}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-brand-textGray block">Sức chứa</span>
                <span className="text-xs font-bold text-brand-emerald">{currentSpec.capacity}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-brand-textGray block">Độ dày</span>
                <span className="text-xs font-bold text-brand-emerald">{product.thickness}</span>
              </div>
            </div>
          </div>

          {/* Pricing area */}
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/60 flex items-center justify-between">
            <div>
              <span className="text-[9px] uppercase font-bold text-brand-textGray">Chính sách giá</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                {user ? (
                  <>
                    <span className="text-lg font-black text-brand-emerald">
                      {unitPrice.toLocaleString()}đ
                    </span>
                    <span className="text-xs text-brand-textGray line-through">
                      {originalUnitPrice.toLocaleString()}đ
                    </span>
                    <span className="text-[9px] font-bold bg-brand-lightEmerald text-white px-1.5 py-0.5 rounded">
                      -{discountRate}%
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-lg font-black text-brand-emerald">
                      {product.prices.retail.toLocaleString()}đ
                    </span>
                    <span className="text-[9px] text-brand-textGray"> (Đăng nhập để giảm tới 35%-50%)</span>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => onToggleSave(product.id)}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isSaved 
                  ? 'bg-brand-accentRed text-white hover:bg-red-600' 
                  : 'bg-white text-brand-emerald hover:bg-brand-lightBg border border-gray-200'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Đã lưu mẫu' : 'Lưu mẫu thử'}</span>
            </button>
          </div>

          {/* Quote & Sample box request buttons */}
          <div className="mt-6 border-t border-gray-100 pt-6">
            {!showQuoteCalculator ? (
              <button
                onClick={() => setShowQuoteCalculator(true)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-emerald hover:bg-brand-lightEmerald text-white py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <FileText className="h-4 w-4" />
                <span>Yêu cầu báo giá sỉ & Nhận mẫu thử</span>
              </button>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-brand-emerald flex items-center gap-1.5">
                    <Building className="h-4 w-4" /> YÊU CẦU BÁO GIÁ ĐẠI LÝ
                  </h4>
                  <button 
                    onClick={() => setShowQuoteCalculator(false)}
                    className="text-xs font-bold text-brand-textGray hover:text-brand-textDark"
                  >
                    Đóng lại
                  </button>
                </div>

                {isSubmitted ? (
                  <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100 flex flex-col items-center gap-3">
                    <div className="h-10 w-10 bg-brand-lightEmerald text-white rounded-full flex items-center justify-center font-bold text-lg">✓</div>
                    <div>
                      <h5 className="text-sm font-bold text-brand-emerald">Gửi yêu cầu thành công!</h5>
                      <p className="text-[11px] text-brand-textGray mt-1">
                        Chuyên viên CrystalPack sẽ liên hệ tư vấn và gửi hộp mẫu kích thước <strong>Size {selectedSize}</strong> cho {quoteRequest.company || 'quý khách'} qua số điện thoại <strong>{quoteRequest.phone}</strong> trong vòng 15 phút.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitQuote} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-brand-textGray block mb-1">Tên khách hàng</label>
                        <input
                          type="text"
                          required
                          value={quoteRequest.name}
                          onChange={(e) => setQuoteRequest({ ...quoteRequest, name: e.target.value })}
                          placeholder="Nguyễn Văn A"
                          className="w-full rounded-xl bg-brand-lightBg border border-gray-200 p-2 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-brand-textGray block mb-1">Số điện thoại *</label>
                        <input
                          type="tel"
                          required
                          value={quoteRequest.phone}
                          onChange={(e) => setQuoteRequest({ ...quoteRequest, phone: e.target.value })}
                          placeholder="0901234567"
                          className="w-full rounded-xl bg-brand-lightBg border border-gray-200 p-2 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-brand-textGray block mb-1">Tên Đại lý / Siêu thị / Nhà phân phối (nếu có)</label>
                      <input
                        type="text"
                        value={quoteRequest.company}
                        onChange={(e) => setQuoteRequest({ ...quoteRequest, company: e.target.value })}
                        placeholder="Siêu thị Co.opmart"
                        className="w-full rounded-xl bg-brand-lightBg border border-gray-200 p-2 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                      />
                    </div>

                    {/* Calculator inputs */}
                    <div className="grid grid-cols-3 gap-2 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-brand-textGray block">Số lượng đặt thử</label>
                        <input 
                          type="range"
                          min="10"
                          max="1000"
                          step="10"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value))}
                          className="w-full accent-brand-lightEmerald mt-1"
                        />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-brand-emerald">{quantity} {product.id === 'roll-bag' ? 'cuộn' : (product.id === 'zipper-bag' ? 'hộp' : 'xấp')}</span>
                      </div>
                    </div>

                    {/* Total cost simulation */}
                    <div className="bg-brand-lightBg p-3 rounded-xl border border-gray-100 text-xs">
                      <div className="flex justify-between">
                        <span className="text-brand-textGray">Đơn giá áp dụng:</span>
                        <span className="font-bold">{unitPrice.toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between mt-1 pt-1 border-t border-gray-200 text-brand-emerald font-black">
                        <span>Tổng chi phí dự kiến:</span>
                        <span>{totalPrice.toLocaleString()}đ</span>
                      </div>
                      {savedAmount > 0 && (
                        <div className="text-[10px] text-brand-lightEmerald font-bold mt-1 text-right">
                          (Tiết kiệm {savedAmount.toLocaleString()}đ nhờ tài khoản)
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-brand-lightEmerald hover:bg-brand-emerald text-white py-2.5 text-xs font-bold transition-all shadow-sm"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Gửi yêu cầu Báo Giá & Mẫu Thử</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
