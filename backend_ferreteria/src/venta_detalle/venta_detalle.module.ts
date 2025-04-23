import { Module } from '@nestjs/common';
import { VentaDetalleService } from './venta_detalle.service';
import { VentaDetalleController } from './venta_detalle.controller';

@Module({
  controllers: [VentaDetalleController],
  providers: [VentaDetalleService],
})
export class VentaDetalleModule {}
