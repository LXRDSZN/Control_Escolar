import { connection } from "../db.js";

export const Consultagrupos = async () => {
  try {
    const [rows] = await connection.execute(
      'select Id_Grupo, Turno FROM GRUPO'
    );
    return rows;
  } catch (error) {
    console.error('Error al consultar los Horarios:', error);
    throw new Error('Error al consultar los Horarios');
  }
};

export const registrarGrupo = async (turno) => {
  const query = `
    INSERT INTO GRUPO 
    (Turno)
    VALUES (?);
  `;

  try {
    const [result] = await connection.execute(query, [turno]);
    return result.insertId; // Devuelve el ID de la inserción
  } catch (error) {
    console.error('Error al registrar el grupo:', error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};