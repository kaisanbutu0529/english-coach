'use client';

import { Question } from '@/lib/types';

interface QuizAreaProps {
  question: Question;
  selected: string;
  showAnswer: boolean;
  mockMode: boolean;
  onSelect: (choice: string) => void;
  onCheckAnswer: () => void;
  onShowHint: () => void;
  onNextQuestion: () => void;
  onAddToReview: () => void;
}

export default function QuizArea({
  question,
  selected,
  showAnswer,
  mockMode,
  onSelect,
  onCheckAnswer,
  onShowHint,
  onNextQuestion,
  onAddToReview,
}: QuizAreaProps) {
  const isCorrect = selected === question.answer;

  return (
    <>
      {/* 問題タイプ */}
      <div className="mb-2">
        <span className="text-xs bg-gray-800 text-white px-3 py-1 rounded-full font-bold">
          {question.type}
        </span>
      </div>

      {/* 問題文 */}
      <h2 className="text-xl font-bold mb-6 whitespace-pre-line leading-relaxed text-gray-800">
        {question.question}
      </h2>

      {/* 選択肢 */}
      <div className="grid gap-3 mb-6">
        {question.choices.map((choice) => (
          <button
            key={choice}
            disabled={showAnswer}
            onClick={() => onSelect(choice)}
            className={`p-4 rounded-2xl border text-left transition text-sm font-medium ${
              selected === choice
                ? 'border-black bg-gray-100 font-bold'
                : 'border-gray-300 bg-white hover:bg-gray-50'
            } disabled:opacity-80`}
          >
            {choice}
          </button>
        ))}
      </div>

      {/* アクションボタン */}
      {!showAnswer ? (
        <div className="flex gap-3">
          <button
            onClick={onShowHint}
            disabled={mockMode}
            className="bg-gray-200 text-gray-800 px-5 py-3 rounded-2xl font-bold text-sm disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-300 transition-colors"
          >
            ヒント
          </button>
          <button
            onClick={onCheckAnswer}
            disabled={!selected}
            className="flex-1 bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm disabled:bg-gray-300 hover:bg-gray-800 transition-colors"
          >
            回答する
          </button>
        </div>
      ) : (
        <div>
          {/* 正誤フィードバック */}
          <div
            className={`p-4 rounded-2xl mb-4 border ${
              isCorrect
                ? 'bg-green-50 border-green-200 text-green-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <p className="font-bold text-lg mb-1">{isCorrect ? '🎉 正解！' : '❌ 不正解...'}</p>
            <p className="font-semibold text-sm">正解: {question.answer}</p>
            <p className="mt-2 text-xs opacity-90 leading-relaxed">解説: {question.explanation}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onAddToReview}
              className="bg-gray-200 text-gray-800 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-300 transition-colors"
            >
              復習登録
            </button>
            <button
              onClick={onNextQuestion}
              className="flex-1 bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-colors"
            >
              次の問題へ
            </button>
          </div>
        </div>
      )}
    </>
  );
}
