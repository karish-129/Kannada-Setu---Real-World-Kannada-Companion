import React, { useState } from 'react';
import { Volume2, Award, Zap, RefreshCw, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import {
  generateSituationalQuestions,
  calculateMasteryLevel,
  QuizQuestion,
} from '../utils/quiz-engine';
import { speakKannada } from '../utils/speech';

export const PracticeArena: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    generateSituationalQuestions()
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);

  const currentQ = questions[currentIndex];
  const mastery = calculateMasteryLevel(score, totalAnswered);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    const newQs = generateSituationalQuestions(filter);
    setQuestions(newQs);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    setTotalAnswered((prev) => prev + 1);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Regenerate fresh batch
      const newBatch = generateSituationalQuestions(selectedFilter);
      setQuestions(newBatch);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleResetQuiz = () => {
    const newQs = generateSituationalQuestions(selectedFilter);
    setQuestions(newQs);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setTotalAnswered(0);
    setStreak(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Stats bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Situational Practice & Quiz Arena
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Test your real-world Kannada reflexes across daily Karnataka scenarios.
          </p>
        </div>

        {/* Gamification Strip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-amber-50 border border-amber-200 rounded-xl">
            <Zap className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-bold text-amber-950">
              Streak: {streak} 🔥
            </span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-200 rounded-xl shadow-2xs">
            <Award className="w-4 h-4 text-amber-800" />
            <span className="text-xs font-bold text-stone-800 tabular-nums">
              Score: {score}/{totalAnswered} ({mastery.percentage}%)
            </span>
          </div>

          <button
            onClick={handleResetQuiz}
            aria-label="Reset score and practice session"
            className="p-2 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'all', label: 'All Situations' },
          { id: 'transportation', label: 'Transportation' },
          { id: 'shopping', label: 'Shopping' },
          { id: 'healthcare', label: 'Healthcare' },
          { id: 'workplaces', label: 'Workplaces' },
          { id: 'travelling', label: 'Travelling' },
          { id: 'education', label: 'Education' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => handleFilterChange(f.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              selectedFilter === f.id
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Question Canvas Card */}
      {currentQ && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm max-w-3xl mx-auto space-y-6">
          {/* Question Meta */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              {currentQ.situationTitle} Scenario
            </span>
            <span className="text-xs text-stone-400 font-mono tabular-nums">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Context & Prompt */}
          <div>
            <p className="text-xs text-stone-500 font-medium">
              Context: {currentQ.scenarioContext}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              {currentQ.prompt}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnClass = 'border-stone-200 hover:border-amber-400 hover:bg-amber-50/30';

              if (isAnswerSubmitted) {
                if (opt.isCorrect) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  btnClass = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  btnClass = 'opacity-50 border-stone-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${btnClass}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div>
                      <p className="font-kannada text-lg font-bold text-stone-900">
                        {opt.kannada}
                      </p>
                      <p className="text-xs font-medium text-stone-600">
                        {opt.transliteration}
                      </p>
                      <p className="text-xs text-stone-500">
                        "{opt.english}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakKannada(opt.kannada);
                      }}
                      className="p-1.5 text-stone-400 hover:text-amber-800 transition-colors"
                      aria-label="Listen to option audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    {isAnswerSubmitted && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    )}
                    {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Callout after answer */}
          {isAnswerSubmitted && selectedOption !== null && (
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                currentQ.options[selectedOption].isCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}
            >
              <span className="font-bold block mb-1">
                {currentQ.options[selectedOption].isCorrect ? '✅ Well done!' : '💡 Learning Opportunity:'}
              </span>
              <p>{currentQ.options[selectedOption].explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswerSubmitted && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>
                  {currentIndex < questions.length - 1 ? 'Next Question' : 'Practice More'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mastery Badge Card */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Your Spoken Kannada Status
          </span>
          <p className="font-kannada text-lg font-bold text-amber-900 mt-1">
            {mastery.kannadaTitle}
          </p>
          <p className="text-sm font-semibold text-stone-800">
            {mastery.level}
          </p>
        </div>

        <div className="w-full sm:w-48 text-right">
          <div className="flex justify-between text-xs font-medium text-stone-500 mb-1">
            <span>Accuracy</span>
            <span className="font-mono tabular-nums">{mastery.percentage}%</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-800 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, mastery.percentage)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
