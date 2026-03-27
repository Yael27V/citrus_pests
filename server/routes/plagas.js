/**
 * Endpoints de plagas (API REST)
 * @author Ing. Yael Vicente
 *
 * Maneja las rutas para obtener y crear plagas, usando Supabase o modo mock.
 */
import express from 'express';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';

const router = express.Router();

// Datos mock de plagas para desarrollo local
const mockPlagas = [
  {
    id: 'arana-roja',
    rancho_id: 'mesa-grande',
    nombre_comun: 'Araña roja',
    nombre_cientifico: 'Tetranychus urticae',
    genero: 'Tetranychus',
    clasificacion: 'Ácaro - Tetranychidae',
    descripcion_corta: 'Ácaro diminuto (0.3–0.5 mm) rojo-anaranjado. Teje telarañas finas en hojas y brotes. Se reproduce rápido en calor y baja humedad.',
    descripcion_completa: `La araña roja pertenece a la familia Tetranychidae y es una plaga polífaga, causa daños severos al succionar savia de hojas, brotes y cáscaras de fruto.

Ciclo de vida:
• Huevo (transparente, esférico)
• Larva (tres pares de patas, amarilla)
• Ninfa (cuatro pares, similar al adulto)
• Adulto

Dura 5–10 días en primavera-verano permitiendo múltiples generaciones (15–20 por año). En condiciones óptimas (calor y baja humedad) completa un ciclo en 5–7 días, con hasta 20 generaciones por temporada. Las hembras adultas son ovaladas, de color rojo intenso, y los machos más delgados y pálidos.

Se alimentan succionando la savia de las células vegetales, dejando residuos tóxicos. Son más activas en el envés de las hojas, donde forman colonias densas con telarañas protectoras.

Factores que favorecen su proliferación: sequía, exceso de polvo, estrés hídrico, exceso de nitrógeno en fertilizantes y uso repetido de insecticidas de amplio espectro que matan a depredadores naturales (como ácaros Phytoseiulus persimilis o Neoseiulus californicus).`,
    lugares_en_arbol: 'Envés de la hoja (principal), Hojas maduras (zona baja del árbol), Brotes nuevos, Ramas y frutos cuando hay colonias con telaraña',
    video_url: 'https://youtube.com/shorts/8OXqZkjQG3g',
    imagen_cover_url: '/assets/plagas/arana-roja/portadaArana.png',
    sintomas: [
      {
        titulo: 'Punteado fino',
        detalle: 'Pequeños puntos blancos o amarillos en el envés por succión de savia; inicia en hojas inferiores o expuestas.'
      },
      {
        titulo: 'Amarilleo y bronceado',
        detalle: 'Hojas amarillas (clorosis) o marrones, aspecto quemado o polvoriento; daño intervenal en etapas tempranas.'
      },
      {
        titulo: 'Telaraña visible',
        detalle: 'Hilos finos en envés de hojas, ramas o frutos; signo clave para diferenciarla.'
      },
      {
        titulo: 'Deformación o caída',
        detalle: 'Hojas enrolladas/deformadas o caída prematura; en frutos aparecen picaduras finas.'
      },
      {
        titulo: 'Crecimiento reducido',
        detalle: 'Planta estresada, menor vigor; en casos graves defoliación total.'
      }
    ],
    danos: [
      {
        titulo: 'Reducción fotosintética',
        detalle: 'Al succionar cloroplastos reduce producción de azúcares; bajas de rendimiento 20%–50% (hasta 100% en severas).'
      },
      {
        titulo: 'Estrés y susceptibilidad',
        detalle: 'Plantas debilitadas más vulnerables a otras plagas/enfermedades y sequía; puede causar caída prematura de frutos.'
      },
      {
        titulo: 'Impacto económico',
        detalle: 'Pérdidas por menor calidad/cantidad, frutos deformes o daño en cáscara.'
      }
    ],
    monitoreo: [
      'El monitoreo debe realizarse de forma sistémica y semanal.',
      'Inspeccionar principalmente el envés de hojas maduras en la parte inferior del árbol.',
      'Observar brotes nuevos: punto clave para monitoreo de esta plaga.'
    ],
    lugares_detalle: [
      'Envés de la hoja (principal)',
      'Hojas maduras (zona baja del árbol)',
      'Brotes nuevos',
      'Ramas y frutos cuando hay colonias con telaraña'
    ],
    galerias: {
      adultos: [
        '/assets/plagas/arana-roja/Adulto.png',
        '/assets/plagas/arana-roja/Adulto2.png',
        '/assets/plagas/arana-roja/Adultos_ninfas.png'
      ],
      huevos: [
        '/assets/plagas/arana-roja/Huevecillo.png',
        '/assets/plagas/arana-roja/Huevo.png',
        '/assets/plagas/arana-roja/Huevo_fruto.png',
        '/assets/plagas/arana-roja/Huevo_hoja.png',
        '/assets/plagas/arana-roja/Huevo_hojas.png'
      ]
    },
    created_at: new Date().toISOString()
  }
];

