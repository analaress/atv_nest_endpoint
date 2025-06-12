import { Controller, Get, Post, Delete, Param, Query, Body } from '@nestjs/common';
import { CoffeeService } from './coffees.service';


@Controller()
export class CoffeeController {
  constructor(private readonly CoffeeService: CoffeeService) { }


  @Get('/coffees')
  async getCoffees() {
    return this.CoffeeService.findAll();
  }

  @Post('/coffees')
  create(@Body() data: any) {
    return this.CoffeeService.create(data);
  }

  @Get('/coffees/:id/order')
  findPedidosByCafeId(@Param('id') id: number) {
    return this.CoffeeService.findPedidosByCafeId(Number(id));
  }

  @Get('/coffees/plus-order-coffee')
  findMaisVendidos() {
    return this.CoffeeService.findMaisVendidos();
  }

  @Delete('/coffees/:id')
  remove(@Param('id') id: number) {
    return this.CoffeeService.remove(Number(id));
  }

}


