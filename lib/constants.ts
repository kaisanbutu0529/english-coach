import { Question } from './types';

export const DEFAULT_AI_COMMENT = '毎日続けることが一番大切です！';
export const DAILY_GOAL = 10;

// ─── 通常問題（150問）────────────────────────────────────────────
export const defaultQuestions: Question[] = [
  // ── be動詞 ──────────────────────────────────────────
  { type: '文法', question: 'I ( ) a student.', choices: ['am', 'is', 'are', 'be'], answer: 'am', explanation: '主語がIのときbe動詞はam。' },
  { type: '文法', question: 'She ( ) a teacher.', choices: ['am', 'is', 'are', 'be'], answer: 'is', explanation: '主語がShe（三人称単数）のときbe動詞はis。' },
  { type: '文法', question: 'They ( ) good friends.', choices: ['am', 'is', 'are', 'be'], answer: 'are', explanation: '主語がThey（複数）のときbe動詞はare。' },
  { type: '文法', question: 'You ( ) very kind.', choices: ['am', 'is', 'are', 'be'], answer: 'are', explanation: '主語がYouのときbe動詞はare。' },
  { type: '文法', question: 'This ( ) my book.', choices: ['am', 'is', 'are', 'be'], answer: 'is', explanation: 'This（単数）のときbe動詞はis。' },
  { type: '文法', question: 'We ( ) in the same class.', choices: ['am', 'is', 'are', 'be'], answer: 'are', explanation: 'We（複数）のときbe動詞はare。' },
  { type: '文法', question: 'Tom ( ) from Canada.', choices: ['am', 'is', 'are', 'be'], answer: 'is', explanation: 'Tom（三人称単数）のときbe動詞はis。' },
  { type: '文法', question: '「私は疲れていない。」\nI ( ) not tired.', choices: ['am', 'is', 'are', 'do'], answer: 'am', explanation: 'be動詞の否定はbe動詞+not。主語Iにはam。' },
  { type: '文法', question: '「彼女は医者ですか？」\n( ) she a doctor?', choices: ['Am', 'Is', 'Are', 'Do'], answer: 'Is', explanation: 'be動詞の疑問文はbe動詞を文頭に。Sheにはis。' },
  { type: '文法', question: 'These ( ) my shoes.', choices: ['am', 'is', 'are', 'be'], answer: 'are', explanation: 'These（複数）のときbe動詞はare。' },

  // ── 一般動詞（現在形）──────────────────────────────
  { type: '文法', question: 'I ( ) English every day.', choices: ['study', 'studies', 'studying', 'studied'], answer: 'study', explanation: '主語がIのとき動詞はそのまま。' },
  { type: '文法', question: 'He ( ) breakfast every morning.', choices: ['eat', 'eats', 'eating', 'ate'], answer: 'eats', explanation: '三人称単数現在はeats（s/esをつける）。' },
  { type: '文法', question: 'She ( ) to school by bus.', choices: ['go', 'goes', 'going', 'went'], answer: 'goes', explanation: '三人称単数現在はgoes。' },
  { type: '文法', question: 'My father ( ) a car.', choices: ['have', 'has', 'having', 'had'], answer: 'has', explanation: '三人称単数現在はhas（haveの変化形）。' },
  { type: '文法', question: 'We ( ) soccer after school.', choices: ['play', 'plays', 'playing', 'played'], answer: 'play', explanation: '主語がWeのとき動詞はそのまま。' },
  { type: '文法', question: 'Ken ( ) math very much.', choices: ['like', 'likes', 'liking', 'liked'], answer: 'likes', explanation: '三人称単数現在はlikes。' },
  { type: '文法', question: 'I ( ) a dog. His name is Pochi.', choices: ['have', 'has', 'having', 'had'], answer: 'have', explanation: '主語がIのときはhave。' },
  { type: '文法', question: '「私は音楽を聴きません。」\nI ( ) listen to music.', choices: ['am not', 'don\'t', 'doesn\'t', 'not'], answer: 'don\'t', explanation: '一般動詞の否定はdo not（don\'t）+動詞の原形。' },
  { type: '文法', question: '「彼は野球をしません。」\nHe ( ) play baseball.', choices: ['don\'t', 'doesn\'t', 'isn\'t', 'not'], answer: 'doesn\'t', explanation: '三人称単数の否定はdoes not（doesn\'t）+動詞の原形。' },
  { type: '文法', question: '「あなたは犬が好きですか？」\n( ) you like dogs?', choices: ['Are', 'Is', 'Do', 'Does'], answer: 'Do', explanation: '一般動詞の疑問文はDo+主語+動詞の原形。' },
  { type: '文法', question: '「ケンはテニスをしますか？」\n( ) Ken play tennis?', choices: ['Do', 'Does', 'Is', 'Are'], answer: 'Does', explanation: '三人称単数の疑問文はDoes+主語+動詞の原形。' },
  { type: '文法', question: 'She ( ) TV every evening.', choices: ['watch', 'watches', 'watching', 'watched'], answer: 'watches', explanation: '三人称単数現在。watchはesをつけてwatches。' },
  { type: '文法', question: 'My sister ( ) the piano well.', choices: ['play', 'plays', 'playing', 'played'], answer: 'plays', explanation: '三人称単数現在はplays。' },

  // ── 現在進行形 ──────────────────────────────────────
  { type: '文法', question: 'She ( ) TV now.', choices: ['watch', 'watched', 'is watching', 'watches'], answer: 'is watching', explanation: 'now があるので現在進行形。be動詞+動詞ing。' },
  { type: '文法', question: 'They ( ) in the park now.', choices: ['run', 'ran', 'are running', 'runs'], answer: 'are running', explanation: '現在進行形はbe動詞（are）+動詞ing形。' },
  { type: '文法', question: 'I ( ) a letter now.', choices: ['write', 'wrote', 'am writing', 'writes'], answer: 'am writing', explanation: '現在進行形。主語がIなのでam+writing。' },
  { type: '文法', question: 'He ( ) lunch now.', choices: ['eat', 'eats', 'is eating', 'ate'], answer: 'is eating', explanation: '現在進行形。主語がHeなのでis+eating。' },
  { type: '文法', question: '「あなたは今何をしていますか？」\nWhat ( ) you doing now?', choices: ['do', 'does', 'are', 'is'], answer: 'are', explanation: '現在進行形の疑問文。What are you doing？' },
  { type: '文法', question: 'Look! The dog ( ) in the garden.', choices: ['play', 'plays', 'is playing', 'played'], answer: 'is playing', explanation: 'Look!は今まさに起きていることを示す。現在進行形。' },
  { type: '文法', question: 'Ken ( ) his homework now.', choices: ['do', 'does', 'is doing', 'did'], answer: 'is doing', explanation: '現在進行形。主語がKenなのでis+doing。' },

  // ── 過去形 ──────────────────────────────────────────
  { type: '文法', question: 'I ( ) soccer yesterday.', choices: ['play', 'played', 'playing', 'plays'], answer: 'played', explanation: 'yesterday があるので過去形played。' },
  { type: '文法', question: 'She ( ) to Tokyo last week.', choices: ['go', 'goes', 'going', 'went'], answer: 'went', explanation: 'go の過去形は went（不規則変化）。' },
  { type: '文法', question: 'We ( ) dinner at 7 yesterday.', choices: ['eat', 'eats', 'ate', 'eating'], answer: 'ate', explanation: 'eat の過去形は ate（不規則変化）。' },
  { type: '文法', question: 'He ( ) his homework last night.', choices: ['do', 'does', 'did', 'doing'], answer: 'did', explanation: 'do の過去形は did（不規則変化）。' },
  { type: '文法', question: 'I ( ) a good book last Sunday.', choices: ['read', 'reads', 'reading', 'readed'], answer: 'read', explanation: 'read の過去形は read（同じスペルで発音が変わる）。' },
  { type: '文法', question: 'She ( ) a cake for my birthday.', choices: ['make', 'makes', 'made', 'maked'], answer: 'made', explanation: 'make の過去形は made（不規則変化）。' },
  { type: '文法', question: '「私は昨日学校に行きませんでした。」\nI ( ) go to school yesterday.', choices: ['don\'t', 'doesn\'t', 'didn\'t', 'wasn\'t'], answer: 'didn\'t', explanation: '過去の否定は did not（didn\'t）+動詞の原形。' },
  { type: '文法', question: '「あなたは昨日図書館に行きましたか？」\n( ) you go to the library yesterday?', choices: ['Do', 'Does', 'Did', 'Were'], answer: 'Did', explanation: '過去の疑問文は Did+主語+動詞の原形。' },
  { type: '文法', question: 'They ( ) very happy at the party.', choices: ['are', 'is', 'were', 'was'], answer: 'were', explanation: 'be動詞の過去形。They（複数）→ were。' },
  { type: '文法', question: 'It ( ) sunny yesterday.', choices: ['is', 'are', 'was', 'were'], answer: 'was', explanation: 'be動詞の過去形。It（単数）→ was。' },

  // ── 疑問詞 ──────────────────────────────────────────
  { type: '文法', question: '「あなたは何を食べますか？」\n( ) do you eat?', choices: ['Who', 'What', 'Where', 'When'], answer: 'What', explanation: '何を＝What。What do you...？' },
  { type: '文法', question: '「彼はどこに住んでいますか？」\n( ) does he live?', choices: ['Who', 'What', 'Where', 'When'], answer: 'Where', explanation: 'どこ＝Where。' },
  { type: '文法', question: '「あなたはいつ起きますか？」\n( ) do you get up?', choices: ['Who', 'What', 'Where', 'When'], answer: 'When', explanation: 'いつ＝When。' },
  { type: '文法', question: '「あの少年は誰ですか？」\n( ) is that boy?', choices: ['Who', 'What', 'Where', 'When'], answer: 'Who', explanation: '誰＝Who。' },
  { type: '文法', question: '「どのくらい遠いですか？」\n( ) far is it?', choices: ['How', 'What', 'Where', 'Why'], answer: 'How', explanation: 'How+形容詞で程度を尋ねる。How far = どのくらい遠い。' },
  { type: '文法', question: '「なぜあなたは英語を勉強しますか？」\n( ) do you study English?', choices: ['Who', 'What', 'Where', 'Why'], answer: 'Why', explanation: 'なぜ＝Why。' },
  { type: '文法', question: '「どうやって学校に来ますか？」\n( ) do you come to school?', choices: ['What', 'How', 'Why', 'When'], answer: 'How', explanation: 'どうやって＝How。' },
  { type: '文法', question: '「あなたのかばんはどれですか？」\n( ) is your bag?', choices: ['Who', 'Which', 'Where', 'When'], answer: 'Which', explanation: 'どれ＝Which。' },

  // ── 命令文・感嘆文 ──────────────────────────────────
  { type: '文法', question: '「静かにしてください。」\n( ) quiet, please.', choices: ['Are', 'Is', 'Be', 'Do'], answer: 'Be', explanation: 'be動詞の命令文はBe+形容詞。' },
  { type: '文法', question: '「走ってはいけません。」\n( ) run here.', choices: ['Not', 'No', 'Don\'t', 'Isn\'t'], answer: 'Don\'t', explanation: '禁止の命令文はDon\'t+動詞の原形。' },
  { type: '文法', question: '「なんて美しい花でしょう！」\n( ) a beautiful flower!', choices: ['How', 'What', 'So', 'Very'], answer: 'What', explanation: '感嘆文What+a+形容詞+名詞！' },
  { type: '文法', question: '「なんて速く走るのでしょう！」\n( ) fast he runs!', choices: ['What', 'How', 'So', 'Very'], answer: 'How', explanation: '感嘆文How+形容詞/副詞！（名詞がないときはHow）' },

  // ── 会話表現 ──────────────────────────────────────
  { type: '会話表現', question: 'A: How are you?\nB: ( )', choices: ['I am fine, thank you.', 'Goodbye.', 'See you later.', 'I play soccer.'], answer: 'I am fine, thank you.', explanation: 'How are you? の定番返答。' },
  { type: '会話表現', question: 'A: Nice to meet you.\nB: ( )', choices: ['Nice to meet you, too.', 'See you tomorrow.', 'I\'m sorry.', 'Thank you very much.'], answer: 'Nice to meet you, too.', explanation: 'Nice to meet you. には Nice to meet you, too. と返す。' },
  { type: '会話表現', question: 'A: What time is it?\nB: ( )', choices: ['It\'s three o\'clock.', 'It\'s Monday.', 'It\'s sunny.', 'It\'s my book.'], answer: 'It\'s three o\'clock.', explanation: '時刻を尋ねる問いにはIt\'s+時刻で答える。' },
  { type: '会話表現', question: 'A: How old are you?\nB: ( )', choices: ['I\'m fifteen years old.', 'I\'m fine.', 'I\'m a student.', 'I\'m from Japan.'], answer: 'I\'m fifteen years old.', explanation: '年齢を尋ねる問いにはI\'m+年齢+years old。' },
  { type: '会話表現', question: 'A: Where are you from?\nB: ( )', choices: ['I\'m from Japan.', 'I\'m fifteen.', 'I\'m a student.', 'I\'m fine.'], answer: 'I\'m from Japan.', explanation: '出身地を尋ねる問いにはI\'m from+場所。' },
  { type: '会話表現', question: 'A: Can you swim?\nB: ( )', choices: ['Yes, I can.', 'Yes, I am.', 'Yes, I do.', 'Yes, I have.'], answer: 'Yes, I can.', explanation: 'Can you...? にはYes, I can. / No, I can\'t. で答える。' },
  { type: '会話表現', question: 'A: Do you have a pen?\nB: ( )', choices: ['Yes, I do.', 'Yes, I am.', 'Yes, I can.', 'Yes, I have.'], answer: 'Yes, I do.', explanation: 'Do you...? にはYes, I do. / No, I don\'t. で答える。' },
  { type: '会話表現', question: 'A: Is this your book?\nB: ( )', choices: ['Yes, it is.', 'Yes, I am.', 'Yes, I do.', 'Yes, it does.'], answer: 'Yes, it is.', explanation: 'Is this...? にはYes, it is. / No, it isn\'t. で答える。' },
  { type: '会話表現', question: 'A: What do you want to be in the future?\nB: ( )', choices: ['I want to be a doctor.', 'I want to eat pizza.', 'I want to go home.', 'I am a student.'], answer: 'I want to be a doctor.', explanation: '将来の夢を答える定番表現。I want to be+職業。' },
  { type: '会話表現', question: 'A: How do you go to school?\nB: ( )', choices: ['I go to school by bike.', 'I go to school every day.', 'I like school.', 'School is fun.'], answer: 'I go to school by bike.', explanation: '通学手段はby+乗り物で答える。' },
  { type: '会話表現', question: 'A: What subject do you like?\nB: ( )', choices: ['I like math.', 'I like summer.', 'I like my friend.', 'I like playing.'], answer: 'I like math.', explanation: '好きな教科はI like+教科名。' },
  { type: '会話表現', question: 'A: Excuse me. Where is the station?\nB: ( )', choices: ['Go straight and turn left.', 'I\'m fine, thank you.', 'Nice to meet you.', 'It\'s Monday.'], answer: 'Go straight and turn left.', explanation: '道案内の定番表現。Go straight=まっすぐ行く。Turn left=左に曲がる。' },

  // ── 並び替え ──────────────────────────────────────
  { type: '並び替え', question: '次の語を並び替えなさい。\nI / to / school / go / every day', choices: ['I go to school every day.', 'I school go to every day.', 'Go I to school every day.', 'Every day I school go to.'], answer: 'I go to school every day.', explanation: '主語→動詞→場所→頻度の語順。' },
  { type: '並び替え', question: '次の語を並び替えなさい。\nshe / does / tennis / play / ?', choices: ['Does she play tennis?', 'She does play tennis?', 'Play does she tennis?', 'Does tennis she play?'], answer: 'Does she play tennis?', explanation: '三単現の疑問文はDoes+主語+動詞の原形。' },
  { type: '並び替え', question: '次の語を並び替えなさい。\nwhat / you / do / like / ?', choices: ['What do you like?', 'What you do like?', 'Do what you like?', 'You do what like?'], answer: 'What do you like?', explanation: '疑問詞+do+主語+動詞の原形の語順。' },
  { type: '並び替え', question: '次の語を並び替えなさい。\nnot / I / do / like / natto', choices: ['I do not like natto.', 'I not do like natto.', 'Do I not like natto.', 'Not I do like natto.'], answer: 'I do not like natto.', explanation: '否定文はI do not（don\'t）+動詞の原形。' },
  { type: '並び替え', question: '次の語を並び替えなさい。\nis / this / whose / bag / ?', choices: ['Whose bag is this?', 'This bag is whose?', 'Is this whose bag?', 'Whose is this bag?'], answer: 'Whose bag is this?', explanation: 'Whose+名詞+be動詞+主語の語順。' },
  { type: '並び替え', question: '次の語を並び替えなさい。\nare / now / running / they', choices: ['They are running now.', 'They running are now.', 'Are they running now.', 'Running they are now.'], answer: 'They are running now.', explanation: '現在進行形は主語+be動詞+動詞ing。' },
  { type: '並び替え', question: '次の語を並び替えなさい。\nyesterday / he / came / here', choices: ['He came here yesterday.', 'Yesterday he here came.', 'He here came yesterday.', 'Came he here yesterday.'], answer: 'He came here yesterday.', explanation: '過去形。comeの過去形はcame。' },
  { type: '並び替え', question: '次の語を並び替えなさい。\nthe / open / door / please', choices: ['Please open the door.', 'Open please the door.', 'The door please open.', 'Open the door please.'], answer: 'Please open the door.', explanation: 'Pleaseを文頭に置く丁寧な命令文。' },

  // ── 英作文 ──────────────────────────────────────────
  { type: '英作文', question: '「私は毎日英語を勉強します。」', choices: ['I study English every day.', 'I studying English every day.', 'I studied English every day.', 'I am study English every day.'], answer: 'I study English every day.', explanation: '現在の習慣なので現在形。三単現ではないのでstudyのまま。' },
  { type: '英作文', question: '「彼女は今音楽を聴いています。」', choices: ['She is listening to music now.', 'She listening to music now.', 'She listen to music now.', 'She listens to music now.'], answer: 'She is listening to music now.', explanation: '現在進行形はbe動詞+動詞ing。' },
  { type: '英作文', question: '「私たちは昨日公園で遊びました。」', choices: ['We played in the park yesterday.', 'We play in the park yesterday.', 'We are playing in the park yesterday.', 'We plays in the park yesterday.'], answer: 'We played in the park yesterday.', explanation: 'yesterdayがあるので過去形played。' },
  { type: '英作文', question: '「彼はサッカーが好きではありません。」', choices: ['He doesn\'t like soccer.', 'He don\'t like soccer.', 'He isn\'t like soccer.', 'He not like soccer.'], answer: 'He doesn\'t like soccer.', explanation: '三人称単数の否定はdoesn\'t+動詞の原形。' },
  { type: '英作文', question: '「あなたはピアノを弾けますか？」', choices: ['Can you play the piano?', 'Do you play the piano?', 'Are you play the piano?', 'Does you play the piano?'], answer: 'Can you play the piano?', explanation: '～できる？はCan+主語+動詞の原形。' },
  { type: '英作文', question: '「これは私のかばんではありません。」', choices: ['This is not my bag.', 'This not is my bag.', 'This does not my bag.', 'Not this is my bag.'], answer: 'This is not my bag.', explanation: 'be動詞の否定はbe動詞+not。' },
  { type: '英作文', question: '「あなたはどこの出身ですか？」', choices: ['Where are you from?', 'Where do you from?', 'Where is you from?', 'Where you are from?'], answer: 'Where are you from?', explanation: '疑問詞Where+be動詞+主語+from？' },
  { type: '英作文', question: '「私の兄は背が高い。」', choices: ['My brother is tall.', 'My brother are tall.', 'My brother tall.', 'My brother has tall.'], answer: 'My brother is tall.', explanation: '主語+be動詞+形容詞の文。三単現なのでis。' },

  // ── 長文読解 ──────────────────────────────────────
  { type: '長文', question: 'Tom likes music. He plays the guitar every day.\nWhat does Tom play?', choices: ['Piano', 'Baseball', 'Guitar', 'Tennis'], answer: 'Guitar', explanation: 'He plays the guitar every day と書かれている。' },
  { type: '長文', question: 'Yuki is a junior high school student. She lives in Kyoto.\nWhere does Yuki live?', choices: ['Tokyo', 'Osaka', 'Kyoto', 'Nara'], answer: 'Kyoto', explanation: 'She lives in Kyoto. と書かれている。' },
  { type: '長文', question: 'Ken gets up at six every morning. He eats breakfast and goes to school.\nWhat time does Ken get up?', choices: ['At five', 'At six', 'At seven', 'At eight'], answer: 'At six', explanation: 'He gets up at six と書かれている。' },
  { type: '長文', question: 'Lisa has two cats. Their names are Kuro and Shiro.\nHow many cats does Lisa have?', choices: ['One', 'Two', 'Three', 'Four'], answer: 'Two', explanation: 'Lisa has two cats. と書かれている。' },
  { type: '長文', question: 'My name is Mike. I am from Australia. I like Japanese food.\nWhere is Mike from?', choices: ['America', 'England', 'Australia', 'Canada'], answer: 'Australia', explanation: 'I am from Australia. と書かれている。' },
  { type: '長文', question: 'Emi studies English on Mondays and Wednesdays. She studies math on Tuesdays.\nWhen does Emi study English?', choices: ['On Mondays and Tuesdays', 'On Mondays and Wednesdays', 'On Tuesdays and Thursdays', 'Every day'], answer: 'On Mondays and Wednesdays', explanation: 'Emi studies English on Mondays and Wednesdays. と書かれている。' },
  { type: '長文', question: 'Taro went to the library yesterday. He read three books.\nHow many books did Taro read?', choices: ['One', 'Two', 'Three', 'Four'], answer: 'Three', explanation: 'He read three books. と書かれている。' },
  { type: '長文', question: 'Saki\'s mother is a doctor. Her father is a teacher.\nWhat does Saki\'s father do?', choices: ['Doctor', 'Teacher', 'Nurse', 'Cook'], answer: 'Teacher', explanation: 'Her father is a teacher. と書かれている。' },
  { type: '長文', question: 'Bob likes swimming. He goes to the pool every Saturday.\nWhen does Bob go to the pool?', choices: ['Every day', 'Every Friday', 'Every Saturday', 'Every Sunday'], answer: 'Every Saturday', explanation: 'He goes to the pool every Saturday. と書かれている。' },
  { type: '長文', question: 'I have a sister. She is two years older than me. She is seventeen.\nHow old is the writer?', choices: ['Fourteen', 'Fifteen', 'Sixteen', 'Seventeen'], answer: 'Fifteen', explanation: '姉は17歳で2歳年上なので、書き手は17-2=15歳。' },

  // ── 教科書頻出表現 ──────────────────────────────────
  { type: '教科書', question: 'My name is Ken. I am from Osaka. Where is Ken from?', choices: ['Tokyo', 'Osaka', 'Kyoto', 'Nara'], answer: 'Osaka', explanation: 'I am from Osaka. と書かれている。' },
  { type: '教科書', question: 'I ( ) twelve years old.', choices: ['am', 'is', 'are', 'be'], answer: 'am', explanation: '年齢を言うときはI am+年齢+years old。' },
  { type: '教科書', question: 'This is ( ) dog. Its name is Hana.', choices: ['I', 'my', 'me', 'mine'], answer: 'my', explanation: '名詞の前に置く所有格はmy。' },
  { type: '教科書', question: 'Look at ( ) picture. It\'s beautiful.', choices: ['this', 'these', 'those', 'them'], answer: 'this', explanation: '単数の名詞を指すときはthis。' },
  { type: '教科書', question: 'I have ( ) idea.', choices: ['a', 'an', 'the', 'some'], answer: 'an', explanation: '母音（i）で始まる単語の前はan。' },
  { type: '教科書', question: 'She is ( ) good singer.', choices: ['a', 'an', 'the', '–'], answer: 'a', explanation: '子音で始まる単語の前はa。' },
];

