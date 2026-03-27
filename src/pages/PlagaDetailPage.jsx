/**
 * Página de detalle de plaga
 * @author Ing. Yael Vicente
 *
 * Muestra información técnica, síntomas, daños y monitoreo de una plaga.
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlaga } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PlagaDetailPage() {
  // Obtiene el id de la plaga desde la URL
  const { id } = useParams();
  // Estado para la plaga, carga, error, pestaña activa e imagen seleccionada
  const [plaga, setPlaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [selectedImage, setSelectedImage] = useState(null);

  // Carga la plaga al montar o cambiar id
  useEffect(() => {
    async function fetchPlaga() {
      try {
        const data = await getPlaga(id);
        setPlaga(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaga();
  }, [id]);

  if (loading) return <LoadingSpinner text="Cargando información de la plaga..." />;

  if (error || !plaga) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 text-red-600 p-6 border border-red-200">
          <p className="font-medium">{error || 'Plaga no encontrada'}</p>
        </div>
        <Link to="/plagas" className="mt-6 inline-flex items-center text-green-700 hover:text-green-800 font-medium">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  // Tabs disponibles
  const tabs = [
    { id: 'info', label: 'Información' },
    { id: 'sintomas', label: 'Síntomas' },
    { id: 'danos', label: 'Daños' },
    { id: 'monitoreo', label: 'Monitoreo' },
  ];

  // Renderiza el detalle de la plaga y sus pestañas
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link to="/plagas" className="text-green-700 hover:text-green-800 transition-colors">
              ← Catálogo de Plagas
            </Link>
          </nav>
          
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Cover Image */}
            <div className="lg:w-1/4">
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                {plaga.imagen_cover_url ? (
                  <img src={plaga.imagen_cover_url} alt={plaga.nombre_comun} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            {/* Info */}
            <div className="lg:w-3/4">
              <p className="text-sm text-stone-500 uppercase tracking-wide mb-2">
                {plaga.clasificacion || 'Plaga'}
              </p>
              <h1 className="text-3xl font-semibold text-stone-900 mb-1">
                {plaga.nombre_comun}
              </h1>
              <p className="text-lg text-stone-500 italic mb-6">
                {plaga.nombre_cientifico}
              </p>
              <p className="text-stone-600 leading-relaxed max-w-2xl">
                {plaga.descripcion_corta}
              </p>
              
              {/* Quick stats */}
              <div className="flex gap-8 mt-8">
                <QuickStat label="Género" value={plaga.genero || '-'} />
                <QuickStat label="Familia" value={plaga.clasificacion?.split(' - ')[1] || '-'} />
                <QuickStat label="Síntomas" value={plaga.sintomas?.length || 0} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-40 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-6 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-700 text-green-700'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'info' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ContentCard title="Descripción Completa">
                <div className="prose prose-stone max-w-none">
                  {plaga.descripcion_completa?.split('\n').map((paragraph, i) => (
                    <p key={i} className="text-stone-600 leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </div>
              </ContentCard>
              
              {/* Ciclo de Vida - Imágenes */}
              {plaga.galerias && (
                <ContentCard title="Ciclo de Vida - Imágenes">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Huevos - Etapa inicial */}
                    {plaga.galerias.huevos?.length > 0 && (
                      <div className="bg-stone-50 p-4 border border-stone-200">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold">1</span>
                          <h3 className="text-sm font-medium text-stone-800">Huevos</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {plaga.galerias.huevos.slice(0, 6).map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedImage(img)}
                              className="aspect-square overflow-hidden bg-white border border-stone-200 hover:border-green-700 transition-colors"
                            >
                              <img src={img} alt={`Huevo ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Adultos - Etapa final */}
                    {plaga.galerias.adultos?.length > 0 && (
                      <div className="bg-stone-50 p-4 border border-stone-200">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 bg-red-100 text-red-700 flex items-center justify-center text-xs font-semibold">2</span>
                          <h3 className="text-sm font-medium text-stone-800">Adultos y Ninfas</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {plaga.galerias.adultos.slice(0, 6).map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedImage(img)}
                              className="aspect-square overflow-hidden bg-white border border-stone-200 hover:border-green-700 transition-colors"
                            >
                              <img src={img} alt={`Adulto ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Lightbox */}
                  {selectedImage && (
                    <div 
                      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                      onClick={() => setSelectedImage(null)}
                    >
                      <button 
                        className="absolute top-4 right-4 text-white text-4xl hover:text-stone-300 transition-colors"
                        onClick={() => setSelectedImage(null)}
                      >
                        ×
                      </button>
                      <img 
                        src={selectedImage} 
                        alt="Ampliación"
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                </ContentCard>
              )}
            </div>
            
            <div className="space-y-6">
              <ContentCard title="Ubicación en el Árbol">
                <ul className="space-y-2">
                  {(plaga.lugares_detalle || plaga.lugares_en_arbol?.split(', ') || []).map((lugar, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-stone-600">{lugar}</span>
                    </li>
                  ))}
                </ul>
              </ContentCard>
              
              {plaga.video_url && (
                <ContentCard title="Video Informativo">
                  <div className="flex flex-col items-center">
                    <div className="aspect-[9/16] max-h-64 w-auto bg-stone-900 overflow-hidden mb-3">
                      <iframe
                        src={`https://www.youtube.com/embed/${plaga.video_url.includes('shorts') ? plaga.video_url.split('/shorts/')[1]?.split('?')[0] : plaga.video_url.split('v=')[1]?.split('&')[0]}?controls=1&modestbranding=1&rel=0`}
                        title="Video informativo"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <a 
                      href={plaga.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-green-700 hover:text-green-800"
                    >
                      Abrir en YouTube
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </ContentCard>
              )}
            </div>
          </div>
        )}

        {activeTab === 'sintomas' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plaga.sintomas?.map((sintoma, i) => (
              <div key={i} className="bg-white border border-stone-200 p-6 hover:border-stone-300 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-stone-100 flex items-center justify-center text-stone-600 font-semibold mr-3">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-stone-900">{sintoma.titulo}</h3>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">{sintoma.detalle}</p>
              </div>
            )) || <p className="text-stone-500">No hay síntomas registrados.</p>}
          </div>
        )}

        {activeTab === 'danos' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plaga.danos?.map((dano, i) => (
              <div key={i} className="bg-white border border-stone-200 p-6 hover:border-stone-300 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-50 flex items-center justify-center text-red-600 mr-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-stone-900">{dano.titulo}</h3>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed">{dano.detalle}</p>
              </div>
            )) || <p className="text-stone-500">No hay daños registrados.</p>}
          </div>
        )}

        {activeTab === 'monitoreo' && (
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Guía de monitoreo - lado izquierdo */}
            <div className="border border-stone-200 bg-white flex flex-col">
              <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
                <h2 className="font-semibold text-stone-900">Guía de Monitoreo</h2>
                <p className="text-stone-500 text-sm mt-1">Pasos para identificar esta plaga en campo</p>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center space-y-6">
                {plaga.monitoreo?.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-700 text-white flex items-center justify-center font-semibold">
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-stone-700 leading-relaxed">{item}</p>
                    </div>
                  </div>
                )) || <p className="text-stone-500">No hay guía de monitoreo disponible.</p>}
              </div>
            </div>
            
            {/* Video - lado derecho */}
            {plaga.video_url && (
              <div className="border border-stone-200 bg-white flex flex-col">
                <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
                  <h2 className="font-semibold text-stone-900">Demostración Visual</h2>
                  <p className="text-stone-500 text-sm mt-1">Técnica de identificación en campo</p>
                </div>
                <div className="p-6 flex-1 flex items-center justify-center">
                  <div className="aspect-[9/16] h-full max-h-[420px] bg-stone-900 overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${plaga.video_url.includes('shorts') ? plaga.video_url.split('/shorts/')[1]?.split('?')[0] : plaga.video_url.split('v=')[1]?.split('&')[0]}?controls=1&modestbranding=1&rel=0&showinfo=0&fs=1`}
                      title="Demostración de monitoreo"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  );
}

function QuickStat({ label, value }) {
  return (
    <div>
      <div className="text-sm text-stone-500 mb-1">{label}</div>
      <div className="font-semibold text-stone-900">{value}</div>
    </div>
  );
}

function ContentCard({ title, children }) {
  return (
    <div className="border border-stone-200">
      <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
        <h2 className="font-semibold text-stone-900">{title}</h2>
      </div>
      <div className="p-6 bg-white">
        {children}
      </div>
    </div>
  );
}
