import React, { useState } from 'react';
import {
  Bus,
  ShoppingBag,
  Compass,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Volume2,
  Maximize2,
  Search,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { SITUATION_CATEGORIES, SituationCategory, Phrase } from '../data/situations';
import { speakKannada } from '../utils/speech';

interface SituationsViewProps {
  onShowPocketCard: (phrase: Phrase) => void;
  onOpenRoleplay: (category: SituationCategory) => void;
}

export const SituationsView: React.FC<SituationsViewProps> = ({
  onShowPocketCard,
  onOpenRoleplay,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('transportation');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAudioPhraseId, setActiveAudioPhraseId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bus':
        return <Bus className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const selectedCategory =
    SITUATION_CATEGORIES.find((c) => c.id === activeCategoryId) || SITUATION_CATEGORIES[0];

  const handlePlayAudio = (phrase: Phrase) => {
    setActiveAudioPhraseId(phrase.id);
    speakKannada(phrase.kannada, (speaking) => {
      if (!speaking) setActiveAudioPhraseId(null);
    });
  };

  // Filtered phrases based on search
  const filteredPhrases = searchQuery.trim()
    ? SITUATION_CATEGORIES.flatMap((c) => c.phrases).filter(
        (p) =>
          p.kannada.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.context.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory.phrases;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner with Karnataka Aesthetics */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-amber-900 to-stone-900 text-stone-100 p-6 sm:p-10 shadow-lg border border-amber-900/50">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest">
            <span>Real-World Situational Technology</span>
            <span aria-hidden="true">·</span>
            <span>Karnataka Cultural Guide</span>
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            Speak Kannada with confidence in every daily situation.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
            From hailing an auto with <span className="text-amber-300 font-semibold italic">"Meter haaki sir"</span> to ordering fresh groceries, navigating hospitals, and connecting with tech colleagues, learn spoken phrases and cultural etiquette that work in real life.
          </p>

          {/* Quick Search Bar */}
          <div className="mt-6 flex items-center gap-2 max-w-lg bg-stone-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-amber-500/30">
            <Search className="w-4 h-4 text-amber-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phrases (e.g. 'ticket', 'meter', 'coffee', 'fever')..."
              className="w-full px-2 py-2 text-xs sm:text-sm bg-transparent text-white placeholder-stone-400 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-stone-400 hover:text-white px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Decorative Traditional Motif Graphic (Clean SVG) */}
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-x-12 translate-y-12">
          <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor" className="text-amber-400">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M50 5 L55 35 L85 35 L60 55 L70 85 L50 65 L30 85 L40 55 L15 35 L45 35 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Situations Selector Grid */}
      {!searchQuery && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Explore Real-World Domains
              </h2>
              <p className="text-xs text-stone-500">
                Select a domain to access authentic dialogues, essential phrases, and cultural etiquette
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {SITUATION_CATEGORIES.map((cat) => {
              const isSelected = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between h-32 ${
                    isSelected
                      ? 'bg-amber-900 text-white border-amber-950 shadow-md transform -translate-y-0.5'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-amber-300 hover:bg-amber-50/40 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-2 rounded-xl ${
                        isSelected ? 'bg-amber-800 text-amber-200' : 'bg-amber-100/60 text-amber-900'
                      }`}
                    >
                      {getIcon(cat.iconName)}
                    </div>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider ${
                        isSelected ? 'text-amber-300' : 'text-stone-400'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <p
                      className={`font-kannada text-xs font-bold ${
                        isSelected ? 'text-amber-200' : 'text-amber-800'
                      }`}
                    >
                      {cat.kannadaTitle}
                    </p>
                    <p className="text-sm font-bold truncate mt-0.5">{cat.title}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Selected Situation Details Banner */}
      {!searchQuery && (
        <section className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-kannada text-xl font-bold text-amber-900">
                  {selectedCategory.kannadaTitle}
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <h2 className="text-xl font-bold text-stone-900">{selectedCategory.title}</h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">{selectedCategory.subtitle}</p>
              <p className="text-sm text-stone-600 mt-2 max-w-3xl">
                {selectedCategory.description}
              </p>
            </div>

            <button
              onClick={() => onOpenRoleplay(selectedCategory)}
              className="px-4 py-2.5 bg-amber-800 hover:bg-amber-900 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <span>Practice in AI Roleplay</span>
              <span className="text-amber-300 font-bold">→</span>
            </button>
          </div>

          {/* Cultural Etiquette Callout */}
          <div className="mt-4 p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Karnataka Local Etiquette & Nuance:
              </span>
              <p className="text-xs text-stone-700 mt-0.5 leading-relaxed">
                {selectedCategory.localCultureTip}
              </p>
            </div>
          </div>

          {/* Key Vocabulary Pills */}
          <div className="mt-5">
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-2">
              Key Domain Vocabulary:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {selectedCategory.keyVocabulary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-stone-50 border border-stone-200/80 rounded-xl flex flex-col"
                >
                  <span className="font-kannada font-bold text-amber-900 text-sm">
                    {item.kannada}
                  </span>
                  <span className="text-[11px] text-stone-500 italic">
                    {item.transliteration}
                  </span>
                  <span className="text-xs text-stone-700 font-medium">
                    {item.english}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Phrases List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900">
            {searchQuery ? `Search Results (${filteredPhrases.length})` : 'Situational Pocket Phrases'}
          </h3>
          <span className="text-xs text-stone-500">
            Tap audio to hear native pronunciation · Tap card to show full-screen
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPhrases.map((phrase) => {
            const isPlaying = activeAudioPhraseId === phrase.id;
            return (
              <div
                key={phrase.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                    <span className="font-medium text-amber-800">
                      {phrase.context}
                    </span>
                    <span className="capitalize px-2 py-0.5 bg-stone-100 rounded-md text-[10px]">
                      {phrase.politenessLevel}
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="font-kannada text-xl sm:text-2xl font-bold text-stone-900 select-all">
                      {phrase.kannada}
                    </p>
                    <p className="text-sm font-semibold text-amber-900 mt-1 select-all">
                      {phrase.transliteration}
                    </p>
                    <p className="text-xs text-stone-600 mt-1">
                      {phrase.english}
                    </p>
                  </div>

                  {phrase.breakdown && (
                    <div className="mt-3 pt-2 border-t border-stone-100 flex flex-wrap gap-2 text-[11px]">
                      {phrase.breakdown.map((b, bi) => (
                        <span key={bi} className="text-stone-500">
                          <strong className="text-stone-800 font-kannada">{b.word}</strong>: {b.meaning}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => handlePlayAudio(phrase)}
                    disabled={isPlaying}
                    aria-label={`Listen to phrase ${phrase.english}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-amber-600' : ''}`} />
                    <span>{isPlaying ? 'Playing...' : 'Pronounce'}</span>
                  </button>

                  <button
                    onClick={() => onShowPocketCard(phrase)}
                    className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 font-medium transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Show Driver / Local</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Realistic Real-World Dialogues Walkthrough */}
      {!searchQuery && selectedCategory.dialogues.length > 0 && (
        <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Real-World Conversation Scenario
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">
              {selectedCategory.dialogues[0].title}
            </h3>
            <p className="text-xs text-stone-500">
              {selectedCategory.dialogues[0].context} · {selectedCategory.dialogues[0].difficulty}
            </p>
          </div>

          <div className="space-y-3">
            {selectedCategory.dialogues[0].steps.map((step, idx) => {
              const isLearner = step.speaker === 'learner';
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col gap-1 ${
                    isLearner
                      ? 'bg-amber-50/50 border-amber-200/80 ml-0 sm:ml-4'
                      : 'bg-stone-50 border-stone-200 mr-0 sm:mr-4'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-bold ${
                        isLearner ? 'text-amber-900' : 'text-stone-700'
                      }`}
                    >
                      {step.speakerRole} ({isLearner ? 'You' : 'Local'})
                    </span>
                    <button
                      onClick={() =>
                        speakKannada(step.kannada)
                      }
                      aria-label="Play dialogue line audio"
                      className="text-stone-400 hover:text-stone-700 p-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="font-kannada text-base font-bold text-stone-900">
                    {step.kannada}
                  </p>
                  <p className="text-xs font-medium text-stone-600">
                    {step.transliteration}
                  </p>
                  <p className="text-xs text-stone-500 italic">
                    "{step.english}"
                  </p>

                  {step.tip && (
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-800">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>{step.tip}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
