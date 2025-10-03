const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

// Almacenamiento temporal en memoria
let usuarios = [];

// Crear usuario
exports.crearUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({ error: "El email ya está registrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = new Usuario(nombre, email, hashedPassword);

  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
};

// Listar usuarios
exports.listarUsuarios = (req, res) => {
  res.json(usuarios);
};

// Obtener usuario por ID
exports.obtenerUsuario = (req, res) => {
  const usuario = usuarios.find(u => u.id === req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(usuario);
};

// Actualizar usuario
exports.actualizarUsuario = (req, res) => {
  const usuario = usuarios.find(u => u.id === req.params.id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  const { nombre, email } = req.body;
  if (nombre) usuario.nombre = nombre;
  if (email) usuario.email = email;

  res.json(usuario);
};

// Eliminar usuario
exports.eliminarUsuario = (req, res) => {
  const index = usuarios.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Usuario no encontrado" });

  usuarios.splice(index, 1);
  res.json({ mensaje: "Usuario eliminado correctamente" });
};
