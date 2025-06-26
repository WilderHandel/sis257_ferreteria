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
import { useRouter } from 'vue-router'

const token = localStorage.getItem('token')

const router = useRouter()
const ci = ref('')
const nombreCliente = ref('')
const nombreClienteReadonly = ref(true)
const mostrarDialogCliente = ref(false)
const mostrarDialogCrearCliente = ref(false)
const nuevoCliente = ref({ nombre: '', ciNit: ci.value })
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
    productoSeleccionado.value.saldo -= cantidad.value
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

  await clienteListRef.value?.obtenerLista()
  let cliente = clienteListRef.value?.buscarPorCi(ci.value)
  if (!cliente) {
    // Crear cliente automáticamente
    cliente = await crearClienteAutomatico()
    if (!cliente) return
  }

  const idUsuario = getIdUsuarioFromToken()
  if (!idUsuario) {
    alert('No se pudo obtener el ID de usuario.')
    return
  }

  const transaccion = Date.now()

  const detalles = detalleVenta.value.map(item => ({
    idProducto: item.producto.id,
    precioUnitario: Number(item.producto.precioVenta),
    total: Number(item.producto.precioVenta) * item.cantidad,
    cantidad: item.cantidad
  }));

  const ventaPayload = {
    idCliente: cliente.id,
    idUsuario: idUsuario,
    fecha: new Date().toISOString().substring(0, 10),
    transaccion: transaccion,
    cantidad: detalleVenta.value.reduce((sum, item) => sum + item.cantidad, 0),
    detalles // <-- aquí va el array de detalles
  };

  try {
    await axios.post('http://localhost:3000/api/v1/ventas', ventaPayload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert('Venta guardada con éxito')
    ci.value = ''
    nombreCliente.value = ''
    detalleVenta.value = []
    dineroRecibido.value = 0

    await clienteListRef.value?.obtenerLista()
    await productoListRef.value?.obtenerLista()
  } catch (error) {
    alert('Error al guardar la venta')
  }
}
async function onClienteCreado() {
  mostrarDialogCrearCliente.value = false
  // Recarga la lista de clientes y vuelve a intentar guardar la venta
  await clienteListRef.value?.obtenerLista()
  guardarVenta()
}
async function crearClienteAutomatico() {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/v1/clientes',
      {
        nombre: nombreCliente.value,
        ciNit: ci.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    // Recarga la lista de clientes y retorna el nuevo cliente
    await clienteListRef.value?.obtenerLista()
    return response.data
  } catch (error) {
    alert('No se pudo crear el cliente automáticamente')
    throw error
  }
}

function getIdUsuarioFromToken() {
  const token = localStorage.getItem('token')
  if (!token) return null
  const payload = JSON.parse(atob(token.split('.')[1]))
  return payload.sub // o payload.id según cómo esté tu JWT
}

const idUsuario = getIdUsuarioFromToken()

function cancelarVenta() {
  detalleVenta.value = []
  total.value = 0
  dineroRecibido.value = 0
  cambio.value = 0
  productoSeleccionado.value = null
  cantidad.value = 1

  // Redirige a la ruta con nombre "VentaDetalle"
  router.push({ name: 'VentaDetalle' })
}

</script>

