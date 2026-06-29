import { useState, useEffect, useCallback } from 'react';
import { Copy, Check, Heart, ArrowRightLeft, RefreshCw, X, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';

const WORD_POOLS = {
  gaming: { adjectives: ['Epic','Blaze','Shadow','Neon','Frost','Thunder','Void','Chaos','Storm','Night','Rogue','Cyber','Phantom','Titan'], prefixes: ['Shadow','Neo','Dark','Fire','Ghost','Dragon','Blade','Vortex','Rogue','Knight','Steel','Iron'], suffixes: ['Rider','Hunter','Forge','Vortex','Wolf','Slayer','Master','Breaker','Warrior','Ghost','King','Lord'] },
  kawaii: { adjectives: ['Sugar','Berry','Fluffy','Sparkle','Mochi','Peach','Cloud','Bunny','Star','Rainbow','Sweet','Tiny'], prefixes: ['Kawaii','Nyan','Pika','Momo','Yuki','Hana','Luna','Mimi','Chibi','Puni','Coco'], suffixes: ['Chan','Puff','Paw','Bean','Bun','Cake','Dream','Twinkle','Heart','Muffin'] },
  professional: { adjectives: ['Prime','Elite','Pro','Smart','Global','Secure','Dynamic','Expert','Vision','Legacy','Apex','Summit'], prefixes: ['Alex','Max','Sam','Jordan','Taylor','Morgan','Casey','Ryan','Blake','Parker','Quinn','Drew'], suffixes: ['Tech','Labs','Solutions','Systems','Group','Capital','Ventures','Partners','Forge','Hub','Core'] },
  fantasy: { adjectives: ['Mystic','Ancient','Eternal','Celestial','Arcane','Divine','Shadow','Lunar','Solar','Aether','Rune','Mythic'], prefixes: ['Eldrin','Ael','Thorne','Sylv','Drak','Lumin','Nyx','Eryndor','Faer','Myth','Arcan'], suffixes: ['or','ion','ara','eth','oril','ael','ith','orak','lyn','driel'] },
  random: { adjectives: ['Cool','Epic','Mystic','Silent','Thunder','Crimson','Azure','Solar','Void','Neon','Frost','Shadow'], prefixes: ['Shadow','Neo','Dark','Fire','Storm','Ghost','Dragon','Phoenix','Luna','Nova'], suffixes: ['Rider','Blade','Hunter','Forge','Vortex','Echo','Knight','Wolf','Raven','Star'] }
} as const;

export default function UsernameGeneratorPage() {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [count, setCount] = useState(10);
  const [length, setLength] = useState<number | ''>(12);
  const [style, setStyle] = useState<'gaming' | 'kawaii' | 'professional' | 'fantasy' | 'random'>('gaming');
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(false);
  const [keywords, setKeywords] = useState('');

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyAllStatus, setCopyAllStatus] = useState(false);

  const effectiveLength = typeof length === 'number' ? Math.max(6, Math.min(30, length)) : 12;
  const canUseSpecial = effectiveLength >= 10;

  useEffect(() => {
    if (!canUseSpecial && includeSpecial) setIncludeSpecial(false);
  }, [canUseSpecial, includeSpecial]);

  const generateUsernames = useCallback(() => {
    const pool = WORD_POOLS[style];
    const generated: string[] = [];
    const used = new Set<string>();
    let attempts = 0;
    const maxAttempts = count * 1000;

    const keywordList = keywords.trim() 
      ? keywords.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      : [];

    while (generated.length < count && attempts < maxAttempts) {
      attempts++;
      let parts: string[] = [];

      if (keywordList.length > 0) {
        parts.push(keywordList[Math.floor(Math.random() * keywordList.length)]);
      } else {
        parts.push(pool.adjectives[Math.floor(Math.random() * pool.adjectives.length)]);
      }

      if (effectiveLength - parts.join('').length >= 5) parts.push(pool.prefixes[Math.floor(Math.random() * pool.prefixes.length)]);
      if (effectiveLength - parts.join('').length >= 6) parts.push(pool.suffixes[Math.floor(Math.random() * pool.suffixes.length)]);

      let name = includeSpecial && parts.length > 1 
        ? parts.join(['_', '-', '.'][Math.floor(Math.random() * 3)]) 
        : parts.join('');

      if (includeNumbers) {
        const remain = effectiveLength - name.length;
        if (remain >= 3) name += Math.floor(100 + Math.random() * 900);
        else if (remain >= 2) name += Math.floor(10 + Math.random() * 90);
        else if (remain >= 1) name += Math.floor(Math.random() * 10);
      }

      name = name.slice(0, effectiveLength);

      if (!used.has(name) && name.length >= 5) {
        generated.push(name);
        used.add(name);
      }
    }
    setUsernames(generated);
  }, [style, count, effectiveLength, keywords, includeNumbers, includeSpecial]);

  useEffect(() => {
    generateUsernames();
  }, [generateUsernames]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const copyAll = () => {
    if (usernames.length === 0) return;
    navigator.clipboard.writeText(usernames.join('\n'));
    setCopyAllStatus(true);
    setTimeout(() => setCopyAllStatus(false), 2000);
  };

  const toggleFavorite = (name: string) => {
    if (!favorites.includes(name)) setFavorites(prev => [...prev, name]);
  };

  const clearAllFavorites = () => setFavorites([]);

  const clearKeywords = () => setKeywords('');

  const resetSettings = () => {
    setStyle('gaming');
    setCount(10);
    setLength(12);
    setIncludeNumbers(true);
    setIncludeSpecial(false);
    setKeywords('');
  };

  return (
    <>
      <SEO 
        title="Best Free Username Generator 2026 - Gaming & Aesthetic Names"
        description="Generate cool, unique, and creative usernames instantly for Roblox, Discord, Instagram, TikTok, Minecraft, Twitch and more. 100% free & private."
        keywords="username generator, gaming usernames, roblox usernames, aesthetic usernames, discord names, free username generator 2026"
        url="https://everydayutils.com/username-generator"
      />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* SEO Header */}
      <div className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-lg">
          <ArrowRightLeft size={42} className="text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Free Username Generator</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Generate cool, unique, and creative usernames instantly. Perfect for gaming, social media, Twitch, Discord, YouTube, and more. 
          <span className="font-semibold text-teal-600 dark:text-teal-400">100% private</span> — everything is generated locally in your browser.
        </p>
      </div>

      {/* Tool */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <label className="text-sm font-medium block mb-1.5">Style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value as any)} className="w-full p-3 border rounded-2xl dark:bg-gray-800 text-base">
              <option value="gaming">Gaming</option>
              <option value="kawaii">Kawaii</option>
              <option value="professional">Professional</option>
              <option value="fantasy">Fantasy</option>
              <option value="random">Random</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Count</label>
            <input type="number" value={count} onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 10)))} className="w-full p-3 border rounded-2xl dark:bg-gray-800" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Max Length (6-30)</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value === '' ? '' : parseInt(e.target.value))} onBlur={(e) => { let val = parseInt(e.target.value); if (isNaN(val)) val = 12; setLength(Math.max(6, Math.min(30, val))); }} className="w-full p-3 border rounded-2xl dark:bg-gray-800" />
          </div>
          <div className="flex flex-col gap-4 pt-8">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} className="w-4 h-4" /> Numbers
            </label>
            <label className={`flex items-center gap-2 text-sm cursor-pointer ${!canUseSpecial ? 'opacity-50' : ''}`}>
              <input type="checkbox" checked={includeSpecial} disabled={!canUseSpecial} onChange={e => setIncludeSpecial(e.target.checked)} className="w-4 h-4" /> 
              Special chars {!canUseSpecial && '(min 10)'}
            </label>
          </div>
        </div>

        <div className="relative">
          <label className="text-sm font-medium block mb-1.5">Keywords (optional)</label>
          <div className="relative">
            <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. dragon shadow pixel" className="w-full p-3.5 border rounded-2xl dark:bg-gray-800" />
            {keywords && <button onClick={clearKeywords} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={20} /></button>}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button onClick={generateUsernames} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg rounded-2xl flex items-center justify-center gap-3 font-medium transition-colors">
            <RefreshCw size={22} /> Generate Usernames
          </button>
          {usernames.length > 0 && (
            <button onClick={copyAll} className="px-8 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 py-4 text-lg rounded-2xl flex items-center gap-2 transition-colors">
              {copyAllStatus ? <Check size={22} className="text-green-500" /> : <Copy size={22} />}
              {copyAllStatus ? "Copied All" : "Copy All"}
            </button>
          )}
          <button onClick={resetSettings} className="px-8 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 py-4 text-lg rounded-2xl transition-colors">
            Reset Settings
          </button>
        </div>
      </div>

      {/* Results + Favorites + SEO Section (same as before) */}
      {usernames.length > 0 && (
        <div className="space-y-3">
          {usernames.map((name, idx) => (
            <div key={`${name}-${idx}`} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="font-mono text-2xl tracking-wider">{name}</div>
                <span className="text-sm text-gray-400">({name.length})</span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => copyToClipboard(name)} className="text-gray-500 hover:text-black dark:hover:text-white">
                  {copiedId === name ? <Check size={24} className="text-green-500" /> : <Copy size={24} />}
                </button>
                <button onClick={() => toggleFavorite(name)}>
                  <Heart size={24} className={favorites.includes(name) ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-500"} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold flex items-center gap-3">❤️ Your Favorites ({favorites.length})</h3>
            <button onClick={clearAllFavorites} className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium">
              <Trash2 size={18} /> Clear All
            </button>
          </div>
          <div className="space-y-3">
            {favorites.map(name => (
              <div key={name} className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-6 flex items-center justify-between">
                <div className="font-mono text-2xl tracking-wider">{name}</div>
                <button onClick={() => copyToClipboard(name)}>
                  {copiedId === name ? <Check size={24} className="text-green-500" /> : <Copy size={24} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SEO Section */}
      <section className="mt-16 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold text-center">Why Use Our Username Generator?</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg text-center max-w-3xl mx-auto">
          Finding the perfect username can be difficult. Our free tool helps you instantly generate cool, unique usernames for gaming, social media, streaming, and professional use.
        </p>
        <div className="grid md:grid-cols-3 gap-6 pt-4">
          <div className="text-center">
            <h4 className="font-semibold mb-2 text-xl">🎮 Gaming</h4>
            <p className="text-sm text-gray-500">Epic, fantasy, and cyberpunk style usernames perfect for Twitch, Discord, and games.</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold mb-2 text-xl">💼 Professional</h4>
            <p className="text-sm text-gray-500">Clean and memorable names suitable for business, LinkedIn, or personal branding.</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold mb-2 text-xl">🔒 Private &amp; Fast</h4>
            <p className="text-sm text-gray-500">All generation happens in your browser. No data is stored or sent to any server.</p>
          </div>
        </div>
      </section>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        All usernames are generated locally in your browser. Nothing is saved or sent anywhere.
      </p>
    </div>
    </>
  );
}