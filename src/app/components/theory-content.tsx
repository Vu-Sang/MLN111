import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowLeft, ChevronRight, Users, Globe } from 'lucide-react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}
const NAV_ITEMS = [
  { id: "home", label: "Trang chủ" },
  { id: "dinh-nghia", label: "Định nghĩa" },
  { id: "key-concepts", label: "Khái niệm" },
  { id: "contemporary", label: "Mối quan hệ" },
  { id: "cta", label: "Khám phá" },
];

function ContentSection({ children, className = '' }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TheoryContent({ onViewChange }: { onViewChange?: (view: string) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-900">
      {/* Navigation Bar */}
      <motion.nav
        className="sticky top-0 z-50 px-6 py-4 bg-gradient-to-r from-amber-50/95 via-amber-50/95 to-orange-50/95 backdrop-blur-sm border-b border-orange-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewChange?.("home")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-red-700 to-red-900 rounded-lg flex items-center justify-center">
              <span className="text-amber-50 font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Lý Thuyết</span>
          </motion.div>

          {/* Center Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <motion.button
                onClick={() => onViewChange?.("home")}
                className="font-medium text-gray-800 hover:text-red-700 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Back Button */}
          <motion.button
            onClick={() => onViewChange?.("home")}
            className="px-6 py-2 bg-gradient-to-r from-red-700 to-red-900 text-amber-50 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Quay Lại</span>
          </motion.button>
        </div>
      </motion.nav>


      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-24">
        {/* Introduction */}
        <ContentSection className="mb-24">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "20rem" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-red-600 to-transparent mb-8"
          />
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            Giai Cấp và Dân Tộc
          </h2>
          <p className="text-xl text-gray-800 leading-relaxed">
            Khám phá hai khái niệm cốt lõi trong chủ nghĩa Mác - Lênin. Chọn một chủ đề dưới đây để tìm hiểu chi tiết.
          </p>
        </ContentSection>

        {/* Theory Navigation Cards */}
        <ContentSection className="mb-24">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Class Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -20, transition: { duration: 0.3 } }}
              onClick={() => onViewChange?.('class')}
              className="group relative bg-gradient-to-br from-orange-100 to-amber-100 p-12 border-2 border-red-700 cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-700/0 to-red-700/0 group-hover:from-red-700/10 group-hover:to-transparent"
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-16 bg-red-700/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-red-700" />
                  </div>
                </motion.div>

                <h3 className="text-4xl font-black text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">
                  Giai Cấp
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Tìm hiểu về định nghĩa, nguồn gốc, hình thành giai cấp, đấu tranh giai cấp
                  và cấu trúc giai cấp trong các chế độ khác nhau.
                </p>

                <motion.div
                  className="flex items-center gap-2 text-red-700 font-semibold text-lg"
                  whileHover={{ x: 10 }}
                >
                  <span>Khám phá</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>

            {/* Ethnicity Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -20, transition: { duration: 0.3 } }}
              onClick={() => onViewChange?.('ethnicity')}
              className="group relative bg-gradient-to-br from-orange-100 to-amber-100 p-12 border-2 border-red-700 cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-700/0 to-red-700/0 group-hover:from-red-700/10 group-hover:to-transparent"
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-16 bg-red-700/20 rounded-full flex items-center justify-center">
                    <Globe className="w-8 h-8 text-red-700" />
                  </div>
                </motion.div>

                <h3 className="text-4xl font-black text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">
                  Dân Tộc
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Tìm hiểu về khái niệm dân tộc, các hình thức cộng đồng người,
                  đặc trưng cơ bản, quá trình hình thành và mối quan hệ giai cấp - dân tộc.
                </p>

                <motion.div
                  className="flex items-center gap-2 text-red-700 font-semibold text-lg"
                  whileHover={{ x: 10 }}
                >
                  <span>Khám phá</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </ContentSection>

        {/* Overview Section */}
        <ContentSection className="mb-24 py-16 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 px-8 rounded-lg border border-red-600/30">
          <motion.h3 className="text-4xl font-bold mb-8 text-red-700">
            Tổng Quan
          </motion.h3>
          <div className="space-y-6 text-lg text-gray-800 leading-relaxed">
            <p>
              Giai cấp và dân tộc là hai khái niệm cốt lõi trong chủ nghĩa Mác - Lênin,
              đóng vai trò quan trọng trong việc hiểu rõ lịch sử phát triển xã hội nhân loại.
            </p>
            <p>
              <span className="font-bold">Giai cấp</span> được định nghĩa là những tập đoàn người to lớn khác nhau
              về địa vị trong hệ thống sản xuất xã hội. Giai cấp là kết quả của sự phát triển không bằng của
              lực lượng sản xuất và là động lực thúc đẩy sự phát triển của xã hội.
            </p>
            <p>
              <span className="font-bold">Dân tộc</span> là hình thức cộng đồng người phát triển cao nhất,
              được đặc trưng bởi cộng đồng về lãnh thổ, kinh tế, ngôn ngữ và văn hóa. Mối quan hệ giữa giai cấp
              và dân tộc là phức tạp: giai cấp quyết định tính chất của dân tộc, nhưng vấn đề dân tộc cũng có
              ảnh hưởng sâu sắc đến đấu tranh giai cấp.
            </p>
            <p>
              Tại Việt Nam, sự thống nhất giữa đấu tranh giải phóng dân tộc và xây dựng chủ nghĩa xã hội tạo nên
              một con đường độc lập, sáng tạo vô cùng đặc thù, với "Độc lập dân tộc gắn liền với Chủ nghĩa xã hội"
              là một nguyên lý nền tảng.
            </p>
          </div>
        </ContentSection>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black/90 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>© 2026 Kho Lưu Trữ Lý Thuyết Mác - Lênin Việt Nam</p>
        </div>
      </footer>
    </div>
  );
}

