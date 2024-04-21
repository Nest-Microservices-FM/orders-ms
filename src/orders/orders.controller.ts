import { Controller, NotImplementedException, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { ChangeOrderStatusDto, CreateOrderDto, OrderPaginationDto } from './dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({cmd:'create_order'})
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern({cmd:'find_all_orders'})
  findAll(@Payload() orderPaginationDto:OrderPaginationDto) {
    return this.ordersService.findAll(orderPaginationDto);
  }

  @MessagePattern({cmd:'find_one_order'})
  async findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern({cmd:'find_one_order_status'})
  async findAllByStatus(@Payload('status', ParseUUIDPipe) status: string) {
    return this.ordersService.findOne(status);
  }

  @MessagePattern({cmd:'change_order_status'})
  changeOrderStatus(@Payload() changeOrderStatusDto:ChangeOrderStatusDto) {
    return this.ordersService.changeStatus(changeOrderStatusDto)
  }



}
