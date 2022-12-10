import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

export enum ApplicationType {
	web = 'веб приложение',
	desktop = 'приложение для рабочего стола',
	mobile = 'мобильное приложение',
	game = 'игра',
}

@Entity()
export class Order {
	@PrimaryGeneratedColumn('uuid')
	orderId: string;
	
	@Column()
	type: ApplicationType;
	
	@Column()
	price: number;
	
	@ManyToOne(() => User, (user) => user.userId, {
		nullable: false,
	})
	@JoinColumn({
		name: 'userId',
		referencedColumnName: 'userId',
	})
	owner: User;
	
	@Column({ name: 'userId', type: 'varchar'})
	userId: string;
}