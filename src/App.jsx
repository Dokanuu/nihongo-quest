import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "nihongo_quest_stable_v4";

const WORDS = [
  { id: 1, level: "N5", theme: "daily", kana: "ともだち", kanji: "友達", tr: "arkadaş", jp: "友達を待っています。", furigana: [["友達", "ともだち"], ["待", "ま"]], trEx: "Arkadaşımı bekliyorum." },
  { id: 2, level: "N5", theme: "music", kana: "おんがく", kanji: "音楽", tr: "müzik", jp: "音楽を聞きます。", furigana: [["音楽", "おんがく"], ["聞", "き"]], trEx: "Müzik dinlerim." },
  { id: 3, level: "N5", theme: "gaming", kana: "ゲーム", kanji: "ゲーム", tr: "oyun", jp: "夜にゲームをします。", furigana: [["夜", "よる"]], trEx: "Gece oyun oynarım." },
  { id: 4, level: "N5", theme: "daily", kana: "がっこう", kanji: "学校", tr: "okul", jp: "学校へ行きます。", furigana: [["学校", "がっこう"], ["行", "い"]], trEx: "Okula giderim." },
  { id: 5, level: "N5", theme: "daily", kana: "せんせい", kanji: "先生", tr: "öğretmen", jp: "先生に聞きます。", furigana: [["先生", "せんせい"], ["聞", "き"]], trEx: "Öğretmene sorarım." },
  { id: 6, level: "N5", theme: "daily", kana: "がくせい", kanji: "学生", tr: "öğrenci", jp: "私は学生です。", furigana: [["私", "わたし"], ["学生", "がくせい"]], trEx: "Ben öğrenciyim." },
  { id: 7, level: "N5", theme: "daily", kana: "にほんご", kanji: "日本語", tr: "Japonca", jp: "日本語を勉強します。", furigana: [["日本語", "にほんご"], ["勉強", "べんきょう"]], trEx: "Japonca çalışırım." },
  { id: 8, level: "N5", theme: "daily", kana: "べんきょう", kanji: "勉強", tr: "ders çalışma", jp: "毎日勉強します。", furigana: [["毎日", "まいにち"], ["勉強", "べんきょう"]], trEx: "Her gün ders çalışırım." },
  { id: 9, level: "N5", theme: "daily", kana: "ほん", kanji: "本", tr: "kitap", jp: "本を読みます。", furigana: [["本", "ほん"], ["読", "よ"]], trEx: "Kitap okurum." },
  { id: 10, level: "N5", theme: "daily", kana: "みず", kanji: "水", tr: "su", jp: "水を飲みます。", furigana: [["水", "みず"], ["飲", "の"]], trEx: "Su içerim." },
  { id: 11, level: "N5", theme: "daily", kana: "えき", kanji: "駅", tr: "istasyon", jp: "駅で友達を待ちます。", furigana: [["駅", "えき"], ["友達", "ともだち"], ["待", "ま"]], trEx: "İstasyonda arkadaşımı beklerim." },
  { id: 12, level: "N5", theme: "daily", kana: "でんしゃ", kanji: "電車", tr: "tren", jp: "電車で学校へ行きます。", furigana: [["電車", "でんしゃ"], ["学校", "がっこう"], ["行", "い"]], trEx: "Trenle okula giderim." },
  { id: 13, level: "N5", theme: "daily", kana: "かいます", kanji: "買います", tr: "satın alır", jp: "新しい本を買います。", furigana: [["新", "あたら"], ["本", "ほん"], ["買", "か"]], trEx: "Yeni kitap alırım." },
  { id: 14, level: "N5", theme: "daily", kana: "たべます", kanji: "食べます", tr: "yer", jp: "ラーメンを食べます。", furigana: [["食", "た"]], trEx: "Ramen yerim." },
  { id: 15, level: "N5", theme: "music", kana: "ききます", kanji: "聞きます", tr: "dinler / sorar", jp: "毎日音楽を聞きます。", furigana: [["毎日", "まいにち"], ["音楽", "おんがく"], ["聞", "き"]], trEx: "Her gün müzik dinlerim." },
  { id: 16, level: "N5", theme: "gaming", kana: "あそびます", kanji: "遊びます", tr: "oynar / eğlenir", jp: "友達と遊びます。", furigana: [["友達", "ともだち"], ["遊", "あそ"]], trEx: "Arkadaşımla oynarım." },
  { id: 17, level: "N5", theme: "daily", kana: "すき", kanji: "好き", tr: "sevmek / sevilen", jp: "ゲームが好きです。", furigana: [["好", "す"]], trEx: "Oyunları severim." },
  { id: 18, level: "N5", theme: "daily", kana: "むずかしい", kanji: "難しい", tr: "zor", jp: "漢字は難しいです。", furigana: [["漢字", "かんじ"], ["難", "むずか"]], trEx: "Kanji zordur." },
  { id: 19, level: "N5", theme: "daily", kana: "やすい", kanji: "安い", tr: "ucuz", jp: "これは安いです。", furigana: [["安", "やす"]], trEx: "Bu ucuz." },
  { id: 20, level: "N5", theme: "daily", kana: "たかい", kanji: "高い", tr: "pahalı / yüksek", jp: "この店は高いです。", furigana: [["店", "みせ"], ["高", "たか"]], trEx: "Bu dükkan pahalı." },
  { id: 21, level: "N4", theme: "daily", kana: "けいけん", kanji: "経験", tr: "deneyim", jp: "日本でいい経験をしました。", furigana: [["日本", "にほん"], ["経験", "けいけん"]], trEx: "Japonya'da iyi bir deneyim yaşadım." },
  { id: 22, level: "N4", theme: "daily", kana: "れんしゅう", kanji: "練習", tr: "pratik", jp: "毎日会話を練習します。", furigana: [["毎日", "まいにち"], ["会話", "かいわ"], ["練習", "れんしゅう"]], trEx: "Her gün konuşma pratiği yaparım." },
  { id: 23, level: "N4", theme: "daily", kana: "しけん", kanji: "試験", tr: "sınav", jp: "六月に試験があります。", furigana: [["六月", "ろくがつ"], ["試験", "しけん"]], trEx: "Haziranda sınav var." },
  { id: 24, level: "N4", theme: "daily", kana: "ごうかく", kanji: "合格", tr: "sınavı geçme", jp: "JLPTに合格したいです。", furigana: [["合格", "ごうかく"]], trEx: "JLPT'yi geçmek istiyorum." },
  { id: 25, level: "N4", theme: "daily", kana: "もくひょう", kanji: "目標", tr: "hedef", jp: "私の目標はN4です。", furigana: [["私", "わたし"], ["目標", "もくひょう"]], trEx: "Benim hedefim N4." },
  { id: 26, level: "N4", theme: "daily", kana: "おぼえます", kanji: "覚えます", tr: "ezberler / hatırlar", jp: "新しい言葉を覚えます。", furigana: [["新", "あたら"], ["言葉", "ことば"], ["覚", "おぼ"]], trEx: "Yeni kelime ezberlerim." },
  { id: 27, level: "N4", theme: "daily", kana: "わすれます", kanji: "忘れます", tr: "unutur", jp: "宿題を忘れました。", furigana: [["宿題", "しゅくだい"], ["忘", "わす"]], trEx: "Ödevi unuttum." },
  { id: 28, level: "N4", theme: "daily", kana: "おもいます", kanji: "思います", tr: "düşünür", jp: "日本語は面白いと思います。", furigana: [["日本語", "にほんご"], ["面白", "おもしろ"], ["思", "おも"]], trEx: "Japoncanın eğlenceli olduğunu düşünüyorum." },
  { id: 29, level: "N4", theme: "daily", kana: "つづけます", kanji: "続けます", tr: "devam eder", jp: "毎日続けます。", furigana: [["毎日", "まいにち"], ["続", "つづ"]], trEx: "Her gün devam ederim." },
  { id: 30, level: "N4", theme: "daily", kana: "ひつよう", kanji: "必要", tr: "gerekli", jp: "毎日の練習が必要です。", furigana: [["毎日", "まいにち"], ["練習", "れんしゅう"], ["必要", "ひつよう"]], trEx: "Günlük pratik gerekli." },
  { id: 31, level: "N4", theme: "daily", kana: "べんり", kanji: "便利", tr: "kullanışlı", jp: "このアプリは便利です。", furigana: [["便利", "べんり"]], trEx: "Bu uygulama kullanışlı." },
  { id: 32, level: "N4", theme: "music", kana: "うた", kanji: "歌", tr: "şarkı", jp: "日本語の歌を覚えます。", furigana: [["日本語", "にほんご"], ["歌", "うた"], ["覚", "おぼ"]], trEx: "Japonca şarkı ezberlerim." },
  { id: 33, level: "N4", theme: "music", kana: "きょく", kanji: "曲", tr: "parça / şarkı", jp: "この曲を聞いてください。", furigana: [["曲", "きょく"], ["聞", "き"]], trEx: "Bu parçayı dinle lütfen." },
  { id: 34, level: "N4", theme: "gaming", kana: "ぼうけん", kanji: "冒険", tr: "macera", jp: "新しい世界で冒険します。", furigana: [["新", "あたら"], ["世界", "せかい"], ["冒険", "ぼうけん"]], trEx: "Yeni dünyada macera yaşarım." },
  { id: 35, level: "N4", theme: "gaming", kana: "どうぐ", kanji: "道具", tr: "alet / eşya", jp: "道具を集めます。", furigana: [["道具", "どうぐ"], ["集", "あつ"]], trEx: "Eşyaları toplarım." },
  { id: 36, level: "N4", theme: "gaming", kana: "ぶき", kanji: "武器", tr: "silah", jp: "強い武器を作ります。", furigana: [["強", "つよ"], ["武器", "ぶき"], ["作", "つく"]], trEx: "Güçlü silah yaparım." },
  { id: 37, level: "N4", theme: "gaming", kana: "たおします", kanji: "倒します", tr: "yener / devirir", jp: "ボスを倒します。", furigana: [["倒", "たお"]], trEx: "Boss'u yenerim." },
  { id: 38, level: "N4", theme: "daily", kana: "さがします", kanji: "探します", tr: "arar", jp: "アルバイトを探しています。", furigana: [["探", "さが"]], trEx: "Part-time iş arıyorum." }
];

