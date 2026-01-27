import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronRight, BookOpen, Users, TrendingUp, Zap, CheckCircle, XCircle } from 'lucide-react';
import dauTranhGiaiCap from '../../assets/images/dautranhgiaicap.jpg';
import vidu from '../../assets/images/image.png';


interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

const quizQuestions: Question[] = [
    {
        id: 1,
        question: "Theo chủ nghĩa Mác - Lênin, giai cấp được định nghĩa như thế nào?",
        options: ["Nhóm người có cùng giàu có hoặc nghèo", "Nhóm người lớn trong quá trình sản xuất xã hội, có vị trí khác nhau về tư liệu sản xuất, có thái độ khác nhau đối với các điều kiện sản xuất", "Những người làm công việc giống nhau", "Cộng đồng sống cùng một vùng địa lý"],
        correctAnswer: "Nhóm người lớn trong quá trình sản xuất xã hội, có vị trí khác nhau về tư liệu sản xuất, có thái độ khác nhau đối với các điều kiện sản xuất",
        explanation: "Giai cấp là các nhóm người lớn khác nhau về vị trí của chúng đối với tư liệu sản xuất, và do đó là thái độ khác nhau đối với các điều kiện sản xuất xã hội"
    },
    {
        id: 2,
        question: "Yếu tố nào quyết định sự hình thành và tính chất của giai cấp?",
        options: ["Giáo dục", "Vị trí trong hệ thống sản xuất và mối quan hệ với tư liệu sản xuất", "Tôn giáo", "Ngôn ngữ"],
        correctAnswer: "Vị trí trong hệ thống sản xuất và mối quan hệ với tư liệu sản xuất",
        explanation: "Yếu tố kinh tế - vị trí trong quá trình sản xuất và mối quan hệ với tư liệu sản xuất - quyết định sự hình thành và tính chất của giai cấp"
    },
    {
        id: 3,
        question: "Giai cấp cơ bản của xã hội cộng sản nguyên thủy là gì?",
        options: ["Nô lệ và chủ nô", "Công nhân và tư sản", "Nông dân và địa chủ", "Không có giai cấp"],
        correctAnswer: "Không có giai cấp",
        explanation: "Xã hội cộng sản nguyên thủy là một xã hội không có giai cấp, không có sự phân biệt lao động"
    },
    {
        id: 4,
        question: "Trong xã hội chiếm hữu nô lệ, giai cấp cơ bản là những gì?",
        options: ["Nô lệ và chủ nô", "Công nhân và tư sản", "Nông dân và địa chủ", "Tiểu tư sản và vô sản"],
        correctAnswer: "Nô lệ và chủ nô",
        explanation: "Xã hội chiếm hữu nô lệ có hai giai cấp cơ bản: chủ nô (người chiếm hữu nô lệ) và nô lệ (bị chiếm hữu)"
    },
    {
        id: 5,
        question: "Hai giai cấp cơ bản của xã hội phong kiến là gì?",
        options: ["Nô lệ và chủ nô", "Công nhân và tư sản", "Nông dân và địa chủ", "Tiểu tư sản và công nhân"],
        correctAnswer: "Nông dân và địa chủ",
        explanation: "Xã hội phong kiến có hai giai cấp cơ bản: địa chủ (người sở hữu ruộng đất) và nông dân (lệ thuộc thân thể)"
    },
    {
        id: 6,
        question: "Giai cấp nào được coi là lực lượng tiến bộ nhất trong xã hội tư bản chủ nghĩa?",
        options: ["Tư sản", "Công nhân (giai cấp vô sản)", "Nông dân", "Tiểu tư sản"],
        correctAnswer: "Công nhân (giai cấp vô sản)",
        explanation: "Giai cấp công nhân là lực lượng tiến bộ nhất, là người thực hiện cách mạng vô sản nhằm loại bỏ tư bản chủ nghĩa"
    },
    {
        id: 7,
        question: "Mâu thuẫn chính của xã hội tư bản chủ nghĩa là gì?",
        options: ["Mâu thuẫn giữa tư sản và tiểu tư sản", "Mâu thuẫn giữa tính chất xã hội hóa của lực lượng sản xuất và chế độ chiếm hữu tư nhân tư bản chủ nghĩa", "Mâu thuẫn giữa lao động thủ công và máy móc", "Mâu thuẫn giữa thành phố và nông thôn"],
        correctAnswer: "Mâu thuẫn giữa tính chất xã hội hóa của lực lượng sản xuất và chế độ chiếm hữu tư nhân tư bản chủ nghĩa",
        explanation: "Đây là mâu thuẫn cơ bản thúc đẩy sự phát triển của xã hội tư bản chủ nghĩa đến cách mạng xã hội chủ nghĩa"
    },
    {
        id: 8,
        question: "Đấu tranh giai cấp là gì?",
        options: ["Chiến tranh quân sự", "Mâu thuẫn và xung đột lợi ích giữa các giai cấp đối lập", "Tranh giành tài sản cá nhân", "Tranh chấp quyền lực trong gia đình"],
        correctAnswer: "Mâu thuẫn và xung đột lợi ích giữa các giai cấp đối lập",
        explanation: "Đấu tranh giai cấp là xung đột lợi ích giữa các giai cấp đối lập trong xã hội"
    },
    {
        id: 9,
        question: "Theo chủ nghĩa Mác, cách mạng là gì?",
        options: ["Cải cách từng bước", "Sự nhận thức của quần chúng", "Sự thay đổi căn bản về quyền lực, từ giai cấp này sang giai cấp khác", "Phát triển kinh tế"],
        correctAnswer: "Sự thay đổi căn bản về quyền lực, từ giai cấp này sang giai cấp khác",
        explanation: "Cách mạng là quá trình thay đổi chế độ chính trị và kinh tế từ giai cấp này sang giai cấp khác"
    },
    {
        id: 10,
        question: "Vai trò lịch sử của giai cấp công nhân là gì?",
        options: ["Duy trì xã hội tư bản chủ nghĩa", "Thực hiện cách mạng xã hội chủ nghĩa và loại bỏ chế độ tư bản chủ nghĩa", "Hỗ trợ giai cấp tư sản", "Bảo vệ quyền lợi của nông dân"],
        correctAnswer: "Thực hiện cách mạng xã hội chủ nghĩa và loại bỏ chế độ tư bản chủ nghĩa",
        explanation: "Giai cấp công nhân có sứ mệnh lịch sử thực hiện cách mạng xã hội chủ nghĩa"
    },
    {
        id: 11,
        question: "Tầng lớp trung gian là những gì trong xã hội tư bản chủ nghĩa?",
        options: ["Các giai cấp không có liên quan đến sản xuất", "Tiểu tư sản, trí thức, những người sản xuất nhỏ - những lực lượng nằm giữa giai cấp tư sản và vô sản", "Những người giàu nhất", "Những người công việc nhẹ nhàng"],
        correctAnswer: "Tiểu tư sản, trí thức, những người sản xuất nhỏ - những lực lượng nằm giữa giai cấp tư sản và vô sản",
        explanation: "Tầng lớp trung gian bao gồm tiểu tư sản, trí thức và những người sản xuất nhỏ"
    },
    {
        id: 12,
        question: "Vai trò của Đảng Cộng sản là gì trong cách mạng vô sản?",
        options: ["Thay thế giai cấp công nhân", "Là đơn vị lãnh đạo của giai cấp công nhân và chỉ dẫn đấu tranh", "Chỉ cung cấp lý thuyết mà không có hành động", "Phục vụ tư sản"],
        correctAnswer: "Là đơn vị lãnh đạo của giai cấp công nhân và chỉ dẫn đấu tranh",
        explanation: "Đảng Cộng sản là tiền phong của giai cấp công nhân, lãnh đạo đấu tranh và cách mạng vô sản"
    },
    {
        id: 13,
        question: "Mục tiêu cuối cùng của cách mạng vô sản là gì?",
        options: ["Thiết lập chế độ tư bản chủ nghĩa", "Xóa bỏ giai cấp và thiết lập xã hội cộng sản không còn áp bức", "Tăng cường quyền lực của Đảng", "Mở rộng chiếm hữu tư nhân"],
        correctAnswer: "Xóa bỏ giai cấp và thiết lập xã hội cộng sản không còn áp bức",
        explanation: "Mục tiêu cuối cùng là xóa bỏ hoàn toàn giai cấp và thiết lập xã hội cộng sản"
    },
    {
        id: 14,
        question: "Liên minh giai cấp trong xã hội chủ nghĩa gồm những gì?",
        options: ["Chỉ giai cấp công nhân", "Giai cấp công nhân, giai cấp nông dân, và tầng lớp trí thức", "Chỉ giai cấp tư sản", "Tất cả mọi người trong xã hội"],
        correctAnswer: "Giai cấp công nhân, giai cấp nông dân, và tầng lớp trí thức",
        explanation: "Liên minh giai cấp là kết hợp của giai cấp công nhân, giai cấp nông dân, và tầng lớp trí thức"
    },
    {
        id: 15,
        question: "Động lực lịch sử chính thúc đẩy xã hội phát triển là gì?",
        options: ["Tính cách của các nhân vật lịch sử", "Đấu tranh giai cấp", "Sự phát triển của công nghệ", "Tư tưởng triết học"],
        correctAnswer: "Đấu tranh giai cấp",
        explanation: "Chủ nghĩa Mác cho rằng đấu tranh giai cấp là động lực chính của sự phát triển lịch sử"
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
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-zinc-900 p-8 border border-red-600/30 rounded-lg"
        >
            {!showFinalResults ? (
                <>
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-red-700">Câu {currentQuestion + 1}</h3>
                            <div className="text-sm text-gray-400">{currentQuestion + 1}/{quizQuestions.length}</div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-xl font-semibold text-gray-100 mb-6">{question.question}</h4>

                        <div className="space-y-3">
                            {question.options.map((option, idx) => {
                                const isSelected = currentAnswer === option;
                                const isOptionCorrect = option === question.correctAnswer;
                                const showAsCorrect = isSelected && isOptionCorrect;
                                const showAsIncorrect = isSelected && !isOptionCorrect;

                                return (
                                    <motion.div
                                        key={idx}
                                        className={`rounded-lg border-2 transition-all ${
                                            showAsCorrect
                                                ? 'border-green-600 bg-green-600/20'
                                                : showAsIncorrect
                                                ? 'border-red-600 bg-red-600/20'
                                                : isSelected
                                                ? 'border-yellow-600 bg-yellow-600/10'
                                                : 'border-gray-600 bg-gray-900/50'
                                        }`}
                                    >
                                        <button
                                            onClick={() => !isAnswered && handleSelectAnswer(option)}
                                            className="w-full p-4 text-left"
                                            disabled={isAnswered}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div
                                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                                        showAsCorrect
                                                            ? 'border-green-600 bg-green-600'
                                                            : showAsIncorrect
                                                            ? 'border-red-600 bg-red-600'
                                                            : isSelected
                                                            ? 'border-yellow-600 bg-yellow-600'
                                                            : 'border-gray-500'
                                                    }`}
                                                >
                                                    {showAsCorrect && <CheckCircle className="w-5 h-5 text-white" />}
                                                    {showAsIncorrect && <XCircle className="w-5 h-5 text-white" />}
                                                    {isSelected && !isAnswered && (
                                                        <div className="w-2 h-2 bg-white rounded-full" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <span className="text-gray-100">{option}</span>
                                                    {showAsCorrect && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            className="mt-3 p-3 bg-green-900/50 rounded border-l-2 border-green-600"
                                                        >
                                                            <p className="text-green-300 text-sm">
                                                                <span className="font-semibold">✓ Chính xác!</span>
                                                            </p>
                                                            <p className="text-green-200 text-sm mt-2 italic">
                                                                {question.explanation}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                    {showAsIncorrect && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            className="mt-3 p-3 bg-red-900/50 rounded border-l-2 border-red-600"
                                                        >
                                                            <p className="text-red-300 text-sm font-semibold">✗ Sai rồi!</p>
                                                            <p className="text-red-200 text-sm mt-2">
                                                                Đáp án đúng là: <span className="font-semibold">{question.correctAnswer}</span>
                                                            </p>
                                                            <p className="text-red-200 text-sm mt-2 italic">
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
                            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-100 rounded-lg transition-colors"
                        >
                            ← Quay lại
                        </button>

                        {currentQuestion === quizQuestions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                                className="px-8 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                            >
                                Nộp bài
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!isAnswered}
                                className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
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
                            <div className="text-6xl font-bold text-red-600 mb-2">
                                {score}/{quizQuestions.length}
                            </div>
                            <div className="text-xl text-gray-300">
                                {Math.round((score / quizQuestions.length) * 100)}%
                            </div>
                        </motion.div>
                        <h3 className="text-3xl font-bold text-gray-100 mb-4">
                            {score >= quizQuestions.length * 0.8
                                ? '🎉 Xuất sắc!'
                                : score >= quizQuestions.length * 0.6
                                ? '👍 Tốt!'
                                : '📚 Cần ôn lại'}
                        </h3>
                        <p className="text-gray-400">
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
                                    className={`p-4 rounded-lg border-l-4 ${
                                        isUserCorrect ? 'bg-green-900/20 border-green-600' : 'bg-red-900/20 border-red-600'
                                    }`}
                                >
                                    <div className="flex gap-3 mb-2">
                                        {isUserCorrect ? (
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-100">Câu {q.id}: {q.question}</p>
                                            <p className="text-sm text-gray-400 mt-2">
                                                <span className="font-semibold">Câu trả lời của bạn:</span> {userAnswer || 'Không trả lời'}
                                            </p>
                                            {!isUserCorrect && (
                                                <p className="text-sm text-gray-400">
                                                    <span className="font-semibold">Đáp án đúng:</span> {q.correctAnswer}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-300 mt-2 italic">
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
                        className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
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

                        {/* Quiz */}
                        <ContentSection id="quiz" className="mb-24">
                            <motion.h3 className="text-4xl font-bold mb-8 text-red-700 text-center">
                                Kiểm Tra Kết Thúc
                            </motion.h3>
                            <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
                                Hoàn thành bài kiểm tra gồm 15 câu hỏi để kiểm tra kiến thức của bạn về giai cấp và chủ nghĩa Mác - Lênin
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
