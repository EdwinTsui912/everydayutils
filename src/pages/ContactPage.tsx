import { useState } from 'react';
import { Mail, Send, Check, AlertCircle, MapPin } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON_KEY     = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const ENDPOINT     = `${SUPABASE_URL}/functions/v1/contact`;

export default function ContactPage() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [status,  setStatus]  = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ANON_KEY}`,
          'Apikey': ANON_KEY,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="page-title">Contact</h1>
        <p className="page-subtitle">
          Have a question, bug report, or tool idea? Send a message and Edwin will get back to you.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} className="text-brand-500 shrink-0" />
          Hong Kong
        </div>
        <a
          href="mailto:everydayutils.contact@gmail.com"
          className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:underline"
        >
          <Mail size={14} className="shrink-0" />
          everydayutils.contact@gmail.com
        </a>
      </div>

      {status === 'success' ? (
        <div className="card p-8 flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-center">
            <Check size={24} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-lg">Message sent!</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Thanks for reaching out. Edwin will reply to your email shortly.
            </p>
          </div>
          <button onClick={() => setStatus('idle')} className="btn-secondary text-sm mt-2">
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
          <div className="space-y-1.5">
            <label className="label">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              className="input w-full"
              disabled={status === 'sending'}
            />
          </div>

          <div className="space-y-1.5">
            <label className="label">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input w-full"
              disabled={status === 'sending'}
            />
          </div>

          <div className="space-y-1.5">
            <label className="label">Message</label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              className="input w-full resize-none"
              disabled={status === 'sending'}
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2.5 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">
              <AlertCircle size={15} className="shrink-0" />
              Something went wrong. Please try again or email directly at everydayutils.contact@gmail.com.
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Sending…
              </>
            ) : (
              <><Send size={15} />Send Message</>
            )}
          </button>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            Messages are stored securely. No data is shared with third parties.
          </p>
        </form>
      )}
    </div>
  );
}
