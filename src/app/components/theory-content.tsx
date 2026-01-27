import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowLeft, ChevronRight, Users, Globe, CheckCircle, XCircle } from 'lucide-react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}
const NAV_ITEMS = [
  { id: "overview", label: "Tổng quan" },
  { id: "quiz", label: "Kiểm tra" },
];

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const quizQuestions: Question[] = [
  // Class Theory Questions (1-15)
  {
    id: 1,
    question: "Theo chủ nghĩa Mác - Lênin, giai cấp được định nghĩa như thế nào?",
    options: ["Nhóm người có cùng giàu có hoặc nghèo", "Nhóm người lớn trong quá trình sản xuất xã hội, có vị trí khác nhau về tư liệu sản xuất", "Những người làm công việc giống nhau", "Cộng đồng sống cùng một vùng địa lý"],
    correctAnswer: "Nhóm người lớn trong quá trình sản xuất xã hội, có vị trí khác nhau về tư liệu sản xuất",
    explanation: "Giai cấp là các nhóm người lớn khác nhau về vị trí đối với tư liệu sản xuất và những điều kiện sản xuất xã hội"
  },
  {
    id: 2,
    question: "Yếu tố nào quyết định sự hình thành và tính chất của giai cấp?",
    options: ["Giáo dục", "Vị trí trong hệ thống sản xuất và mối quan hệ với tư liệu sản xuất", "Tôn giáo", "Ngôn ngữ"],
    correctAnswer: "Vị trí trong hệ thống sản xuất và mối quan hệ với tư liệu sản xuất",
    explanation: "Yếu tố kinh tế - vị trí trong sản xuất - quyết định sự hình thành và tính chất của giai cấp"
  },
  {
    id: 3,
    question: "Giai cấp cơ bản của xã hội chiếm hữu nô lệ là gì?",
    options: ["Nô lệ và chủ nô", "Công nhân và tư sản", "Nông dân và địa chủ", "Không có giai cấp"],
    correctAnswer: "Nô lệ và chủ nô",
    explanation: "Xã hội chiếm hữu nô lệ có hai giai cấp cơ bản: chủ nô và nô lệ"
  },
  {
    id: 4,
    question: "Hai giai cấp cơ bản của xã hội phong kiến là gì?",
    options: ["Nô lệ và chủ nô", "Công nhân và tư sản", "Nông dân và địa chủ", "Tiểu tư sản và công nhân"],
    correctAnswer: "Nông dân và địa chủ",
    explanation: "Xã hội phong kiến có hai giai cấp cơ bản: địa chủ và nông dân"
  },
  {
    id: 5,
    question: "Giai cấp nào được coi là lực lượng tiến bộ nhất trong xã hội tư bản chủ nghĩa?",
    options: ["Tư sản", "Công nhân (giai cấp vô sản)", "Nông dân", "Tiểu tư sản"],
    correctAnswer: "Công nhân (giai cấp vô sản)",
    explanation: "Giai cấp công nhân là lực lượng tiến bộ nhất, người thực hiện cách mạng vô sản"
  },
  {
    id: 6,
    question: "Mâu thuẫn chính của xã hội tư bản chủ nghĩa là gì?",
    options: ["Mâu thuẫn giữa tư sản và tiểu tư sản", "Mâu thuẫn giữa tính chất xã hội hóa của lực lượng sản xuất và chế độ chiếm hữu tư nhân tư bản chủ nghĩa", "Mâu thuẫn giữa lao động và máy móc", "Mâu thuẫn giữa thành phố và nông thôn"],
    correctAnswer: "Mâu thuẫn giữa tính chất xã hội hóa của lực lượng sản xuất và chế độ chiếm hữu tư nhân tư bản chủ nghĩa",
    explanation: "Đây là mâu thuẫn cơ bản thúc đẩy xã hội tư bản chủ nghĩa đến cách mạng xã hội chủ nghĩa"
  },
  {
    id: 7,
    question: "Đấu tranh giai cấp là gì?",
    options: ["Chiến tranh quân sự", "Mâu thuẫn và xung đột lợi ích giữa các giai cấp đối lập", "Tranh giành tài sản cá nhân", "Tranh chấp quyền lực trong gia đình"],
    correctAnswer: "Mâu thuẫn và xung đột lợi ích giữa các giai cấp đối lập",
    explanation: "Đấu tranh giai cấp là xung đột lợi ích giữa các giai cấp đối lập trong xã hội"
  },
  {
    id: 8,
    question: "Cách mạng theo chủ nghĩa Mác là gì?",
    options: ["Cải cách từng bước", "Sự nhận thức của quần chúng", "Sự thay đổi căn bản về quyền lực, từ giai cấp này sang giai cấp khác", "Phát triển kinh tế"],
    correctAnswer: "Sự thay đổi căn bản về quyền lực, từ giai cấp này sang giai cấp khác",
    explanation: "Cách mạng là quá trình thay đổi chế độ chính trị và kinh tế từ giai cấp này sang giai cấp khác"
  },
  {
    id: 9,
    question: "Vai trò lịch sử của giai cấp công nhân là gì?",
    options: ["Duy trì xã hội tư bản chủ nghĩa", "Thực hiện cách mạng xã hội chủ nghĩa", "Hỗ trợ giai cấp tư sản", "Bảo vệ quyền lợi của nông dân"],
    correctAnswer: "Thực hiện cách mạng xã hội chủ nghĩa",
    explanation: "Giai cấp công nhân có sứ mệnh lịch sử thực hiện cách mạng xã hội chủ nghĩa"
  },
  {
    id: 10,
    question: "Tầng lớp trung gian trong xã hội tư bản chủ nghĩa bao gồm những gì?",
    options: ["Các giai cấp không có liên quan đến sản xuất", "Tiểu tư sản, trí thức, những người sản xuất nhỏ", "Những người giàu nhất", "Những người công việc nhẹ nhàng"],
    correctAnswer: "Tiểu tư sản, trí thức, những người sản xuất nhỏ",
    explanation: "Tầng lớp trung gian bao gồm tiểu tư sản, trí thức và những người sản xuất nhỏ"
  },
  {
    id: 11,
    question: "Vai trò của Đảng Cộng sản là gì trong cách mạng vô sản?",
    options: ["Thay thế giai cấp công nhân", "Là đơn vị lãnh đạo của giai cấp công nhân", "Chỉ cung cấp lý thuyết mà không hành động", "Phục vụ tư sản"],
    correctAnswer: "Là đơn vị lãnh đạo của giai cấp công nhân",
    explanation: "Đảng Cộng sản là tiền phong của giai cấp công nhân, lãnh đạo đấu tranh"
  },
  {
    id: 12,
    question: "Mục tiêu cuối cùng của cách mạng vô sản là gì?",
    options: ["Thiết lập chế độ tư bản chủ nghĩa", "Xóa bỏ giai cấp và thiết lập xã hội cộng sản", "Tăng cường quyền lực của Đảng", "Mở rộng chiếm hữu tư nhân"],
    correctAnswer: "Xóa bỏ giai cấp và thiết lập xã hội cộng sản",
    explanation: "Mục tiêu cuối cùng là xóa bỏ hoàn toàn giai cấp và thiết lập xã hội cộng sản"
  },
  {
    id: 13,
    question: "Liên minh giai cấp trong xã hội chủ nghĩa gồm những gì?",
    options: ["Chỉ giai cấp công nhân", "Giai cấp công nhân, giai cấp nông dân, và tầng lớp trí thức", "Chỉ giai cấp tư sản", "Tất cả mọi người"],
    correctAnswer: "Giai cấp công nhân, giai cấp nông dân, và tầng lớp trí thức",
    explanation: "Liên minh giai cấp là kết hợp của công nhân, nông dân, và trí thức"
  },
  {
    id: 14,
    question: "Động lực lịch sử chính thúc đẩy xã hội phát triển là gì?",
    options: ["Tính cách của các nhân vật lịch sử", "Đấu tranh giai cấp", "Sự phát triển của công nghệ", "Tư tưởng triết học"],
    correctAnswer: "Đấu tranh giai cấp",
    explanation: "Chủ nghĩa Mác cho rằng đấu tranh giai cấp là động lực chính của sự phát triển lịch sử"
  },
  {
    id: 15,
    question: "Xã hội nào được coi là không có giai cấp?",
    options: ["Xã hội tư bản chủ nghĩa", "Xã hội cộng sản nguyên thủy", "Xã hội tư bản chủ nghĩa phát triển", "Xã hội phong kiến"],
    correctAnswer: "Xã hội cộng sản nguyên thủy",
    explanation: "Xã hội cộng sản nguyên thủy là một xã hội không có giai cấp"
  },
  // Ethnicity Theory Questions (16-30)
  {
    id: 16,
    question: "Hình thức cộng đồng người nào được coi là phát triển cao nhất hiện nay?",
    options: ["Bộ lạc", "Bộ tộc", "Dân tộc", "Thị tộc"],
    correctAnswer: "Dân tộc",
    explanation: "Dân tộc là hình thức cộng đồng người cao nhất và phổ biến nhất của xã hội loài người hiện nay"
  },
  {
    id: 17,
    question: "Khái niệm \"Dân tộc\" theo nghĩa hẹp (ethnie) dùng để chỉ đối tượng nào?",
    options: ["Quốc gia", "Cộng đồng tộc người", "Giai cấp thống trị", "Các tổ chức chính trị"],
    correctAnswer: "Cộng đồng tộc người",
    explanation: "Theo nghĩa hẹp dùng để chỉ cộng đồng tộc người - các dân tộc đa số và thiểu số"
  },
  {
    id: 18,
    question: "Đâu KHÔNG phải là một trong 5 đặc trưng cơ bản của dân tộc?",
    options: ["Có chung một phương thức sản xuất nguyên thủy", "Có một lãnh thổ thống nhất", "Có một nền kinh tế thống nhất", "Có một nhà nước và pháp luật thống nhất"],
    correctAnswer: "Có chung một phương thức sản xuất nguyên thủy",
    explanation: "Phương thức sản xuất nguyên thủy gắn với thị tộc, bộ lạc, không phải dân tộc"
  },
  {
    id: 19,
    question: "Yếu tố nào được ví là \"bộ gen\", là \"căn cước\" của mỗi cộng đồng dân tộc?",
    options: ["Lãnh thổ", "Kinh tế", "Văn hóa", "Pháp luật"],
    correctAnswer: "Văn hóa",
    explanation: "Văn hóa là yếu tố đặc biệt quan trọng, được coi là \"bộ gen\" của cộng đồng dân tộc"
  },
  {
    id: 20,
    question: "Sự hình thành dân tộc ở các nước châu Âu gắn liền với phương thức sản xuất nào?",
    options: ["Cộng sản nguyên thủy", "Chiếm hữu nô lệ", "Phong kiến", "Tư bản chủ nghĩa"],
    correctAnswer: "Tư bản chủ nghĩa",
    explanation: "Ở châu Âu dân tộc hình thành gắn liền với sự hình thành và phát triển của chủ nghĩa tư bản"
  },
  {
    id: 21,
    question: "Yếu tố nào quyết định khuynh hướng phát triển và tính chất của dân tộc?",
    options: ["Vị trí địa lý", "Quan hệ giai cấp (giai cấp thống trị)", "Quy mô dân số", "Ngôn ngữ giao tiếp"],
    correctAnswer: "Quan hệ giai cấp (giai cấp thống trị)",
    explanation: "Quan hệ giai cấp quyết định khuynh hướng phát triển và tính chất của dân tộc"
  },
  {
    id: 22,
    question: "Muốn xóa bỏ triệt để ách áp bức dân tộc, điều kiện tiên quyết là gì?",
    options: ["Phải xóa bỏ ranh giới quốc gia", "Phải thực hiện toàn cầu hóa kinh tế", "Phải xóa bỏ tình trạng áp bức giai cấp", "Phải thống nhất ngôn ngữ toàn cầu"],
    correctAnswer: "Phải xóa bỏ tình trạng áp bức giai cấp",
    explanation: "Chủ nghĩa Mác khẳng định phải xóa bỏ nguồn gốc của áp bức dân tộc là chế độ áp bức giai cấp"
  },
  {
    id: 23,
    question: "Vai trò của giai cấp vô sản đối với vấn đề dân tộc là gì?",
    options: ["Phải xóa bỏ dân tộc", "Phải tự vươn lên thành giai cấp dân tộc, trở thành dân tộc", "Chỉ quan tâm đến lợi ích quốc tế", "Phải phục tùng giai cấp tư sản"],
    correctAnswer: "Phải tự vươn lên thành giai cấp dân tộc, trở thành dân tộc",
    explanation: "Giai cấp vô sản phải tự vươn lên thành giai cấp dân tộc, tự mình trở thành dân tộc"
  },
  {
    id: 24,
    question: "Mối quan hệ giữa nhân loại với dân tộc và giai cấp được thể hiện như thế nào?",
    options: ["Lợi ích nhân loại luôn mâu thuẫn đối kháng", "Nhân loại là cộng đồng trừu tượng", "Sự tồn tại của nhân loại là tiền đề, điều kiện tất yếu của sự tồn tại dân tộc và giai cấp", "Nhân loại bị chi phối thụ động bởi giai cấp"],
    correctAnswer: "Sự tồn tại của nhân loại là tiền đề, điều kiện tất yếu của sự tồn tại dân tộc và giai cấp",
    explanation: "Sự tồn tại của nhân loại là tiền đề, là điều kiện tất yếu, thường xuyên của sự tồn tại dân tộc"
  },
  {
    id: 25,
    question: "Đặc trưng nào giúp phân biệt dân tộc (quốc gia) với bộ tộc?",
    options: ["Có chung huyết thống", "Có chung ngôn ngữ", "Có một nhà nước và pháp luật thống nhất", "Có chung tín ngưỡng"],
    correctAnswer: "Có một nhà nước và pháp luật thống nhất",
    explanation: "Dân tộc là một cộng đồng người có một nhà nước và pháp luật thống nhất"
  },
  {
    id: 26,
    question: "Đặc thù nổi bật nhất trong quá trình hình thành dân tộc Việt Nam là gì?",
    options: ["Hình thành gắn liền với sự phát triển của chủ nghĩa tư bản", "Hình thành rất muộn", "Hình thành do sự áp đặt bên ngoài", "Hình thành rất sớm gắn liền với nhu cầu dựng nước và giữ nước"],
    correctAnswer: "Hình thành rất sớm gắn liền với nhu cầu dựng nước và giữ nước",
    explanation: "Dân tộc Việt Nam được hình thành rất sớm gắn liền với nhu cầu dựng nước và giữ nước"
  },
  {
    id: 27,
    question: "Chủ tịch Hồ Chí Minh xác định mối quan hệ giữa giải phóng dân tộc và giai cấp như thế nào?",
    options: ["Giải phóng giai cấp là tiền đề", "Giải phóng giai cấp phải bắt đầu từ giải phóng dân tộc", "Chỉ cần giải phóng dân tộc", "Giải phóng dân tộc phải sau cách mạng vô sản"],
    correctAnswer: "Giải phóng giai cấp phải bắt đầu từ giải phóng dân tộc",
    explanation: "Ở các nước thuộc địa, giải phóng giai cấp phải bắt đầu từ giải phóng dân tộc"
  },
  {
    id: 28,
    question: "Quan điểm của Đảng và Nhà nước Việt Nam về văn hóa dân tộc trong hội nhập quốc tế là gì?",
    options: ["Hòa nhập hoàn toàn vào văn hóa thế giới", "Đóng cửa bảo vệ tuyệt đối truyền thống", "Hòa nhập nhưng không hòa tan, giữ gìn bản sắc văn hóa", "Chỉ tiếp thu văn hóa phương Tây"],
    correctAnswer: "Hòa nhập nhưng không hòa tan, giữ gìn bản sắc văn hóa",
    explanation: "Phải hội nhập nhưng không được \"hòa tan\" bản sắc văn hóa dân tộc"
  },
  {
    id: 29,
    question: "Mục tiêu chiến lược của cách mạng Việt Nam là gì?",
    options: ["Độc lập dân tộc gắn liền với chủ nghĩa xã hội", "Chỉ phát triển kinh tế tư bản", "Xây dựng chế độ phong kiến", "Ưu tiên lợi ích giai cấp lên trên dân tộc"],
    correctAnswer: "Độc lập dân tộc gắn liền với chủ nghĩa xã hội",
    explanation: "Mục tiêu của cách mạng Việt Nam là độc lập dân tộc gắn liền với chủ nghĩa xã hội"
  },
  {
    id: 30,
    question: "Sức mạnh để bảo vệ và phát triển đất nước hiện nay là sự kết hợp của những gì?",
    options: ["Chỉ nội lực của dân tộc", "Chỉ sự viện trợ quốc tế", "Sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại", "Sức mạnh của riêng giai cấp công nhân"],
    correctAnswer: "Sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại",
    explanation: "Cần phát huy sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại"
  }
];

