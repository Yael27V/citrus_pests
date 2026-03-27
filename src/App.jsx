/**
 * App principal de Citrus Pests
 * @author Ing. Yael Vicente
 *
 * Define el enrutamiento principal y la estructura base de la aplicación.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RanchosPage from './pages/RanchosPage';
import RanchoDetailPage from './pages/RanchoDetailPage';
import PlagasPage from './pages/PlagasPage';
import PlagaDetailPage from './pages/PlagaDetailPage';

export default function App() {
  // Renderiza la estructura principal y las rutas de la SPA
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            {/* Página de inicio */}
            <Route path="/" element={<HomePage />} />
            {/* Listado y detalle de ranchos */}
            <Route path="/ranchos" element={<RanchosPage />} />
            <Route path="/ranchos/:id" element={<RanchoDetailPage />} />
            {/* Listado y detalle de plagas */}
            <Route path="/plagas" element={<PlagasPage />} />
            <Route path="/plagas/:id" element={<PlagaDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
