import { SITUATION_CATEGORIES, Phrase } from '../data/situations';

export interface QuizQuestion {
  id: string;
  situationId: string;
  situationTitle: string;
  prompt: string;
  scenarioContext: string;
  options: {
    kannada: string;
    transliteration: string;
    english: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface QuizState {
  score: number;
  totalAnswered: number;
  streak: number;
  bestStreak: number;
  history: {
    questionId: string;
    wasCorrect: boolean;
    selectedOptionIndex: number;
  }[];
}

/**
 * Generates an curated set of situational quiz questions
 */
export function generateSituationalQuestions(categoryFilter?: string): QuizQuestion[] {
  const categories = categoryFilter && categoryFilter !== 'all'
    ? SITUATION_CATEGORIES.filter((c) => c.id === categoryFilter)
    : SITUATION_CATEGORIES;

  const questions: QuizQuestion[] = [];

  for (const cat of categories) {
    if (cat.phrases.length >= 2) {
      // Pick primary phrase
      const primary = cat.phrases[0];
      const other1 = cat.phrases[1];
      const other2 = cat.phrases[2] || cat.phrases[0];

      questions.push({
        id: `q-${cat.id}-1`,
        situationId: cat.id,
        situationTitle: cat.title,
        prompt: `How do you say: "${primary.english}"?`,
        scenarioContext: primary.context,
        options: [
          {
            kannada: primary.kannada,
            transliteration: primary.transliteration,
            english: primary.english,
            isCorrect: true,
            explanation: `Correct! "${primary.kannada}" (${primary.transliteration}) is used for ${primary.context.toLowerCase()}.`,
          },
          {
            kannada: other1.kannada,
            transliteration: other1.transliteration,
            english: other1.english,
            isCorrect: false,
            explanation: `Not quite. This means "${other1.english}".`,
          },
          {
            kannada: other2.kannada,
            transliteration: other2.transliteration,
            english: other2.english,
            isCorrect: false,
            explanation: `Incorrect. This phrase is: "${other2.english}".`,
          },
        ].sort(() => 0.5 - Math.random()),
      });
    }

    // Add a second question if dialogues exist
    if (cat.dialogues.length > 0 && cat.dialogues[0].steps.length >= 2) {
      const step = cat.dialogues[0].steps[0];
      questions.push({
        id: `q-${cat.id}-dialogue`,
        situationId: cat.id,
        situationTitle: cat.title,
        prompt: `In this situation: "${cat.dialogues[0].title}", what is an authentic greeting?`,
        scenarioContext: cat.dialogues[0].context,
        options: [
          {
            kannada: step.kannada,
            transliteration: step.transliteration,
            english: step.english,
            isCorrect: true,
            explanation: `Spot on! "${step.kannada}" starts the dialogue respectfully.`,
          },
          {
            kannada: 'ಚಿಲ್ಲರೆ ಇಲ್ಲ ಬೇಡ',
            transliteration: 'Chillare illa beda',
            english: 'No change, do not want',
            isCorrect: false,
            explanation: 'This is not an appropriate opening greeting.',
          },
          {
            kannada: 'ಅರ್ಧ ಕೆಜಿ ಕೊಡಿ',
            transliteration: 'Ardha kg kodi',
            english: 'Please give half kg',
            isCorrect: false,
            explanation: 'This is used for weighing vegetables, not general opening dialogue.',
          },
        ].sort(() => 0.5 - Math.random()),
      });
    }
  }

  return questions;
}

/**
 * Calculates current user mastery rank based on points & streak
 */
export function calculateMasteryLevel(score: number, totalAnswered: number): {
  level: string;
  kannadaTitle: string;
  badgeColor: string;
  percentage: number;
  nextThreshold: number;
} {
  const percentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

  if (score >= 12 && percentage >= 80) {
    return {
      level: 'Fluent Communicator',
      kannadaTitle: 'ಕನ್ನಡ ಪ್ರವೀಣ (Kannada Praveena)',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      percentage,
      nextThreshold: 20,
    };
  }
  if (score >= 6) {
    return {
      level: 'Confident Explorer',
      kannadaTitle: 'ಕನ್ನಡ ಸಾಹಸಿ (Kannada Saahasi)',
      badgeColor: 'text-amber-800 bg-amber-50 border-amber-200',
      percentage,
      nextThreshold: 12,
    };
  }
  return {
    level: 'Curious Beginner',
    kannadaTitle: 'ಕನ್ನಡ ಆರಂಭಿಕ (Kannada Aarambhika)',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    percentage,
    nextThreshold: 6,
  };
}

/**
 * Search across all situational phrases and vocabulary
 */
export function searchKnowledgeBase(query: string): Phrase[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const results: Phrase[] = [];
  for (const cat of SITUATION_CATEGORIES) {
    for (const phrase of cat.phrases) {
      if (
        phrase.kannada.toLowerCase().includes(trimmed) ||
        phrase.transliteration.toLowerCase().includes(trimmed) ||
        phrase.english.toLowerCase().includes(trimmed) ||
        phrase.context.toLowerCase().includes(trimmed)
      ) {
        results.push(phrase);
      }
    }
  }
  return results;
}
