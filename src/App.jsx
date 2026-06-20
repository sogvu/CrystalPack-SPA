import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductCarousel';
import ProductModal from './components/ProductModal';
import VideoPlayer from './components/VideoPlayer';
import Auth from './components/Auth';
import SampleBox from './components/SampleBox';
import { Sparkles, Shield, HeartPulse, Recycle, Mail, Phone, MapPin, ExternalLink, ChevronRight, Award } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // States for bookmarks and viewing history
  const [savedIds, setSavedIds] = useState([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState([]);
  
  // Modal open states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSampleBoxOpen, setIsSampleBoxOpen] = useState(false);
  
  // Auth state
  const [user, setUser] = useState(null);

  // Scroll to section helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle bookmarking a product
  const handleToggleSave = (productId) => {
    setSavedIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        // limit to max 3 samples
        if (prev.length >= 3) {
          alert("Bạn chỉ có thể lưu tối đa 3 loại túi mẫu trong một hộp mẫu thử miễn phí!");
          return prev;
        }
        return [...prev, productId];
      }
    });
  };

  // Track recently viewed products
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    if (product && !recentlyViewedIds.includes(product.id)) {
      setRecentlyViewedIds(prev => [product.id, ...prev.slice(0, 3)]); // limit to 4 items max
    }
  };

  // Handle Login success
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  // Handle Logout
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-brand-lightBg flex flex-col font-sans selection:bg-brand-lightEmerald/20 text-brand-textDark">
      
      {/* Navbar Header */}
      <Navbar 
        onSearch={setSearchFilter} 
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
        savedCount={savedIds.length}
        onOpenSampleBox={() => setIsSampleBoxOpen(true)}
        onSelectProduct={handleSelectProduct}
        scrollToSection={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Cinematic Netflix-style Hero Banner */}
        <section id="hero">
          <Hero 
            onOpenSampleBox={() => setIsSampleBoxOpen(true)}
            onPlayVideo={() => scrollToSection('video')}
          />
        </section>

        {/* Dynamic Partner Benefits alert (updates upon auth role changes) */}
        <div className="bg-emerald-50 border-y border-emerald-100/50 py-4 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-lightEmerald text-white flex-shrink-0 shadow-sm">
                <Award className="h-5 w-5" />
              </span>
              <div>
                {user ? (
                  <p className="text-xs text-brand-emerald font-black">
                    Chào mừng đối tác <span className="underline">{user.name}</span>. Bạn đang kích hoạt đặc quyền chiết khấu {user.role === 'distributor' ? 'Đại Lý B2B (35% - 50%)' : 'Thành Viên B2C (15%)'}!
                  </p>
                ) : (
                  <p className="text-xs text-brand-textDark font-bold">
                    Trở thành Đại Lý phân phối hoặc Đăng ký thành viên để nhận bảng chiết khấu bán buôn lên tới 50% cùng mẫu thử miễn phí.
                  </p>
                )}
                <p className="text-[10px] text-brand-textGray mt-0.5">
                  Áp dụng cho các sản phẩm túi cuộn, túi có quai và túi zip an toàn thực phẩm.
                </p>
              </div>
            </div>
            
            {!user && (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="text-xs font-black bg-brand-emerald hover:bg-brand-lightEmerald text-white px-4 py-2 rounded-xl transition-all w-max shadow-sm"
              >
                Nhận Báo Giá Sỉ Ngay
              </button>
            )}
          </div>
        </div>

        {/* Product Carousel Row */}
        <ProductCarousel 
          onSelectProduct={handleSelectProduct}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          searchFilter={searchFilter}
        />

        {/* Custom Video Testing Section */}
        <VideoPlayer />

        {/* Informative Grid: Eco-friendly Commitment & Technology */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="flex flex-col gap-3 text-left">
                <span className="text-brand-emerald font-black text-xs uppercase tracking-wider">01. Chất Liệu Đạt Chuẩn</span>
                <p className="text-xs text-brand-textGray leading-relaxed">
                  CrystalPack sử dụng hạt nhựa nguyên sinh kết hợp màng hữu cơ tự phân hủy sinh học chất lượng cao, hoàn toàn không thôi nhiễm hóa chất độc hại vào thức ăn.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 text-left">
                <span className="text-brand-emerald font-black text-xs uppercase tracking-wider">02. Độ Dai Vượt Trội</span>
                <p className="text-xs text-brand-textGray leading-relaxed">
                  Màng bao bì dẻo dai cao cấp với công nghệ liên kết đa lớp, giúp chịu lực xé cực tốt, chống rách hỏng khi lưu trữ xương nhọn hoặc đồ đông lạnh cứng.
                </p>
              </div>
              
              <div className="flex flex-col gap-3 text-left">
                <span className="text-brand-emerald font-black text-xs uppercase tracking-wider">03. Khóa Khí Kín Tuyệt Đối</span>
                <p className="text-xs text-brand-textGray leading-relaxed">
                  Đường zip seal kép đỏ bền bỉ ngăn chặn 100% không khí, vi khuẩn và hơi ẩm xâm nhập, kéo dài độ tươi ngon của rau quả lên gấp 3 lần bình thường.
                </p>
              </div>

              <div className="flex flex-col gap-3 text-left">
                <span className="text-brand-emerald font-black text-xs uppercase tracking-wider">04. Phân Phối Toàn Quốc</span>
                <p className="text-xs text-brand-textGray leading-relaxed">
                  Hệ thống phân phối sỉ rộng khắp từ chợ truyền thống đến siêu thị lớn. Hỗ trợ giao hàng nhanh, chiết khấu đại lý tốt nhất thị trường.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer Section */}
      <footer className="bg-brand-emerald text-emerald-100 border-t border-emerald-900 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand column */}
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-emerald shadow-md font-bold">
                  🌱
                </span>
                <span className="text-xl font-black tracking-tight text-white">CrystalPack</span>
              </div>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Giải pháp bao bì công nghệ thế hệ mới bảo vệ an toàn vệ sinh thực phẩm và hướng tới môi trường xanh bền vững.
              </p>
              <div className="text-[10px] text-emerald-300 font-bold">
                Chứng chỉ: FDA Approved, ISO 9001:2015, ISO 14001:2015
              </div>
            </div>

            {/* Product Links */}
            <div className="text-left md:pl-8">
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">Sản phẩm chính</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">
                    Túi cuộn thực phẩm (Roll Bag)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">
                    Túi xách siêu thị (T-Shirt Bag)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('products')} className="hover:text-white transition-colors">
                    Túi zipper seal kép (Zipper Bag)
                  </button>
                </li>
              </ul>
            </div>

            {/* Policy & B2B Links */}
            <div className="text-left md:pl-8">
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">Hợp tác & Liên hệ</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setIsAuthOpen(true)} className="hover:text-white transition-colors">
                    Đăng ký làm Đại lý phân phối
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsSampleBoxOpen(true)} className="hover:text-white transition-colors">
                    Đăng ký nhận Hộp mẫu thử
                  </button>
                </li>
                <li>
                  <a href="#video" className="hover:text-white transition-colors">
                    Dây chuyền sản xuất vô trùng
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="text-left flex flex-col gap-4">
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2">Văn phòng CrystalPack</h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-emerald-300 flex-shrink-0" />
                  <span>Khu công nghiệp VSIP, Tỉnh Bình Dương, Việt Nam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-300 flex-shrink-0" />
                  <span>Hotline: 1900.6789 (B2B sỉ)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-300 flex-shrink-0" />
                  <span>Email: contact@crystalpack.vn</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright bar */}
          <div className="border-t border-emerald-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-center gap-4 text-[10px] text-emerald-300">
            <span>© {new Date().getFullYear()} CrystalPack Corporation. Đã đăng ký bản quyền.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-white">Chính sách bảo mật</a>
              <a href="#" className="hover:text-white">Kiểm định FDA & ISO</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Dynamic Popups Overlay / Drawer Section */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            isSaved={savedIds.includes(selectedProduct.id)}
            onToggleSave={handleToggleSave}
            user={user}
          />
        )}
        
        {isAuthOpen && (
          <Auth 
            onClose={() => setIsAuthOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        
        <SampleBox 
          isOpen={isSampleBoxOpen}
          onClose={() => setIsSampleBoxOpen(false)}
          savedIds={savedIds}
          recentlyViewedIds={recentlyViewedIds}
          onToggleSave={handleToggleSave}
          onSelectProduct={handleSelectProduct}
          user={user}
        />
      </AnimatePresence>

    </div>
  );
}
