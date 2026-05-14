
/**
 * Página de inicio (Home)
 * @author Ing. Yael Vicente
 *
 * Muestra el hero, herramientas principales y estadísticas del sistema.
 */
import { Link } from 'react-router-dom';

export default function HomePage() {
  // Renderiza la página principal con hero, features y stats
  return (
    <div className="min-h-screen bg-white">
      <section className="w-full border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-8 py-20 md:py-32">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Monitoreo profesional de plagas en <span className="text-lime-700">citricos</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-xl">
              Plataforma para la identificación, documentación y seguimiento de plagas en ranchos de lima, limón y otros cítricos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/plagas"
                className="inline-flex items-center justify-center px-6 py-3 bg-lime-600 text-white font-medium rounded-lg hover:bg-lime-700 transition-colors"
              >
                Catálogo de Plagas
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img src="/assets/portada_header_principal.png" alt="Limón" className="w-full max-w-xs md:max-w-sm rounded-xl shadow-md border border-gray-100 object-cover" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Herramientas para el monitoreo
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Información técnica y visual para la identificación y control de plagas en cítricos.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<DocumentIcon />}
              title="Fichas Técnicas"
              description="Taxonomía, ciclo de vida, síntomas y daños documentados."
            />
            <FeatureCard 
              icon={<CameraIcon />}
              title="Galería de Referencia"
              description="Fotografías de campo y microscopio para identificación visual precisa."
            />
            <FeatureCard 
              icon={<ChartIcon />}
              title="Guías de Monitoreo"
              description="Protocolos de muestreo, umbrales de acción y frecuencia de revisión."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard number="1" label="Rancho activo" />
            <StatCard number="1" label="Plaga documentada" />
            <StatCard number="9" label="Imágenes de referencia" />
            <StatCard number="5" label="Síntomas identificados" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute top-10 left-10 w-40 h-40 text-lime-400" viewBox="0 0 100 100">
            <ellipse cx="50" cy="50" rx="40" ry="45" fill="currentColor"/>
          </svg>
          <svg className="absolute bottom-10 right-10 w-32 h-32 text-yellow-400" viewBox="0 0 100 100">
            <ellipse cx="50" cy="50" rx="40" ry="45" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-lime-500/20 text-lime-400 text-sm font-medium rounded-full mb-6">
              <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
              Próxima Fase
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Identificación con
              <span className="text-lime-400"> Inteligencia Artificial</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
              Captura una fotografía en campo y obtén identificación automatizada de plagas 
              con recomendaciones de manejo personalizadas.
            </p>
            
            {/* Process steps */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              <StepCard icon="📷" label="Captura" />
              <ArrowIcon />
              <StepCard icon="🔍" label="Análisis" />
              <ArrowIcon />
              <StepCard icon="✅" label="Resultado" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src="/assets/portada_header_principal.png" alt="Citrus Pests Logo" className="w-8 h-8 object-contain bg-transparent" />
            <span className="font-semibold text-white">Citrus Pests</span>
          </div>
          <p className="text-gray-500 text-sm">
            Sistema de monitoreo de plagas en cultivos cítricos
          </p>
            <p className="text-gray-400 text-xs mt-4">
              &copy; Desarrolladores Jose Antonio Hidalgo y Yael Vicente
            </p>
        </div>
      </footer>
    </div>
  );
}

// Tarjeta para mostrar una herramienta/feature principal
function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 bg-gray-50 text-lime-600">
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

// Tarjeta para mostrar una estadística clave
function StatCard({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">{number}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
}

// Paso visual para la sección de IA (futuro)
function StepCard({ icon, label }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2 text-2xl border border-white/20">
        {icon}
      </div>
      <span className="text-gray-400 text-sm">{label}</span>
    </div>
  );
}

// Flecha decorativa para pasos
function ArrowIcon() {
  return (
    <svg className="w-6 h-6 text-lime-500 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

// Icono de documento para features
function DocumentIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

// Icono de cámara para features
function CameraIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

// Icono de gráfico para features
function ChartIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
