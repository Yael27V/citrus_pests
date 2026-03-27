import { Link } from 'react-router-dom';

export default function RanchoCard({ rancho }) {
  return (
    <Link 
      to={`/ranchos/${rancho.id}`}
      className="group block bg-white border border-stone-200 overflow-hidden hover:border-stone-300 transition-colors"
    >
      <div className="relative h-48 overflow-hidden bg-stone-100">
        {rancho.imagen_url ? (
          <img 
            src={rancho.imagen_url} 
            alt={rancho.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg text-stone-900 mb-2">
          {rancho.nombre}
        </h3>
        <div className="flex items-center text-sm text-stone-500 mb-3">
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {rancho.ubicacion || 'Ubicación no especificada'}
        </div>
        <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">
          {rancho.descripcion || 'Sin descripción disponible'}
        </p>
        <div className="mt-4 flex items-center text-green-700 font-medium text-sm">
          Ver plagas
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
