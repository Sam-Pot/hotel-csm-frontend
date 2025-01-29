import { environment } from "../../../../environments/environment";

export class RestaurantReservationApi {
    private static readonly BASE_URL = environment.SERVER_URL;
    private static readonly RESTAURANT_RESERVATION_CONTROLLER = RestaurantReservationApi.BASE_URL + "/restaurant-reservation";

    static readonly SAVE_URL: string = RestaurantReservationApi.RESTAURANT_RESERVATION_CONTROLLER + "";
    static readonly FIND_BY_USER_URL: string = RestaurantReservationApi.RESTAURANT_RESERVATION_CONTROLLER + "";
    static readonly FIND_ONE_BY_USER_URL: string = RestaurantReservationApi.RESTAURANT_RESERVATION_CONTROLLER + "";
    static readonly UPDATE_BY_USER_URL: string = RestaurantReservationApi.RESTAURANT_RESERVATION_CONTROLLER + "";
    static readonly DELETE_BY_USER_URL: string = RestaurantReservationApi.RESTAURANT_RESERVATION_CONTROLLER + "";
    static readonly FIND_ONE_URL: string = RestaurantReservationApi.RESTAURANT_RESERVATION_CONTROLLER + "/admin";
    static readonly FIND_URL: string = RestaurantReservationApi.RESTAURANT_RESERVATION_CONTROLLER + "/admin";
    static readonly UPDATE_URL: string = RestaurantReservationApi.RESTAURANT_RESERVATION_CONTROLLER + "/admin";
    static readonly DELETE_URL: string = RestaurantReservationApi.RESTAURANT_RESERVATION_CONTROLLER + "/admin";
}