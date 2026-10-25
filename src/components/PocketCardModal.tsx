import React, { useState } from 'react';
import { Volume2, X, Check, Copy } from 'lucide-react';
import { Phrase } from '../data/situations';
import { speakKannada } from '../utils/speech';

interface PocketCardModalProps {
  phrase: Phrase | null;
  onClose: () => void;
}

export const PocketCardModal: React.FC<PocketCardModalProps> = ({ phrase, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!phrase) return null;

  const handlePlayAudio = () => {
    speakKannada(phrase.kannada, setIsPlaying);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${phrase.kannada} (${phrase.transliteration}) - ${phrase.english}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pocket phrase card"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-800 transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-400 uppercase tracking-wider">
            <span>Show to Local / Driver</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-400 capitalize">{phrase.politenessLevel}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close pocket card"
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Large readable Kannada script */}
        <div className="my-6 text-center">
          <p className="font-kannada text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-300 leading-tight tracking-wide select-all">
            {phrase.kannada}
          </p>
          <p className="mt-4 text-lg sm:text-xl font-medium text-stone-200 tracking-wide">
            {phrase.transliteration}
          </p>
          <p className="mt-2 text-sm sm:text-base text-stone-400">
            {phrase.english}
          </p>
        </div>

        {phrase.context && (
          <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700/60 text-xs text-stone-300 text-center">
            <span className="font-semibold text-amber-200">Context: </span>
            {phrase.context}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-stone-950 font-bold rounded-xl shadow-md transition-colors"
          >
            <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-bounce' : ''}`} />
            <span>{isPlaying ? 'Playing Audio...' : 'Play Loud Pronunciation'}</span>
          </button>

          <button
            onClick={handleCopy}
            aria-label="Copy phrase text"
            className="p-3 bg-stone-800 hover:bg-stone-700 active:bg-stone-600 text-stone-300 rounded-xl border border-stone-700 transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
