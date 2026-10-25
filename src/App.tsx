import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { SituationsView } from './components/SituationsView';
import { RoleplaySimulator } from './components/RoleplaySimulator';
import { AksharamaleStudio } from './components/AksharamaleStudio';
import { PracticeArena } from './components/PracticeArena';
import { SmartTranslator } from './components/SmartTranslator';
import { PocketCardModal } from './components/PocketCardModal';
import { Phrase, SituationCategory } from './data/situations';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('situations');
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);
  const [pocketCardPhrase, setPocketCardPhrase] = useState<Phrase | null>(null);

  const handleOpenRoleplayForCategory = (_category: SituationCategory) => {
    setActiveTab('roleplay');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/20 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* Top Navigation */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTranslator={() => setIsTranslatorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'situations' && (
          <SituationsView
            onShowPocketCard={(p) => setPocketCardPhrase(p)}
            onOpenRoleplay={handleOpenRoleplayForCategory}
          />
        )}

        {activeTab === 'roleplay' && <RoleplaySimulator />}

        {activeTab === 'script' && <AksharamaleStudio />}

        {activeTab === 'quiz' && <PracticeArena />}
      </main>

      {/* Smart Situational Translator Modal */}
      <SmartTranslator
        isOpen={isTranslatorOpen}
        onClose={() => setIsTranslatorOpen(false)}
        onShowPocketCard={(p) => {
          setIsTranslatorOpen(false);
          setPocketCardPhrase(p);
        }}
      />

      {/* Full-Screen Pocket Card Modal */}
      <PocketCardModal
        phrase={pocketCardPhrase}
        onClose={() => setPocketCardPhrase(null)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200/80 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-kannada font-bold text-amber-900 text-sm">
              ಸಿರಿಗನ್ನಡಂ ಗೆಲ್ಗೆ, ಸಿರಿಗನ್ನಡಂ ಬಾಳ್ಗೆ
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Kannada Setu Language Companion</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('situations')}
              className="hover:text-stone-900 transition-colors"
            >
              All 6 Situations
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className="hover:text-stone-900 transition-colors"
            >
              Aksharamale
            </button>
            <button
              onClick={() => setIsTranslatorOpen(true)}
              className="text-amber-800 font-medium hover:text-amber-950 transition-colors"
            >
              Situational Mentor
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
