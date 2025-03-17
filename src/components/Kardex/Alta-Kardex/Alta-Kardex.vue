<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { useToast } from 'vue-toast-notification'; 
import 'vue-toast-notification/dist/theme-sugar.css'; 
import {
  obteneralumnos,
  obtenermaterias,
  alta_kardex, // Asegúrate de tener esta función para registrar el Kardex
} from '@/backend/services/api'; 

// Router y Toast
const router = useRouter();
const toast = useToast();

// Datos obtenidos de las APIs
const alumnos = ref([]);
const materias = ref([]);

// Datos seleccionados
const alumnoSeleccionado = ref(null);
const materiaSeleccionada = ref(null);
const promedio = ref('');

// Obtener datos al montar el componente
onMounted(async () => {
  try {
    const [alumnosRes, materiasRes] = await Promise.all([
      obteneralumnos(),
      obtenermaterias(),
    ]);
    alumnos.value = alumnosRes;
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

const seleccionarMateria = (materia) => {
  materiaSeleccionada.value = materia;
};

// Función para registrar el Kardex
const registrarNuevoKardex = async () => {
  // Validar que todos los campos estén completos
  if (
    !alumnoSeleccionado.value ||
    !materiaSeleccionada.value ||
    !promedio.value
  ) {
    toast.error('Todos los campos son obligatorios.', {
      position: 'top-right',
      duration: 5000,
    });
    return;
  }

  try {
    // Preparar los datos para enviar
    const datosKardex = {
      no_control: alumnoSeleccionado.value.No_Control,
      id_materia: materiaSeleccionada.value.Id_Materia,
      promedio: parseFloat(promedio.value),
    };

    // Llamar a la API para registrar el Kardex
    const response = await alta_kardex(
      datosKardex.no_control,
      datosKardex.id_materia,
      datosKardex.promedio
    );

    // Mostrar notificación de éxito
    toast.success('Kardex registrado exitosamente.', {
      position: 'top-right',
      duration: 5000,
    });

    // Redirigir después de un pequeño retraso
    setTimeout(() => {
        window.location.href = `/Kardex`; // Redirigir a la página del panel
      }, 750);
  } catch (error) {
    console.error('Error al registrar el Kardex:', error);
    toast.error('Hubo un problema al registrar el Kardex. Intenta nuevamente.', {
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
      <h1>Registrar Nuevo Kardex</h1>

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
      <div v-if="alumnoSeleccionado || materiaSeleccionada" class="seleccionados">
        <h3>Datos Seleccionados</h3>
        <p v-if="alumnoSeleccionado"><strong>Alumno:</strong> {{ alumnoSeleccionado.Nombre }} {{ alumnoSeleccionado.Apellido_P }} ({{ alumnoSeleccionado.No_Control }})</p>
        <p v-if="materiaSeleccionada"><strong>Materia:</strong> {{ materiaSeleccionada.Nombre }} ({{ materiaSeleccionada.Id_Materia }})</p>
      </div>

      <!-- Formulario para capturar Promedio -->
      <div class="formulario-kardex">
        <h3>Promedio</h3>
        <div class="form-group">
          <label for="promedio">Promedio:</label>
          <input type="number" id="promedio" v-model="promedio" placeholder="Promedio" step="0.01" min="0" max="10" />
        </div>
      </div>

      <!-- Botón para registrar el Kardex -->
      <div class="boton-agregar-container">
        <button @click="registrarNuevoKardex" class="btn btn-add">
          Registrar Kardex
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
  text-align: center; 
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
.formulario-kardex {
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

.form-group input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
