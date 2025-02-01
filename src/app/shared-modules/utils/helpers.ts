import { ActivatedRoute } from "@angular/router";
import { routes } from "../../app.routes";

export class Helpers {

    public static reloadPreviousLocation(route: ActivatedRoute, useHistory: boolean = false) {
        if (useHistory) {
            window.history.back();
        } else {
            let path = route.snapshot.routeConfig?.path?.split("/");
            path?.pop();
            let previousLocation = path?.join("/");
            let existRoute = routes.filter(elem => elem.path == previousLocation).length > 0;
            if (existRoute) {
                window.location = previousLocation as any;
            } else {
                window.location = '' as any;
            }
        }
    }

    public static formatDate(date: Date): string {
        const pad = (n: number) => (n < 10 ? '0' + n : n);
        const formattedDate = [
            date.getUTCFullYear(),
            pad(date.getUTCMonth() + 1),
            pad(date.getUTCDate())
        ].join('-') + ' ' + [
            pad(date.getHours()),
            pad(date.getMinutes()),
            pad(date.getSeconds())
        ].join(':');
        return formattedDate;
    }

}