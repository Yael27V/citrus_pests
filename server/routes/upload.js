/**
 * Endpoints de carga de imágenes (API REST)
 * @author Ing. Yael Vicente
 *
 * Permite subir imágenes a Supabase Storage o simular en modo mock.
 */
import express from 'express';
import multer from 'multer';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';

const router = express.Router();

// Configura multer para almacenar archivos en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes'), false);
    }
  }
});

// POST /api/upload/imagen - Subir imagen
router.post('/imagen', upload.single('imagen'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    const { plaga_id, tipo } = req.body;
    // Si hay Supabase, sube la imagen real
    if (isSupabaseConfigured()) {
      // Genera nombre único para el archivo
      const fileExt = req.file.originalname.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `plagas/${plaga_id || 'general'}/${fileName}`;
      // Sube a Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('imagenes')
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false
        });
      if (uploadError) throw uploadError;
      // Obtiene URL pública
      const { data: { publicUrl } } = supabase
        .storage
        .from('imagenes')
        .getPublicUrl(filePath);
      // Si hay plaga_id, guarda referencia en la base de datos
      if (plaga_id) {
        const { error: dbError } = await supabase
          .from('imagenes_plaga')
          .insert([{
            plaga_id,
            url: publicUrl,
            tipo: tipo || 'campo'
          }]);
        if (dbError) throw dbError;
      }
      return res.json({
        success: true,
        url: publicUrl,
        path: filePath
      });
    }
    // Modo mock - simula upload exitoso
    res.json({
      success: true,
      url: `https://placeholder.com/uploaded-${Date.now()}.jpg`,
      path: `mock/plagas/${Date.now()}.jpg`,
      message: 'Modo mock: imagen no guardada realmente'
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error al subir imagen' });
  }
});

export default router;
