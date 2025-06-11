<script setup lang="ts">
import http from '@/plugins/axios'
import { ref, onMounted, computed } from 'vue'
import { Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Cliente } from '@/models/cliente'

const ENDPOINT = 'clientes'
const clientes = ref<Cliente[]>([])
const emit = defineEmits(['edit'])
const clienteDelete = ref<Cliente | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  try {
    const response = await http.get(ENDPOINT)
    console.log('Clientes obtenidos:', response.data)
    clientes.value = response.data
  } catch (error) {
    console.error('Error al obtener clientes:', error)
  }
}

const clientesFiltrados = computed(() => {
  return clientes.value.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cliente.ciNit.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(cliente: Cliente) {
  emit('edit', cliente)
}

function mostrarEliminarConfirm(cliente: Cliente) {
  clienteDelete.value = cliente
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  if (!clienteDelete.value?.id) return
  await http.delete(`${ENDPOINT}/${clienteDelete.value?.id}`)
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
          placeholder="Buscar por ci/nit o nombre"
        />
      </InputGroup>
    </div>
    <DataTable :value="clientesFiltrados" paginator scrollable scrollHeight="flex" :rows="5" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 50rem">
  <Column field="nombre" header="Nombre" sortable />
  <Column field="ciNit" header="Ci/Nit" sortable />
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
      <p>¿Estás seguro de que deseas eliminar este cliente?</p>
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
