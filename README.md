# 🌿 Plagas Beta

Sistema de identificación y monitoreo de plagas en cultivos de cítricos.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│              React + Vite + Tailwind                │
│         (Web, responsive, funciona en móvil)        │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP / REST API
┌──────────────────▼──────────────────────────────────┐
│                   BACKEND                           │
│                Node.js + Express                    │
│              (API REST / Endpoints)                 │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼───────┐    ┌────────▼────────┐
│  Base de Datos │    │  Almacenamiento │
│  PostgreSQL    │    │  de Imágenes    │
│  (Supabase)    │    │  (Supabase      │
│                │    │   Storage)      │
└───────────────┘    └─────────────────┘
```

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
# Frontend
npm install

# Backend
cd server && npm install
```

### 2. Configurar Supabase (Opcional para desarrollo)

El sistema funciona en **modo mock** sin configuración de Supabase.

Para conectar a Supabase:
1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ejecuta el script SQL en `server/database/schema.sql`
3. Copia `server/.env.example` a `server/.env` y agrega tus credenciales

### 3. Iniciar servidores

```bash
# Terminal 1 - Backend (puerto 3001)
cd server && npm run dev

# Terminal 2 - Frontend (puerto 5173)
npm run dev
```

O usa el script combinado:
```bash
npm install -D concurrently
npm run dev:full
```

## 📁 Estructura del Proyecto

```
plagas-beta/
├── src/                      # Frontend React
│   ├── components/           # Componentes reutilizables
│   ├── pages/                # Páginas de la app
│   └── services/             # API client
│
├── server/                   # Backend Express
│   ├── routes/               # Endpoints de la API
│   ├── config/               # Configuración Supabase
│   └── database/             # Scripts SQL
│
└── public/                   # Assets estáticos
```

## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/ranchos` | Lista todos los ranchos |
| GET | `/api/ranchos/:id` | Detalle de un rancho |
| POST | `/api/ranchos` | Crear rancho |
| GET | `/api/plagas` | Lista todas las plagas |
| GET | `/api/plagas?rancho_id=X` | Plagas de un rancho |
| GET | `/api/plagas/:id` | Detalle de una plaga |
| POST | `/api/plagas` | Crear plaga |
| POST | `/api/upload/imagen` | Subir imagen |

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | React 19 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Base de datos | PostgreSQL (Supabase) |
| Almacenamiento | Supabase Storage |

## 📱 Fase 3 (Próximamente)

- 🤖 Identificación de plagas con IA
- 📸 Captura desde cámara del móvil
- 🔍 Análisis en tiempo real
