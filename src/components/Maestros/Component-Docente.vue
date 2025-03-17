<script setup>
import { obtenerdocentes } from '@/backend/services/api';
import { ref, onMounted } from 'vue';
import AltaMaestros from './Alta-Maestros/Alta-Maestros.vue';

const Docentes = ref([]);  // Almacenará los docentes obtenidos de la API
const error = ref('');  // Para manejar posibles errores

// Obtener los docentes cuando el componente se monta
onMounted(async () => {
  try {
    Docentes.value = await obtenerdocentes();
    console.log('Docentes obtenidos:', Docentes.value);  // Para verificar los datos en la consola
  } catch (err) {
    error.value = 'No se pudieron cargar los Docentes. Intenta más tarde.';
    console.error('Error al obtener los Docentes:', err);
  }
});

// Estado reactivo para mostrar el formulario
const mostrarFormulario = ref(false);

// Función para cambiar el estado y mostrar el formulario
const toggleFormulario = () => {
  mostrarFormulario.value = !mostrarFormulario.value;
};

// Función para eliminar un docente
const eliminarDocentePorId = async (idProfesor) => {
  try {
    const result = await eliminarDocente(idProfesor);  // Llamada a la función de eliminar
    console.log(result);  // Mensaje de éxito
    // Eliminamos el docente de la lista en la vista
    Docentes.value = Docentes.value.filter(docente => docente.id_profesor !== idProfesor);
  } catch (err) {
    error.value = 'No se pudo eliminar el docente. Intenta más tarde.';
    console.error('Error al eliminar el docente:', err);
  }
};
</script>

<template>
  <div class="syste-panel">
    <div class="panel">
      <!-- Contenedor de encabezado y botón en Flexbox -->
      <div class="header-container">
        <h1>Lista de Docentes</h1>
        <!-- Botón que cambia la visibilidad del formulario -->
        <button @click="toggleFormulario" class="btn btn-add">
          Agregar Docente
        </button>
      </div>

      <!-- Mostrar el formulario de alta solo si 'mostrarFormulario' es verdadero -->
      <AltaMaestros v-if="mostrarFormulario" @docenteRegistrado="docente => Docentes.push(docente)" />

      <!-- Tabla de docentes -->
      <table class="docentes-table" v-if="!mostrarFormulario">
        <thead>
          <tr>
            <th>ID Profesor</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Teléfono</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos sobre los docentes y mostramos cada uno en una fila -->
          <tr v-for="docente in Docentes" :key="docente.id_profesor">
            <td>{{ docente.id_profesor }}</td>
            <td>{{ docente.Nombre }}</td>
            <td>{{ docente.Apellido_P }}</td>
            <td>{{ docente.Apellido_M }}</td>
            <td>{{ docente.Telefono }}</td>
            <td>{{ docente.Especialidad }}</td>
            <td class="actions">
              <button @click="modificarDocente(docente.id_profesor)" class="btn btn-modify">Modificar</button>
              <button @click="eliminarDocentePorId(docente.id_profesor)" class="btn btn-delete">Eliminar</button>
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

.docentes-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.docentes-table th, .docentes-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.docentes-table th {
  background-color: #041d38;
  color: #ffff;
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
</style>