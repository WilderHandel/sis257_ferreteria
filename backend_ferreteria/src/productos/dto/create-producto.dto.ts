import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo código no debe estar vacio' })
  @IsString({ message: 'El codigo debe ser de tipo cadena' })
  readonly codigo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo Ci/Nit no debe ser vacío' })
  @IsString({ message: 'El campo Ci/Nit debe ser de tipo cadena' })
  readonly descripcion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precion de venta no debe ser vacío' })
  @IsNumber({}, { message: 'El campo precio de venta debe ser un número' })
  @Min(0, { message: 'El precio de venta no puede ser negativo' })
  readonly precioVenta: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cantidad no debe ser vacío' })
  @IsNumber({}, { message: 'El campo cantidad debe ser un número' })
  @Min(0, { message: 'La cantidad no puede ser negativa' })
  readonly cantidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo unidad de medida no debe ser vacío' })
  @IsString({ message: 'El campo unidad de medida debe ser de tipo cadena' })
  readonly unidadMedida: string;
}
