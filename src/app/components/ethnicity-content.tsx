import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronRight, Globe, Flag, Users, Zap } from 'lucide-react';

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

export function EthnicityContent({ onViewChange }: { onViewChange?: (view: string) => void }) {
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
            <h1 className="text-2xl font-black text-amber-900">DÂN TỘC</h1>
          </motion.div>
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
            whileInView={{ width: "20rem" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-red-600 to-transparent mb-8"
          />
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            Dân Tộc
          </h2>
          <p className="text-xl text-gray-800 leading-relaxed">
            Dân tộc là hình thức cộng đồng người phát triển cao nhất. Hiểu rõ khái niệm, đặc trưng, 
            quá trình hình thành và vai trò của dân tộc trong phát triển xã hội là chìa khóa để giải quyết 
            vấn đề dân tộc trong thời đại hiện nay.
          </p>
        </ContentSection>

        {/* Historical Forms */}
        <ContentSection className="mb-24">
          <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
              Các Hình Thức Cộng Đồng Người Trước Khi Hình Thành Dân Tộc
            </motion.h3>

            <p className="text-gray-300 mb-8 leading-relaxed">
              Lịch sử phát triển của các cộng đồng người trải qua các hình thức từ thấp đến cao, 
              phản ánh sự phát triển của lực lượng sản xuất và quan hệ sản xuất:
            </p>

            <div className="space-y-4">
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-red-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Thị Tộc (Gens)</h4>
                    <p className="text-gray-800 leading-relaxed">
                      Cộng đồng huyết thống, là đơn vị cơ sở của xã hội nguyên thủy. Mọi thành viên 
                      có quan hệ huyết thống chung, có cùng ngôn ngữ, lãnh thổ và tín ngưỡng.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <div className="flex items-start gap-4">
                  <Flag className="w-6 h-6 text-red-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Bộ Lạc (Tribe)</h4>
                    <p className="text-gray-800 leading-relaxed">
                      Tập hợp nhiều thị tộc, có cùng huyết thống, ngôn ngữ, lãnh thổ và tín ngưỡng, 
                      đứng đầu là thủ lĩnh tối cao. Đây là một bước tiến trong quá trình phát triển của cộng đồng người.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-red-700 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Bộ Tộc (Nationality)</h4>
                    <p className="text-gray-800 leading-relaxed">
                      Hình thành khi chế độ tư hữu và giai cấp xuất hiện. Liên kết dựa trên lãnh thổ 
                      và kinh tế sơ khai chứ không chỉ là huyết thống. Thường có chính quyền trung ương hóa.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Ethnicity/Nation Concept */}
        <ContentSection className="mb-24">
          <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
              Dân Tộc - Hình Thức Cộng Đồng Người Phổ Biến Hiện Nay
            </motion.h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold text-red-700 mb-4">Khái Niệm Dân Tộc</h4>
                <div className="bg-orange-100 p-6 border-l-4 border-red-700 mb-6">
                  <p className="text-gray-800 leading-relaxed">
                    Dân tộc là hình thức cộng đồng người phát triển cao nhất. Có thể hiểu theo nghĩa rộng 
                    (Quốc gia dân tộc - Nation) hoặc nghĩa hẹp (Tộc người - Ethnic group). Ở Việt Nam, 
                    khái niệm dân tộc thường được sử dụng để chỉ cả nước và các tộc người thiểu số.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-red-700 mb-4">Đặc Trưng Cơ Bản của Dân Tộc</h4>
                <div className="space-y-4">
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-6 h-6 text-red-700" />
                      <p className="font-bold text-gray-900">Cộng Đồng Về Lãnh Thổ</p>
                    </div>
                    <p className="text-gray-800">
                      Là chủ quyền lãnh thổ của một quốc gia hoặc vùng được xác định, là nơi sinh tồn 
                      và phát triển của dân tộc đó. Lãnh thổ là nền tảng địa lý cho sự thống nhất.
                    </p>
                  </div>

                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-6 h-6 text-red-700" />
                      <p className="font-bold text-gray-900">Cộng Đồng Về Kinh Tế</p>
                    </div>
                    <p className="text-gray-800">
                      Đây là đặc trưng quan trọng nhất, là mối liên hệ kinh tế gắn kết các bộ phận dân cư 
                      thành một khối thống nhất. Nền kinh tế chung tạo ra sự phân công lao động nội bộ.
                    </p>
                  </div>

                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-red-700" />
                      <p className="font-bold text-gray-900">Cộng Đồng Về Ngôn Ngữ</p>
                    </div>
                    <p className="text-gray-800">
                      Ngôn ngữ chung thống nhất là công cụ giao tiếp chủ yếu trong cộng đồng. 
                      Ngôn ngữ không chỉ là phương tiện giao tiếp mà còn phản ánh đặc tính văn hóa.
                    </p>
                  </div>

                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Flag className="w-6 h-6 text-red-700" />
                      <p className="font-bold text-gray-900">Cộng Đồng Về Văn Hóa, Tâm Lý</p>
                    </div>
                    <p className="text-gray-800">
                      Tạo nên bản sắc văn hóa dân tộc, biểu hiện qua phong tục, tập quán, tín ngưỡng, 
                      lối sống, giá trị tinh thần chung và ý thức dân tộc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Formation Process */}
        <ContentSection className="mb-24">
          <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
              Quá Trình Hình Thành Dân Tộc
            </motion.h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold text-red-700 mb-4">Ở Châu Âu</h4>
                <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                  <p className="text-gray-800 mb-4 leading-relaxed">
                    <span className="font-bold">Đặc điểm:</span> Dân tộc hình thành gắn liền với sự ra đời 
                    của chủ nghĩa tư bản.
                  </p>
                  <p className="text-gray-800 leading-relaxed">
                    <span className="font-bold">Cơ chế:</span> Thị trường tư bản phát triển xóa bỏ tính biệt lập 
                    của phong kiến địa phương, tạo ra thị trường thống nhất và nền kinh tế dân tộc. 
                    Ngôn ngữ dân tộc thống nhất được sử dụng trong thương mại và chính trị.
                  </p>
                  <p className="text-gray-800 mt-4 leading-relaxed">
                    <span className="font-bold">Kết quả:</span> Hình thành các "dân tộc tư sản" với tính chất 
                    tư bản chủ nghĩa.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-red-700 mb-4">Ở Phương Đông (Đặc Thù)</h4>
                <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                  <p className="text-gray-800 mb-4 leading-relaxed">
                    <span className="font-bold">Đặc điểm:</span> Dân tộc thường hình thành sớm hơn, 
                    trước khi chủ nghĩa tư bản ra đời.
                  </p>
                  <p className="text-gray-800 leading-relaxed">
                    <span className="font-bold">Nguyên nhân:</span> 
                  </p>
                  <ul className="list-disc list-inside text-gray-800 mt-2 space-y-2">
                    <li>Yêu cầu kỹ thuật trị thủy (xây dựng công trình thủy lợi) đòi hỏi tổ chức trung ương hóa</li>
                    <li>Cần phải chống lại ngoại xâm từ bên ngoài, đòi hỏi sự liên kết dân tộc chặt chẽ</li>
                    <li>Ví dụ: Dân tộc Việt Nam hình thành sớm do yêu cầu trị thủy sông Hồng</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-red-700 mb-4">Ví Dụ Cụ Thể: Dân Tộc Việt Nam</h4>
                <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                  <p className="text-gray-800 leading-relaxed">
                    Dân tộc Việt Nam hình thành từ thế kỷ 7-8, gắn liền với khả năng chinh phục và khai thác 
                    các vùng đồng bằng Hồng River. Sự phát triển kinh tế nông nghiệp, ngôn ngữ Việt thống nhất, 
                    chống lại sự xâm lược của các nước khác (trường kỳ ngoại xâm) đã tạo ra dân tộc Việt Nam 
                    với bản sắc riêng và ý thức dân tộc mạnh mẽ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Class-Ethnicity Relationship */}
        <ContentSection className="mb-24">
          <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
              Mối Quan Hệ Giữa Giai Cấp và Dân Tộc
            </motion.h3>

            <div className="space-y-6">
              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <p className="font-bold text-gray-900 mb-2 text-lg">Giai Cấp Quyết Định Dân Tộc</p>
                <p className="text-gray-800 leading-relaxed">
                  Quan hệ giai cấp quyết định khuynh hướng phát triển và tính chất của dân tộc. 
                  Giai cấp nào thống trị thì dân tộc mang tính chất của giai cấp đó. Ví dụ: Dân tộc tư sản 
                  (khi tư sản thống trị), Dân tộc xã hội chủ nghĩa (khi vô sản thống trị).
                </p>
              </div>

              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <p className="font-bold text-gray-900 mb-2 text-lg">Vấn Đề Dân Tộc Ảnh Hưởng Đến Giai Cấp</p>
                <p className="text-gray-800 leading-relaxed">
                  Giải quyết tốt vấn đề dân tộc tạo điều kiện thuận lợi cho đấu tranh giai cấp. 
                  Ngược lại, áp bức dân tộc, phân biệt chủng tộc sẽ cản trở đấu tranh giai cấp và tạo ra 
                  mâu thuẫn bên trong dân tộc, làm suy yếu sức mạnh tập thể.
                </p>
              </div>

              <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                <p className="font-bold text-gray-900 mb-2 text-lg">Tư Tưởng Hồ Chí Minh</p>
                <div className="bg-black/30 p-4 border-l-2 border-red-600 italic mt-3">
                  <p className="text-gray-200 leading-relaxed">
                    "Độc lập dân tộc gắn liền với Chủ nghĩa xã hội"
                  </p>
                </div>
                <p className="text-gray-800 leading-relaxed mt-3">
                  Điều này khẳng định rằng giải phóng dân tộc là tiền đề để có thể tiến hành cách mạng xã hội chủ nghĩa. 
                  Ở Việt Nam, lợi ích của giai cấp công nhân, nhân dân lao động và lợi ích của toàn dân tộc là thống nhất.
                </p>
              </div>
            </div>
          </div>
        </ContentSection>

        {/* Contemporary Relevance */}
        <ContentSection className="mb-24">
          <div className="bg-zinc-900 p-8 border-l-4 border-red-600">
            <motion.h3 className="text-3xl font-bold mb-6 text-gray-100">
              Ý Nghĩa Thực Tiễn Ở Việt Nam
            </motion.h3>

            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold text-red-700 mb-4">Đại Đoàn Kết Toàn Dân Tộc</h4>
                <div className="space-y-4">
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-bold">Cơ sở:</span> Ở Việt Nam, lợi ích của giai cấp công nhân, 
                      nhân dân lao động và lợi ích của toàn dân tộc là thống nhất hoàn toàn.
                    </p>
                  </div>
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-bold">Hình thức đấu tranh:</span> Đấu tranh giai cấp ở Việt Nam 
                      hiện nay không phải là đấu tranh đối kháng vũ trang, mà là đấu tranh chống lại nghèo nàn, 
                      lạc hậu, chống tham nhũng và các thế lực thù địch phá hoại khối đại đoàn kết.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 p-6 border-l-4 border-red-600">
                <p className="text-xl font-bold text-red-400 text-center">
                  Đại đoàn kết dân tộc là đường lối chiến lược của cách mạng Việt Nam
                </p>
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
            Dân tộc là hình thức cộng đồng người phát triển cao nhất với các đặc trưng riêng biệt về lãnh thổ, 
            kinh tế, ngôn ngữ và văn hóa. Hiểu rõ vấn đề dân tộc, mối quan hệ giữa giai cấp và dân tộc là điều 
            cần thiết để giải quyết đúng đắn các vấn đề xã hội trong kỷ nguyên hiện đại. Việt Nam, với truyền 
            thống chống ngoại xâm lâu đời, đã hình thành nên dân tộc Việt với bản sắc văn hóa độc đáo và niềm 
            tự hào dân tộc mạnh mẽ.
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
