<script setup>
import { ref, watch } from 'vue'; // Variables reactivas
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Props: Recibe el grupo que se está editando
const props = defineProps({
  grupo: {
    type: Object,
    required: true,
  },
});

// Emits: Para comunicarse con el componente padre
const emit = defineEmits(['guardar', 'cancelar']);

// Variables reactivas para los campos del formulario
const turno = ref(props.grupo.Turno || '');
const idGrupo = ref(props.grupo.Id_Grupo || null);

// Inicializa el toast para notificaciones
const toast = useToast();

// Función para modificar el grupo
const modificarGrupo = async () => {
  // Validaciones
  if (!turno.value) {
    toast.error('Por favor, completa todos los campos del formulario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  // Validar Turno (máximo 20 caracteres)
  if (turno.value.length > 20) {
    toast.error('El turno no puede tener más de 20 caracteres.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  // Emitir el evento 'guardar' con los datos actualizados
  emit('guardar', {
    Id_Grupo: idGrupo.value,
    Turno: turno.value,
  });
};

// Función para cancelar la edición
const cancelar = () => {
  emit('cancelar');
};
</script>
<template>
  <div class="alta-grupo-container">
    <h1>Modificar Grupo</h1>
    <form @submit.prevent="modificarGrupo">
      <div class="form-group">
        <label for="turno">Turno:</label>
        <input type="text" id="turno" v-model="turno" placeholder="Turno" />
      </div>

      <div class="button-container">
        <button type="submit" class="btn-submit">Modificar Grupo</button>
        <button type="button" @click="cancelar" class="btn-cancel">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.alta-grupo-container {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ffffff;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #2196f3;
  outline: none;
}

.button-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem; /* Espacio entre los botones */
  margin-top: 1.5rem;
}

.btn-submit,
.btn-cancel {
  flex: 1; /* Ambos botones ocupan el mismo espacio */
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-submit {
  background-color: #2196f3;
  color: white;
}

.btn-submit:hover {
  background-color: #1976d2;
  transform: translateY(-2px);
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.btn-cancel:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
}
</style>