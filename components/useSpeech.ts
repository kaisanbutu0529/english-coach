'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// 英語テキストかどうか判定
const isEnglish = (text: string) => /[a-zA-Z]/.test(text) && !/[ぁ-んァ-ン一-龥]/.test(text.slice(0, 20));

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!supported) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // 英語か日本語か自動判定
    if (isEnglish(text)) {
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;

      // ネイティブ英語音声を探す
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Alex') || v.localService)
      );
      if (englishVoice) utterance.voice = englishVoice;
    } else {
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const japaneseVoice = voices.find(
        (v) => v.lang.startsWith('ja') && (v.name.includes('Google') || v.localService)
      );
      if (japaneseVoice) utterance.voice = japaneseVoice;
    }

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [supported]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking, supported };
}
