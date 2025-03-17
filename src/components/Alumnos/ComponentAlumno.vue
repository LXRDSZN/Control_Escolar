<script setup>
import { obteneralumnos } from '@/backend/services/api';  // Importamos la función de eliminar
import { ref, onMounted } from 'vue';
import AltaAlumnos from './Alta-Alumnos/Alta-Alumnos.vue';

const Alumnos = ref([]);  // Almacenará los usuarios obtenidos de la API
const error = ref('');  // Para manejar posibles errores

// Obtener los alumnos cuando el componente se monta
onMounted(async () => {
  try {
    Alumnos.value = await obteneralumnos();
    console.log('Alumnos obtenidos:', Alumnos.value);  // Para verificar los datos en la consola
  } catch (err) {
    error.value = 'No se pudieron cargar los Alumnos. Intenta más tarde.';
    console.error('Error al obtener los Alumnos:', err);
  }
});

// Estado reactivo para mostrar el formulario
const mostrarFormulario = ref(false);

// Función para cambiar el estado y mostrar el formulario
const toggleFormulario = () => {
  mostrarFormulario.value = !mostrarFormulario.value;
};
// Función para eliminar un alumno
const eliminarAlumnoPorId = async (noControl) => {
  try {
    const result = await eliminarAlumno(noControl);  // Llamada a la función de eliminar
    console.log(result);  // Mensaje de éxito
    // Eliminamos el alumno de la lista en la vista
    Alumnos.value = Alumnos.value.filter(alumno => alumno.No_Control !== noControl);
  } catch (err) {
    error.value = 'No se pudo eliminar el alumno. Intenta más tarde.';
    console.error('Error al eliminar el alumno:', err);
  }
};
</script>
<template>
  <div class="syste-panel">
    <div class="panel">
      <!-- Contenedor de encabezado y botón en Flexbox -->
      <div class="header-container">
        <h1>Lista de Alumnos</h1>
        <!-- Botón que cambia la visibilidad del formulario -->
        <button @click="toggleFormulario" class="btn btn-add">
          Agregar Alumno
        </button>
      </div>

      <!-- Mostrar el formulario de alta solo si 'mostrarFormulario' es verdadero -->
      <AltaAlumnos v-if="mostrarFormulario" @alumnoRegistrado="alumno => Alumnos.push(alumno)" />

      <!-- Tabla de alumnos -->
      <table class="alumnos-table" v-if="!mostrarFormulario">
        <thead>
          <tr>
            <th>No. Control</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Telefono</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos sobre los alumnos y mostramos cada uno en una fila -->
          <tr v-for="alumno in Alumnos" :key="alumno.No_Control">
            <td>{{ alumno.No_Control }}</td>
            <td>{{ alumno.Nombre }}</td>
            <td>{{ alumno.Apellido_P }}</td>
            <td>{{ alumno.Apellido_M }}</td>
            <td>{{ alumno.Telefono }}</td>
            <td>{{ alumno.Carrera }}</td>
            <td class="actions">
              <button @click="modificarAlumno(alumno.No_Control)" class="btn btn-modify">Modificar</button>
              <button @click="eliminarAlumnoPorId(alumno.No_Control)" class="btn btn-delete">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
/* Contenedor principal del panel, para que ocupe toda la pantalla */
.syste-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 250px);
  height: 100vh;
  overflow-y: auto; /* Permite el desplazamiento solo vertical */
  margin-left: 250px; 
  padding: 1rem;
}

/* Panel de contenido */
.panel {
  display: flex;
  color: #000000;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-height: 100%;
}


.alumnos-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .alumnos-table th, .alumnos-table td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }
  
.alumnos-table th {
    background-color: #041d38;
    color: #ffff;
}
  


/* Media query para pantallas pequeñas */
@media (max-width: 1200px) {
  .statistics {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
  }
}

@media (max-width: 768px) {
  .statistics {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  }
}

@media (max-width: 480px) {
  .statistics {
    grid-template-columns: 1fr; /* 1 columna */
  }
}


/* Columna de acciones: botones alineados */
.actions {
  display: flex;
  gap: 5px;
  justify-content: center;
}

/* Estilo de botones */
.btn {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
  width: 100px; /* Tamaño uniforme para todos */
  text-align: center;
}

.btn-add {
  background-color: #4caf50;
  color: white;
  width: 200px;
  
}

.btn-add:hover {
  background-color: #45a049;
}

.btn-modify {
  background-color: #2196f3;
  color: white;
}

.btn-modify:hover {
  background-color: #1976d2;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #d32f2f;
}
/* Contenedor de encabezado y botón */
.header-container {
  display: flex;
  justify-content: space-between;  /* Alinea el contenido a los extremos */
  align-items: center;  /* Alinea verticalmente */
}

</style>
