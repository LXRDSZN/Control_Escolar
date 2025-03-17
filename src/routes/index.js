import { createRouter, createWebHistory } from 'vue-router'
import LoginViews from '@/views/Login/LoginViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginViews
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard/DashboardViews.vue') 
    },
    {
      path: '/Alumnos',
      name:'Alumnos',
      component : () =>import ('@/views/Alumnos/AlumnoView.vue')
    },
    {
      path: '/Docentes',
      name: 'Docentes',
      component : () => import ('@/views/Maestros/MestrosView.vue')
    },
    {
      path: '/Materias',
      name: 'Naterias',
      component : () => import ('@/views/Materias/MateriasView.vue')
    },
    {
      path: '/Horarios',
      name: 'Horarios',
      component : () => import ('@/views/Horarios/HorariosView.vue')
    },
    {
      path: '/Grupos',
      name: 'Grupos',
      component : () => import ('@/views/Grupos/GruposViews.vue')
    },
    {
      path: '/Kardex',
      name: 'Kardex',
      component : () => import ('@/views/Kardex/KardexView.vue')
    },
  ]
})

export default router
