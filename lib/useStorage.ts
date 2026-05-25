'use client';

import { useCallback, useEffect, useState } from 'react';
import { BADGE_DEFINITIONS } from './constants';
import { Badge, StudyRecord } from './types';

const KEYS = {
  totalCorrect: 'ec_total_correct',
  badges: 'ec_badges',
  records: 'ec_records',
  listeningCorrect: 'ec_listening_correct',
  vocabCorrect: 'ec_vocab_correct',
  typingCorrect: 'ec_typing_correct',
};

const load = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
};

const save = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
};

const todayStr = () => new Date().toISOString().slice(0, 10);

export function useStorage() {
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [records, setRecords] = useState<StudyRecord[]>([]);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [listeningCorrect, setListeningCorrect] = useState(0);
  const [vocabCorrect, setVocabCorrect] = useState(0);
  const [typingCorrect, setTypingCorrect] = useState(0);

  useEffect(() => {
    setTotalCorrect(load(KEYS.totalCorrect, 0));
    setListeningCorrect(load(KEYS.listeningCorrect, 0));
    setVocabCorrect(load(KEYS.vocabCorrect, 0));
    setTypingCorrect(load(KEYS.typingCorrect, 0));
    setRecords(load(KEYS.records, []));

    const saved = load<Record<string, boolean>>(KEYS.badges, {});
    setBadges(BADGE_DEFINITIONS.map(b => ({
      ...b,
      unlocked: !!saved[b.id],
      unlockedAt: saved[`${b.id}_at`] as unknown as string | undefined,
    })));
  }, []);

  const unlockBadge = useCallback((id: string) => {
    setBadges(prev => {
      const already = prev.find(b => b.id === id)?.unlocked;
      if (already) return prev;
      const updated = prev.map(b =>
        b.id === id ? { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('ja-JP') } : b
      );
      const savedMap: Record<string, unknown> = {};
      updated.forEach(b => { savedMap[b.id] = b.unlocked; if (b.unlockedAt) savedMap[`${b.id}_at`] = b.unlockedAt; });
      save(KEYS.badges, savedMap);
      const badge = updated.find(b => b.id === id)!;
      setNewBadge(badge);
      setTimeout(() => setNewBadge(null), 3000);
      return updated;
    });
  }, []);

  const recordCorrect = useCallback((streak: number, isBoss: boolean, mode: string, sessionScore: number, sessionTotal: number) => {
    const next = totalCorrect + 1;
    setTotalCorrect(next);
    save(KEYS.totalCorrect, next);

    // モード別カウント
    if (mode === 'listening') {
      const lc = listeningCorrect + 1;
      setListeningCorrect(lc);
      save(KEYS.listeningCorrect, lc);
      if (lc >= 10) unlockBadge('listening_clear');
    }
    if (mode === 'vocabulary') {
      const vc = vocabCorrect + 1;
      setVocabCorrect(vc);
      save(KEYS.vocabCorrect, vc);
      if (vc >= 20) unlockBadge('vocab_master');
    }
    if (mode === 'typing') {
      const tc = typingCorrect + 1;
      setTypingCorrect(tc);
      save(KEYS.typingCorrect, tc);
      if (tc >= 5) unlockBadge('typing_star');
    }

    // バッジチェック
    if (next === 1) unlockBadge('first_correct');
    if (next >= 10) unlockBadge('total_10');
    if (next >= 50) unlockBadge('total_50');
    if (next >= 100) unlockBadge('total_100');
    if (streak >= 5) unlockBadge('streak_5');
    if (streak >= 10) unlockBadge('streak_10');
    if (isBoss) unlockBadge('boss_clear');
    if (sessionScore + 1 === sessionTotal && sessionTotal > 0) unlockBadge('perfect');
  }, [totalCorrect, listeningCorrect, vocabCorrect, typingCorrect, unlockBadge]);

  const recordStudy = useCallback((count: number, correct: number) => {
    const today = todayStr();
    setRecords(prev => {
      const existing = prev.find(r => r.date === today);
      const updated = existing
        ? prev.map(r => r.date === today ? { ...r, count: r.count + count, correct: r.correct + correct } : r)
        : [...prev, { date: today, count, correct }];
      save(KEYS.records, updated);

      // 連続7日チェック
      const dates = updated.map(r => r.date).sort().reverse();
      let streak = 0;
      const d = new Date();
      for (let i = 0; i < 7; i++) {
        const ds = new Date(d); ds.setDate(d.getDate() - i);
        if (dates.includes(ds.toISOString().slice(0, 10))) streak++;
        else break;
      }
      if (streak >= 7) unlockBadge('seven_days');
      return updated;
    });
  }, [unlockBadge]);

  // 連続学習日数
  const calcStreak = useCallback(() => {
    const dates = records.map(r => r.date).sort().reverse();
    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const ds = new Date(d); ds.setDate(d.getDate() - i);
      if (dates.includes(ds.toISOString().slice(0, 10))) streak++;
      else break;
    }
    return streak;
  }, [records]);

  return { totalCorrect, badges, records, newBadge, recordCorrect, recordStudy, calcStreak };
}
