<script setup>
import { ref, onMounted } from 'vue';
import { obtenerkardex, eliminarKardex } from '@/backend/services/api';
import AltaKardex from './Alta-Kardex/Alta-Kardex.vue';

const Kardex = ref([]);  // Almacenará los usuarios obtenidos de la API
const error = ref('');  // Para manejar posibles errores

// Obtener los kardex cuando el componente se monta
onMounted(async () => {
  try {
    Kardex.value = await obtenerkardex();
    console.log('Kardex obtenidos:', Kardex.value);  // Para verificar los datos en la consola
  } catch (err) {
    error.value = 'No se pudieron cargar los Kardex. Intenta más tarde.';
    console.error('Error al obtener los Kardex:', err);
  }
});
// Estado reactivo para mostrar el formulario
const mostrarFormulario = ref(false);

// Función para cambiar el estado y mostrar el formulario
const toggleFormulario = () => {
  mostrarFormulario.value = !mostrarFormulario.value;
};

const eliminarKardexPorId = async (idKardex) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este Kardex?')) {
    return; // Si el usuario cancela, no hace nada
  }

  try {
    await eliminarKardex(idKardex); // Llama a la función del backend
    Kardex.value = Kardex.value.filter(kardex => kardex.Id_Kardex !== idKardex); // Actualiza la lista
    alert('Kardex eliminado correctamente');
  } catch (err) {
    console.error('Error al eliminar el Kardex:', err);
    alert('No se pudo eliminar el Kardex. Intenta más tarde.');
  }
};
</script>
<template>
  <div class="syste-panel">
    <div class="panel">
      <div class="header-container">
        <!-- Mostrar título y botón solo si el formulario no está visible -->
        <h1 v-if="!mostrarFormulario">Lista de Kardex</h1>
        <button
          v-if="!mostrarFormulario"
          @click="toggleFormulario"
          class="btn btn-add"
        >
          Agregar Kardex
        </button>
      </div>

      <!-- Mostrar formulario de alta solo si 'mostrarFormulario' es verdadero -->
      <AltaKardex
        v-if="mostrarFormulario"
        @kardexRegistrado="kardex => Kardex.push(kardex)"
        @cancelar="toggleFormulario"
      />

      <!-- Mostrar tabla de Kardex solo si 'mostrarFormulario' es falso -->
      <table v-if="!mostrarFormulario" class="kardex-table">
        <thead>
          <tr>
            <th>Id_Kardex</th>
            <th>No_Control</th>
            <th>Id_Materia</th>
            <th>Promedio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kardex in Kardex" :key="kardex.Id_Kardex">
            <td>{{ kardex.Id_Kardex }}</td>
            <td>{{ kardex.No_Control }}</td>
            <td>{{ kardex.Id_Materia }}</td>
            <td>{{ kardex.Promedio }}</td>
            <td class="actions">
              <button @click="modificarKardex(kardex.Id_Kardex)" class="btn btn-modify">Modificar</button>
              <button @click="eliminarKardexPorId(kardex.Id_Kardex)" class="btn btn-delete">Eliminar</button>
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


.kardex-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .kardex-table th, .kardex-table td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  }
  
  .kardex-table th {
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
