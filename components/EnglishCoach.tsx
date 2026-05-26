'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSpeech } from '@/components/useSpeech';
import ImageOCR from '@/components/ImageOCR';
import FlashCard from '@/components/FlashCard';
import TypingQuiz from '@/components/TypingQuiz';
import BadgeScreen from '@/components/BadgeScreen';
import { useStorage } from '@/lib/useStorage';
import {
  DEFAULT_AI_COMMENT, DAILY_GOAL, HINT_MAP,
  defaultQuestions, listeningQuestions, vocabularyQuestions, bossQuestions,
} from '@/lib/constants';
import { Question, StudyMode } from '@/lib/types';
import { generateQuestionsFromText, generateListeningFromText, prepareQuestions } from '@/lib/utils';

const MODES = [
  { id: 'normal',    label: '通常',     emoji: '📝', color: 'from-blue-500 to-blue-600' },
  { id: 'listening', label: 'リスニング', emoji: '🎧', color: 'from-green-500 to-green-600' },
  { id: 'vocabulary',label: '単語',     emoji: '📖', color: 'from-purple-500 to-purple-600' },
  { id: 'review',    label: '復習',     emoji: '🔁', color: 'from-orange-500 to-orange-600' },
  { id: 'flashcard', label: '単語帳',   emoji: '🃏', color: 'from-pink-500 to-rose-500' },
  { id: 'typing',    label: 'タイピング', emoji: '⌨️', color: 'from-cyan-500 to-blue-500' },
] as const;

// ─── バッジ通知 ──────────────────────────────────────────────────
function BadgeToast({ badge }: { badge: { emoji: string; name: string } }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-2xl shadow-2xl font-black text-sm flex items-center gap-2 animate-bounce">
      <span className="text-2xl">{badge.emoji}</span>
      <div>
        <p className="text-xs opacity-70">バッジ獲得！</p>
        <p>{badge.name}</p>
      </div>
    </div>
  );
}

