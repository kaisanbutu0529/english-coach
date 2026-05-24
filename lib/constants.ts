import { Question } from './types';

export const DEFAULT_AI_COMMENT = '毎日続けることが一番大切です！';
export const DAILY_GOAL = 10;

export const defaultQuestions: Question[] = [
  { type: '教科書', question: 'My name is Ken. I am from Osaka. Where is Ken from?', choices: ['Tokyo', 'Osaka', 'Kyoto', 'Nara'], answer: 'Osaka', explanation: 'I am from Osaka. と書かれている。' },
  { type: '会話表現', question: 'A: How are you?\nB: ( )', choices: ['I am fine, thank you.', 'Goodbye.', 'See you yesterday.', 'I play soccer.'], answer: 'I am fine, thank you.', explanation: '定番の会話表現。' },
  { type: '単語', question: '「usually」の意味は？', choices: ['めったに〜ない', 'たいてい', 'すぐに', '昨日'], answer: 'たいてい', explanation: 'usually = たいてい' },
  { type: '文法', question: 'He ( ) breakfast every morning.', choices: ['eat', 'eats', 'eating', 'ate'], answer: 'eats', explanation: '三人称単数なので eats。' },
  { type: '英作文', question: '「私は毎日英語を勉強します。」に最も近いものを選びなさい。', choices: ['I study English every day.', 'I studying English every day.', 'I studied English every day.', 'I am study English every day.'], answer: 'I study English every day.', explanation: '現在の習慣なので現在形。' },
  { type: '単語', question: '「important」の意味は？', choices: ['重要な', '美しい', '難しい', '危険な'], answer: '重要な', explanation: 'important = 重要な' },
  { type: '文法', question: 'I ( ) soccer yesterday.', choices: ['play', 'played', 'playing', 'plays'], answer: 'played', explanation: 'yesterday があるので過去形 played。' },
  { type: '並び替え', question: '次の語を並び替えなさい。\nI / to / school / go / every day', choices: ['I go to school every day.', 'I school go to every day.', 'Go I to school every day.', 'I every day go school to.'], answer: 'I go to school every day.', explanation: '主語→動詞→場所→頻度 の順番。' },
  { type: '文法', question: 'She ( ) TV now.', choices: ['watch', 'watched', 'is watching', 'watches'], answer: 'is watching', explanation: 'now があるので現在進行形。' },
  { type: '長文', question: 'Tom likes music. He plays the guitar every day. What does Tom play?', choices: ['Piano', 'Baseball', 'Guitar', 'Tennis'], answer: 'Guitar', explanation: 'He plays the guitar every day と書かれている。' },
];

export const vocabularyQuestions: Question[] = [
  { type: '単語', question: '「environment」の意味は？', choices: ['環境', '政府', '経済', '社会'], answer: '環境', explanation: 'environment = 環境' },
  { type: '単語', question: '「accept」の意味は？', choices: ['拒絶する', '受け入れる', '期待する', '不平を言う'], answer: '受け入れる', explanation: 'accept = 受け入れる' },
  { type: '単語', question: '「improve」の意味は？', choices: ['証明する', '改善する', '承認する', '提供する'], answer: '改善する', explanation: 'improve = 改善する' },
  { type: '単語', question: '「culture」の意味は？', choices: ['文化', '農業', '病気', '地図'], answer: '文化', explanation: 'culture = 文化' },
  { type: '単語', question: '「decision」の意味は？', choices: ['質問', '決定', '失敗', '招待'], answer: '決定', explanation: 'decision = 決定' },
];

export const STOP_WORDS = new Set([
  'the', 'this', 'that', 'these', 'those', 'with', 'from', 'have', 'has', 'had',
  'your', 'their', 'there', 'were', 'what', 'when', 'where', 'which', 'while',
  'about', 'into', 'after', 'before', 'because', 'would', 'could', 'should',
  'name', 'very', 'much', 'many', 'some', 'every', 'today', 'yesterday', 'tomorrow',
  'they', 'them', 'then', 'than', 'been', 'being', 'also', 'only', 'just', 'over',
  'under', 'again', 'really', 'always', 'usually', 'often', 'sometimes', 'never',
  'play', 'plays', 'study', 'studies', 'like', 'likes', 'went', 'goes', 'school',
]);

export const DECOY_WORDS = [
  'music', 'friend', 'morning', 'English', 'guitar', 'city', 'happy', 'library',
  'important', 'science', 'teacher', 'student', 'family', 'practice', 'future',
];

export const HINT_MAP: Record<string, string> = {
  文法: '時間を表す言葉（now, yesterday, every day など）に注目！',
  単語: '品詞や、見たことのある語根・接頭辞から推測してみよう！',
  長文: 'Who / What / Where を先に探すと内容が読みやすい！',
  並び替え: 'まず主語→動詞の骨組みを作ろう！',
  会話表現: 'あいさつ・返答の定番表現を思い出そう！',
  教科書: '本文の中の固有名詞や場所・人物に注目！',
  英作文: '時制と語順を先にチェック！',
};
