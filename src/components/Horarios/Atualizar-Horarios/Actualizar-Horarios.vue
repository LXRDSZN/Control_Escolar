<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification'; // Para notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones
import { actualizarHorario } from '@/backend/services/api';
import {
  obteneralumnos,
  obtenerdocentes,
  obtenergrupos,
  obtenermaterias,
} from '@/backend/services/api'; // Importa tus APIs
// Router y Toast
const toast = useToast();

// Props: Recibe el alumno que se está editando
const props = defineProps({
  horario: {
    type: Object,
    required: true,
  },
});

// Emits: Para comunicarse con el componente padre
const emit = defineEmits(['guardar', 'cancelar']);

// Datos obtenidos de las APIs
const alumnos = ref([]);
const profesores = ref([]);
const grupos = ref([]);
const materias = ref([]);

// Datos seleccionados
const alumnoSeleccionado = ref(props.horario.No_Control || '');
const profesorSeleccionado = ref(props.horario.id_profesor || '');
const grupoSeleccionado = ref(props.horario.Id_Grupo || '');
const materiaSeleccionada = ref(props.horario.Id_Materia || '');
const aula = ref(props.horario.Aula || '');
const hora = ref(props.horario.Hora || '');
const dia = ref(props.horario.Dia || '');
const id_horario = ref(props.horario.Id_Horario || ''); 
// Obtener datos al montar el componente
onMounted(async () => {
  try {
    const [alumnosRes, profesoresRes, gruposRes, materiasRes] = await Promise.all([
      obteneralumnos(),
      obtenerdocentes(),
      obtenergrupos(),
      obtenermaterias(),
    ]);
    alumnos.value = alumnosRes;
    profesores.value = profesoresRes;
    grupos.value = gruposRes;
    materias.value = materiasRes;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    toast.error('No se pudieron cargar los datos. Intenta más tarde.', {
      position: 'top-right',
      duration: 5000,
    });
  }
});

// Funciones para seleccionar registros
const seleccionarAlumno = (alumno) => {
  alumnoSeleccionado.value = alumno;
};

const seleccionarProfesor = (profesor) => {
  profesorSeleccionado.value = profesor;
};

const seleccionarGrupo = (grupo) => {
  grupoSeleccionado.value = grupo;
};

const seleccionarMateria = (materia) => {
  materiaSeleccionada.value = materia;
};

