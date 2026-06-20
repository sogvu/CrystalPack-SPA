import React from 'react';
import { Play, Sparkles, ShieldCheck, HeartPulse, Recycle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onOpenSampleBox, onPlayVideo }) {
  return (
    <div className="relative w-full overflow-hidden bg-brand-emerald text-white min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Background Image with Netflix-style Gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="images/bag_default.jpg" 
          alt="Premium Packaging Showcase" 
          className="h-full w-full object-cover object-center opacity-40 brightness-75 scale-105"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-emerald via-brand-emerald/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-lightBg via-transparent to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="max-w-2xl text-left">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-lightEmerald/20 border border-brand-lightEmerald/30 px-3.5 py-1.5 text-xs font-semibold text-brand-lightBg tracking-wide mb-6 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-spin" />
            <span>STARTUP BAO BÌ CÔNG NGHỆ CAO CẤP THẾ HỆ MỚI</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-sans"
          >
            An toàn – Tiện lợi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-400">
              Dễ sử dụng
            </span><br />
            Bảo vệ thực phẩm mỗi ngày!
          </motion.h1>

          {/* Slogan details */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-emerald-100 max-w-lg mb-8 leading-relaxed"
          >
            Nền tảng phân phối màng bọc & túi nhựa sinh học bảo quản thực phẩm hàng đầu. Chất liệu siêu dai, vô trùng đạt chuẩn FDA Hoa Kỳ, bảo vệ sức khỏe gia đình bạn.
          </motion.p>

          {/* Core certifications banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6 mb-8 max-w-md"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-300 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Chuẩn FDA</span>
                <span className="text-[9px] text-emerald-100">100% Food-Grade</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-emerald-300 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Vô trùng</span>
                <span className="text-[9px] text-emerald-100">Khép kín ISO</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Recycle className="h-5 w-5 text-emerald-300 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Tự hủy</span>
                <span className="text-[9px] text-emerald-100">Eco-Friendly</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={onOpenSampleBox}
              className="pulse-emerald flex items-center justify-center gap-2 rounded-full bg-brand-lightEmerald text-white px-8 py-3.5 text-sm font-bold shadow-lg hover:bg-emerald-600 transition-all hover:scale-105"
            >
              <span>Nhận mẫu thử miễn phí</span>
            </button>
            
            <button 
              onClick={onPlayVideo}
              className="flex items-center justify-center gap-2 rounded-full border border-white/40 hover:border-white/90 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 text-sm font-bold backdrop-blur-sm transition-all hover:scale-105"
            >
              <Play className="h-4 w-4 fill-current text-emerald-300" />
              <span>Xem Video Thử Nghiệm Độ Bền</span>
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
