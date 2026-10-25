import React, { useState } from 'react';
import { Volume2, Sparkles, X, ArrowRight, Lightbulb, ShieldAlert, BookOpen } from 'lucide-react';
import { speakKannada } from '../utils/speech';
import { Phrase } from '../data/situations';

interface TranslationResult {
  kannada: string;
  transliteration: string;
  english: string;
  breakdown: { word: string; transliteration: string; meaning: string }[];
  culturalNote: string;
  politeAlternative?: string;
}

interface SmartTranslatorProps {
  isOpen: boolean;
  onClose: () => void;
  onShowPocketCard: (phrase: Phrase) => void;
}

export const SmartTranslator: React.FC<SmartTranslatorProps> = ({
  isOpen,
  onClose,
  onShowPocketCard,
}) => {
  const [situation, setSituation] = useState('Transportation');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const quickPrompts = [
    { label: 'Auto: Go via ring road', text: 'Please go via the outer ring road to avoid traffic' },
    { label: 'Shop: Ask for fresh curd & UPI', text: 'Give one packet of fresh curd, will pay by UPI' },
    { label: 'Clinic: Headache since 2 days', text: 'Doctor, I have had severe headache and fever since yesterday' },
    { label: 'Office: Tea break invite', text: 'Shall we go downstairs for hot filter coffee?' },
    { label: 'Travel: Mysore Palace entry', text: 'Where is the ticket counter for the palace entry?' },
  ];

  const handleTranslate = async (textToTranslate?: string) => {
    const text = (textToTranslate || query).trim();
    if (!text) return;
    if (textToTranslate) setQuery(textToTranslate);

    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/gemini/translate-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          situation,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setResult(data.data);
      } else {
        throw new Error(data.error || 'Failed to translate');
      }
    } catch (err: any) {
      console.warn('Translate error:', err);
      // Fallback local translation if server is unreachable
      setResult({
        kannada: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ.',
        transliteration: 'Dayavittu sahaaya maadi.',
        english: 'Please help me.',
        breakdown: [
          { word: 'ದಯವಿಟ್ಟು', transliteration: 'Dayavittu', meaning: 'Please' },
          { word: 'ಸಹಾಯ', transliteration: 'sahaaya', meaning: 'Help' },
          { word: 'ಮಾಡಿ', transliteration: 'maadi', meaning: 'Do' },
        ],
        culturalNote: 'Adding "Dayavittu" or "Sir / Anna" shows great respect in Karnataka.',
      });
      setErrorMessage('Using local fallback offline helper.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudio = (text: string) => {
    speakKannada(text, setIsPlaying);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Situational phrase mentor modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-stone-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                How Do I Say This in Kannada?
              </h2>
              <p className="text-xs text-stone-400">
                Situational phrasing & cultural etiquette mentor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close mentor modal"
            className="p-1 text-stone-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Situation Picker */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wider">
              1. Choose Real-World Situation
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {[
                'Transportation',
                'Shopping',
                'Healthcare',
                'Workplaces',
                'Travelling',
                'Education',
              ].map((sit) => (
                <button
                  key={sit}
                  type="button"
                  onClick={() => setSituation(sit)}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg text-center truncate transition-colors ${
                    situation === sit
                      ? 'bg-amber-900 text-white font-semibold shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {sit}
                </button>
              ))}
            </div>
          </div>

          {/* Input text */}
          <div>
            <label
              htmlFor="phrase-query-input"
              className="block text-xs font-semibold text-stone-600 mb-1 uppercase tracking-wider"
            >
              2. What do you want to say in English?
            </label>
            <div className="flex gap-2">
              <input
                id="phrase-query-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
                placeholder="e.g. Tell the auto driver to turn on the meter..."
                className="flex-1 px-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-800"
              />
              <button
                onClick={() => handleTranslate()}
                disabled={isLoading || !query.trim()}
                className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 active:scale-95 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
              >
                {isLoading ? (
                  <span>Thinking...</span>
                ) : (
                  <>
                    <span>Translate</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick inspiration chips */}
          <div>
            <span className="text-xs text-stone-500 mr-2">Try quick scenario:</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleTranslate(p.text)}
                  className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Translation Result Card */}
          {result && (
            <div className="mt-4 p-5 bg-amber-50/50 border border-amber-200/80 rounded-2xl space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
                    Spoken Kannada ({situation})
                  </span>
                  <p className="font-kannada text-2xl sm:text-3xl font-bold text-amber-950 mt-1 select-all">
                    {result.kannada}
                  </p>
                  <p className="text-sm font-semibold text-stone-700 mt-1 select-all">
                    {result.transliteration}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Meaning: {result.english}
                  </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleAudio(result.kannada)}
                    disabled={isPlaying}
                    aria-label="Listen to Kannada pronunciation"
                    className="p-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl shadow-xs transition-colors"
                  >
                    <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
                  </button>
                  <button
                    onClick={() =>
                      onShowPocketCard({
                        id: 'custom',
                        kannada: result.kannada,
                        transliteration: result.transliteration,
                        english: result.english,
                        context: situation,
                        politenessLevel: 'polite',
                      })
                    }
                    className="text-xs px-2.5 py-1.5 bg-white border border-stone-300 hover:border-amber-800 text-stone-700 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Big Card Mode
                  </button>
                </div>
              </div>

              {/* Word Breakdown */}
              {result.breakdown && result.breakdown.length > 0 && (
                <div className="pt-3 border-t border-amber-200/60">
                  <span className="text-xs font-semibold text-stone-600 block mb-2">
                    Word-by-Word Breakdown:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {result.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-white rounded-lg border border-stone-200 text-xs"
                      >
                        <p className="font-kannada font-bold text-amber-900">{item.word}</p>
                        <p className="text-stone-600 italic">{item.transliteration}</p>
                        <p className="text-stone-500">{item.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cultural Etiquette Note */}
              {result.culturalNote && (
                <div className="p-3 bg-white rounded-xl border border-amber-300/70 text-xs text-amber-950 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-900">Karnataka Cultural Tip: </span>
                    <span>{result.culturalNote}</span>
                  </div>
                </div>
              )}

              {/* Polite Alternative */}
              {result.politeAlternative && (
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-stone-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-900">Polite / Formal variation: </span>
                    <span>{result.politeAlternative}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
