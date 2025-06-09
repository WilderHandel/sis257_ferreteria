import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'La razón social no debe estar vacio' })
  @IsString({ message: 'La razón social debe ser de tipo cadena' })
  readonly RazonSocial: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El ci o nit código no debe estar vacio' })
  @IsString({ message: 'El ci o nit debe ser de tipo cadena' })
  readonly ciNit: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El telefono no debe estar vacio' })
  readonly telefono: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La dirección no debe estar vacio' })
  @IsString({ message: 'La dirección debe ser de tipo cadena' })
  readonly direccion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El reprentante no debe estar vacio' })
  @IsString({ message: 'El representante debe ser de tipo cadena' })
  readonly representante: string;
}
