'use client';

import { Badge } from '@/lib/types';

interface BadgeScreenProps {
  badges: Badge[];
  totalCorrect: number;
  studyStreak: number;
  onClose: () => void;
}

export default function BadgeScreen({ badges, totalCorrect, studyStreak, onClose }: BadgeScreenProps) {
  const unlocked = badges.filter(b => b.unlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col p-4">
      <div className="flex items-center justify-between pt-4 mb-6">
        <button onClick={onClose} className="text-white/60 text-sm font-bold">← 戻る</button>
        <h2 className="text-xl font-black text-white">🏅 バッジ</h2>
        <span className="text-white/60 text-sm">{unlocked}/{badges.length}</span>
      </div>

      {/* スタッツ */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/20">
          <p className="text-3xl font-black text-white">{totalCorrect}</p>
          <p className="text-white/60 text-xs">累計正解数</p>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/20">
          <p className="text-3xl font-black text-white">{studyStreak}日</p>
          <p className="text-white/60 text-xs">連続学習</p>
        </div>
      </div>

      {/* バッジ一覧 */}
      <div className="grid grid-cols-3 gap-3">
        {badges.map(badge => (
          <div
            key={badge.id}
            className={`rounded-2xl p-3 text-center border transition-all ${
              badge.unlocked
                ? 'bg-yellow-500/20 border-yellow-400/50'
                : 'bg-white/5 border-white/10 opacity-40'
            }`}
          >
            <div className={`text-3xl mb-1 ${!badge.unlocked ? 'grayscale' : ''}`}>
              {badge.unlocked ? badge.emoji : '🔒'}
            </div>
            <p className={`text-xs font-black ${badge.unlocked ? 'text-white' : 'text-white/40'}`}>
              {badge.name}
            </p>
            {badge.unlocked && badge.unlockedAt && (
              <p className="text-yellow-300/70 text-xs mt-0.5">{badge.unlockedAt}</p>
            )}
            {!badge.unlocked && (
              <p className="text-white/30 text-xs mt-0.5">{badge.desc}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
