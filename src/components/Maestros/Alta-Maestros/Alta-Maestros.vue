<script setup>
import { ref } from 'vue'; // Variables reactivas
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario
const id_profesor = ref('');
const nombre = ref('');
const apellido_p = ref('');
const apellido_m = ref('');
const fecha_nac = ref('');
const rfc = ref('');
const telefono = ref('');
const correo = ref('');
const direccion = ref('');
const nss = ref('');
const especialidad = ref('');
const sexo = ref('');

// Inicializa el toast para notificaciones
const toast = useToast();

const registrarDocente = async () => {
  // Validaciones
  if (
    !id_profesor.value || !nombre.value || !apellido_p.value || !fecha_nac.value ||
    !rfc.value || !telefono.value || !correo.value || !direccion.value ||
    !nss.value || !especialidad.value || !sexo.value
  ) {
    toast.error('Por favor, completa todos los campos del formulario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }

  // Validar Teléfono (10 caracteres)
  if (telefono.value.length !== 10) {
    toast.error('El teléfono debe tener exactamente 10 caracteres.');
    return;
  }

  // Validar RFC (13 caracteres)
  if (rfc.value.length !== 13) {
    toast.error('El RFC debe tener exactamente 13 caracteres.');
    return;
  }

  // Validar NSS (11 caracteres)
  if (nss.value.length !== 11) {
    toast.error('El NSS debe tener exactamente 11 caracteres.');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/auth/registrardocente', {
      id_profesor: id_profesor.value,
      nombre: nombre.value,
      apellido_p: apellido_p.value,
      apellido_m: apellido_m.value || null, // El apellido materno es opcional
      fecha_nac: fecha_nac.value,
      rfc: rfc.value,
      telefono: telefono.value,
      correo: correo.value,
      direccion: direccion.value,
      nss: nss.value,
      especialidad: especialidad.value,
      sexo: sexo.value,
    });

    if (response.status === 201) {
      toast.success('Docente registrado exitosamente', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });
      limpiarFormulario();
      // Redirigir después de un pequeño retraso
      setTimeout(() => {
        window.location.href = `/Docentes`; // Redirigir a la página del panel
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
  id_profesor.value = '';
  nombre.value = '';
  apellido_p.value = '';
  apellido_m.value = '';
  fecha_nac.value = '';
  rfc.value = '';
  telefono.value = '';
  correo.value = '';
  direccion.value = '';
  nss.value = '';
  especialidad.value = '';
  sexo.value = '';
};
</script>

<template>
  <div class="alta-docente-container">
    <h1>Registrar Nuevo Docente</h1>
    <form @submit.prevent="registrarDocente">
      <div class="form-group">
        <label for="id_profesor">ID Profesor:</label>
        <input type="text" id="id_profesor" v-model="id_profesor" placeholder="ID Profesor" />
      </div>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" placeholder="Nombre" />
      </div>

      <div class="form-group">
        <label for="apellido_p">Apellido Paterno:</label>
        <input type="text" id="apellido_p" v-model="apellido_p" placeholder="Apellido Paterno" />
      </div>

      <div class="form-group">
        <label for="apellido_m">Apellido Materno:</label>
        <input type="text" id="apellido_m" v-model="apellido_m" placeholder="Apellido Materno" />
      </div>

      <div class="form-group">
        <label for="fecha_nac">Fecha de Nacimiento:</label>
        <input type="date" id="fecha_nac" v-model="fecha_nac" />
      </div>

      <div class="form-group">
        <label for="rfc">RFC:</label>
        <input type="text" id="rfc" v-model="rfc" placeholder="RFC" />
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" v-model="telefono" placeholder="Teléfono" />
      </div>

      <div class="form-group">
        <label for="correo">Correo:</label>
        <input type="email" id="correo" v-model="correo" placeholder="Correo" />
      </div>

      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" v-model="direccion" placeholder="Dirección" />
      </div>

      <div class="form-group">
        <label for="nss">NSS:</label>
        <input type="text" id="nss" v-model="nss" placeholder="NSS" />
      </div>

      <div class="form-group">
        <label for="especialidad">Especialidad:</label>
        <input type="text" id="especialidad" v-model="especialidad" placeholder="Especialidad" />
      </div>

      <div class="form-group">
        <label for="sexo">Sexo:</label>
        <select id="sexo" v-model="sexo">
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

      <button type="submit" class="btn-submit">Registrar Docente</button>
    </form>
  </div>
</template>

<style scoped>
.alta-docente-container {
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