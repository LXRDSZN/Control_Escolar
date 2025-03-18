<script setup>
import { ref } from 'vue'; // Variables reactivas
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones
import { actualizarAlumno } from '@/backend/services/api';
// Props: Recibe el alumno que se está editando
const props = defineProps({
  alumno: {
    type: Object,
    required: true,
  },
});

// Emits: Para comunicarse con el componente padre
const emit = defineEmits(['guardar', 'cancelar']);

// Variables reactivas para los campos del formulario
const noControl = ref(props.alumno.No_Control || '');
const nombre = ref(props.alumno.Nombre || '');
const apellidoP = ref(props.alumno.Apellido_P || '');
const apellidoM = ref(props.alumno.Apellido_M || '');
const fechaNacimiento = ref(props.alumno.Fecha_Nacimiento || '');
const telefono = ref(props.alumno.Telefono || '');
const correo = ref(props.alumno.Correo || '');
const nss = ref(props.alumno.Nss || '');
const grupo = ref(props.alumno.Grupo || '');
const semestre = ref(props.alumno.Semestre || '');
const carrera = ref(props.alumno.Carrera || '');
const direccion = ref(props.alumno.Direccion || '');
const promAcumulado = ref(props.alumno.Prom_Acumulado || '');
const sexo = ref(props.alumno.Sexo || '');

// Inicializa el toast para notificaciones
const toast = useToast();

// Función para modificar el alumno
const modificarAlumno = async () => {
  // Validaciones
  if (!noControl.value || !nombre.value || !apellidoP.value || !apellidoM.value || !fechaNacimiento.value || !telefono.value || !correo.value || !nss.value || !grupo.value || !semestre.value || !carrera.value || !direccion.value || !promAcumulado.value || !sexo.value) {
    toast.error('Por favor, completa todos los campos del formulario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }
  try {
    // Llamada a la API para modificar el alumno
    const response = await actualizarAlumno(
      noControl.value,
      nombre.value,
      apellidoP.value,
      apellidoM.value,
      fechaNacimiento.value,
      telefono.value,
      correo.value,
      nss.value,
      grupo.value,
      semestre.value,
      carrera.value,
      direccion.value,
      promAcumulado.value,
      sexo.value
    );

    // Verificar si la respuesta es exitosa
    if (response.success) {
      toast.success('Datos del alumno actualizados correctamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
      setTimeout(() => {
        window.location.href = `/Alumnos`; // Redirigir a la página del panel
      }, 750);
      emit('guardar', response.data); // Emitir el evento 'guardar' al componente padre
    } else {
      toast.error(response.message || 'Hubo un error al actualizar los datos del alumno.', {
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
    console.error('Error al modificar el alumno:', error);
  }
};

// Función para cancelar la edición
const cancelar = () => {
  emit('cancelar');
};
</script>


<template>
  <div class="alta-alumno-container">
    <h1>Registrar Nuevo Alumno</h1>
    <form @submit.prevent="modificarAlumno">
      <div class="form-group">
        <label for="no_control">No. Control:</label>
        <input type="text" id="no_control" v-model="noControl" placeholder="No. Control" />
      </div>

      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" placeholder="Nombre" />
      </div>

      <div class="form-group">
        <label for="apellido_p">Apellido Paterno:</label>
        <input type="text" id="apellido_p" v-model="apellidoP" placeholder="Apellido Paterno" />
      </div>

      <div class="form-group">
        <label for="apellido_m">Apellido Materno:</label>
        <input type="text" id="apellido_m" v-model="apellidoM" placeholder="Apellido Materno" />
      </div>

      <div class="form-group">
        <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fecha_nacimiento" v-model="fechaNacimiento" />
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
        <input type="number" id="prom_acumulado" v-model="promAcumulado" placeholder="Promedio Acumulado" />
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
