import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNumber } from 'class-validator';

export class CreateVentaDetalleDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idVenta debe estar definido' })
  @IsInt({ message: 'El campo idVenta debe ser de tipo numérico' })
  readonly idVenta: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsInt({ message: 'El campo idProducto debe ser de tipo numérico' })
  readonly idProducto: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo precioUnitario debe estar definido' })
  @IsNumber(
    {},
    { message: 'El campo precioUnitario debe ser de tipo numérico' },
  )
  readonly precioUnitario: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo total debe estar definido' })
  @IsNumber({}, { message: 'El campo total debe ser de tipo numérico' })
  readonly total: number;
}
