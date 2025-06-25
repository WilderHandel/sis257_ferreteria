<script setup lang="ts"></script>

<template>
  <section class="slider_section">
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
            <RouterLink to="/"
              ><img class="second-slide" src="@/assets/images/banner2.jpg" alt="Second slide" />
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
  <div class="whyschose">
    <div class="container">
      <div class="row">
        <div class="col-md-7 offset-md-3">
          <div class="title">
            <h2>¿Por qué <strong class="black">elegirnos?</strong></h2>
            <span>¡Las herramientas de mejor calidad con los mejores precios!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="choose_bg">
    <div class="container">
      <div class="white_bg">
        <div class="row">
          <dir class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="for_box">
              <i><img src="@/assets/icon/1.png" /></i>
              <h3>Mejores Precios</h3>
              <p>La ferreteria cuanta con todos los direntes precios del mercado</p>
            </div>
          </dir>
          <dir class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="for_box">
              <i><img src="@/assets/icon/2.png" /></i>
              <h3>Diversidad de herramientas</h3>
              <p>La ferreteria cuenta con todas las marcas y modelos del mercado</p>
            </div>
          </dir>
          <dir class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="for_box">
              <i><img src="@/assets/icon/3.png" /></i>
              <h3>Envio a nivel nacional</h3>
              <p>
                La ferreteria cuenta con envio a todos los departamentos de Bolivia y muy pronto
                envios internacionales
              </p>
            </div>
          </dir>
          <dir class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="for_box">
              <i><img src="@/assets/icon/4.png" /></i>
              <h3>Alta calidad</h3>
              <p>Todos los productos son de la mas alta calidad</p>
            </div>
          </dir>
          <div class="col-md-12">
            <a class="read-more">Leer más</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end CHOOSE -->

  <!-- service -->
  <div class="service">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="title">
            <h2>¿Por qué <strong class="black">elegirnos?</strong></h2>
            <span>Tu compra rápida y efectiva</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div class="service-box">
            <i><img src="@/assets/icon/service1.png" /></i>
            <h3>Servicio Rápido</h3>
            <p>Todos los envios se realizan a la mayor brevedad posible</p>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div class="service-box">
            <i><img src="@/assets/icon/service2.png" /></i>
            <h3>Pago seguro</h3>
            <p>Todos los pagos son seguros y aprueba de errores</p>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div class="service-box">
            <i><img src="@/assets/icon/service3.png" /></i>
            <h3>Equipo de expertos</h3>
            <p>Personal ampliamente calificado</p>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div class="service-box">
            <i><img src="@/assets/icon/service4.png" /></i>
            <h3>Herramientas asequibles</h3>
            <p>Todos los precios de las deferentes marcas al alcence de todos</p>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div class="service-box">
            <i><img src="@/assets/icon/service5.png" /></i>
            <h3>6 meses de garantía</h3>
            <p>Por que apoyamos a Nuestros clientes</p>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div class="service-box">
            <i><img src="@/assets/icon/service6.png" /></i>
            <h3>Metas</h3>
            <p>No somos los primeros, pero seremos los mejores</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end service -->

  <!-- our product -->
  <div class="product">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="title">
            <h2>Nuestros <strong class="black">Productos</strong></h2>
            <span
              >Empaquetamos los productos con los mejores servicios para convertirlo en un cliente
              feliz.</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="product-bg">
    <div class="product-bg-white">
      <div class="container">
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="product-box">
              <i><img src="@/assets/icon/p1.png" /></i>
              <h3>Norton Internet Security</h3>
              <span>$25.00</span>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="product-box">
              <i><img src="@/assets/icon/p2.png" /></i>
              <h3>Norton Internet Security</h3>
              <span>$25.00</span>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="product-box">
              <i><img src="@/assets/icon/p3.png" /></i>
              <h3>Norton Internet Security</h3>
              <span>$25.00</span>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="product-box">
              <i><img src="@/assets/icon/p4.png" /></i>
              <h3>Norton Internet Security</h3>
              <span>$25.00</span>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="product-box">
              <i><img src="@/assets/icon/p5.png" /></i>
              <h3>Norton Internet Security</h3>
              <span>$25.00</span>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="product-box">
              <i><img src="@/assets/icon/p2.png" /></i>
              <h3>Norton Internet Security</h3>
              <span>$25.00</span>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="product-box">
              <i><img src="@/assets/icon/p6.png" /></i>
              <h3>Norton Internet Security</h3>
              <span>$25.00</span>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div class="product-box">
              <i><img src="@/assets/icon/p7.png" /></i>
              <h3>Norton Internet Security</h3>
              <span>$25.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Clients_bg_white">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="title">
              <h3>¿Qué opinan los clientes?</h3>
            </div>
          </div>
        </div>
        <div id="client_slider" class="carousel slide banner_Client" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#client_slider" data-slide-to="0" class="active"></li>
            <li data-target="#client_slider" data-slide-to="1"></li>
            <li data-target="#client_slider" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="container">
                <div class="carousel-caption text-bg">
                  <div class="img_bg">
                    <i
                      ><img src="@/assets/images/lllll.png" /><span
                        >Jone Due<br /><strong class="date">12/02/2019</strong></span
                      ></i
                    >
                  </div>

                  <p>
                    "¡Excelente servicio! Todo lo que necesitaba para mi proyecto de construcción lo
                    encontré aquí. La atención fue rápida y muy profesional, y los productos de
                    excelente calidad. ¡Sin duda volveré!"
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <div class="carousel-caption text-bg">
                  <div class="img_bg">
                    <i
                      ><img src="@/assets/images/lllll.png" /><span
                        >Camilo Natfan<br /><strong class="date">12/09/2019</strong></span
                      ></i
                    >
                  </div>
                  <p>
                    "Muy satisfecho con la compra de herramientas para mi taller. Tienen de todo y
                    el personal me ayudó a encontrar lo que buscaba rápidamente. El precio es justo
                    y la calidad insuperable. ¡Altamente recomendados!"
                  </p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="container">
                <div class="carousel-caption text-bg">
                  <div class="img_bg">
                    <i
                      ><img src="@/assets/images/lllll.png" /><span
                        >Maria del Rosario<br /><strong class="date">15/08/2019</strong></span
                      ></i
                    >
                  </div>
                  <p>
                    "Fue mi primera vez comprando en esta ferretería y quedé encantado. La variedad
                    de productos es impresionante, y la atención al cliente fue de lo mejor. ¡Me
                    sentí como en casa! Definitivamente volveré para mis futuras compras."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="yellow_bg">
        <div class="row">
          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12">
            <div class="yellow-box">
              <h3>
                SOLICITAR COTIZACIÓN<i><img src="@/assets/icon/calll.png" /></i>
              </h3>

              <p>Todos los empleados se encuentran capacitados para brindar el mejor servicio</p>
            </div>
          </div>
          <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12">
            <div class="yellow-box">
              <a href="#">Obtener Cotización</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- end our product -->
  <!-- map -->
  <div class="container-fluid padi">
    <div class="map">
      <img src="@/assets/images/mapimg.jpg" alt="img" />
    </div>
  </div>
</template>
