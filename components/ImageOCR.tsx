'use client';

import { useRef, useState } from 'react';

interface ImageOCRProps {
  onTextExtracted: (text: string) => void;
}

export default function ImageOCR({ onTextExtracted }: ImageOCRProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('画像ファイルを選択してください');
      return;
    }

    setLoading(true);
    setError('');
    setProgress(0);

    try {
      // Tesseract.jsを動的インポート
      const Tesseract = await import('tesseract.js');

      const result = await Tesseract.recognize(file, 'eng+jpn', {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const text = result.data.text.trim();
      if (text.length < 10) {
        setError('文字を認識できませんでした。鮮明な画像を使ってください。');
      } else {
        onTextExtracted(text);
      }
    } catch {
      setError('文字起こしに失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  return (
    <div className="mb-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="hidden"
      />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            文字起こし中... {progress}%
          </>
        ) : (
          <>📷 教科書を撮影して文字起こし</>
        )}
      </button>

      {loading && (
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}

      <p className="mt-1 text-xs text-gray-500">
        ※ 明るく鮮明な写真ほど精度が上がります
      </p>
    </div>
  );
}
