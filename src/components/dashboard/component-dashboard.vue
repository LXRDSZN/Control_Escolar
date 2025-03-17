<script setup>
import StatisticBox from './complements/StatisticBox.vue';




</script>

<template>
  <div class="syste-panel">
    <div class="panel">
      <!-- Sección de Estadísticas -->
      <div class="statistics">
        <StatisticBox
          icon="users"
          label="Usuario"
          count=""
          color="#4CAF50"
          hoverColor="#388E3C" 
        />
        <StatisticBox
          icon="tags"
          label="Categorías"
          count=""
          color="#FF5722"
          hoverColor="#E64A19"
        />
        <StatisticBox
          icon="box"
          label="Productos en Inventario"
          count=""
          color="#03A9F4"
          hoverColor="#0288D1"
        />
        <StatisticBox
          icon="shopping-bag"
          label="Ventas Mensuales"
          count=""
          color="#FFC107"
          hoverColor="#FFA000"
        />
      </div>
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

/* Estilo para las estadísticas */
.statistics {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 200px;
}

.statistics > * {
  min-width: 150px;
  min-height: 100px;
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
