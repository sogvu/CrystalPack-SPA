import React, { useState, useEffect } from 'react';
import { Search, User, Bookmark, Menu, X, Sparkles, TrendingUp, Info } from 'lucide-react';
import { products } from '../data/products';

export default function Navbar({ 
  onSearch, 
  onOpenAuth, 
  user, 
  onLogout, 
  savedCount, 
  onOpenSampleBox,
  onSelectProduct,
  scrollToSection
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Live search handler
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      onSearch('');
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(p => {
      return (
        p.name.toLowerCase().includes(query) ||
        p.slogan.toLowerCase().includes(query) ||
        p.searchKeywords.some(kw => kw.toLowerCase().includes(query))
      );
    });
    
    setSearchResults(filtered);
    onSearch(query);
  }, [searchQuery]);

  const handleResultClick = (product) => {
    onSelectProduct(product);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-nav shadow-premium transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => scrollToSection('hero')}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-emerald text-white shadow-md">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-brand-emerald leading-tight">CrystalPack</span>
              <span className="text-[10px] font-bold tracking-widest text-brand-lightEmerald uppercase leading-none">Packaging</span>
            </div>
          </div>

          {/* Desktop Menu Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-sm font-semibold text-brand-textDark hover:text-brand-lightEmerald transition-colors"
            >
              Trang chủ
            </button>
            <button 
              onClick={() => scrollToSection('products')} 
              className="text-sm font-semibold text-brand-textDark hover:text-brand-lightEmerald transition-colors"
            >
              Sản phẩm
            </button>
            <button 
              onClick={() => scrollToSection('video')} 
              className="text-sm font-semibold text-brand-textDark hover:text-brand-lightEmerald transition-colors"
            >
              Thử nghiệm độ bền
            </button>
            <button 
              onClick={onOpenSampleBox} 
              className="text-sm font-semibold text-brand-textDark hover:text-brand-lightEmerald transition-colors flex items-center gap-1"
            >
              Yêu cầu Mẫu
            </button>
          </div>

          {/* Smart Search Bar */}
          <div className="relative flex-1 max-w-md mx-2 md:mx-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-brand-textGray">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Tìm thịt, cá, bánh kẹo, túi zip, kích thước..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full rounded-full bg-brand-lightBg border border-gray-200 py-1.5 pl-10 pr-4 text-sm text-brand-textDark placeholder-brand-textGray focus:border-brand-lightEmerald focus:outline-none focus:ring-1 focus:ring-brand-lightEmerald transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-textGray hover:text-brand-textDark"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Smart Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 border-b border-gray-50 flex items-center justify-between text-[11px] font-bold text-brand-textGray uppercase px-3 tracking-wider">
                  <span>Gợi ý loại túi phù hợp</span>
                  <TrendingUp className="h-3 w-3 text-brand-lightEmerald" />
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => handleResultClick(product)}
                      className="p-3 hover:bg-brand-lightBg cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <div className="h-10 w-12 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 relative">
                        <img 
                          src={product.images.all} 
                          alt={product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-brand-emerald truncate">{product.name}</h4>
                        <p className="text-[11px] text-brand-textGray truncate">{product.slogan}</p>
                      </div>
                      <div className="text-[10px] font-bold bg-brand-lightEmerald/10 text-brand-emerald px-2 py-0.5 rounded-full">
                        {product.material.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Empty Search State Dropdown */}
            {isSearchFocused && searchQuery.trim() !== '' && searchResults.length === 0 && (
              <div className="absolute top-full left-0 mt-2 w-full rounded-2xl bg-white border border-gray-100 shadow-xl p-4 text-center z-50 text-xs text-brand-textGray flex flex-col items-center gap-1">
                <Info className="h-5 w-5 text-gray-400" />
                <span>Không tìm thấy loại túi cho từ khóa "{searchQuery}"</span>
                <span className="text-[10px] text-gray-400">Hãy thử gõ "thịt", "cá", "bánh kẹo", "túi zip"</span>
              </div>
            )}
          </div>

          {/* Action Icons (Auth & Bookmark) */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            {/* Bookmark button */}
            <button 
              onClick={onOpenSampleBox}
              className="relative p-2 text-brand-emerald hover:bg-brand-lightEmerald/10 rounded-full transition-colors"
              title="Hộp mẫu thử"
            >
              <Bookmark className="h-5 w-5" />
              {savedCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accentRed text-[10px] font-black text-white ring-2 ring-white animate-bounce">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Auth Dropdown / Button */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-xs font-bold text-brand-emerald truncate max-w-[120px]">
                    {user.name}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-lightEmerald">
                    {user.role === 'distributor' ? 'Đại Lý B2B' : 'Khách Lẻ B2C'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="rounded-full bg-brand-lightEmerald/10 p-2 text-brand-emerald hover:bg-brand-lightEmerald/20 transition-colors text-xs font-bold flex items-center justify-center h-9 w-9"
                  title="Đăng xuất"
                >
                  <User className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="flex items-center gap-1 text-xs font-bold bg-brand-emerald text-white hover:bg-brand-lightEmerald px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
              >
                <User className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </button>
            )}

            {/* Hamburger menu for Mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-brand-emerald hover:bg-brand-lightEmerald/10 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white p-4 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top-5 duration-200">
          <button 
            onClick={() => { setIsMobileMenuOpen(false); scrollToSection('hero'); }}
            className="text-left py-2 text-sm font-semibold text-brand-textDark hover:text-brand-lightEmerald"
          >
            Trang chủ
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); scrollToSection('products'); }}
            className="text-left py-2 text-sm font-semibold text-brand-textDark hover:text-brand-lightEmerald"
          >
            Sản phẩm
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); scrollToSection('video'); }}
            className="text-left py-2 text-sm font-semibold text-brand-textDark hover:text-brand-lightEmerald"
          >
            Thử nghiệm độ bền
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onOpenSampleBox(); }}
            className="text-left py-2 text-sm font-semibold text-brand-textDark hover:text-brand-lightEmerald"
          >
            Yêu cầu Hộp Mẫu Thử
          </button>
        </div>
      )}
    </nav>
  );
}
