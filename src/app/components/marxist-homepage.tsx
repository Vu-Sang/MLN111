import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'motion/react';
import { ArrowRight, BookOpen, Users, TrendingUp, ChevronDown, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import banner from "../../assets/images/banner3.jpg";
import dantoc from "../../assets/images/Dantoc.jpg";
import giaicap from '../../assets/images/giaicap.jpg';
import background from '../../assets/images/background.jpg';
import background2 from '../../assets/images/backgroand2.jpg';
import background3 from '../../assets/images/background3.jpg';

/// Navigation handler for internal routes
type ViewType = 'home' | 'theory' | 'class' | 'ethnicity';

// Combined Questions Interface
interface CombinedQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: 'class' | 'ethnicity';
}

const navigateToSection = (
  target?: string,
  onViewChange?: (view: ViewType) => void
) => {
  if (!target || !onViewChange) return;

  const [path, sectionId] = target.split('#');

  const viewMap: Record<
    '/class-content' | '/ethnicity-content' | '/theory-content',
    ViewType
  > = {
    '/class-content': 'class',
    '/ethnicity-content': 'ethnicity',
    '/theory-content': 'theory',
  };

  const view = viewMap[path as keyof typeof viewMap];
  if (!view) return;

  // đổi view
  onViewChange(view);

  // scroll tới section (nếu có) - delay to allow DOM to render
  if (sectionId) {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  }
};


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