// ─── 単語問題（60問）────────────────────────────────────────────
export const vocabularyQuestions: Question[] = [
  // 基本動詞
  { type: '単語', question: '「usually」の意味は？', choices: ['めったに〜ない', 'たいてい', 'すぐに', '昨日'], answer: 'たいてい', explanation: 'usually = たいてい' },
  { type: '単語', question: '「always」の意味は？', choices: ['たいてい', 'ときどき', 'いつも', 'めったに〜ない'], answer: 'いつも', explanation: 'always = いつも' },
  { type: '単語', question: '「sometimes」の意味は？', choices: ['いつも', 'たいてい', 'ときどき', 'めったに〜ない'], answer: 'ときどき', explanation: 'sometimes = ときどき' },
  { type: '単語', question: '「never」の意味は？', choices: ['いつも', 'たいてい', 'ときどき', '決して〜ない'], answer: '決して〜ない', explanation: 'never = 決して〜ない' },
  { type: '単語', question: '「often」の意味は？', choices: ['いつも', 'よく・しばしば', 'ときどき', 'めったに〜ない'], answer: 'よく・しばしば', explanation: 'often = よく・しばしば' },
  // 形容詞
  { type: '単語', question: '「important」の意味は？', choices: ['重要な', '美しい', '難しい', '危険な'], answer: '重要な', explanation: 'important = 重要な' },
  { type: '単語', question: '「beautiful」の意味は？', choices: ['醜い', '美しい', '速い', '遅い'], answer: '美しい', explanation: 'beautiful = 美しい' },
  { type: '単語', question: '「difficult」の意味は？', choices: ['簡単な', '楽しい', '難しい', '危険な'], answer: '難しい', explanation: 'difficult = 難しい' },
  { type: '単語', question: '「easy」の意味は？', choices: ['難しい', '簡単な', '危険な', '重要な'], answer: '簡単な', explanation: 'easy = 簡単な' },
  { type: '単語', question: '「interesting」の意味は？', choices: ['退屈な', 'おもしろい', '悲しい', '怖い'], answer: 'おもしろい', explanation: 'interesting = おもしろい' },
  { type: '単語', question: '「hungry」の意味は？', choices: ['眠い', '疲れた', 'お腹がすいた', '嬉しい'], answer: 'お腹がすいた', explanation: 'hungry = お腹がすいた' },
  { type: '単語', question: '「tired」の意味は？', choices: ['元気な', '疲れた', '眠い', '悲しい'], answer: '疲れた', explanation: 'tired = 疲れた' },
  { type: '単語', question: '「popular」の意味は？', choices: ['人気のある', '有名な', '珍しい', '古い'], answer: '人気のある', explanation: 'popular = 人気のある' },
  { type: '単語', question: '「famous」の意味は？', choices: ['人気のある', '有名な', '新しい', '古い'], answer: '有名な', explanation: 'famous = 有名な' },
  { type: '単語', question: '「kind」の意味は？', choices: ['厳しい', '親切な', '賢い', '元気な'], answer: '親切な', explanation: 'kind = 親切な' },
  // 名詞
  { type: '単語', question: '「environment」の意味は？', choices: ['環境', '政府', '経済', '社会'], answer: '環境', explanation: 'environment = 環境' },
  { type: '単語', question: '「culture」の意味は？', choices: ['文化', '農業', '病気', '地図'], answer: '文化', explanation: 'culture = 文化' },
  { type: '単語', question: '「language」の意味は？', choices: ['国語', '言語', '文化', '歴史'], answer: '言語', explanation: 'language = 言語' },
  { type: '単語', question: '「science」の意味は？', choices: ['理科・科学', '数学', '音楽', '体育'], answer: '理科・科学', explanation: 'science = 理科・科学' },
  { type: '単語', question: '「history」の意味は？', choices: ['地理', '歴史', '理科', '数学'], answer: '歴史', explanation: 'history = 歴史' },
  { type: '単語', question: '「library」の意味は？', choices: ['本屋', '図書館', '博物館', '学校'], answer: '図書館', explanation: 'library = 図書館' },
  { type: '単語', question: '「hospital」の意味は？', choices: ['学校', '図書館', '病院', '駅'], answer: '病院', explanation: 'hospital = 病院' },
  { type: '単語', question: '「station」の意味は？', choices: ['駅', '空港', '港', '学校'], answer: '駅', explanation: 'station = 駅' },
  { type: '単語', question: '「restaurant」の意味は？', choices: ['ホテル', 'レストラン', '図書館', '病院'], answer: 'レストラン', explanation: 'restaurant = レストラン' },
  { type: '単語', question: '「weather」の意味は？', choices: ['天気', '季節', '気温', '雨'], answer: '天気', explanation: 'weather = 天気' },
  // 動詞
  { type: '単語', question: '「accept」の意味は？', choices: ['拒絶する', '受け入れる', '期待する', '不平を言う'], answer: '受け入れる', explanation: 'accept = 受け入れる' },
  { type: '単語', question: '「improve」の意味は？', choices: ['証明する', '改善する', '承認する', '提供する'], answer: '改善する', explanation: 'improve = 改善する' },
  { type: '単語', question: '「enjoy」の意味は？', choices: ['楽しむ', '怒る', '忘れる', '疲れる'], answer: '楽しむ', explanation: 'enjoy = 楽しむ' },
  { type: '単語', question: '「visit」の意味は？', choices: ['住む', '訪れる', '通う', '戻る'], answer: '訪れる', explanation: 'visit = 訪れる' },
  { type: '単語', question: '「remember」の意味は？', choices: ['忘れる', '覚える・思い出す', '学ぶ', '教える'], answer: '覚える・思い出す', explanation: 'remember = 覚える・思い出す' },
  { type: '単語', question: '「practice」の意味は？', choices: ['練習する', '休む', '参加する', '準備する'], answer: '練習する', explanation: 'practice = 練習する' },
  { type: '単語', question: '「help」の意味は？', choices: ['邪魔する', '助ける・手伝う', '頼む', '断る'], answer: '助ける・手伝う', explanation: 'help = 助ける・手伝う' },
  { type: '単語', question: '「finish」の意味は？', choices: ['始める', '終える', '続ける', '止める'], answer: '終える', explanation: 'finish = 終える' },
  { type: '単語', question: '「arrive」の意味は？', choices: ['出発する', '到着する', '通過する', '戻る'], answer: '到着する', explanation: 'arrive = 到着する' },
  { type: '単語', question: '「decision」の意味は？', choices: ['質問', '決定', '失敗', '招待'], answer: '決定', explanation: 'decision = 決定' },
  // 前置詞・接続詞
  { type: '単語', question: '「in front of」の意味は？', choices: ['〜の後ろに', '〜の前に', '〜の隣に', '〜の上に'], answer: '〜の前に', explanation: 'in front of = 〜の前に' },
  { type: '単語', question: '「next to」の意味は？', choices: ['〜の前に', '〜の後ろに', '〜の隣に', '〜の上に'], answer: '〜の隣に', explanation: 'next to = 〜の隣に' },
  { type: '単語', question: '「between」の意味は？', choices: ['〜の隣に', '〜と〜の間に', '〜の上に', '〜の中に'], answer: '〜と〜の間に', explanation: 'between = 〜と〜の間に' },
  { type: '単語', question: '「because」の意味は？', choices: ['しかし', 'そして', 'なぜなら', 'または'], answer: 'なぜなら', explanation: 'because = なぜなら〜だから' },
  { type: '単語', question: '「but」の意味は？', choices: ['そして', 'しかし', 'または', 'なぜなら'], answer: 'しかし', explanation: 'but = しかし' },
  // 月・曜日・数字
  { type: '単語', question: '「January」の意味は？', choices: ['3月', '1月', '6月', '9月'], answer: '1月', explanation: 'January = 1月' },
  { type: '単語', question: '「August」の意味は？', choices: ['4月', '6月', '8月', '10月'], answer: '8月', explanation: 'August = 8月' },
  { type: '単語', question: '「Wednesday」の意味は？', choices: ['月曜日', '火曜日', '水曜日', '木曜日'], answer: '水曜日', explanation: 'Wednesday = 水曜日' },
  { type: '単語', question: '「Thursday」の意味は？', choices: ['火曜日', '水曜日', '木曜日', '金曜日'], answer: '木曜日', explanation: 'Thursday = 木曜日' },
  { type: '単語', question: '「spring」の意味は？', choices: ['夏', '秋', '冬', '春'], answer: '春', explanation: 'spring = 春' },
  { type: '単語', question: '「autumn / fall」の意味は？', choices: ['春', '夏', '秋', '冬'], answer: '秋', explanation: 'autumn / fall = 秋' },
  // 身体・家族
  { type: '単語', question: '「shoulder」の意味は？', choices: ['ひざ', '肩', '肘', '足首'], answer: '肩', explanation: 'shoulder = 肩' },
  { type: '単語', question: '「cousin」の意味は？', choices: ['兄弟', 'いとこ', '叔父', '祖父'], answer: 'いとこ', explanation: 'cousin = いとこ' },
  { type: '単語', question: '「uncle」の意味は？', choices: ['祖父', '兄', '叔父・伯父', 'いとこ'], answer: '叔父・伯父', explanation: 'uncle = 叔父・伯父' },
  // 副詞・その他
  { type: '単語', question: '「quickly」の意味は？', choices: ['ゆっくりと', '素早く', '静かに', '大きく'], answer: '素早く', explanation: 'quickly = 素早く' },
  { type: '単語', question: '「together」の意味は？', choices: ['一人で', '一緒に', '別々に', 'そこで'], answer: '一緒に', explanation: 'together = 一緒に' },
  { type: '単語', question: '「abroad」の意味は？', choices: ['国内で', '海外で', '近くで', '遠くで'], answer: '海外で', explanation: 'abroad = 海外で' },
  { type: '単語', question: '「already」の意味は？', choices: ['まだ〜ない', 'もう・すでに', 'いつも', 'ときどき'], answer: 'もう・すでに', explanation: 'already = もう・すでに' },
  { type: '単語', question: '「still」の意味は？', choices: ['もう', 'まだ', 'すでに', '決して'], answer: 'まだ', explanation: 'still = まだ（継続）' },
  { type: '単語', question: '「soon」の意味は？', choices: ['すぐに', '遅く', 'ゆっくり', 'もう一度'], answer: 'すぐに', explanation: 'soon = すぐに' },
  { type: '単語', question: '「enough」の意味は？', choices: ['足りない', '十分な', '多すぎる', '少ない'], answer: '十分な', explanation: 'enough = 十分な' },
  { type: '単語', question: '「special」の意味は？', choices: ['普通の', '特別な', '一般的な', '珍しい'], answer: '特別な', explanation: 'special = 特別な' },
  { type: '単語', question: '「future」の意味は？', choices: ['過去', '現在', '未来', '最近'], answer: '未来', explanation: 'future = 未来' },
  { type: '単語', question: '「dream」の意味は？', choices: ['目標', '夢', '希望', '計画'], answer: '夢', explanation: 'dream = 夢' },
];

