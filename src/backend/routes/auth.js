import express from 'express';
import jwt from 'jsonwebtoken';
//importamos modelos para Alumnos
import { checkUserCredentials } from '../models/db.js';
import { ConsultaAlumno, registrarAlumno} from '../models/Alumnos-CRUD/Alumnos.js';
//Importamos Modelos para Docentes
import { ConsultaDocente, registrarDocente } from '../models/Maestros-CRUD/Docentes-Consulta.js';


//Importamos modelos para Materias
import { ConsultaMateria, registrarMateria } from '../models/Materias-CRUD/Materias-Consulta.js';
const router = express.Router();

//importamos modelos para Horarios
import { ConsultaHorario , registrarHorario} from '../models/Horarios-CRUD/Horarios-Consulta.js';

//importamos modelos de grupo
import { Consultagrupos, registrarGrupo } from '../models/Grupos-CRUD/Grupos-Consulta.js';

//imnpotamos modelos de KARDEX
import { ConsultaKardex, registrarkardex } from '../models/Kardex-CRUD/Kardex-Consulta.js';

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

/*
##################################################################################################
#                          Endpoint para Actualizar                                               #
##################################################################################################
*/


export default router;
