import { connection } from "../db.js";

export const ConsultaHorario = async () => {
  try {
    const [rows] = await connection.execute(
      'select Id_Horario, No_Control,Id_Profesor,Id_Grupo,Aula,Hora,Dia, Id_Materia from HORARIO'
    );
    return rows;
  } catch (error) {
    console.error('Error al consultar los Horarios:', error);
    throw new Error('Error al consultar los Horarios');
  }
};


export const registrarHorario = async (no_control,id_profesor,id_grupo,aula,hora,dia,id_materia) => {
  const query = `
    INSERT INTO HORARIO 
    (No_Control,Id_Profesor,Id_Grupo,Aula,Hora,Dia,Id_Materia)
    VALUES (?,?,?,?,?,?,?);
  `;

  try {
    const [result] = await connection.execute(query, [no_control,id_profesor,id_grupo,aula,hora,dia,id_materia]);
    return result.insertId; // Devuelve el ID de la inserción
  } catch (error) {
    console.error('Error al registrar el grupo:', error);
    throw error; // Lanza el error para que se maneje en el controlador
  }
};

export const eliminarHorario = async (idhorario) => {
  const query = 'DELETE FROM HORARIO WHERE Id_Horario = ?;';

  try {
    const [result] = await connection.execute(query, [idhorario]);
    return result; // Devuelve el resultado de la consulta
  } catch (error) {
    console.error('Error al eliminar el Kardex:', error);
    throw error; // Lanza el error para que se maneje en la ruta
  }
};

export const actualizarHorario = async (
  id_horario,
  no_control,
  id_profesor,
  id_grupo,
  aula,
  hora,
  dia,
  id_materia
) => {
  try {
    const query = `
      UPDATE HORARIO
      SET 
        No_Control = ?, 
        Id_Profesor = ?, 
        Id_Grupo = ?, 
        Aula = ?, 
        Hora = ?, 
        Dia = ?, 
        Id_Materia = ?
      WHERE Id_Horario = ?
    `;

    const values = [
      no_control,
      id_profesor,
      id_grupo,
      aula,
      hora,
      dia,
      id_materia,
      id_horario,
    ];

    const [result] = await connection.execute(query, values);

    return {
      success: true,
      message: 'Horario actualizado correctamente',
      data: result,
    };
  } catch (error) {
    console.error('Error al actualizar el horario:', error);
    throw error;
  }
};