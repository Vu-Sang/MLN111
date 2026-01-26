import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronRight, BookOpen, Users, TrendingUp, Zap } from 'lucide-react';
import dauTranhGiaiCap from '../../assets/images/dautranhgiaicap.jpg';
import vidu from '../../assets/images/image.png';


interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

function ContentSection({ children, className = '', id }: SectionProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            id={id}                // ✅ BẮT BUỘC
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


export function ClassContent({
    onViewChange,
}: {
    onViewChange?: (view: 'home' | 'theory' | 'class' | 'ethnicity') => void;
}) {
    const [activeSection, setActiveSection] = useState('introduction');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        setActiveSection(id);

        const targetPosition = element.getBoundingClientRect().top + window.scrollY - 120; // Offset for header
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1000; // milliseconds for smooth scroll
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


    /* Detect active section on scroll */
    useEffect(() => {
        const sectionIds = [
            'introduction',
            'dinh-nghia',
            'giai-cap-origin',
            'dau-tranh',
            'vaitro',
            'cau-truc',
            'ket-luan',
        ];

        const handleScroll = () => {
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (!el) continue;

                const rect = el.getBoundingClientRect();
                if (rect.top <= 160 && rect.bottom >= 160) {
                    setActiveSection(id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const sections = [
        { id: 'introduction', title: 'Giới Thiệu', icon: '📚' },
        { id: 'dinh-nghia', title: 'Định Nghĩa', icon: '📝' },
        { id: 'giai-cap-origin', title: 'Nguồn Gốc', icon: '🌱' },
        { id: 'dau-tranh', title: 'Đấu Tranh Giai Cấp', icon: '⚡' },
        { id: 'vaitro', title: 'Vai Trò ', icon: '🎯' },
        { id: 'cau-truc', title: 'Cấu Trúc Giai Cấp', icon: '🏗️' },
        { id: 'ket-luan', title: 'Kết Luận', icon: '✓' },
    ];

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

            <div className="flex relative">
                {/* Left Sidebar - Table of Contents */}
                <aside className="fixed left-0 top-24 h-125 w-56 overflow-y-auto hidden lg:block pt-8 pl-4 pr-4 bg-gradient-to-b from-amber-50/50 to-transparent border-r border-b border-orange-200 z-30">
                    <div className="space-y-2">
                        <h3 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-6 px-2">
                            Mục Lục
                        </h3>
                        {sections.map((section, index) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                type="button"
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 cursor-pointer ${activeSection === section.id
                                    ? 'bg-red-700 text-white shadow-lg font-bold'
                                    : 'text-gray-700 hover:bg-orange-100 font-medium'
                                    }`}
                            >
                                <span className="text-lg flex-shrink-0">{section.icon}</span>
                                <span className="text-sm line-clamp-1">
                                    {section.title}
                                </span>
                                {activeSection === section.id && (
                                    <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 lg:ml-56 px-6 py-24">
                    <div className="max-w-4xl mx-auto">
                        {/* Introduction */}
                        <ContentSection id="introduction" className="mb-24">
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
                        <ContentSection id="dinh-nghia" className="mb-24">
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
                                                    <p className="font-bold text-gray-900">Địa vị trong sản xuất xã hội</p>
                                                </div>
                                                <p className="text-gray-800">
                                                    Quan hệ với các tư liệu sản xuất (chủ nhân hay lao động thuê)
                                                </p>
                                            </div>
                                            <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Users className="w-6 h-6 text-red-700" />
                                                    <p className="font-bold text-gray-900">Vai trò trong tổ chức lao động xã hội</p>
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
                                                    <p className="font-bold text-gray-900">Cách thức và quy mô hưởng thụ của cải</p>
                                                </div>
                                                <p className="text-gray-800">
                                                    Nguồn thu nhập và mức độ hưởng thụ của cải xã hội của từng giai cấp.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ContentSection>

                        {/* Subsection B - Origins */}
                        <ContentSection
                            id="giai-cap-origin"
                            className="mb-24 scroll-mt-28"
                        >
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
                        <ContentSection id="dau-tranh" className="mb-24">
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
                                    <div className="bg-orange-100 p-6 border-l-4 border-red-700 mb-6">
                                        <img
                                            src={dauTranhGiaiCap}
                                            alt="Đấu tranh giai cấp"
                                            className="w-full h-auto rounded-md object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-4">Quy Luật Phát Triển Đấu Tranh Giai Cấp</h4>
                                        <div className="space-y-4">
                                            <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                                                <p className="font-bold text-gray-900 mb-2">Từ Tự Phát Đến Có Tổ Chức</p>
                                                <p className="text-gray-800">
                                                    Đấu tranh giai cấp phát triển từ các hành động tự phát của giai cấp bị áp bức,
                                                    dần dần trở thành đấu tranh tự giác, có tổ chức dưới sự lãnh đạo của Đảng Cộng sản.

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
                                                    Là hình thức đấu tranh giai cấp cao nhất, nhằm lật đổ sự thống trị của giai cấp tư sản,
                                                    thiết lập chính quyền của giai cấp công nhân và nhân dân lao động,
                                                    từng bước tiến tới xã hội không còn giai cấp.
                                                </p>
                                            </div>
                                            <div className="bg-orange-100 p-6 border-l-4 border-red-700 mb-6">
                                                <img
                                                    src={vidu}
                                                    alt="Đấu tranh giai cấp"
                                                    className="w-full h-auto rounded-md object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ContentSection>

                        <ContentSection id="vaitro" className="mb-24">
                            <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
                                <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
                                    Vai trò của đấu tranh giai cấp
                                </motion.h3>

                                <div className="space-y-8">
                                    {/* Tiêu đề phụ */}
                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-4">
                                            Những vai trò cơ bản của đấu tranh giai cấp
                                        </h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Vai trò 1 */}
                                            <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <TrendingUp className="w-6 h-6 text-red-700" />
                                                    <p className="font-bold text-gray-900">
                                                        Xác lập quan hệ sản xuất mới
                                                    </p>
                                                </div>
                                                <p className="text-gray-800">
                                                    Thông qua đấu tranh giai cấp, quan hệ sản xuất mới được xác lập
                                                    phù hợp với trình độ phát triển của lực lượng sản xuất, từ đó
                                                    thúc đẩy sự phát triển của xã hội.
                                                </p>
                                            </div>

                                            {/* Vai trò 2 */}
                                            <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Zap className="w-6 h-6 text-red-700" />
                                                    <p className="font-bold text-gray-900">
                                                        Cải tạo xã hội, xóa bỏ lạc hậu
                                                    </p>
                                                </div>
                                                <p className="text-gray-800">
                                                    Đấu tranh giai cấp góp phần cải tạo xã hội, xóa bỏ những yếu tố
                                                    lạc hậu, lỗi thời, tạo cơ sở cho các yếu tố mới, tiến bộ phát triển.
                                                </p>
                                            </div>

                                            {/* Vai trò 3 */}
                                            <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Users className="w-6 h-6 text-red-700" />
                                                    <p className="font-bold text-gray-900">
                                                        Cải tạo giai cấp cách mạng
                                                    </p>
                                                </div>
                                                <p className="text-gray-800">
                                                    Thông qua đấu tranh giai cấp, giai cấp cách mạng được rèn luyện,
                                                    nâng cao ý thức, tổ chức và năng lực lãnh đạo xã hội, đủ khả năng
                                                    thực hiện vai trò lịch sử của mình.
                                                </p>
                                            </div>

                                            {/* Vai trò 4 */}
                                            <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <BookOpen className="w-6 h-6 text-red-700" />
                                                    <p className="font-bold text-gray-900">
                                                        Phát triển văn hóa – tư tưởng xã hội
                                                    </p>
                                                </div>
                                                <p className="text-gray-800">
                                                    Đấu tranh giai cấp tác động mạnh mẽ đến các lĩnh vực văn hóa,
                                                    tư tưởng, đạo đức và nghệ thuật, làm cho chúng phát triển phù hợp
                                                    với sự tiến bộ của xã hội.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ContentSection>

                        {/* Subsection D - Class Structure */}
                        <ContentSection id='cau-truc' className="mb-24">
                            <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
                                <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
                                    Cấu Trúc Giai Cấp Trong Các Chế Độ Khác Nhau
                                </motion.h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-4">Xã Hội Phong Kiến</h4>
                                        <div className="space-y-3 text-gray-800">
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Giai cấp cơ bản:</span> Địa chủ phong kiến và Nông dân tá điền. (Dùng "Địa chủ" sẽ chuẩn hơn "Tầng chủ").
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Giai cấp không cơ bản:</span> Thương nhân, thợ thủ công, thị dân.
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Đặc điểm:</span> Dựa trên sự chiếm hữu ruộng đất của địa chủ và sự lệ thuộc thân thể của nông dân.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-4">Xã Hội Tư Bản Chủ Nghĩa</h4>
                                        <div className="space-y-3 text-gray-800">
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Giai cấp cơ bản:</span> Giai cấp Tư sản và Giai cấp Công nhân (Giai cấp vô sản).
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Tầng lớp trung gian:</span> Tiểu tư sản, tầng lớp trí thức, những người sản xuất nhỏ.
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Đặc điểm:</span> Mâu thuẫn giữa tính chất xã hội hóa của lực lượng sản xuất với chế độ chiếm hữu tư nhân tư bản chủ nghĩa về tư liệu sản xuất.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-4">Xã Hội Chủ Nghĩa</h4>
                                        <div className="space-y-3 text-gray-800">
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Liên minh giai cấp:</span> Sự liên minh giữa Giai cấp Công nhân, Giai cấp Nông dân và Tầng lớp Trí thức.
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Xóa bỏ giai cấp:</span> Từng bước xóa bỏ chế độ tư hữu, thiết lập chế độ Công hữu về tư liệu sản xuất chủ yếu.
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Sự thống nhất:</span> Các giai cấp, tầng lớp cùng hợp tác vì lợi ích chung. Khoảng cách giữa lao động trí óc và lao động chân tay dần được thu hẹp.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ContentSection>

                        {/* Conclusion */}
                        <ContentSection id="ket-luan" className="mb-24 py-16 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 px-8 rounded-lg border border-red-600/30">
                            <motion.h3 className="text-4xl font-bold mb-8 text-red-700 text-center">
                                Kết Luận
                            </motion.h3>
                            <p className="text-xl text-gray-800 leading-relaxed">
                                Sự hình thành và biến đổi của giai cấp gắn liền với sự phát triển của lực lượng sản xuất và quan hệ sản xuất. Đấu tranh giai cấp là động lực lịch sử thúc đẩy xã hội tiến lên. Trong tiến trình đó, cách mạng vô sản và vai trò lãnh đạo của Đảng Cộng sản có ý nghĩa quyết định đối với mục tiêu xây dựng xã hội công bằng, tiến bộ và không còn áp bức giai cấp.
                            </p>
                        </ContentSection>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="border-t border-zinc-800 bg-black py-12 px-6">
                <div className="max-w-7xl mx-auto text-center text-gray-500">
                    <p>© 2026 Kho Lưu Trữ Lý Thuyết Mác - Lênin Việt Nam</p>
                </div>
            </footer>
        </div>
    );
}
