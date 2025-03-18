import axios from 'axios';

// Crear instancia de Axios con la configuración básica
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
##################################################################################################
#                          api para login                                                         #
##################################################################################################
*/
// Función para login
export const login = async (usuario, contrasena) => {
  try {
    const response = await api.post('/auth/login', { usuario, contrasena });
    return response.data; // Devuelve la respuesta de la API (por ejemplo, el token)
  } catch (error) {
    // Captura el mensaje de error desde el backend
    const message = error.response?.data?.message || 'Error de conexión con el servidor';
    console.error('Error al hacer login:', message);

    // Lanza el mensaje de error para que Vue lo maneje directamente
    throw new Error(message);
  }
};

/*
##################################################################################################
#                          api para Realizacion de consultas                                    #
##################################################################################################
*/
//funcion de consulta de alumnos

export const obteneralumnos = async () => {
  try {
    // Realizamos una solicitud GET a la ruta completa en el backend
    const response = await axios.get('http://localhost:5000/api/auth/obteneralumnos');
    return response.data;  
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    throw new Error('Error al obtener los alumnos.');
  }
};
//funcion de obtener Docentes
export const obtenerdocentes = async () => {
  try {
    // Realizamos una solicitud GET a la ruta completa en el backend
    const response = await axios.get('http://localhost:5000/api/auth/obtenerdocentes');
    return response.data;  
  } catch (error) {
    console.error('Error al obtener los docentes:', error);
    throw new Error('Error al obtener los docentes.');
  }
};
//funcion de obtener Materias
export const obtenermaterias = async () => {
  try {
    // Realizamos una solicitud GET a la ruta completa en el backend
    const response = await axios.get('http://localhost:5000/api/auth/obtenermaterias');
    return response.data;  
  } catch (error) {
    console.error('Error al obtener los materias:', error);
    throw new Error('Error al obtener los materias.');
  }
};
//funcion de obtener horarios
export const obtenerhorarios = async () => {
  try {
    // Realizamos una solicitud GET a la ruta completa en el backend
    const response = await axios.get('http://localhost:5000/api/auth/obtenerhorarios');
    return response.data;  
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    throw new Error('Error al obtener los horarios.');
  }
};
//funcion de obtener grupos
export const obtenergrupos = async () => {
  try {
    // Realizamos una solicitud GET a la ruta completa en el backend
    const response = await axios.get('http://localhost:5000/api/auth/obtenergrupos');
    return response.data;  
  } catch (error) {
    console.error('Error al obtener los grupos:', error);
    throw new Error('Error al obtener los grupos.');
  }
};

//funcion de obtener kardex
export const obtenerkardex = async () => {
  try {
    // Realizamos una solicitud GET a la ruta completa en el backend
    const response = await axios.get('http://localhost:5000/api/auth/obtenerkardex');
    return response.data;  
  } catch (error) {
    console.error('Error al obtener los kardex:', error);
    throw new Error('Error al obtener los kardex.');
  }
};



/*
##################################################################################################
#                          api para realizacion de añadir                                         #
##################################################################################################
*/

// Función para registrar un nuevo Alumno
export const alta_alumno = async (no_control, nombre, apellido_p, apellido_m, fecha_nacimiento, telefono, correo, nss, grupo, semestre, carrera, direccion, prom_acumulado, sexo) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/registraralumno', {
      no_control,
      nombre, 
      apellido_p, 
      apellido_m, 
      fecha_nacimiento, 
      telefono, 
      correo,
      nss, 
      grupo, 
      semestre, 
      carrera, 
      direccion, 
      prom_acumulado, 
      sexo
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al hacer registro:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};
// Función para registrar un nuevo Maestro
export const alta_docente = async (id_profesor, Nombre, Apellido_P, Apellido_M, Fecha_Nac, RFC, Telefono, Correo, Direccion, NSS, Especialidad, Sexo) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/registrardocente', {
      id_profesor, 
      Nombre, 
      Apellido_P, 
      Apellido_M, 
      Fecha_Nac, 
      RFC, 
      Telefono, 
      Correo, 
      Direccion, 
      NSS, 
      Especialidad, 
      Sexo
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al hacer registro:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};
// Función para registrar una nueva Materia
export const alta_materia = async (id_materia,nombre,creditos,semestre,departamento) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/registrarmateria', {
      id_materia,
      nombre,
      creditos,
      semestre,
      departamento
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al hacer registro:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};
// Función para registrar un nuevo Grupo
export const alta_grupo = async (turno) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/registrargrupo', {
     turno
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al hacer registro:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};
//Funcion para registrar un Horario 
export const alta_horario = async (no_control,id_profesor,id_grupo,aula,hora,dia,id_materia) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/registrarhorario', {
      no_control,
      id_profesor,
      id_grupo,
      aula,
      hora,
      dia,
      id_materia
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al hacer registro:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};
//Funcion para registrar un kardex 
export const alta_kardex = async (no_control,id_materia,promedio) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/registrarkardex', {
      no_control,
      id_materia,
      promedio
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al hacer registro:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};
/*
##################################################################################################
#                          api para realizacion de eliminar                                      #
##################################################################################################
*/

// Función para eliminar un Kardex
export const eliminarKardex = async (idKardex) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/bajakardex`, {
      idKardex, // Envía el Id_Kardex en el cuerpo de la solicitud
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el Kardex:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};

// Función para eliminar un Horario
export const eliminarHorario = async (idhorario) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/bajahorario`, {
      idhorario, // Envía el Id_Kardex en el cuerpo de la solicitud
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el Kardex:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};
// Función para eliminar un Alumno
export const eliminarAlumno = async (idalumno) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/bajaalumno`, {
      idalumno, // Envía el Id_Kardex en el cuerpo de la solicitud
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el Alumno:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};
// Función para eliminar un Docente
export const eliminarDocente = async (iddocente) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/bajadocente`, {
      iddocente, // Envía el Id_Kardex en el cuerpo de la solicitud
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el Docente:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};
// Función para eliminar una Materia
export const eliminarMateria = async (idmateria) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/bajamateria`, {
      idmateria, // Envía el Id_Kardex en el cuerpo de la solicitud
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la Materia:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};


// Función para eliminar un Grupo
export const eliminarGrupo = async (idgrupo) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/auth/bajagrupo`, {
      idgrupo, // Envía el Id_Kardex en el cuerpo de la solicitud
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el Grupo:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};





/*
##################################################################################################
#                          api para realizacion de actualizar                                    #
##################################################################################################
*/

export const actualizarGrupo = async (idGrupo, turno) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/auth/modificargrupo`, {
      idGrupo, // Envía el Id_Grupo en el cuerpo de la solicitud
      turno,   // Envía el nuevo Turno en el cuerpo de la solicitud
    });

    // Devuelve la respuesta de la API, que puede incluir un mensaje de éxito
    return response.data;
  } catch (error) {
    console.error('Error al modificar el grupo:', error);
    // Lanza el error para ser manejado en el componente Vue
    throw error;
  }
};

// Función para actualizar los datos de un alumno
export const actualizarAlumno = async (
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
) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/auth/modificaralumno/${no_control}`, {
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
    });

    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error('Error al actualizar los datos del alumno:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};


// Función para actualizar los datos de un docente
export const actualizarDocente = async (
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
) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/auth/modificardocente/${id_profesor}`, {
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
    });

    return response.data; // Devuelve la respuesta de la API
  } catch (error) {
    console.error('Error al actualizar los datos del docente:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};