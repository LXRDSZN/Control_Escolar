<script setup>
import { ref } from 'vue'; // Variables reactivas
import axios from 'axios'; // Solicitudes HTTP
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones

// Variables reactivas para los campos del formulario
const no_control = ref('');
const nombre = ref('');
const apellido_p = ref('');
const apellido_m = ref('');
const fecha_nacimiento = ref('');
const telefono = ref('');
const correo = ref('');
const nss = ref('');
const grupo = ref('');
const semestre = ref('');
const carrera = ref('');
const direccion = ref('');
const prom_acumulado = ref('');
const sexo = ref('');

// Inicializa el toast para notificaciones
const toast = useToast();

const registrarAlumno = async () => {
  // Validaciones
  if (
    !no_control.value || !nombre.value || !apellido_p.value || !apellido_m.value ||
    !fecha_nacimiento.value || !telefono.value || !correo.value || !nss.value ||
    !grupo.value || !semestre.value || !carrera.value || !direccion.value ||
    !prom_acumulado.value || !sexo.value
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

  // Validar NSS (11 caracteres)
  if (nss.value.length !== 11) {
    toast.error('El NSS debe tener exactamente 11 caracteres.');
    return;
  }

  // Validar Promedio Acumulado (debe ser un número entre 0 y 100)
  if (isNaN(prom_acumulado.value) || prom_acumulado.value < 0 || prom_acumulado.value > 100) {
    toast.error('El promedio acumulado debe ser un número entre 0 y 100.');
    return;
  }

  // Validar Grupo y Semestre (deben ser números)
  if (isNaN(grupo.value) || isNaN(semestre.value)) {
    toast.error('El grupo y semestre deben ser números válidos.');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/auth/registraralumno', {
      no_control: no_control.value,
      nombre: nombre.value,
      apellido_p: apellido_p.value,
      apellido_m: apellido_m.value || null, // El apellido materno es opcional
      fecha_nacimiento: fecha_nacimiento.value,
      telefono: telefono.value,
      correo: correo.value,
      nss: nss.value,
      grupo: parseInt(grupo.value),
      semestre: parseInt(semestre.value),
      carrera: carrera.value,
      direccion: direccion.value,
      prom_acumulado: parseFloat(prom_acumulado.value),
      sexo: sexo.value,
    });

    if (response.status === 201) {
      toast.success('Alumno registrado exitosamente', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
      });
      limpiarFormulario();  
       // Redirigir después de un pequeño retraso
       setTimeout(() => {
        window.location.href = `/Alumnos`; // Redirigir a la página del panel
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
  no_control.value = '';
  nombre.value = '';
  apellido_p.value = '';
  apellido_m.value = '';
  fecha_nacimiento.value = '';
  telefono.value = '';
  correo.value = '';
  nss.value = '';
  grupo.value = '';
  semestre.value = '';
  carrera.value = '';
  direccion.value = '';
  prom_acumulado.value = '';
  sexo.value = '';
};
</script>
<template>
  <div class="alta-alumno-container">
    <h1>Registrar Nuevo Alumno</h1>
    <form @submit.prevent="registrarAlumno">
      <div class="form-group">
        <label for="no_control">No. Control:</label>
        <input type="text" id="no_control" v-model="no_control" placeholder="No. Control" />
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
        <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fecha_nacimiento" v-model="fecha_nacimiento" />
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
        <label for="nss">NSS:</label>
        <input type="text" id="nss" v-model="nss" placeholder="NSS" />
      </div>

      <div class="form-group">
        <label for="grupo">Grupo:</label>
        <input type="text" id="grupo" v-model="grupo" placeholder="Grupo" />
      </div>

      <div class="form-group">
        <label for="semestre">Semestre:</label>
        <input type="text" id="semestre" v-model="semestre" placeholder="Semestre" />
      </div>

      <div class="form-group">
        <label for="carrera">Carrera:</label>
        <input type="text" id="carrera" v-model="carrera" placeholder="Carrera" />
      </div>

      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" v-model="direccion" placeholder="Dirección" />
      </div>

      <div class="form-group">
        <label for="prom_acumulado">Prom. Acumulado:</label>
        <input type="number" id="prom_acumulado" v-model="prom_acumulado" placeholder="Promedio Acumulado" />
      </div>

      <div class="form-group">
        <label for="sexo">Sexo:</label>
        <select id="sexo" v-model="sexo">
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

      <button type="submit" class="btn-submit">Registrar Alumno</button>
    </form>
  </div>
</template>


<style scoped>
.alta-alumno-container {
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
