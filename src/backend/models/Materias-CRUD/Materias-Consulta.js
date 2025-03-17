import { connection } from "../db.js";

export const ConsultaMateria = async () => {
  try {
    const [rows] = await connection.execute(
      'SELECT Id_Materia,Nombre,Creditos,Semestre,Departamento FROM MATERIAS'
    );
    return rows;
  } catch (error) {
    console.error('Error al consultar los Materias:', error);
    throw new Error('Error al consultar los Materias');
  }
};
export const registrarMateria = async (id_materia,nombre,creditos,semestre,departamento) => {
  const query = `
    INSERT INTO MATERIAS 
    (Id_Materia,Nombre,Creditos,Semestre,Departamento)
    VALUES (?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await connection.execute(query, [id_materia,nombre,creditos,semestre,departamento]);
    return result.insertId; // Devuelve el ID de la inserción
  } catch (error) {
    console.error('Error al registrar las materias:', error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};