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

export const eliminarAlumno = async (idalumno) => {
  const query = 'DELETE FROM ALUMNOS WHERE No_Control = ?;';

  try {
    const [result] = await connection.execute(query, [idalumno]);
    return result; // Devuelve el resultado de la consulta
  } catch (error) {
    console.error('Error al eliminar el Kardex:', error);
    throw error; // Lanza el error para que se maneje en la ruta
  }
};

export const actualizarAlumno = async (
  no_control, nombre, apellido_p, apellido_m, fecha_nacimiento, telefono,
  correo, nss, grupo, semestre, carrera, direccion, prom_acumulado, sexo
) => {
  const query = `
    UPDATE ALUMNOS
    SET 
      Nombre = ?, 
      Apellido_P = ?, 
      Apellido_M = ?, 
      Fecha_Nacimiento = ?, 
      Telefono = ?, 
      Correo = ?, 
      Nss = ?, 
      Grupo = ?, 
      Semestre = ?, 
      Carrera = ?, 
      Direccion = ?, 
      Prom_Acumulado = ?, 
      Sexo = ?
    WHERE No_Control = ?
  `;

  try {
    // Ejecutamos la consulta de actualización con los valores proporcionados
    const [result] = await connection.execute(query, [
      nombre, apellido_p, apellido_m, fecha_nacimiento, telefono, correo, 
      nss, grupo, semestre, carrera, direccion, prom_acumulado, sexo, no_control
    ]);

    console.log('Resultado de la actualización:', result); // Agregar log para verificar el resultado

    // Verificamos si se realizó la actualización
    if (result.affectedRows > 0) {
      return { success: true, message: 'Alumno actualizado correctamente' };
    } else {
      return { success: false, message: 'No se encontró el alumno o no se actualizó ningún registro' };
    }
  } catch (error) {
    console.error('Error al actualizar el alumno:', error);
    return { success: false, message: 'Error al actualizar el alumno', error };
  }
};
