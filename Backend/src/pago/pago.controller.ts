import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, // Para validar que el ID sea un número
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

// Define la ruta base para todas las rutas de este controlador (ej: /pagos)
@Controller('pagos')
export class PagoController {
  // Inyecta el servicio para usar sus métodos
  constructor(private readonly pagoService: PagoService) {}

  /**
   * Endpoint para crear un nuevo pago.
   * Recibe los datos validados del cuerpo de la solicitud (Body).
   */
  @Post()
  @HttpCode(HttpStatus.CREATED) // Devuelve código 201 en lugar de 200 por defecto
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagoService.create(createPagoDto);
  }

  /**
   * Endpoint para obtener todos los pagos.
   */
  @Get()
  findAll() {
    return this.pagoService.findAll();
  }

  /**
   * Endpoint para obtener un pago específico por ID.
   * Obtiene el ID de los parámetros de la ruta (Param) y lo valida como número.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pagoService.findOne(id);
  }

  /**
   * Endpoint para actualizar parcialmente un pago existente.
   * Obtiene el ID de la ruta y los datos a actualizar del cuerpo.
   */
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePagoDto: UpdatePagoDto,
  ) {
    return this.pagoService.update(id, updatePagoDto);
  }

  /**
   * Endpoint para eliminar un pago existente.
   * Obtiene el ID de la ruta.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK) // Puedes devolver 200 o 204 (No Content)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pagoService.remove(id);
  }

   // --- Opcional: Endpoint Adicional ---
  /**
   * Endpoint para obtener todos los pagos de un club específico.
   */
  // @Get('club/:clubId')
  // findAllByClub(@Param('clubId', ParseIntPipe) clubId: number) {
  //   return this.pagoService.findAllByClub(clubId);
  // }
}