// Combined Questions from Class and Ethnicity
const allCombinedQuestions: CombinedQuestion[] = [
  // Class Questions (1-15)
  { id: 1, question: "Theo V.I. Lênin, giai cấp là những tập đoàn người to lớn khác nhau về địa vị của họ trong một hệ thống nào?", options: ["Hệ thống chính trị - pháp luật nhất định", "Hệ thống sản xuất xã hội nhất định trong lịch sử", "Hệ thống phân phối và hưởng thụ của cải", "Hệ thống phân cấp tầng lớp xã hội"], correctAnswer: "Hệ thống sản xuất xã hội nhất định trong lịch sử", explanation: "Lênin xác định giai cấp dựa trên địa vị của các tập đoàn người trong hệ thống sản xuất xã hội lịch sử.", category: "class" },
  { id: 2, question: "Đặc trưng nào giúp một tập đoàn người có thể chiếm đoạt lao động của tập đoàn người khác?", options: ["Do họ có sức mạnh quân sự lớn hơn", "Do họ có trình độ học vấn cao hơn", "Do họ có địa vị khác nhau trong một chế độ kinh tế - xã hội nhất định", "Do họ được pháp luật quy định là giai cấp thống trị"], correctAnswer: "Do họ có địa vị khác nhau trong một chế độ kinh tế - xã hội nhất định", explanation: "Sự khác nhau về địa vị trong hệ thống kinh tế - xã hội cho phép giai cấp này chiếm đoạt lao động của giai cấp khác.", category: "class" },
  { id: 3, question: "Nguồn gốc sâu xa của sự hình thành giai cấp là do:", options: ["Sự phát triển của lực lượng sản xuất làm xuất hiện của dư", "Sự xuất hiện của chế độ tư hữu về tư liệu sản xuất", "Sự phân công lao động xã hội bị đình trệ", "Sự tranh giành quyền lực giữa các bộ tộc"], correctAnswer: "Sự phát triển của lực lượng sản xuất làm xuất hiện của dư", explanation: "Khi lực lượng sản xuất phát triển tạo ra của dư, xã hội xuất hiện khả năng chiếm đoạt, dẫn đến phân hóa giai cấp.", category: "class" },
  { id: 4, question: "Chế độ nào được coi là cơ sở trực tiếp của sự hình thành giai cấp?", options: ["Chế độ công hữu về tư liệu sản xuất", "Chế độ phân phối bình quân", "Chế độ tư hữu về tư liệu sản xuất", "Chế độ quân chủ chuyên chế"], correctAnswer: "Chế độ tư hữu về tư liệu sản xuất", explanation: "Tư hữu về tư liệu sản xuất là cơ sở trực tiếp dẫn đến sự phân hóa giai cấp.", category: "class" },
  { id: 5, question: "Giai cấp chỉ thực sự mất đi khi nào?", options: ["Khi năng suất lao động đạt mức tối đa", "Khi nhà nước không còn tồn tại", "Khi chế độ tư hữu bị xóa bỏ hoàn toàn", "Khi mọi người có mức thu nhập bằng nhau"], correctAnswer: "Khi chế độ tư hữu bị xóa bỏ hoàn toàn", explanation: "Theo chủ nghĩa Mác - Lênin, xóa bỏ tư hữu về tư liệu sản xuất là điều kiện để xóa bỏ giai cấp.", category: "class" },
  { id: 6, question: "Giai cấp cơ bản trong một kết cấu xã hội - giai cấp là giai cấp:", options: ["Gắn với phương thức sản xuất thống trị", "Có số lượng người đông đảo nhất", "Có trình độ văn hóa cao nhất", "Nắm giữ bộ máy pháp luật"], correctAnswer: "Gắn với phương thức sản xuất thống trị", explanation: "Giai cấp cơ bản gắn trực tiếp với phương thức sản xuất giữ vai trò quyết định trong xã hội.", category: "class" },
  { id: 7, question: "Cặp giai cấp cơ bản trong xã hội phong kiến là:", options: ["Chủ nô và nô lệ", "Địa chủ và nông dân", "Tư sản và vô sản", "Quý tộc và bình dân"], correctAnswer: "Địa chủ và nông dân", explanation: "Trong xã hội phong kiến, địa chủ chiếm hữu ruộng đất và bóc lột nông dân.", category: "class" },
  { id: 8, question: "Thực chất của đấu tranh giai cấp là cuộc đấu tranh của:", options: ["Các dân tộc bị áp bức chống lại dân tộc đi xâm lược", "Quần chúng bị áp bức, bóc lột chống lại giai cấp thống trị", "Các đảng phái chính trị đối lập", "Những người nghèo chống lại những người giàu"], correctAnswer: "Quần chúng bị áp bức, bóc lột chống lại giai cấp thống trị", explanation: "Đấu tranh giai cấp phản ánh mâu thuẫn lợi ích cơ bản giữa các giai cấp đối kháng.", category: "class" },
  { id: 9, question: "Vì sao đấu tranh giai cấp là hiện tượng tất yếu?", options: ["Do sự đối kháng về lợi ích cơ bản không thể điều hòa", "Do sự khác biệt về quan điểm chính trị", "Do bản tính con người thích tranh đấu", "Do sự phân chia giàu nghèo"], correctAnswer: "Do sự đối kháng về lợi ích cơ bản không thể điều hòa", explanation: "Mâu thuẫn lợi ích cơ bản giữa các giai cấp đối kháng khiến đấu tranh giai cấp là tất yếu.", category: "class" },
  { id: 10, question: "Vai trò của đấu tranh giai cấp đối với lịch sử xã hội là:", options: ["Là động lực gián tiếp thúc đẩy kinh tế", "Là động lực trực tiếp, quan trọng của lịch sử", "Làm suy yếu sức mạnh quốc gia", "Là yếu tố duy nhất làm thay đổi xã hội"], correctAnswer: "Là động lực trực tiếp, quan trọng của lịch sử", explanation: "Đấu tranh giai cấp là động lực thúc đẩy sự thay thế các hình thái kinh tế - xã hội.", category: "class" },
  { id: 11, question: "Đỉnh cao của đấu tranh giai cấp sẽ dẫn đến:", options: ["Một cuộc thương lượng hòa bình", "Sự diệt vong của cả hai giai cấp", "Cách mạng xã hội, thay thế quan hệ sản xuất cũ", "Thay đổi nhân sự chính quyền"], correctAnswer: "Cách mạng xã hội, thay thế quan hệ sản xuất cũ", explanation: "Cách mạng xã hội là kết quả tất yếu khi mâu thuẫn giai cấp phát triển đến đỉnh cao.", category: "class" },
  { id: 12, question: "Trước khi có chính quyền, giai cấp vô sản đấu tranh qua 3 hình thức cơ bản là:", options: ["Kinh tế, chính trị và tư tưởng", "Quân sự, ngoại giao và kinh tế", "Văn hóa, xã hội và pháp luật", "Bãi công, biểu tình và khởi nghĩa"], correctAnswer: "Kinh tế, chính trị và tư tưởng", explanation: "Ba hình thức đấu tranh cơ bản của giai cấp vô sản trước khi giành chính quyền.", category: "class" },
  { id: 13, question: "Trong thời kỳ quá độ lên CNXH, hình thức mới của đấu tranh giai cấp là:", options: ["Đấu tranh vũ trang quy mô lớn", "Bãi công đòi tăng lương", "Hành chính, giáo dục, cải tạo và xây dựng", "Lật đổ chính quyền tư sản"], correctAnswer: "Hành chính, giáo dục, cải tạo và xây dựng", explanation: "Đấu tranh giai cấp trong thời kỳ quá độ mang tính hòa bình và xây dựng là chủ yếu.", category: "class" },
  { id: 14, question: "Đấu tranh giai cấp ở Việt Nam hiện nay gắn liền với mục tiêu nào?", options: ["Bảo vệ độc lập dân tộc, dân giàu nước mạnh", "Tiêu diệt hoàn toàn kinh tế tư nhân", "Thực hiện bạo động cách mạng", "Xóa bỏ mọi ranh giới xã hội"], correctAnswer: "Bảo vệ độc lập dân tộc, dân giàu nước mạnh", explanation: "Đấu tranh giai cấp ở Việt Nam hiện nay phục vụ mục tiêu phát triển đất nước.", category: "class" },
  { id: 15, question: "Đấu tranh giai cấp ở Việt Nam hiện nay thực chất là chống lại:", options: ["Các quốc gia có chế độ chính trị khác biệt", "Nghèo nàn, lạc hậu, tham nhũng và các thế lực phá hoại", "Những người có tư tưởng khác biệt", "Sự cạnh tranh của doanh nghiệp nước ngoài"], correctAnswer: "Nghèo nàn, lạc hậu, tham nhũng và các thế lực phá hoại", explanation: "Đấu tranh giai cấp hiện nay nhằm xây dựng xã hội công bằng, dân chủ và văn minh.", category: "class" },
  // Ethnicity Questions (16-30)
  { id: 16, question: "Hình thức cộng đồng người nào được coi là phát triển cao nhất hiện nay?", options: ["Bộ lạc", "Bộ tộc", "Dân tộc", "Thị tộc"], correctAnswer: "Dân tộc", explanation: "Dân tộc là hình thức cộng đồng người cao nhất, phổ biến nhất của xã hội loài người hiện nay.", category: "ethnicity" },
  { id: 17, question: "Khái niệm \"Dân tộc\" theo nghĩa hẹp (ethnie) dùng để chỉ đối tượng nào?", options: ["Quốc gia", "Cộng đồng tộc người", "Giai cấp thống trị", "Các tổ chức chính trị"], correctAnswer: "Cộng đồng tộc người", explanation: "Theo nghĩa hẹp dùng để chỉ cộng đồng tộc người - các dân tộc đa số và thiểu số.", category: "ethnicity" },
  { id: 18, question: "Đâu KHÔNG phải là một trong 5 đặc trưng cơ bản của dân tộc?", options: ["Có chung một phương thức sản xuất nguyên thủy", "Có một lãnh thổ thống nhất", "Có một nền kinh tế thống nhất", "Có một nhà nước và pháp luật thống nhất"], correctAnswer: "Có chung một phương thức sản xuất nguyên thủy", explanation: "Phương thức sản xuất nguyên thủy gắn với thị tộc, bộ lạc, không phải dân tộc.", category: "ethnicity" },
  { id: 19, question: "Yếu tố nào được ví là \"bộ gen\", là \"căn cước\" của mỗi cộng đồng dân tộc?", options: ["Lãnh thổ", "Kinh tế", "Văn hóa", "Pháp luật"], correctAnswer: "Văn hóa", explanation: "Văn hóa là yếu tố đặc biệt quan trọng, được coi là \"bộ gen\" của cộng đồng dân tộc.", category: "ethnicity" },
  { id: 20, question: "Sự hình thành dân tộc ở các nước châu Âu gắn liền với phương thức sản xuất nào?", options: ["Cộng sản nguyên thủy", "Chiếm hữu nô lệ", "Phong kiến", "Tư bản chủ nghĩa"], correctAnswer: "Tư bản chủ nghĩa", explanation: "Ở châu Âu dân tộc hình thành gắn liền với sự hình thành và phát triển của chủ nghĩa tư bản.", category: "ethnicity" },
  { id: 21, question: "Yếu tố nào quyết định khuynh hướng phát triển và tính chất của dân tộc?", options: ["Vị trí địa lý", "Quan hệ giai cấp (giai cấp thống trị)", "Quy mô dân số", "Ngôn ngữ giao tiếp"], correctAnswer: "Quan hệ giai cấp (giai cấp thống trị)", explanation: "Quan hệ giai cấp quyết định khuynh hướng phát triển và tính chất của dân tộc.", category: "ethnicity" },
  { id: 22, question: "Muốn xóa bỏ triệt để ách áp bức dân tộc, điều kiện tiên quyết là gì?", options: ["Phải xóa bỏ ranh giới quốc gia", "Phải thực hiện toàn cầu hóa kinh tế", "Phải xóa bỏ tình trạng áp bức giai cấp", "Phải thống nhất ngôn ngữ toàn cầu"], correctAnswer: "Phải xóa bỏ tình trạng áp bức giai cấp", explanation: "Chủ nghĩa Mác khẳng định phải xóa bỏ nguồn gốc của áp bức dân tộc là chế độ áp bức giai cấp.", category: "ethnicity" },
  { id: 23, question: "Vai trò của giai cấp vô sản đối với vấn đề dân tộc là gì?", options: ["Phải xóa bỏ dân tộc", "Phải tự vươn lên thành giai cấp dân tộc, trở thành dân tộc", "Chỉ quan tâm đến lợi ích quốc tế", "Phải phục tùng giai cấp tư sản"], correctAnswer: "Phải tự vươn lên thành giai cấp dân tộc, trở thành dân tộc", explanation: "Giai cấp vô sản phải tự vươn lên thành giai cấp dân tộc, tự mình trở thành dân tộc.", category: "ethnicity" },
  { id: 24, question: "Mối quan hệ giữa nhân loại với dân tộc và giai cấp được thể hiện như thế nào?", options: ["Lợi ích nhân loại luôn mâu thuẫn đối kháng", "Nhân loại là cộng đồng trừu tượng", "Sự tồn tại của nhân loại là tiền đề, điều kiện tất yếu của sự tồn tại dân tộc và giai cấp", "Nhân loại bị chi phối thụ động bởi vấn đề giai cấp"], correctAnswer: "Sự tồn tại của nhân loại là tiền đề, điều kiện tất yếu của sự tồn tại dân tộc và giai cấp", explanation: "Sự tồn tại của nhân loại là tiền đề, là điều kiện tất yếu thường xuyên của sự tồn tại dân tộc.", category: "ethnicity" },
  { id: 25, question: "Đặc trưng nào giúp phân biệt dân tộc (quốc gia) với bộ tộc?", options: ["Có chung huyết thống", "Có chung ngôn ngữ", "Có một nhà nước và pháp luật thống nhất", "Có chung tín ngưỡng"], correctAnswer: "Có một nhà nước và pháp luật thống nhất", explanation: "Dân tộc là một cộng đồng người có một nhà nước và pháp luật thống nhất.", category: "ethnicity" },
  { id: 26, question: "Đặc thù nổi bật nhất trong quá trình hình thành dân tộc Việt Nam là gì?", options: ["Hình thành gắn liền với sự phát triển của chủ nghĩa tư bản", "Hình thành rất muộn", "Hình thành do sự áp đặt bên ngoài", "Hình thành rất sớm gắn liền với nhu cầu dựng nước và giữ nước"], correctAnswer: "Hình thành rất sớm gắn liền với nhu cầu dựng nước và giữ nước", explanation: "Dân tộc Việt Nam được hình thành rất sớm gắn liền với nhu cầu dựng nước và giữ nước.", category: "ethnicity" },
  { id: 27, question: "Chủ tịch Hồ Chí Minh xác định mối quan hệ giữa giải phóng dân tộc và giai cấp như thế nào?", options: ["Giải phóng giai cấp là tiền đề", "Giải phóng giai cấp phải bắt đầu từ giải phóng dân tộc", "Chỉ cần giải phóng dân tộc", "Giải phóng dân tộc phải sau cách mạng vô sản"], correctAnswer: "Giải phóng giai cấp phải bắt đầu từ giải phóng dân tộc", explanation: "Ở các nước thuộc địa, giải phóng giai cấp phải bắt đầu từ giải phóng dân tộc.", category: "ethnicity" },
  { id: 28, question: "Quan điểm của Đảng và Nhà nước Việt Nam về văn hóa dân tộc trong hội nhập quốc tế là gì?", options: ["Hòa nhập hoàn toàn vào văn hóa thế giới", "Đóng cửa bảo vệ tuyệt đối truyền thống", "Hòa nhập nhưng không hòa tan, giữ gìn bản sắc văn hóa", "Chỉ tiếp thu văn hóa phương Tây"], correctAnswer: "Hòa nhập nhưng không hòa tan, giữ gìn bản sắc văn hóa", explanation: "Phải hội nhập nhưng không được \"hòa tan\" bản sắc văn hóa dân tộc.", category: "ethnicity" },
  { id: 29, question: "Mục tiêu chiến lược của cách mạng Việt Nam là gì?", options: ["Độc lập dân tộc gắn liền với chủ nghĩa xã hội", "Chỉ phát triển kinh tế tư bản", "Xây dựng chế độ phong kiến", "Ưu tiên lợi ích giai cấp lên trên dân tộc"], correctAnswer: "Độc lập dân tộc gắn liền với chủ nghĩa xã hội", explanation: "Mục tiêu của cách mạng Việt Nam là độc lập dân tộc gắn liền với chủ nghĩa xã hội.", category: "ethnicity" },
  { id: 30, question: "Sức mạnh để bảo vệ và phát triển đất nước hiện nay là sự kết hợp của những gì?", options: ["Chỉ nội lực của dân tộc", "Chỉ sự viện trợ quốc tế", "Sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại", "Sức mạnh của riêng giai cấp công nhân"], correctAnswer: "Sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại", explanation: "Cần phát huy sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại.", category: "ethnicity" },
];

