<script setup lang="ts">
import http from '@/plugins/axios'
import { ref, onMounted, computed } from 'vue'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Producto } from '@/models/producto'

const ENDPOINT = 'productos'
const productos = ref<Producto[]>([])
const emit = defineEmits(['edit'])
const productoDelete = ref<Producto | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    console.log('Productos obtenidos:', response.data)
    productos.value = response.data
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
}

const productosFiltrados = computed(() => {
  return productos.value.filter(
    (producto) =>
      producto.codigo.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      producto.unidadMedida.toLowerCase().includes(busqueda.value.toLowerCase()),
      //producto.categoria.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      //producto.proveedor.razonSocial.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function emitirEdicion(producto: Producto) {
  emit('edit', producto)
}

function mostrarEliminarConfirm(producto: Producto) {
  productoDelete.value = producto
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (!productoDelete.value?.id) return
  await http.delete(`${ENDPOINT}/${productoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

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
          placeholder="Buscar por codigo, descripción, unidad de media, proveedor o categoria"
        />
      </InputGroup>
    </div>
    <DataTable :value="productosFiltrados" paginator scrollable scrollHeight="flex" :rows="5" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem">
      <Column field="categoria.nombre" header="Categoría" sortable />
      <Column header="Fotografia" sortable>
        <template #body="{ data }">
          <img
        v-if="data.fotografia"
        :src="data.fotografia"
        alt="Foto"
        style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px"
      />
      <span v-else>No imagen</span>
    </template>
  </Column>
  <Column field="codigo" header="Código" sortable />
  <Column field="descripcion" header="Descripción" sortable />
  <Column field="precioVenta" header="Precio de Venta" />
  <Column field="saldo" header="Saldo" />
  <Column field="unidadMedida" header="Unidad de Medida" />
  <Column field="proveedor.razonSocial" header="Proveedor" />
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
      <p>¿Estás seguro de que deseas eliminar este producto?</p>
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
