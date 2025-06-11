<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>

  <head>
    <!-- basic -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- mobile metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <!-- site metas -->
    <title>Ferrreteria Bicentenario</title>
    <meta name="description"
      content="Ferretería Bicentenario - Herramientas y materiales de calidad para tus proyectos de construcción.">
    <meta name="keywords" content="ferretería, herramientas, construcción, tornillos, materiales, bricolaje, Sucre">
    <meta name="author" content="Ferrreteria Bicentenario">
  </head>
  <header>
    <!-- header inner -->
    <div class="header">
      <div class="head_top">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div class="top-box">
                <ul class="sociel_link">
                  <RouterLink to="/" class="fa fa-facebook-f"></RouterLink>
                  <RouterLink to="/" class="fa fa-twitter"></RouterLink>
                  <RouterLink to="/" class="fa fa-instagram"></RouterLink>
                  <RouterLink to="/" class="fa fa-linkedin"></RouterLink>
                </ul>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div class="top-box">
                <p>Soluciones fuertes para grandes proyectos. </p>
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
                <div class="logo"> <a href="index.html"><img src="src/assets/images/logo.jpg" alt="logo" /></a> </div>
              </div>
            </div>
          </div>
          <div class="col-xl-7 col-lg-7 col-md-9 col-sm-9">
            <div class="menu-area">
              <div class="limit-box">
                <nav class="main-menu">
                  <ul class="menu-area-main">
                    <li class="active">
                    </li>
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/about">About</RouterLink>
                    <RouterLink to="/producto">Productos</RouterLink>
                    <RouterLink to="/clientes">Clientes</RouterLink>
                    <RouterLink to="/ventasdetalles">Venta Detalle</RouterLink>
                    <RouterLink to="/proveedores">Proveedores</RouterLink>
                    <RouterLink to="/categorias">Categorías</RouterLink>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <!--<div class="col-xl-2 col-lg-2 col-md-2 col-sm-2">
            <li><a class="buy" href="#">Iniciar Sesión</a></li>
          </div>-->
        </div>
      </div>
    </div>
    <!-- end header inner -->
  </header>
</template>

<style scoped></style>