const QUESTS = [
  { id: "seen10", title: "10 kart gör", target: 10, type: "seen", reward: 60 },
  { id: "known5", title: "5 doğru yap", target: 5, type: "known", reward: 70 },
  { id: "n4_3", title: "3 N4 kart çalış", target: 3, type: "n4", reward: 80 },
  { id: "music2", title: "2 müzik kelimesi gör", target: 2, type: "music", reward: 50 }
];

const SHOP = [
  { id: "fire", name: "Alev Tema", price: 120, desc: "Kartlara sıcak savaş efekti verir." },
  { id: "neon", name: "Neon Gece", price: 160, desc: "Müzik ve gece çalışma havası verir." },
  { id: "shield", name: "Combo Kalkanı", price: 90, desc: "Motivasyon eşyası." },
  { id: "chest", name: "Kelime Sandığı", price: 110, desc: "Koleksiyon hissi için ödül eşyası." }
];

const INITIAL = {
  xp: 0,
  coins: 180,
  combo: 0,
  bestCombo: 0,
  seen: 0,
  known: 0,
  wrong: 0,
  hard: 0,
  n4: 0,
  music: 0,
  favorites: [],
  hardList: [],
  mastered: [],
  claimed: [],
  bought: [],
  quizRight: 0,
  quizTotal: 0,
  lastDay: ""
};

