import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Send, Bot, User, RefreshCw, MessageCircle } from 'lucide-react';
import { SITUATION_CATEGORIES, SituationCategory } from '../data/situations';
import { speakKannada } from '../utils/speech';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  kannada: string;
  transliteration: string;
  englishTranslation: string;
  feedback?: string;
  timestamp: string;
}

export const RoleplaySimulator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SituationCategory>(
    SITUATION_CATEGORIES[0]
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [suggestedReplies, setSuggestedReplies] = useState<
    { kannada: string; transliteration: string; english: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize scenario
  useEffect(() => {
    const starter = selectedCategory.roleplayPrompt.starterPhrase;
    const initialAiMessage: ChatMessage = {
      id: 'init-1',
      sender: 'ai',
      kannada: starter.kannada,
      transliteration: starter.transliteration,
      englishTranslation: starter.english,
      feedback: `Welcome to the ${selectedCategory.title} roleplay! Practice answering naturally in Kannada.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([initialAiMessage]);

    // Initial suggested quick replies from first category phrases
    const initialReplies = selectedCategory.phrases.slice(0, 3).map((p) => ({
      kannada: p.kannada,
      transliteration: p.transliteration,
      english: p.english,
    }));
    setSuggestedReplies(initialReplies);
  }, [selectedCategory]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      kannada: text,
      transliteration: text,
      englishTranslation: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: selectedCategory.id,
          scenarioTitle: selectedCategory.title,
          role: selectedCategory.roleplayPrompt.role,
          situationDescription: selectedCategory.roleplayPrompt.description,
          conversationHistory: newHistory.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: `${m.kannada} (${m.transliteration})`,
          })),
          userMessage: text,
        }),
      });

      const json = await response.json();
      if (response.ok && json.success && json.data) {
        const data = json.data;
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          kannada: data.kannada,
          transliteration: data.transliteration,
          englishTranslation: data.englishTranslation,
          feedback: data.feedback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (data.suggestedReplies && data.suggestedReplies.length > 0) {
          setSuggestedReplies(data.suggestedReplies);
        }
      } else {
        throw new Error(json.error || 'Roleplay failed');
      }
    } catch (err: any) {
      console.warn('Roleplay fallback:', err);
      // Realistic offline fallback
      const fallbackAi: ChatMessage = {
        id: `ai-fallback-${Date.now()}`,
        sender: 'ai',
        kannada: 'ಸರಿ, ಅರ್ಥವಾಯಿತು. ಮುಂದೆ ಏನು ಮಾಡೋಣ?',
        transliteration: 'Sari, arthavaayithu. Munde enu maadona?',
        englishTranslation: 'Alright, understood. What shall we do next?',
        feedback: 'Good conversational flow! Try using polite particles like "kodi" or "banni".',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackAi]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = (id: string, text: string) => {
    setActiveAudioId(id);
    speakKannada(text, (speaking) => {
      if (!speaking) setActiveAudioId(null);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          AI Situational Roleplay Partner
        </h1>
        <p className="mt-1 text-sm text-stone-600 max-w-2xl">
          Converse live with authentic local Karnataka personas (auto driver, kirana vendor, doctor, colleague) to build real speaking muscle memory.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {SITUATION_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all border ${
              selectedCategory.id === cat.id
                ? 'bg-amber-900 text-white border-amber-950 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:border-amber-700 hover:bg-stone-50'
            }`}
          >
            <span className="font-kannada mr-1.5">{cat.kannadaTitle}</span>
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Roleplay Chat Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Persona Details & Situational Cultural Tips */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 font-bold">
                <Bot className="w-5 h-5 text-amber-900" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  {selectedCategory.roleplayPrompt.role}
                </h3>
                <p className="text-xs text-stone-500">
                  Persona Role · {selectedCategory.title}
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-stone-600 leading-relaxed">
              {selectedCategory.roleplayPrompt.description}
            </p>

            <div className="mt-4 pt-3 border-t border-stone-100">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                Local Etiquette Tip:
              </span>
              <p className="text-xs text-stone-600">
                {selectedCategory.localCultureTip}
              </p>
            </div>
          </div>

          {/* Key Words to Try */}
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80">
            <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block mb-2">
              Key Words to Use in This Chat:
            </span>
            <div className="space-y-1.5">
              {selectedCategory.keyVocabulary.slice(0, 4).map((vocab, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-xs py-1 px-2 bg-white/80 rounded-md border border-amber-200/50"
                >
                  <span className="font-kannada font-bold text-amber-900">{vocab.kannada}</span>
                  <span className="text-stone-500 italic">{vocab.transliteration}</span>
                  <span className="text-stone-700">{vocab.english}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[580px]">
          {/* Chat Header */}
          <div className="px-5 py-3 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-amber-800" />
              <span className="text-xs font-bold text-stone-800">
                Live Dialogue with {selectedCategory.roleplayPrompt.role}
              </span>
            </div>
            <button
              onClick={() => {
                const starter = selectedCategory.roleplayPrompt.starterPhrase;
                setMessages([
                  {
                    id: `reset-${Date.now()}`,
                    sender: 'ai',
                    kannada: starter.kannada,
                    transliteration: starter.transliteration,
                    englishTranslation: starter.english,
                    feedback: 'Restarted scenario. Try a different opening line!',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
              aria-label="Restart scenario conversation"
              className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
          </div>

          {/* Messages list */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4"
          >
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isAi ? 'bg-amber-100 text-amber-900' : 'bg-stone-800 text-white'
                    }`}
                  >
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[85%] sm:max-w-[75%] space-y-1`}>
                    <div
                      className={`p-3.5 rounded-2xl ${
                        isAi
                          ? 'bg-stone-50 border border-stone-200 text-stone-900 rounded-tl-xs'
                          : 'bg-amber-800 text-white rounded-tr-xs'
                      }`}
                    >
                      <p
                        className={`font-kannada text-lg font-bold leading-snug ${
                          isAi ? 'text-amber-950' : 'text-white'
                        }`}
                      >
                        {m.kannada}
                      </p>
                      {m.transliteration && m.transliteration !== m.kannada && (
                        <p
                          className={`text-xs font-medium mt-0.5 ${
                            isAi ? 'text-stone-600' : 'text-amber-100'
                          }`}
                        >
                          {m.transliteration}
                        </p>
                      )}
                      {m.englishTranslation && (
                        <p
                          className={`text-xs mt-1 pt-1 border-t ${
                            isAi
                              ? 'border-stone-200/60 text-stone-500'
                              : 'border-amber-700/60 text-amber-100/90'
                          }`}
                        >
                          {m.englishTranslation}
                        </p>
                      )}

                      {/* Audio Button for AI Messages */}
                      {isAi && (
                        <div className="mt-2 flex items-center justify-between">
                          <button
                            onClick={() => handlePlayAudio(m.id, m.kannada)}
                            className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-950 font-medium transition-colors"
                          >
                            <Volume2
                              className={`w-3.5 h-3.5 ${
                                activeAudioId === m.id ? 'animate-bounce text-amber-600' : ''
                              }`}
                            />
                            <span>{activeAudioId === m.id ? 'Listening...' : 'Hear Audio'}</span>
                          </button>
                          <span className="text-[10px] text-stone-400">{m.timestamp}</span>
                        </div>
                      )}
                    </div>

                    {/* Feedback Note from AI */}
                    {isAi && m.feedback && (
                      <div className="px-2 py-1 text-[11px] text-stone-500 italic">
                        💡 Mentor Note: {m.feedback}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl rounded-tl-xs text-xs text-stone-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                  <span>{selectedCategory.roleplayPrompt.role} is replying in Kannada...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggested Replies */}
          {suggestedReplies.length > 0 && !isLoading && (
            <div className="p-2.5 bg-stone-50/90 border-t border-stone-200 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5 px-1">
                Suggested Quick Replies (Click to speak):
              </span>
              <div className="flex gap-2">
                {suggestedReplies.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(r.kannada)}
                    className="p-2 bg-white hover:bg-amber-50 active:scale-95 border border-stone-200 hover:border-amber-400 rounded-xl text-left transition-all shrink-0 max-w-xs shadow-xs"
                  >
                    <p className="font-kannada text-xs font-bold text-amber-900 truncate">
                      {r.kannada}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">{r.transliteration}</p>
                    <p className="text-[10px] text-stone-400 truncate">{r.english}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 sm:p-4 border-t border-stone-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your response in Kannada or English (e.g. 'Haudu sir, meter haaki')..."
                className="flex-1 px-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-800"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputText.trim()}
                aria-label="Send message in roleplay"
                className="px-4 py-2.5 bg-amber-800 hover:bg-amber-900 active:scale-95 disabled:opacity-50 text-white rounded-xl shadow-xs transition-all flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
