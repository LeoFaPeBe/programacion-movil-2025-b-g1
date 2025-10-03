const express = require("express");
const app = express();
const usuarioRoutes = require("./routes/usuarioRoutes");

// Middleware
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