// GET /api/plagas - Lista todas las plagas
// GET /api/plagas - Lista todas las plagas o filtra por rancho
router.get('/', async (req, res) => {
  try {
    const { rancho_id } = req.query;
    // Si hay Supabase, consulta la base de datos
    if (isSupabaseConfigured()) {
      let query = supabase
        .from('plagas')
        .select(`
          *,
          imagenes_plaga (*)
        `)
        .order('created_at', { ascending: false });
      if (rancho_id) {
        query = query.eq('rancho_id', rancho_id);
      }
      const { data, error } = await query;
      if (error) throw error;
      return res.json(data);
    }
    // Modo mock para desarrollo
    let plagas = mockPlagas;
    if (rancho_id) {
      plagas = plagas.filter(p => p.rancho_id === rancho_id);
    }
    res.json(plagas);
  } catch (error) {
    console.error('Error fetching plagas:', error);
    res.status(500).json({ error: 'Error al obtener plagas' });
  }
});

// GET /api/plagas/:id - Detalle de una plaga
// GET /api/plagas/:id - Detalle de una plaga
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('plagas')
        .select(`
          *,
          imagenes_plaga (*),
          ranchos (nombre, ubicacion)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return res.json(data);
    }
    // Modo mock para desarrollo
    const plaga = mockPlagas.find(p => p.id === id);
    if (!plaga) {
      return res.status(404).json({ error: 'Plaga no encontrada' });
    }
    res.json(plaga);
  } catch (error) {
    console.error('Error fetching plaga:', error);
    res.status(500).json({ error: 'Error al obtener plaga' });
  }
});

// POST /api/plagas - Crear nueva plaga (ADMIN)
// POST /api/plagas - Crear nueva plaga (ADMIN)
router.post('/', async (req, res) => {
  try {
    const {
      rancho_id,
      nombre_comun,
      nombre_cientifico,
      genero,
      clasificacion,
      descripcion_corta,
      descripcion_completa,
      lugares_en_arbol,
      video_url
    } = req.body;
    // Validación mínima
    if (!nombre_comun || !rancho_id) {
      return res.status(400).json({ error: 'nombre_comun y rancho_id son requeridos' });
    }
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('plagas')
        .insert([{
          rancho_id,
          nombre_comun,
          nombre_cientifico,
          genero,
          clasificacion,
          descripcion_corta,
          descripcion_completa,
          lugares_en_arbol,
          video_url
        }])
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    // Modo mock para desarrollo
    const newPlaga = {
      id: String(mockPlagas.length + 1),
      rancho_id,
      nombre_comun,
      nombre_cientifico,
      genero,
      clasificacion,
      descripcion_corta,
      descripcion_completa,
      lugares_en_arbol,
      video_url,
      imagenes: [],
      created_at: new Date().toISOString()
    };
    mockPlagas.push(newPlaga);
    res.status(201).json(newPlaga);
  } catch (error) {
    console.error('Error creating plaga:', error);
    res.status(500).json({ error: 'Error al crear plaga' });
  }
});

export default router;
