<script setup>
import { ref } from 'vue'; // Variables reactivas
import { useToast } from 'vue-toast-notification'; // Notificaciones
import 'vue-toast-notification/dist/theme-sugar.css'; // Estilo de notificaciones
import { actualizarDocente } from '@/backend/services/api';
// Props: Recibe el alumno que se está editando
const props = defineProps({
  docente: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['guardar', 'cancelar']);

const idProfesor = ref (props.docente.id_profesor || '');
const nombre = ref (props.docente.Nombre || '');
const apellidoP = ref (props.docente.Apellido_P || '');
const apellidoM = ref (props.docente.Apellido_M || '');
const fechaNac = ref (props.docente.Fecha_Nac || '');
const rfc = ref (props.docente.RFC || '');
const telefono = ref (props.docente.Telefono || '');
const correo = ref (props.docente.Correo || '');
const direccion = ref (props.docente.Direccion || '');
const nss = ref (props.docente.NSS || '');
const especialidad = ref (props.docente.Especialidad || '');
const sexo = ref (props.docente.Sexo || '');

// Inicializa el toast para notificaciones
const toast = useToast();

// Función para modificar el alumno
const modificarDocente = async () => {
  // Validaciones
  if (!idProfesor.value || !nombre.value || !apellidoP.value || !apellidoM.value || !fechaNac.value || !rfc.value || 
  !telefono.value || !correo.value || !direccion.value || !nss.value || !especialidad.value || !sexo.value ) {
    toast.error('Por favor, completa todos los campos del formulario.', {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
    });
    return;
  }
  try {
    // Llamada a la API para modificar el alumno
    const response = await actualizarDocente(
        idProfesor.value,
        nombre.value,
        apellidoP.value,
        apellidoM.value,
        fechaNac.value,
        rfc.value,
        telefono.value,
        correo.value,
        direccion.value,
        nss.value,
        especialidad.value,
        sexo.value
    );

    // Verificar si la respuesta es exitosa
    if (response.success) {
      toast.success('Datos del Docente actualizados correctamente.', {
        position: 'top-right',
        duration: 5000,
        dismissible: true,
      });
      setTimeout(() => {
        window.location.href = `/Docentes`; // Redirigir a la página del panel
      }, 750);
      emit('guardar', response.data); // Emitir el evento 'guardar' al componente padre
    } else {
      toast.error(response.message || 'Hubo un error al actualizar los datos del docente.', {
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
    console.error('Error al modificar el Docente:', error);
  }
};

</script>

<template>
  <div class="alta-docente-container">
    <h1>Actualizar Docente</h1>
    <form @submit.prevent="modificarDocente">
      <div class="form-group">
        <label for="id_profesor">ID Profesor:</label>
        <input type="text" id="id_profesor" v-model="idProfesor" placeholder="ID Profesor" />
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
        <label for="fecha_nac">Fecha de Nacimiento:</label>
        <input type="date" id="fecha_nac" v-model="fechaNac" />
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

      <button type="submit" class="btn-submit">Actualizar Docente</button>
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