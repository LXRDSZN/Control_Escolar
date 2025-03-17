<script setup>
import { obtenermaterias } from '@/backend/services/api';
import { ref, onMounted } from 'vue';
import AltaMaterias from './Alta-Materias/Alta-Materias.vue'; // Importa el componente de alta de materias

const Materias = ref([]);  // Almacenará las materias obtenidas de la API
const error = ref('');  // Para manejar posibles errores

// Obtener las materias cuando el componente se monta
onMounted(async () => {
  try {
    Materias.value = await obtenermaterias();
    console.log('Materias obtenidas:', Materias.value);  // Para verificar los datos en la consola
  } catch (err) {
    error.value = 'No se pudieron cargar las materias. Intenta más tarde.';
    console.error('Error al obtener las materias:', err);
  }
});

// Estado reactivo para mostrar el formulario
const mostrarFormulario = ref(false);

// Función para cambiar el estado y mostrar el formulario
const toggleFormulario = () => {
  mostrarFormulario.value = !mostrarFormulario.value;
};

// Función para eliminar una materia
const eliminarMateriaPorId = async (idMateria) => {
  try {
    const result = await eliminarMateria(idMateria);  // Llamada a la función de eliminar
    console.log(result);  // Mensaje de éxito
    // Eliminamos la materia de la lista en la vista
    Materias.value = Materias.value.filter(materia => materia.Id_Materia !== idMateria);
  } catch (err) {
    error.value = 'No se pudo eliminar la materia. Intenta más tarde.';
    console.error('Error al eliminar la materia:', err);
  }
};
</script>

<template>
  <div class="syste-panel">
    <div class="panel">
      <!-- Contenedor de encabezado y botón en Flexbox -->
      <div class="header-container">
        <h1>Lista de Materias</h1>
        <!-- Botón que cambia la visibilidad del formulario -->
        <button @click="toggleFormulario" class="btn btn-add">
          Agregar Materia
        </button>
      </div>

      <!-- Mostrar el formulario de alta solo si 'mostrarFormulario' es verdadero -->
      <AltaMaterias v-if="mostrarFormulario" @materiaRegistrada="materia => Materias.push(materia)" />

      <!-- Tabla de materias -->
      <table class="materias-table" v-if="!mostrarFormulario">
        <thead>
          <tr>
            <th>Id_Materia</th>
            <th>Nombre</th>
            <th>Créditos</th>
            <th>Semestre</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos sobre las materias y mostramos cada una en una fila -->
          <tr v-for="materia in Materias" :key="materia.Id_Materia">
            <td>{{ materia.Id_Materia }}</td>
            <td>{{ materia.Nombre }}</td>
            <td>{{ materia.Creditos }}</td>
            <td>{{ materia.Semestre }}</td>
            <td>{{ materia.Departamento }}</td>
            <td class="actions">
              <button @click="modificarMateria(materia.Id_Materia)" class="btn btn-modify">Modificar</button>
              <button @click="eliminarMateriaPorId(materia.Id_Materia)" class="btn btn-delete">Eliminar</button>
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

.materias-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.materias-table th, .materias-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.materias-table th {
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