import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronRight, BookOpen, Users, TrendingUp, Zap, CheckCircle, XCircle } from 'lucide-react';
import dauTranhGiaiCap from '../../assets/images/dautranhgiaicap.jpg';
import vidu from '../../assets/images/kinhte.jpg';
import giaicap from '../../assets/images/giaicap.jpg';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

const allQuestions: Question[] = [
    {
        id: 1,
        question: "Theo V.I. Lênin, giai cấp là những tập đoàn người to lớn khác nhau về địa vị của họ trong một hệ thống nào?",
        options: [
            "Hệ thống chính trị - pháp luật nhất định",
            "Hệ thống sản xuất xã hội nhất định trong lịch sử",
            "Hệ thống phân phối và hưởng thụ của cải",
            "Hệ thống phân cấp tầng lớp xã hội"
        ],
        correctAnswer: "Hệ thống sản xuất xã hội nhất định trong lịch sử",
        explanation: "Lênin xác định giai cấp dựa trên địa vị của các tập đoàn người trong hệ thống sản xuất xã hội lịch sử."
    },
    {
        id: 2,
        question: "Đặc trưng nào giúp một tập đoàn người có thể chiếm đoạt lao động của tập đoàn người khác?",
        options: [
            "Do họ có sức mạnh quân sự lớn hơn",
            "Do họ có trình độ học vấn cao hơn",
            "Do họ có địa vị khác nhau trong một chế độ kinh tế - xã hội nhất định",
            "Do họ được pháp luật quy định là giai cấp thống trị"
        ],
        correctAnswer: "Do họ có địa vị khác nhau trong một chế độ kinh tế - xã hội nhất định",
        explanation: "Sự khác nhau về địa vị trong hệ thống kinh tế - xã hội cho phép giai cấp này chiếm đoạt lao động của giai cấp khác."
    },
    {
        id: 3,
        question: "Nguồn gốc sâu xa của sự hình thành giai cấp là do:",
        options: [
            "Sự phát triển của lực lượng sản xuất làm xuất hiện của dư",
            "Sự xuất hiện của chế độ tư hữu về tư liệu sản xuất",
            "Sự phân công lao động xã hội bị đình trệ",
            "Sự tranh giành quyền lực giữa các bộ tộc"
        ],
        correctAnswer: "Sự phát triển của lực lượng sản xuất làm xuất hiện của dư",
        explanation: "Khi lực lượng sản xuất phát triển tạo ra của dư, xã hội xuất hiện khả năng chiếm đoạt, dẫn đến phân hóa giai cấp."
    },
    {
        id: 4,
        question: "Chế độ nào được coi là cơ sở trực tiếp của sự hình thành giai cấp?",
        options: [
            "Chế độ công hữu về tư liệu sản xuất",
            "Chế độ phân phối bình quân",
            "Chế độ tư hữu về tư liệu sản xuất",
            "Chế độ quân chủ chuyên chế"
        ],
        correctAnswer: "Chế độ tư hữu về tư liệu sản xuất",
        explanation: "Tư hữu về tư liệu sản xuất là cơ sở trực tiếp dẫn đến sự phân hóa giai cấp."
    },
    {
        id: 5,
        question: "Giai cấp chỉ thực sự mất đi khi nào?",
        options: [
            "Khi năng suất lao động đạt mức tối đa",
            "Khi nhà nước không còn tồn tại",
            "Khi chế độ tư hữu bị xóa bỏ hoàn toàn",
            "Khi mọi người có mức thu nhập bằng nhau"
        ],
        correctAnswer: "Khi chế độ tư hữu bị xóa bỏ hoàn toàn",
        explanation: "Theo chủ nghĩa Mác - Lênin, xóa bỏ tư hữu về tư liệu sản xuất là điều kiện để xóa bỏ giai cấp."
    },
    {
        id: 6,
        question: "Giai cấp cơ bản trong một kết cấu xã hội - giai cấp là giai cấp:",
        options: [
            "Gắn với phương thức sản xuất thống trị",
            "Có số lượng người đông đảo nhất",
            "Có trình độ văn hóa cao nhất",
            "Nắm giữ bộ máy pháp luật"
        ],
        correctAnswer: "Gắn với phương thức sản xuất thống trị",
        explanation: "Giai cấp cơ bản gắn trực tiếp với phương thức sản xuất giữ vai trò quyết định trong xã hội."
    },
    {
        id: 7,
        question: "Cặp giai cấp cơ bản trong xã hội phong kiến là:",
        options: [
            "Chủ nô và nô lệ",
            "Địa chủ và nông dân",
            "Tư sản và vô sản",
            "Quý tộc và bình dân"
        ],
        correctAnswer: "Địa chủ và nông dân",
        explanation: "Trong xã hội phong kiến, địa chủ chiếm hữu ruộng đất và bóc lột nông dân."
    },
    {
        id: 8,
        question: "Thực chất của đấu tranh giai cấp là cuộc đấu tranh của:",
        options: [
            "Các dân tộc bị áp bức chống lại dân tộc đi xâm lược",
            "Quần chúng bị áp bức, bóc lột chống lại giai cấp thống trị",
            "Các đảng phái chính trị đối lập",
            "Những người nghèo chống lại những người giàu"
        ],
        correctAnswer: "Quần chúng bị áp bức, bóc lột chống lại giai cấp thống trị",
        explanation: "Đấu tranh giai cấp phản ánh mâu thuẫn lợi ích cơ bản giữa các giai cấp đối kháng."
    },
    {
        id: 9,
        question: "Vì sao đấu tranh giai cấp là hiện tượng tất yếu?",
        options: [
            "Do sự đối kháng về lợi ích cơ bản không thể điều hòa",
            "Do sự khác biệt về quan điểm chính trị",
            "Do bản tính con người thích tranh đấu",
            "Do sự phân chia giàu nghèo"
        ],
        correctAnswer: "Do sự đối kháng về lợi ích cơ bản không thể điều hòa",
        explanation: "Mâu thuẫn lợi ích cơ bản giữa các giai cấp đối kháng khiến đấu tranh giai cấp là tất yếu."
    },
    {
        id: 10,
        question: "Vai trò của đấu tranh giai cấp đối với lịch sử xã hội là:",
        options: [
            "Là động lực gián tiếp thúc đẩy kinh tế",
            "Là động lực trực tiếp, quan trọng của lịch sử",
            "Làm suy yếu sức mạnh quốc gia",
            "Là yếu tố duy nhất làm thay đổi xã hội"
        ],
        correctAnswer: "Là động lực trực tiếp, quan trọng của lịch sử",
        explanation: "Đấu tranh giai cấp là động lực thúc đẩy sự thay thế các hình thái kinh tế - xã hội."
    },
    {
        id: 11,
        question: "Đỉnh cao của đấu tranh giai cấp sẽ dẫn đến:",
        options: [
            "Một cuộc thương lượng hòa bình",
            "Sự diệt vong của cả hai giai cấp",
            "Cách mạng xã hội, thay thế quan hệ sản xuất cũ",
            "Thay đổi nhân sự chính quyền"
        ],
        correctAnswer: "Cách mạng xã hội, thay thế quan hệ sản xuất cũ",
        explanation: "Cách mạng xã hội là kết quả tất yếu khi mâu thuẫn giai cấp phát triển đến đỉnh cao."
    },
    {
        id: 12,
        question: "Trước khi có chính quyền, giai cấp vô sản đấu tranh qua 3 hình thức cơ bản là:",
        options: [
            "Kinh tế, chính trị và tư tưởng",
            "Quân sự, ngoại giao và kinh tế",
            "Văn hóa, xã hội và pháp luật",
            "Bãi công, biểu tình và khởi nghĩa"
        ],
        correctAnswer: "Kinh tế, chính trị và tư tưởng",
        explanation: "Ba hình thức đấu tranh cơ bản của giai cấp vô sản trước khi giành chính quyền."
    },
    {
        id: 13,
        question: "Trong thời kỳ quá độ lên CNXH, hình thức mới của đấu tranh giai cấp là:",
        options: [
            "Đấu tranh vũ trang quy mô lớn",
            "Bãi công đòi tăng lương",
            "Hành chính, giáo dục, cải tạo và xây dựng",
            "Lật đổ chính quyền tư sản"
        ],
        correctAnswer: "Hành chính, giáo dục, cải tạo và xây dựng",
        explanation: "Đấu tranh giai cấp trong thời kỳ quá độ mang tính hòa bình và xây dựng là chủ yếu."
    },
    {
        id: 14,
        question: "Đấu tranh giai cấp ở Việt Nam hiện nay gắn liền với mục tiêu nào?",
        options: [
            "Bảo vệ độc lập dân tộc, dân giàu nước mạnh",
            "Tiêu diệt hoàn toàn kinh tế tư nhân",
            "Thực hiện bạo động cách mạng",
            "Xóa bỏ mọi ranh giới xã hội"
        ],
        correctAnswer: "Bảo vệ độc lập dân tộc, dân giàu nước mạnh",
        explanation: "Đấu tranh giai cấp ở Việt Nam hiện nay phục vụ mục tiêu phát triển đất nước."
    },
    {
        id: 15,
        question: "Đấu tranh giai cấp ở Việt Nam hiện nay thực chất là chống lại:",
        options: [
            "Các quốc gia có chế độ chính trị khác biệt",
            "Nghèo nàn, lạc hậu, tham nhũng và các thế lực phá hoại",
            "Những người có tư tưởng khác biệt",
            "Sự cạnh tranh của doanh nghiệp nước ngoài"
        ],
        correctAnswer: "Nghèo nàn, lạc hậu, tham nhũng và các thế lực phá hoại",
        explanation: "Đấu tranh giai cấp hiện nay nhằm xây dựng xã hội công bằng, dân chủ và văn minh."
    }
];