function QuizComponent() {
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
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-orange-100 p-8 border-2 border-red-700 rounded-lg"
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
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h4>

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
              const userAnswer = selectedAnswers[q.id - 1];
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
                      <p className="font-semibold text-gray-900">Câu {q.id}: {q.question}</p>
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

function ContentSection({ children, className = '', id }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      id={id}
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-gray-900 scroll-smooth">
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
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
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
                key={item.id}
                onClick={() => {
                  const element = document.getElementById(item.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
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
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => onViewChange?.("home"), 300);
            }}
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
      <main id="main" className="max-w-6xl mx-auto px-6 py-24">
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
                className="absolute inset-0 bg-gradient-to-br from-red-700/0 to-red-700/0 group-hover:from-red-700/3 group-hover:to-transparent"
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 0 }}
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
                className="absolute inset-0 bg-gradient-to-br from-red-700/0 to-red-700/0 group-hover:from-red-700/3 group-hover:to-transparent"
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 0 }}
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
        <ContentSection id="overview" className="mb-24 py-16 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 px-8 rounded-lg border border-red-600/30">
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

        {/* Quiz Section */}
        <ContentSection className="mb-24" id="quiz">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "20rem" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-red-600 to-transparent mb-8"
          />
          <h3 className="text-4xl font-bold mb-4 text-red-700">
            Kiểm Tra Toàn Bộ
          </h3>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl">
            Hoàn thành bài kiểm tra gồm 30 câu hỏi (15 câu về giai cấp + 15 câu về dân tộc) để kiểm tra kiến thức tổng hợp của bạn về hai chủ đề chính.
          </p>
          <QuizComponent />
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

