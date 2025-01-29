import { environment } from "../../../../environments/environment";
 
export class UserApi {
    private static readonly BASE_URL = environment.SERVER_URL;
    private static readonly USER_CONTROLLER = UserApi.BASE_URL + "/user";
 
    static readonly LOGIN_URL: string = UserApi.USER_CONTROLLER + '/login';
    static readonly SIGNIN_URL:string = UserApi.USER_CONTROLLER + "/signin";
    static readonly FIND_ONE_URL:string = UserApi.USER_CONTROLLER + "";
    static readonly FIND_URL:string = UserApi.USER_CONTROLLER + "";
    static readonly UPDATE_URL:string = UserApi.USER_CONTROLLER + "";
    static readonly UPDATE_PASSWORD_URL:string = UserApi.USER_CONTROLLER + "/update-password";
    static readonly UPDATE_ROLE_URL:string = UserApi.USER_CONTROLLER + "/update-role";
    static readonly DELETE_URL:string = UserApi.USER_CONTROLLER + "";
    static readonly DELETE_BY_ADMIN_URL:string = UserApi.USER_CONTROLLER + "/admin";
    static readonly FIND_ONE_BY_ADMIN_URL:string = UserApi.USER_CONTROLLER + "/admin";
}