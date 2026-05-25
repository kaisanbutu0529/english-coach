export type StudyMode = 'normal' | 'review' | 'vocabulary' | 'listening' | 'flashcard' | 'typing';

export interface Question {
  type: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
  examples?: string[];    // 例文3つ
  listenText?: string;
  isListening?: boolean;
  isBoss?: boolean;       // ボス問題フラグ
}

// バッジ定義
export interface Badge {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  unlocked: boolean;
  unlockedAt?: string;
}

// 学習記録
export interface StudyRecord {
  date: string;         // YYYY-MM-DD
  count: number;
  correct: number;
}
