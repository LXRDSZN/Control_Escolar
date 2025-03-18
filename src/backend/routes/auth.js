import express from 'express';
import jwt from 'jsonwebtoken';
//importamos modelos para Alumnos
import { checkUserCredentials } from '../models/db.js';
import { ConsultaAlumno, registrarAlumno, eliminarAlumno, actualizarAlumno} from '../models/Alumnos-CRUD/Alumnos.js';
//Importamos Modelos para Docentes
import { ConsultaDocente, registrarDocente,eliminarDocente, actualizarDocente } from '../models/Maestros-CRUD/Docentes-Consulta.js';


//Importamos modelos para Materias
import { ConsultaMateria, registrarMateria,eliminarMateria } from '../models/Materias-CRUD/Materias-Consulta.js';
const router = express.Router();

//importamos modelos para Horarios
import { ConsultaHorario , registrarHorario, eliminarHorario} from '../models/Horarios-CRUD/Horarios-Consulta.js';

//importamos modelos de grupo
import { Consultagrupos, registrarGrupo, eliminarGrupo,actualizarGrupo } from '../models/Grupos-CRUD/Grupos-Consulta.js';

//imnpotamos modelos de KARDEX
import { ConsultaKardex, registrarkardex, eliminarKardex } from '../models/Kardex-CRUD/Kardex-Consulta.js';

/*
##################################################################################################
#                          Endpoint para inicio de  sesion                                       #
##################################################################################################
*/
// Ruta para login
router.post('/auth/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const user = await checkUserCredentials(usuario, contrasena);  // Verificar las credenciales
    if (user) {
      // Crear un JWT de sesión
      const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });
      return res.json({ message: 'Login exitoso', token });  // Devuelve el token al frontend
    }
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});

/*
##################################################################################################
#                          Endpoint para realizacion de consultas                               #
##################################################################################################
*/

//Endpoint para ver alumnos
router.get('/auth/obteneralumnos', async (req, res) => {
  try {
    // Llamamos a la función ConsultaAlumno para obtener los alumnos
    const Alumnos = await ConsultaAlumno();
    
    // Si todo va bien, enviamos los alumnos como respuesta
    res.status(200).json(Alumnos);
  } catch (error) {
    // Si hay algún error, devolvemos un mensaje de error
    console.error('Error al obtener los Alumnos:', error);
    res.status(500).json({ message: 'Error al consultar los Alumnos', error: error.message });
  }
});
//Endpoint para ver Docente
router.get('/auth/obtenerdocentes', async (req, res) => {
  try {
    // Llamamos a la función ConsultaAlumno para obtener los Docentes
    const Docente = await ConsultaDocente();
    
    // Si todo va bien, enviamos los Docente como respuesta
    res.status(200).json(Docente);
  } catch (error) {
    // Si hay algún error, devolvemos un mensaje de error
    console.error('Error al obtener los Docentes:', error);
    res.status(500).json({ message: 'Error al consultar los Docentes', error: error.message });
  }
});
//Endponit para ver Materias
router.get('/auth/obtenermaterias', async (req, res) => {
  try {
    // Llamamos a la función ConsultaAlumno para obtener los Materias
    const Materia = await ConsultaMateria();
    
    // Si todo va bien, enviamos los Materias como respuesta
    res.status(200).json(Materia);
  } catch (error) {
    // Si hay algún error, devolvemos un mensaje de error
    console.error('Error al obtener los Materias:', error);
    res.status(500).json({ message: 'Error al consultar los Materias', error: error.message });
  }
});
//Endponit para ver Horarios
router.get('/auth/obtenerhorarios', async (req, res) => {
  try {
    // Llamamos a la función ConsultaAlumno para obtener los Horarios
    const Horario = await ConsultaHorario();
    
    // Si todo va bien, enviamos los Horarios como respuesta
    res.status(200).json(Horario);
  } catch (error) {
    // Si hay algún error, devolvemos un mensaje de error
    console.error('Error al obtener los Horarios:', error);
    res.status(500).json({ message: 'Error al consultar los Horarios', error: error.message });
  }
});
//Endponit para ver grupos
router.get('/auth/obtenergrupos', async (req, res) => {
  try {
    // Llamamos a la función ConsultaAlumno para obtener los Horarios
    const Grupo = await Consultagrupos();
    
    // Si todo va bien, enviamos los Horarios como respuesta
    res.status(200).json(Grupo);
  } catch (error) {
    // Si hay algún error, devolvemos un mensaje de error
    console.error('Error al obtener los grupos:', error);
    res.status(500).json({ message: 'Error al consultar los grupos', error: error.message });
  }
});

