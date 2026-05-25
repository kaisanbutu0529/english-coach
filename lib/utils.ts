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

// ─── 写真OCRテキストからリスニング問題を生成 ──────────────────
const JAPANESE_MEANINGS: Record<string, string[]> = {
  // よく出る単語の訳候補
  play: ['する・演奏する', '勉強する', '食べる', '寝る'],
  study: ['勉強する', '遊ぶ', '食べる', '走る'],
  like: ['好きだ', '嫌いだ', '知る', '忘れる'],
  go: ['行く', '来る', '帰る', '止まる'],
  come: ['来る', '行く', '戻る', '出る'],
  eat: ['食べる', '飲む', '作る', '買う'],
  drink: ['飲む', '食べる', '持つ', '渡す'],
  make: ['作る', '壊す', '買う', '売る'],
  want: ['欲しい', '嫌だ', '持っている', '忘れた'],
  have: ['持っている', '失う', '買う', '渡す'],
};

export const generateListeningFromText = (text: string): Question[] => {
  const sentences = text
    .replace(/\r/g, ' ').replace(/\n+/g, ' ')
    .split(/[.!?。！？]/).map(s => s.trim()).filter(s => s.length > 5);

  const wordQuestions: Question[] = [];
  const sentenceQuestions: Question[] = [];

  // 単語リスニング問題（英語の重要単語を抽出）
  const allWords = Array.from(new Set(
    (text.match(/[A-Za-z']+/g) ?? [])
      .filter(w => w.length >= 4 && !STOP_WORDS.has(w.toLowerCase()))
  ));

  allWords.slice(0, 3).forEach(word => {
    const meaning = JAPANESE_MEANINGS[word.toLowerCase()]?.[0];
    if (meaning) {
      const wrongs = JAPANESE_MEANINGS[word.toLowerCase()]?.slice(1) ?? ['する', '行く', '食べる'];
      wordQuestions.push({
        type: 'AI生成リスニング（単語）',
        question: '音声を聞いて、意味を選びなさい。',
        listenText: word,
        choices: shuffleArray([meaning, ...wrongs]).slice(0, 4),
        answer: meaning,
        explanation: `${word} = ${meaning}`,
        isListening: true,
      });
    } else {
      // 訳がない場合はスペルを聞き取る問題
      const fakeWords = [word + 's', word.slice(0, -1) + 'ed', word + 'ing', word + 'er']
        .filter(w => w !== word).slice(0, 3);
      wordQuestions.push({
        type: 'AI生成リスニング（単語）',
        question: '音声を聞いて、聞こえた単語を選びなさい。',
        listenText: word,
        choices: shuffleArray([word, ...fakeWords]),
        answer: word,
        explanation: `正しいスペルは「${word}」です。`,
        isListening: true,
      });
    }
  });

  // 英文リスニング問題
  sentences.slice(0, 3).forEach(sentence => {
    const clean = sentence.replace(/\s+/g, ' ').trim();
    if (clean.length < 10) return;

    // 簡単な日本語要約を生成
    const hasEveryDay = /every day/i.test(clean);
    const hasYesterday = /yesterday/i.test(clean);
    const hasNow = /\bnow\b/i.test(clean);
    const timeStr = hasEveryDay ? '毎日' : hasYesterday ? '昨日' : hasNow ? '今' : '';

    const subject = clean.match(/^(I|He|She|They|We|Tom|Ken|My \w+)/i)?.[0] ?? '';
    const subjectJP = subject.toLowerCase() === 'i' ? '私' : subject.toLowerCase() === 'he' ? '彼' : subject.toLowerCase() === 'she' ? '彼女' : subject;

    sentenceQuestions.push({
      type: 'AI生成リスニング（英文）',
      question: '音声を聞いて、内容に合うものを選びなさい。',
      listenText: clean,
      choices: shuffleArray([
        `${subjectJP}が${timeStr}何かをする内容`,
        '全く関係のない内容',
        '反対の意味の内容',
        '別の人物の話',
      ]),
      answer: `${subjectJP}が${timeStr}何かをする内容`,
      explanation: `本文: 「${clean}」`,
      isListening: true,
    });
  });

  const all = [...wordQuestions, ...sentenceQuestions].slice(0, 5);
  if (all.length > 0) return all;

  // フォールバック
  return [{
    type: 'AI生成リスニング（英文）',
    question: '音声を聞いて、内容に合うものを選びなさい。',
    listenText: text.trim().slice(0, 60),
    choices: ['英文の内容理解', '数学の計算', '理科の実験', '地理の学習'],
    answer: '英文の内容理解',
    explanation: '貼り付けられた英文から生成したリスニング問題です。',
    isListening: true,
  }];
};
