<script setup>
import { ref } from 'vue'; // Variables reactivas
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario
const turno = ref('');

// Inicializa el toast para notificaciones
const toast = useToast();

const registrarGrupo = async () => {
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

  try {
    const response = await axios.post('http://localhost:5000/api/auth/registrargrupo', {
      turno: turno.value,
    });

    if (response.status === 201) {
      toast.success('Grupo registrado exitosamente', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });
      limpiarFormulario();
      // Redirigir después de un pequeño retraso
      setTimeout(() => {
        window.location.href = `/Grupos`; // Redirigir a la página del panel
      }, 750);
    }
  } catch (error) {
    console.error('Error al registrar:', error);
    if (error.response?.status === 400) {
      toast.error(error.response.data.message || 'Error en los datos enviados', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    } else {
      toast.error('Hubo un problema con el servidor. Intenta nuevamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
    }
  }
};

// Función para limpiar el formulario después de registrar
const limpiarFormulario = () => {
  turno.value = '';
};
</script>

<template>
  <div class="alta-grupo-container">
    <h1>Registrar Nuevo Grupo</h1>
    <form @submit.prevent="registrarGrupo">
      <div class="form-group">
        <label for="turno">Turno:</label>
        <input type="text" id="turno" v-model="turno" placeholder="Turno" />
      </div>

      <button type="submit" class="btn-submit">Registrar Grupo</button>
    </form>
  </div>
</template>

<style scoped>
.alta-grupo-container {
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