import type { Producto } from "./producto"
import type { Venta } from "./venta"

export interface VentaDetalle {
  id: number
  idVenta: number
  idProducto: number
  precioUnitario: number
  total: number
  venta: Venta;
  producto: Producto
}
