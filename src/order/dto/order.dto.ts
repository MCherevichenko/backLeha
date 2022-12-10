import { User } from "../../user/user.entity";
import { ApplicationType } from "../order.entity";

export class CreateOrderDto {
	type: ApplicationType;
	price: number;
	owner: string;
}