<template>
  <div class="container">
    <div class="tarjeta">
      <div>
        <h2 class="text-xl font-bold mb-4">Registrar Venta</h2>
        <div class="grid md:grid-cols-3 gap-4 mb-4 items-end">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">CI o NIT:</label>
            <InputText v-model="ci" class="w-full" placeholder="Ej: 12345678" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nombre del Cliente:</label>
            <InputText v-model="nombreCliente" :readonly="nombreClienteReadonly" class="w-full" />
          </div>
          <div class="flex items-end h-full">
            <div class="w-full">
              <label class="block text-sm font-semibold text-transparent mb-1">.</label>
              <!-- Espacio para alineación -->
              <Button label="Buscar Cliente" icon="pi pi-search" class="w-full text-black border-none"
                style="background-color: #facc15" @click="buscarClientePorCI" />

            </div>
          </div>
        </div>

        <Dialog v-model:visible="mostrarDialogCliente" header="Buscar Cliente" :style="{ width: '60vw' }">
          <ClienteList @edit="handleClienteSeleccionado" />
        </Dialog>

        <Dialog v-model:visible="mostrarDialogCrearCliente" header="Crear Cliente" :style="{ width: '30vw' }">
          <ClienteSave :mostrar="mostrarDialogCrearCliente" :cliente="nuevoCliente" @guardar="onClienteCreado"
            @close="mostrarDialogCrearCliente = false" />
        </Dialog>

        <div style="display: none">
          <ProductoList ref="productoListRef" @select="handleSelect" />
        </div>
        <div style="display: none">
          <ClienteList ref="clienteListRef" />
        </div>
        <div class="mb-4">
          <div class="grid md:grid-cols-4 gap-3 items-end">
            <!-- Producto -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Producto:</label>
              <Dropdown v-model="productoSeleccionado" :options="productoListRef?.productos || []"
                optionLabel="descripcion" placeholder="Selecciona un producto" class="w-full" />
            </div>

            <!-- Cantidad -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Cantidad:</label>
              <InputNumber v-model="cantidad" :min="1" class="w-full" />
            </div>

            <!-- Disponible -->
            <div v-if="productoSeleccionado">
              <label class="block text-sm font-semibold text-gray-700 mb-1">Disponible:</label>
              <div class="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800">
                {{ productoSeleccionado.saldo }}
              </div>
            </div>

            <!-- Botón -->
            <div>
              <label class="block text-sm font-semibold text-transparent mb-1">.</label>
              <Button label="Agregar" icon="pi pi-plus" class="w-full text-black border-none"
                style="background-color: #facc15" @click="agregarProducto" />
            </div>
          </div>
        </div>



        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-300 text-sm">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="p-2 border">Código de Producto</th>
                <th class="p-2 border">Descripción</th>
                <th class="p-2 border">Unidad</th>
                <th class="p-2 border">Cantidad</th>
                <th class="p-2 border">Precio Unitario</th>
                <th class="p-2 border">Subtotal</th>
                <th class="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in detalleVenta" :key="item.producto.codigo">
                <td class="p-2 border text-center">{{ item.producto.codigo }}</td>
                <td class="p-2 border text-center">{{ item.producto.descripcion }}</td>
                <td class="p-2 border text-center">{{ item.producto.unidadMedida }}</td>
                <td class="p-2 border text-center">{{ item.cantidad }}</td>
                <td class="p-2 border text-center">{{ item.producto.precioVenta }}</td>
                <td class="p-2 border text-center">{{ item.producto.precioVenta * item.cantidad }}</td>
                <td class="p-2 border text-center">
                  <Button icon="pi pi-trash" severity="danger" class="p-button-sm" @click="quitarProducto(idx)" text />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Contenedor alineado a la izquierda -->
        <div class="flex justify-start mt-6">
          <div class="w-full max-w-xs space-y-4">

            <div class="flex flex-col">
              <label class="text-sm font-semibold mb-1">Total de productos vendidos:</label>
            </div>
            <InputText :value="detalleVenta.reduce((sum, item) => sum + item.cantidad, 0)" readonly
              class="w-32 border border-gray-300 rounded focus:border-yellow-500 focus:ring-yellow-500" />


            <div class="flex flex-col">
              <label class="text-sm font-semibold mb-1">Total en Bs:</label>
            </div>
            <InputText :value="total" readonly
              class="w-32 border border-gray-300 rounded focus:border-yellow-500 focus:ring-yellow-500" />


            <div class="flex flex-col">
              <label class="text-sm font-semibold mb-1">Pago:</label>
            </div>
            <InputNumber v-model="dineroRecibido" :min="0" class="w-32"
              inputClass="w-full border border-gray-300 rounded focus:border-yellow-500 focus:ring-yellow-500" />


            <div class="flex flex-col">
              <label class="text-sm font-semibold mb-1">Cambio:</label>
            </div>
            <InputText :value="cambio" readonly
              class="w-32 border border-gray-300 rounded focus:border-yellow-500 focus:ring-yellow-500" />

            <!-- Botones alineados a la izquierda -->
            <div class="flex justify-start gap-3 pt-2">
              <Button label="Registrar Venta" icon="pi pi-check" class="border-none text-black"
                :style="{ backgroundColor: '#facc15' }" @click="guardarVenta" />
              <Button label="Cancelar Venta" icon="pi pi-times" class="bg-red-500 border-none text-white"
                @click="cancelarVenta" />
            </div>

          </div>
        </div>


      </div>
    </div>
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
