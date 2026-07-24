import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, ChevronRight, Clock, QrCode } from 'lucide-react';
import SEO from '../components/SEO';


const relatedPosts = [
  { title: 'Free QR Code Generator for WiFi, URLs, and Text', slug: '/blog/free-qr-code-generator-wifi-url-text' },
  { title: 'Free Favicon Generator — Create All Sizes Instantly', slug: '/blog/favicon-generator' },
  { title: 'Free Developer Utilities That Save Time', slug: '/blog/free-developer-utilities' },
];


export default function WifiQRCodeBlogPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <SEO
        title="How to Create a WiFi QR Code for Guests | EverydayUtils"
        description="Stop reading out WiFi passwords. Generate a free, private WiFi QR code so guests can scan and connect instantly — no typing, no mistakes."
        keywords="wifi qr code generator, wifi qr code, share wifi password qr code, create wifi qr code, wifi qr code airbnb"
        url="https://everydayutils.com/blog/how-to-create-wifi-qr-code"
      />


      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
        <Link to="/blog" className="hover:text-brand-500 transition-colors flex items-center gap-1.5">
          <ArrowLeft size={13} /> Blog
        </Link>
        <ChevronRight size={12} />
        <span className="text-gray-600 dark:text-gray-400">QR Code Guide</span>
      </nav>


      <img
        src="/images/wifi-qr-hero.jpg"
        alt="Smartphone scanning a printed WiFi QR code card next to a router"
        className="w-full h-auto rounded-2xl mb-8"
        loading="lazy"
        width={1200}
        height={675}
      />


      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:bg-brand-500/20">QR Codes</span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500"><Clock size={11} /> 7 min read</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">July 23, 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
          I Was Embarrassed Every Time Guests Asked for My WiFi Password — Until I Did This
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          Sharing WiFi passwords is more awkward than it should be. Here's the simple solution I now use every time.
        </p>
      </header>


      <div className="card border-brand-500/20 bg-gradient-to-r from-brand-500/5 to-cyan-500/5 dark:from-brand-500/10 dark:to-cyan-500/10 p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-500 text-white flex-shrink-0">
            <QrCode size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Try it now — Free &amp; Private</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">No account needed. Runs 100% in your browser.</p>
          </div>
        </div>
        <Link to="/qr-generator" className="btn-primary text-sm flex-shrink-0">
          Open QR Code Generator
        </Link>
      </div>


      <div className="space-y-10">


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Awkward Moment We All Know</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            "What's your WiFi password?"<br/>
            You either read out a long random string while your guest squints at their phone, or you hand over a sticky note with something like <code>Tr7$mK92!qLp</code> scrawled on it, then watch them mistype it three times because they can't tell if that's a lowercase L or a capital I.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            I've hosted enough dinners, had enough Airbnb guests, and run enough small gatherings to know this exact moment happens almost every time someone new walks through the door.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            It's a tiny problem, but it repeats constantly, and small repeated friction adds up.
          </p>
        </section>


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Typing WiFi Passwords Is Getting Harder</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            This problem has actually gotten worse over the last few years. As routers have shifted toward stronger security standards, passwords have become longer and more complex. A password that used to be eight characters is now commonly twelve, sixteen, or more. That's great for security. It's terrible for the person standing in your kitchen trying to type it on a phone keyboard while balancing a plate of food.
          </p>
        </section>


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">The Simple Solution</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Generate a QR code for your WiFi network. Guests just scan and connect instantly — no typing, no mistakes, no repeating the password for the third time. It takes under a minute to create, and it works for every guest after that.
          </p>
        </section>


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">What's Actually Inside the QR Code</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            WiFi QR codes encode a standardized text string that phones automatically recognize. The format looks like this:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto mb-4">
            WIFI:T:WPA;S:YourNetworkName;P:YourPassword;;
          </pre>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            For example:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto">
            WIFI:T:WPA;S:HomeWiFi;P:MySecretPass123;;
          </pre>
        </section>


        <img
          src="/images/wifi-qr-tool-screenshot.png"
          alt="QR code generator content box showing the WiFi network string with live preview"
          className="w-full h-auto rounded-2xl"
          loading="lazy"
          width={1200}
          height={800}
        />


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">How to Do It in Seconds</h2>
          <ol className="space-y-3 list-decimal pl-5 text-sm text-gray-600 dark:text-gray-400">
            <li>Open the QR Code Generator and clear the default text.</li>
            <li>Copy this template: <code>WIFI:T:WPA;S:YourNetworkName;P:YourPassword;;</code></li>
            <li>Replace YourNetworkName and YourPassword with your actual details.</li>
            <li>Watch the live preview update instantly.</li>
            <li>Download the PNG or copy it to your clipboard.</li>
          </ol>
        </section>


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Where This Works Best</h2>
          <ul className="space-y-2 list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
            <li>Airbnb and short-term rentals</li>
            <li>Cafés and restaurants</li>
            <li>Home offices and coworking spaces</li>
            <li>House parties and family gatherings</li>
            <li>Small offices</li>
          </ul>
        </section>


        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Privacy First</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Your network name and password are encoded directly inside your browser and never transmitted anywhere. The QR code is generated entirely on your device.
          </p>
        </section>


        <div className="text-center">
          <Link to="/qr-generator" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3">
            Create Your WiFi QR Code Now
            <ChevronRight size={18} />
          </Link>
        </div>


        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">You May Also Like</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                to={post.slug}
                className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-brand-500/40 transition-colors"
              >
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-500 transition-colors">
                  {post.title}
                </h3>
                <div className="mt-4 inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  Read article
                  <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
}