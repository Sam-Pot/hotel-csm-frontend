import { FoodRequestDto } from "./food-request.dto";
import { ReservationState } from "./reservation-state";

export class RestaurantReservationDto {

    tableId?: string;
    
    userId?: string;

    dateTime?: number;

    totalCost?: number;

    numberOfPeople?: number;
   
    state?: ReservationState;

    drinkRequest?: FoodRequestDto[]

    dishRequest?: FoodRequestDto[]
}