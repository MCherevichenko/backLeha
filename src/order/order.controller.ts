import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @Post('create')
  create(@Body() order: CreateOrderDto) {
    return this.orderService.create(order);
  }
  
  @Delete('delete/:orderId')
  delete(@Param('orderId') orderId: string) {
    return this.orderService.remove(orderId);
  }
  
  @Delete(':userId')
  deleteAll(@Param('userId') userId: string) {
    return this.orderService.removeAll(userId);
  }
  
  @Get(':userId')
  getByUser(@Param('userId') userId: string) {
    return this.orderService.getByUserId(userId);
  }
  
  @Get('money/:userId')
  getDebt(@Param('userId') userId: string) {
    return this.orderService.getDebt(userId);
  }
}