function cn(...items) {
  return items.filter(Boolean).join(" ");
}

function todayKey() {
  return new Date().toDateString();
}

function makeQuizOptions(card, seed) {
  const options = [card];
  const pool = WORDS.filter((word) => word.id !== card.id);
  let cursor = Math.abs(seed * 7 + card.id * 3);
  while (options.length < 4 && pool.length > 0) {
    const candidate = pool[cursor % pool.length];
    if (!options.some((word) => word.id === candidate.id)) options.push(candidate);
    cursor += 11;
  }
  return options.sort((a, b) => ((a.id * 13 + seed) % 17) - ((b.id * 13 + seed) % 17));
}

function assertTests() {
  console.assert(Array.isArray(WORDS), "WORDS bir array olmalı");
  console.assert(WORDS.length >= 30, "En az 30 kelime olmalı");
  console.assert(WORDS.some((w) => w.level === "N5"), "N5 kelime olmalı");
  console.assert(WORDS.some((w) => w.level === "N4"), "N4 kelime olmalı");
  console.assert(WORDS.some((w) => w.theme === "gaming"), "Gaming temalı kelime olmalı");
  console.assert(WORDS.some((w) => w.theme === "music"), "Music temalı kelime olmalı");
  console.assert(WORDS.every((w) => w.kana && w.kanji && w.tr && w.jp && w.trEx), "Her kartta ana alanlar olmalı");
  console.assert(QUESTS.every((q) => q.target > 0 && q.reward > 0), "Görev hedefleri ve ödülleri pozitif olmalı");
  const options = makeQuizOptions(WORDS[0], 1);
  console.assert(options.length === 4, "Quiz 4 seçenek üretmeli");
  console.assert(options.some((word) => word.id === WORDS[0].id), "Quiz seçeneklerinde doğru cevap olmalı");
  console.assert(SHOP.every((item) => item.price > 0), "Market fiyatları pozitif olmalı");
}
assertTests();

function safeLoad() {
  try {
    if (typeof window === "undefined") return { ...INITIAL, lastDay: todayKey() };
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL, lastDay: todayKey() };
    const parsed = JSON.parse(raw);
    if (parsed.lastDay !== todayKey()) {
      return { ...INITIAL, ...parsed, seen: 0, known: 0, wrong: 0, hard: 0, n4: 0, music: 0, combo: 0, claimed: [], lastDay: todayKey() };
    }
    return { ...INITIAL, ...parsed };
  } catch {
    return { ...INITIAL, lastDay: todayKey() };
  }
}

function safeSave(state) {
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Kayıt yapılamadı", error);
  }
}

function Icon({ name, className = "" }) {
  const icons = { star: "★", fire: "🔥", book: "本", game: "🎮", music: "♪", heart: "♥", home: "⌂", sword: "⚔", shop: "店", user: "人", check: "✓", x: "×", question: "?", coin: "¥", quiz: "問", boss: "王", target: "◎" };
  return <span className={className}>{icons[name] || "◆"}</span>;
}

