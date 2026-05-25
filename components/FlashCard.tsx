'use client';

import { useState } from 'react';
import { useSpeech } from '@/components/useSpeech';
import { Question } from '@/lib/types';

interface FlashCardProps {
  questions: Question[];
  onFinish: (correct: number) => void;
  onHome: () => void;
}

export default function FlashCard({ questions, onFinish, onHome }: FlashCardProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const { speak } = useSpeech();

  const q = questions[index];
  const total = questions.length;
  const done = index >= total;

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-3xl font-black text-white mb-6">単語帳完了！</h2>
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
          <div className="bg-green-500/20 border border-green-400/40 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-white">{known}</p>
            <p className="text-green-300 text-sm">覚えた！</p>
          </div>
          <div className="bg-red-500/20 border border-red-400/40 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-white">{unknown}</p>
            <p className="text-red-300 text-sm">もう一度</p>
          </div>
        </div>
        <div className="flex gap-3 w-full max-w-xs">
          <button onClick={onHome} className="flex-1 bg-white/10 text-white py-3 rounded-2xl font-black border border-white/20">ホームへ</button>
          <button onClick={() => { setIndex(0); setFlipped(false); setKnown(0); setUnknown(0); }} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-black">もう一度</button>
        </div>
      </div>
    );
  }

  // 単語と意味を分離
  const word = q.question.replace(/「|」|の意味は？/g, '').trim();
  const meaning = q.answer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col p-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <button onClick={onHome} className="text-white/60 text-sm font-bold">← ホーム</button>
        <span className="text-white/60 text-sm font-bold">{index + 1} / {total}</span>
      </div>

      {/* プログレス */}
      <div className="w-full bg-white/20 rounded-full h-2 mb-8">
        <div className="bg-purple-400 h-2 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
      </div>

      {/* カード */}
      <div
        className="flex-1 flex items-center justify-center cursor-pointer"
        onClick={() => setFlipped(f => !f)}
      >
        <div className={`w-full max-w-sm rounded-3xl p-8 text-center border transition-all duration-300 ${
          flipped
            ? 'bg-purple-500/30 border-purple-400/50'
            : 'bg-white/10 border-white/20'
        }`}>
          {!flipped ? (
            <>
              <p className="text-white/50 text-sm mb-4">英語</p>
              <p className="text-4xl font-black text-white mb-4">{word}</p>
              <button
                onClick={e => { e.stopPropagation(); speak(word); }}
                className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold"
              >
                🔊 発音を聞く
              </button>
              <p className="text-white/40 text-xs mt-6">タップして意味を確認</p>
            </>
          ) : (
            <>
              <p className="text-white/50 text-sm mb-4">意味</p>
              <p className="text-4xl font-black text-white mb-2">{meaning}</p>
              {q.examples && (
                <div className="mt-4 text-left space-y-1">
                  {q.examples.slice(0, 2).map((ex, i) => (
                    <p key={i} className="text-white/60 text-xs">• {ex}</p>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ボタン */}
      {flipped && (
        <div className="flex gap-3 pb-8 pt-4">
          <button
            onClick={() => { setUnknown(u => u + 1); setFlipped(false); setIndex(i => i + 1); onFinish(known); }}
            className="flex-1 bg-red-500/30 border border-red-400/50 text-white py-4 rounded-2xl font-black text-lg"
          >
            😅 もう一度
          </button>
          <button
            onClick={() => { setKnown(k => k + 1); setFlipped(false); setIndex(i => i + 1); }}
            className="flex-1 bg-green-500/30 border border-green-400/50 text-white py-4 rounded-2xl font-black text-lg"
          >
            ✅ 覚えた！
          </button>
        </div>
      )}
    </div>
  );
}
