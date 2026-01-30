import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronRight, Globe, Flag, Users, Zap, BookOpen, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import dantoc from "../../assets/images/Dantoc.jpg";
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const allQuestions: Question[] = [
  {
    id: 1,
    question: "Hình thức cộng đồng người nào được coi là phát triển cao nhất và phổ biến nhất trong lịch sử xã hội loài người hiện nay?",
    options: ["Bộ lạc", "Bộ tộc", "Dân tộc", "Thị tộc"],
    correctAnswer: "Dân tộc",
    explanation: "Trong các hình thức đó, dân tộc là hình thức cộng đồng người cao nhất, và phổ biến nhất của xã hội loài người hiện nay"
  },
  {
    id: 2,
    question: "Theo quan điểm của chủ nghĩa Mác - Lênin, khái niệm \"Dân tộc\" theo nghĩa hẹp (ethnie) dùng để chỉ đối tượng nào?",
    options: ["Quốc gia", "Cộng đồng tộc người", "Giai cấp thống trị", "Các tổ chức chính trị"],
    correctAnswer: "Cộng đồng tộc người",
    explanation: "Theo nghĩa hẹp (ethnie, ethnic group) dùng để chỉ cộng đồng tộc người - các dân tộc đa số và thiểu số trong một quốc gia"
  },
  {
    id: 3,
    question: "Đâu KHÔNG phải là một trong 5 đặc trưng cơ bản của dân tộc (theo nghĩa quốc gia)?",
    options: ["Có chung một phương thức sản xuất nguyên thủy", "Có một lãnh thổ thống nhất", "Có một nền kinh tế thống nhất", "Có một nhà nước và pháp luật thống nhất"],
    correctAnswer: "Có chung một phương thức sản xuất nguyên thủy",
    explanation: "Các đặc trưng của dân tộc gồm: lãnh thổ thống nhất, ngôn ngữ thống nhất, kinh tế thống nhất, văn hóa - tâm lý bền vững, nhà nước và pháp luật thống nhất. Phương thức sản xuất nguyên thủy gắn với thị tộc, bộ lạc"
  },
  {
    id: 4,
    question: "Yếu tố nào được ví là \"bộ gen\", là \"căn cước\" của mỗi cộng đồng dân tộc, tạo nên sự thống nhất trong đa dạng?",
    options: ["Lãnh thổ", "Kinh tế", "Văn hóa", "Pháp luật"],
    correctAnswer: "Văn hóa",
    explanation: "Văn hóa là yếu tố đặc biệt quan trọng của sự liên kết cộng đồng, được coi là \"bộ gen\", là \"căn cước\" của mỗi cộng đồng dân tộc"
  },
  {
    id: 5,
    question: "Sự hình thành dân tộc ở các nước châu Âu gắn liền với sự ra đời và phát triển của phương thức sản xuất nào?",
    options: ["Cộng sản nguyên thủy", "Chiếm hữu nô lệ", "Phong kiến", "Tư bản chủ nghĩa"],
    correctAnswer: "Tư bản chủ nghĩa",
    explanation: "C. Mác và Ph. Ăngghen chỉ rõ, ở châu Âu dân tộc hình thành theo hai phương thức chủ yếu gắn liền với sự hình thành và phát triển của chủ nghĩa tư bản"
  },
  {
    id: 6,
    question: "Yếu tố nào đóng vai trò quyết định khuynh hướng phát triển và tính chất của dân tộc trong một thời đại lịch sử nhất định?",
    options: ["Vị trí địa lý", "Quan hệ giai cấp (giai cấp thống trị)", "Quy mô dân số", "Ngôn ngữ giao tiếp"],
    correctAnswer: "Quan hệ giai cấp (giai cấp thống trị)",
    explanation: "Quan hệ giai cấp quyết định khuynh hướng phát triển và tính chất của dân tộc. Trong một thời đại lịch sử, mỗi dân tộc đều do một giai cấp đại diện"
  },
  {
    id: 7,
    question: "Theo quan điểm của chủ nghĩa Mác, muốn xóa bỏ triệt để ách áp bức dân tộc thì điều kiện tiên quyết là gì?",
    options: ["Phải xóa bỏ ranh giới quốc gia", "Phải thực hiện toàn cầu hóa kinh tế", "Phải xóa bỏ tình trạng áp bức giai cấp (người bóc lột người)", "Phải thống nhất ngôn ngữ toàn cầu"],
    correctAnswer: "Phải xóa bỏ tình trạng áp bức giai cấp (người bóc lột người)",
    explanation: "Chính vì vậy, chủ nghĩa Mác khẳng định, muốn xóa bỏ triệt để ách áp bức dân tộc thì phải xóa bỏ nguồn gốc của nó là chế độ người bóc lột người"
  },
  {
    id: 8,
    question: "Trong Tuyên ngôn của Đảng Cộng sản, C. Mác và Ph. Ăngghen đã chỉ ra vai trò của giai cấp vô sản đối với vấn đề dân tộc như thế nào?",
    options: ["Giai cấp vô sản phải xóa bỏ dân tộc để tiến tới đại đồng", "Giai cấp vô sản phải tự vươn lên thành giai cấp dân tộc, tự mình trở thành dân tộc", "Giai cấp vô sản chỉ cần quan tâm đến lợi ích quốc tế, không cần quan tâm lợi ích dân tộc", "Giai cấp vô sản phải phục tùng tuyệt đối giai cấp tư sản dân tộc"],
    correctAnswer: "Giai cấp vô sản phải tự vươn lên thành giai cấp dân tộc, tự mình trở thành dân tộc",
    explanation: "giai cấp vô sản mỗi nước trước hết phải giành lấy chính quyền, phải tự vươn lên thành giai cấp dân tộc, phải tự mình trở thành dân tộc..."
  },
  {
    id: 9,
    question: "Mối quan hệ giữa nhân loại với dân tộc và giai cấp được thể hiện như thế nào?",
    options: ["Lợi ích nhân loại luôn mâu thuẫn đối kháng với lợi ích giai cấp và dân tộc", "Nhân loại là cộng đồng trừu tượng, không liên quan đến giai cấp và dân tộc", "Sự tồn tại của nhân loại là tiền đề, điều kiện tất yếu thường xuyên của sự tồn tại dân tộc và giai cấp", "Vấn đề nhân loại hoàn toàn bị chi phối thụ động bởi vấn đề giai cấp"],
    correctAnswer: "Sự tồn tại của nhân loại là tiền đề, điều kiện tất yếu thường xuyên của sự tồn tại dân tộc và giai cấp",
    explanation: "Trước hết, sự tồn tại của nhân loại là tiền đề, là điều kiện tất yếu, thường xuyên của sự tồn tại dân tộc và giai cấp"
  },
  {
    id: 10,
    question: "Đặc trưng nào giúp phân biệt dân tộc (quốc gia) với các hình thức cộng đồng người trước đó như bộ tộc?",
    options: ["Có chung huyết thống", "Có chung ngôn ngữ", "Có một nhà nước và pháp luật thống nhất", "Có chung tín ngưỡng sơ khai"],
    correctAnswer: "Có một nhà nước và pháp luật thống nhất",
    explanation: "Dân tộc là một cộng đồng người có một nhà nước và pháp luật thống nhất. Đây là một đặc trưng của dân tộc - quốc gia để phân biệt với dân tộc theo nghĩa là các dân tộc - tộc người"
  },
  {
    id: 11,
    question: "Đặc thù nổi bật nhất trong quá trình hình thành dân tộc Việt Nam so với các dân tộc ở châu Âu là gì?",
    options: ["Hình thành gắn liền với sự phát triển của chủ nghĩa tư bản", "Hình thành rất muộn sau khi chế độ phong kiến suy tàn", "Hình thành do sự áp đặt của các thế lực bên ngoài", "Hình thành rất sớm gắn liền với nhu cầu dựng nước và giữ nước"],
    correctAnswer: "Hình thành rất sớm gắn liền với nhu cầu dựng nước và giữ nước",
    explanation: "Dân tộc Việt Nam được hình thành rất sớm trong lịch sử gắn liền với nhu cầu dựng nước và giữ nước, với quá trình đấu tranh chống ngoại xâm và cải tạo thiên nhiên..."
  },
  {
    id: 12,
    question: "Vận dụng chủ nghĩa Mác - Lênin vào hoàn cảnh các nước thuộc địa, Chủ tịch Hồ Chí Minh đã xác định mối quan hệ giữa giải phóng dân tộc và giải phóng giai cấp như thế nào?",
    options: ["Giải phóng giai cấp là tiền đề để giải phóng dân tộc", "Sự nghiệp giải phóng giai cấp phải bắt đầu từ sự nghiệp giải phóng dân tộc", "Chỉ cần giải phóng dân tộc, không cần giải phóng giai cấp", "Giải phóng dân tộc phải thực hiện sau khi hoàn thành cách mạng vô sản ở chính quốc"],
    correctAnswer: "Sự nghiệp giải phóng giai cấp phải bắt đầu từ sự nghiệp giải phóng dân tộc",
    explanation: "Chủ tịch Hồ Chí Minh đã chỉ rõ một chân lý là ở các nước thuộc địa và phụ thuộc, sự nghiệp giải phóng giai cấp phải được bắt đầu từ sự nghiệp giải phóng dân tộc"
  },
  {
    id: 13,
    question: "Trong bối cảnh hội nhập quốc tế hiện nay, quan điểm của Đảng và Nhà nước Việt Nam về văn hóa dân tộc là gì để đảm bảo sự phát triển bền vững?",
    options: ["Hòa nhập hoàn toàn vào văn hóa thế giới để hiện đại hóa", "Đóng cửa để bảo vệ tuyệt đối các giá trị truyền thống", "Hòa nhập nhưng không hòa tan, giữ gìn bản sắc văn hóa dân tộc", "Chỉ tiếp thu văn hóa phương Tây, loại bỏ văn hóa phương Đông"],
    correctAnswer: "Hòa nhập nhưng không hòa tan, giữ gìn bản sắc văn hóa dân tộc",
    explanation: "Trong bối cảnh hội nhập quốc tế hiện nay, các quốc gia, dân tộc hiện đại đều ý thức được rằng, muốn bảo vệ và phát triển văn hóa dân tộc thì phải hội nhập nhưng không được \"hòa tan\""
  },
  {
    id: 14,
    question: "Mục tiêu chiến lược của cách mạng Việt Nam trong việc giải quyết mối quan hệ giữa dân tộc, giai cấp và nhân loại là gì?",
    options: ["Độc lập dân tộc gắn liền với chủ nghĩa xã hội", "Chỉ tập trung phát triển kinh tế tư bản chủ nghĩa", "Xây dựng chế độ phong kiến độc lập", "Ưu tiên lợi ích giai cấp lên trên lợi ích dân tộc"],
    correctAnswer: "Độc lập dân tộc gắn liền với chủ nghĩa xã hội",
    explanation: "Để thực hiện được mục tiêu của cách mạng Việt Nam là độc lập dân tộc gắn liền với chủ nghĩa xã hội, cần phát huy sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh của thời đại"
  },
  {
    id: 15,
    question: "Theo quan điểm của Đảng Cộng sản Việt Nam, sức mạnh để bảo vệ và phát triển đất nước hiện nay là sự kết hợp của những yếu tố nào?",
    options: ["Chỉ dựa vào sức mạnh nội lực của dân tộc", "Chỉ dựa vào sự viện trợ và ủng hộ của quốc tế", "Sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại", "Sức mạnh của riêng giai cấp công nhân"],
    correctAnswer: "Sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại",
    explanation: "Để thực hiện được mục tiêu của cách mạng Việt Nam... cần phát huy sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh của thời đại"
  }
];

