import { Position } from "./position";
import { UnitOfMeasurement } from "./unit-of-measurement";

export class UpdateProductDto {

    name?: string;

    quantity?: number;

    minQuantity?: number;

    quantityToOrder?: number;

    unitOfMeasurement?: UnitOfMeasurement;

    position?: Position;

    isActiveInMenu?: boolean;

    price?: number;
}