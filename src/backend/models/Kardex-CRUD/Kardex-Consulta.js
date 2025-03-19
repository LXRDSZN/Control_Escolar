import { connection } from "../db.js";

export const ConsultaKardex = async () => {
  try {
    const [rows] = await connection.execute(
      'SELECT Id_Kardex,No_Control,Id_Materia,Promedio FROM KARDEX;'
    );
    return rows;
  } catch (error) {
    console.error('Error al consultar los Materias:', error);
    throw new Error('Error al consultar los Materias');
  }
};

export const registrarkardex = async (no_control,id_materia,promedio) => {
  const query = `
    INSERT INTO KARDEX 
    (No_Control,Id_Materia,Promedio)
    VALUES (?,?,?);
  `;

  try {
    const [result] = await connection.execute(query, [no_control,id_materia,promedio]);
    return result.insertId; // Devuelve el ID de la inserción
  } catch (error) {
    console.error('Error al registrar el kardex:', error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};


export const eliminarKardex = async (idKardex) => {
  const query = 'DELETE FROM KARDEX WHERE Id_Kardex = ?;';

  try {
    const [result] = await connection.execute(query, [idKardex]);
    return result; // Devuelve el resultado de la consulta
  } catch (error) {
    console.error('Error al eliminar el Kardex:', error);
    throw error; // Lanza el error para que se maneje en la ruta
  }
};


export const actualizarKardex = async (
  id_kardex,
  no_control,
  id_materia,
  promedio,

) => {
  try {
    const query = `
      UPDATE KARDEX
      SET 
        No_Control = ?, 
        Id_Materia = ?, 
        Promedio = ? 
      WHERE Id_Kardex = ?
    `;

    const values = [
      no_control,
      promedio,
      id_materia,
      id_kardex,
    ];

    const [result] = await connection.execute(query, values);

    return {
      success: true,
      message: 'Kardex actualizado correctamente',
      data: result,
    };
  } catch (error) {
    console.error('Error al actualizar el horario:', error);
    throw error;
  }
};