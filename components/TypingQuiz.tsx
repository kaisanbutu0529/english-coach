'use client';

import { useEffect, useRef, useState } from 'react';
import { useSpeech } from '@/components/useSpeech';
import { Question } from '@/lib/types';

interface TypingQuizProps {
  questions: Question[];
  onFinish: (correct: number) => void;
  onHome: () => void;
}

export default function TypingQuiz({ questions, onFinish, onHome }: TypingQuizProps) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [played, setPlayed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { speak, speaking } = useSpeech();

  const q = questions[index];
  const done = index >= questions.length;

  useEffect(() => {
    if (!done) { setInput(''); setResult(null); setPlayed(false); inputRef.current?.focus(); }
  }, [index, done]);

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">⌨️</div>
        <h2 className="text-3xl font-black text-white mb-2">タイピング完了！</h2>
        <p className="text-2xl font-black text-yellow-400 mb-8">{score} / {questions.length}</p>
        <div className="flex gap-3 w-full max-w-xs">
          <button onClick={onHome} className="flex-1 bg-white/10 text-white py-3 rounded-2xl font-black border border-white/20">ホームへ</button>
          <button onClick={() => { setIndex(0); setScore(0); }} className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-2xl font-black">もう一度</button>
        </div>
      </div>
    );
  }

  // 単語を抽出（「単語」の意味を問う問題から）
  const word = q.question.replace(/「|」|の意味は？/g, '').trim();
  const isTypingWord = /^[A-Za-z\s']+$/.test(word);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const correct = input.trim().toLowerCase() === (isTypingWord ? word : q.answer).toLowerCase();
    setResult(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) { onFinish(score); setIndex(questions.length); return; }
    setIndex(i => i + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col p-4">
      <div className="flex items-center justify-between mb-4 pt-4">
        <button onClick={onHome} className="text-white/60 text-sm font-bold">← ホーム</button>
        <span className="text-white/60 text-sm font-bold">{index + 1} / {questions.length}</span>
      </div>

      <div className="w-full bg-white/20 rounded-full h-2 mb-6">
        <div className="bg-cyan-400 h-2 rounded-full transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {/* 問題 */}
        <div className="bg-white/10 rounded-3xl p-6 mb-6 border border-white/20 text-center">
          <span className="text-xs bg-cyan-500 text-white px-3 py-1 rounded-full font-black">⌨️ タイピング</span>
          <div className="mt-4">
            {isTypingWord ? (
              <>
                <p className="text-white/60 text-sm mb-2">この単語のスペルを入力しなさい</p>
                <button
                  onClick={() => { speak(word); setPlayed(true); }}
                  disabled={speaking}
                  className={`text-2xl font-black px-6 py-3 rounded-2xl transition-all ${
                    played ? 'bg-white/20 text-white' : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  }`}
                >
                  {speaking ? '🔉 再生中...' : played ? `🔊 ${word}` : '▶ 音声を聞く'}
                </button>
                {played && <p className="text-white/40 text-xs mt-2">聞こえた単語を入力してください</p>}
              </>
            ) : (
              <>
                <p className="text-white/60 text-sm mb-2">日本語の意味に対応する英単語を入力</p>
                <p className="text-3xl font-black text-white">{q.answer}</p>
                <p className="text-white/50 text-sm mt-1">（ヒント: {word.slice(0, 2)}...）</p>
              </>
            )}
          </div>
        </div>

        {/* 入力 */}
        {result === null ? (
          <div className="space-y-3">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              disabled={!played && isTypingWord}
              placeholder={played || !isTypingWord ? 'スペルを入力...' : '先に音声を聞いてください'}
              className="w-full bg-white/10 text-white placeholder-white/30 p-4 rounded-2xl text-xl font-bold border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-center tracking-widest"
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || (!played && isTypingWord)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-2xl font-black disabled:opacity-40"
            >
              決定 ✓
            </button>
          </div>
        ) : (
          <div className={`rounded-3xl p-5 border ${result === 'correct' ? 'bg-green-500/20 border-green-400/40' : 'bg-red-500/20 border-red-400/40'}`}>
            <p className="text-2xl font-black text-white mb-2">{result === 'correct' ? '🎉 正解！' : '❌ 不正解'}</p>
            <p className="text-white font-bold">正解: <span className={result === 'correct' ? 'text-green-300' : 'text-red-300'}>{isTypingWord ? word : q.answer}</span></p>
            <p className="text-white/60 text-xs mt-1">あなたの答え: {input}</p>
            <button onClick={handleNext} className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-2xl font-black">
              次へ →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
