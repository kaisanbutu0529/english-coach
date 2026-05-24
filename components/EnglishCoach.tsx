'use client';

import { useCallback, useEffect, useState } from 'react';

import Header from '@/components/Header';
import ModeSettings from '@/components/ModeSettings';
import ProgressSection from '@/components/ProgressSection';
import QuizArea from '@/components/QuizArea';
import ResultScreen from '@/components/ResultScreen';
import TimerBar from '@/components/TimerBar';
import {
  DEFAULT_AI_COMMENT,
  DAILY_GOAL,
  HINT_MAP,
  defaultQuestions,
  vocabularyQuestions,
} from '@/lib/constants';
import { Question, StudyMode } from '@/lib/types';
import { generateQuestionsFromText, prepareQuestions } from '@/lib/utils';

export default function EnglishCoach() {
  const [studyMode, setStudyMode] = useState<StudyMode>('normal');
  const [mockMode, setMockMode] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(() =>
    prepareQuestions(defaultQuestions, false)
  );
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [mistakes, setMistakes] = useState<Question[]>([]);
  const [aiComment, setAiComment] = useState(DEFAULT_AI_COMMENT);

  const [uploadedText, setUploadedText] = useState('');

  const questionTime = mockMode ? 15 : 30;
  const [timer, setTimer] = useState(questionTime);

  const q = activeQuestions[current];

  // ─── セッション初期化 ───────────────────────────────────────────
  const startSession = useCallback(
    (
      questions: Question[],
      mode: StudyMode,
      comment: string,
      isMock: boolean = mockMode
    ) => {
      setStudyMode(mode);
      setAiComment(comment);
      setActiveQuestions(questions);
      setCurrent(0);
      setScore(0);
      setSelected('');
      setShowAnswer(false);
      setTimer(isMock ? 15 : 30);
    },
    [mockMode]
  );

  // ─── タイマー ──────────────────────────────────────────────────
  useEffect(() => {
    if (!q || showAnswer) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSelected('');
          setShowAnswer(true);
          setStreak(0);
          setMistakes((prevM) =>
            prevM.some((m) => m.question === q.question) ? prevM : [...prevM, q]
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [q, showAnswer]);

  // ─── モード切り替え ────────────────────────────────────────────
  const handleNormalMode = useCallback(
    (forcedMock: boolean = mockMode) => {
      startSession(prepareQuestions(defaultQuestions, forcedMock), 'normal', DEFAULT_AI_COMMENT, forcedMock);
    },
    [mockMode, startSession]
  );

  const handleReviewMode = useCallback(
    (forcedMock: boolean = mockMode) => {
      if (mistakes.length === 0) {
        alert('現在、復習する間違えた問題はありません！');
        return;
      }
      startSession(prepareQuestions(mistakes, forcedMock), 'review', '苦手問題だけを集中して復習します。', forcedMock);
    },
    [mistakes, mockMode, startSession]
  );

  const handleToggleVocabulary = useCallback(() => {
    if (studyMode !== 'vocabulary') {
      startSession(prepareQuestions(vocabularyQuestions, mockMode), 'vocabulary', '単語モードです。意味をセットで覚えましょう！');
    } else {
      handleNormalMode();
    }
  }, [studyMode, mockMode, startSession, handleNormalMode]);

  const handleToggleMock = useCallback(() => {
    const next = !mockMode;
    setMockMode(next);
    const comment = next ? '模試モードON：1問15秒・ヒントなし・シャッフルです。' : DEFAULT_AI_COMMENT;

    if (studyMode === 'review') {
      if (mistakes.length === 0) {
        startSession(prepareQuestions(defaultQuestions, next), 'normal', comment, next);
      } else {
        startSession(prepareQuestions(mistakes, next), 'review', comment, next);
      }
    } else if (studyMode === 'vocabulary') {
      startSession(prepareQuestions(vocabularyQuestions, next), 'vocabulary', comment, next);
    } else {
      startSession(prepareQuestions(defaultQuestions, next), 'normal', comment, next);
    }
  }, [mockMode, studyMode, mistakes, startSession]);

  const handleRetry = useCallback(() => {
    setStreak(0);
    if (studyMode === 'review') {
      handleReviewMode();
    } else if (studyMode === 'vocabulary') {
      startSession(prepareQuestions(vocabularyQuestions, mockMode), 'vocabulary', '単語モードです。');
    } else {
      handleNormalMode();
    }
  }, [studyMode, mockMode, handleReviewMode, handleNormalMode, startSession]);

  // ─── AI問題生成 ─────────────────────────────────────────────
  const handleGenerateAIQuestions = useCallback(() => {
    if (!uploadedText.trim()) {
      alert('教科書本文を入力してください。');
      return;
    }
    const generated = generateQuestionsFromText(uploadedText);
    startSession(generated, 'normal', 'あなたの本文から自動で問題を作成しました！');
    alert(`本文から ${generated.length} 問の自動生成問題を作りました！`);
  }, [uploadedText, startSession]);

  // ─── 回答判定 ───────────────────────────────────────────────
  const handleCheckAnswer = useCallback(() => {
    if (!q) return;
    setShowAnswer(true);

    if (selected === q.answer) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      if (studyMode === 'review') {
        setMistakes((prev) => prev.filter((item) => item.question !== q.question));
      }
    } else {
      setStreak(0);
      setMistakes((prev) =>
        prev.some((item) => item.question === q.question) ? prev : [...prev, q]
      );
    }
  }, [q, selected, studyMode]);

  const handleNextQuestion = useCallback(() => {
    const next = completed + 1;
    setCompleted(next);
    if (next >= DAILY_GOAL) setAiComment('今日の目標達成！かなり良いペースです！');

    setCurrent((prev) => prev + 1);
    setSelected('');
    setShowAnswer(false);
    setTimer(questionTime);
  }, [completed, questionTime]);

  const handleShowHint = useCallback(() => {
    if (!q) return;
    alert(HINT_MAP[q.type] ?? '落ち着いて、主語・動詞・時を表す語に注目しよう！');
  }, [q]);

  const handleAddToReview = useCallback(() => {
    if (!q) return;
    setMistakes((prev) =>
      prev.some((item) => item.question === q.question) ? prev : [...prev, q]
    );
    alert('復習リストに追加しました！');
  }, [q]);

  // ─── 全問終了 ─────────────────────────────────────────────
  if (current >= activeQuestions.length || !q) {
    return (
      <ResultScreen
        studyMode={studyMode}
        score={score}
        total={activeQuestions.length}
        mistakeCount={mistakes.length}
        onNormalMode={handleNormalMode}
        onRetry={handleRetry}
      />
    );
  }

  // ─── メイン画面 ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full">
        <Header
          studyMode={studyMode}
          mistakeCount={mistakes.length}
          streak={streak}
          score={score}
          current={current}
          total={activeQuestions.length}
          onNormalMode={() => handleNormalMode()}
          onReviewMode={() => handleReviewMode()}
        />

        <ModeSettings
          mockMode={mockMode}
          studyMode={studyMode}
          uploadedText={uploadedText}
          onToggleMock={handleToggleMock}
          onToggleVocabulary={handleToggleVocabulary}
          onUploadedTextChange={setUploadedText}
          onGenerateAIQuestions={handleGenerateAIQuestions}
        />

        <ProgressSection completed={completed} aiComment={aiComment} />

        <TimerBar timer={timer} questionTime={questionTime} mockMode={mockMode} />

        <QuizArea
          question={q}
          selected={selected}
          showAnswer={showAnswer}
          mockMode={mockMode}
          onSelect={setSelected}
          onCheckAnswer={handleCheckAnswer}
          onShowHint={handleShowHint}
          onNextQuestion={handleNextQuestion}
          onAddToReview={handleAddToReview}
        />
      </div>
    </div>
  );
}
