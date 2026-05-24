export type StudyMode = 'normal' | 'review' | 'vocabulary';

export interface Question {
  type: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}
