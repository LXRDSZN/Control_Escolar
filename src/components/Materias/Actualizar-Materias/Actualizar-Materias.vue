<script setup>
import { ref } from 'vue'; // Variables reactivas
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones
import { actualizarMateria } from '@/backend/services/api';
// Props: Recibe el alumno que se está editando
const props = defineProps({
  materia: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['guardar', 'cancelar']);

const idmateria = ref (props.materia.Id_Materia || '');
const nombre = ref (props.materia.Nombre || '');
const creditos = ref (props.materia.Creditos || '');
const semestre = ref (props.materia.Semestre || '');
const departamento = ref (props.materia.Departamento || '');


// Inicializa el toast para notificaciones
const toast = useToast();

// Función para modificar las Materias
const modificarMateria = async () => {
  // Validaciones
  if (!idmateria.value || !nombre.value || !creditos.value || !semestre.value || !departamento.value ) {
    toast.error('Por favor, completa todos los campos del formulario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }
  try {
    // Llamada a la API para modificar el alumno
    const response = await actualizarMateria(
        idmateria.value,
        nombre.value,
        creditos.value,
        semestre.value,
        departamento.value
    );

    // Verificar si la respuesta es exitosa
    if (response.success) {
      toast.success('Datos de la Materia actualizados correctamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
      setTimeout(() => {
        window.location.href = `/Materias`; // Redirigir a la página del panel
      }, 750);
      emit('guardar', response.data); // Emitir el evento 'guardar' al componente padre
    } else {
      toast.error(response.message || 'Hubo un error al actualizar los datos de la Materia.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  } catch (error) {
    toast.error('Ocurrió un error al procesar la solicitud.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    console.error('Error al modificar la Materia:', error);
  }
};

</script>

<template>
  <div class="alta-materia-container">
    <h1>Registrar Nueva Materia</h1>
    <form @submit.prevent="modificarMateria">
      <div class="form-group">
        <label for="id_materia">ID Materia:</label>
        <input type="text" id="id_materia" v-model="id_materia" placeholder="ID Materia" />
      </div>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" placeholder="Nombre" />
      </div>

      <div class="form-group">
        <label for="creditos">Créditos:</label>
        <input type="number" id="creditos" v-model="creditos" placeholder="Créditos" />
      </div>

      <div class="form-group">
        <label for="semestre">Semestre:</label>
        <input type="number" id="semestre" v-model="semestre" placeholder="Semestre" />
      </div>

      <div class="form-group">
        <label for="departamento">Departamento:</label>
        <input type="text" id="departamento" v-model="departamento" placeholder="Departamento" />
      </div>

      <button type="submit" class="btn-submit">Registrar Materia</button>
    </form>
  </div>
</template>

<style scoped>
.alta-materia-container {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 0.8rem;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>