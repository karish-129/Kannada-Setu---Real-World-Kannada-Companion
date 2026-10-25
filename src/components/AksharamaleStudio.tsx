import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';
import {
  VOWELS,
  CONSONANTS,
  KANNADA_NUMBERS,
  CONVERSATIONAL_PATTERNS,
  Letter,
} from '../data/aksharamale';
import { speakKannada } from '../utils/speech';

export const AksharamaleStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vowels' | 'consonants' | 'numbers' | 'grammar' | 'syllable'>('vowels');
  const [selectedLetter, setSelectedLetter] = useState<Letter>(VOWELS[0]);
  const [composerConsonant, setComposerConsonant] = useState('ಕ');
  const [composerVowelSuffix, setComposerVowelSuffix] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = (text: string) => {
    speakKannada(text, setIsPlaying);
  };

  const vowelModifiers: { symbol: string; name: string; vowel: string; example: string }[] = [
    { symbol: '', name: 'ಅ (inherent a)', vowel: 'a', example: 'ಕ' },
    { symbol: 'ಾ', name: 'ಆ (aa)', vowel: 'aa', example: 'ಕಾ' },
    { symbol: 'ಿ', name: 'ಇ (i)', vowel: 'i', example: 'ಕಿ' },
    { symbol: 'ೀ', name: 'ಈ (ee)', vowel: 'ee', example: 'ಕೀ' },
    { symbol: 'ು', name: 'ಉ (u)', vowel: 'u', example: 'ಕು' },
    { symbol: 'ೂ', name: 'ಊ (oo)', vowel: 'oo', example: 'ಕೂ' },
    { symbol: 'ೃ', name: 'ಋ (ru)', vowel: 'ru', example: 'ಕೃ' },
    { symbol: 'ೆ', name: 'ಎ (e)', vowel: 'e', example: 'ಕೆ' },
    { symbol: 'ೇ', name: 'ಏ (ae)', vowel: 'ae', example: 'ಕೇ' },
    { symbol: 'ೈ', name: 'ಐ (ai)', vowel: 'ai', example: 'ಕೈ' },
    { symbol: 'ೊ', name: 'ಒ (o)', vowel: 'o', example: 'ಕೊ' },
    { symbol: 'ೋ', name: 'ಓ (oo)', vowel: 'oo', example: 'ಕೋ' },
    { symbol: 'ೌ', name: 'ಔ (au)', vowel: 'au', example: 'ಕೌ' },
    { symbol: 'ಂ', name: 'ಅಂ (am)', vowel: 'am', example: 'ಕಂ' },
    { symbol: 'ಃ', name: 'ಅಃ (aha)', vowel: 'aha', example: 'ಕಃ' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
          Kannada Script, Sound & Grammar Studio
        </h1>
        <p className="mt-1 text-sm text-stone-600 max-w-2xl">
          Master the elegant Aksharamale alphabet (೪೯ ಅಕ್ಷರಗಳು), phonetic pronunciation, Kannada numerals (೧-೧೦೦), and core conversational verbal suffixes.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'vowels', label: 'Vowels (ಸ್ವರಗಳು - 14)' },
          { id: 'consonants', label: 'Consonants (ವ್ಯಂಜನಗಳು - 34)' },
          { id: 'syllable', label: 'Syllable Mixer (ಗುಣಿತಾಕ್ಷರ)' },
          { id: 'numbers', label: 'Numbers (ಸಂಖ್ಯೆಗಳು 1-100)' },
          { id: 'grammar', label: 'Grammar Suffixes' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-amber-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Vowels Tab */}
      {activeTab === 'vowels' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-3">
              Click any vowel to inspect sound and examples
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {VOWELS.map((letter) => {
                const isSelected = selectedLetter.char === letter.char;
                return (
                  <button
                    key={letter.char}
                    onClick={() => {
                      setSelectedLetter(letter);
                      handlePlayAudio(letter.char);
                    }}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-900 text-white border-amber-950 shadow-md scale-105'
                        : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                  >
                    <p className="font-kannada text-3xl font-bold">{letter.char}</p>
                    <p className={`text-xs mt-1 ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                      {letter.transliteration}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Letter Detail Card */}
          <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Letter Inspection
              </span>
              <div className="mt-4 text-center">
                <span className="font-kannada text-7xl font-bold text-amber-900 block select-all">
                  {selectedLetter.char}
                </span>
                <span className="text-xl font-bold text-stone-800 mt-2 block">
                  Sound: /{selectedLetter.transliteration}/
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  IPA: [{selectedLetter.ipa}]
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200/80 space-y-2">
                <div className="p-3 bg-white rounded-xl border border-amber-200/50">
                  <span className="text-[11px] text-stone-500 uppercase block font-medium">
                    Everyday Example Word:
                  </span>
                  <p className="font-kannada text-lg font-bold text-stone-900 mt-0.5">
                    {selectedLetter.exampleWord}
                  </p>
                  <p className="text-xs text-stone-600">
                    Meaning: {selectedLetter.exampleMeaning}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePlayAudio(selectedLetter.char)}
              disabled={isPlaying}
              className="mt-6 w-full py-3 bg-amber-800 hover:bg-amber-900 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
              <span>Hear Pronunciation</span>
            </button>
          </div>
        </div>
      )}

      {/* Consonants Tab */}
      {activeTab === 'consonants' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
              Consonants categorized by articulation group (vargas)
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
              {CONSONANTS.map((letter) => {
                const isSelected = selectedLetter.char === letter.char;
                return (
                  <button
                    key={letter.char}
                    onClick={() => {
                      setSelectedLetter(letter);
                      handlePlayAudio(letter.char);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-900 text-white border-amber-950 shadow-md scale-105'
                        : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                  >
                    <p className="font-kannada text-2xl font-bold">{letter.char}</p>
                    <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                      {letter.transliteration}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Letter Detail Card */}
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Consonant Group: {selectedLetter.groupName || 'Vyanjana'}
              </span>
              <div className="mt-4 text-center">
                <span className="font-kannada text-7xl font-bold text-stone-900 block select-all">
                  {selectedLetter.char}
                </span>
                <span className="text-xl font-bold text-amber-900 mt-2 block">
                  Sound: /{selectedLetter.transliteration}/
                </span>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 space-y-2">
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-[11px] text-stone-500 uppercase block font-medium">
                    Real-World Word:
                  </span>
                  <p className="font-kannada text-lg font-bold text-stone-900 mt-0.5">
                    {selectedLetter.exampleWord}
                  </p>
                  <p className="text-xs text-stone-600">
                    Meaning: {selectedLetter.exampleMeaning}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handlePlayAudio(selectedLetter.char)}
              disabled={isPlaying}
              className="mt-6 w-full py-3 bg-amber-800 hover:bg-amber-900 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
              <span>Hear Audio</span>
            </button>
          </div>
        </div>
      )}

      {/* Syllable Mixer (Gunithakshara) */}
      {activeTab === 'syllable' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Interactive Syllable Composer (ಗುಣಿತಾಕ್ಷರಗಳು)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Kannada combines consonants with vowel diacritics to produce compound syllables. Pick a root consonant and vowel sound to see and hear the formation.
            </p>
          </div>

          {/* Consonant Picker */}
          <div>
            <span className="text-xs font-semibold text-stone-600 block mb-2">
              1. Select Root Consonant:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['ಕ', 'ಗ', 'ಚ', 'ಜ', 'ಟ', 'ಡ', 'ತ', 'ದ', 'ನ', 'ಪ', 'ಬ', 'ಮ', 'ಯ', 'ರ', 'ಲ', 'ವ', 'ಸ', 'ಹ'].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setComposerConsonant(c)}
                    className={`w-12 h-12 rounded-xl font-kannada text-xl font-bold flex items-center justify-center transition-all ${
                      composerConsonant === c
                        ? 'bg-amber-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                    }`}
                  >
                    {c}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Vowel Matra Grid */}
          <div>
            <span className="text-xs font-semibold text-stone-600 block mb-2">
              2. Select Vowel Modifier Sound:
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {vowelModifiers.map((vm, idx) => {
                const combined = `${composerConsonant}${vm.symbol}`;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setComposerVowelSuffix(vm.symbol);
                      handlePlayAudio(combined);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      composerVowelSuffix === vm.symbol
                        ? 'bg-amber-900 text-white border-amber-950 shadow-md'
                        : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200'
                    }`}
                  >
                    <p className="font-kannada text-2xl font-bold">{combined}</p>
                    <p className={`text-xs mt-1 ${composerVowelSuffix === vm.symbol ? 'text-amber-200' : 'text-stone-500'}`}>
                      {vm.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Banner */}
          <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
                Composed Syllable
              </span>
              <p className="font-kannada text-5xl font-extrabold text-amber-950 mt-1 select-all">
                {composerConsonant}{composerVowelSuffix}
              </p>
            </div>

            <button
              onClick={() => handlePlayAudio(`${composerConsonant}${composerVowelSuffix}`)}
              disabled={isPlaying}
              className="px-6 py-3 bg-amber-800 hover:bg-amber-900 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
              <span>Hear Syllable Sound</span>
            </button>
          </div>
        </div>
      )}

      {/* Numbers Tab */}
      {activeTab === 'numbers' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Kannada Numerals & Spoken Numbers (ಸಂಖ್ಯೆಗಳು)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Essential for bus fare, shopping bills, phone numbers, and auto negotiations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {KANNADA_NUMBERS.map((num) => (
              <button
                key={num.arabic}
                onClick={() => handlePlayAudio(num.word)}
                className="p-3.5 bg-stone-50 hover:bg-amber-50/70 border border-stone-200 hover:border-amber-400 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-kannada text-2xl font-bold text-amber-900">
                    {num.digit}
                  </span>
                  <span className="font-mono text-xs font-bold text-stone-400 tabular-nums">
                    {num.arabic}
                  </span>
                </div>
                <p className="font-kannada font-bold text-stone-900 text-sm mt-2">
                  {num.word}
                </p>
                <p className="text-xs text-stone-500 italic mt-0.5">
                  {num.transliteration}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-800 opacity-80 group-hover:opacity-100">
                  <Volume2 className="w-3 h-3" />
                  <span>Tap to listen</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grammar Patterns Tab */}
      {activeTab === 'grammar' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONVERSATIONAL_PATTERNS.map((pattern, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <span className="font-kannada text-2xl font-bold text-amber-900">
                    {pattern.kannada}
                  </span>
                  <span className="text-xs font-mono font-semibold px-2 py-1 bg-amber-50 text-amber-900 rounded-md">
                    {pattern.suffix}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-stone-900 mt-3">
                  Meaning: {pattern.meaning}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  {pattern.usageRule}
                </p>

                <div className="mt-4 space-y-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Real-World Spoken Examples:
                  </span>
                  {pattern.examples.map((ex, ei) => (
                    <div
                      key={ei}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-start justify-between gap-2"
                    >
                      <div>
                        <p className="font-kannada font-bold text-stone-900 text-sm">
                          {ex.kannada}
                        </p>
                        <p className="text-xs text-stone-500 italic mt-0.5">
                          {ex.transliteration}
                        </p>
                        <p className="text-xs text-stone-700 mt-0.5">
                          "{ex.english}"
                        </p>
                      </div>
                      <button
                        onClick={() => handlePlayAudio(ex.kannada)}
                        aria-label="Listen to example phrase"
                        className="text-stone-400 hover:text-amber-800 p-1 shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
