<script setup lang="ts">
import type { VentaDetalle } from '@/models/ventaDetalle'
import http from '@/plugins/axios'
import { InputGroup, InputGroupAddon, InputText } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const ENDPOINT = 'ventas-detalles'
const ventasDetalles = ref<VentaDetalle[]>([])
const emit = defineEmits(['edit'])
const ventaDetalleDelete = ref<VentaDetalle | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

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
  return ventasDetalles.value.filter(
    (ventaDetalle) =>
      ventaDetalle.producto.codigo.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-2">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText
          v-model="busqueda"
          type="text"
          placeholder="Buscar por Código de Producto"
        />
      </InputGroup>
    </div>
    <DataTable :value="ventasDetallesFiltrados" paginator scrollable scrollHeight="flex" :rows="5" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem">
      <Column field="producto.codigo" header="Código de Producto" sortable />
      <Column header="Fecha de Venta" sortable>
        <template #body="slotProps">
          {{ formatFecha(slotProps.data.venta.fecha) }}
        </template>
      </Column>
      <!-- Aquí van las columnas personalizadas -->
      <Column header="Cliente">
        <template #body="slotProps">
          {{ slotProps.data.venta.cliente?.nombre || 'Sin cliente' }}
        </template>
      </Column>
      <Column header="Vendedor">
        <template #body="slotProps">
          {{ slotProps.data.venta.usuario?.usuario || 'Sin usuario' }}
        </template>
      </Column>
      <Column field="precioUnitario" header="Precio Unitario" />
      <Column field="cantidad" header="Cantidad" />
      <Column field="total" header="Total" />
    </DataTable>
  </div>
</template>
<style scoped></style>
