<script setup>

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