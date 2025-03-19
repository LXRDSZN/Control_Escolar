<script setup>
import { obtenermaterias, eliminarMateria } from '@/backend/services/api';  // Importamos la función de eliminar
import { ref, onMounted } from 'vue';
import AltaMaterias from './Alta-Materias/Alta-Materias.vue';
import ActualizarMaterias from './Actualizar-Materias/Actualizar-Materias.vue';
import { useToast } from 'vue-toast-notification'; // Importa useToast
import 'vue-toast-notification/dist/theme-sugar.css'; // Importa el tema de notificaciones

const Materias = ref([]);  // Almacenará las materias obtenidas de la API
const error = ref('');  // Para manejar posibles errores
const toast = useToast(); // Inicializa el toast
const materiaEditando = ref(null);  // Almacena la materia que se está editando
const mostrarFormulario = ref(false); // Para mostrar el formulario de agregar
const mostrarFormularioActualizar = ref(false); // Para mostrar el formulario de actualización

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

// Mostrar formulario de alta
const agregarMateria = () => {
  materiaEditando.value = null;
  mostrarFormulario.value = true;
  mostrarFormularioActualizar.value = false;
};

// Cancelar formularios
const cancelarFormulario = () => {
  mostrarFormulario.value = false;
  mostrarFormularioActualizar.value = false;
  materiaEditando.value = null;
};

// Eliminar materia por ID
const eliminarMateriaPorId = async (idMateria) => {
  if (!confirm('¿Estás seguro de que quieres eliminar esta materia?')) {
    return; // Si el usuario cancela, no hace nada
  }

  try {
    await eliminarMateria(idMateria);  // Llamada a la función de eliminar
    Materias.value = Materias.value.filter(materia => materia.Id_Materia !== idMateria); // Actualiza la lista

    // Mostrar notificación de éxito
    toast.success('Materia eliminada correctamente.', {
      position: 'top-right', // Posición de la notificación
      duration: 5000, // Duración en milisegundos
    });
  } catch (err) {
    console.error('Error al eliminar la materia:', err);

    // Mostrar notificación de error
    toast.error('No se pudo eliminar la materia. Intenta más tarde.', {
      position: 'top-right',
      duration: 5000,
    });
  }
};

// Modificar materia
const modificarMateria = (idMateria) => {
  const materia = Materias.value.find(materia => materia.Id_Materia === idMateria);
  if (materia) {
    materiaEditando.value = materia;
    mostrarFormularioActualizar.value = true;
    mostrarFormulario.value = false;
  }
};

// Guardar cambios después de actualizar
const guardarCambiosActualizados = async (materiaActualizada) => {
  if (!materiaActualizada) {
    console.error('No se pudo obtener la materia a actualizar');
    return;
  }
  try {
    // Enviar la solicitud de actualización aquí
  } catch (err) {
    console.error('Error al actualizar la materia:', err);
    toast.error('No se pudo actualizar la materia. Intenta más tarde.', {
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
        <h1>Lista de Materias</h1>
        <button 
          @click="agregarMateria" 
          class="btn btn-add" 
          v-if="!mostrarFormulario && !mostrarFormularioActualizar">
          Agregar Materia
        </button>
      </div>

      <!-- Formulario de alta -->
      <AltaMaterias 
        v-if="mostrarFormulario" 
        @materiaRegistrada="materia => Materias.push(materia)"
        @cancelar="cancelarFormulario"
      />

      <!-- Formulario de actualización -->
      <ActualizarMaterias
        v-if="mostrarFormularioActualizar"
        :materia="materiaEditando"
        @guardar="guardarCambiosActualizados"
        @cancelar="cancelarFormulario"
      />

      <!-- Tabla de materias -->
      <table class="materias-table" v-if="!mostrarFormulario && !mostrarFormularioActualizar">
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
          <tr v-for="materia in Materias" :key="materia.Id_Materia">
            <td>{{ materia.Id_Materia }}</td>
            <td>{{ materia.Nombre }}</td>
            <td>{{ materia.Creditos }}</td>
            <td>{{ materia.Semestre }}</td>
            <td>{{ materia.Departamento }}</td>
            <td class="actions">
              <button 
                @click="modificarMateria(materia.Id_Materia)" 
                class="btn btn-modify">
                Modificar
              </button>
              <button 
                @click="eliminarMateriaPorId(materia.Id_Materia)" 
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