// ─── リスニング問題（20問）──────────────────────────────────────
export const listeningQuestions: Question[] = [
  // 単語リスニング
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'beautiful', choices: ['美しい', '危険な', '重要な', '難しい'], answer: '美しい', explanation: 'beautiful（ビューティフル）= 美しい', isListening: true },
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'important', choices: ['重要な', '美しい', '難しい', '危険な'], answer: '重要な', explanation: 'important（インポータント）= 重要な', isListening: true },
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'usually', choices: ['めったに〜ない', 'たいてい', 'すぐに', '昨日'], answer: 'たいてい', explanation: 'usually（ユージュアリー）= たいてい', isListening: true },
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'environment', choices: ['環境', '政府', '経済', '社会'], answer: '環境', explanation: 'environment（エンバイロメント）= 環境', isListening: true },
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'interesting', choices: ['退屈な', 'おもしろい', '悲しい', '怖い'], answer: 'おもしろい', explanation: 'interesting（インタレスティング）= おもしろい', isListening: true },
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'practice', choices: ['休む', '練習する', '参加する', '準備する'], answer: '練習する', explanation: 'practice（プラクティス）= 練習する', isListening: true },
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'language', choices: ['国語', '言語', '文化', '歴史'], answer: '言語', explanation: 'language（ランゲージ）= 言語', isListening: true },
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'together', choices: ['一人で', '一緒に', '別々に', 'そこで'], answer: '一緒に', explanation: 'together（トゥゲザー）= 一緒に', isListening: true },
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'special', choices: ['普通の', '特別な', '一般的な', '珍しい'], answer: '特別な', explanation: 'special（スペシャル）= 特別な', isListening: true },
  { type: 'リスニング（単語）', question: '音声を聞いて、意味を選びなさい。', listenText: 'decision', choices: ['質問', '決定', '失敗', '招待'], answer: '決定', explanation: 'decision（ディシジョン）= 決定', isListening: true },
  // 英文リスニング
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'I play soccer every day after school.', choices: ['毎日放課後サッカーをする', '毎朝学校でテニスをする', '週末に野球をする', '昨日サッカーをした'], answer: '毎日放課後サッカーをする', explanation: 'every day after school = 毎日放課後。', isListening: true },
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'She is reading a book in the library now.', choices: ['彼女は今図書館で本を読んでいる', '彼女は昨日図書館に行った', '彼女は本屋で本を買った', '彼女は音楽を聴いている'], answer: '彼女は今図書館で本を読んでいる', explanation: 'is reading = 読んでいる（現在進行形）。', isListening: true },
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'Tom and his friends went to the park yesterday.', choices: ['トムと友達は昨日公園に行った', 'トムは一人で公園に行った', 'トムたちは明日公園に行く予定だ', 'トムは学校に行った'], answer: 'トムと友達は昨日公園に行った', explanation: 'went = go の過去形。yesterday = 昨日。', isListening: true },
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'My mother cooks dinner every evening.', choices: ['母は毎晩夕食を作る', '母は毎朝朝食を作る', '私は毎晩料理をする', '母は昨日夕食を作った'], answer: '母は毎晩夕食を作る', explanation: 'cooks = 作る（三単現）。every evening = 毎晩。', isListening: true },
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'I go to school by bike every day.', choices: ['自転車で毎日登校する', '電車で毎日登校する', '歩いて学校に行く', '車で学校に行く'], answer: '自転車で毎日登校する', explanation: 'by bike = 自転車で。every day = 毎日。', isListening: true },
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'Ken is playing the piano in his room now.', choices: ['ケンは今部屋でピアノを弾いている', 'ケンは昨日ピアノを弾いた', 'ケンは毎日ピアノを弾く', 'ケンはギターを弾いている'], answer: 'ケンは今部屋でピアノを弾いている', explanation: 'is playing = 弾いている（現在進行形）。in his room = 部屋で。', isListening: true },
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'Yuki visited her grandmother last Sunday.', choices: ['ユキは先週日曜日に祖母を訪ねた', 'ユキは今日祖母を訪ねる', 'ユキは毎週祖母を訪ねる', 'ユキは祖母と住んでいる'], answer: 'ユキは先週日曜日に祖母を訪ねた', explanation: 'visited = visit の過去形。last Sunday = 先週の日曜日。', isListening: true },
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'Do you have any brothers or sisters?', choices: ['兄弟姉妹がいるか尋ねている', '友達がいるか尋ねている', '好きな動物を尋ねている', '住んでいる場所を尋ねている'], answer: '兄弟姉妹がいるか尋ねている', explanation: 'brothers or sisters = 兄弟姉妹。Do you have = いますか？', isListening: true },
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'What time do you usually get up in the morning?', choices: ['朝何時に起きるかを尋ねている', '何時に寝るかを尋ねている', '朝食に何を食べるかを尋ねている', '何時に学校に行くかを尋ねている'], answer: '朝何時に起きるかを尋ねている', explanation: 'What time = 何時。get up = 起きる。in the morning = 朝に。', isListening: true },
  { type: 'リスニング（英文）', question: '音声を聞いて、内容に合うものを選びなさい。', listenText: 'Where did you go last summer vacation?', choices: ['夏休みにどこへ行ったかを尋ねている', '夏休みに何をしたかを尋ねている', '夏休みはいつかを尋ねている', '誰と夏休みを過ごしたかを尋ねている'], answer: '夏休みにどこへ行ったかを尋ねている', explanation: 'Where did you go = どこへ行きましたか。last summer vacation = 去年の夏休み。', isListening: true },
];

