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


export const eliminarMateria = async (idmateria) => {
  const query = 'DELETE FROM MATERIAS WHERE Id_Materia = ?;';

  try {
    const [result] = await connection.execute(query, [idmateria]);
    return result; // Devuelve el resultado de la consulta
  } catch (error) {
    console.error('Error al eliminar la materia:', error);
    throw error; // Lanza el error para que se maneje en la ruta
  }
};

// QUERY PARA ACTUALIZAR MATERIAS
export const actualizarMateria = async (
  id_materia, nombre, creditos, semestre, departamento
) => {
  // Validaciones adicionales
  if (!id_materia || !nombre || !creditos || !semestre || !departamento) {
    return { success: false, message: 'Todos los campos son obligatorios' };
  }

  const query = `
    UPDATE MATERIAS
    SET 
      Nombre = ?, 
      Creditos = ?, 
      Semestre = ?, 
      Departamento = ?
    WHERE Id_Materia = ?
  `;

  try {
    const [result] = await connection.execute(query, [
      nombre, creditos, semestre, departamento, id_materia
    ]);

    console.log('Resultado de la actualización:', result); // Agregar log para verificar el resultado

    if (result.affectedRows > 0) {
      return { success: true, message: 'Materia actualizada correctamente' };
    } else {
      return { success: false, message: 'No se encontró la materia o no se actualizó ningún registro' };
    }
  } catch (error) {
    console.error('Error al actualizar la Materia:', error);
    return { success: false, message: 'Error al actualizar la Materia', error };
  }
};
