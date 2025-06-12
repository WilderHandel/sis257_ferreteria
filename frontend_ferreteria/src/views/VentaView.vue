<script setup lang="ts">
import ProductoList from '@/components/producto/ProductoList.vue'
import ClienteList from '@/components/cliente/ClienteList.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import { ref, computed } from 'vue'
import axios from 'axios'
const token = localStorage.getItem('token')

const ci = ref('')
const nombreCliente = ref('')
const nombreClienteReadonly = ref(true)
const mostrarDialogCliente = ref(false)
const productoListRef = ref<typeof ProductoList | null>(null)
const clienteListRef = ref<typeof ClienteList | null>(null)
const productoSeleccionado = ref<any>(null)
const cantidad = ref(1)
const detalleVenta = ref<Array<{ producto: any; cantidad: number }>>([])
const dineroRecibido = ref(0)

// Buscar cliente por CI al hacer click en el botón
async function buscarClientePorCI() {
  if (!ci.value) {
    nombreCliente.value = ''
    nombreClienteReadonly.value = false
    alert('Ingrese un CI para buscar.')
    return
  }
  // Asegúrate de que la lista esté cargada antes de buscar
  await clienteListRef.value?.obtenerLista()
  const cliente = clienteListRef.value?.buscarPorCi(ci.value)
  if (cliente) {
    nombreCliente.value = cliente.nombre
    nombreClienteReadonly.value = true
  } else {
    nombreCliente.value = ''
    nombreClienteReadonly.value = false
    alert('Cliente no encontrado.')
  }
}

// Cuando se selecciona un cliente desde ClienteList (si mantienes el diálogo)
function handleClienteSeleccionado(cliente: any) {
  ci.value = cliente.ciNit
  nombreCliente.value = cliente.nombre
  nombreClienteReadonly.value = true
  mostrarDialogCliente.value = false
}

// Recibe el producto seleccionado desde ProductoList
function handleSelect(producto: any) {
  productoSeleccionado.value = producto
}

// Agrega el producto seleccionado al detalle de la venta
function agregarProducto() {
  if (productoSeleccionado.value && cantidad.value > 0) {
    if (cantidad.value > productoSeleccionado.value.saldo) {
      alert('La cantidad solicitada excede la cantidad disponible.')
      return
    }
    const existente = detalleVenta.value.find(
      (d) => d.producto.id === productoSeleccionado.value.id,
    )
    if (existente) {
      if (existente.cantidad + cantidad.value > productoSeleccionado.value.saldo) {
        alert('La cantidad total en el detalle excede la cantidad disponible.')
        return
      }
      existente.cantidad += cantidad.value
    } else {
      detalleVenta.value.push({
        producto: productoSeleccionado.value,
        cantidad: cantidad.value,
      })
    }
    productoSeleccionado.value = null
    cantidad.value = 1
  }
}

// Quitar producto del detalle de venta
function quitarProducto(index: number) {
  detalleVenta.value.splice(index, 1)
}

// Calcula el total de la venta
const total = computed(() =>
  detalleVenta.value.reduce((sum, d) => sum + d.producto.precioVenta * d.cantidad, 0),
)

// Calcula el cambio
const cambio = computed(() =>
  dineroRecibido.value > total.value ? dineroRecibido.value - total.value : 0,
)

