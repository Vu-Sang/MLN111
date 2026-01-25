import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Settings, Send, Trash2 } from 'lucide-react';
import { chatWithAI } from '../services/chatClient.js';
import {
    getGeminiApiKey,
    setGeminiApiKey,
    clearGeminiApiKey,
    hasCustomApiKey,
    isValidApiKeyFormat
} from '../services/apiKeyService.js';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiKey, setApiKeyInput] = useState('');
    const [hasKey, setHasKey] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHasKey(hasCustomApiKey());
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chatWithAI(input);
            const aiMessage: Message = { role: 'ai', content: response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                role: 'ai',
                content: '⚠️ Lỗi kết nối. Vui lòng thử lại.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveApiKey = () => {
        if (!apiKey.trim()) {
            alert('Vui lòng nhập API key!');
            return;
        }

        if (!isValidApiKeyFormat(apiKey.trim())) {
            alert('API Key phải bắt đầu bằng "AIza"');
            return;
        }

        setGeminiApiKey(apiKey.trim());
        setHasKey(true);
        setApiKeyInput('');
        alert('✅ Đã lưu API key thành công!');
    };

    const handleClearApiKey = () => {
        if (window.confirm('Bạn có chắc muốn xóa API key?')) {
            clearGeminiApiKey();
            setHasKey(false);
            alert('✅ Đã xóa API key!');
        }
    };

    const formatMarkdown = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*|\n)/g);

        return (
            <>
                {parts.map((part, index) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={index} style={{ color: '#eab308' }}>{part.slice(2, -2)}</strong>;
                    } else if (part === '\n') {
                        return <br key={index} />;
                    } else if (part.match(/^[-•*]\s/)) {
                        return <li key={index} style={{ marginLeft: '16px' }}>{part.replace(/^[-•*]\s/, '')}</li>;
                    } else {
                        return <span key={index}>{part}</span>;
                    }
                })}
            </>
        );
    };

    // Style objects for consistent theming
    const styles = {
        // Main colors
        primaryGold: '#996B3D',
        primaryGoldHover: '#7A5530',
        headerRed: '#B91C1C',

        // Backgrounds
        chatBg: '#F5E6C8',
        headerBg: '#EDD9B5',
        messagesBg: '#F5E6C8',
        inputAreaBg: '#EDD9B5',
        settingsBg: '#F0DFC0',

        // Message bubbles
        userBubbleBg: '#EAD7C3',
        userBorder: '#C2410C',
        userLabel: '#9A3412',

        aiBubbleBg: '#F6EEDC',
        aiBorder: '#CA8A04',
        aiLabel: '#854D0E',

        // Text colors
        messageText: '#3B2F2F',
        emptyText: '#6B7280',
        settingsText: '#374151',

        // Borders
        borderColor: '#D4B896',
        inputBorder: '#C9A86C',
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: '24px',
                        right: '24px',
                        width: '56px',
                        height: '56px',
                        backgroundColor: styles.primaryGold,
                        color: 'white',
                        borderRadius: '50%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = styles.primaryGoldHover;
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = styles.primaryGold;
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {/* Chat Widget */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '24px',
                        right: '24px',
                        width: '384px',
                        height: '600px',
                        backgroundColor: styles.chatBg,
                        border: `1px solid ${styles.borderColor}`,
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
                        display: 'flex',
                        flexDirection: 'column',
                        zIndex: 9999,
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            backgroundColor: styles.headerBg,
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: `1px solid ${styles.borderColor}`,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>📚</span>
                            <span style={{ color: styles.headerRed, fontWeight: 600, fontSize: '14px' }}>
                                Trợ lý Triết học AI
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <button
                                onClick={() => setMessages([])}
                                style={{
                                    padding: '8px',
                                    color: '#6B7280',
                                    background: 'transparent',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                title="Xóa lịch sử"
                            >
                                <Trash2 size={18} />
                            </button>
                            <button
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                style={{
                                    padding: '8px',
                                    color: '#6B7280',
                                    background: 'transparent',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                title="Cài đặt"
                            >
                                <Settings size={18} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    padding: '8px',
                                    color: '#6B7280',
                                    background: 'transparent',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    {isSettingsOpen ? (
                        <div
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: '16px',
                                backgroundColor: styles.settingsBg,
                            }}
                        >
                            <h3 style={{ color: styles.headerRed, fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Settings size={18} />
                                Cài đặt API Key
                            </h3>

                            {/* Status */}
                            <div
                                style={{
                                    padding: '16px',
                                    borderRadius: '12px',
                                    marginBottom: '16px',
                                    borderLeft: `4px solid ${hasKey ? '#22C55E' : '#EAB308'}`,
                                    backgroundColor: hasKey ? '#DCFCE7' : '#FEF9C3',
                                }}
                            >
                                <div style={{ color: hasKey ? '#166534' : '#854D0E' }}>
                                    <strong style={{ display: 'block', marginBottom: '4px' }}>
                                        {hasKey ? '✅ Đang dùng API Key tùy chỉnh' : '⚠️ Chưa có API Key'}
                                    </strong>
                                    <small style={{ opacity: 0.8 }}>
                                        {hasKey ? 'Gemini AI sẵn sàng' : 'Đang dùng server key (có thể hết quota)'}
                                    </small>
                                </div>
                            </div>

                            {/* Input */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', color: styles.settingsText, fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                                    🔑 Gemini API Key:
                                </label>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKeyInput(e.target.value)}
                                    placeholder="AIza..."
                                    style={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        color: '#1F2937',
                                        border: `1px solid ${styles.inputBorder}`,
                                        borderRadius: '8px',
                                        padding: '12px 16px',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* Guide */}
                            <div
                                style={{
                                    backgroundColor: '#E0F2FE',
                                    borderLeft: '4px solid #0EA5E9',
                                    borderRadius: '0 8px 8px 0',
                                    padding: '16px',
                                    marginBottom: '16px',
                                }}
                            >
                                <strong style={{ color: '#0369A1', display: 'block', marginBottom: '8px' }}>📝 Hướng dẫn lấy key:</strong>
                                <ol style={{ color: '#6B7280', fontSize: '12px', margin: 0, paddingLeft: '16px' }}>
                                    <li style={{ marginBottom: '4px' }}>
                                        Vào: <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#0EA5E9', textDecoration: 'underline' }}>AI Studio</a>
                                    </li>
                                    <li style={{ marginBottom: '4px' }}>Đăng nhập Gmail</li>
                                    <li style={{ marginBottom: '4px' }}>Click "Create API Key"</li>
                                    <li>Copy & paste vào ô trên</li>
                                </ol>
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={handleSaveApiKey}
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#22C55E',
                                        color: 'white',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    💾 Lưu API Key
                                </button>
                                {hasKey && (
                                    <button
                                        onClick={handleClearApiKey}
                                        style={{
                                            backgroundColor: '#EF4444',
                                            color: 'white',
                                            padding: '12px 16px',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Messages Area */}
                            <div
                                style={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    padding: '16px',
                                    backgroundColor: styles.messagesBg,
                                }}
                            >
                                {messages.length === 0 && (
                                    <div style={{ textAlign: 'center', color: styles.emptyText, paddingTop: '64px', paddingBottom: '64px' }}>
                                        <div
                                            style={{
                                                width: '64px',
                                                height: '64px',
                                                margin: '0 auto 16px',
                                                backgroundColor: '#E5DCC8',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <span style={{ fontSize: '32px' }}>📚</span>
                                        </div>
                                        <p style={{ fontWeight: 500, margin: 0 }}>Hỏi tôi về Triết học Mác-Lênin</p>
                                        <p style={{ fontSize: '14px', marginTop: '4px', opacity: 0.7 }}>Tôi sẵn sàng hỗ trợ bạn học tập</p>
                                    </div>
                                )}

                                {messages.map((msg, idx) => (
                                    // 🔴 DIV NGOÀI – quyết định TRÁI / PHẢI
                                    <div
                                        key={idx}
                                        style={{
                                            display: 'flex',
                                            justifyContent: msg.role === 'user'
                                                ? 'flex-end'   // 👈 bạn → bên phải
                                                : 'flex-start',// 👈 AI → bên trái
                                            marginBottom: '12px',
                                        }}
                                    >
                                        {/* 🔵 DIV TRONG – bong bóng chat */}
                                        <div
                                            style={{
                                                maxWidth: '75%',
                                                padding: '12px',
                                                borderRadius: '12px',
                                                backgroundColor: msg.role === 'user'
                                                    ? styles.userBubbleBg
                                                    : styles.aiBubbleBg,
                                                borderLeft: msg.role === 'ai'
                                                    ? `4px solid ${styles.aiBorder}`
                                                    : undefined,
                                                borderRight: msg.role === 'user'
                                                    ? `4px solid ${styles.userBorder}`
                                                    : undefined,
                                            }}
                                        >
                                            {/* ===== PHẦN CŨ GIỮ NGUYÊN ===== */}
                                            <div
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: '12px',
                                                    marginBottom: '6px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    color: msg.role === 'user'
                                                        ? styles.userLabel
                                                        : styles.aiLabel,
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        backgroundColor: msg.role === 'user'
                                                            ? styles.userLabel
                                                            : styles.aiLabel,
                                                        borderRadius: '50%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '10px',
                                                    }}
                                                >
                                                    {msg.role === 'user' ? '👤' : '📖'}
                                                </span>
                                                {msg.role === 'user' ? 'Bạn' : 'AI'}
                                            </div>

                                            <div
                                                style={{
                                                    color: styles.messageText,
                                                    fontSize: '14px',
                                                    lineHeight: 1.6,
                                                }}
                                            >
                                                {formatMarkdown(msg.content)}
                                            </div>
                                        </div>
                                    </div>
                                ))}


                                {isLoading && (
                                    <div
                                        style={{
                                            padding: '12px',
                                            backgroundColor: styles.aiBubbleBg,
                                            borderLeft: `4px solid ${styles.aiBorder}`,
                                            borderRadius: '12px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                marginBottom: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                color: styles.aiLabel,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    backgroundColor: styles.aiLabel,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '10px',
                                                }}
                                            >
                                                📖
                                            </span>
                                            AI
                                        </div>
                                        <div style={{ color: '#9CA3AF', fontSize: '14px', fontStyle: 'italic' }}>
                                            Đang suy nghĩ...
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div
                                style={{
                                    padding: '12px',
                                    backgroundColor: styles.inputAreaBg,
                                    borderTop: `1px solid ${styles.borderColor}`,
                                }}
                            >
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Hỏi về Triết học..."
                                        disabled={isLoading}
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'white',
                                            color: '#1F2937',
                                            border: `1px solid ${styles.inputBorder}`,
                                            borderRadius: '8px',
                                            padding: '10px 16px',
                                            fontSize: '14px',
                                            outline: 'none',
                                        }}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={isLoading || !input.trim()}
                                        style={{
                                            backgroundColor: isLoading || !input.trim() ? '#9CA3AF' : styles.primaryGold,
                                            color: 'white',
                                            padding: '10px 16px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatWidget;
