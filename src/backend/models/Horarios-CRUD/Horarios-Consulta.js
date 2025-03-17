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