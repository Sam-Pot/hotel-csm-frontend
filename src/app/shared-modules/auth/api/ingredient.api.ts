import { environment } from "../../../../environments/environment";

export class IngredientApi {
    private static readonly BASE_URL = environment.SERVER_URL;
    private static readonly INGREDIENT_CONTROLLER = IngredientApi.BASE_URL + "/ingredient";
    
    static readonly SAVE_URL: string = IngredientApi.INGREDIENT_CONTROLLER + "";
    static readonly FIND_ONE_URL: string = IngredientApi.INGREDIENT_CONTROLLER + "";
    static readonly FIND_ONE_BY_NAME_URL: string = IngredientApi.INGREDIENT_CONTROLLER + "/name";
    static readonly FIND_URL: string = IngredientApi.INGREDIENT_CONTROLLER + "";
    static readonly UPDATE_URL: string = IngredientApi.INGREDIENT_CONTROLLER + "";
    static readonly DELETE_URL: string = IngredientApi.INGREDIENT_CONTROLLER + "";
}