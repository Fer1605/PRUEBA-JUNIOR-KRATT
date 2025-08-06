const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('Servidor funcionando en Kratt Backend');
});

// Autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Proveedores (rutas protegidas con verifyToken)
const providerRoutes = require('./routes/providerRoutes');
app.use('/api/providers', providerRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});