// ─── ユーティリティ ──────────────────────────────────────────────
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
  'リスニング（単語）': '音のかたまりをひとつずつ聞き取ろう！',
  'リスニング（英文）': '最初の単語（主語）と動詞に集中して聞こう！',
};

// ─── ボス問題 ────────────────────────────────────────────────────
export const bossQuestions: Question[] = [
  {
    type: '🔥ボス',
    question: 'Ken ( ) soccer with his friends in the park yesterday, but it ( ) raining now.\n\n（2つの空欄に入る組み合わせは？）',
    choices: ['played / is', 'plays / is', 'played / was', 'play / is'],
    answer: 'played / is',
    explanation: '1つ目はyesterdayがあるので過去形played。2つ目はnowがあるので現在進行形is（raining）。',
    examples: [
      'He played tennis yesterday.',
      'It is raining now.',
      'She was tired, but she is fine now.',
    ],
    isBoss: true,
  },
  {
    type: '🔥ボス',
    question: '次の会話の流れとして最も自然なものを選びなさい。\n\nA: What do you want to be in the future?\nB: ___\nA: That\'s great! Why do you want to be one?\nB: Because I want to help sick people.',
    choices: ['I want to be a doctor.', 'I am a student.', 'I like music.', 'I go to school.'],
    answer: 'I want to be a doctor.',
    explanation: '「将来何になりたいですか？」に答え、次に「なぜ医者になりたいか？」と聞かれているので、職業を答える必要がある。',
    examples: [
      'I want to be a teacher.',
      'I want to be an engineer.',
      'I want to be a professional soccer player.',
    ],
    isBoss: true,
  },
  {
    type: '🔥ボス',
    question: '次の英文の誤りを含む部分を選びなさい。\n\n"She don\'t like vegetables, so she always leave them on her plate."',
    choices: ['She don\'t → She doesn\'t', 'like → likes', 'always leave → always leaves', 'on her plate → in her plate'],
    answer: 'She don\'t → She doesn\'t',
    explanation: '主語がShe（三人称単数）なのでdon\'tではなくdoesn\'tが正しい。また leave も leaves が正しいが、最初の誤りが優先。',
    examples: [
      'She doesn\'t like vegetables.',
      'He doesn\'t play soccer.',
      'My sister doesn\'t study math.',
    ],
    isBoss: true,
  },
];