// Function to get 5 random questions from all questions
const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

function QuizComponent() {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showFinalResults, setShowFinalResults] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Initialize with 5 random questions on mount
  useEffect(() => {
    setQuizQuestions(getRandomQuestions(5));
  }, []);

  const question = quizQuestions.length > 0 ? quizQuestions[currentQuestion] : null;
  const currentAnswer = selectedAnswers[currentQuestion];
  const isAnswered = currentAnswer !== undefined;
  const isCorrect = question && currentAnswer === question.correctAnswer;
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
    setQuizQuestions(getRandomQuestions(5));
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-gradient-to-br from-orange-100 to-amber-100 p-8 border-2 border-red-700 rounded-lg"
    >
      {quizQuestions.length === 0 ? (
        <div className="text-center text-gray-700">Đang tải câu hỏi...</div>
      ) : !showFinalResults && question ? (
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
                      <p className="font-semibold text-gray-900">Câu {idx + 1}: {q.question}</p>
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
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      id={id}
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
  const [activeSection, setActiveSection] = useState('introduction');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id);

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 120;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start: number | null = null;

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

  useEffect(() => {
    const sectionIds = [
      'introduction',
      'hinh-thuc-cong-dong',
      'dan-toc-khoa-niem',
      'qua-trinh-hinh-thanh',
      'moi-quan-he',
      'y-nghia-thuc-tien',
      'ket-luan',
      'quiz',
      'sodotuduy',
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
    { id: 'hinh-thuc-cong-dong', title: 'Hình Thức Cộng Đồng', icon: '👥' },
    { id: 'dan-toc-khoa-niem', title: 'Dân Tộc - Khái Niệm', icon: '🌍' },
    { id: 'qua-trinh-hinh-thanh', title: 'Quá Trình Hình Thành', icon: '📜' },
    { id: 'moi-quan-he', title: 'Giai Cấp & Dân Tộc', icon: '⚡' },
    { id: 'y-nghia-thuc-tien', title: 'Ý Nghĩa Thực Tiễn', icon: '🎯' },
    { id: 'sodotuduy', title: 'Sơ Đồ Tổng Quan', icon: '🧠' },

    { id: 'ket-luan', title: 'Kết Luận', icon: '✓' },
    { id: 'quiz', title: 'Kiểm Tra', icon: '📝' },
  ];

  const goToClassMindmap = () => {
    // switch to Class view (no auto-scroll)
    onViewChange?.('class');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1);
  };

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
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              onViewChange?.("home");
            }}
            className="px-5 py-2
