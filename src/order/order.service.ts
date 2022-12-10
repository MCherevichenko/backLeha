import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		private readonly userService: UserService,
	) {}
	
	async create(order: CreateOrderDto) {
		const newOrder = new Order();
		const user = await this.userService.findOneById(order.owner);
		newOrder.owner = user;
		newOrder.price = order.price;
		newOrder.type = order.type;
		return this.orderRepository.save(newOrder);
	}
	
	remove(orderId: string) {
		try {
			return this.orderRepository.delete(orderId);
		} catch (error) {
			throw new HttpException('Такого заказа нет', HttpStatus.NOT_FOUND);
		}
	}
	
	getByUserId(userId: string) {
		return this.orderRepository.find({where:{
			userId
		}})
	}
	
	removeAll(userId: string){
		return this.orderRepository.delete({userId});
	}
	
	async getDebt(userId: string) {
		const allOrders = await this.getByUserId(userId);
		if(allOrders.length < 0) return {message: 'У вас нет активных заказов'};
		let debt = 0;
		allOrders.forEach(order => {
			debt += +order.price;
		})
		return {debt}
	}
}
