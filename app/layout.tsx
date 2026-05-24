import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '高校1年 英語AIコーチ',
  description: '高1・1学期 中間テスト対策アプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
