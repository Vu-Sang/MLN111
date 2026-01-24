    import { useRef } from 'react';
    import { motion, useInView } from 'motion/react';
    import { ChevronRight, BookOpen, Users, TrendingUp, Zap } from 'lucide-react';

    interface SectionProps {
    children: React.ReactNode;
    className?: string;
    }

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

    export function ClassContent({ onViewChange }: { onViewChange?: (view: string) => void }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-amber-50/95 backdrop-blur-sm border-b border-orange-200">
            <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
            >
                <div className="w-3 h-3 bg-red-700 rounded-full" />
                <h1 className="text-2xl font-black text-amber-900">GIAI CẤP</h1>
            </motion.div>
            {/* Back Button */}
          <motion.button
            onClick={() => onViewChange?.("theory")}
            className="px-6 py-2 bg-gradient-to-r from-red-700 to-red-900 text-amber-50 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden sm:inline">Quay Lại</span>
          </motion.button>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-24">
            {/* Introduction */}
            <ContentSection className="mb-24">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "25rem" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-1 bg-gradient-to-r from-red-600 to-transparent mb-8"
            />
            <h2 className="text-5xl md:text-7xl font-black mb-8">
                Giai Cấp và Đấu Tranh Giai Cấp 
            </h2>
            <p className="text-xl text-gray-800 leading-relaxed">
                Phân tích khoa học về cấu trúc xã hội, định nghĩa, nguồn gốc, và quy luật phát triển của giai cấp trong chủ nghĩa Mác - Lênin.
            </p>
            </ContentSection>

            {/* Subsection A - Definition */}
            <ContentSection className="mb-24">
            <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
                <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
                Định Nghĩa Giai Cấp
                </motion.h3>

                <div className="space-y-8">
                <div>
                    <h4 className="text-2xl font-bold text-red-700 mb-4">Định Nghĩa Kinh Điển của V.I. Lênin</h4>
                    <p className="text-lg text-gray-300 leading-relaxed mb-4">
                    Trong tác phẩm "Sáng Kiến Vĩ Đại", V.I. Lênin đưa ra định nghĩa khoa học và đầy đủ nhất về giai cấp:
                    </p>
                    <div className="bg-black/50 p-6 border-l-4 border-red-600 italic text-gray-300 ml-4">
                    <p className="leading-relaxed">
                        "Người ta gọi là giai cấp, những tập đoàn người to lớn gồm những người khác nhau về 
                        địa vị của họ trong một hệ thống sản xuất xã hội nhất định trong lịch sử, khác nhau về 
                        quan hệ của họ (thường thường thì những quan hệ này được pháp luật quy định và thừa nhận) 
                        đối với những tư liệu sản xuất, về vai trò của họ trong tổ chức lao động xã hội, và như 
                        vậy là khác nhau về cách thức hưởng thụ và về phần của cải xã hội ít hay nhiều mà họ được 
                        hưởng. Giai cấp là những tập đoàn người, mà tập đoàn này có thể chiếm đoạt lao động của 
                        tập đoàn khác, do chỗ các tập đoàn đó có địa vị khác nhau trong một chế độ kinh tế - xã hội nhất định."
                    </p>
                    </div>
                </div>

                <div>
                    <h4 className="text-2xl font-bold text-red-700 mb-4">Yếu Tố Cơ Bản Xác Định Giai Cấp</h4>
                    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                        <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-6 h-6 text-red-700" />
                        <p className="font-bold text-gray-900">Địa Vị Sản Xuất</p>
                        </div>
                        <p className="text-gray-800">
                        Quan hệ với các tư liệu sản xuất (chủ nhân hay lao động thuê)
                        </p>
                    </div>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                        <div className="flex items-center gap-3 mb-3">
                        <Users className="w-6 h-6 text-red-700" />
                        <p className="font-bold text-gray-900">Vai Trò Xã Hội</p>
                        </div>
                        <p className="text-gray-800">
                        Vị trí trong tổ chức lao động xã hội
                        </p>
                    </div>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                        <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-6 h-6 text-red-700" />
                        <p className="font-bold text-gray-900">Lợi Ích Kinh Tế</p>
                        </div>
                        <p className="text-gray-800">
                        Cách thức hưởng thụ và phần của cải xã hội
                        </p>
                    </div>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                        <div className="flex items-center gap-3 mb-3">
                        <BookOpen className="w-6 h-6 text-red-700" />
                        <p className="font-bold text-gray-900">Tính Chất Pháp Luật</p>
                        </div>
                        <p className="text-gray-800">
                        Được pháp luật quy định và thừa nhận
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </ContentSection>

            {/* Subsection B - Origins */}
            <ContentSection className="mb-24">
            <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
                <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
                Nguồn Gốc và Hình Thành Giai Cấp
                </motion.h3>

                <div className="space-y-8">
                <div>
                    <h4 className="text-2xl font-bold text-red-700 mb-4">Nguồn Gốc Sâu Xa</h4>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700 mb-4">
                    <p className="text-gray-800 leading-relaxed">
                        <span className="font-bold">Phát triển lực lượng sản xuất:</span> Sự phát triển của lực lượng sản xuất 
                        làm cho năng suất lao động tăng lên, xuất hiện "của dư", tạo khả năng khách quan để tập đoàn người này 
                        chiếm đoạt lao động của tập đoàn người khác.
                    </p>
                    </div>
                </div>

                <div>
                    <h4 className="text-2xl font-bold text-red-700 mb-4">Nguồn Gốc Trực Tiếp</h4>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="text-gray-800 leading-relaxed">
                        <span className="font-bold">Chế độ tư hữu về tư liệu sản xuất:</span> Sự xuất hiện chế độ tư hữu về 
                        tư liệu sản xuất là cơ sở trực tiếp và quyết định nhất của sự hình thành giai cấp. Tư hữu tạo ra sự 
                        khác biệt căn bản về quan hệ với tư liệu sản xuất.
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </ContentSection>

            {/* Subsection C - Class Struggle */}
            <ContentSection className="mb-24">
            <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
                <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
                Đấu Tranh Giai Cấp
                </motion.h3>

                <div className="space-y-8">
                <div>
                    <h4 className="text-2xl font-bold text-red-700 mb-4">Khái Niệm</h4>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700 mb-6">
                    <p className="text-gray-800 leading-relaxed">
                        Đấu tranh giai cấp là cuộc đấu tranh của các tập đoàn người to lớn có lợi ích căn bản đối lập nhau 
                        trong xã hội có giai cấp. Thực chất là cuộc đấu tranh của quần chúng bị áp bức chống lại giai cấp 
                        thống trị để giải phóng bản thân.
                    </p>
                    </div>
                </div>

                <div>
                    <h4 className="text-2xl font-bold text-red-700 mb-4">Quy Luật Phát Triển Đấu Tranh Giai Cấp</h4>
                    <div className="space-y-4">
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                        <p className="font-bold text-gray-900 mb-2">Từ Tự Phát Đến Có Tổ Chức</p>
                        <p className="text-gray-800">
                        Đấu tranh giai cấp phát triển từ các hành động tự phát của giai cấp bị áp bức, dần dần 
                        trở thành đấu tranh có tổ chức dưới sự lãnh đạo của Đảng Cộng Sản.
                        </p>
                    </div>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                        <p className="font-bold text-gray-900 mb-2">Hình Thức Đấu Tranh</p>
                        <p className="text-gray-800">
                        Kinh tế (tranh thủ điều kiện lao động), Chính trị (giành quyền lực), Tư tưởng (xây dựng thế giới quan mới)
                        </p>
                    </div>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                        <p className="font-bold text-gray-900 mb-2">Cuộc Cách Mạng Vô Sản</p>
                        <p className="text-gray-800">
                        Là giai đoạn cao nhất của đấu tranh giai cấp, mục tiêu cuối cùng là xóa bỏ hoàn toàn chế độ giai cấp.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </ContentSection>

            {/* Subsection D - Class Structure */}
            <ContentSection className="mb-24">
            <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
                <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
                Cấu Trúc Giai Cấp Trong Các Chế Độ Khác Nhau
                </motion.h3>

                <div className="space-y-6">
                <div>
                    <h4 className="text-2xl font-bold text-red-700 mb-4">Xã Hội Phong Kiến</h4>
                    <div className="space-y-3 text-gray-800">
                    <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                        • <span className="font-bold">Giai cấp cơ bản:</span> Tầng chủ phong kiến và giai cấp nông dân
                    </p>
                    <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                        • <span className="font-bold">Giai cấp không cơ bản:</span> Thương nhân, thợ thủ công, chính quyền
                    </p>
                    </div>
                </div>

                <div>
                    <h4 className="text-2xl font-bold text-red-700 mb-4">Xã Hội Tư Bản Chủ Nghĩa</h4>
                    <div className="space-y-3 text-gray-800">
                    <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                        • <span className="font-bold">Giai cấp cơ bản:</span> Tầng chủ tư bản và giai cấp công nhân vô sản
                    </p>
                    <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                        • <span className="font-bold">Tầng lớp trung gian:</span> Tiểu tư sản, trí thức, nông dân bé
                    </p>
                    <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                        • <span className="font-bold">Đặc điểm:</span> Lực lượng sản xuất phát triển, nhất là công nghiệp
                    </p>
                    </div>
                </div>

                <div>
                    <h4 className="text-2xl font-bold text-red-700 mb-4">Xã Hội Chủ Nghĩa</h4>
                    <div className="space-y-3 text-gray-800">
                    <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                        • <span className="font-bold">Xóa bỏ giai cấp:</span> Quan hệ tư hữu được thay thế bằng tất cả nhân dân cùng sở hữu tư liệu sản xuất
                    </p>
                    <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                        • <span className="font-bold">Sự thống nhất:</span> Lao động phát triển, giữa lao động trí óc và lao động chân tay xóa mờ
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </ContentSection>

            {/* Conclusion */}
            <ContentSection className="mb-24 py-16 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 px-8 rounded-lg border border-red-600/30">
            <motion.h3 className="text-4xl font-bold mb-8 text-red-700 text-center">
                Kết Luận
            </motion.h3>
            <p className="text-xl text-gray-800 leading-relaxed">
                Giai cấp là sản phẩm của phát triển không bằng của lực lượng sản xuất. Đấu tranh giai cấp là động lực 
                thúc đẩy xã hội phát triển. Cuộc cách mạng vô sản dưới sự lãnh đạo của Đảng Cộng Sản là cách duy nhất 
                để xóa bỏ hoàn toàn chế độ giai cấp và xây dựng xã hội không giai cấp - xã hội chủ nghĩa cộng sản.
            </p>
            </ContentSection>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800 bg-black py-12 px-6">
            <div className="max-w-7xl mx-auto text-center text-gray-500">
            <p>© 2026 Kho Lưu Trữ Lý Thuyết Mác - Lênin Việt Nam</p>
            </div>
        </footer>
        </div>
    );
    }
