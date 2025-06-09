import { Venta } from 'src/ventas/entities/venta.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @OneToMany(() => Venta, (venta) => venta.usuario)
  ventas: Venta[];
}
