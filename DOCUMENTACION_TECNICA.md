# 📖 DOCUMENTACIÓN TÉCNICA DETALLADA

## Sistema de Identificación y Monitoreo de Plagas en Cultivos de Cítricos

---

## 1. INSTALACIÓN Y CONFIGURACIÓN DEL AMBIENTE

### 1.1 Requisitos Previos

```bash
# Verificar versión de Node (mínimo 16)
node --version    # v20+

# Verificar npm (mínimo 8)
npm --version     # v10+

# Verificar Git
git --version     # 2.25+
```

### 1.2 Instalación Paso a Paso

#### Paso 1: Clonar repositorio
```bash
git clone https://github.com/Yael27V/citrus_pests.git
cd citrus_pests
```

#### Paso 2: Instalar dependencias Frontend
```bash
npm install
# Instala todas las dependencias listadas en package.json
# Crea carpeta node_modules/
```

#### Paso 3: Instalar dependencias Backend
```bash
cd server
npm install
cd ..
```

#### Paso 4: Configurar variables de ambiente

**Frontend** - Crear `.env.local` en raíz:
```env
VITE_API_BASE=http://localhost:3001
```

**Backend** - Crear `server/.env`:
```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-clave-de-api
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

---

## 2. ESTRUCTURA DE COMPONENTES REACT

### 2.1 Diagrama de Componentes

```
App
├── Navbar
│   ├── Logo
│   └── NavLinks
│
├── HomePage
│   ├── Hero Section
│   ├── Features Section
│   │   ├── FeatureCard
│   │   ├── FeatureCard
│   │   └── FeatureCard
│   ├── Stats Section
│   │   └── StatCard
│   └── CTA Section
│
├── PlagasPage
│   ├── SearchBar
│   ├── FilterSection
│   └── Grid de Plagas
│       └── PlagaCard (x n)
│           └── Link a PlagaDetailPage
│
├── PlagaDetailPage
│   ├── Header (Nombre y foto)
│   ├── TabbedContent
│   │   ├── Tab: Información
│   │   ├── Tab: Galería
│   │   └── Tab: Guías
│   └── RelatedPlagas
│
├── RanchosPage
│   └── Grid de Ranchos
│       └── RanchoCard
│           └── Link a RanchoDetailPage
│
└── RanchoDetailPage
    ├── Header
    ├── Información del Rancho
    ├── Plagas Detectadas
    └── Histórico
```

### 2.2 Descripción de Componentes

#### **Navbar.jsx** - Barra de Navegación
```javascript
Propiedades:
- Logo/Brand
- Links de navegación (Inicio, Plagas, Ranchos)
- Indicador de página activa
- Responsive (hamburger en mobile)

Estado:
- Ruta actual (useLocation)

Métodos:
- isActive(path): Detecta si ruta está activa
```

#### **PlagaCard.jsx** - Tarjeta de Plaga
```javascript
Props:
- plaga: {
    id: UUID
    nombre: string
    tipo: string
    imagen: URL
    descripcion: string
  }

Eventos:
- onClick: Navega a detalles

Estilos:
- Hover effect (shadow)
- Responsive grid
```

#### **HomePage.jsx** - Página Principal
```javascript
Secciones:
1. Hero: Propuesta de valor + CTA
2. Features: Herramientas principales (3 tarjetas)
3. Stats: Métricas del sistema
4. CTA: Próximas fases (IA)
5. Footer: Links y créditos

Componentes anidados:
- FeatureCard
- StatCard
- StepCard
```

#### **PlagasPage.jsx** - Catálogo de Plagas
```javascript
Estado:
- plagas: [] - Lista de plagas
- loading: boolean
- searchQuery: string
- filter: string

Ciclo de vida:
- useEffect: Carga plagas al montar

Métodos:
- getPlagas(): Obtiene de API
- handleSearch(query): Filtra por nombre
- handleFilter(tipo): Filtra por tipo
```

#### **PlagaDetailPage.jsx** - Detalle de Plaga
```javascript
Parámetros de URL:
- :id (UUID de plaga)

Estado:
- plaga: {} - Datos de plaga
- loading: boolean
- activeTab: 'info' | 'galeria' | 'guias'

Datos mostrados:
1. Información técnica
   - Nombre común y científico
   - Tipo, orden, familia
   - Ciclo de vida

2. Galería de imágenes
   - Fotos de campo
   - Fotos de microscopio
   - Detalle de síntomas

3. Guías de manejo
   - Monitoreo
   - Umbral de acción
   - Recomendaciones
