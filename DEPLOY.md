# Guía de Despliegue a Producción

## Frontend (React + Vite)

1. **Build de producción:**
   ```bash
   npm run build
   ```
   Esto genera la carpeta `dist/` lista para servir en un hosting estático (Vercel, Netlify, Nginx, etc).

2. **Variables de entorno:**
   Si necesitas variables, crea un archivo `.env` en la raíz siguiendo el ejemplo de `.env.example`.

3. **Sube el contenido de `dist/`** a tu hosting.

---

## Backend (Node.js + Express)

1. **Configura variables de entorno:**
   Copia `server/.env.example` a `server/.env` y agrega tus credenciales.

2. **Instala dependencias:**
   ```bash
   cd server
   npm install
   ```

3. **Inicia el servidor:**
   ```bash
   npm start
   ```
   El backend escuchará en el puerto definido en `.env` (por defecto 3001).

---

## Base de datos y almacenamiento

- Ejecuta el script SQL en `server/database/schema.sql` en Supabase.
- Crea el bucket de imágenes en Supabase Storage y configura políticas públicas.

---

## Notas
- Para producción, usa HTTPS y configura CORS apropiadamente.
- Revisa logs y errores después del despliegue.
- Actualiza el `README.md` si cambian los pasos de deploy.
