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
      <Column field="venta.fecha" header="Fecha de Venta" sortable />
      <Column field="precioUnitario" header="Precio Unitario" />
      <Column field="total" header="Total" />
      <Column field="cantidad" header="Cantidad" />
    </DataTable>
  </div>
</template>
<style scoped></style>