// Function to get random questions
const getRandomCombinedQuestions = (count: number): CombinedQuestion[] => {
  const shuffled = [...allCombinedQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Combined Quiz Component
function CombinedQuizComponent() {
  const [quizQuestions, setQuizQuestions] = useState<CombinedQuestion[]>(() => getRandomCombinedQuestions(10));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showFinalResults, setShowFinalResults] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const question = quizQuestions[currentQuestion];
  const currentAnswer = selectedAnswers[currentQuestion];
  const isAnswered = currentAnswer !== undefined;
  const score = Object.entries(selectedAnswers).filter(
    ([questionId, answer]) => quizQuestions[parseInt(questionId)].correctAnswer === answer
  ).length;

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length === quizQuestions.length) {
      setShowFinalResults(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setShowFinalResults(false);
    setQuizQuestions(getRandomCombinedQuestions(10));
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-gradient-to-br from-orange-100 to-amber-100 p-8 border-2 border-red-700 rounded-lg"
    >
      {!showFinalResults ? (
        <>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-red-700">Câu {currentQuestion + 1}</h3>
              <div className="text-sm text-gray-700">{currentQuestion + 1}/{quizQuestions.length}</div>
            </div>
            <div className="w-full bg-gray-400 rounded-full h-2">
              <div
                className="bg-red-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <span className="font-semibold">{question.category === 'class' ? '📚 Giai Cấp' : '🌍 Dân Tộc'}</span>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-6">{question.question}</h4>

            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const isSelected = currentAnswer === option;
                const isOptionCorrect = option === question.correctAnswer;
                const showAsCorrect = isSelected && isOptionCorrect;
                const showAsIncorrect = isSelected && !isOptionCorrect;

                return (
                  <motion.div
                    key={idx}
                    className={`rounded-lg border-2 transition-all ${showAsCorrect
                      ? 'border-green-600 bg-green-100'
                      : showAsIncorrect
                        ? 'border-red-600 bg-red-100'
                        : isSelected
                          ? 'border-yellow-600 bg-yellow-100'
                          : 'border-orange-300 bg-white'
                      }`}
                  >
                    <button
                      onClick={() => !isAnswered && handleSelectAnswer(option)}
                      className="w-full p-4 text-left"
                      disabled={isAnswered}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${showAsCorrect
                            ? 'border-green-600 bg-green-600'
                            : showAsIncorrect
                              ? 'border-red-600 bg-red-600'
                              : isSelected
                                ? 'border-yellow-600 bg-yellow-600'
                                : 'border-orange-400'
                            }`}
                        >
                          {showAsCorrect && <CheckCircle className="w-5 h-5 text-white" />}
                          {showAsIncorrect && <XCircle className="w-5 h-5 text-white" />}
                          {isSelected && !isAnswered && (
                            <div className="w-2 h-2 bg-yellow-700 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-900">{option}</span>
                          {showAsCorrect && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 p-3 bg-green-200 rounded border-l-2 border-green-600"
                            >
                              <p className="text-green-800 text-sm">
                                <span className="font-semibold">✓ Chính xác!</span>
                              </p>
                              <p className="text-green-700 text-sm mt-2 italic">
                                {question.explanation}
                              </p>
                            </motion.div>
                          )}
                          {showAsIncorrect && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 p-3 bg-red-200 rounded border-l-2 border-red-600"
                            >
                              <p className="text-red-800 text-sm font-semibold">✗ Sai rồi!</p>
                              <p className="text-red-700 text-sm mt-2">
                                Đáp án đúng là: <span className="font-semibold">{question.correctAnswer}</span>
                              </p>
                              <p className="text-red-700 text-sm mt-2 italic">
                                {question.explanation}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="px-6 py-2 bg-orange-200 hover:bg-orange-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 rounded-lg transition-colors font-semibold"
            >
              ← Quay lại
            </button>

            {currentQuestion === quizQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                className="px-8 py-2 bg-red-700 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Nộp bài
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="px-6 py-2 bg-red-700 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 font-semibold"
              >
                Tiếp theo →
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block mb-6"
            >
              <div className="text-6xl font-bold text-red-700 mb-2">
                {score}/{quizQuestions.length}
              </div>
              <div className="text-xl text-gray-700">
                {Math.round((score / quizQuestions.length) * 100)}%
              </div>
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {score >= quizQuestions.length * 0.8
                ? '🎉 Xuất sắc!'
                : score >= quizQuestions.length * 0.6
                  ? '👍 Tốt!'
                  : '📚 Cần ôn lại'}
            </h3>
            <p className="text-gray-700">
              Bạn đã trả lời đúng {score} trên {quizQuestions.length} câu hỏi
            </p>
          </div>

          <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
            {quizQuestions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const isUserCorrect = userAnswer === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border-l-4 ${isUserCorrect ? 'bg-green-100 border-green-600' : 'bg-red-100 border-red-600'
                    }`}
                >
                  <div className="flex gap-3 mb-2">
                    {isUserCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Câu {idx + 1} ({q.category === 'class' ? '📚 Giai Cấp' : '🌍 Dân Tộc'}): {q.question}</p>
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="font-semibold">Câu trả lời của bạn:</span> {userAnswer || 'Không trả lời'}
                      </p>
                      {!isUserCorrect && (
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Đáp án đúng:</span> {q.correctAnswer}
                        </p>
                      )}
                      <p className="text-sm text-gray-800 mt-2 italic">
                        <span className="font-semibold">Giải thích:</span> {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleReset}
            className="w-full px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold transition-colors"
          >
            Làm lại bài kiểm tra
          </button>
        </>
      )}
    </motion.div>
  );
}

export function MarxistHomepage({ onViewChange }: { onViewChange?: (view: 'home' | 'theory' | 'class' | 'ethnicity') => void }) {
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
              onClick={() => scrollToSection('key-concepts')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Khái niệm
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('flipbook-container')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sách Lật
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('mindmap')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sơ Đồ
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('cta')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Khám phá
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('combined-quiz')}
              className={`font-medium transition-colors duration-300 hover:text-red-700 ${navColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kiểm tra
            </motion.button>
          </div>

          {/* Theory Button */}
          <motion.button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              onViewChange?.('theory');
            }}
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
                // onClick={() => onViewChange?.('theory')}
                onClick={() => {
                  scrollToSection('key-concepts');
                }}
                className="group relative px-10 py-5 bg-[#8C1916] border rounded-lg overflow-hidden cursor-pointer"
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
                  {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" /> */}
                </span>
              </motion.button>
              {/* <motion.button
                onClick={() => {
                  scrollToSection('key-concepts');
                }}
                className="px-10 py-5 bg-[#FAEFDD] border-2 border-[#FAEFDD] rounded-lg backdrop-blur-sm transition-all duration-300 cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#F3E6C8"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg font-semibold text-[#2A1E1A]">
                  Xem Nội Dung Chính
                </span>
              </motion.button> */}


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


      {/* Key Concepts - Grid */}
      <section id="key-concepts"
        style={{
          backgroundImage: `url(${background3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative py-32 px-6 overflow-hidden">
        

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="mb-20">
            <motion.h2
              className="text-6xl md:text-8xl font-black text-white/90 mb-6"
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

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {[
              {
                number: "01",
                title: "Đấu tranh giai cấp",
                description: "Là cuộc đấu tranh của các tập đoàn người to lớn có lợi ích căn bản đối lập nhau. Thực chất là cuộc đấu tranh của quần chúng bị áp bức chống lại giai cấp thống trị.",
                icon: Users,
                view: 'class'
              },
              {
                number: "02",
                title: "Dân tộc ",
                description: "Dân tộc là hình thức cộng đồng người cao nhất, được hình thành trên cơ sở lãnh thổ, kinh tế, ngôn ngữ và văn hóa, trong đó kinh tế giữ vai trò quyết định.",
                icon: TrendingUp,
                view: 'ethnicity'
              },

            ].map((concept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -20, transition: { duration: 0.3 } }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'instant' });
                  onViewChange?.(concept.view as ViewType);
                }}
                className="group relative bg-gradient-to-br from-orange-100 to-amber-50 p-12 md:p-14 border border-gray-500 hover:border-red-700 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-lg rounded-xl"
              >

                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-700/0 to-red-700/0 group-hover:from-red-700/5 group-hover:to-transparent"
                  transition={{ duration: 0.5 }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <motion.span
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        onViewChange?.(concept.view as ViewType);
                      }}
                      className="text-8xl font-black text-[#D6C7B5] group-hover:text-red-700/20 transition-colors duration-500\"
                      whileHover={{ scale: 1.1 }}
                    >
                      {concept.number}
                    </motion.span>

                    <motion.div
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        onViewChange?.(concept.view as ViewType);
                      }}
                      whileHover={{ rotate: 180, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="p-4 bg-[#7A1F1F]/10   group-hover:bg-[#7A1F1F]/20 rounded-full"
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
                    className="flex items-center gap-2 text-red-700 font-semibold text-lg pt-2 border-b border-red-700/20 w-max cursor-pointer"
                    whileHover={{ x: 10 }}
                  >
                    <span>Khám phá</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
      {/* Flipbook Section */}
      <section id="flipbook" className="py-30 px-6 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto ">
          <AnimatedSection className="mb-16">
            <motion.div
              className="h-1 bg-gradient-to-r from-red-700 via-red-600 to-transparent mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.h2
              className="text-6xl md:text-8xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Sách Lật <span className="text-red-700">Tham Khảo</span>
            </motion.h2>
            <p className="text-xl text-gray-800 leading-relaxed max-w-3xl italic text-left">
              Khám phá triết học Mác - Lênin. Thông qua flipbook để tìm hiểu về các giá trị cốt lõi.
            </p>
          </AnimatedSection>


          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-2xl overflow-hidden border border-orange-200"
          >
            {/* Flipbook Embed */}
            <div id="flipbook-container" className="relative w-full" style={{ paddingBottom: "55%" }}>
              <iframe
                src="https://online.fliphtml5.com/fnevn/qayx/"
                title="Tài Liệu Lý Thuyết Mác - Lênin"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen={true}
                allow="autoplay"
              />
            </div>
          </motion.div>

          {/* Flipbook Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-6 justify-center"
          >
            <motion.a
              href="https://online.fliphtml5.com/fnevn/qayx/#p=1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <BookOpen size={20} />
              Mở Flipbook Fullscreen
            </motion.a>
          </motion.div>
        </div>
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
      <section
        id="mindmap"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="py-32 px-6 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50"
      >
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>

            {/* Title */}
            <motion.h2
              className="text-5xl md:text-7xl font-black text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Sơ Đồ Tổng Quan
              </span>
            </motion.h2>

            {/* Grid images */}
            <div className="grid md:grid-cols-2 gap-16">

              {/* Giai cấp */}
              <motion.div
                whileHover={{ y: -16 }}
                transition={{ duration: 0.4 }}
                onClick={() => navigateToSection('/class-content#sodotuduy', onViewChange)}
                className="group cursor-pointer relative overflow-hidden rounded-2xl border border-red-700/30 shadow-lg"
              >
                <img
                  src={giaicap}
                  alt="Sơ đồ tư duy Giai cấp"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8 z-10">
                  <h3 className="text-4xl font-black text-white mb-2">
                    Giai Cấp
                  </h3>
                  <p className="text-white/80 italic">
                    Cơ cấu xã hội – đấu tranh – vai trò lịch sử
                  </p>
                </div>
              </motion.div>

              {/* Dân tộc */}
              <motion.div
                whileHover={{ y: -16 }}
                transition={{ duration: 0.4 }}
                onClick={() => navigateToSection('/ethnicity-content#sodotuduy', onViewChange)}
                className="group cursor-pointer relative overflow-hidden rounded-2xl border border-gray-700/30 shadow-lg"
              >
                <img
                  src={dantoc}
                  alt="Sơ đồ tư duy Dân tộc"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8 z-10">
                  <h3 className="text-4xl font-black text-white mb-2">
                    Dân Tộc
                  </h3>
                  <p className="text-white/80 italic">
                    Lãnh thổ – kinh tế – văn hóa – ý thức dân tộc
                  </p>
                </div>
              </motion.div>

            </div>
          </AnimatedSection>
        </div>
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
              <span className=" bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent\">
                Thực Tiễn Việt Nam
              </span>
              <br />
              {/* <span className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 bg-clip-text text-transparent\">
                Việt Nam
              </span> */}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl italic text-gray-800 mb-16 max-w-4xl mx-auto text-center leading-relaxed pt-10"
            >
              Vận dụng sáng tạo chủ nghĩa Mác - Lênin, Chủ tịch Hồ Chí Minh khẳng định:
              <br />
              "Độc lập dân tộc gắn liền với Chủ nghĩa xã hội."
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <motion.button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'instant' });
                  onViewChange?.('theory');
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-red-700 text-white text-xl font-bold hover:bg-red-800 transition-colors cursor-pointer\ rounded-lg"
              >
                Đọc Toàn Bộ Lý Thuyết
              </motion.button>
              <motion.button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'instant' });
                  onViewChange?.('theory');
                }}
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
      {/* Combined Quiz Section - 10 Random Questions */}
      <section id="combined-quiz" className="py-32 px-6 bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-16">
            <motion.div
              className="h-1 bg-gradient-to-r from-red-700 via-red-600 to-transparent mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <motion.h2
              className="text-6xl md:text-8xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Kiểm Tra <span className="text-red-700">Kiến Thức</span>
            </motion.h2>
            <p className="text-xl text-gray-800 leading-relaxed max-w-3xl italic text-left">
              Kiểm tra kiến thức của bạn với 10 câu hỏi ngẫu nhiên từ hai chủ đề: Giai Cấp và Dân Tộc. Hoàn thành bài kiểm tra để nhận kết quả và lời giải thích chi tiết.
            </p>
          </AnimatedSection>
          <CombinedQuizComponent />
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