const modificarHorario = async () => {
  // Validar que todos los campos estén completos
  if (
    !alumnoSeleccionado.value ||
    !profesorSeleccionado.value ||
    !grupoSeleccionado.value ||
    !materiaSeleccionada.value ||
    !aula.value ||
    !hora.value ||
    !dia.value
  ) {
    toast.error('Todos los campos son obligatorios.', {
      position: 'top-right',
      duration: 5000,
    });
    return;
  }

  try {
    // Preparar los datos para enviar
    const datosHorario = {
      id_horario: id_horario.value, 
      no_control: alumnoSeleccionado.value.No_Control, 
      id_profesor: profesorSeleccionado.value.id_profesor, 
      id_grupo: grupoSeleccionado.value.Id_Grupo, 
      aula: aula.value,
      hora: hora.value,
      dia: dia.value,
      id_materia: materiaSeleccionada.value.Id_Materia, 
    };

    // Llamar a la API para actualizar el horario
    const response = await actualizarHorario(
      datosHorario.id_horario,
      datosHorario.no_control,
      datosHorario.id_profesor,
      datosHorario.id_grupo,
      datosHorario.aula,
      datosHorario.hora,
      datosHorario.dia,
      datosHorario.id_materia
    );

    // Mostrar notificación de éxito
    toast.success('Horario actualizado correctamente.', {
      position: 'top-right',
      duration: 5000,
    });

    // Redirigir después de un pequeño retraso
    setTimeout(() => {
      window.location.href = `/Horarios`; // Redirigir a la página de horarios
    }, 750);
  } catch (error) {
    console.error('Error al modificar el horario:', error);
    toast.error('Hubo un problema al actualizar el horario. Intenta nuevamente.', {
      position: 'top-right',
      duration: 5000,
    });
  }
};
</script>
<template>
  <div class="syste-panel">
    <div class="panel">
      <!-- Título -->
      <h1>Registrar Nuevo Horario</h1>

      <!-- Tabla de Alumnos -->
      <h2>Alumnos</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>No. Control</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alumno in alumnos" :key="alumno.No_Control">
            <td>{{ alumno.No_Control }}</td>
            <td>{{ alumno.Nombre }}</td>
            <td>{{ alumno.Apellido_P }}</td>
            <td>{{ alumno.Apellido_M }}</td>
            <td><button @click="seleccionarAlumno(alumno)">Seleccionar</button></td>
          </tr>
        </tbody>
      </table>

      <!-- Tabla de Profesores -->
      <h2>Profesores</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID Profesor</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="profesor in profesores" :key="profesor.id_profesor">
            <td>{{ profesor.id_profesor }}</td>
            <td>{{ profesor.Nombre }}</td>
            <td>{{ profesor.Apellido_P }}</td>
            <td>{{ profesor.Apellido_M }}</td>
            <td><button @click="seleccionarProfesor(profesor)">Seleccionar</button></td>
          </tr>
        </tbody>
      </table>

      <!-- Tabla de Grupos -->
      <h2>Grupos</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID Grupo</th>
            <th>Turno</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grupo in grupos" :key="grupo.Id_Grupo">
            <td>{{ grupo.Id_Grupo }}</td>
            <td>{{ grupo.Turno }}</td>
            <td><button @click="seleccionarGrupo(grupo)">Seleccionar</button></td>
          </tr>
        </tbody>
      </table>

      <!-- Tabla de Materias -->
      <h2>Materias</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID Materia</th>
            <th>Nombre</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="materia in materias" :key="materia.Id_Materia">
            <td>{{ materia.Id_Materia }}</td>
            <td>{{ materia.Nombre }}</td>
            <td><button @click="seleccionarMateria(materia)">Seleccionar</button></td>
          </tr>
        </tbody>
      </table>

      <!-- Mostrar datos seleccionados -->
      <div v-if="alumnoSeleccionado || profesorSeleccionado || grupoSeleccionado || materiaSeleccionada" class="seleccionados">
        <h3>Datos Seleccionados</h3>
        <p v-if="alumnoSeleccionado"><strong>Alumno:</strong> {{ alumnoSeleccionado.Nombre }} {{ alumnoSeleccionado.Apellido_P }} ({{ alumnoSeleccionado.No_Control }})</p>
        <p v-if="profesorSeleccionado"><strong>Profesor:</strong> {{ profesorSeleccionado.Nombre }} {{ profesorSeleccionado.Apellido_P }} ({{ profesorSeleccionado.id_profesor }})</p>
        <p v-if="grupoSeleccionado"><strong>Grupo:</strong> {{ grupoSeleccionado.Turno }} ({{ grupoSeleccionado.Id_Grupo }})</p>
        <p v-if="materiaSeleccionada"><strong>Materia:</strong> {{ materiaSeleccionada.Nombre }} ({{ materiaSeleccionada.Id_Materia }})</p>
      </div>

      <!-- Formulario para capturar Aula, Hora y Día -->
      <div class="formulario-horario">
        <h3>Detalles del Horario</h3>
        <div class="form-group">
          <label for="id_horario">ID Horario:</label>
          <input type="text" id="id_horario" v-model="id_horario" placeholder="ID Horario" />
        </div>
        <div class="form-group">
          <label for="aula">Aula:</label>
          <input type="text" id="aula" v-model="aula" placeholder="Aula" />
        </div>
        <div class="form-group">
          <label for="hora">Hora:</label>
          <input type="time" id="hora" v-model="hora" placeholder="Hora" />
        </div>
        <div class="form-group">
          <label for="dia">Día:</label>
          <select id="dia" v-model="dia">
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
          </select>
        </div>
      </div>

      <!-- Botón para registrar el horario -->
      <div class="boton-agregar-container">
        <button @click="modificarHorario" class="btn btn-add">
          {{ id_horario ? 'Modificar Horario' : 'Registrar Horario' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.syste-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto;
  margin-left: 250px;
  padding: 1rem;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th, .data-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.data-table th {
  background-color: #041d38;
  color: #ffff;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

.seleccionados {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.boton-agregar-container {
  margin-top: 20px;
  text-align: center; /* Centrar el botón */
}

.btn-add {
  background-color: #4caf50;
  color: white;
  width: 200px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #45a049;
}

/* Estilos del formulario */
.formulario-horario {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>