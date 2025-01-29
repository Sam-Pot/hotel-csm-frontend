import { environment } from "../../../../environments/environment";

export class DrinkApi {
    private static readonly BASE_URL = environment.SERVER_URL;
    private static readonly DRINK_CONTROLLER = DrinkApi.BASE_URL + "/drink";
    
    static readonly SAVE_URL: string = DrinkApi.DRINK_CONTROLLER + "";
    static readonly FIND_ONE_URL: string = DrinkApi.DRINK_CONTROLLER + "";
    static readonly FIND_URL: string = DrinkApi.DRINK_CONTROLLER + "";
    static readonly UPDATE_URL: string = DrinkApi.DRINK_CONTROLLER + "";
    static readonly DELETE_URL: string = DrinkApi.DRINK_CONTROLLER + "";
}