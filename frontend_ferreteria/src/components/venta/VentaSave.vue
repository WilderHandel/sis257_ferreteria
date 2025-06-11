<script setup lang="ts">
import type { Venta } from '@/models/venta'
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import { ref, computed, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { Select } from 'primevue'

const ENDPOINT = 'ventas'

const props = defineProps({
  mostrar: Boolean,
  venta: {
    type: Object as () => Venta,
    default: () => ({} as Venta),
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const formattedFecha = computed({
  get: () => {
    if (!venta.value.fecha) return ''
    return typeof venta.value.fecha === 'string'
      ? venta.value.fecha
      : formatDate(venta.value.fecha)
  },
  set: (val: string) => {
    venta.value.fecha = val
  },
})
function formatDate(fecha: Date): string {
  const year = fecha.getFullYear()
  const month = String(fecha.getMonth() + 1).padStart(2, '0')
  const day = String(fecha.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}


const clientes = ref<Cliente[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const venta = ref<Venta>({ ...props.venta })

async function obtenerClientes() {
  clientes.value = await http.get('clientes').then(res => res.data)
}

async function handleSave() {
  try {
    const body = {
      idCliente: venta.value.cliente?.id ?? venta.value.idCliente ?? 0,
      fecha: typeof venta.value.fecha === 'string' ? venta.value.fecha : formatDate(venta.value.fecha),
      transaccion: Number(venta.value.transaccion),
      cantidad: Number(venta.value.cantidad),
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${venta.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    venta.value = {} as Venta
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerClientes()
      if (props.venta?.id) {
        venta.value = { ...props.venta }
      } else {
        venta.value = {
          id: 0,
          idCliente: 0,
          idUsuario: 0,
          fecha: '',
          transaccion: 0,
          cantidad: 0,
          cliente: { id: 0, nombre: '', ciNit: '' }
        } as unknown as Venta
      }
    }
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Venta'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="cliente" class="font-semibold w-3">Cliente</label>
        <Select
          id="cliente"
          v-model="venta.cliente.id"
          :options="clientes"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="fecha" class="font-semibold w-3">Fecha</label>
        <InputText id="fecha" v-model="formattedFecha" class="flex-auto" type="date" />

      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="transaccion" class="font-semibold">Transacción</label>
        <InputNumber id="transaccion" v-model="venta.transaccion" class="flex-auto" :min="0" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="cantidad" class="font-semibold">Cantidad</label>
        <InputNumber
          id="cantidad"
          v-model="venta.cantidad"
          class="flex-auto"
          :min="0"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>