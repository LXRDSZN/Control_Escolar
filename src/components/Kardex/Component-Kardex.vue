<script setup>
import { ref, onMounted } from 'vue';
import { obtenerkardex, eliminarKardex } from '@/backend/services/api';
import AltaKardex from './Alta-Kardex/Alta-Kardex.vue';
import ActualizarKardex from './Actualizar-Kardex/Actualizar-Kardex.vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const Kardex = ref([]); // Almacenará los Kardex obtenidos de la API
const error = ref(''); // Para manejar posibles errores
const toast = useToast(); // Inicializa el toast
const kardexEditando = ref(null); // Almacena el Kardex que se está editando
const mostrarFormulario = ref(false); // Para mostrar el formulario de alta
const mostrarFormularioActualizar = ref(false); // Para mostrar el formulario de actualización

// Obtener los Kardex cuando el componente se monta
onMounted(async () => {
  try {
    Kardex.value = await obtenerkardex();
    console.log('Kardex obtenidos:', Kardex.value);
  } catch (err) {
    error.value = 'No se pudieron cargar los Kardex. Intenta más tarde.';
    console.error('Error al obtener los Kardex:', err);
  }
});

// Función para cambiar el estado y mostrar el formulario de alta
const toggleFormulario = () => {
  mostrarFormulario.value = !mostrarFormulario.value;
  mostrarFormularioActualizar.value = false; // Asegura que el formulario de actualización esté oculto
};

// Función para mostrar el formulario de actualización de Kardex
const modificarKardex = (idKardex) => {
  const kardex = Kardex.value.find(kardex => kardex.Id_Kardex === idKardex);
  if (kardex) {
    kardexEditando.value = kardex; // Almacena el Kardex que se está editando
    mostrarFormularioActualizar.value = true; // Muestra el formulario de actualización
    mostrarFormulario.value = false; // Oculta el formulario de alta
  }
};

// Función para guardar los cambios actualizados
const guardarCambiosActualizados = (kardexActualizado) => {
  const index = Kardex.value.findIndex(kardex => kardex.Id_Kardex === kardexActualizado.Id_Kardex);
  if (index !== -1) {
    Kardex.value[index] = kardexActualizado; // Actualiza el Kardex en la lista
  }
  mostrarFormularioActualizar.value = false; // Oculta el formulario de actualización
};

// Función para eliminar un Kardex
const eliminarKardexPorId = async (idKardex) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este Kardex?')) {
    return; // Si el usuario cancela, no hace nada
  }

  try {
    await eliminarKardex(idKardex); // Llama a la función del backend
    Kardex.value = Kardex.value.filter(kardex => kardex.Id_Kardex !== idKardex); // Actualiza la lista

    // Mostrar notificación de éxito
    toast.success('Kardex eliminado correctamente.', {
      position: 'top-right',
      duration: 5000,
    });
  } catch (err) {
    console.error('Error al eliminar el Kardex:', err);

    // Mostrar notificación de error
    toast.error('No se pudo eliminar el Kardex. Intenta más tarde.', {
      position: 'top-right',
      duration: 5000,
    });
  }
};
</script>

<template>
  <div class="syste-panel">
    <div class="panel">
      <div class="header-container">
        <!-- Mostrar título y botón solo si el formulario no está visible -->
        <h1 v-if="!mostrarFormulario && !mostrarFormularioActualizar">Lista de Kardex</h1>
        <button
          v-if="!mostrarFormulario && !mostrarFormularioActualizar"
          @click="toggleFormulario"
          class="btn btn-add"
        >
          Agregar Kardex
        </button>
      </div>

      <!-- Formulario de alta -->
      <AltaKardex
        v-if="mostrarFormulario"
        @kardexRegistrado="kardex => Kardex.push(kardex)"
        @cancelar="toggleFormulario"
      />

      <!-- Formulario de actualización -->
      <ActualizarKardex
        v-if="mostrarFormularioActualizar"
        :kardex="kardexEditando"
        @guardar="guardarCambiosActualizados"
        @cancelar="mostrarFormularioActualizar = false"
      />

      <!-- Mostrar tabla de Kardex solo si los formularios no están visibles -->
      <table v-if="!mostrarFormulario && !mostrarFormularioActualizar" class="kardex-table">
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
