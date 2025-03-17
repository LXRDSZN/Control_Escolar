import mysql from 'mysql2/promise';  // Usamos 'mysql2/promise' directamente

// Crear conexión con MariaDB
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bcb96dbdb1',
  database: 'Control_Escolar',
  port: 3306,
});

// Función para verificar las credenciales del usuario
const checkUserCredentials = async (usuario, contrasena) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM usuarios WHERE username = ? AND password = ?', [usuario, contrasena]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error('Error al consultar los usuarios:', err);
    throw new Error('Error al consultar los usuarios');
  }
};

export { connection, checkUserCredentials };
