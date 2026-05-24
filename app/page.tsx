// このファイルはサーバーコンポーネント（デフォルト）
// インタラクティブな処理はすべて EnglishCoach（Client Component）に委譲する
import EnglishCoach from '@/components/EnglishCoach';

export default function Page() {
  return <EnglishCoach />;
}
