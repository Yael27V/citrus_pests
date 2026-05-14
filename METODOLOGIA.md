# 📋 METODOLOGÍA DE DESARROLLO

## Sistema de Identificación y Monitoreo de Plagas en Cultivos de Cítricos

**Proyecto de Titulación**  
**Autores:** Jose Antonio Hidalgo y Yael Vicente  
**Período:** 2025  

---

## 📑 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Metodología de Desarrollo](#metodología-de-desarrollo)
3. [Pasos de Realización de la Página](#pasos-de-realización-de-la-página)
4. [Pasos de Programación](#pasos-de-programación)
5. [Arquitectura Técnica](#arquitectura-técnica)
6. [Stack Tecnológico](#stack-tecnológico)
7. [Procesos de Despliegue](#procesos-de-despliegue)

---

## 🎯 Introducción

**Plagas Beta** es una plataforma web especializada en la identificación, documentación y seguimiento de plagas en cultivos de cítricos. El sistema permite a agricultores y técnicos agrícolas monitorear plagas en ranchos de lima, limón y otros cítricos mediante una interfaz intuitiva y responsiva.

### Objetivos del Proyecto

- **General:** Desarrollar una plataforma digital para el monitoreo profesional de plagas en cultivos cítricos
- **Específicos:**
  - Crear un catálogo centralizado de plagas con fichas técnicas
  - Facilitar el registro y seguimiento de plagas por rancho
  - Proporcionar herramientas de identificación visual
  - Generar reportes y recomendaciones de manejo

---

## 📌 Metodología de Desarrollo

### Enfoque Metodológico: Desarrollo Ágil Iterativo

Se utilizó una metodología ágil con ciclos iterativos cortos, permitiendo:
- Validación frecuente con usuarios finales
- Ajustes rápidos basados en retroalimentación
- Entrega incremental de funcionalidades

### Fases del Proyecto

#### **Fase 1: Análisis y Planificación**
- Definición de requisitos funcionales y no funcionales
- Análisis de usuarios y casos de uso
- Definición de la arquitectura general del sistema
- Selección de tecnologías y stack

#### **Fase 2: Diseño y Prototipado**
- Diseño de la interfaz de usuario (UI/UX)
- Creación de wireframes y prototipos de baja fidelidad
- Definición de la estructura de datos (esquema de base de datos)
- Diseño de endpoints de API REST

#### **Fase 3: Desarrollo (Implementación)**
- Configuración del ambiente de desarrollo
- Desarrollo del frontend (componentes React)
- Desarrollo del backend (API REST con Express)
- Integración con base de datos (Supabase)

#### **Fase 4: Pruebas y Validación**
- Pruebas unitarias y de integración
- Pruebas de usabilidad
- Validación de funcionalidades con usuarios
- Identificación y corrección de errores

#### **Fase 5: Despliegue y Mantenimiento**
- Configuración de servidores de producción
- Despliegue en Vercel (Edge Network global)
- Monitoreo y mantenimiento continuo
- Documentación para soporte técnico

---

## 🛠️ Pasos de Realización de la Página

### 1. Planificación y Requisitos

#### Requisitos Funcionales:
- Visualización de catálogo de plagas
- Detalles de cada plaga (taxonomía, ciclo de vida, síntomas, imágenes)
- Gestión de ranchos y ubicaciones
- Registro de avistamientos de plagas por rancho
- Carga y almacenamiento de imágenes
- Búsqueda y filtrado de plagas

#### Requisitos No Funcionales:
- Diseño responsivo para web y móvil
- Tiempo de carga menor a 3 segundos
- Compatible con navegadores modernos
- Interfaz intuitiva y accesible
- Escalabilidad para múltiples usuarios

### 2. Diseño Visual y UX

#### Paleta de Colores:
- Verde Lima (Primario): `#A3E635` - Representa naturaleza y agricultura
- Verde Oscuro (Secundario): `#15803D` - Contraste y profesionalismo
- Blanco y Grises: Limpieza visual y claridad

#### Estructura de Páginas:

**a) Página Principal (Home)**
- Hero section con propuesta de valor
- Secciones de características principales
- Call-to-action (CTA) hacia catálogo de plagas
- Información de próximas fases

**b) Catálogo de Plagas**
- Grid de plagas con tarjetas interactivas
- Información básica: nombre, tipo, daño
- Imágenes de referencia
- Enlaces a detalles completos

**c) Detalle de Plaga**
- Información técnica completa
- Fichas de taxonomía
- Imágenes de campo y microscopio
- Guías de monitoreo y control

**d) Sección de Ranchos**
- Listado de ranchos activos
- Detalles por rancho
- Plagas asociadas a cada rancho
- Historial de avistamientos

### 3. Arquitectura de la Información

```
┌─ HOME
│
├─ PLAGAS
│  └─ Detalle de Plaga
│     ├─ Información Técnica
│     ├─ Galería de Imágenes
│     └─ Guías de Manejo
│
└─ RANCHOS (En desarrollo)
   └─ Detalle de Rancho
      ├─ Información del Rancho
      ├─ Plagas Detectadas
      └─ Histórico de Registros
```

### 4. Flujo de Usuario

```
ENTRADA DEL USUARIO
        ↓
    [HOME]
        ↓
    ┌───────────────────┐
    │                   │
    ↓                   ↓
[CATÁLOGO PLAGAS]  [RANCHOS]
    ↓                   ↓
[Detalle Plaga]   [Detalle Rancho]
    ↓                   ↓
[Información]     [Plagas del Rancho]
[Imágenes]        [Registro de Plagas]
[Guías]           [Historial]
```

---

## 💻 Pasos de Programación

### 1. Configuración Inicial del Proyecto

#### Paso 1.1: Configuración del Frontend
```bash
# Crear proyecto con Vite (builder moderno)
npm create vite@latest plagas-beta -- --template react

# Instalar dependencias principales
npm install react-router-dom          # Enrutamiento
npm install -D tailwindcss            # Estilos CSS
npm install -D @tailwindcss/vite      # Integración Tailwind-Vite
```

**Archivos clave generados:**
- `package.json` - Gestión de dependencias
- `vite.config.js` - Configuración del bundler
- `tailwind.config.js` - Configuración de estilos

#### Paso 1.2: Configuración del Backend
```bash
# Crear carpeta del servidor
mkdir server && cd server
npm init -y

# Instalar dependencias backend
npm install express              # Framework web
npm install cors                 # Manejo de CORS
npm install @supabase/supabase-js # Cliente Supabase
npm install dotenv               # Variables de ambiente
```

### 2. Estructura de Carpetas

#### Frontend (src/)
```
src/
├── components/
│   ├── Navbar.jsx              # Barra de navegación
│   ├── PlagaCard.jsx            # Tarjeta de plaga
│   ├── RanchoCard.jsx           # Tarjeta de rancho
│   └── LoadingSpinner.jsx       # Indicador de carga
│
├── pages/
│   ├── HomePage.jsx             # Página principal
│   ├── PlagasPage.jsx           # Catálogo de plagas
│   ├── PlagaDetailPage.jsx      # Detalle de plaga
│   ├── RanchosPage.jsx          # Listado de ranchos
│   └── RanchoDetailPage.jsx     # Detalle de rancho
│
├── services/
│   └── api.js                   # Cliente HTTP/API
│
├── App.jsx                      # Componente raíz
├── main.jsx                     # Punto de entrada
└── index.css                    # Estilos globales
```

#### Backend (server/)
```
server/
├── routes/
│   ├── plagas.js                # Endpoints de plagas
│   ├── ranchos.js               # Endpoints de ranchos
│   └── upload.js                # Endpoints de carga
│
├── config/
│   └── supabase.js              # Configuración Supabase
│
├── database/
│   └── schema.sql               # Esquema de BD
│
├── index.js                     # Servidor principal
└── package.json                 # Dependencias backend
```

### 3. Componentes React - Desarrollo Iterativo

#### Paso 3.1: Componente Navbar (Navegación)
```javascript
// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path || 
                             location.pathname.startsWith(path + '/');
  
  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-lime-100">
      {/* Logo y menú de navegación */}
    </nav>
  );
}
```

**Conceptos clave:**
- `useLocation()` hook para detectar ruta actual
- Clases Tailwind para estilos reactivos
- Componentes funcionales con hooks

#### Paso 3.2: Componente PlagaCard (Tarjeta de Plaga)
```javascript
// src/components/PlagaCard.jsx
export default function PlagaCard({ plaga }) {
  return (
    <div className="p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md">
      <img src={plaga.imagen} alt={plaga.nombre} />
      <h3 className="font-semibold text-lg">{plaga.nombre}</h3>
      <p className="text-gray-600">{plaga.descripcion}</p>
    </div>
  );
}
```

**Patrón Props:**
- Recibe datos via props
- Renderiza información de forma declarativa
- Estilos con Tailwind CSS

#### Paso 3.3: Página de Plagas (PlagasPage)
```javascript
// src/pages/PlagasPage.jsx
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import PlagaCard from '../components/PlagaCard';

export default function PlagasPage() {
  const [plagas, setPlagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener datos de la API cuando el componente monta
    api.getPlagas()
      .then(data => setPlagas(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {plagas.map(plaga => (
        <PlagaCard key={plaga.id} plaga={plaga} />
      ))}
    </div>
  );
}
```

**Conceptos aplicados:**
- Hook `useState` para estado local
- Hook `useEffect` para ciclo de vida
- Promesas y async/await
- Renderizado condicional

### 4. Routing y Navegación

#### Paso 4.1: Configuración de Router (App.jsx)
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlagasPage from './pages/PlagasPage';
import PlagaDetailPage from './pages/PlagaDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plagas" element={<PlagasPage />} />
        <Route path="/plagas/:id" element={<PlagaDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Características:**
- Routing declarativo con `Routes`
- Parámetros dinámicos: `:id`
- Navegación sin recargar página (SPA)

### 5. Integración con API Backend

#### Paso 5.1: Cliente API (services/api.js)
```javascript
// src/services/api.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

export const api = {
  // Plagas
  getPlagas: async () => {
    const res = await fetch(`${API_BASE}/api/plagas`);
    return res.json();
  },

  getPlaga: async (id) => {
    const res = await fetch(`${API_BASE}/api/plagas/${id}`);
    return res.json();
  },

  // Ranchos
  getRanchos: async () => {
    const res = await fetch(`${API_BASE}/api/ranchos`);
    return res.json();
  },

  getRancho: async (id) => {
    const res = await fetch(`${API_BASE}/api/ranchos/${id}`);
    return res.json();
  }
};
```

**Ventajas:**
- Centraliza llamadas API
- Facilita cambios de endpoints
- Manejo de variables de ambiente

### 6. Backend - Endpoints REST

#### Paso 6.1: Configuración Express (server/index.js)
```javascript
import express from 'express';
import cors from 'cors';
import plagasRouter from './routes/plagas.js';
import ranchosRouter from './routes/ranchos.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', plagasRouter);
app.use('/api', ranchosRouter);

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
```

#### Paso 6.2: Rutas de Plagas (server/routes/plagas.js)
```javascript
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// GET /api/plagas - Obtener todas las plagas
router.get('/plagas', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('plagas')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/plagas/:id - Obtener detalle de plaga
router.get('/plagas/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('plagas')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
```

**Patrón REST:**
- `GET /api/plagas` - Listar
- `GET /api/plagas/:id` - Obtener uno
- `POST /api/plagas` - Crear
- `PUT /api/plagas/:id` - Actualizar
- `DELETE /api/plagas/:id` - Eliminar

### 7. Base de Datos - Esquema SQL

#### Paso 7.1: Creación de Tablas
```sql
-- Tabla de Plagas
CREATE TABLE plagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  nombre_cientifico VARCHAR(255),
  descripcion TEXT,
  tipo VARCHAR(100),
  imagen_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Ranchos
CREATE TABLE ranchos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  ubicacion TEXT,
  cultivo_principal VARCHAR(100),
  hectareas DECIMAL(10, 2),
  propietario VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Registros de Plagas por Rancho
CREATE TABLE registros_plagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rancho_id UUID REFERENCES ranchos(id),
  plaga_id UUID REFERENCES plagas(id),
  fecha_deteccion DATE,
  nivel_severidad VARCHAR(50),
  notas TEXT,
  imagen_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_plagas_nombre ON plagas(nombre);
CREATE INDEX idx_ranchos_ubicacion ON ranchos(ubicacion);
CREATE INDEX idx_registros_rancho ON registros_plagas(rancho_id);
```

**Características:**
- Uso de UUID para identificadores
- Timestamps para auditoría
- Índices para optimización
- Integridad referencial con claves foráneas

### 8. Estilos con Tailwind CSS

#### Paso 8.1: Configuración Tailwind
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        lime: {
          600: '#A3E635',  // Verde lima primario
          700: '#84CC16',  // Verde más oscuro
        }
      }
    }
  }
}
```

#### Paso 8.2: Componentes Estilizados
```jsx
// Tarjeta con Tailwind
<div className="p-8 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
  <img src={imagen} alt={titulo} className="w-full rounded-lg mb-4" />
  <h3 className="text-2xl font-bold text-gray-900 mb-2">{titulo}</h3>
  <p className="text-gray-600 leading-relaxed">{descripcion}</p>
