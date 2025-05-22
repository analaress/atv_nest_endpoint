import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { Coffee, CoffeeService } from './coffee.service';
import { CreateCafeDto } from './dto/create-cafe.dto';


@Controller()
export class CoffeeController {
    constructor(private readonly CoffeeService: CoffeeService ) {}

    @Post('/coffee-create')
    createCoffee(@Body() createCoffeeDto : CreateCafeDto) {
    return this.CoffeeService.createCoffee(createCoffeeDto);
  }

    @Get('/coffees')
    getCoffees(): Coffee[] {
    return this.CoffeeService.getCoffees();
  }

    @Get('/coffees/:id/detalhes')
    getCoffeeUnico(@Param('id') id: string) {
    return this.CoffeeService.getCoffeeUnico(id)
  }
}

  