// ─── バッジ定義 ──────────────────────────────────────────────────
export const BADGE_DEFINITIONS = [
  { id: 'first_correct',   emoji: '⭐', name: 'はじめの一歩',     desc: '初めて正解する' },
  { id: 'streak_5',        emoji: '🔥', name: '5連続正解',        desc: '5問連続で正解する' },
  { id: 'streak_10',       emoji: '💥', name: '10連続正解',       desc: '10問連続で正解する' },
  { id: 'total_10',        emoji: '📚', name: '10問クリア',       desc: '合計10問正解する' },
  { id: 'total_50',        emoji: '🏅', name: '50問クリア',       desc: '合計50問正解する' },
  { id: 'total_100',       emoji: '🏆', name: '100問クリア',      desc: '合計100問正解する' },
  { id: 'boss_clear',      emoji: '👑', name: 'ボス撃破',         desc: 'ボス問題に正解する' },
  { id: 'listening_clear', emoji: '🎧', name: 'リスナー',         desc: 'リスニングを10問正解する' },
  { id: 'perfect',         emoji: '💯', name: 'パーフェクト',     desc: '1セッション全問正解する' },
  { id: 'vocab_master',    emoji: '📖', name: '単語マスター',     desc: '単語モードを20問正解する' },
  { id: 'typing_star',     emoji: '⌨️', name: 'タイピングスター', desc: 'タイピングモードで5問正解する' },
  { id: 'seven_days',      emoji: '📅', name: '7日連続',          desc: '7日連続で学習する' },
];
