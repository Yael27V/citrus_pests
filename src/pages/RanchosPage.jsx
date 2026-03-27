/**
 * Página de ranchos monitoreados
 * @author Ing. Yael Vicente
 *
 * Lista todos los ranchos registrados y muestra su información básica.
 */
import { useState, useEffect } from 'react';
import { getRanchos } from '../services/api';
import RanchoCard from '../components/RanchoCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RanchosPage() {
  // Estado para ranchos, carga y errores
  const [ranchos, setRanchos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga ranchos al montar el componente
  useEffect(() => {
    async function fetchRanchos() {
      try {
        const data = await getRanchos();
        setRanchos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRanchos();
  }, []);

  if (loading) return <LoadingSpinner text="Cargando ranchos..." />;

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

  // Renderiza la lista de ranchos
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-stone-900">
                Ranchos
              </h1>
              <p className="text-stone-600 mt-1">
                Ranchos de cítricos monitoreados
              </p>
            </div>
            <div className="text-stone-500 text-sm">
              {ranchos.length} rancho{ranchos.length !== 1 ? 's' : ''} activo{ranchos.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {ranchos.length === 0 ? (
          <div className="text-center py-16 border border-stone-200">
            <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-stone-500">No hay ranchos registrados aún.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ranchos.map(rancho => (
              <RanchoCard key={rancho.id} rancho={rancho} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
