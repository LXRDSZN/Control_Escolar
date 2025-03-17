import { connection } from "../db.js";

export const ConsultaAlumno = async () => {
  try {
    const [rows] = await connection.execute(
      'SELECT No_Control, Nombre, Apellido_P, Apellido_M, Telefono, Correo, Grupo, Semestre, Carrera FROM ALUMNOS'
    );
    return rows;
  } catch (error) {
    console.error('Error al consultar los alumnos:', error);
    throw new Error('Error al consultar los alumnos');
  }
};

export const registrarAlumno = async (no_control, nombre, apellido_p, apellido_m, fecha_nacimiento, telefono, correo, nss, grupo, semestre, carrera, direccion, prom_acumulado, sexo) => {
  const query = `
    INSERT INTO ALUMNOS 
    (No_Control, Nombre, Apellido_P, Apellido_M, Fecha_Nacimiento, Telefono, Correo, Nss, Grupo, Semestre, Carrera, Direccion, Prom_Acumulado, Sexo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await connection.execute(query, [no_control, nombre, apellido_p, apellido_m, fecha_nacimiento, telefono, correo, nss, grupo, semestre, carrera, direccion, prom_acumulado, sexo]);
    return result.insertId; // Devuelve el ID de la inserción
  } catch (error) {
    console.error('Error al registrar el alumno:', error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};