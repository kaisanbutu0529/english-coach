'use client';

import { StudyMode } from '@/lib/types';

interface HeaderProps {
  studyMode: StudyMode;
  mistakeCount: number;
  streak: number;
  score: number;
  current: number;
  total: number;
  onNormalMode: () => void;
  onReviewMode: () => void;
}

export default function Header({
  studyMode,
  mistakeCount,
  streak,
  score,
  current,
  total,
  onNormalMode,
  onReviewMode,
}: HeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onNormalMode}
          className={`px-3 py-1 rounded-xl font-medium text-sm transition-colors ${
            studyMode === 'normal' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          通常
        </button>
        <button
          onClick={onReviewMode}
          className={`px-3 py-1 rounded-xl font-medium text-sm transition-colors ${
            studyMode === 'review' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          復習 ({mistakeCount})
        </button>
      </div>

      <div className="text-right md:text-center">
        <h1 className="text-2xl font-bold text-gray-800">高校1年 英語AIコーチ</h1>
        <p className="text-sm text-gray-500 mt-0.5">高1・1学期 中間テスト対策</p>
      </div>

      <div className="flex gap-2 items-center self-end md:self-auto flex-wrap justify-end">
        <div className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-xl font-bold">
          🔥 連続: {streak}
        </div>
        <div className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-xl font-bold">
          Score: {score}
        </div>
        <div className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-xl font-bold">
          {current + 1} / {total}
        </div>
      </div>
    </div>
  );
}
