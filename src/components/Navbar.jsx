import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
  
  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-lime-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <img src="/assets/portada_header_principal.png" alt="Citrus Pests Logo" className="w-12 h-12 object-contain bg-transparent" />
            </div>
            <div>
              <span className="font-bold text-lg text-gray-900">Citrus Pests</span>
              <span className="hidden sm:block text-xs text-lime-600 font-medium">Monitoreo de Plagas</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-1">
            <NavLink to="/" active={location.pathname === '/'}>Inicio</NavLink>
            <NavLink to="/ranchos" active={isActive('/ranchos')}>Ranchos</NavLink>
            <NavLink to="/plagas" active={isActive('/plagas')}>Plagas</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link 
      to={to}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-lime-100 text-lime-700' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}
