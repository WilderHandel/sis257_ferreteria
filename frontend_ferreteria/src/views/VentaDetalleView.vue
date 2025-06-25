<script setup lang="ts">
import VentaDetalleList from '@/components/ventadetalle/VentaDetalleList.vue'
import VentaDetalleSave from '@/components/ventadetalle/VentaDetalleSave.vue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const ventadetalleListRef = ref<typeof VentaDetalleList | null>(null)
const ventadetalleEdit = ref<any>(null)
const modoEdicion = ref(false)

function handleCreate() {
  ventadetalleEdit.value = null
  modoEdicion.value = false
  mostrarDialog.value = true
}

function handleEdit(ventadetalle: any) {
  ventadetalleEdit.value = ventadetalle
  modoEdicion.value = true
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  ventadetalleListRef.value?.obtenerLista()
  mostrarDialog.value = false
}
</script>

<template>
  <div class="m-7">
    <h2>Ventas Detalles</h2>
    <Button label="Nuevo Detalle" icon="pi pi-plus" @click="handleCreate" class="mb-3" />
    <VentaDetalleList ref="ventadetalleListRef" @edit="handleEdit" />
    <VentaDetalleSave
      :mostrar="mostrarDialog"
      :ventaDetalle="ventadetalleEdit"
      :modoEdicion="modoEdicion"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