</div>
```

**Utilidades Tailwind:**
- `p-8` - Padding
- `rounded-xl` - Bordes redondeados
- `shadow-md` - Sombra
- `hover:shadow-md` - Estados interactivos
- `transition-shadow` - Animaciones suaves

---

## 🏗️ Arquitectura Técnica

### Arquitectura General

```
┌─────────────────────────────────────────────────┐
│         CAPA DE PRESENTACIÓN (Frontend)         │
│  React Components + Router + Tailwind CSS       │
│  • PlagasPage, PlagaDetail, RanchosPage         │
│  • Navbar, Cards, LoadingSpinner                │
└────────────────────┬────────────────────────────┘
                     │ HTTP/REST API
┌────────────────────▼────────────────────────────┐
│   CAPA DE APLICACIÓN (Backend API)              │
│      Express.js Routes & Controllers            │
│  GET /api/plagas, /api/ranchos                  │
│  POST /api/registros, /api/upload               │
└────────────────────┬────────────────────────────┘
                     │ SQL Queries
┌────────────────────▼────────────────────────────┐
│      CAPA DE PERSISTENCIA                       │
│    PostgreSQL (Supabase) + Storage              │
│  • Tablas: plagas, ranchos, registros_plagas   │
│  • Bucket: imágenes de plagas y ranchos         │
└─────────────────────────────────────────────────┘
```

### Patrón MVC (Adaptado para SPA)

```
Modelo (M)
  ↓
  └─ Interfaz del Usuario ← Redux/Context (Estado)
  
