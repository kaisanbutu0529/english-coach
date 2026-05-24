'use client';

import { StudyMode } from '@/lib/types';

interface ResultScreenProps {
  studyMode: StudyMode;
  score: number;
  total: number;
  mistakeCount: number;
  onNormalMode: () => void;
  onRetry: () => void;
}

export default function ResultScreen({
  studyMode,
  score,
  total,
  mistakeCount,
  onNormalMode,
  onRetry,
}: ResultScreenProps) {
  const isReviewClear = studyMode === 'review' && score === total;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-xl w-full text-center">
        <div className="text-5xl mb-4">{isReviewClear ? '🎉' : '📝'}</div>
        <h1 className="text-3xl font-bold mb-4">
          {isReviewClear ? '復習クリア！' : 'テスト結果'}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          {isReviewClear
            ? '苦手問題をすべて解消しました！'
            : '今回のセッションが終了しました。'}
        </p>
        <p className="text-2xl font-bold mb-6">
          {score} / {total} 点
        </p>

        <div className="text-left bg-gray-50 rounded-2xl p-4 mb-6">
          <p className="font-bold mb-3">現在の苦手問題数: {mistakeCount}</p>
          <h2 className="font-bold mb-2 text-sm text-gray-700">AIコーチのアドバイス</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            <li>毎日15分でも英語に触れる習慣をつけましょう。</li>
            <li>
              間違えた問題は「復習モード」で定期的に解き直すのが効果的です。
            </li>
            <li>
              長文や教科書表現は、口に出して音読すると定着しやすくなります。
            </li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onNormalMode}
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-300 transition-colors"
          >
            通常モードに戻る
          </button>
          <button
            onClick={onRetry}
            className="flex-1 bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-colors"
          >
            もう一度挑戦
          </button>
        </div>
      </div>
    </div>
  );
}