```

---

## 3. SERVICIOS Y API CLIENT

### 3.1 Estructura de api.js

```javascript
// src/services/api.js

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export const api = {
  // PLAGAS
  getPlagas: async (filters = {}) => { ... }
  getPlaga: async (id) => { ... }
  createPlaga: async (data) => { ... }
  updatePlaga: async (id, data) => { ... }
  deletePlaga: async (id) => { ... }

  // RANCHOS
  getRanchos: async () => { ... }
  getRancho: async (id) => { ... }
  createRancho: async (data) => { ... }
  updateRancho: async (id, data) => { ... }

  // REGISTROS DE PLAGAS
  getRegistrosPorRancho: async (ranchoId) => { ... }
  createRegistro: async (data) => { ... }

  // UPLOAD
  uploadImage: async (file) => { ... }
};
```

### 3.2 Uso en Componentes

```javascript
// Obtener datos
useEffect(() => {
  api.getPlagas()
    .then(data => setPlagas(data))
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
}, []);

// Enviar datos
const handleSubmit = async (formData) => {
  try {
    const result = await api.createPlaga(formData);
    console.log('Éxito:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

---

## 4. BACKEND - ARQUITECTURA EXPRESS

### 4.1 Estructura del Servidor

```javascript
// server/index.js

import express from 'express';
import cors from 'cors';

const app = express();

// MIDDLEWARE
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTAS
app.use('/api', plagasRouter);
app.use('/api', ranchosRouter);
app.use('/api', uploadRouter);

// MANEJO DE ERRORES
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  });
});

// SERVIDOR
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

### 4.2 Rutas de Plagas

#### GET /api/plagas - Listar plagas
```javascript
Parámetros query:
- rancho_id (opcional): UUID
- tipo (opcional): string
- limit (opcional): number

Respuesta:
[
  {
    id: UUID,
    nombre: string,
    nombre_cientifico: string,
    tipo: string,
    descripcion: string,
    imagen_url: URL,
    created_at: timestamp
  },
  ...
]

Código de estado:
- 200: OK
- 400: Parámetro inválido
- 500: Error del servidor
```

#### GET /api/plagas/:id - Obtener detalle
```javascript
Parámetro de ruta:
- id: UUID

Respuesta:
{
  id: UUID,
  nombre: string,
  nombre_cientifico: string,
  tipo: string,
  familia: string,
  orden: string,
  descripcion: string,
  ciclo_vida: string,
  sintomas: string,
  danos: string,
  imagen_url: URL,
  imagenes_adicionales: [URL, ...],
  guia_monitoreo: string,
  umbral_accion: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

#### POST /api/plagas - Crear plaga
```javascript
Request body:
{
  nombre: string (requerido),
  nombre_cientifico: string,
  tipo: string,
  descripcion: string,
  imagen_url: URL
}

Respuesta:
{
  id: UUID (nuevo),
  nombre: string,
  created_at: timestamp,
  ...
}

Validaciones:
- nombre: requerido, único
- tipo: debe estar en enum válido
```

### 4.3 Rutas de Ranchos

#### GET /api/ranchos
```javascript
Respuesta:
[
  {
    id: UUID,
    nombre: string,
    ubicacion: string,
    cultivo_principal: string,
    hectareas: number,
    propietario: string,
    plagas_count: number,
    created_at: timestamp
  },
  ...
]
```

#### GET /api/ranchos/:id/plagas
```javascript
Respuesta:
[
  {
    plaga_id: UUID,
    nombre: string,
    tipo: string,
    fecha_deteccion: date,
    nivel_severidad: 'bajo' | 'medio' | 'alto',
    notas: string,
    imagen_url: URL
  },
  ...
]
```

---

## 5. BASE DE DATOS - ESQUEMA SQL

### 5.1 Tabla PLAGAS

```sql
CREATE TABLE plagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Información básica
  nombre VARCHAR(255) NOT NULL UNIQUE,
  nombre_cientifico VARCHAR(255),
  tipo VARCHAR(100),
  familia VARCHAR(100),
  orden VARCHAR(100),
  
  -- Descripción
  descripcion TEXT,
  ciclo_vida TEXT,
  sintomas TEXT,
  danos TEXT,
  
  -- Media
  imagen_url TEXT,
  imagenes_adicionales TEXT[] DEFAULT '{}',
  
  -- Guías
  guia_monitoreo TEXT,
  umbral_accion VARCHAR(255),
  
  -- Auditoría
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID,
  
  -- Índices
  CONSTRAINT plagas_tipo_check 
    CHECK (tipo IN ('insecto', 'ácaros', 'hongos', 'bacterias', 'virus'))
);

-- Índices
CREATE INDEX idx_plagas_nombre ON plagas(nombre);
CREATE INDEX idx_plagas_tipo ON plagas(tipo);
CREATE INDEX idx_plagas_created_at ON plagas(created_at DESC);
```

### 5.2 Tabla RANCHOS

```sql
CREATE TABLE ranchos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Información básica
  nombre VARCHAR(255) NOT NULL,
  ubicacion TEXT,
  cultivo_principal VARCHAR(100),
  hectareas DECIMAL(10, 2),
  propietario VARCHAR(255),
  
  -- Contacto
  telefono VARCHAR(20),
  email VARCHAR(255),
  
  -- Localización
  latitud DECIMAL(10, 8),
  longitud DECIMAL(11, 8),
  
  -- Auditoría
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT hectareas_positive CHECK (hectareas > 0)
);

CREATE INDEX idx_ranchos_propietario ON ranchos(propietario);
CREATE INDEX idx_ranchos_ubicacion ON ranchos(ubicacion);
```

### 5.3 Tabla REGISTROS_PLAGAS

```sql
CREATE TABLE registros_plagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Referencias
  rancho_id UUID NOT NULL REFERENCES ranchos(id) ON DELETE CASCADE,
  plaga_id UUID NOT NULL REFERENCES plagas(id) ON DELETE CASCADE,
  
  -- Información del registro
  fecha_deteccion DATE NOT NULL,
  nivel_severidad VARCHAR(50) DEFAULT 'medio',
  notas TEXT,
  
  -- Media
  imagen_url TEXT,
  
  -- Técnico responsable
  técnico_id UUID,
  técnico_nombre VARCHAR(255),
  
  -- Auditoría
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT severidad_check 
    CHECK (nivel_severidad IN ('bajo', 'medio', 'alto', 'crítico'))
);

CREATE INDEX idx_registros_rancho ON registros_plagas(rancho_id);
CREATE INDEX idx_registros_plaga ON registros_plagas(plaga_id);
CREATE INDEX idx_registros_fecha ON registros_plagas(fecha_deteccion DESC);
CREATE UNIQUE INDEX idx_registros_unique 
  ON registros_plagas(rancho_id, plaga_id, fecha_deteccion);
```

### 5.4 Consultas Frecuentes

```sql
-- Plagas más detectadas en últimos 30 días
SELECT 
  p.nombre, 
  COUNT(rp.id) as detecciones,
  AVG(CAST(CASE 
    WHEN rp.nivel_severidad = 'crítico' THEN 4
    WHEN rp.nivel_severidad = 'alto' THEN 3
    WHEN rp.nivel_severidad = 'medio' THEN 2
    WHEN rp.nivel_severidad = 'bajo' THEN 1
  END AS DECIMAL)) as severidad_promedio
FROM plagas p
LEFT JOIN registros_plagas rp ON p.id = rp.plaga_id
WHERE rp.fecha_deteccion >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY p.id, p.nombre
ORDER BY detecciones DESC;

-- Ranchos con mayor actividad de plagas
SELECT 
  r.nombre,
  COUNT(DISTINCT rp.plaga_id) as plagas_distintas,
  COUNT(rp.id) as total_registros,
  MAX(rp.fecha_deteccion) as ultima_deteccion
FROM ranchos r
LEFT JOIN registros_plagas rp ON r.id = rp.rancho_id
GROUP BY r.id, r.nombre
ORDER BY total_registros DESC;
```

---

## 6. FLUJOS DE AUTENTICACIÓN (Futuro)

### 6.1 Diagrama de Flujo de Login

```
Usuario ingresa credenciales
           ↓
   POST /api/auth/login
           ↓
   Backend valida en BD
           ↓
      ¿Válido?
     /        \
   SÍ          NO
    ↓           ↓
  Genera   Retorna 401
  JWT       error
    ↓
  Almacena
  token
    ↓
  Redirige
  a /plagas
```

### 6.2 Protección de Rutas

```javascript
// ProtectedRoute.jsx
function ProtectedRoute({ component }) {
  const token = localStorage.getItem('authToken');
  
  return token ? component : <Navigate to="/login" />;
}

// Uso en App.jsx
<Route 
  path="/admin" 
  element={<ProtectedRoute component={<AdminPage />} />} 
/>
```

---

## 7. MANEJO DE ERRORES Y LOGGING

### 7.1 Errores en Frontend

```javascript
// Captura y logging de errores
try {
  const data = await api.getPlagas();
} catch (error) {
  console.error('Error fetching plagas:', {
    message: error.message,
    code: error.code,
    timestamp: new Date().toISOString()
  });
  
  // Mostrar mensaje al usuario
  setErrorMessage('No se pudieron cargar las plagas. Intenta más tarde.');
}
```

### 7.2 Errores en Backend

```javascript
// Middleware de manejo de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  
  console.error({
    timestamp: new Date().toISOString(),
    status,
    message,
    path: req.path,
    method: req.method,
    error: err
  });
  
  res.status(status).json({
    success: false,
    error: message,
    requestId: req.id // Para debugging
  });
});
```

---

## 8. TESTING Y VALIDACIÓN

### 8.1 Pruebas Unitarias (Componentes)

```javascript
// PlagaCard.test.jsx
import { render, screen } from '@testing-library/react';
import PlagaCard from './PlagaCard';

describe('PlagaCard', () => {
  it('debe renderizar nombre de plaga', () => {
    const plaga = { 
      id: '1', 
      nombre: 'Mosca Blanca',
      tipo: 'insecto'
    };
    
    render(<PlagaCard plaga={plaga} />);
    expect(screen.getByText('Mosca Blanca')).toBeInTheDocument();
  });
});
```

### 8.2 Pruebas de Integración (API)

```javascript
// test/api.test.js
describe('API Endpoints', () => {
  it('GET /api/plagas debe retornar lista', async () => {
    const response = await fetch('http://localhost:3001/api/plagas');
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });
});
```

### 8.3 Validación de Datos

```javascript
// Validar entrada del usuario
const validatePlaga = (data) => {
  const errors = {};
  
  if (!data.nombre || data.nombre.trim() === '') {
    errors.nombre = 'El nombre es requerido';
  }
  
  if (data.hectareas && data.hectareas <= 0) {
    errors.hectareas = 'Las hectáreas deben ser mayor a 0';
  }
  
  return Object.keys(errors).length === 0 ? null : errors;
};
```

---

## 9. OPTIMIZACIÓN Y PERFORMANCE

### 9.1 Code Splitting (Vite)

```javascript
// App.jsx con lazy loading
import { lazy, Suspense } from 'react';

const PlagasPage = lazy(() => import('./pages/PlagasPage'));
const RanchosPage = lazy(() => import('./pages/RanchosPage'));

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/plagas" element={<PlagasPage />} />
        <Route path="/ranchos" element={<RanchosPage />} />
      </Routes>
    </Suspense>
  );
}
```

### 9.2 Optimización de Imágenes

```javascript
// Usar responsive images
<img 
  src={plaga.imagen_url}
  srcSet={`
    ${plaga.imagen_small} 480w,
    ${plaga.imagen_medium} 768w,
    ${plaga.imagen_large} 1024w
  `}
  sizes="(max-width: 480px) 100vw, 
          (max-width: 768px) 50vw, 
          33vw"
  alt={plaga.nombre}
  loading="lazy" // Lazy loading nativo
/>
```

### 9.3 Caché de Datos

```javascript
// Implementar caché simple
const cache = new Map();

async function getCachedData(key, fetchFn) {
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const data = await fetchFn();
  cache.set(key, data);
  
  // Limpiar caché después de 5 minutos
  setTimeout(() => cache.delete(key), 5 * 60 * 1000);
  
  return data;
}
```

---

## 10. DESPLIEGUE PRODUCTION

### 10.1 Variables de Ambiente Production

```env
# Frontend - .env.production
VITE_API_BASE=https://api.citruspeststrackin
.com
VITE_APP_NAME=Citrus Pests
NODE_ENV=production

# Backend - .env (production)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJ...
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://citruspeststacking.com
LOG_LEVEL=info
```

### 10.2 Build y Deploy Checklist

```
PRE-DEPLOY
☑ Ejecutar linting: npm run lint
☑ Ejecutar tests: npm run test
☑ Revisar variables de ambiente
☑ Actualizar versión en package.json
☑ Crear commit: git commit -m "Release v1.0.0"

BUILD
☑ npm run build
☑ Verificar tamaño: du -sh dist/
☑ Probar localmente: npm run preview

DEPLOY
☑ Push a main branch
☑ Trigger en Render (automático)
☑ Verificar health check: curl https://api.domain.com/health
☑ Pruebas en producción

POST-DEPLOY
☑ Verificar logs en Render
☑ Probar flujos críticos
☑ Configurar alertas de error
```

---

## 11. REFERENCIAS Y DOCUMENTACIÓN EXTERNA

### Documentación Oficial
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express API Reference](https://expressjs.com/api)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Supabase Docs](https://supabase.com/docs)

### Herramientas de Desarrollo
- [VS Code](https://code.visualstudio.com) - Editor
- [Git](https://git-scm.com) - Control de versiones
- [Postman](https://www.postman.com) - Testing de API
- [pgAdmin](https://www.pgadmin.org) - Gestión de BD

---

**Fin de Documentación Técnica**
