/**
 * Endpoints de ranchos (API REST)
 * @author Ing. Yael Vicente
 *
 * Maneja las rutas para obtener y crear ranchos, usando Supabase o modo mock.
 */
import express from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';

const router = express.Router();

// Datos mock para desarrollo local
const mockRanchos = [
  {
    id: 'mesa-grande',
    nombre: 'Mesa Grande',
    descripcion: 'Parcela de lima persa donde realizaremos monitoreo sistemático de plagas.',
    imagen_url: '/assets/ranchos/mesaGrande.png',
    ubicacion: 'México',
    created_at: new Date().toISOString()
  }
];

// GET /api/ranchos - Lista todos los ranchos
// GET /api/ranchos - Lista todos los ranchos
router.get('/', async (req, res) => {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('ranchos')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return res.json(data);
    }
    // Modo mock para desarrollo
    res.json(mockRanchos);
  } catch (error) {
    console.error('Error fetching ranchos:', error);
    res.status(500).json({ error: 'Error al obtener ranchos' });
  }
});

// GET /api/ranchos/:id - Detalle de un rancho
// GET /api/ranchos/:id - Detalle de un rancho
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('ranchos')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return res.json(data);
    }
    // Modo mock para desarrollo
    const rancho = mockRanchos.find(r => r.id === id);
    if (!rancho) {
      return res.status(404).json({ error: 'Rancho no encontrado' });
    }
    res.json(rancho);
  } catch (error) {
    console.error('Error fetching rancho:', error);
    res.status(500).json({ error: 'Error al obtener rancho' });
  }
});

// POST /api/ranchos - Crear nuevo rancho (ADMIN)
// POST /api/ranchos - Crear nuevo rancho (ADMIN)
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, imagen_url, ubicacion } = req.body;
    // Validación mínima
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('ranchos')
        .insert([{ nombre, descripcion, imagen_url, ubicacion }])
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    // Modo mock para desarrollo
    const newRancho = {
      id: String(mockRanchos.length + 1),
      nombre,
      descripcion,
      imagen_url,
      ubicacion,
      created_at: new Date().toISOString()
    };
    mockRanchos.push(newRancho);
    res.status(201).json(newRancho);
  } catch (error) {
    console.error('Error creating rancho:', error);
    res.status(500).json({ error: 'Error al crear rancho' });
  }
});

export default router;
