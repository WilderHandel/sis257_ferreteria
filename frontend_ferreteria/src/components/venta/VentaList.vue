<script setup lang="ts">
import http from '@/plugins/axios'
import { ref, onMounted, computed } from 'vue'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Venta } from '@/models/venta' // Descomenta si tienes el modelo

const ENDPOINT = 'ventas'
const ventas = ref<Venta[]>([])
const emit = defineEmits(['edit'])
const ventaDelete = ref<Venta | null>(null)
const mostrarConfirmDialog = ref(false)
const busqueda = ref('')

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    ventas.value = response.data
  } catch (error) {
    console.error('Error al obtener ventas:', error)
  }
}

const ventasFiltradas = computed(() => {
  return ventas.value.filter(
    (venta) =>
      (venta.cliente?.nombre ?? '').toLowerCase().includes(busqueda.value.toLowerCase()) ||
      (venta.cliente?.ciNit ?? '').toLowerCase().includes(busqueda.value.toLowerCase()) ||
      (venta.fecha ? venta.fecha.toString().toLowerCase().includes(busqueda.value.toLowerCase()) : false) ||
      (venta.id && venta.id.toString().includes(busqueda.value))
  )
})

function emitirEdicion(venta: Venta) {
  emit('edit', venta)
}

function mostrarEliminarConfirm(venta: Venta) {
  ventaDelete.value = venta
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (!ventaDelete.value?.id) return
  try {
    await http.delete(`${ENDPOINT}/${ventaDelete.value?.id}`)
    obtenerLista()
    mostrarConfirmDialog.value = false
  } catch (error) {
    alert('No se pudo eliminar la venta.')
  }
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ ventas, obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-2">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText
          v-model="busqueda"
          type="text"
          placeholder="Buscar por cliente, CI/NIT, fecha o ID"
        />
      </InputGroup>
    </div>
    <DataTable :value="ventasFiltradas" paginator scrollable scrollHeight="flex" :rows="5" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem">
      <Column field="id" header="ID" sortable />
      <Column field="clienteNombre" header="Cliente" sortable />
      <Column field="clienteCi" header="CI/NIT" sortable />
      <Column field="fecha" header="Fecha" sortable />
      <Column field="total" header="Total" />
      <Column header="Acciones" frozen alignFrozen="right" style="min-width: 120px">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(data)" />
          <Button
            icon="pi pi-trash"
            aria-label="Eliminar"
            severity="danger"
            text
            @click="mostrarEliminarConfirm(data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar esta venta?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>