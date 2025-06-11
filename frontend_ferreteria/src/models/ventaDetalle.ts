import type { Producto } from "./producto"

export interface VentaDetalle {
  id: number
  idVenta: number
  idProducto: number
  precioUnitario: number
  total: number
  venta: Venta;
  producto: Producto
}
