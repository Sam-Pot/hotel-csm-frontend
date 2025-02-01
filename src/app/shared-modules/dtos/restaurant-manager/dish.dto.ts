import { DishType } from "./dish-type";
import { RecipeDto } from "./recipe.dto";

export class DishDto {
    
    name?: string;

    description?: string;

    price?: number;

    isActiveInMenu?: boolean;

    type?: DishType;

    recipe?: RecipeDto;
}