//Endponit para ver kardex
router.get('/auth/obtenerkardex', async (req, res) => {
  try {
    // Llamamos a la función ConsultaAlumno para obtener los kardex
    const Kardex = await ConsultaKardex();
    
    // Si todo va bien, enviamos los kardex como respuesta
    res.status(200).json(Kardex);
  } catch (error) {
    // Si hay algún error, devolvemos un mensaje de error
    console.error('Error al obtener los kardex:', error);
    res.status(500).json({ message: 'Error al consultar los kardex', error: error.message });
  }
});


/*
##################################################################################################
#                          Endpoint para Añadir                                                   #
##################################################################################################
*/
//Endpoint para dar de alta a  Alumnos
router.post('/auth/registraralumno', async (req, res) => {
  const { no_control, nombre, apellido_p, apellido_m, fecha_nacimiento, telefono, correo, nss, grupo, semestre, carrera, direccion, prom_acumulado, sexo } = req.body;

  // Validaciones adicionales
  if (!no_control || !nombre || !apellido_p || !fecha_nacimiento || !telefono || !correo || !nss || !grupo || !semestre || !carrera || !direccion || !prom_acumulado || !sexo) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevoestudiante = await registrarAlumno(no_control, nombre, apellido_p, apellido_m, fecha_nacimiento, telefono, correo, nss, grupo, semestre, carrera, direccion, prom_acumulado, sexo);
    return res.status(201).json({ message: 'Alumno registrado exitosamente', data: nuevoestudiante });
  } catch (error) {
    console.error('Error al registrar el alumno:', error);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

//Endpont para dal de alta a los docentes
router.post('/auth/registrardocente', async (req, res) => {
  const { id_profesor, nombre, apellido_p, apellido_m, fecha_nac, rfc, telefono, correo, direccion, nss, especialidad, sexo } = req.body;

  // Validaciones adicionales
  if (
    !id_profesor || !nombre || !apellido_p || !fecha_nac || !rfc || !telefono || !correo || !direccion || !nss || !especialidad || !sexo
  ) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevodocente = await registrarDocente(id_profesor, nombre, apellido_p, apellido_m, fecha_nac, rfc, telefono, correo, direccion, nss, especialidad, sexo);
    return res.status(201).json({ message: 'Docente registrado exitosamente', data: nuevodocente });
  } catch (error) {
    console.error('Error al registrar el Docente:', error);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});
//Endpont para dal de alta a las Materias
router.post('/auth/registrarmateria', async (req, res) => {
  const { id_materia,nombre,creditos,semestre,departamento} = req.body;

  // Validaciones adicionales
  if (
    !id_materia || !nombre || !creditos || !semestre || !departamento
  ) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevamateria = await registrarMateria(id_materia,nombre,creditos,semestre,departamento);
    return res.status(201).json({ message: '  Materia registrado exitosamente', data: nuevamateria });
  } catch (error) {
    console.error('Error al registrar La Materia:', error);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});
//Endpoint para agregar Grupo 
router.post('/auth/registrargrupo', async (req, res) => {
  const { turno } = req.body;

  // Validaciones adicionales
  if (!turno) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Validar Turno (máximo 20 caracteres)
  if (turno.length > 20) {
    return res.status(400).json({ message: 'El turno no puede tener más de 20 caracteres.' });
  }

  try {
    const nuevoGrupo = await registrarGrupo(turno);
    return res.status(201).json({ message: 'Grupo registrado exitosamente', data: nuevoGrupo });
  } catch (error) {
    console.error('Error al registrar el grupo:', error);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});


// Endpoint para dar de alta un horario
router.post('/auth/registrarhorario', async (req, res) => {
  const { no_control, id_profesor, id_grupo, aula, hora, dia, id_materia } = req.body;

  // Validaciones adicionales
  if (
    !no_control || !id_profesor || !id_grupo || !aula || !hora || !dia || !id_materia
  ) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevoHorario = await registrarHorario(no_control, id_profesor, id_grupo, aula, hora, dia, id_materia);
    return res.status(201).json({ message: 'Horario registrado exitosamente', data: nuevoHorario });
  } catch (error) {
    console.error('Error al registrar el horario:', error);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});


// Endpoint para dar de alta un kardex
router.post('/auth/registrarkardex', async (req, res) => {
  const { no_control,id_materia,promedio } = req.body;

  // Validaciones adicionales
  if (
    !no_control || !id_materia || !promedio
  ) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevoKardex = await registrarkardex(no_control,id_materia,promedio);
    return res.status(201).json({ message: 'Kardex registrado exitosamente', data: nuevoKardex });
  } catch (error) {
    console.error('Error al registrar el Kardex:', error);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});


/*
##################################################################################################
#                          Endpoint para eliminar                                                 #
##################################################################################################
*/

// Endpoint para eliminar un alumno
//Endpoint para eliminar Kardex 
router.post('/auth/bajakardex', async (req, res) => {
  const { idKardex } = req.body; // Obtén el Id_Kardex desde el cuerpo de la solicitud

  try {
    const result = await eliminarKardex(idKardex); // Llama a la función eliminarKardex

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Kardex eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'No se encontró el Kardex' });
    }
  } catch (error) {
    console.error('Error al eliminar el Kardex:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});
// Ruta para eliminar un Horario
router.post('/auth/bajahorario', async (req, res) => {
  const { idhorario } = req.body; // Obtén el Id_Kardex desde el cuerpo de la solicitud

  try {
    const result = await eliminarHorario(idhorario); // Llama a la función eliminarHorario

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Horario eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'No se encontró el Horario' });
    }
  } catch (error) {
    console.error('Error al eliminar el Horario:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});
// Ruta para eliminar un Alumno
router.post('/auth/bajaalumno', async (req, res) => {
  const { idalumno } = req.body; // Obtén el Id_Kardex desde el cuerpo de la solicitud

  try {
    const result = await eliminarAlumno(idalumno); // Llama a la función eliminaralumno

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Alumno eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'No se encontró el Alumno' });
    }
  } catch (error) {
    console.error('Error al eliminar el Alumno:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});

// Ruta para eliminar un Docente
router.post('/auth/bajadocente', async (req, res) => {
  const { iddocente } = req.body; // Obtén el Id_Kardex desde el cuerpo de la solicitud

  try {
    const result = await eliminarDocente(iddocente); // Llama a la función eliminaralumno

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Docente eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'No se encontró el Docente' });
    }
  } catch (error) {
    console.error('Error al eliminar el Docente:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});

// Ruta para eliminar una Materia
router.post('/auth/bajamateria', async (req, res) => {
  const { idmateria } = req.body; // Obtén el Id_Kardex desde el cuerpo de la solicitud

  try {
    const result = await eliminarMateria(idmateria); // Llama a la función eliminaralumno

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Materia eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'No se encontró el Materia' });
    }
  } catch (error) {
    console.error('Error al eliminar el Materia:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});
// Ruta para eliminar un Grupo
router.post('/auth/bajagrupo', async (req, res) => {
  const { idgrupo } = req.body; // Obtén el Id_Kardex desde el cuerpo de la solicitud

  try {
    const result = await eliminarGrupo(idgrupo); // Llama a la función eliminaralumno

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Grupo eliminado correctamente' });
    } else {
      return res.status(400).json({ message: 'No se encontró el Grupo' });
    }
  } catch (error) {
    console.error('Error al eliminar el Materia:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});
/*
##################################################################################################
#                          Endpoint para Actualizar                                               #
##################################################################################################
*/

// Ruta para modificar un grupo
router.put('/auth/modificargrupo', async (req, res) => {
  const { idGrupo, turno } = req.body; // Obtén el Id_Grupo y el nuevo Turno desde el cuerpo de la solicitud

  // Validaciones básicas
  if (!idGrupo || !turno) {
    return res.status(400).json({ message: 'Faltan datos obligatorios (idGrupo o turno)' });
  }

  if (turno.length > 20) {
    return res.status(400).json({ message: 'El turno no puede exceder los 20 caracteres' });
  }

  try {
    const result = await actualizarGrupo(idGrupo, turno); // Llama a la función actualizarGrupo

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Grupo modificado correctamente' });
    } else {
      return res.status(400).json({ message: 'No se encontró el grupo' });
    }
  } catch (error) {
    console.error('Error al modificar el grupo:', error);
    return res.status(500).json({ message: 'Error del servidor', error });
  }
});


// Ruta para modificar los datos del alumno
router.put('/auth/modificaralumno/:no_control', async (req, res) => {
  const { no_control } = req.params; // No_Control del alumno (recibido como parámetro en la URL)
  const {
    nombre,
    apellidoP,
    apellidoM,
    fechaNacimiento,
    telefono,
    correo,
    nss,
    grupo,
    semestre,
    carrera,
    direccion,
    promAcumulado,
    sexo
  } = req.body; // Datos del alumno a actualizar recibidos en el cuerpo de la solicitud

  try {
    // Llamamos a la función que actualiza los datos del alumno
    const updatedAlumno = await actualizarAlumno(
      no_control,
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento,
      telefono,
      correo,
      nss,
      grupo,
      semestre,
      carrera,
      direccion,
      promAcumulado,
      sexo
    );

    if (updatedAlumno.success) {
      return res.status(200).json({
        success: true,
        message: 'Datos del alumno actualizados con éxito'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: updatedAlumno.message || 'No se pudo actualizar los datos del alumno'
      });
    }
  } catch (error) {
    console.error('Error al actualizar los datos del alumno:', error);
    return res.status(500).json({ success: false, message: 'Error del servidor', error });
  }
});


// Ruta para modificar los datos del docente
router.put('/auth/modificardocente/:id_profesor', async (req, res) => {
  const { id_profesor } = req.params; // No_Control del docente (recibido como parámetro en la URL)
  const {
  nombre,
  apellidoP,
  apellidoM,
  fechaNac,
  rfc,
  telefono,
  correo,
  direccion,
  nss,
  especialidad,
  sexo
  } = req.body; // Datos del docentes a actualizar recibidos en el cuerpo de la solicitud

  try {
    // Llamamos a la función que actualiza los datos del docentes
    const updatedDocente = await actualizarDocente(
      id_profesor,
      nombre,
      apellidoP,
      apellidoM,
      fechaNac,
      rfc,
      telefono,
      correo,
      direccion,
      nss,
      especialidad,
      sexo
    );

    if (updatedDocente.success) {
      return res.status(200).json({
        success: true,
        message: 'Datos del docentes actualizados con éxito'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: updatedDocente.message || 'No se pudo actualizar los datos del docentes'
      });
    }
  } catch (error) {
    console.error('Error al actualizar los datos del docentes:', error);
    return res.status(500).json({ success: false, message: 'Error del servidor', error });
  }
});




export default router;