// Finaliza la venta (simulado)
function finalizarVenta() {
  if (!ci.value || !nombreCliente.value || detalleVenta.value.length === 0) {
    alert('Completa todos los campos y agrega al menos un producto.')
    return
  }
  if (dineroRecibido.value < total.value) {
    alert('El dinero recibido no es suficiente para pagar el total.')
    return
  }
  alert('Venta realizada con éxito')
  ci.value = ''
  nombreCliente.value = ''
  detalleVenta.value = []
  dineroRecibido.value = 0
}
async function guardarVenta() {
  if (!ci.value || !nombreCliente.value || detalleVenta.value.length === 0) {
    alert('Completa todos los campos y agrega al menos un producto.')
    return
  }
  if (dineroRecibido.value < total.value) {
    alert('El dinero recibido no es suficiente para pagar el total.')
    return
  }

  // Busca el cliente para obtener el idCliente
  await clienteListRef.value?.obtenerLista()
  const cliente = clienteListRef.value?.buscarPorCi(ci.value)
  if (!cliente) {
    alert('Cliente no encontrado.')
    return
  }

  // Aquí debes obtener el idUsuario (puedes ajustarlo según tu lógica de autenticación)
  const idUsuario = 3 // <-- Ajusta esto según tu sistema de usuarios

  try {
    console.log('Datos enviados:', {
  idCliente: cliente.id,
  idUsuario: idUsuario,
  fecha: new Date().toISOString().substring(0, 10),
  transaccion: 1,
  cantidad: detalleVenta.value.reduce((sum, d) => sum + d.cantidad, 0),
  detalle: detalleVenta.value.map((d) => ({
    idProducto: d.producto.id,
    cantidad: d.cantidad,
    precioVenta: d.producto.precioVenta,
  })),
})
    await axios.post(
      'http://localhost:3000/api/v1/ventas',
      {
        idCliente: cliente.id,
        idUsuario: idUsuario,
        fecha: new Date().toISOString().substring(0, 10),
        transaccion: 1,
        cantidad: detalleVenta.value.reduce((sum, d) => sum + d.cantidad, 0),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    alert('Venta guardada con éxito')
    // Limpia los campos
    ci.value = ''
    nombreCliente.value = ''
    detalleVenta.value = []
    dineroRecibido.value = 0
  } catch (error) {
    alert('Error al guardar la venta')
  }
}
</script>

<template>
  <div class="m-7">
    <h2>Registrar Venta</h2>
    <div class="mb-3 flex align-items-center">
      <label>CI:</label>
      <InputText v-model="ci" class="ml-2" />
      <Button label="Buscar Cliente" icon="pi pi-search" class="ml-2" @click="buscarClientePorCI" />
    </div>
    <div class="mb-3">
      <label>Nombre Cliente:</label>
      <InputText v-model="nombreCliente" class="ml-2" :readonly="nombreClienteReadonly" />
    </div>

    <Dialog
      v-model:visible="mostrarDialogCliente"
      header="Buscar Cliente"
      :style="{ width: '60vw' }"
    >
      <ClienteList @edit="handleClienteSeleccionado" />
    </Dialog>

    <div style="display: none">
      <ProductoList ref="productoListRef" @select="handleSelect" />
    </div>
    <div style="display: none">
      <ClienteList ref="clienteListRef" />
    </div>
    <div class="mb-3 flex align-items-center">
      <Dropdown
        v-model="productoSeleccionado"
        :options="productoListRef?.productos || []"
        optionLabel="descripcion"
        placeholder="Selecciona un producto"
        class="mr-2"
      />
      <InputNumber v-model="cantidad" :min="1" class="mr-2" />
      <Button label="Agregar" icon="pi pi-plus" @click="agregarProducto" />
      <div v-if="productoSeleccionado" class="ml-2">
        <strong>Disponible:</strong> {{ productoSeleccionado.saldo }}
      </div>
    </div>
    <h3>Detalle de Venta</h3>
    <table class="p-datatable-table">
      <thead>
        <tr>
          <th>Código de Producto</th>
          <th>Descripción</th>
          <th>Unidad</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Subtotal</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in detalleVenta" :key="item.producto.codigo">
          <td>{{ item.producto.codigo }}</td>
          <td>{{ item.producto.descripcion }}</td>
          <td>{{ item.producto.unidadMedida }}</td>
          <td>{{ item.cantidad }}</td>
          <td>{{ item.producto.precioVenta }}</td>
          <td>{{ item.producto.precioVenta * item.cantidad }}</td>
          <td>
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="quitarProducto(idx)"
              rounded
              text
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-3">
      <strong>Total: {{ total }}</strong>
    </div>
    <div class="mb-3 mt-3">
      <label>Dinero recibido:</label>
      <InputNumber v-model="dineroRecibido" :min="0" class="ml-2" />
    </div>
    <div>
      <strong>Cambio: {{ cambio }}</strong>
    </div>
    <Button label="Finalizar Venta" class="mt-3" @click="guardarVenta" />
  </div>
</template>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}
.mt-3 {
  margin-top: 1rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.flex {
  display: flex;
}
.align-items-center {
  align-items: center;
}
.p-datatable-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.p-datatable-table th,
.p-datatable-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
}
</style>
