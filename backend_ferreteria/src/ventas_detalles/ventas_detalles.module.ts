import { Module } from '@nestjs/common';
import { VentasDetallesService } from './ventas_detalles.service';
import { VentasDetallesController } from './ventas_detalles.controller';
import { VentaDetalle } from './entities/venta_detalle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [VentasDetallesController],
  providers: [VentasDetallesService],
  imports: [TypeOrmModule.forFeature([VentaDetalle])],
})
export default class VentasDetallesModule {}
