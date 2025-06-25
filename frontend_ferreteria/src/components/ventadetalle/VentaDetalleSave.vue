<script setup lang="ts">
import type { VentaDetalle } from '@/models/ventaDetalle'
import http from '@/plugins/axios'
import { ref, computed, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { Select } from 'primevue'
import type { Venta } from '@/models/venta'
import type { Producto } from '@/models/producto'

const ENDPOINT = 'ventas_detalles'

const props = defineProps({
  mostrar: Boolean,
  ventaDetalle: {
    type: Object as () => VentaDetalle,
    default: () => ({} as VentaDetalle),
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const ventas = ref<Venta[]>([])
const productos = ref<Producto[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const ventaDetalle = ref<VentaDetalle>({ ...props.ventaDetalle })

async function obtenerCategorias() {
  ventas.value = await http.get('ventas').then(res => res.data)
}

async function obtenerProveedores() {
  productos.value = await http.get('productos').then(res => res.data)
}

async function handleSave() {
  try {
    const body = {
      idVenta: ventaDetalle.value.venta?.id ?? 0,
      idProducto: ventaDetalle.value.producto?.id ?? 0,
      precioUnitario: ventaDetalle.value.precioUnitario,
      total: Number(ventaDetalle.value.total),
      cantidad: Number(ventaDetalle.value.cantidad), // <-- AGREGA ESTO
    }

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${ventaDetalle.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }

    emit('guardar')
    ventaDetalle.value = {} as VentaDetalle
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerCategorias()
      obtenerProveedores()
      if (props.ventaDetalle?.id) {
        ventaDetalle.value = { ...props.ventaDetalle }
      } else {
        ventaDetalle.value = {
          venta: { id: 0 },
          producto: { id: 0 },
          precioUnitario: 0,
          total: 0,
          cantidad: 1, // <-- AGREGA ESTO
        } as VentaDetalle
      }
    }
  }
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog>
      <div class="flex items-center gap-4 mb-4">
        <label for="categoria" class="font-semibold w-3">Categoría</label>
        <Select
          id="venta"
          v-model="ventaDetalle.venta.id"
          :options="ventas"
          optionLabel="fecha"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="producto" class="font-semibold w-3">Producto</label>
        <Select
          id="producto"
          v-model="ventaDetalle.producto.id"
          :options="productos"
          optionLabel="descripcion"
          optionValue="id"
          class="flex-auto"
        />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="precioUnitario" class="font-semibold w-3">Precio Unitario</label>
        <InputText id="precioUnitario" v-model="ventaDetalle.precioUnitario" class="flex-auto" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="total" class="font-semibold">Total</label>
        <InputText id="total" v-model="ventaDetalle.total" class="flex-auto" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="cantidad" class="font-semibold">Cantidad</label>
        <InputNumber id="cantidad" v-model="ventaDetalle.cantidad" class="flex-auto" :min="1" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
