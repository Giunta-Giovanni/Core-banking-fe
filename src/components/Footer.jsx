export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Colonna 1: Logo e descrizione */}
          <div>
            <h2 className="text-xl font-bold text-white">Banca Fittizia</h2>
            <p className="mt-4 text-sm">
              La tua banca di fiducia per servizi finanziari sicuri e innovativi.
            </p>
          </div>

          {/* Colonna 2: Link utili */}
          <div>
            <h3 className="text-lg font-semibold text-white">Link utili</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:text-white">Conti correnti</a></li>
              <li><a href="#" className="hover:text-white">Prestiti</a></li>
              <li><a href="#" className="hover:text-white">Investimenti</a></li>
              <li><a href="#" className="hover:text-white">Assistenza clienti</a></li>
            </ul>
          </div>

          {/* Colonna 3: Contatti */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contatti</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Via Roma 123, Milano</li>
              <li>+39 02 1234567</li>
              <li>supporto@bancafittizia.it</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white">🌐 Facebook</a>
              <a href="#" className="hover:text-white">🌐 LinkedIn</a>
              <a href="#" className="hover:text-white">🌐 Twitter</a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          © 2025 Banca Fittizia. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}