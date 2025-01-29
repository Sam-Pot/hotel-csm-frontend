import { ActivatedRoute } from "@angular/router";

export class LocationUtils {

    public static reloadPreviousLocation(route: ActivatedRoute) {
        let path = route.snapshot.routeConfig?.path?.split("/");
        path?.pop();
        let previousLocation = path?.join("/");
        window.location = previousLocation as any;
    }

}