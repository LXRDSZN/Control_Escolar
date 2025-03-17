import { connection } from "../db.js";

export const ConsultaDocente = async () => {
  try {
    const [rows] = await connection.execute(
      'SELECT id_profesor, Nombre, Apellido_P, Apellido_M, Telefono, Correo,RFC, Especialidad FROM MAESTROS'
    );
    return rows;
  } catch (error) {
    console.error('Error al consultar los Docentes:', error);
    throw new Error('Error al consultar los Docentes');
  }
};

export const registrarDocente = async (id_profesor, nombre, apellido_p, apellido_m, fecha_nac, rfc, telefono, correo, direccion, nss, especialidad, sexo) => {
  const query = `
    INSERT INTO MAESTROS 
    (id_profesor, Nombre, Apellido_P, Apellido_M, Fecha_Nac, RFC, Telefono, Correo, Direccion, NSS, Especialidad, Sexo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await connection.execute(query, [id_profesor, nombre, apellido_p, apellido_m, fecha_nac, rfc, telefono, correo, direccion, nss, especialidad, sexo]);
    return result.insertId; // Devuelve el ID de la inserción
  } catch (error) {
    console.error('Error al registrar el docente:', error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};