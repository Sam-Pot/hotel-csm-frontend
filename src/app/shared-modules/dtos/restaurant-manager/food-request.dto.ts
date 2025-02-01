import { UpdateProductDto } from "../warehouse-manager/update-product.dto";
import { DishDto } from "./dish.dto";
import { ReservationState } from "./reservation-state";

export class FoodRequestDto {

    quantity?: number;

    dateTime?: Date;

    state?: ReservationState;

    dish?: any;

    drink?: any;
    
}