Vista (V)
  ↓
  └─ Componentes React
  └─ Renderizado del DOM
  
Controlador (C)
  ↓
  └─ Manejadores de eventos
  └─ Llamadas a API
  └─ Lógica de negocio
```

---

## 🔧 Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 19.2.4 | Librería UI |
| Vite | 8.0.1 | Bundler y dev server |
| React Router | 7.13.2 | Enrutamiento |
| Tailwind CSS | 4.2.2 | Framework CSS |
| JavaScript (ES6+) | - | Lenguaje |

### Backend

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Node.js | 20+ | Runtime JavaScript |
| Express.js | - | Framework web |
| Supabase SDK | - | ORM/Query builder |
| PostgreSQL | 14+ | Base de datos |
| CORS | - | Seguridad HTTP |

### Infraestructura

| Servicio | Propósito |
|---------|----------|
| Supabase | Base de datos, autenticación, storage |
| Render | Hosting para frontend y backend |
| GitHub | Control de versiones |

---

## 🚀 Procesos de Despliegue

### 1. Construcción (Build)

#### Paso 1: Build del Frontend
```bash
npm run build
# Genera carpeta /dist con archivos optimizados
```

**Salida:**
- `dist/index.html` - Punto de entrada
- `dist/assets/` - JS/CSS minificados
- Tamaño optimizado para producción

#### Paso 2: Verificación Pre-Deploy
```bash
npm run lint
# Valida código con ESLint
```

### 2. Despliegue en Render

#### Frontend (Web App):
1. Conectar repositorio GitHub
2. Configurar build command: `npm run build`
3. Configurar start command: Servir `/dist`
4. Variables de ambiente:
   - `VITE_API_BASE=https://api.tudominio.com`