// ─── ホーム画面 ──────────────────────────────────────────────────
function HomeScreen({
  mistakes, score, streak, completed, badges, totalCorrect, studyStreak,
  onStart, onShowBadges,
  uploadedText, onUploadedTextChange, onGenerateNormal, onGenerateListening,
  mockMode, onToggleMock,
}: {
  mistakes: Question[]; score: number; streak: number; completed: number;
  badges: { unlocked: boolean }[]; totalCorrect: number; studyStreak: number;
  onStart: (mode: StudyMode) => void; onShowBadges: () => void;
  uploadedText: string; onUploadedTextChange: (t: string) => void;
  onGenerateNormal: () => void; onGenerateListening: () => void;
  mockMode: boolean; onToggleMock: () => void;
}) {
  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 flex flex-col">
      <div className="text-center pt-6 pb-4">
        <div className="text-5xl mb-2">🎓</div>
        <h1 className="text-3xl font-black text-white tracking-tight">英語AIコーチ</h1>
        <p className="text-purple-300 text-sm mt-1 font-medium">高1・1学期 中間テスト対策</p>
      </div>

      {/* スタッツ */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'スコア', value: score, emoji: '⭐' },
          { label: '連続', value: streak, emoji: '🔥' },
          { label: '今日', value: `${completed}/${DAILY_GOAL}`, emoji: '📅' },
          { label: '累計', value: totalCorrect, emoji: '🏅' },
        ].map(({ label, value, emoji }) => (
          <div key={label} className="bg-white/10 backdrop-blur rounded-xl p-2 text-center border border-white/20">
            <div className="text-lg">{emoji}</div>
            <div className="text-white font-black text-sm">{value}</div>
            <div className="text-purple-300 text-xs">{label}</div>
          </div>
        ))}
      </div>

      {/* モードボタン */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {MODES.map(({ id, label, emoji, color }) => (
          <button
            key={id}
            onClick={() => onStart(id as StudyMode)}
            disabled={id === 'review' && mistakes.length === 0}
            className={`bg-gradient-to-br ${color} rounded-2xl p-3 text-left shadow-lg active:scale-95 transition-transform disabled:opacity-40`}
          >
            <div className="text-2xl mb-0.5">{emoji}</div>
            <div className="text-white font-black text-xs">{label}</div>
            {id === 'review' && <div className="text-white/70 text-xs">{mistakes.length}問</div>}
          </button>
        ))}
      </div>

      {/* バッジ・模試 */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={onShowBadges}
          className="flex-1 bg-yellow-500/20 border border-yellow-400/40 text-white rounded-2xl p-3 font-black text-sm"
        >
          🏅 バッジ {unlockedCount}/{badges.length}
        </button>
        <button
          onClick={onToggleMock}
          className={`flex-1 rounded-2xl p-3 font-black text-sm transition-all ${
            mockMode ? 'bg-red-500 text-white shadow-lg' : 'bg-white/10 text-white border border-white/20'
          }`}
        >
          {mockMode ? '🚨 模試ON' : '⚡ 模試モード'}
        </button>
      </div>

      {/* 教科書から問題生成 */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20">
        <p className="text-white font-black text-xs mb-2">📷 教科書から問題生成</p>
        <ImageOCR onTextExtracted={onUploadedTextChange} />
        <textarea
          value={uploadedText}
          onChange={(e) => onUploadedTextChange(e.target.value)}
          placeholder="または本文をここに貼り付け..."
          className="w-full bg-white/10 text-white placeholder-white/40 p-2 rounded-xl text-xs border border-white/20 min-h-[50px] resize-none mb-2 focus:outline-none"
        />
        <div className="grid grid-cols-2 gap-2">
          <button onClick={onGenerateNormal} className="bg-blue-500 text-white rounded-xl p-2 text-xs font-black">✨ 通常問題</button>
          <button onClick={onGenerateListening} className="bg-green-500 text-white rounded-xl p-2 text-xs font-black">🎧 リスニング</button>
        </div>
      </div>
    </div>
  );
}

// ─── クイズ画面 ──────────────────────────────────────────────────
function QuizScreen({
  q, current, total, timer, questionTime, score, streak,
  selected, showAnswer, mockMode, studyMode, autoSpeak,
  onSelect, onCheck, onNext, onHint, onAddReview, onHome,
}: {
  q: Question; current: number; total: number; timer: number; questionTime: number;
  score: number; streak: number;
  selected: string; showAnswer: boolean; mockMode: boolean; studyMode: StudyMode; autoSpeak: boolean;
  onSelect: (c: string) => void; onCheck: () => void; onNext: () => void;
  onHint: () => void; onAddReview: () => void; onHome: () => void;
}) {
  const { speak, stop, speaking, supported } = useSpeech();
  const [playCount, setPlayCount] = useState(0);
  const prevQ = useRef(q.question);

  useEffect(() => {
    if (prevQ.current !== q.question) {
      prevQ.current = q.question;
      setPlayCount(0);
      // autoSpeakがONのとき問題文を自動読み上げ
      if (autoSpeak && supported && !q.isListening) {
        setTimeout(() => {
          const en = q.question.match(/[A-Za-z][A-Za-z\s,.'!?-]{10,}/g);
          speak(en ? en.join(' ') : q.question);
        }, 500);
      }
    }
  }, [q.question, autoSpeak, supported, q.isListening, speak]);

  const isCorrect = selected === q.answer;
  const timerPct = (timer / questionTime) * 100;
  const isUrgent = timer <= 5;
  const modeInfo = MODES.find(m => m.id === studyMode) ?? MODES[0];
  const isBoss = q.isBoss;

  const handleListen = () => {
    if (playCount >= (mockMode ? 1 : 99)) return;
    speak(q.listenText ?? q.question);
    setPlayCount(p => p + 1);
  };

  const handleSpeak = () => {
    if (speaking) stop();
    else { const en = q.question.match(/[A-Za-z][A-Za-z\s,.'!?-]{10,}/g); speak(en ? en.join(' ') : q.question); }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isBoss ? 'bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'}`}>
      {/* トップバー */}
      <div className="px-4 pt-4 pb-2">
        {isBoss && (
          <div className="text-center mb-2 animate-pulse">
            <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-black">🔥 ボス問題！</span>
          </div>
        )}
        <div className="flex items-center justify-between mb-2">
          <button onClick={onHome} className="text-white/60 text-sm font-bold">← ホーム</button>
          <div className="flex gap-2">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-black">🔥{streak}</span>
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-black">⭐{score}</span>
            <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-black">{current + 1}/{total}</span>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mb-1">
          <div className={`h-2 rounded-full transition-all duration-1000 ${isUrgent ? 'bg-red-400 animate-pulse' : isBoss ? 'bg-gradient-to-r from-orange-400 to-yellow-400' : 'bg-gradient-to-r from-green-400 to-blue-400'}`} style={{ width: `${timerPct}%` }} />
        </div>
        <div className={`text-right text-xs font-black ${isUrgent ? 'text-red-400' : 'text-white/60'}`}>{timer}秒</div>
      </div>

      {/* 問題エリア */}
      <div className="flex-1 px-4 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-white text-xs font-black px-3 py-1 rounded-full ${isBoss ? 'bg-red-500' : `bg-gradient-to-r ${modeInfo.color}`}`}>
            {isBoss ? '🔥 ボス' : `${modeInfo.emoji} ${q.type}`}
          </span>
          {mockMode && <span className="bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full">模試</span>}
          {supported && !q.isListening && autoSpeak && (
            <button onClick={handleSpeak} className={`ml-auto text-xs font-bold px-3 py-1 rounded-full ${speaking ? 'bg-orange-400 text-white animate-pulse' : 'bg-white/20 text-white'}`}>
              {speaking ? '⏹ 停止' : '🔊 読上中'}
            </button>
          )}
        </div>

        {/* リスニングUI */}
        {q.isListening ? (
          <div className="bg-white/10 rounded-3xl p-5 mb-4 text-center border border-white/20">
            <p className="text-white font-bold text-sm mb-3">{q.question}</p>
            <div className={`text-5xl mb-3 ${speaking ? 'animate-bounce' : ''}`}>🎧</div>
            <button
              onClick={handleListen}
              disabled={!supported || playCount >= (mockMode ? 1 : 99) || speaking}
              className={`px-8 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 ${playCount >= (mockMode ? 1 : 99) ? 'bg-white/20 text-white/40' : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'}`}
            >
              {speaking ? '再生中...' : playCount === 0 ? '▶ 音声を聞く' : `▶ もう一度 (${playCount}回)`}
            </button>
            {mockMode && <p className="text-red-300 text-xs mt-2 font-bold">模試: {playCount}/1回</p>}
          </div>
        ) : (
          <div className={`rounded-3xl p-4 mb-4 border ${isBoss ? 'bg-orange-500/10 border-orange-400/30' : 'bg-white/10 border-white/20'}`}>
            <p className="text-white font-bold text-sm leading-relaxed whitespace-pre-line">{q.question}</p>
          </div>
        )}

        {/* 選択肢 */}
        {!showAnswer ? (
          <>
            <div className="grid gap-3 mb-3">
              {q.choices.map((choice, i) => {
                const labels = ['1', '2', '3', '4'];
                const isSelected = selected === choice;
                const canSelect = !q.isListening || playCount > 0;
                return (
                  <button key={choice} onClick={() => canSelect && onSelect(choice)} disabled={!canSelect}
                    className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all font-bold text-base ${
                      isSelected
                        ? 'bg-yellow-400 text-indigo-900 shadow-xl scale-[1.02] border-2 border-yellow-300'
                        : canSelect
                          ? 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 active:scale-95'
                          : 'bg-white/5 text-white/30 border-2 border-white/10'
                    }`}>
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-black flex-shrink-0 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-white/20 text-white'
                    }`}>{labels[i]}</span>
                    <span className="leading-snug">{choice}</span>
                  </button>
                );
              })}
            </div>
            {q.isListening && playCount === 0 && <p className="text-center text-white/50 text-xs mb-2">まず音声を聞いてください</p>}
            <div className="flex gap-2">
              {!q.isListening && (
                <button onClick={onHint} disabled={mockMode} className="bg-white/10 text-white px-4 py-3 rounded-2xl font-black text-sm disabled:opacity-40">💡</button>
              )}
              <button onClick={onCheck} disabled={!selected}
                className={`flex-1 py-3 rounded-2xl font-black text-sm disabled:opacity-40 active:scale-95 transition-transform ${isBoss ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' : 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg'}`}>
                回答する ✓
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={`rounded-3xl p-4 mb-3 border ${isCorrect ? 'bg-green-500/20 border-green-400/40' : 'bg-red-500/20 border-red-400/40'}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-black text-white">{isCorrect ? '🎉 正解！' : '❌ 不正解'}</p>
                {supported && (
                  <button onClick={() => speak(q.listenText ?? q.answer)} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold">🔊</button>
                )}
              </div>
              <p className="text-white font-bold text-sm">正解: <span className={isCorrect ? 'text-green-300' : 'text-red-300'}>{q.answer}</span></p>
              {q.isListening && q.listenText && <p className="text-white/60 text-xs mt-1">音声: {q.listenText}</p>}
              <p className="text-white/70 text-xs mt-2 leading-relaxed">{q.explanation}</p>
              {/* 例文表示 */}
              {q.examples && q.examples.length > 0 && (
                <div className="mt-3 border-t border-white/20 pt-3">
                  <p className="text-white/50 text-xs font-black mb-1">📚 例文</p>
                  {q.examples.map((ex, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1">
                      <span className="text-white/40 text-xs mt-0.5">•</span>
                      <p className="text-white/70 text-xs">{ex}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* 正解ハイライト選択肢 */}
            <div className="grid gap-2 mb-3">
              {q.choices.map((choice, i) => {
                const labels = ['1', '2', '3', '4'];
                const isAnswer = choice === q.answer;
                const isWrong = choice === selected && !isCorrect;
                return (
                  <div key={choice} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold border-2 ${
                    isAnswer ? 'bg-green-500/30 border-green-400/60 text-white'
                    : isWrong ? 'bg-red-500/30 border-red-400/60 text-white'
                    : 'border-white/10 text-white/30'
                  }`}>
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 ${
                      isAnswer ? 'bg-green-500 text-white' : isWrong ? 'bg-red-500 text-white' : 'bg-white/10 text-white/30'
                    }`}>
                      {isAnswer ? '✓' : isWrong ? '✗' : labels[i]}
                    </span>
                    <span className="leading-snug">{choice}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <button onClick={onAddReview} className="bg-white/10 text-white px-4 py-3 rounded-2xl font-black text-sm border border-white/20">🔁</button>
              <button onClick={onNext} className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-2xl font-black text-sm active:scale-95 transition-transform">次へ →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── 結果画面 ──────────────────────────────────────────────────
function ResultScreen({ score, total, mistakes, studyMode, onHome, onRetry }: {
  score: number; total: number; mistakes: number; studyMode: StudyMode;
  onHome: () => void; onRetry: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct === 100 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '😊' : '💪';
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-6">
      <div className="text-8xl mb-4">{emoji}</div>
      <h1 className="text-4xl font-black text-white mb-2">結果発表！</h1>
      <div className="bg-white/10 rounded-3xl p-6 w-full max-w-sm mb-6 border border-white/20 text-center">
        <p className="text-6xl font-black text-white mb-1">{score}<span className="text-2xl text-white/60">/{total}</span></p>
        <p className="text-3xl font-black text-yellow-400">{pct}%</p>
        <div className="w-full bg-white/20 rounded-full h-3 mt-3">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <p className="text-white/60 text-sm mb-6">復習リスト: {mistakes}問</p>
      <div className="flex gap-3 w-full max-w-sm">
        <button onClick={onHome} className="flex-1 bg-white/10 text-white py-3 rounded-2xl font-black border border-white/20">ホームへ</button>
        <button onClick={onRetry} className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-2xl font-black shadow-lg">もう一度</button>
      </div>
    </div>
  );
}

// ─── メインコンポーネント ──────────────────────────────────────
type Screen = 'home' | 'quiz' | 'result' | 'flashcard' | 'typing' | 'badges';

export default function EnglishCoach() {
  const [screen, setScreen] = useState<Screen>('home');
  const [studyMode, setStudyMode] = useState<StudyMode>('normal');
  const [mockMode, setMockMode] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [mistakes, setMistakes] = useState<Question[]>([]);
  const [uploadedText, setUploadedText] = useState('');
  const [bossShown, setBossShown] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);

  const questionTime = mockMode ? 15 : 30;
  const [timer, setTimer] = useState(questionTime);

  const { totalCorrect, badges, records, newBadge, recordCorrect, recordStudy, calcStreak } = useStorage();

  const q = activeQuestions[current];

  const startSession = useCallback((questions: Question[], mode: StudyMode) => {
    setStudyMode(mode);
    setActiveQuestions(questions);
    setCurrent(0); setScore(0); setSelected('');
    setShowAnswer(false); setTimer(mockMode ? 15 : 30);
    setBossShown(false);
    setScreen('quiz');
  }, [mockMode]);

  // タイマー
  useEffect(() => {
    if (screen !== 'quiz' || !q || showAnswer) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setSelected(''); setShowAnswer(true); setStreak(0);
          setMistakes(m => m.some(x => x.question === q.question) ? m : [...m, q]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [q, showAnswer, screen]);

  useEffect(() => { setTimer(questionTime); }, [current, questionTime]);

  const handleStart = useCallback((mode: StudyMode) => {
    if (mode === 'flashcard') { setStudyMode('flashcard'); setScreen('flashcard'); return; }
    if (mode === 'typing') { setStudyMode('typing'); setScreen('typing'); return; }
    const qMap: Record<string, Question[]> = {
      normal: defaultQuestions, listening: listeningQuestions,
      vocabulary: vocabularyQuestions, review: mistakes,
    };
    const qs = prepareQuestions(qMap[mode] ?? defaultQuestions, true);
    if (mode === 'review' && qs.length === 0) { alert('復習する問題がありません！'); return; }
    startSession(qs, mode);
  }, [mockMode, mistakes, startSession]);

  const handleGenerateNormal = useCallback(() => {
    if (!uploadedText.trim()) { alert('本文を入力してください'); return; }
    startSession(generateQuestionsFromText(uploadedText), 'normal');
  }, [uploadedText, startSession]);

  const handleGenerateListening = useCallback(() => {
    if (!uploadedText.trim()) { alert('本文を入力してください'); return; }
    startSession(generateListeningFromText(uploadedText), 'listening');
  }, [uploadedText, startSession]);

  const handleCheck = useCallback(() => {
    if (!q) return;
    setShowAnswer(true);
    const correct = selected === q.answer;
    if (correct) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      recordCorrect(newStreak, !!q.isBoss, studyMode, newScore, activeQuestions.length);
      if (studyMode === 'review') setMistakes(m => m.filter(x => x.question !== q.question));
    } else {
      setStreak(0);
      setMistakes(m => m.some(x => x.question === q.question) ? m : [...m, q]);
    }
  }, [q, selected, studyMode, score, streak, activeQuestions.length, recordCorrect]);

  const handleNext = useCallback(() => {
    const nextIdx = current + 1;
    setCompleted(c => c + 1);

    // 10問ごとにボスを挿入
    if (!bossShown && nextIdx > 0 && nextIdx % 10 === 0 && bossQuestions.length > 0) {
      const boss = prepareQuestions(bossQuestions, true)[0];
      setActiveQuestions(prev => {
        const copy = [...prev];
        copy.splice(nextIdx, 0, boss);
        return copy;
      });
      setBossShown(true);
    }

    if (nextIdx >= activeQuestions.length) {
      recordStudy(activeQuestions.length, score);
      setScreen('result');
      return;
    }
    setCurrent(nextIdx); setSelected(''); setShowAnswer(false);
  }, [current, activeQuestions.length, score, bossShown, recordStudy]);

  const handleHint = useCallback(() => {
    if (!q) return;
    alert(HINT_MAP[q.type] ?? '落ち着いて、主語・動詞・時を表す語に注目しよう！');
  }, [q]);

  const handleAddReview = useCallback(() => {
    if (!q) return;
    setMistakes(m => m.some(x => x.question === q.question) ? m : [...m, q]);
    alert('復習リストに追加しました！');
  }, [q]);

  const handleRetry = useCallback(() => { handleStart(studyMode); }, [studyMode, handleStart]);

  // ─── 画面振り分け ──────────────────────────────────────────
  if (screen === 'badges') {
    return <BadgeScreen badges={badges} totalCorrect={totalCorrect} studyStreak={calcStreak()} onClose={() => setScreen('home')} />;
  }
  if (screen === 'flashcard') {
    return <FlashCard questions={prepareQuestions(vocabularyQuestions, true)} onFinish={(c) => { recordStudy(vocabularyQuestions.length, c); setScreen('home'); }} onHome={() => setScreen('home')} />;
  }
  if (screen === 'typing') {
    return <TypingQuiz questions={prepareQuestions(vocabularyQuestions, true).slice(0, 10)} onFinish={(c) => { recordStudy(10, c); setScreen('home'); }} onHome={() => setScreen('home')} />;
  }
  if (screen === 'home') {
    return (
      <>
        {newBadge && <BadgeToast badge={newBadge} />}
        <HomeScreen
          mistakes={mistakes} score={score} streak={streak} completed={completed}
          badges={badges} totalCorrect={totalCorrect} studyStreak={calcStreak()}
          onStart={handleStart} onShowBadges={() => setScreen('badges')}
          uploadedText={uploadedText} onUploadedTextChange={setUploadedText}
          onGenerateNormal={handleGenerateNormal} onGenerateListening={handleGenerateListening}
          mockMode={mockMode} onToggleMock={() => setMockMode(m => !m)}
          autoSpeak={autoSpeak} onToggleAutoSpeak={() => setAutoSpeak(s => !s)}
        />
      </>
    );
  }
  if (screen === 'result') {
    return (
      <>
        {newBadge && <BadgeToast badge={newBadge} />}
        <ResultScreen score={score} total={activeQuestions.length} mistakes={mistakes.length} studyMode={studyMode} onHome={() => setScreen('home')} onRetry={handleRetry} />
      </>
    );
  }
  if (!q) return null;

  return (
    <>
      {newBadge && <BadgeToast badge={newBadge} />}
      <QuizScreen
        q={q} current={current} total={activeQuestions.length}
        timer={timer} questionTime={questionTime} score={score} streak={streak}
        selected={selected} showAnswer={showAnswer} mockMode={mockMode} studyMode={studyMode} autoSpeak={autoSpeak}
        onSelect={setSelected} onCheck={handleCheck} onNext={handleNext}
        onHint={handleHint} onAddReview={handleAddReview} onHome={() => setScreen('home')}
      />
    </>
  );
}
