import { environment } from "../../../../environments/environment";

export class NonFoodProductApi {
    private static readonly BASE_URL = environment.SERVER_URL;
    private static readonly NON_FOOD_PRODUCT_CONTROLLER = NonFoodProductApi.BASE_URL + "/non-food-product";
    
    static readonly SAVE_URL: string = NonFoodProductApi.NON_FOOD_PRODUCT_CONTROLLER + "";
    static readonly FIND_ONE_URL: string = NonFoodProductApi.NON_FOOD_PRODUCT_CONTROLLER + "";
    static readonly FIND_URL: string = NonFoodProductApi.NON_FOOD_PRODUCT_CONTROLLER + "";
    static readonly UPDATE_URL: string = NonFoodProductApi.NON_FOOD_PRODUCT_CONTROLLER + "";
    static readonly DELETE_URL: string = NonFoodProductApi.NON_FOOD_PRODUCT_CONTROLLER + "";
}