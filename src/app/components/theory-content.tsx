import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronRight } from 'lucide-react';

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

export function TheoryContent({ onViewChange }: { onViewChange?: (view: 'home' | 'theory') => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-900\">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-amber-50/95 backdrop-blur-sm border-b border-orange-200\">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-3 h-3 bg-red-700 rounded-full\" />
            <h1 className="text-2xl font-black text-amber-900\">GIAI CẤP VÀ DÂN TỘC</h1>
          </motion.div>
          <motion.button
            onClick={() => onViewChange?.('home')}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-700 hover:text-red-700 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Quay Lại
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-24">
        {/* Introduction */}
        <ContentSection className="mb-24">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-red-600 to-transparent mb-8"
          />
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            II - Giai Cấp và Dân Tộc
          </h2>
          <p className="text-xl text-gray-800 leading-relaxed">
            Phân tích khoa học về cấu trúc xã hội, những quy luật chủ yếu của giai cấp, đấu tranh giai cấp, 
            hình thành dân tộc và mối quan hệ biện chứng giữa giai cấp, dân tộc và nhân loại trong chủ nghĩa Mác - Lênin.
          </p>
        </ContentSection>

        {/* Section 1 */}
        <ContentSection className="mb-24">
          <motion.h3 className="text-4xl font-bold mb-8 text-red-700">
            1. Giai Cấp và Đấu Tranh Giai Cấp
          </motion.h3>

          {/* Subsection A */}
          <div className="mb-16 bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h4 className="text-3xl font-bold mb-6 text-gray-900">
              a) Giai Cấp
            </motion.h4>

            <div className="space-y-8">
              <div>
                <h5 className="text-2xl font-bold text-red-700 mb-4">Định Nghĩa</h5>
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  V.I. Lênin đưa ra định nghĩa kinh điển về giai cấp trong tác phẩm "Sáng Kiến Vĩ Đại":
                </p>
                <div className="bg-black/50 p-6 border-l-4 border-red-600 italic text-gray-400 ml-4">
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
                <h5 className="text-2xl font-bold text-red-700 mb-4">Nguồn Gốc Giai Cấp</h5>
                <div className="space-y-6">
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <h6 className="text-xl font-bold text-gray-900 mb-3">Nguồn Gốc Sâu Xa</h6>
                    <p className="text-gray-800 leading-relaxed">
                      Sự phát triển của lực lượng sản xuất làm cho năng suất lao động tăng lên, xuất hiện "của dư", 
                      tạo khả năng khách quan để tập đoàn người này chiếm đoạt lao động của tập đoàn người khác.
                    </p>
                  </div>

                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <h6 className="text-xl font-bold text-gray-900 mb-3">Nguồn Gốc Trực Tiếp</h6>
                    <p className="text-gray-800 leading-relaxed">
                      Sự xuất hiện chế độ tư hữu về tư liệu sản xuất. Chế độ tư hữu là cơ sở trực tiếp của sự hình thành 
                      giai cấp. Giai cấp chỉ mất đi khi chế độ tư hữu bị xóa bỏ hoàn toàn.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-2xl font-bold text-red-700 mb-4">Kết Cấu Xã Hội - Giai Cấp</h5>
                <p className="text-gray-800 leading-relaxed mb-4">
                  Trong xã hội có giai cấp, kết cấu này thường gồm hai giai cấp cơ bản (gắn với phương thức sản xuất thống trị) 
                  và các giai cấp không cơ bản hoặc tầng lớp trung gian.
                </p>
                <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                  <p className="text-gray-800 leading-relaxed">
                    <strong>Ví dụ:</strong>
                    <ul className="list-disc list-inside mt-3 space-y-2">
                      <li>Chủ nô - Nô lệ (Xã hội chiếm hữu nô lệ)</li>
                      <li>Địa chủ - Nông dân (Xã hội phong kiến)</li>
                      <li>Tư sản - Vô sản (Xã hội tư bản chủ nghĩa)</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subsection B */}
          <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h4 className="text-3xl font-bold mb-6 text-gray-900">
              b) Đấu Tranh Giai Cấp
            </motion.h4>

            <div className="space-y-8">
              <div>
                <h5 className="text-2xl font-bold text-red-700 mb-4">Tính Tất Yếu và Thực Chất</h5>
                <div className="space-y-4 text-gray-800">
                  <p className="leading-relaxed">
                    • Đấu tranh giai cấp là cuộc đấu tranh của các tập đoàn người to lớn có lợi ích căn bản đối lập nhau 
                    trong một phương thức sản xuất xã hội nhất định.
                  </p>
                  <p className="leading-relaxed">
                    • Thực chất là cuộc đấu tranh của quần chúng bị áp bức, bóc lột chống lại giai cấp thống trị, áp bức.
                  </p>
                  <p className="leading-relaxed">
                    • Đây là hiện tượng tất yếu do sự đối kháng về lợi ích cơ bản không thể điều hòa được giữa các giai cấp.
                  </p>
                </div>
              </div>

              <div>
                <h5 className="text-2xl font-bold text-red-700 mb-4">Vai Trò của Đấu Tranh Giai Cấp</h5>
                <div className="space-y-4 text-gray-800">
                  <p className="leading-relaxed">
                    • Là động lực trực tiếp, quan trọng của lịch sử trong xã hội có giai cấp.
                  </p>
                  <p className="leading-relaxed">
                    • Đỉnh cao của đấu tranh giai cấp dẫn đến cách mạng xã hội, thay thế quan hệ sản xuất cũ bằng quan hệ 
                    sản xuất mới, thúc đẩy lực lượng sản xuất phát triển, đưa xã hội từ hình thái kinh tế - xã hội thấp lên cao hơn.
                  </p>
                </div>
              </div>

              <div>
                <h5 className="text-2xl font-bold text-red-700 mb-4">Đấu Tranh Giai Cấp của Giai Cấp Vô Sản</h5>
                <div className="space-y-4 text-gray-800">
                  <div className="bg-orange-100 p-4 border-l-4 border-red-700">
                    <p className="font-bold mb-2">Khi Chưa Có Chính Quyền:</p>
                    <p className="leading-relaxed">
                      Diễn ra dưới 3 hình thức cơ bản: đấu tranh kinh tế, đấu tranh chính trị và đấu tranh tư tưởng.
                    </p>
                  </div>
                  <div className="bg-orange-100 p-4 border-l-4 border-red-700">
                    <p className="font-bold mb-2">Trong Thời Kỳ Quá Độ Lên CNXH:</p>
                    <p className="leading-relaxed">
                      Diễn ra trong điều kiện mới (vô sản đã cầm quyền), với nội dung mới (xây dựng toàn diện CNXH) 
                      và hình thức mới (hành chính, giáo dục, kinh tế, cải tạo và xây dựng...).
                    </p>
                  </div>
                  <div className="bg-orange-100 p-4 border-l-4 border-red-700">
                    <p className="font-bold mb-2">Ở Việt Nam Hiện Nay:</p>
                    <p className="leading-relaxed">
                      Diễn ra gay go, phức tạp, gắn liền với bảo vệ độc lập dân tộc, chống lại các thế lực thù địch 
                      và định hướng đi lên CNXH, thực hiện mục tiêu dân giàu, nước mạnh.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Section 2 */}
        <ContentSection className="mb-24">
          <motion.h3 className="text-4xl font-bold mb-8 text-red-700">
            2. Dân Tộc
          </motion.h3>

          {/* Subsection A */}
          <div className="mb-16 bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h4 className="text-3xl font-bold mb-6 text-gray-900">
              a) Các Hình Thức Cộng Đồng Người Trước Khi Hình Thành Dân Tộc
            </motion.h4>

            <p className="text-gray-800 mb-6 leading-relaxed">
              Lịch sử phát triển của các cộng đồng người trải qua các hình thức từ thấp đến cao:
            </p>

            <div className="space-y-4">
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <h5 className="text-xl font-bold text-gray-900 mb-2">Thị Tộc</h5>
                <p className="text-gray-800">Cộng đồng huyết thống, là đơn vị cơ sở của xã hội nguyên thủy.</p>
              </div>
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <h5 className="text-xl font-bold text-gray-900 mb-2">Bộ Lạc</h5>
                <p className="text-gray-800">
                  Tập hợp nhiều thị tộc, có cùng huyết thống, ngôn ngữ và lãnh thổ, đứng đầu là thủ lĩnh tối cao.
                </p>
              </div>
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <h5 className="text-xl font-bold text-gray-900 mb-2">Bộ Tộc</h5>
                <p className="text-gray-800">
                  Hình thành khi chế độ tư hữu và giai cấp xuất hiện. Liên kết dựa trên lãnh thổ và kinh tế sơ khai 
                  chứ không chỉ là huyết thống.
                </p>
              </div>
            </div>
          </div>

          {/* Subsection B */}
          <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h4 className="text-3xl font-bold mb-6 text-gray-900">
              b) Dân Tộc - Hình Thức Cộng Đồng Người Phổ Biến Hiện Nay
            </motion.h4>

            <div className="space-y-8">
              <div>
                <h5 className="text-2xl font-bold text-red-700 mb-4">Khái Niệm</h5>
                <p className="text-gray-800 leading-relaxed">
                  Dân tộc là hình thức cộng đồng người phát triển cao nhất. Có thể hiểu theo nghĩa rộng (quốc gia dân tộc - Nation) 
                  hoặc nghĩa hẹp (tộc người - Ethnic group).
                </p>
              </div>

              <div>
                <h5 className="text-2xl font-bold text-red-700 mb-4">Đặc Trưng Cơ Bản của Dân Tộc</h5>
                <div className="space-y-4">
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="font-bold text-gray-900 mb-2">Cộng Đồng Về Lãnh Thổ</p>
                    <p className="text-gray-800">
                      Là chủ quyền lãnh thổ của một quốc gia, là nơi sinh tồn và phát triển của dân tộc đó.
                    </p>
                  </div>
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="font-bold text-gray-900 mb-2">Cộng Đồng Về Kinh Tế</p>
                    <p className="text-gray-800">
                      Đây là đặc trưng quan trọng nhất, là mối liên hệ kinh tế gắn kết các bộ phận dân cư thành một khối thống nhất.
                    </p>
                  </div>
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="font-bold text-gray-900 mb-2">Cộng Đồng Về Ngôn Ngữ</p>
                    <p className="text-gray-800">
                      Ngôn ngữ chung thống nhất là công cụ giao tiếp chủ yếu trong cộng đồng.
                    </p>
                  </div>
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="font-bold text-gray-900 mb-2">Cộng Đồng Về Văn Hóa, Tâm Lý</p>
                    <p className="text-gray-800">
                      Tạo nên bản sắc văn hóa dân tộc, biểu hiện qua phong tục, tập quán, tín ngưỡng, lối sống...
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-2xl font-bold text-red-700 mb-4">Quá Trình Hình Thành Dân Tộc</h5>
                <div className="space-y-4">
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="font-bold text-gray-900 mb-2">Ở Châu Âu</p>
                    <p className="text-gray-800">
                      Dân tộc hình thành gắn liền với sự ra đời của chủ nghĩa tư bản (thị trường thống nhất xóa bỏ tính 
                      biệt lập phong kiến). Đây là các "dân tộc tư sản".
                    </p>
                  </div>
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="font-bold text-gray-900 mb-2">Ở Phương Đông (Đặc Thù)</p>
                    <p className="text-gray-800">
                      Dân tộc thường hình thành sớm hơn, trước khi chủ nghĩa tư bản ra đời, do yêu cầu trị thủy 
                      (làm nông nghiệp) và chống ngoại xâm (như trường hợp dân tộc Việt Nam).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Section 3 */}
        <ContentSection className="mb-24">
          <motion.h3 className="text-4xl font-bold mb-8 text-red-700">
            3. Mối Quan Hệ Giai Cấp - Dân Tộc - Nhân Loại
          </motion.h3>

          {/* Subsection A */}
          <div className="mb-16 bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h4 className="text-3xl font-bold mb-6 text-gray-900">
              a) Quan Hệ Giai Cấp - Dân Tộc
            </motion.h4>

            <div className="space-y-6 text-gray-800">
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <p className="font-bold text-gray-900 mb-2">Giai Cấp Quyết Định Dân Tộc</p>
                <p className="leading-relaxed">
                  Quan hệ giai cấp quyết định khuynh hướng phát triển và tính chất của dân tộc. Giai cấp nào thống trị 
                  thì dân tộc mang tính chất của giai cấp đó (Ví dụ: Dân tộc tư sản, Dân tộc xã hội chủ nghĩa).
                </p>
              </div>
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <p className="font-bold text-gray-900 mb-2">Vấn Đề Dân Tộc Ảnh Hưởng Đến Giai Cấp</p>
                <p className="leading-relaxed">
                  Giải quyết tốt vấn đề dân tộc tạo điều kiện thuận lợi cho đấu tranh giai cấp. Ngược lại, áp bức dân tộc 
                  sẽ cản trở đấu tranh giai cấp.
                </p>
              </div>
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <p className="font-bold text-gray-900 mb-2">Tư Tưởng Hồ Chí Minh</p>
                <p className="leading-relaxed">
                  Giải phóng dân tộc là tiền đề để giải phóng giai cấp. "Độc lập dân tộc gắn liền với chủ nghĩa xã hội".
                </p>
              </div>
            </div>
          </div>

          {/* Subsection B */}
          <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h4 className="text-3xl font-bold mb-6 text-gray-900">
              b) Quan Hệ Giai Cấp, Dân Tộc Với Nhân Loại
            </motion.h4>

            <div className="space-y-6 text-gray-800">
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <p className="font-bold text-gray-900 mb-2">Nhân Loại</p>
                <p className="leading-relaxed">
                  Là toàn thể cộng đồng người sống trên trái đất. Trong xã hội có giai cấp, lợi ích nhân loại không tách rời 
                  mà bị chi phối bởi lợi ích giai cấp và dân tộc.
                </p>
              </div>
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <p className="font-bold text-gray-900 mb-2">Mối Quan Hệ Biện Chứng</p>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li>
                    Sự tồn tại và phát triển của nhân loại là tiền đề cho sự tồn tại của dân tộc và giai cấp.
                  </li>
                  <li>
                    Sự phát triển của mỗi dân tộc và cuộc đấu tranh của các giai cấp tiến bộ sẽ đóng góp vào sự phát triển 
                    chung của văn minh nhân loại.
                  </li>
                  <li>
                    Lợi ích giai cấp chân chính và lợi ích dân tộc chân chính luôn thống nhất với lợi ích của toàn nhân loại.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Section 4 - Vietnam */}
        <ContentSection className="mb-24">
          <motion.h3 className="text-4xl font-bold mb-8 text-red-700">
            VI. THỰC TIỄN VIỆT NAM
          </motion.h3>

          <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
            <div className="space-y-8">
              <div>
                <h5 className="text-2xl font-bold text-gray-900 mb-4">
                  Vận Dụng Sáng Tạo Chủ Nghĩa Mác - Lênin
                </h5>
                <div className="bg-black/50 p-6 border-l-4 border-red-600 italic text-xl">
                  <p className="text-gray-800 leading-relaxed">
                    Chủ tịch Hồ Chí Minh khẳng định: "Độc lập dân tộc gắn liền với Chủ nghĩa xã hội."
                  </p>
                </div>
              </div>

              <div>
                <h5 className="text-2xl font-bold text-gray-900 mb-4">
                  Đại Đoàn Kết Toàn Dân Tộc
                </h5>
                <div className="space-y-4 text-gray-800">
                  <p className="leading-relaxed">
                    • Ở Việt Nam, lợi ích của giai cấp công nhân, nhân dân lao động và lợi ích của toàn dân tộc là thống nhất.
                  </p>
                  <p className="leading-relaxed">
                    • Đấu tranh giai cấp ở Việt Nam hiện nay không phải là đấu tranh đối kháng vũ trang, mà là đấu tranh chống 
                    lại nghèo nàn, lạc hậu, chống tham nhũng và các thế lực thù địch phá hoại khối đại đoàn kết.
                  </p>
                  <p className="leading-relaxed font-bold">
                    • Kết luận: Đại đoàn kết dân tộc là đường lối chiến lược của cách mạng Việt Nam.
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
          <p className="text-xl text-gray-800 leading-relaxed text-center">
            Giai cấp và dân tộc là những khái niệm cơ bản trong chủ nghĩa Mác - Lênin, đóng vai trò quan trọng 
            trong việc hiểu rõ lịch sử phát triển xã hội nhân loại. Tại Việt Nam, sự thống nhất giữa đấu tranh 
            giải phóng dân tộc và xây dựng chủ nghĩa xã hội tạo nên một con đường độc lập, sáng tạo vô cùng đặc thù.
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