function speak(text) {
  try {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "ja-JP";
    msg.rate = 0.82;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
  } catch (error) {
    console.warn("Ses çalışmadı", error);
  }
}

function RubySentence({ text, furigana = [] }) {
  let parts = [{ text, ruby: null }];
  furigana.forEach(([target, reading]) => {
    const next = [];
    parts.forEach((part) => {
      if (part.ruby || !part.text.includes(target)) {
        next.push(part);
        return;
      }
      const split = part.text.split(target);
      split.forEach((piece, index) => {
        if (piece) next.push({ text: piece, ruby: null });
        if (index < split.length - 1) next.push({ text: target, ruby: reading });
      });
    });
    parts = next;
  });
  return <>{parts.map((part, index) => part.ruby ? <ruby key={`${part.text}-${index}`} className="mx-0.5">{part.text}<rt className="text-[10px] text-slate-300">{part.ruby}</rt></ruby> : <span key={`${part.text}-${index}`}>{part.text}</span>)}</>;
}

function Stat({ label, value, icon, color }) {
  return (
    <div className={cn("rounded-2xl border bg-slate-950/75 p-3 shadow-xl", color)}>
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl font-black"><Icon name={icon} /></div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-white/60">{label}</p>
          <p className="text-xl font-black text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ active, label, icon, onClick }) {
  return (
    <button type="button" onClick={onClick} className={cn("min-w-[82px] rounded-3xl border px-3 py-3 text-center shadow-xl active:scale-95", active ? "border-yellow-200 bg-yellow-300 text-slate-950" : "border-white/10 bg-slate-950/75 text-white")}>
      <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-orange-500 text-2xl font-black text-white shadow-lg"><Icon name={icon} /></div>
      <p className="text-xs font-black">{label}</p>
    </button>
  );
}

function FlashCard({ card, flipped, onFlip, favorite, onFavorite, theme }) {
  const neon = theme === "neon";
  return (
    <div className="relative mt-4 px-4">
      <button type="button" onClick={onFlip} className={cn("relative min-h-[340px] w-full overflow-hidden rounded-[34px] border-4 p-5 text-center shadow-2xl active:scale-[.99]", neon ? "border-cyan-300 bg-gradient-to-br from-slate-950 via-indigo-950 to-cyan-950 text-white" : "border-orange-300 bg-gradient-to-br from-amber-50 via-orange-50 to-white text-slate-950")}>
        <div className="relative flex items-center justify-between">
          <span className={cn("rounded-2xl px-4 py-2 text-xl font-black text-white shadow-lg", card.level === "N5" ? "bg-orange-500" : "bg-purple-600")}>{card.level}</span>
          <span className="rounded-2xl bg-white/20 p-2 text-3xl font-black" onClick={(e) => { e.stopPropagation(); onFavorite(); }}><Icon name="star" className={favorite ? "text-yellow-300" : neon ? "text-white" : "text-amber-700"} /></span>
        </div>
        {!flipped ? (
          <div className="relative pt-8">
            <p className={cn("text-6xl font-black tracking-tight", neon ? "text-white" : "text-slate-950")}>{card.kana}</p>
            <p className={cn("mt-4 text-5xl font-black", neon ? "text-cyan-100" : "text-slate-900")}>{card.kanji}</p>
            <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            <p className={cn("mt-6 text-4xl font-black", neon ? "text-yellow-300" : "text-orange-600")}>{card.tr}</p>
            <p className={cn("mt-5 text-sm font-bold", neon ? "text-white/60" : "text-slate-500")}>Karta dokun: örnek cümle açılır</p>
          </div>
        ) : (
          <div className="relative pt-6">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-400">Örnek Cümle</p>
            <div className="mt-5 rounded-3xl border border-white/15 bg-slate-950/90 p-5 text-white shadow-xl">
              <p className="text-3xl font-black leading-relaxed"><RubySentence text={card.jp} furigana={card.furigana} /></p>
              <p className="mt-4 text-2xl font-black text-slate-300">{card.trEx}</p>
              <button type="button" onClick={(e) => { e.stopPropagation(); speak(card.jp); }} className="mt-5 rounded-2xl bg-orange-500 px-5 py-3 text-lg font-black text-white shadow-lg active:scale-95">Sesli Dinle</button>
            </div>
            <p className="mt-4 text-lg font-black text-yellow-300">TR: {card.tr}</p>
          </div>
        )}
      </button>
    </div>
  );
}

function ActionButton({ icon, label, sub, color, onClick }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex min-h-[82px] flex-1 items-center justify-center gap-2 rounded-3xl border-4 px-2 py-3 text-white shadow-xl active:scale-95", color)}>
      <Icon name={icon} className="text-4xl font-black" />
      <div className="text-left leading-tight"><p className="text-lg font-black">{label}</p><p className="text-xs font-black text-white/80">{sub}</p></div>
    </button>
  );
}

