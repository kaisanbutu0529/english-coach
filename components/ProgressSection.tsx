'use client';

import { DAILY_GOAL } from '@/lib/constants';

interface ProgressSectionProps {
  completed: number;
  aiComment: string;
}

export default function ProgressSection({ completed, aiComment }: ProgressSectionProps) {
  const progressPct = Math.min((completed / DAILY_GOAL) * 100, 100);

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-5">
      <div className="flex justify-between items-center mb-2">
        <p className="font-bold text-purple-900 text-sm">今日の学習状況</p>
        <p className="text-sm font-bold text-purple-900">
          {completed} / {DAILY_GOAL} 問
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
        <div
          className="bg-purple-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="bg-white rounded-xl p-3 text-sm border border-purple-100">
        <p className="font-bold mb-1 text-purple-700">AI先生コメント</p>
        <p className="text-gray-700">{aiComment}</p>
      </div>
    </div>
  );
}
