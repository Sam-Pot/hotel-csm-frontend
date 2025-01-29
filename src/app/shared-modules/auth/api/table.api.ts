import { environment } from "../../../../environments/environment";

export class TableApi {
    private static readonly BASE_URL = environment.SERVER_URL;
    private static readonly TABLE_CONTROLLER = TableApi.BASE_URL + "/table";
    
    static readonly SAVE_URL: string = TableApi.TABLE_CONTROLLER + "";
    static readonly FIND_ONE_URL: string = TableApi.TABLE_CONTROLLER + "";
    static readonly FIND_URL: string = TableApi.TABLE_CONTROLLER + "";
    static readonly UPDATE_URL: string = TableApi.TABLE_CONTROLLER + "";
    static readonly DELETE_URL: string = TableApi.TABLE_CONTROLLER + "";
}