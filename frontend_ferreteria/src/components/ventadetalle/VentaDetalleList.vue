<script setup lang="ts">
import type { VentaDetalle } from '@/models/ventaDetalle'
import http from '@/plugins/axios'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const ENDPOINT = 'ventas-detalles'
const ventasDetalles = ref<VentaDetalle[]>([])
const busqueda = ref<string>('')

const router = useRouter()

function formatFecha(fecha?: string | Date) {
  if (!fecha) return ''
  if (typeof fecha === 'string') return fecha.substring(0, 10)
  return fecha.toISOString().substring(0, 10)
}

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    ventasDetalles.value = response.data
  } catch (error) {
    console.error('Error al obtener Ventas Detalles:', error)
  }
}

const ventasDetallesFiltrados = computed(() => {
  return ventasDetalles.value.filter((ventaDetalle) =>
    ventaDetalle.producto.codigo.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function crearNuevaVenta() {
  router.push('/ventas') // <-- Esto redirige correctamente
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Ventas Detalles</h2>

    <!-- Botón + Buscador uno debajo del otro -->
    <div class="flex flex-col gap-3 mb-6">
      <!-- Botón Nueva Venta -->
      <Button icon="pi pi-plus" label="Nueva Venta" class="bg-yellow-400 text-black border-none w-fit"
        @click="crearNuevaVenta" />
    </div>

    <!-- Buscador -->
    <div class="flex flex-col gap-3 mb-6">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search" /></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por Código de Producto"  class="focus:ring-yellow-400 focus:border-yellow-400" />
      </InputGroup>
    </div>

    <!-- Tabla -->
    <DataTable :value="ventasDetallesFiltrados" paginator scrollable scrollHeight="flex" :rows="5"
      :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem" showGridlines>
      <Column field="producto.codigo" header="Código de Producto" sortable
        :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }" />
      <Column header="Fecha de Venta" sortable :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }">
        <template #body="slotProps">
          {{ formatFecha(slotProps.data.venta.fecha) }}
        </template>
      </Column>
      <Column header="Cliente" :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }">
        <template #body="slotProps">
          {{ slotProps.data.venta.cliente?.nombre || 'Sin cliente' }}
        </template>
      </Column>
      <Column header="Vendedor" :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }">
        <template #body="slotProps">
          {{ slotProps.data.venta.usuario?.usuario || 'Sin usuario' }}
        </template>
      </Column>
      <Column field="precioUnitario" header="Precio Unitario"
        :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }" />
      <Column field="cantidad" header="Cantidad" :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }" />
      <Column field="total" header="Total" :headerStyle="{ backgroundColor: '#1b1b1b', color: 'white' }" />
    </DataTable>
  </div>
</template>



<style scoped></style>
