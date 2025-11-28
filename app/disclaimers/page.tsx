export default function DisclaimersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wide">Warstwa prawna</p>
        <h1 className="text-2xl font-semibold">Zastrzeżenia i ryzyka</h1>
        <p className="text-sm text-slate-400">Enigma AI – Crypto OS to narzędzie edukacyjno-analityczne. Brak rekomendacji inwestycyjnych.</p>
      </div>
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold">Kluczowe zasady</h2>
        <ul className="list-disc list-inside text-sm text-slate-200 space-y-2">
          <li>Produkt ma charakter wyłącznie edukacyjno-analityczny – nie jest poradą inwestycyjną.</li>
          <li>Brak obietnic wyników ani zysków. Nie sugerujemy konkretnych zakupów/sprzedaży.</li>
          <li>Wszelkie dane rynkowe są poglądowe; zawsze wykonaj własny research (DYOR).</li>
          <li>Nie oferujemy automatycznego tradingu ani dostępu do kluczy transakcyjnych.</li>
        </ul>
      </div>
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold">Jak korzystać odpowiedzialnie</h2>
        <ul className="list-disc list-inside text-sm text-slate-200 space-y-2">
          <li>Traktuj scenariusze jako inspirację do dalszych badań, a nie gotowe decyzje.</li>
          <li>Weryfikuj dane w niezależnych źródłach i dostosuj je do własnej sytuacji finansowej.</li>
          <li>Tokeny i protokoły mogą być obarczone ryzykiem regulacyjnym, płynnościowym i technicznym.</li>
          <li>Jeśli coś wygląda podejrzanie – sprawdź ponownie, zanim podejmiesz jakiekolwiek działanie.</li>
        </ul>
      </div>
      <div className="card">
        <p className="text-sm text-yellow-200">Pamiętaj: żadna część aplikacji nie stanowi rekomendacji inwestycyjnej. Zawsze DYOR.</p>
      </div>
    </div>
  );
}
