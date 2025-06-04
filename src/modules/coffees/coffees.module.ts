import { Module } from '@nestjs/common';
import { CoffeeService } from './coffees.service';
import { CoffeeController } from './coffees.controller';

@Module({
  imports: [],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeesModule {}
