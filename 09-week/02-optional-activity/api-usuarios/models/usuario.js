const { v4: uuidv4 } = require("uuid");

class Usuario {
  constructor(nombre, email, password) {
    this.id = uuidv4(); // Genera un UUID
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.fecha_creacion = new Date();
  }
}

module.exports = Usuario;