export default function NihongoQuestApp() {
  const [state, setState] = useState(safeLoad);
  const [tab, setTab] = useState("home");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [toast, setToast] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizResult, setQuizResult] = useState("");
  const [sprintLeft, setSprintLeft] = useState(0);

  useEffect(() => safeSave(state), [state]);

  const filteredWords = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORDS.filter((word) => {
      const byFilter = filter === "all" || word.level === filter || word.theme === filter || (filter === "favorites" && state.favorites.includes(word.id)) || (filter === "hard" && state.hardList.includes(word.id));
      const bySearch = !q || `${word.kana} ${word.kanji} ${word.tr} ${word.jp} ${word.trEx}`.toLowerCase().includes(q);
      return byFilter && bySearch;
    });
  }, [filter, query, state.favorites, state.hardList]);

  const card = filteredWords[index % Math.max(filteredWords.length, 1)] || WORDS[0];
  const level = Math.floor(state.xp / 250) + 1;
  const levelXp = state.xp % 250;
  const theme = state.bought.includes("neon") ? "neon" : "fire";
  const quizCard = WORDS[(quizIndex + state.seen + state.known) % WORDS.length];
  const quizOptions = useMemo(() => makeQuizOptions(quizCard, quizIndex + state.quizTotal), [quizCard, quizIndex, state.quizTotal]);
  const accuracy = state.quizTotal ? Math.round((state.quizRight / state.quizTotal) * 100) : 0;

  function notify(text) {
    setToast(text);
    if (typeof window !== "undefined") window.setTimeout(() => setToast(""), 1600);
  }

  function nextCard() {
    setFlipped(false);
    setIndex((value) => (value + 1) % Math.max(filteredWords.length, 1));
  }

  function answer(mode) {
    const known = mode === "known";
    const hard = mode === "hard";
    const xpGain = known ? 20 + Math.min(state.combo, 10) : hard ? 10 : 4;
    const coinGain = known ? 10 : hard ? 5 : 1;
    setState((old) => ({
      ...old,
      xp: old.xp + xpGain,
      coins: old.coins + coinGain,
      combo: known ? old.combo + 1 : 0,
      bestCombo: known ? Math.max(old.bestCombo, old.combo + 1) : old.bestCombo,
      seen: old.seen + 1,
      known: old.known + (known ? 1 : 0),
      wrong: old.wrong + (mode === "wrong" ? 1 : 0),
      hard: old.hard + (hard ? 1 : 0),
      n4: old.n4 + (card.level === "N4" ? 1 : 0),
      music: old.music + (card.theme === "music" ? 1 : 0),
      mastered: known ? Array.from(new Set([...old.mastered, card.id])) : old.mastered,
      hardList: hard ? Array.from(new Set([...old.hardList, card.id])) : old.hardList
    }));
    if (sprintLeft > 0) setSprintLeft((value) => Math.max(0, value - 1));
    notify(known ? `+${xpGain} XP | Combo yükseldi` : hard ? `+${xpGain} XP | Zor listesine eklendi` : `+${xpGain} XP | Tekrar göreceksin`);
    nextCard();
  }

  function answerQuiz(choice) {
    if (quizResult) return;
    const correct = choice.id === quizCard.id;
    setQuizResult(correct ? "DOĞRU CEVAP" : `YANLIŞ | Doğru: ${quizCard.kana} / ${quizCard.tr}`);
    setState((old) => ({
      ...old,
      xp: old.xp + (correct ? 30 : 6),
      coins: old.coins + (correct ? 15 : 2),
      quizTotal: old.quizTotal + 1,
      quizRight: old.quizRight + (correct ? 1 : 0),
      combo: correct ? old.combo + 1 : 0,
      bestCombo: correct ? Math.max(old.bestCombo, old.combo + 1) : old.bestCombo,
      mastered: correct ? Array.from(new Set([...old.mastered, quizCard.id])) : old.mastered,
      hardList: correct ? old.hardList : Array.from(new Set([...old.hardList, quizCard.id]))
    }));
    if (typeof window !== "undefined") window.setTimeout(() => { setQuizResult(""); setQuizIndex((value) => value + 1); }, 1000);
  }

  function toggleFavorite() {
    setState((old) => ({ ...old, favorites: old.favorites.includes(card.id) ? old.favorites.filter((id) => id !== card.id) : [...old.favorites, card.id] }));
  }

  function questProgress(type) {
    if (type === "seen") return state.seen;
    if (type === "known") return state.known;
    if (type === "n4") return state.n4;
    if (type === "music") return state.music;
    return 0;
  }

  function claimQuest(quest) {
    const ready = questProgress(quest.type) >= quest.target;
    if (!ready || state.claimed.includes(quest.id)) return;
    setState((old) => ({ ...old, xp: old.xp + quest.reward, coins: old.coins + Math.floor(quest.reward / 2), claimed: [...old.claimed, quest.id] }));
    notify(`${quest.title} tamamlandı`);
  }

  function buy(item) {
    if (state.bought.includes(item.id)) return notify("Zaten sende var");
    if (state.coins < item.price) return notify("Yeterli altın yok");
    setState((old) => ({ ...old, coins: old.coins - item.price, bought: [...old.bought, item.id] }));
    notify(`${item.name} alındı`);
  }

  function resetToday() {
    setState((old) => ({ ...old, seen: 0, known: 0, wrong: 0, hard: 0, n4: 0, music: 0, combo: 0, claimed: [], lastDay: todayKey() }));
    setSprintLeft(0);
    notify("Bugün sıfırlandı");
  }

  function startSprint() {
    setSprintLeft(10);
    setTab("home");
    setFilter("all");
    notify("10 kartlık odak sprinti başladı");
  }

  const navItems = [["home", "home", "Ana Sayfa"], ["quiz", "boss", "Quiz"], ["collection", "book", "Kartlar"], ["quests", "sword", "Görev"], ["shop", "shop", "Dükkan"], ["profile", "user", "Profil"]];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(249,115,22,.45),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,.45),transparent_35%),linear-gradient(180deg,#0f1026,#09011b_55%,#030712)]" />
      <div className="relative mx-auto min-h-screen max-w-md overflow-hidden pb-28 shadow-2xl shadow-black">
        <header className="px-4 pt-4">
          <div className="flex items-center justify-between text-sm font-black text-white/90"><span>9:41</span><span>●●● Wi‑Fi ▱</span></div>
          <div className="relative mt-3 overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/50 p-5 shadow-2xl backdrop-blur">
            <div className="relative text-center">
              <h1 className="text-5xl font-black italic tracking-tight text-white drop-shadow-[0_4px_0_rgba(88,28,135,1)]">Nihongo<span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">Quest</span></h1>
              <div className="mx-auto mt-2 w-fit rounded-xl border border-cyan-300/60 bg-slate-950/80 px-5 py-1 text-xl font-black tracking-widest text-cyan-200">N5 • N4</div>
            </div>
            <div className="relative mt-4 grid grid-cols-2 gap-2">
              <Stat icon="star" label="XP" value={state.xp} color="border-yellow-400/50" />
              <Stat icon="fire" label="Combo" value={`${state.combo || state.bestCombo}x`} color="border-orange-400/50" />
              <Stat icon="book" label="Bugün" value={`${state.seen} kart`} color="border-green-400/50" />
              <Stat icon="coin" label="Altın" value={state.coins} color="border-purple-400/50" />
              <Stat icon="quiz" label="Quiz" value={`${accuracy}%`} color="border-cyan-400/50" />
            </div>
          </div>
        </header>

        {tab === "home" && (
          <section>
            <div className="mt-4 flex gap-2 overflow-x-auto px-4 pb-2">
              <FilterButton active={filter === "all"} icon="book" label="Hepsi" onClick={() => { setFilter("all"); setIndex(0); }} />
              <FilterButton active={filter === "gaming"} icon="game" label="Gaming" onClick={() => { setFilter("gaming"); setIndex(0); }} />
              <FilterButton active={filter === "music"} icon="music" label="Music" onClick={() => { setFilter("music"); setIndex(0); }} />
              <FilterButton active={filter === "N5"} icon="star" label="N5" onClick={() => { setFilter("N5"); setIndex(0); }} />
              <FilterButton active={filter === "N4"} icon="sword" label="N4" onClick={() => { setFilter("N4"); setIndex(0); }} />
              <FilterButton active={filter === "favorites"} icon="heart" label="Favori" onClick={() => { setFilter("favorites"); setIndex(0); }} />
              <FilterButton active={filter === "hard"} icon="question" label="Zor" onClick={() => { setFilter("hard"); setIndex(0); }} />
            </div>
            <FlashCard card={card} flipped={flipped} onFlip={() => setFlipped((value) => !value)} favorite={state.favorites.includes(card.id)} onFavorite={toggleFavorite} theme={theme} />
            <div className="mx-4 mt-4 rounded-3xl border border-orange-400/40 bg-slate-950/80 p-4 shadow-xl">
              <div className="mb-2 flex items-center justify-between"><span className="font-black text-yellow-300">Seviye {level}</span><span className="font-black text-white/80">{levelXp} / 250 XP</span></div>
              <div className="h-5 overflow-hidden rounded-full border border-white/15 bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-orange-500 to-red-500" style={{ width: `${(levelXp / 250) * 100}%` }} /></div>
            </div>
            <div className="mx-4 mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={startSprint} className="rounded-3xl border border-cyan-300/40 bg-cyan-500/15 p-4 text-left shadow-xl active:scale-95"><p className="text-sm font-black text-cyan-200">ODAK SPRINT</p><p className="text-2xl font-black">{sprintLeft > 0 ? `${sprintLeft} kart kaldı` : "10 kart başlat"}</p><p className="text-xs font-bold text-white/60">Dikkat dağılmadan kısa set.</p></button>
              <button type="button" onClick={() => setTab("quiz")} className="rounded-3xl border border-yellow-300/40 bg-yellow-500/15 p-4 text-left shadow-xl active:scale-95"><p className="text-sm font-black text-yellow-200">BOSS QUIZ</p><p className="text-2xl font-black">4 seçenek</p><p className="text-xs font-bold text-white/60">Türkçeden Japoncayı bul.</p></button>
            </div>
            <div className="mt-4 flex gap-2 px-4">
              <ActionButton icon="x" label="Bilmedim" sub="Tekrar gör" color="border-red-300 bg-gradient-to-br from-red-500 to-rose-800" onClick={() => answer("wrong")} />
              <ActionButton icon="question" label="Zor" sub="Listeye al" color="border-yellow-300 bg-gradient-to-br from-yellow-500 to-orange-700" onClick={() => answer("hard")} />
              <ActionButton icon="check" label="Bildim" sub="İyi gidiyor" color="border-green-300 bg-gradient-to-br from-green-500 to-emerald-800" onClick={() => answer("known")} />
            </div>
          </section>
        )}

        {tab === "quiz" && (
          <section className="px-4 pt-4">
            <div className="rounded-[32px] border border-yellow-300/40 bg-gradient-to-br from-slate-950/90 via-purple-950/70 to-orange-950/70 p-5 text-center shadow-xl">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border-4 border-yellow-300 bg-gradient-to-br from-orange-500 to-purple-700 text-5xl font-black"><Icon name="boss" /></div>
              <h2 className="mt-3 text-3xl font-black">Boss Quiz</h2>
              <p className="mt-1 font-bold text-white/60">Türkçeyi gör, doğru Japonca kartı seç.</p>
              <div className="mt-4 grid grid-cols-3 gap-2"><Stat icon="target" label="Doğru" value={state.quizRight} color="border-green-400/50" /><Stat icon="quiz" label="Toplam" value={state.quizTotal} color="border-cyan-400/50" /><Stat icon="star" label="Oran" value={`${accuracy}%`} color="border-yellow-400/50" /></div>
            </div>
            <div className="mt-4 rounded-[32px] border-4 border-orange-300 bg-gradient-to-br from-amber-50 to-white p-5 text-center text-slate-950 shadow-2xl"><p className="text-sm font-black uppercase tracking-[0.3em] text-orange-500">Anlamı bul</p><p className="mt-3 text-5xl font-black text-orange-600">{quizCard.tr}</p><p className="mt-3 text-sm font-black text-slate-500">Seviye: {quizCard.level} | Tema: {quizCard.theme}</p></div>
            {quizResult && <div className={cn("mt-4 rounded-3xl border p-4 text-center text-2xl font-black shadow-xl", quizResult.startsWith("DOĞRU") ? "border-green-300 bg-green-500/20 text-green-200" : "border-red-300 bg-red-500/20 text-red-200")}>{quizResult}</div>}
            <div className="mt-4 grid gap-3">{quizOptions.map((option) => <button key={option.id} type="button" onClick={() => answerQuiz(option)} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-left shadow-xl active:scale-[.99]"><div className="flex items-center justify-between gap-3"><div><p className="text-3xl font-black text-white">{option.kana}</p><p className="text-xl font-black text-white/60">{option.kanji}</p></div><span className={cn("rounded-xl px-3 py-1 font-black text-white", option.level === "N5" ? "bg-orange-500" : "bg-purple-600")}>{option.level}</span></div></button>)}</div>
          </section>
        )}

        {tab === "collection" && (
          <section className="px-4 pt-4">
            <div className="rounded-[32px] border border-white/10 bg-slate-950/75 p-4 shadow-xl"><h2 className="text-3xl font-black">Koleksiyon</h2><p className="mt-1 font-bold text-white/60">Kelime ara, favorileri ve zor kartları gör.</p><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Türkçe, kana, kanji ara" className="mt-4 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-bold text-white outline-none placeholder:text-white/40" /></div>
            <div className="mt-4 space-y-3">{filteredWords.map((word) => <div key={word.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-lg"><div className="flex items-start justify-between gap-3"><div><p className="text-2xl font-black">{word.kana} <span className="text-white/50">/ {word.kanji}</span></p><p className="text-xl font-black text-orange-300">{word.tr}</p></div><span className={cn("rounded-xl px-3 py-1 font-black", word.level === "N5" ? "bg-orange-500" : "bg-purple-600")}>{word.level}</span></div><p className="mt-3 text-lg font-black text-white"><RubySentence text={word.jp} furigana={word.furigana} /></p><p className="font-bold text-white/60">{word.trEx}</p></div>)}</div>
          </section>
        )}

        {tab === "quests" && (
          <section className="px-4 pt-4">
            <div className="rounded-[32px] border border-orange-300/40 bg-gradient-to-br from-slate-950/90 to-orange-950/70 p-5 shadow-xl"><h2 className="text-3xl font-black">Günlük Görevler</h2><p className="mt-1 font-bold text-white/60">Tamamlanınca ödül alınır.</p><button type="button" onClick={resetToday} className="mt-4 rounded-2xl bg-white/10 px-4 py-2 font-black text-white active:scale-95">Bugünü sıfırla</button></div>
            <div className="mt-4 space-y-3">{QUESTS.map((quest) => { const progress = Math.min(questProgress(quest.type), quest.target); const done = progress >= quest.target; const claimed = state.claimed.includes(quest.id); return <button key={quest.id} type="button" onClick={() => claimQuest(quest)} className={cn("w-full rounded-3xl border p-4 text-left shadow-xl active:scale-[.99]", done ? "border-green-300 bg-green-500/20" : "border-white/10 bg-slate-950/70")}><div className="flex items-center justify-between gap-3"><div><p className="text-xl font-black">{quest.title}</p><p className="font-black text-yellow-300">Ödül: +{quest.reward} XP / +{Math.floor(quest.reward / 2)} altın</p></div><Icon name={claimed ? "check" : done ? "star" : "question"} className="text-4xl font-black text-yellow-300" /></div><div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-green-400 to-yellow-300" style={{ width: `${(progress / quest.target) * 100}%` }} /></div><p className="mt-2 font-bold text-white/60">{progress}/{quest.target} {claimed ? "ödül alındı" : done ? "ödülü al" : "devam"}</p></button>; })}</div>
          </section>
        )}

        {tab === "shop" && (
          <section className="px-4 pt-4">
            <div className="rounded-[32px] border border-yellow-300/40 bg-gradient-to-br from-yellow-950/60 to-slate-950/90 p-5 shadow-xl"><h2 className="text-3xl font-black">Market</h2><p className="mt-1 font-bold text-white/60">Altın: <span className="text-yellow-300">{state.coins}</span></p></div>
            <div className="mt-4 grid gap-3">{SHOP.map((item) => { const owned = state.bought.includes(item.id); return <button key={item.id} type="button" onClick={() => buy(item)} className="rounded-3xl border border-white/10 bg-slate-950/75 p-4 text-left shadow-xl active:scale-[.99]"><div className="flex items-center gap-3"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-600 text-2xl font-black text-slate-950"><Icon name="shop" /></div><div className="flex-1"><div className="flex items-center justify-between gap-2"><p className="text-xl font-black">{item.name}</p><p className="font-black text-yellow-300">{owned ? "ALINDI" : `${item.price} altın`}</p></div><p className="font-bold text-white/60">{item.desc}</p></div></div></button>; })}</div>
          </section>
        )}

        {tab === "profile" && (
          <section className="px-4 pt-4">
            <div className="rounded-[32px] border border-cyan-300/40 bg-gradient-to-br from-cyan-950/60 to-slate-950/90 p-5 text-center shadow-xl"><div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[28px] border-4 border-cyan-300 bg-gradient-to-br from-orange-500 to-blue-700 text-6xl font-black"><Icon name="sword" /></div><h2 className="mt-4 text-3xl font-black">Nihongo Avcısı</h2><p className="font-bold text-white/60">Haziran hedefi: N4 güvenli geçiş</p><div className="mt-5 grid grid-cols-2 gap-3 text-left"><Stat icon="star" label="Seviye" value={level} color="border-yellow-400/50" /><Stat icon="check" label="Master" value={state.mastered.length} color="border-orange-400/50" /><Stat icon="heart" label="Favori" value={state.favorites.length} color="border-rose-400/50" /><Stat icon="question" label="Zor" value={state.hardList.length} color="border-cyan-400/50" /></div><div className="mt-5 rounded-3xl bg-white/10 p-4 text-left"><p className="text-xl font-black text-yellow-300">Mini çalışma sistemi</p><p className="mt-2 font-bold text-white/70">Otobüste 10 kart. Evde 24 kart + görevler. Yatmadan önce zor listesi. Her kartta önce kana, sonra kanji, sonra örnek cümleyi sesli oku.</p></div></div>
          </section>
        )}

        <nav className="fixed bottom-0 left-1/2 z-50 grid w-full max-w-md -translate-x-1/2 grid-cols-6 gap-1 border-t border-white/10 bg-slate-950/95 px-2 pb-3 pt-2 backdrop-blur">
          {navItems.map(([id, icon, label]) => <button key={id} type="button" onClick={() => setTab(id)} className={cn("rounded-2xl px-1 py-2 text-center font-black active:scale-95", tab === id ? "bg-yellow-300 text-slate-950" : "text-white/60")}><Icon name={icon} className="block text-2xl" /><span className="mt-1 block text-[10px]">{label}</span></button>)}
        </nav>

        {toast && <div className="fixed left-1/2 top-5 z-[60] w-[90%] max-w-sm -translate-x-1/2 rounded-2xl border border-yellow-300 bg-slate-950 px-4 py-3 text-center text-lg font-black text-yellow-300 shadow-2xl">{toast}</div>}
      </div>
    </div>
  );
}
