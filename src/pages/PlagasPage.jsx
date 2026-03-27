/**
 * Página de catálogo de plagas
 * @author Ing. Yael Vicente
 *
 * Permite buscar y listar plagas registradas en el sistema.
 */
import { useState, useEffect } from 'react';
import { getPlagas } from '../services/api';
import PlagaCard from '../components/PlagaCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PlagasPage() {
  // Estado para plagas, carga, error y búsqueda
  const [plagas, setPlagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Carga plagas al montar el componente
  useEffect(() => {
    async function fetchPlagas() {
      try {
        const data = await getPlagas();
        setPlagas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlagas();
  }, []);

  // Filtra plagas según búsqueda
  const filteredPlagas = plagas.filter(plaga => 
    plaga.nombre_comun?.toLowerCase().includes(search.toLowerCase()) ||
    plaga.nombre_cientifico?.toLowerCase().includes(search.toLowerCase()) ||
    plaga.clasificacion?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner text="Cargando catálogo de plagas..." />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-xl">
          <p className="font-medium">Error: {error}</p>
          <p className="text-sm mt-2 text-red-500">Asegúrate de que el servidor backend esté corriendo.</p>
        </div>
      </div>
    );
  }

  // Renderiza la lista de plagas filtradas
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-stone-900">
                Catálogo de Plagas
              </h1>
              <p className="text-stone-600 mt-1">
                Información técnica para identificación y monitoreo
              </p>
            </div>
            
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 focus:outline-none focus:ring-1 focus:ring-green-700 focus:border-green-700 transition-colors text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-stone-100">
        <p className="text-stone-500 text-sm">
          {filteredPlagas.length} plaga{filteredPlagas.length !== 1 ? 's' : ''} 
          {search && <span> para "{search}"</span>}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPlagas.length === 0 ? (
          <div className="text-center py-16 border border-stone-200">
            <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-stone-500">
              {search ? 'No se encontraron plagas con ese criterio.' : 'No hay plagas registradas aún.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlagas.map(plaga => (
              <PlagaCard key={plaga.id} plaga={plaga} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
