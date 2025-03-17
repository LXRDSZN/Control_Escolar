<script setup>
import { ref } from 'vue'; // Variables reactivas
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario
const id_materia = ref('');
const nombre = ref('');
const creditos = ref('');
const semestre = ref('');
const departamento = ref('');

// Inicializa el toast para notificaciones
const toast = useToast();

const registrarMateria = async () => {
  // Validaciones
  if (
    !id_materia.value || !nombre.value || !creditos.value || !semestre.value || !departamento.value
  ) {
    toast.error('Por favor, completa todos los campos del formulario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  // Validar ID Materia (máximo 10 caracteres)
  if (id_materia.value.length > 10) {
    toast.error('El ID de la materia no puede tener más de 10 caracteres.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  // Validar Créditos (debe ser un número positivo)
// Validar Semestre (debe ser un número positivo)
if (isNaN(semestre.value)) { // Aquí estaba el error: faltaba cerrar el paréntesis correctamente
  toast.error('El semestre debe ser un número válido.', {
    position: 'top-right',
    duration: 5000,
    dismissible: true,
  });
  return;
}

  // Validar Semestre (debe ser un número positivo)
  if (isNaN(semestre.value)) {
    toast.error('El semestre debe ser un número válido.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/auth/registrarmateria', {
      id_materia: id_materia.value,
      nombre: nombre.value,
      creditos: parseInt(creditos.value),
      semestre: parseInt(semestre.value),
      departamento: departamento.value,
    });

    if (response.status === 201) {
      toast.success('Materia registrada exitosamente', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });
      limpiarFormulario();
      // Redirigir después de un pequeño retraso
      setTimeout(() => {
        window.location.href = `/Materias`; // Redirigir a la página del panel
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
  id_materia.value = '';
  nombre.value = '';
  creditos.value = '';
  semestre.value = '';
  departamento.value = '';
};
</script>

<template>
  <div class="alta-materia-container">
    <h1>Registrar Nueva Materia</h1>
    <form @submit.prevent="registrarMateria">
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