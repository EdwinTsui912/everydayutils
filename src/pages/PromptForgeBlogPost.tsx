import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, Wand2 } from 'lucide-react';

export default function PromptForgeBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} />
          Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">PromptForge Launch</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:bg-violet-500/20">
            AI Tools
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} />
            8 min read
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">June 30, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          Stop Wasting Time with Generic AI Prompts: Meet PromptForge, the Private AI Prompt Generator That Actually Works
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Tired of vague AI responses? PromptForge is a free, 100% private AI prompt generator. Build high-quality prompts for ChatGPT, Claude, Gemini, and Grok using proven frameworks — all in your browser.
        </p>
      </header>

      {/* Top CTA */}
      <div className="card border-violet-500/20 bg-gradient-to-r from-violet-500/5 to-purple-500/5 dark:from-violet-500/10 dark:to-purple-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex-shrink-0">
            <Wand2 size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Try PromptForge Now — Free & Private</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Runs 100% in your browser.</p>
          </div>
        </div>
        <Link to="/promptforge" className="btn-primary text-sm flex-shrink-0">
          Open PromptForge
        </Link>
      </div>

      {/* Article body */}
      <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">

        <p>We’ve all been there. You open ChatGPT or Claude, type what you need, and get back something that’s… okay. Technically correct, but flat. Too vague. Missing the nuance you actually wanted.</p>

        <p>Most people blame the AI. The real problem is almost always the prompt.</p>

        <h2 className="font-bold text-xl">Why Most Prompt Tools Fall Short</h2>
        <p>The biggest issue with existing tools is trust. When you paste a client brief or business idea into a third-party site, you’re handing over your data.</p>

        <p>PromptForge is different: <strong>nothing ever leaves your browser.</strong></p>

        <h2 className="font-bold text-xl">How PromptForge Works</h2>
        <p>Instead of a blank text box, PromptForge guides you through proven frameworks:</p>
        <ul>
          <li><strong>CO-STAR</strong> – Best for complex, professional tasks</li>
          <li><strong>RTF</strong> – Great for coding and technical work</li>
          <li><strong>CRAFT</strong> – Excellent for creative and marketing copy</li>
          <li><strong>RACE</strong> – Ideal for business analysis</li>
        </ul>

        <h2 className="font-bold text-xl">Real Prompt Examples</h2>
        <p><strong>Example 1: Code Review (RTF)</strong></p>
        <p><em>Role: Senior TypeScript engineer... Task: Review for edge cases... Format: Structured list...</em></p>

        <p><strong>Example 2: Marketing Email (CO-STAR)</strong></p>
        <p><em>Context: Launching new JSON formatter... Objective: Drive sign-ups... Tone: Enthusiastic but professional...</em></p>

        <h2 className="font-bold text-xl">Real Use Cases I’ve Tested</h2>
        <ul>
          <li><strong>Code Reviews</strong> – RTF gives structured, actionable feedback.</li>
          <li><strong>Marketing Emails</strong> – CRAFT turns bullet points into polished copy.</li>
          <li><strong>Meeting Summaries</strong> – CO-STAR extracts clear action items.</li>
          <li><strong>Product Descriptions</strong> – RACE structures e-commerce copy.</li>
          <li><strong>Multilingual Adaptation</strong> – Creates natural Cantonese/Mandarin versions.</li>
        </ul>

        <h2 className="font-bold text-xl">Pro Tips from Daily Use</h2>
        <ul>
          <li>Be specific in every field — the quality score will tell you when you’re being too vague.</li>
          <li>Use the example buttons to start fast when you’re stuck.</li>
          <li>Save recurring prompts to History — great for weekly reports or standard code review templates.</li>
          <li>Share the URL with teammates to create consistent prompting standards.</li>
        </ul>

        <h2 className="font-bold text-xl">Why Privacy Matters More Than Ever in 2026</h2>
        <p>Many companies are now restricting what employees can paste into public AI tools. With increasing concerns about data leakage and model training, having a truly private workflow isn’t just nice — it’s becoming necessary.</p>

        <p>PromptForge gives you the best of both worlds: powerful prompt engineering tools without compromising privacy.</p>

        <div className="p-6 bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-2xl my-8 text-center">
          <p className="font-semibold text-violet-700 dark:text-violet-300 mb-2">Ready to write better prompts?</p>
          <Link to="/promptforge" className="text-violet-600 hover:underline">Try PromptForge Now →</Link>
        </div>

      </div>
    </div>
  );
}