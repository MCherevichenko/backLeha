import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../order/order.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	userId: string;

	@Column({ type: 'varchar' })
	email: string;
	
	@Exclude()
	@Column({ type: 'varchar' })
	password: string;
	
	@OneToMany(() => Order, (order) => order.orderId, {
		nullable: true,
	})
	orders?: Order[];
}