bg-amber-50 text-red-800
border border-red-700/30
rounded-lg font-semibold
flex items-center gap-2
hover:bg-red-700 hover:text-amber-50
hover:shadow-lg
transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hidden sm:inline">Trang chủ</span>
          </motion.button>


          {/* Switch to Class */}
          <motion.button
            onClick={() => goToClassMindmap()}
            className="px-6 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-medium flex items-center gap-2 transition-shadow cursor-pointer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="hidden sm:inline">Giai Cấp</span>
          </motion.button>
        </div>
      </header>

      <div className="flex relative">
        {/* Left Sidebar - Table of Contents */}
        <aside className="fixed left-0 top-24 h-160 w-65 overflow-y-auto hidden lg:block pt-8 pl-4 pr-4 bg-gradient-to-b from-amber-50/50 to-transparent border-r border-b border-orange-200 z-30">
          <div className="space-y-2">
            <h3 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-6 px-2">
              Mục Lục
            </h3>
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                type="button"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
                  </motion.div>
                )}
              </motion.button>
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
            <ContentSection id="hinh-thuc-cong-dong" className="mb-24">
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500">
                <motion.h3 className="text-3xl font-black mb-6 text-gray-900">
                  Các Hình Thức Cộng Đồng Người Trước Khi Hình Thành Dân Tộc
                </motion.h3>

                <p className="text-black italic mb-8 leading-relaxed">
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
            <ContentSection id="dan-toc-khoa-niem" className="mb-24">
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500">
                <motion.h3 className="text-3xl font-black mb-6 text-gray-900">
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
            <ContentSection id="qua-trinh-hinh-thanh" className="mb-24">
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500">
                <motion.h3 className="text-3xl font-black mb-6 text-gray-900">
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
            <ContentSection id="moi-quan-he" className="mb-24">
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500">
                <motion.h3 className="text-3xl font-black mb-6 text-gray-900">
                  Mối Quan Hệ Giữa Giai Cấp - Dân Tộc - Nhân Loại
                </motion.h3>
                <h4 className="text-2xl font-bold text-red-700 mb-4">Quan hệ giai cấp - dân tộc</h4>
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
                  <h4 className="text-2xl font-bold text-red-700 mb-4">Quan hệ giai cấp, dân tộc với nhân loại</h4>
                  <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                    <p className="font-bold text-gray-900 mb-2 text-lg">Nhân loại</p>
                    <p className="text-gray-800 leading-relaxed">
                      Toàn thể cộng đồng người sinh sống trên Trái Đất. Trong xã hội có giai cấp, lợi ích của nhân loại không tồn tại một cách trừu tượng, tách rời mà luôn bị chi phối bởi lợi ích giai cấp và lợi ích dân tộc.
                    </p>
                  </div>

                  <h4 className="text-2xl font-bold text-red-700 mb-4">Mối quan hệ biện chứng</h4>
                  <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                      <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-6 h-6 text-red-700" />
                        <p className="font-bold text-gray-900">Nhân loại là tiền đề tồn tại của dân tộc và giai cấp</p>
                      </div>
                      <p className="text-gray-800">
                        Sự tồn tại và phát triển của nhân loại là tiền đề cho sự tồn tại của dân tộc và giai cấp.
                      </p>
                    </div>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-6 h-6 text-red-700" />
                        <p className="font-bold text-gray-900">Sự phát triển của dân tộc và đấu tranh giai cấp thúc đẩy văn minh nhân loại</p>
                      </div>
                      <p className="text-gray-800">
                        Sự phát triển của mỗi dân tộc và cuộc đấu tranh của các giai cấp tiến bộ sẽ đóng góp vào sự phát triển chung của văn minh nhân loại.
                      </p>
                    </div>
                    <div className="bg-orange-100 p-6 border-l-4 border-red-700 text-center md:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-6 h-6 text-red-700" />
                        <p className="font-bold text-gray-900">Thống nhất giữa lợi ích giai cấp, dân tộc và nhân loại</p>
                      </div>
                      <p className="text-gray-800">
                        Lợi ích giai cấp chân chính và lợi ích dân tộc chân chính luôn thống nhất với lợi ích của toàn nhân loại.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ContentSection>

            {/* Contemporary Relevance */}
            <ContentSection id="y-nghia-thuc-tien" className="mb-24">
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500">
                <motion.h3 className="text-3xl font-black mb-6 text-gray-900">
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
                  <div className="bg-white/70 backdrop-blur p-6 border-l-4 border-red-700 italic text-gray-800 rounded-lg shadow-sm">
                    <p className="text-xl font-bold text-red-600 text-center">
                      Đại đoàn kết dân tộc là đường lối chiến lược của cách mạng Việt Nam
                    </p>
                  </div>

                </div>
              </div>
            </ContentSection>
            <ContentSection
              id="sodotuduy"
              className="mb-24 py-16 bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500"
            >
              <motion.h3 className="text-4xl font-bold mb-8 text-red-700 text-center">
                Sơ đồ tổng quan về Dân tộc
              </motion.h3>
              <div className="flex justify-center">
                <img
                  src={dantoc}
                  alt="Dân tộc"
                  className="max-w-3xl w-full rounded-xl shadow-2xl border border-red-600/40"
                />
              </div>
            </ContentSection>
            {/* Conclusion */}
            <ContentSection id="ket-luan" className="mb-24 py-16 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 px-8 rounded-lg border border-red-600/30">
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

            {/* Quiz */}
            <ContentSection id="quiz" className="mb-24">
              <motion.h3 className="text-4xl font-bold mb-8 text-red-700 text-center">
                Kiểm Tra Kết Thúc
              </motion.h3>
              <p className="text-center text-black-200 mb-8 max-w-2xl mx-auto">
                Hoàn thành bài kiểm tra gồm 5 câu hỏi để kiểm tra kiến thức của bạn về dân tộc và chủ nghĩa Mác - Lênin
              </p>
              <QuizComponent />
            </ContentSection>

          </div>
        </main>
      </div >
      {/* Footer */}
      < footer className="border-t border-zinc-800 bg-black py-12 px-6" >
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>© 2026 Kho Lưu Trữ Lý Thuyết Mác - Lênin Việt Nam</p>
        </div>
      </footer >
    </div >
  );
}
