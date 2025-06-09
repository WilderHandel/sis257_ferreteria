import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existe = await this.productosRepository.findOneBy({
      codigo: createProductoDto.codigo.trim(),
      descripcion: createProductoDto.descripcion.trim(),
      precioVenta: createProductoDto.precioVenta,
      cantidad: createProductoDto.cantidad,
      unidadMedida: createProductoDto.unidadMedida.trim(),
    });

    if (existe) throw new ConflictException('El Producto ya existe');

    const producto = new Producto();
    producto.codigo = createProductoDto.codigo.trim();
    producto.descripcion = createProductoDto.descripcion.trim();
    producto.precioVenta = createProductoDto.precioVenta;
    producto.cantidad = createProductoDto.cantidad;
    producto.unidadMedida = createProductoDto.unidadMedida.trim();

    return this.productosRepository.save(producto);
  }

  async findAll() {
    return this.productosRepository.find({ order: { descripcion: 'ASC' } });
  }

  async findOne(id: number): Promise<Producto> {
    const productos = await this.productosRepository.findOneBy({ id });
    if (!productos) throw new NotFoundException('El Producto no existe');
    return productos;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const productos = await this.findOne(id);
    const productoUpdate = Object.assign(productos, updateProductoDto);
    return this.productosRepository.save(productoUpdate);
  }

  async remove(id: number) {
    const productos = await this.findOne(id);
    if (productos) return this.productosRepository.softRemove(productos);
  }
}
