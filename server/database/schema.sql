-- =============================================
-- PLAGAS BETA - Script de Base de Datos
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLA: ranchos
-- =============================================
CREATE TABLE IF NOT EXISTS ranchos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  imagen_url TEXT,
  ubicacion VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas por nombre
CREATE INDEX IF NOT EXISTS idx_ranchos_nombre ON ranchos(nombre);

-- =============================================
-- TABLA: plagas
-- =============================================
CREATE TABLE IF NOT EXISTS plagas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  rancho_id UUID REFERENCES ranchos(id) ON DELETE CASCADE,
  nombre_comun VARCHAR(255) NOT NULL,
  nombre_cientifico VARCHAR(255),
  genero VARCHAR(100),
  clasificacion TEXT,
  descripcion_corta TEXT,
  descripcion_completa TEXT,
  lugares_en_arbol TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas comunes
CREATE INDEX IF NOT EXISTS idx_plagas_rancho ON plagas(rancho_id);
CREATE INDEX IF NOT EXISTS idx_plagas_nombre ON plagas(nombre_comun);
CREATE INDEX IF NOT EXISTS idx_plagas_cientifico ON plagas(nombre_cientifico);

-- =============================================
-- TABLA: imagenes_plaga
-- =============================================
CREATE TYPE imagen_tipo AS ENUM ('campo', 'microscopio');

CREATE TABLE IF NOT EXISTS imagenes_plaga (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  plaga_id UUID REFERENCES plagas(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  tipo imagen_tipo DEFAULT 'campo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para obtener imágenes por plaga
CREATE INDEX IF NOT EXISTS idx_imagenes_plaga ON imagenes_plaga(plaga_id);

-- =============================================
-- POLÍTICAS RLS (Row Level Security)
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE ranchos ENABLE ROW LEVEL SECURITY;
ALTER TABLE plagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagenes_plaga ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública para todas las tablas
CREATE POLICY "Lectura pública de ranchos"
  ON ranchos FOR SELECT
  USING (true);

CREATE POLICY "Lectura pública de plagas"
  ON plagas FOR SELECT
  USING (true);

CREATE POLICY "Lectura pública de imágenes"
  ON imagenes_plaga FOR SELECT
  USING (true);

-- Políticas de escritura (requiere autenticación - para admin)
-- Por ahora permitimos escritura anónima para desarrollo
CREATE POLICY "Escritura de ranchos"
  ON ranchos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Escritura de plagas"
  ON plagas FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Escritura de imágenes"
  ON imagenes_plaga FOR INSERT
  WITH CHECK (true);

-- =============================================
-- DATOS DE EJEMPLO
-- =============================================

-- Insertar ranchos de ejemplo
INSERT INTO ranchos (nombre, descripcion, imagen_url, ubicacion) VALUES
  ('Rancho El Mezquite', 'Rancho de cítricos ubicado en el norte de México, especializado en naranjas y limones.', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', 'Montemorelos, Nuevo León'),
  ('Rancho Los Naranjos', 'Amplia extensión dedicada al cultivo de naranja valencia y toronja.', 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800', 'Martínez de la Torre, Veracruz'),
  ('Huerta San José', 'Huerto tradicional de mandarinas y limas con más de 50 años de historia.', 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=800', 'Álamo, Veracruz');

-- Obtener IDs de ranchos para insertar plagas
DO $$
DECLARE
  rancho1_id UUID;
  rancho2_id UUID;
  plaga1_id UUID;
  plaga2_id UUID;
BEGIN
  SELECT id INTO rancho1_id FROM ranchos WHERE nombre = 'Rancho El Mezquite' LIMIT 1;
  SELECT id INTO rancho2_id FROM ranchos WHERE nombre = 'Rancho Los Naranjos' LIMIT 1;

  -- Insertar plagas
  INSERT INTO plagas (rancho_id, nombre_comun, nombre_cientifico, genero, clasificacion, descripcion_corta, descripcion_completa, lugares_en_arbol)
  VALUES (rancho1_id, 'Minador de la hoja', 'Phyllocnistis citrella', 'Phyllocnistis', 'Insecto - Lepidoptera', 
    'Pequeña polilla que causa galerías serpenteantes en hojas jóvenes.',
    'El minador de la hoja de los cítricos es una pequeña polilla cuyas larvas forman galerías serpenteantes características en las hojas jóvenes. Los síntomas incluyen hojas enrolladas, distorsionadas y con un aspecto plateado debido a las galerías.',
    'Hojas jóvenes y brotes tiernos')
  RETURNING id INTO plaga1_id;

  INSERT INTO plagas (rancho_id, nombre_comun, nombre_cientifico, genero, clasificacion, descripcion_corta, descripcion_completa, lugares_en_arbol)
  VALUES (rancho1_id, 'Psílido asiático', 'Diaphorina citri', 'Diaphorina', 'Insecto - Hemiptera',
    'Vector del Huanglongbing (HLB), enfermedad devastadora de cítricos.',
    'El psílido asiático de los cítricos es el principal vector del Huanglongbing (HLB) o enverdecimiento de los cítricos, considerada la enfermedad más destructiva de los cítricos a nivel mundial.',
    'Brotes tiernos, hojas jóvenes')
  RETURNING id INTO plaga2_id;

  INSERT INTO plagas (rancho_id, nombre_comun, nombre_cientifico, genero, clasificacion, descripcion_corta, descripcion_completa, lugares_en_arbol)
  VALUES (rancho2_id, 'Mosca de la fruta', 'Anastrepha ludens', 'Anastrepha', 'Insecto - Diptera',
    'Plaga cuarentenaria que oviposita en frutos maduros.',
    'La mosca mexicana de la fruta es una plaga cuarentenaria de importancia económica. Las hembras ovipositan en frutos maduros donde las larvas se desarrollan alimentándose de la pulpa.',
    'Frutos en maduración');

  -- Insertar algunas imágenes de ejemplo
  INSERT INTO imagenes_plaga (plaga_id, url, tipo) VALUES
    (plaga1_id, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600', 'campo'),
    (plaga2_id, 'https://images.unsplash.com/photo-1589244159943-460088ed5c92?w=600', 'campo');
END $$;

-- =============================================
-- STORAGE BUCKET (ejecutar por separado en Supabase)
-- =============================================
-- En Supabase Dashboard:
-- 1. Ir a Storage
-- 2. Crear bucket llamado "imagenes"
-- 3. Configurar como público
-- 4. Políticas: permitir lectura pública, escritura autenticada
