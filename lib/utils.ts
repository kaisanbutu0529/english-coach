import { Question } from './types';
import { STOP_WORDS, DECOY_WORDS } from './constants';

export const shuffleArray = <T>(array: T[]): T[] => {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
};

export const prepareQuestions = (questions: Question[], useShuffle = false): Question[] => {
  const cloned = questions.map((item) => ({
    ...item,
    choices: [...item.choices],
  }));
  if (!useShuffle) return cloned;
  return shuffleArray(cloned).map((item) => ({
    ...item,
    choices: shuffleArray(item.choices),
  }));
};

const splitSentences = (text: string): string[] =>
  text
    .replace(/\r/g, ' ')
    .replace(/\n+/g, ' ')
    .split(/[.!?。！？]/)
    .map((s) => s.trim())
    .filter(Boolean);

const pickBlankWord = (sentence: string): string | null => {
  const words = sentence.match(/[A-Za-z']+/g) ?? [];
  const candidates = Array.from(new Set(words))
    .filter((word) => word.length >= 4 && !STOP_WORDS.has(word.toLowerCase()))
    .sort((a, b) => b.length - a.length);
  return candidates[0] ?? null;
};

export const generateQuestionsFromText = (text: string): Question[] => {
  const sentences = splitSentences(text);
  const generated = sentences
    .slice(0, 6)
    .map((sentence) => {
      const clean = sentence.replace(/\s+/g, ' ').trim();
      const answer = pickBlankWord(clean);
      if (!answer) return null;

      const blanked = clean.replace(new RegExp(`\\b${answer}\\b`, 'i'), '_____');
      const sentenceWords = Array.from(
        new Set((clean.match(/[A-Za-z']+/g) ?? []).filter((w) => w.length >= 4))
      );
      const decoyPool = [...sentenceWords.filter((w) => w.toLowerCase() !== answer.toLowerCase()), ...DECOY_WORDS].filter(
        (word, idx, arr) => arr.findIndex((x) => x.toLowerCase() === word.toLowerCase()) === idx
      );

      return {
        type: 'AI生成（穴埋め）',
        question: `次の文の空欄に入る最も適切な語を選びなさい。\n${blanked}.`,
        choices: shuffleArray([answer, ...shuffleArray(decoyPool).slice(0, 3)]),
        answer,
        explanation: `本文中の元の文は「${clean}.」です。`,
      } satisfies Question;
    })
    .filter((q): q is Question => q !== null)
    .slice(0, 5);

  if (generated.length > 0) return generated;

  return [
    {
      type: 'AI生成（読解）',
      question: `以下の本文に最も関係が深いものを選びなさい。\n「${text.trim().slice(0, 70)}...」`,
      choices: ['英文の内容理解', '数学の計算', '理科の実験', '地理の地図読み取り'],
      answer: '英文の内容理解',
      explanation: '貼り付けられた英文をもとにした基本的な内容把握問題です。',
    },
  ];
};
