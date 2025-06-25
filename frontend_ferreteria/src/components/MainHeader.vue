<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/index'
const authStore = useAuthStore()
</script>

<template>
  <div>
    <header>
      <!-- header inner -->
      <div class="header">
        <div class="head_top">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div class="top-box">
                  <ul class="sociel_link">
                    <li>
                      <a href="#"><i class="fa fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-instagram"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div class="top-box">
                  <p>Soluciones fuertes para grandes proyectos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
            <div class="full">
              <div class="center-desk">
                <div class="logo">
                  <RouterLink to="/"><img src="@/assets/images/logo.jpg" alt="logo" /></RouterLink>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-7 col-lg-7 col-md-9 col-sm-9">
            <div class="navbar">
              <div class="limit-box">
                <nav class="nav-links">
                  <ul class="menu-area-main">
                    <li><RouterLink to="/">Inicio</RouterLink></li>
                    <li><RouterLink to="/about">Acerca de</RouterLink></li>

                    <template v-if="!authStore.token">
                      <li><RouterLink to="/login">Iniciar Sesión</RouterLink></li>
                    </template>

                    <template v-else>
                      <li class="dropdown">
                        <span class="dropdown-toggle">Gestión</span>
                        <div class="dropdown-menu">
                          <RouterLink to="/producto">Productos</RouterLink>
                          <RouterLink to="/proveedores">Proveedores</RouterLink>
                          <RouterLink to="/clientes">Clientes</RouterLink>
                          <RouterLink to="/categorias">Categorías</RouterLink>
                        </div>
                      </li>
                      <li class="dropdown">
                        <span class="dropdown-toggle">Ventas</span>
                        <div class="dropdown-menu">
                          <RouterLink to="/ventas">Nueva Venta</RouterLink>
                          <RouterLink to="/venta-detalle">Detalle de Venta</RouterLink>
                        </div>
                      </li>
                      <li>
                        <span class="bienvenido">Bienvenido {{ authStore.user }}</span>
                      </li>
                      <li><a href="#" @click.prevent="authStore.logout()">Cerrar Sesión</a></li>
                    </template>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end header inner -->
    </header>
    <!-- end header -->
  </div>
</template>

<style scoped></style>
