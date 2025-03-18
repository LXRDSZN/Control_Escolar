<script setup>
import { obtenerdocentes, eliminarDocente } from '@/backend/services/api';
import { ref, onMounted } from 'vue';
import AltaMaestros from './Alta-Maestros/Alta-Maestros.vue';
import ActualizarMaestros from './Actualizar-Maestros/Actualizar-Maestros.vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const Docentes = ref([]);  // Almacenará los docentes obtenidos de la API
const error = ref('');  // Para manejar errores
const toast = useToast(); // Inicializa el toast
const docenteEditando = ref(null);  // Almacena el docente que se está editando
const mostrarFormulario = ref(false); // Para mostrar el formulario de agregar
const mostrarFormularioActualizar = ref(false); // Para mostrar el formulario de actualización

// Obtener docentes cuando el componente se monta
onMounted(async () => {
  try {
    Docentes.value = await obtenerdocentes();
    console.log('Docentes obtenidos:', Docentes.value);
  } catch (err) {
    error.value = 'No se pudieron cargar los docentes. Intenta más tarde.';
    console.error('Error al obtener los docentes:', err);
  }
});

// Mostrar formulario de alta
const agregarDocente = () => {
  docenteEditando.value = null;
  mostrarFormulario.value = true;
  mostrarFormularioActualizar.value = false;
};

// Cancelar formularios
const cancelarFormulario = () => {
  mostrarFormulario.value = false;
  mostrarFormularioActualizar.value = false;
  docenteEditando.value = null;
};

// Eliminar docente por ID
const eliminarDocentePorId = async (idProfesor) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este docente?')) {
    return;
  }

  try {
    await eliminarDocente(idProfesor);
    Docentes.value = Docentes.value.filter(docente => docente.id_profesor !== idProfesor);

    toast.success('Docente eliminado correctamente.', {
      position: 'top-right',
      duration: 5000,
    });
  } catch (err) {
    console.error('Error al eliminar el docente:', err);
    toast.error('No se pudo eliminar el docente. Intenta más tarde.', {
      position: 'top-right',
      duration: 5000,
    });
  }
};

// Modificar docente
const modificarDocente = (idProfesor) => {
  const docente = Docentes.value.find(docente => docente.id_profesor === idProfesor);
  if (docente) {
    docenteEditando.value = docente;
    mostrarFormularioActualizar.value = true;
    mostrarFormulario.value = false;
  }
};

// Guardar cambios después de actualizar
const guardarCambiosActualizados = async (docenteActualizado) => {
  if (!docenteActualizado) {
    console.error('No se pudo obtener el docente a actualizar');
    return;
  }
  try {
    // Enviar la solicitud de actualización aquí
  } catch (err) {
    console.error('Error al actualizar el docente:', err);
    toast.error('No se pudo actualizar el docente. Intenta más tarde.', {
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
        <h1>Lista de Docentes</h1>
        <button 
          @click="agregarDocente" 
          class="btn btn-add" 
          v-if="!mostrarFormulario && !mostrarFormularioActualizar">
          Agregar Docente
        </button>
      </div>

      <!-- Formulario de alta -->
      <AltaMaestros 
        v-if="mostrarFormulario" 
        @docenteRegistrado="docente => Docentes.push(docente)"
        @cancelar="cancelarFormulario"
      />

      <!-- Formulario de actualización -->
      <ActualizarMaestros
        v-if="mostrarFormularioActualizar"
        :docente="docenteEditando"
        @guardar="guardarCambiosActualizados"
        @cancelar="cancelarFormulario"
      />

      <!-- Tabla de docentes -->
      <table class="docentes-table" v-if="!mostrarFormulario && !mostrarFormularioActualizar">
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
          <tr v-for="docente in Docentes" :key="docente.id_profesor">
            <td>{{ docente.id_profesor }}</td>
            <td>{{ docente.Nombre }}</td>
            <td>{{ docente.Apellido_P }}</td>
            <td>{{ docente.Apellido_M }}</td>
            <td>{{ docente.Telefono }}</td>
            <td>{{ docente.Especialidad }}</td>
            <td class="actions">
              <button 
                @click="modificarDocente(docente.id_profesor)" 
                class="btn btn-modify">
                Modificar
              </button>
              <button 
                @click="eliminarDocentePorId(docente.id_profesor)" 
                class="btn btn-delete">
                Eliminar
              </button>
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