#### Backend (API):
1. Conectar repositorio GitHub
2. Configurar comando: `cd server && npm start`
3. Variables de ambiente:
   ```
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_KEY=xxx
   PORT=3001
   ```

### 3. Control de Versiones con Git

#### Flujo de Commits:
```bash
# 1. Crear rama para feature
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "Descripción clara del cambio"

# 3. Push a GitHub
git push origin feature/nueva-funcionalidad

# 4. Pull Request y merge a main
# (en GitHub)

# 5. Pull en producción
git pull origin main
npm run build && npm run deploy
```

#### Convención de Commits:
```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios de documentación
style: cambios de estilos (sin lógica)
refactor: refactorización de código
test: agregación de tests
chore: tareas de mantenimiento
```

### 4. Variables de Ambiente

#### Frontend (.env.local):
```
VITE_API_BASE=http://localhost:3001
```

#### Backend (.env):
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJxx...
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://tudominio.com
```

---

## 📊 Flujo de Datos

### Obtener Lista de Plagas

```
Usuario hace clic en "Catálogo de Plagas"
          ↓
    [PlagasPage.jsx] monta
          ↓
    useEffect dispara
          ↓
    api.getPlagas() 
          ↓
    fetch GET /api/plagas
          ↓
    [Backend] servidor Express recibe
          ↓
    supabase.from('plagas').select(*)
          ↓
    [Base de datos] retorna registros
          ↓
    API envía JSON
          ↓
    useState setPlagas(data)
          ↓
    Componente re-renderiza
          ↓
    [UI] muestra tarjetas de plagas
