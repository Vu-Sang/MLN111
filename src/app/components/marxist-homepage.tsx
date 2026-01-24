import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'motion/react';
import { ArrowRight, BookOpen, Users, TrendingUp, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import banner from "../../assets/images/banner3.jpg";

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedText({ children, className = '', delay = 0 }: { children: string; className?: string; delay?: number }) {
  const letters = children.split('');

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block"
          style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

function ParallaxImage({ src, alt, speed = 0.5 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y, scale }} className="w-full h-full">
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}

export function MarxistHomepage({ onViewChange }: { onViewChange?: (view: 'home' | 'theory') => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const heroBlur = useTransform(smoothProgress, [0, 0.2], [0, 10]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBgOpacity = Math.max(0, Math.min((scrollY - 300) / 200, 0.95));
  const navVisibility = scrollY > 300 ? 1 : 0;
  const navPointerEvents = scrollY > 300 ? 'auto' : 'none';
  const navColor = scrollY > 350 ? 'text-gray-900' : 'text-amber-50';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1200; // milliseconds for smooth scroll
    let start: number | null = null;

    // Easing function for smooth deceleration
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const scroll = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-amber-50 to-orange-50 text-gray-900">
      {/* Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
        style={{
          backgroundColor: `rgba(250, 239, 221, ${navBgOpacity})`,
          opacity: navVisibility,
          pointerEvents: navPointerEvents as any
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-red-700 to-red-900 rounded-lg flex items-center justify-center">
              <span className="text-amber-50 font-bold text-lg">M</span>
            </div>
            <span className={`font-bold text-xl transition-colors duration-300 ${navColor}`}>

            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <motion.button
              onClick={() => scrollToSection('home')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Trang chủ
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('dinh-nghia')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Định nghĩa
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('key-concepts')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Khái niệm
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contemporary')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mối quan hệ
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('cta')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Khám phá
            </motion.button>
          </div>

          {/* Theory Button */}
          <motion.button
            onClick={() => onViewChange?.('theory')}
            className="px-6 py-2 bg-gradient-to-r from-red-700 to-red-900 text-amber-50 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen size={18} />
            <span className="hidden sm:inline">Lý thuyết</span>
          </motion.button>
        </div>
      </motion.nav>
      {/* Hero Section */}
      <section id="home" className="h-screen relative overflow-hidden">
        {/* Animated Background */}
        <ParallaxImage
          src={banner}
          alt="Background"
          speed={0.3}
        />
        {/* Gradient Overlays */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black z-10"
          style={{ opacity: useTransform(smoothProgress, [0, 0.3], [1, 0.5]) }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-900/30 via-transparent to-red-900/30 z-10"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Hero Content */}
        <motion.div
          className="relative z-20 h-full flex items-center justify-center px-6"
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            filter: useTransform(heroBlur, (v) => `blur(${v}px)`)
          }}
        >
          <div className="max-w-7xl w-full">
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-8"
            >
              <motion.div
                className="inline-block px-6 py-2 
               bg-[#FAEFDD]/15 
               border border-[#FAEFDD]/40 
               rounded-full 
               backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(250, 239, 221, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm uppercase tracking-[0.4em] text-[#FAEFDD]">
                  IB1805 – Nhóm 7
                </span>
              </motion.div>
            </motion.div>


            {/* Main Title */}
            <div className="mb-12">
              <h1 className="font-['Times_New_Roman'] font-black leading-[1.15]">

                {/* WRAPPER: chiều rộng theo Mác–Lênin */}
                <div className="inline-block">

                  {/* LINE 1 – TRIẾT HỌC (1 HÀNG, CENTER THEO MÁC–LÊNIN) */}
                  <div className="overflow-hidden pt-6 pb-1 text-center">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="inline-block text-[#FAEFDD] text-5xl md:text-6xl lg:text-[5.5rem] whitespace-nowrap">
                        Triết học
                      </span>
                    </motion.div>
                  </div>

                  {/* LINE 2 – MÁC–LÊNIN (TRỤC CHUẨN) */}
                  <div className="overflow-hidden pt-4 pb-2">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="inline-block text-[#FAEFDD] text-5xl md:text-6xl lg:text-[6.5rem] leading-[1.15]">
                        Mác–Lênin
                      </span>
                    </motion.div>
                  </div>

                  {/* LINE 3 – GIAI CẤP & DÂN TỘC (GIỐNG TRIẾT HỌC) */}
                  <div className="overflow-hidden pt-2 text-center">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="inline-block text-[#FAEFDD]/90 text-xl md:text-2xl lg:text-3xl font-normal tracking-wide whitespace-nowrap">
                        Giai cấp &amp; Dân tộc
                      </span>
                    </motion.div>
                  </div>

                </div>

              </h1>
            </div>



            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="max-w-xl"
            >
              <p className="text-base md:text-lg lg:text-xl leading-relaxed mb-12 text-[#E6DDC8]  ">
                Phân tích về cấu trúc giai cấp, đấu tranh giai cấp, hình thành dân tộc và mối quan hệ
                biện chứng giữa giai cấp, dân tộc và nhân loại trong chủ nghĩa Mác – Lênin.
              </p>
            </motion.div>


            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-wrap gap-6"
            >
              <motion.button
                onClick={() => onViewChange?.('theory')}
                className="
         group relative px-10 py-5
    bg-[#8C1916]
    border 
    rounded-lg
    overflow-hidden cursor-pointer
  "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#5C2A2A] via-[#4A1F1F] to-[#5C2A2A]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                <span className="relative z-10 flex items-center gap-3 text-lg font-semibold text-white">
                  Khám Phá Lý Thuyết
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </motion.button>




              <motion.button
                onClick={() => onViewChange?.('theory')}
                className="
    px-10 py-5
    bg-[#FAEFDD]
    border-2 border-[#FAEFDD]
    rounded-lg
    backdrop-blur-sm
    transition-all duration-300
    cursor-pointer
  "
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#F3E6C8"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg font-semibold text-[#2A1E1A] ">
                  Đọc Toàn Bộ Nội Dung
                </span>
              </motion.button>

            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-sm text-gray-600 uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* Gradient Transition Layer */}
      <div className="h-32 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-amber-900/20 to-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-orange-400/10 to-transparent"
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Introduction Section */}
      <section id='dinh-nghia' className="min-h-screen relative py-32 px-6 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div>
              <AnimatedSection>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "20rem" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-1 bg-gradient-to-r from-red-800 to-transparent mb-8"
                />

                <h2 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="text-gray-900">Định Nghĩa</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <span className="text-red-700">Giai Cấp</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <span className="text-gray-900">Kinh Điển</span>
                  </motion.div>
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-xl text-gray-700 leading-relaxed"
                >
                  Theo V.I. Lênin, giai cấp là những tập đoàn người to lớn khác nhau về địa vị
                  trong hệ thống sản xuất xã hội. Sự tồn tại của giai cấp gắn liền với chế độ
                  tư hữu về tư liệu sản xuất và sẽ biến mất khi chế độ tư hữu bị xóa bỏ hoàn toàn.
                </motion.p>
              </AnimatedSection>
            </div>

            {/* Right Content - Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: BookOpen,
                  title: "Nguồn Gốc Sâu Xa",
                  description: "Sự phát triển của lực lượng sản xuất làm cho năng suất lao động tăng lên, xuất hiện 'của dư', tạo khả năng khách quan để tập đoàn người này chiếm đoạt lao động của tập đoàn người khác.",
                  delay: 0.2
                },
                {
                  icon: Users,
                  title: "Nguồn Gốc Trực Tiếp",
                  description: "Sự xuất hiện chế độ tư hữu về tư liệu sản xuất. Chế độ tư hữu là cơ sở trực tiếp của sự hình thành giai cấp.",
                  delay: 0.4
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: card.delay }}
                  whileHover={{ x: -10 }}
                  className="group relative bg-gradient-to-br from-orange-100 to-amber-100 p-8 border-l-4 border-red-700 cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-700/5 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative z-10">
                    <card.icon className="w-14 h-14 text-red-700 mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{card.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Transition to Quote Section */}
      <div className="h-32 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-amber-50 via-amber-900/10 to-black/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-orange-400/5 via-red-950/15 to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Quote Section with Parallax */}
      <section className="relative py-48 px-6 overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1643970118347-e11ad4d48a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBib29rcyUyMGxpYnJhcnl8ZW58MXx8fHwxNzY4MDM3NTA5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Books"
          speed={0.4}
        />

        <div className="absolute inset-0 bg-black/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/20 to-transparent z-10" />

        <div className="max-w-5xl mx-auto relative z-20">
          <AnimatedSection>
            <motion.blockquote
              className="text-4xl md:text-6xl lg:text-7xl font-['Lora'] italic text-white leading-[1.15] tracking-wide mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:wght@700&display=swap" />
              " Giai cấp là những tập đoàn người, mà tập đoàn này có thể chiếm đoạt lao động
              của tập đoàn khác, do chỗ các tập đoàn đó có địa vị khác nhau trong một chế độ kinh tế - xã hội nhất định "
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-red-700 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <div>
                <p className="text-2xl text-red-700 font-bold">V.I. Lênin</p>
                <p className="text-gray-400 italic">Sáng Kiến Vĩ Đại</p>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gradient Transition to Key Concepts */}
      <div className="h-32 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-amber-900/15 to-amber-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-orange-400/8 to-transparent"
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Key Concepts - Grid */}
      <section id="key-concepts" className="py-32 px-6 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-20">
            <motion.h2
              className="text-6xl md:text-8xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Các Khái Niệm <span className="text-red-700">Chính</span>
            </motion.h2>
            <motion.div
              className="h-1 bg-gradient-to-r from-red-700 via-red-600 to-transparent\"
              initial={{ width: 0 }}
              whileInView={{ width: "75%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Đấu Tranh Giai Cấp",
                description: "Là cuộc đấu tranh của các tập đoàn người to lớn có lợi ích căn bản đối lập nhau. Thực chất là cuộc đấu tranh của quần chúng bị áp bức chống lại giai cấp thống trị.",
                icon: Users
              },
              {
                number: "02",
                title: "Kết Cấu Xã Hội",
                description: "Mỗi xã hội có giai cấp thường gồm hai giai cấp cơ bản (gắn với phương thức sản xuất thống trị) và các giai cấp không cơ bản hoặc tầng lớp trung gian.",
                icon: TrendingUp
              },
              {
                number: "03",
                title: "Hình Thành Dân Tộc",
                description: "Dân tộc là hình thức cộng đồng người phát triển cao nhất, gắn liền với lãnh thổ, kinh tế, ngôn ngữ chung và bản sắc văn hóa dân tộc.",
                icon: BookOpen
              }
            ].map((concept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -20, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-orange-100 to-amber-50 p-10 border border-orange-200 hover:border-red-700 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-lg"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-700/0 to-red-700/0 group-hover:from-red-700/5 group-hover:to-transparent\"
                  transition={{ duration: 0.5 }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <motion.span
                      className="text-8xl font-black text-[#D6C7B5] group-hover:text-red-700/20 transition-colors duration-500\"
                      whileHover={{ scale: 1.1 }}
                    >
                      {concept.number}
                    </motion.span>
                    <motion.div
                      whileHover={{ rotate: 180, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="p-4 bg-[#7A1F1F]/10   group-hover:bg-[#7A1F1F]/20 rounded-full\"
                    >
                      <concept.icon className="w-8 h-8 text-red-700\" />
                    </motion.div>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300\">
                    {concept.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6\">
                    {concept.description}
                  </p>

                  <motion.div
                    className="flex items-center gap-2 text-red-700 font-semibold\"
                    whileHover={{ x: 10 }}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient Transition to Contemporary Relevance */}
      <div className="h-32 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-amber-50 via-amber-800/15 to-amber-900/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-orange-300/5 via-amber-700/10 to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Contemporary Relevance */}
      <section id="contemporary" className="relative py-32 px-6 overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1615800098746-73af8261e3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcGFwZXIlMjB0ZXh0dXJlfGVufDF8fHx8MTc2ODAzNzUwOXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Vintage"
          speed={0.5}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-amber-900/30 z-10\" />

        <div className="max-w-6xl mx-auto relative z-20">
          <AnimatedSection>
            <motion.h2
              className="text-5xl md:text-7xl font-black text-white mb-16"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Mối Quan Hệ <span className="text-red-700">Giai Cấp - Dân Tộc</span>
            </motion.h2>

            <div className="space-y-10">
              {[
                "Giai cấp quyết định dân tộc: Quan hệ giai cấp quyết định khuynh hướng phát triển và tính chất của dân tộc. Giai cấp nào thống trị thì dân tộc mang tính chất của giai cấp đó.",
                "Vấn đề dân tộc ảnh hưởng đến giai cấp: Giải quyết tốt vấn đề dân tộc tạo điều kiện thuận lợi cho đấu tranh giai cấp. Ngược lại, áp bức dân tộc sẽ cản trở đấu tranh giai cấp.",
                "Ở Việt Nam: Lợi ích của giai cấp công nhân, nhân dân lao động và lợi ích của toàn dân tộc là thống nhất. Đại đoàn kết dân tộc là đường lối chiến lược của cách mạng Việt Nam."
              ].map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group relative pl-8 border-l-4 border-red-700 hover:border-amber-900 transition-colors duration-500"
                >
                  <motion.p
                    className="text-2xl text-gray-800 leading-relaxed"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {text}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gradient Transition to Final CTA */}
      <div className="h-32 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-amber-800/10 to-amber-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-amber-700/15 via-orange-400/5 to-transparent"
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Final CTA */}
      <section id="cta" className="py-10 px-6 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50\">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <motion.h2
              className="text-6xl md:text-9xl font-black mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent\">
                Độc Lập
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 bg-clip-text text-transparent\">
                Dân Tộc
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl text-gray-800 mb-16 max-w-3xl mx-auto text-center leading-relaxed"
            >
              “Độc lập dân tộc gắn liền với Chủ nghĩa xã hội” – Chủ tịch Hồ Chí Minh.
              <br />
              Đại đoàn kết dân tộc là đường lối chiến lược của cách mạng Việt Nam.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <motion.button
                onClick={() => onViewChange?.('theory')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-red-700 text-white text-xl font-bold hover:bg-red-800 transition-colors cursor-pointer\ rounded-lg"
              >
                Đọc Toàn Bộ Lý Thuyết
              </motion.button>
              <motion.button
                onClick={() => onViewChange?.('theory')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-[#1F2937] text-white border-2 border-gray-700 text-xl font-bold hover:bg-[#111827] transition-colors duration-300 cursor-pointer rounded-lg "
              >
                Xem Tài Liệu Tham Khảo
              </motion.button>
            </motion.div>
            <motion.button
              onClick={() => window.open("https://test-mln111.vercel.app/", "_blank")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-transparent border-2 border-gray-700 text-gray-900 text-xl font-bold hover:bg-gray-100 transition-colors cursor-pointer rounded-lg text-center mt-10 block mx-auto"
            >
              Hành trình đi tìm căn cước
            </motion.button>

          </AnimatedSection>
        </div>
      </section>

      {/* Gradient Transition to Footer */}
      <div className="h-20 relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-amber-50 to-orange-100/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-orange-200/3 via-amber-300/5 to-transparent"
          animate={{
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-orange-200 bg-gradient-to-b from-amber-50 to-orange-50\">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500"
            >
              © 2026 Kho Lưu Trữ Lý Thuyết Mác - Lênin Việt Nam
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex gap-8 text-gray-500"
            >
              {['Giới Thiệu', 'Tài Nguyên', 'Tài Liệu', 'Liên Hệ'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ color: "#dc2626", y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="hover:text-red-600 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
