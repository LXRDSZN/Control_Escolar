<script setup>
import { ref, onMounted } from 'vue';
import { obtenerhorarios, eliminarHorario } from '@/backend/services/api'; // Importa eliminarHorario
import AltaHorarios from './Alta-Horarios/Alta-Horarios.vue';

const Horario = ref([]);  // Almacenará los horarios obtenidos de la API
const error = ref('');  // Para manejar posibles errores

// Obtener los horarios cuando el componente se monta
onMounted(async () => {
  try {
    Horario.value = await obtenerhorarios();
    console.log('Horarios obtenidos:', Horario.value);
  } catch (err) {
    error.value = 'No se pudieron cargar los horarios. Intenta más tarde.';
    console.error('Error al obtener los horarios:', err);
  }
});

// Estado reactivo para mostrar el formulario
const mostrarFormulario = ref(false);

// Función para cambiar el estado y mostrar el formulario
const toggleFormulario = () => {
  mostrarFormulario.value = !mostrarFormulario.value;
};

// Función para eliminar un horario
const eliminarHorarioPorId = async (idHorario) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este horario?')) {
    return; // Si el usuario cancela, no hace nada
  }

  try {
    await eliminarHorario(idHorario); // Llama a la función del backend
    Horario.value = Horario.value.filter(horario => horario.Id_Horario !== idHorario); // Actualiza la lista
    alert('Horario eliminado correctamente');
  } catch (err) {
    console.error('Error al eliminar el horario:', err);
    alert('No se pudo eliminar el horario. Intenta más tarde.');
  }
};
</script>

<template>
  <div class="syste-panel">
    <div class="panel">
      <!-- Contenedor de encabezado y botón en Flexbox -->
      <div class="header-container">
        <!-- Título "Lista de Horarios" (oculto cuando el formulario está visible) -->
        <h1 v-if="!mostrarFormulario">Lista de Horarios</h1>
        <!-- Botón que cambia la visibilidad del formulario (oculto cuando el formulario está visible) -->
        <button
          v-if="!mostrarFormulario"
          @click="toggleFormulario"
          class="btn btn-add"
        >
          Agregar Horario
        </button>
      </div>

      <!-- Mostrar el formulario de alta solo si 'mostrarFormulario' es verdadero -->
      <AltaHorarios
        v-if="mostrarFormulario"
        @horarioRegistrado="horario => Horario.push(horario)"
        @cancelar="toggleFormulario"
      />

      <!-- Tabla de horarios (oculta cuando el formulario está visible) -->
      <table class="horarios-table" v-if="!mostrarFormulario">
        <thead>
          <tr>
            <th>Id_Horario</th>
            <th>No_Control</th>
            <th>Id_Profesor</th>
            <th>Id_Grupo</th>
            <th>Aula</th>
            <th>Hora</th>
            <th>Dia</th>
            <th>Id_Materia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos sobre los horarios y mostramos cada uno en una fila -->
          <tr v-for="horario in Horario" :key="horario.Id_Horario">
            <td>{{ horario.Id_Horario }}</td>
            <td>{{ horario.No_Control }}</td>
            <td>{{ horario.Id_Profesor }}</td>
            <td>{{ horario.Id_Grupo }}</td>
            <td>{{ horario.Aula }}</td>
            <td>{{ horario.Hora }}</td>
            <td>{{ horario.Dia }}</td>
            <td>{{ horario.Id_Materia }}</td>
            <td class="actions">
              <button @click="modificarHorario(horario.Id_Horario)" class="btn btn-modify">Modificar</button>
              <button @click="eliminarHorarioPorId(horario.Id_Horario)" class="btn btn-delete">Eliminar</button>            </td>
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

.horarios-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.horarios-table th, .horarios-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.horarios-table th {
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