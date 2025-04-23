import { Module } from '@nestjs/common';
import { VentasDetallesService } from './ventas_detalles.service';
import { VentasDetallesController } from './ventas_detalles.controller';

@Module({
  controllers: [VentasDetallesController],
  providers: [VentasDetallesService],
})
export class VentasDetallesModule {}
