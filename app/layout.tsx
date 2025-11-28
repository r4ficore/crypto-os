import type { Metadata } from 'next';
import './globals.css';
import { Topbar } from '@/components/Topbar';
import { Sidebar } from '@/components/Sidebar';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';

export const metadata: Metadata = {
  title: 'Enigma AI – Crypto OS',
  description: 'System operacyjny do edukacyjno-analitycznego podejścia do krypto. Bez rekomendacji, pełne zastrzeżenia i DYOR.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="font-sans">
        <DisclaimerBanner />
        <div className="min-h-screen flex flex-col">
          <Topbar />
          <div className="flex flex-col md:flex-row flex-1">
            <Sidebar />
            <main className="flex-1 bg-gradient-to-b from-slate-950 to-slate-900 p-4 md:p-6">
              <div className="max-w-6xl mx-auto flex flex-col gap-6">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
