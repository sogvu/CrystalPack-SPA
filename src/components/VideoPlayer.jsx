import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';
import { videos } from '../data/products';

export default function VideoPlayer() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const videoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Reset video player when active video changes
    if (videoRef.current) {
      videoRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
      setPlaybackRate(1);
    }
  }, [activeVideo]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e) => {
    if (!videoRef.current || !progressRef.current || duration === 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
    setIsMuted(val === 0);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    videoRef.current.muted = newMuted;
    if (!newMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const handleSpeedToggle = () => {
    if (!videoRef.current) return;
    const nextRate = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
    setPlaybackRate(nextRate);
    videoRef.current.playbackRate = nextRate;
  };

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) { /* Safari */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { /* IE11 */
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="video" className="py-16 bg-brand-lightBg border-t border-gray-100 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-lightEmerald uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="h-4 w-4 text-brand-lightEmerald" /> THƯ VIỆN ĐỘ BỀN THỰC TẾ
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-brand-emerald tracking-tight">
            Kiểm Chứng Chất Lượng & Hướng Dẫn
          </h2>
          <p className="text-xs text-brand-textGray mt-2">
            Xem trực tiếp video kiểm tra lực co giãn, kéo kéo căng và hướng dẫn bảo quản thực phẩm tại nhà bằng bao bì CrystalPack.
          </p>
        </div>

        {/* Video Player Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Custom Video Player Canvas */}
          <div className="lg:col-span-2 flex flex-col rounded-3xl overflow-hidden border border-gray-200 shadow-lg bg-black relative group">
            
            <div className="relative aspect-video w-full flex items-center justify-center">
              <video
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={handlePlayPause}
                className="w-full h-full object-cover cursor-pointer"
                playsInline
              >
                <source src={activeVideo.url} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ phát video.
              </video>

              {/* Big Center Play Overlay Button */}
              {!isPlaying && (
                <div 
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity duration-300"
                >
                  <button className="h-16 w-16 flex items-center justify-center rounded-full bg-brand-lightEmerald/95 text-white shadow-xl hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 fill-current pl-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Custom Control Bar (Netflix Black Overlay) */}
            <div className="bg-neutral-900 text-white p-4 flex flex-col gap-3 relative z-10">
              
              {/* Progress Slider Bar */}
              <div 
                ref={progressRef}
                onClick={handleProgressClick}
                className="h-1.5 w-full bg-neutral-700 rounded-full cursor-pointer relative overflow-hidden group/progress"
              >
                <div 
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  className="h-full bg-brand-lightEmerald rounded-full relative transition-all"
                />
              </div>

              {/* Audio, Playback speed, Time counter, fullscreen Row */}
              <div className="flex items-center justify-between gap-4">
                
                {/* Left: Play/Pause, Volume, Timer */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handlePlayPause}
                    className="p-1.5 hover:bg-neutral-800 rounded-full transition-colors text-white"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={handleMuteToggle}
                      className="p-1.5 hover:bg-neutral-800 rounded-full transition-colors text-white"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-brand-lightEmerald"
                    />
                  </div>

                  <span className="text-[10px] text-neutral-400 font-bold ml-1">
                    {formatTime(currentTime)} / {formatTime(duration || 0)}
                  </span>
                </div>

                {/* Right: Playback Speed, Fullscreen */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSpeedToggle}
                    className="text-[10px] font-black bg-neutral-800 border border-neutral-700 hover:border-neutral-500 rounded px-2.5 py-1 text-emerald-400"
                    title="Tốc độ phát"
                  >
                    {playbackRate}x
                  </button>

                  <button 
                    onClick={handleFullScreen}
                    className="p-1.5 hover:bg-neutral-800 rounded-full transition-colors text-white"
                    title="Toàn màn hình"
                  >
                    <Maximize className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video description text underneath */}
            <div className="bg-white p-4 border-t border-gray-100 text-left">
              <h3 className="text-sm font-black text-brand-emerald uppercase">
                {activeVideo.title}
              </h3>
              <p className="text-xs text-brand-textGray mt-1 leading-relaxed">
                {activeVideo.desc}
              </p>
            </div>
          </div>

          {/* Playlist Sidebar selector */}
          <div className="flex flex-col gap-3">
            <div className="p-3 border border-gray-100 bg-white rounded-2xl flex items-center justify-between text-xs font-bold text-brand-emerald uppercase tracking-wider shadow-sm">
              <span>Danh sách video thử nghiệm</span>
              <span className="bg-brand-emerald/10 text-brand-emerald text-[9px] px-2 py-0.5 rounded-full">
                {videos.length} clips
              </span>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {videos.map((vid) => {
                const isActive = activeVideo.id === vid.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className={`p-3 rounded-2xl border cursor-pointer flex gap-3 text-left transition-all ${
                      isActive 
                        ? 'border-brand-emerald bg-brand-emerald/5 shadow-sm' 
                        : 'border-gray-100 bg-white hover:border-gray-300'
                    }`}
                  >
                    {/* Fake thumbnail block */}
                    <div className="h-14 w-20 bg-neutral-900 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-[8px] font-black text-center px-1 text-emerald-400 border border-neutral-800">
                      <span>{vid.thumbnail}</span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h4 className={`text-xs font-bold truncate ${isActive ? 'text-brand-emerald' : 'text-brand-textDark'}`}>
                        {vid.title}
                      </h4>
                      <div className="flex items-center justify-between text-[9px] text-brand-textGray mt-2">
                        <span className="font-semibold">{vid.duration}</span>
                        {isActive && <span className="text-brand-lightEmerald font-bold">Đang phát</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quality commitment card */}
            <div className="mt-auto bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-left flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-brand-lightEmerald flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-brand-emerald">Cam kết chất lượng</h4>
                <p className="text-[10px] text-brand-textGray mt-1 leading-relaxed">
                  Tất cả các bài thử nghiệm độ chịu lực và tiêu chuẩn đóng gói vô trùng đều được quay trực tiếp tại nhà xưởng của CrystalPack và có sự kiểm định độc lập.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
