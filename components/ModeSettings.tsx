'use client';

import { StudyMode } from '@/lib/types';

interface ModeSettingsProps {
  mockMode: boolean;
  studyMode: StudyMode;
  uploadedText: string;
  onToggleMock: () => void;
  onToggleVocabulary: () => void;
  onUploadedTextChange: (text: string) => void;
  onGenerateAIQuestions: () => void;
}

export default function ModeSettings({
  mockMode,
  studyMode,
  uploadedText,
  onToggleMock,
  onToggleVocabulary,
  onUploadedTextChange,
  onGenerateAIQuestions,
}: ModeSettingsProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5">
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={onToggleMock}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            mockMode ? 'bg-red-500 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {mockMode ? '🚨 模試モードON' : '模試モード'}
        </button>
        <button
          onClick={onToggleVocabulary}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            studyMode === 'vocabulary'
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {studyMode === 'vocabulary' ? '📖 単語モードON' : '単語1000語'}
        </button>
      </div>

      {mockMode && (
        <div className="bg-white border border-red-100 rounded-xl p-3 mb-3 text-xs text-red-700 leading-relaxed">
          模試モードでは「1問15秒」「ヒントなし」「問題順・選択肢順シャッフル」になります。
        </div>
      )}

      <textarea
        value={uploadedText}
        onChange={(e) => onUploadedTextChange(e.target.value)}
        placeholder="教科書本文を貼り付けると自動で穴埋め問題を生成します"
        className="w-full p-3 rounded-2xl border mb-3 min-h-[100px] text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none"
      />
      <button
        onClick={onGenerateAIQuestions}
        className="bg-black text-white px-5 py-2.5 rounded-2xl text-sm font-bold w-full md:w-auto hover:bg-gray-800 transition-colors"
      >
        ✨ 本文から問題生成して挑戦
      </button>
    </div>
  );
}
