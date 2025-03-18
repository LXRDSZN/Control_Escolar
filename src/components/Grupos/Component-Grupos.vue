<script setup>
import { obtenergrupos, eliminarGrupo, actualizarGrupo } from '@/backend/services/api';  // Importamos las funciones necesarias
import { ref, onMounted } from 'vue';
import AltaGrupos from './Alta-Grupos/Alta-Grupos.vue';
import ActualizarGrupos from './Actualizar-Grupos/Actualizar-Grupos.vue';
import { useToast } from 'vue-toast-notification'; // Importa useToast
import 'vue-toast-notification/dist/theme-sugar.css'; // Importa el tema de notificaciones

const Grupo = ref([]);  // Almacenará los grupos obtenidos de la API
const error = ref('');  // Para manejar posibles errores
const toast = useToast(); // Inicializa el toast
const grupoEditando = ref(null);  // Almacenará el grupo que se está editando
const mostrarFormulario = ref(false); // Estado reactivo para mostrar el formulario de agregar
const mostrarFormularioActualizar = ref(false); // Estado reactivo para mostrar el formulario de actualización

// Obtener los grupos cuando el componente se monta
onMounted(async () => {
  try {
    Grupo.value = await obtenergrupos();
    console.log('Grupos obtenidos:', Grupo.value);  // Para verificar los datos en la consola
  } catch (err) {
    error.value = 'No se pudieron cargar los grupos. Intenta más tarde.';
    console.error('Error al obtener los grupos:', err);
  }
});

// Función para mostrar el formulario de agregar
const agregarGrupo = () => {
  grupoEditando.value = null; // Limpia el grupo seleccionado
  mostrarFormulario.value = true; // Muestra el formulario
  mostrarFormularioActualizar.value = false; // Oculta el formulario de actualización
};

// Función para cancelar el formulario
const cancelarFormulario = () => {
  mostrarFormulario.value = false;
  mostrarFormularioActualizar.value = false;
  grupoEditando.value = null;
};

// Función para eliminar un grupo
const eliminarGrupoPorId = async (idGrupo) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este grupo?')) {
    return; // Si el usuario cancela, no hace nada
  }

  try {
    await eliminarGrupo(idGrupo);  // Llamada a la función de eliminar
    Grupo.value = Grupo.value.filter(grupo => grupo.Id_Grupo !== idGrupo); // Actualiza la lista

    // Mostrar notificación de éxito
    toast.success('Grupo eliminado correctamente.', {
      position: 'top-right', // Posición de la notificación
      duration: 5000, // Duración en milisegundos
    });
  } catch (err) {
    console.error('Error al eliminar el grupo:', err);

    // Mostrar notificación de error
    toast.error('No se pudo eliminar el grupo. Intenta más tarde.', {
      position: 'top-right',
      duration: 5000,
    });
  }
};

// Función para modificar un grupo
const modificarGrupo = (idGrupo) => {
  const grupo = Grupo.value.find(grupo => grupo.Id_Grupo === idGrupo);
  if (grupo) {
    grupoEditando.value = grupo; // Establece el grupo que se está editando
    mostrarFormularioActualizar.value = true; // Muestra el formulario de actualización
    mostrarFormulario.value = false; // Oculta el formulario de agregar
  }
};

// Función para guardar los cambios después de actualizar
const guardarCambiosActualizados = async (grupoActualizado) => {
  try {
    await actualizarGrupo(grupoActualizado.Id_Grupo, grupoActualizado.Turno); // Llama a la API para actualizar
    Grupo.value = Grupo.value.map(grupo => 
      grupo.Id_Grupo === grupoActualizado.Id_Grupo ? grupoActualizado : grupo
    ); // Actualiza la lista local

    // Mostrar notificación de éxito
    toast.success('Grupo actualizado correctamente.', {
      position: 'top-right',
      duration: 5000,
    });

    cancelarFormulario(); // Cierra el formulario
  } catch (err) {
    console.error('Error al actualizar el grupo:', err);

    // Mostrar notificación de error
    toast.error('No se pudo actualizar el grupo. Intenta más tarde.', {
      position: 'top-right',
      duration: 5000,
    });
  }
};
</script>

<template>
  <div class="syste-panel">
    <div class="panel">
      <!-- Contenedor de encabezado y botón en Flexbox -->
      <div class="header-container">
        <h1>Lista de Grupos</h1>
        <!-- Botón que cambia la visibilidad del formulario -->
        <button @click="agregarGrupo" class="btn btn-add" v-if="!mostrarFormulario && !mostrarFormularioActualizar">
          Agregar Grupo
        </button>
      </div>

      <!-- Mostrar el formulario de alta solo si 'mostrarFormulario' es verdadero -->
      <AltaGrupos
        v-if="mostrarFormulario"
        :grupo="grupoEditando"
        @guardar="guardarCambios"
        @cancelar="cancelarFormulario"
      />

      <!-- Mostrar el formulario de actualización si 'mostrarFormularioActualizar' es verdadero -->
      <ActualizarGrupos
        v-if="mostrarFormularioActualizar"
        :grupo="grupoEditando"
        @guardar="guardarCambiosActualizados"
        @cancelar="cancelarFormulario"
      />

      <!-- Tabla de grupos -->
      <table class="grupos-table" v-if="!mostrarFormulario && !mostrarFormularioActualizar">
        <thead>
          <tr>
            <th>Id_Grupo</th>
            <th>Turno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos sobre los grupos y mostramos cada uno en una fila -->
          <tr v-for="grupo in Grupo" :key="grupo.Id_Grupo">
            <td>{{ grupo.Id_Grupo }}</td>
            <td>{{ grupo.Turno }}</td>
            <td class="actions">
              <button @click="modificarGrupo(grupo.Id_Grupo)" class="btn btn-modify">Modificar</button>
              <button @click="eliminarGrupoPorId(grupo.Id_Grupo)" class="btn btn-delete">Eliminar</button>
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

.grupos-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.grupos-table th, .grupos-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

.grupos-table th {
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