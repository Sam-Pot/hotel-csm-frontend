import { environment } from "../../../../environments/environment";

export class DishApi {
    private static readonly BASE_URL = environment.SERVER_URL;
    private static readonly DISH_CONTROLLER = DishApi.BASE_URL + "/dish";

    static readonly SAVE_URL: string = DishApi.DISH_CONTROLLER + "";
    static readonly FIND_ONE_URL: string = DishApi.DISH_CONTROLLER + "";
    static readonly FIND_URL: string = DishApi.DISH_CONTROLLER + "";
    static readonly FIND_ONE_WITH_RECIPE_URL: string = DishApi.DISH_CONTROLLER + "/recipe";
    static readonly UPDATE_URL: string = DishApi.DISH_CONTROLLER + "";
    static readonly DELETE_URL: string = DishApi.DISH_CONTROLLER + "";
}