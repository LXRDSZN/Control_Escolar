import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';  
const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173',  // URL del frontend
  credentials: true,  // Permite que las cookies sean enviadas entre frontend y backend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Añadir todos los métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],  // Asegurarse de permitir todos los encabezados necesarios
}));

app.use(express.json());  // Middleware para manejar el cuerpo de las solicitudes en formato JSON

app.use('/api', authRoutes);  // Ruta base para las rutas de autenticación

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
