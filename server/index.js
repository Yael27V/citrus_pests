import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ranchosRoutes from './routes/ranchos.js';
import plagasRoutes from './routes/plagas.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ranchos', ranchosRoutes);
app.use('/api/plagas', plagasRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando correctamente" });
});

app.get("/api/test", (req, res) => {
  res.json({ ok: true, message: "Conexión exitosa entre frontend y backend" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
