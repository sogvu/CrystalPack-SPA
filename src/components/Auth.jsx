import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, ShoppingBag, ShieldCheck, Mail, Lock, Building } from 'lucide-react';

export default function Auth({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [accountType, setAccountType] = useState('retail'); // retail, distributor
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    address: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate successful authentication
    const simulatedUser = {
      name: formData.name || (formData.email.split('@')[0]) || 'Khách Hàng',
      email: formData.email || 'customer@crystalpack.vn',
      role: accountType,
      company: accountType === 'distributor' ? (formData.company || 'Doanh Nghiệp CrystalPack') : '',
      address: formData.address || 'Hà Nội, Việt Nam'
    };

    onLoginSuccess(simulatedUser);
    onClose();
  };

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

      {/* Card Form */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10 p-8"
      >
        {/* Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-brand-textGray transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-lightEmerald">
            CỔNG THÔNG TIN ĐỐI TÁC
          </span>
          <h3 className="text-xl font-black text-brand-emerald mt-1">
            {isLogin ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Thành Viên'}
          </h3>
          <p className="text-xs text-brand-textGray mt-1">
            Để xem chiết khấu Đại lý và đặt mua hộp mẫu thử miễn phí.
          </p>
        </div>

        {/* Tab Role selection (B2B vs B2C) */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-brand-lightBg rounded-2xl border border-gray-100 mb-6">
          <button
            type="button"
            onClick={() => setAccountType('retail')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              accountType === 'retail'
                ? 'bg-white text-brand-emerald shadow-sm'
                : 'text-brand-textGray hover:text-brand-textDark'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <div className="flex flex-col items-start leading-none">
              <span className="font-bold">Khách mua lẻ</span>
              <span className="text-[8px] text-brand-textGray mt-0.5">Giảm 15% khi lưu mẫu</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setAccountType('distributor')}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              accountType === 'distributor'
                ? 'bg-white text-brand-emerald shadow-sm'
                : 'text-brand-textGray hover:text-brand-textDark'
            }`}
          >
            <Building className="h-4 w-4" />
            <div className="flex flex-col items-start leading-none">
              <span className="font-bold">Đại lý / Siêu thị</span>
              <span className="text-[8px] text-brand-lightEmerald mt-0.5">Chiết khấu sỉ 35-50%</span>
            </div>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <div>
              <label className="text-[10px] font-bold text-brand-textGray block mb-1">Tên của bạn *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-textGray">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-xl bg-brand-lightBg border border-gray-200 py-2 pl-10 pr-4 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold text-brand-textGray block mb-1">Địa chỉ Email *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-textGray">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="partner@crystalpack.vn"
                className="w-full rounded-xl bg-brand-lightBg border border-gray-200 py-2 pl-10 pr-4 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-brand-textGray block mb-1">Mật khẩu *</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-textGray">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full rounded-xl bg-brand-lightBg border border-gray-200 py-2 pl-10 pr-4 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
              />
            </div>
          </div>

          {accountType === 'distributor' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
              <div>
                <label className="text-[10px] font-bold text-brand-textGray block mb-1">Tên Doanh nghiệp / Cửa hàng *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-textGray">
                    <Building className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    name="company"
                    required={accountType === 'distributor'}
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Siêu thị Mini GreenFoods"
                    className="w-full rounded-xl bg-brand-lightBg border border-gray-200 py-2 pl-10 pr-4 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                  />
                </div>
              </div>
              
              {!isLogin && (
                <div>
                  <label className="text-[10px] font-bold text-brand-textGray block mb-1">Địa chỉ giao hàng / Nhận mẫu thử *</label>
                  <input
                    type="text"
                    name="address"
                    required={!isLogin && accountType === 'distributor'}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Đường Nguyễn Trãi, Quận 1, TP. HCM"
                    className="w-full rounded-xl bg-brand-lightBg border border-gray-200 py-2 px-3 text-xs text-brand-textDark focus:border-brand-lightEmerald focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-emerald hover:bg-brand-lightEmerald text-white py-3 text-xs font-bold transition-all shadow-md mt-6"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>{isLogin ? 'Đăng Nhập Ngay' : 'Đăng Ký Đối Tác'}</span>
          </button>
        </form>

        {/* Toggle link */}
        <div className="text-center mt-6 text-xs">
          <span className="text-brand-textGray">
            {isLogin ? 'Chưa có tài khoản đối tác? ' : 'Đã đăng ký tài khoản? '}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-brand-lightEmerald underline hover:text-brand-emerald"
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