```

---

## ✅ Criterios de Calidad

### Código
- ✓ Componentes reutilizables
- ✓ Funciones puras sin side effects
- ✓ Nombres descriptivos de variables
- ✓ Comentarios solo donde sea necesario
- ✓ Validación de entrada en formularios

### Performance
- ✓ Lazy loading de imágenes
- ✓ Code splitting automático (Vite)
- ✓ Optimización de bundle
- ✓ Caché de respuestas API

### Seguridad
- ✓ Variables de ambiente para credenciales
- ✓ CORS configurado correctamente
- ✓ SQL injection prevenido con ORM
- ✓ Validación de datos en backend

### Responsividad
- ✓ Mobile-first design
- ✓ Breakpoints: sm (640px), md (768px), lg (1024px)
- ✓ Touch-friendly en dispositivos móviles

---

## 📚 Documentación Técnica

### Archivos de Referencia
- `README.md` - Guía general del proyecto
- `DEPLOY.md` - Instrucciones de despliegue
- `CONTRIBUTING.md` - Guía para contribuidores

### Endpoints de API

#### Plagas
- `GET /api/plagas` - Listar todas
- `GET /api/plagas/:id` - Obtener detalle
- `GET /api/plagas?rancho_id=X` - Filtrar por rancho

#### Ranchos
- `GET /api/ranchos` - Listar todos
- `GET /api/ranchos/:id` - Obtener detalle
- `POST /api/ranchos` - Crear nuevo

#### Upload
- `POST /api/upload/imagen` - Subir imagen

---

## 🎓 Conclusiones

### Logros Alcanzados
1. ✓ Plataforma funcional para monitoreo de plagas
2. ✓ Interfaz responsiva y amigable
3. ✓ Backend escalable con API REST
4. ✓ Base de datos estructurada
5. ✓ Despliegue automatizado

### Desafíos Superados
- Integración frontend-backend con CORS
- Optimización de imágenes para mobile
- Gestión de estado en componentes
- Configuración de variables de ambiente

### Mejoras Futuras (Fase 3)
- 🤖 Integración de IA para identificación automática
- 📸 Captura de imágenes desde cámara móvil
- 📊 Dashboard de análisis y reportes
- 🔔 Notificaciones de alertas de plagas
- 👥 Sistema de usuarios y permisos

---

**Documento Preparado para Presentación de Titulación**  
**Proyecto: Sistema de Identificación y Monitoreo de Plagas en Cultivos de Cítricos**  
**Autores: Jose Antonio Hidalgo y Yael Vicente**  
**Fecha: 2025**
