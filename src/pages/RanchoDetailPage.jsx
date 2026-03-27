/**
 * Página de detalle de rancho
 * @author Ing. Yael Vicente
 *
 * Muestra información del rancho y las plagas asociadas.
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRancho, getPlagas } from '../services/api';
import PlagaCard from '../components/PlagaCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function RanchoDetailPage() {
  // Obtiene el id del rancho desde la URL
  const { id } = useParams();
  // Estado para rancho, plagas, carga y error
  const [rancho, setRancho] = useState(null);
  const [plagas, setPlagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga datos del rancho y sus plagas al montar o cambiar id
  useEffect(() => {
    async function fetchData() {
      try {
        const [ranchoData, plagasData] = await Promise.all([
          getRancho(id),
          getPlagas(id)
        ]);
        setRancho(ranchoData);
        setPlagas(plagasData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner text="Cargando rancho..." />;

  if (error || !rancho) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 border border-red-200 text-red-600 p-6">
          <p className="font-medium">{error || 'Rancho no encontrado'}</p>
        </div>
        <Link to="/ranchos" className="mt-6 inline-flex items-center text-green-700 hover:text-green-800 font-medium">
          ← Volver a ranchos
        </Link>
      </div>
    );
  }

  // Renderiza el detalle del rancho y sus plagas
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link to="/ranchos" className="text-green-700 hover:text-green-800 transition-colors">
              ← Ranchos
            </Link>
          </nav>
          
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Image */}
            <div className="lg:w-1/3">
              <div className="aspect-video lg:aspect-square overflow-hidden bg-stone-200">
                {rancho.imagen_url ? (
                  <img src={rancho.imagen_url} alt={rancho.nombre} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-100">
                    <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Info */}
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-semibold text-stone-900 mb-4">
                {rancho.nombre}
              </h1>
              
              <div className="flex items-center text-stone-600 mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {rancho.ubicacion || 'Ubicación no especificada'}
              </div>
              
              <p className="text-stone-600 leading-relaxed max-w-2xl mb-8">
                {rancho.descripcion || 'Sin descripción disponible'}
              </p>
              
              {/* Stats */}
              <div className="flex gap-8">
                <div>
                  <div className="text-2xl font-semibold text-stone-900">{plagas.length}</div>
                  <div className="text-stone-500 text-sm">Plaga{plagas.length !== 1 ? 's' : ''} registrada{plagas.length !== 1 ? 's' : ''}</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-green-700">Activo</div>
                  <div className="text-stone-500 text-sm">Estado de monitoreo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plagas Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-4">
          <h2 className="text-xl font-semibold text-stone-900">
            Plagas Identificadas
          </h2>
          <span className="text-sm text-stone-500">
            {plagas.length} registrada{plagas.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        {plagas.length === 0 ? (
          <div className="text-center py-16 border border-stone-200">
            <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-stone-500">No hay plagas registradas en este rancho.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plagas.map(plaga => (
              <PlagaCard key={plaga.id} plaga={plaga} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
