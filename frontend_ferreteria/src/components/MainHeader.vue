<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { useAuthStore } from "@/stores/index";
const authStore = useAuthStore();
const route = useRoute()
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
            <div class="menu-area">
              <div class="limit-box">
                <nav class="main-menu">
                  <ul class="menu-area-main">
                    <li>
                      <RouterLink to="/">Inicio</RouterLink>
                    </li>
                    <li v-if="!authStore.token">
                      <RouterLink to="/login">Iniciar Sesión</RouterLink>
                    </li>
                    <template v-else>
                      <li>
                        <RouterLink to="/about">Acerca de</RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/producto">Productos</RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/clientes">Clientes</RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/proveedores">Proveedores</RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/categorias">Categorias</RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/ventas">Ventas</RouterLink>
                      </li>
                      <li><a @click.prevent="authStore.logout()" class="text-danger" href="#">Salir</a></li>
                    </template>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2">
            <RouterLink to="/login" class="buy">Iniciar Sesión</RouterLink>
          </div>
        </div>
      </div>
      <!-- end header inner -->
    </header>
    <!-- end header -->
    <section class="slider_section" v-if="route.path === '/'">
      <div id="main_slider" class="carousel slide banner-main" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <RouterLink to="/"><img src="@/assets/images/banner2.jpg" alt="banner" /></RouterLink>
            <div class="container">
              <div class="carousel-caption relative">
                <h1>
                  Nuestro <br />
                  <strong class="black_bold">Último </strong><br />
                  <strong class="yellow_bold">Producto </strong>
                </h1>
                <p>
                  Herramientas de calidad<br />
                  todos los productos al alcance del consumidor
                </p>
                <a href="#">Ver más Productos</a>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <RouterLink to="/"><img class="second-slide" src="@/assets/images/banner2.jpg" alt="Second slide" />
            </RouterLink>
            <div class="container">
              <div class="carousel-caption relative">
                <h1>
                  Nuestro <br />
                  <strong class="black_bold">Último </strong><br />
                  <strong class="yellow_bold">Producto </strong>
                </h1>
                <p>
                  Herramientas de calidad<br />
                  todo los productos al alcance del consumidor
                </p>
                <a href="#">Ver más Productos</a>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <RouterLink to="/"><img src="@/assets/images/banner2.jpg" alt="banner" /></RouterLink>
            <div class="container">
              <div class="carousel-caption relative">
                <h1>
                  Nuestro <br />
                  <strong class="black_bold">Último </strong><br />
                  <strong class="yellow_bold">Producto </strong>
                </h1>
                <p>
                  Herramientas de calidad<br />
                  todo los productos al alcance del consumidor
                </p>
                <a href="#">Ver más Productos</a>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#main_slider" role="button" data-slide="prev">
          <i class="fa fa-angle-right"></i>
        </a>
        <a class="carousel-control-next" href="#main_slider" role="button" data-slide="next">
          <i class="fa fa-angle-left"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