// Function to get 5 random questions from all questions
const getRandomQuestions = (count: number): Question[] => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

function QuizComponent() {
    const [quizQuestions, setQuizQuestions] = useState<Question[]>(() => getRandomQuestions(5));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [showFinalResults, setShowFinalResults] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    const question = quizQuestions[currentQuestion];
    const currentAnswer = selectedAnswers[currentQuestion];
    const isAnswered = currentAnswer !== undefined;
    const isCorrect = currentAnswer === question.correctAnswer;
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

    const goToEthnicityMindmap = () => {
        // switch to Ethnicity view and ensure page is at the top (no further scrolling)
        onViewChange?.('ethnicity');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 1);
    };

    /* Detect active section on scroll */
    useEffect(() => {
        const sectionIds = [
            'introduction',
            'dinh-nghia',
            'giai-cap-origin',
            'dau-tranh',
            'cau-truc',
            'sodotuduy',
            'ket-luan',
            'quiz',
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
        { id: 'dinh-nghia', title: 'Định Nghĩa Giai Cấp', icon: '📝' },
        { id: 'giai-cap-origin', title: 'Nguồn Gốc & Hình Thành', icon: '🌱' },
        { id: 'dau-tranh', title: 'Đấu Tranh Giai Cấp', icon: '⚡' },
        { id: 'cau-truc', title: 'Cấu Trúc Giai Cấp', icon: '🏗️' },
        { id: 'sodotuduy', title: 'Sơ Đồ Tổng Quan', icon: '🧠' },
        { id: 'ket-luan', title: 'Kết Luận', icon: '✓' },
        { id: 'quiz', title: 'Kiểm Tra', icon: '📝' },
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

                    {/* Switch to Ethnicity */}
                    <motion.button
                        onClick={() => goToEthnicityMindmap()}
                        className="px-6 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-medium flex items-center gap-2 transition-shadow cursor-pointer"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="hidden sm:inline">Dân Tộc</span>
                    </motion.button>
                </div>
            </header>

            <div className="flex relative">
                {/* Left Sidebar - Table of Contents */}
                <aside className="fixed left-0 top-24 h-140 w-56 overflow-y-auto hidden lg:block pt-8 pl-4 pr-4 bg-gradient-to-b from-amber-50/50 to-transparent border-r border-b border-orange-200 z-30">
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
                            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight md:leading-[1.25]">
                                Giai Cấp &
                                <br />
                                <span className="text-red-600">Đấu Tranh Giai Cấp</span>
                            </h2>

                            <p className="text-xl text-gray-800 leading-relaxed">
                                Phân tích khoa học về cấu trúc xã hội, định nghĩa, nguồn gốc, và quy luật phát triển của giai cấp trong chủ nghĩa Mác - Lênin.
                            </p>
                        </ContentSection>

                        {/* Subsection A - Definition */}
                        <ContentSection id="dinh-nghia" className="mb-24">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500">
                                <motion.h3 className="text-3xl font-black mb-8 text-gray-900">
                                    Định Nghĩa <span className="text-red-700">Giai Cấp</span>
                                </motion.h3>

                                <div className="space-y-12">
                                    {/* Định nghĩa */}
                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-4">
                                            Định Nghĩa Kinh Điển của V.I. Lênin
                                        </h4>

                                        <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-3xl">
                                            Trong tác phẩm <span className="italic">“Sáng Kiến Vĩ Đại”</span>,
                                            V.I. Lênin đưa ra định nghĩa khoa học và đầy đủ nhất về giai cấp:
                                        </p>

                                        <div className="bg-white/70 backdrop-blur p-6 border-l-4 border-red-700 italic text-gray-800 rounded-lg shadow-sm">
                                            <p className="leading-relaxed">
                                                "Người ta gọi là giai cấp, những tập đoàn người to lớn gồm những người khác nhau về
                                                địa vị của họ trong một hệ thống sản xuất xã hội nhất định trong lịch sử, khác nhau về
                                                quan hệ của họ đối với những tư liệu sản xuất, về vai trò của họ trong tổ chức lao động xã hội,
                                                và như vậy là khác nhau về cách thức hưởng thụ và về phần của cải xã hội ít hay nhiều mà họ được
                                                hưởng. Giai cấp là những tập đoàn người, mà tập đoàn này có thể chiếm đoạt lao động của
                                                tập đoàn khác, do chỗ các tập đoàn đó có địa vị khác nhau trong một chế độ kinh tế – xã hội nhất định."
                                            </p>
                                        </div>
                                    </div>

                                    {/* Yếu tố */}
                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-6">
                                            Yếu Tố Cơ Bản Xác Định Giai Cấp
                                        </h4>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                { icon: Zap, title: "Địa Vị Sản Xuất", desc: "Quan hệ với các tư liệu sản xuất (chủ nhân hay lao động thuê)" },
                                                { icon: Users, title: "Vai Trò Xã Hội", desc: "Vị trí trong tổ chức lao động xã hội" },
                                                { icon: TrendingUp, title: "Lợi Ích Kinh Tế", desc: "Cách thức hưởng thụ và phần của cải xã hội" },
                                                { icon: BookOpen, title: "Tính Chất Pháp Luật", desc: "Được pháp luật quy định và thừa nhận" },
                                            ].map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-white p-6 rounded-lg border border-orange-200 hover:border-red-700 transition-colors shadow-sm"
                                                >
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <item.icon className="w-6 h-6 text-red-700" />
                                                        <p className="font-bold text-gray-900">{item.title}</p>
                                                    </div>
                                                    <p className="text-gray-700">{item.desc}</p>
                                                </div>
                                            ))}
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
                            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500">
                                <motion.h3 className="text-3xl font-black mb-6 text-gray-900">
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
                            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500">
                                <motion.h3 className="text-3xl font-black mb-6 text-gray-900">
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
                        {/* Subsection D - Class Structure */}
                        <ContentSection id='cau-truc' className="mb-24">
                            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500">
                                <motion.h3 className="text-3xl font-black mb-6 text-gray-900">
                                    Cấu Trúc Giai Cấp Trong Các Chế Độ Khác Nhau
                                </motion.h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-4">Xã Hội Phong Kiến</h4>
                                        <div className="space-y-3 text-gray-800">
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Giai cấp cơ bản (Đối kháng):</span> Địa chủ phong kiến & Nông dân.
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Giai cấp không cơ bản:</span> Thương nhân, thợ thủ công.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-4">Xã Hội Tư Bản Chủ Nghĩa</h4>
                                        <div className="space-y-3 text-gray-800">
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Giai cấp cơ bản (Đối kháng):</span>    Giai cấp Tư sản & Giai cấp Công nhân (Vô sản).
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Tầng lớp trung gian:</span> Tiểu tư sản, trí thức, nông dân.
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Đặc điểm:</span>  Lực lượng sản xuất phát triển mạnh (công nghiệp hóa); bóc lột giá trị thặng dư.
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-2xl font-bold text-red-700 mb-4">Thời kỳ quá độ lên CNXH</h4>
                                        <div className="space-y-3 text-gray-800">
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Cơ cấu:</span> Liên minh Công - Nông - Trí thức (không còn đối kháng giai cấp).
                                            </p>
                                            <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Tính chất: </span> Các giai cấp biến đổi theo hướng xích lại gần nhau về lợi ích và địa vị.
                                            </p>
                                              <p className="bg-orange-100 p-4 border-l-4 border-red-700 rounded">
                                                • <span className="font-bold">Mục tiêu: </span>  Xóa bỏ chế độ tư hữu, thiết lập chế độ công hữu để tiến tới xã hội không còn giai cấp.

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ContentSection>
                        <ContentSection
                            id="sodotuduy"
                            className="mb-24 py-16 bg-gradient-to-br from-amber-50 to-orange-100 p-10 rounded-xl border border-orange-500"
                        >
                            <motion.h3 className="text-4xl font-bold mb-8 text-red-700 text-center">
                                Sơ đồ tổng quan về Giai cấp
                            </motion.h3>
                            <div className="flex justify-center">
                                <img
                                    src={giaicap}
                                    alt="Giai Cấp"
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
                                Giai cấp là sản phẩm của phát triển không bằng của lực lượng sản xuất. Đấu tranh giai cấp là động lực
                                thúc đẩy xã hội phát triển. Cuộc cách mạng vô sản dưới sự lãnh đạo của Đảng Cộng Sản là cách duy nhất
                                để xóa bỏ hoàn toàn chế độ giai cấp và xây dựng xã hội không giai cấp - xã hội chủ nghĩa cộng sản.
                            </p>
                        </ContentSection>



                        <ContentSection id="quiz" className="mb-24">
                            <motion.h3 className="text-4xl font-bold mb-8 text-red-700 text-center">
                                Kiểm Tra Kết Thúc
                            </motion.h3>
                            <p className="text-center text-black-200 mb-8 max-w-2xl mx-auto">
                                Hoàn thành bài kiểm tra gồm 15 câu hỏi để kiểm tra kiến thức của bạn về dân tộc và chủ nghĩa Mác - Lênin
                            </p>
                            <QuizComponent />
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
