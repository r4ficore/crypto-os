import Link from 'next/link';

export function DisclaimerBanner() {
  return (
    <div className="w-full bg-yellow-500/10 border-b border-yellow-500/40 text-yellow-200 text-sm px-4 py-3 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
      <p className="font-semibold">Edukacja, nie rekomendacje inwestycyjne.</p>
      <p className="text-xs md:text-sm text-yellow-100">
        Enigma AI – Crypto OS ma charakter wyłącznie edukacyjno-analityczny i nie stanowi porady inwestycyjnej. Zawsze wykonaj
        własny research (DYOR). Nie składamy żadnych obietnic wyników ani zysków.
      </p>
      <Link href="/disclaimers" className="underline hover:text-yellow-100 text-xs md:text-sm">
        Zobacz pełne zastrzeżenia
      </Link>
    </div>
  );
}
