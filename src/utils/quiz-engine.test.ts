import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateSituationalQuestions,
  calculateMasteryLevel,
  searchKnowledgeBase,
} from './quiz-engine';

test('generateSituationalQuestions returns questions across all 6 situations by default', () => {
  const questions = generateSituationalQuestions();
  assert.ok(questions.length >= 6, 'Should generate at least 6 questions');

  // Check that each question has at least one correct option
  for (const q of questions) {
    const correctOptions = q.options.filter((o) => o.isCorrect);
    assert.equal(correctOptions.length, 1, `Question ${q.id} must have exactly one correct answer`);
    assert.ok(q.prompt.length > 0, 'Question prompt should not be empty');
  }
});

test('generateSituationalQuestions filters by category when specified', () => {
  const transportQuestions = generateSituationalQuestions('transportation');
  assert.ok(transportQuestions.length > 0);
  for (const q of transportQuestions) {
    assert.equal(q.situationId, 'transportation');
  }
});

test('calculateMasteryLevel calculates accurate tier and percentage', () => {
  const beginner = calculateMasteryLevel(2, 3);
  assert.equal(beginner.level, 'Curious Beginner');
  assert.equal(beginner.percentage, 67);

  const explorer = calculateMasteryLevel(8, 10);
  assert.equal(explorer.level, 'Confident Explorer');
  assert.equal(explorer.percentage, 80);

  const fluent = calculateMasteryLevel(15, 16);
  assert.equal(fluent.level, 'Fluent Communicator');
  assert.equal(fluent.percentage, 94);
});

test('searchKnowledgeBase finds phrases by English, Kannada or transliteration keywords', () => {
  const ticketSearch = searchKnowledgeBase('ticket');
  assert.ok(ticketSearch.length > 0, 'Should find ticket-related phrases');
  assert.ok(ticketSearch.some((p) => p.transliteration.toLowerCase().includes('ticket')));

  const autoSearch = searchKnowledgeBase('ಮೀಟರ್');
  assert.ok(autoSearch.length > 0, 'Should find Kannada script matches');

  const emptySearch = searchKnowledgeBase('xyznonexistent123');
  assert.equal(emptySearch.length, 0);
});
