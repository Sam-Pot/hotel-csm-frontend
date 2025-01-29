import { environment } from "../../../../environments/environment";

export class PositionApi {
    private static readonly BASE_URL = environment.SERVER_URL;
    private static readonly POSITION_CONTROLLER = PositionApi.BASE_URL + "/position";
    
    static readonly SAVE_URL: string = PositionApi.POSITION_CONTROLLER + "";
    static readonly FIND_ONE_URL: string = PositionApi.POSITION_CONTROLLER + "";
    static readonly FIND_URL: string = PositionApi.POSITION_CONTROLLER + "";
    static readonly DELETE_URL: string = PositionApi.POSITION_CONTROLLER + "";
}