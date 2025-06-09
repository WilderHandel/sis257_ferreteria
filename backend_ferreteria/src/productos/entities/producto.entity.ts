import { VentaDetalle } from 'src/ventas_detalles/entities/venta_detalle.entity';
import { OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @OneToMany(() => VentaDetalle, (ventaDetalle) => ventaDetalle.producto)
  ventasDetalles: VentaDetalle[];
}
