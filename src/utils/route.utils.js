"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRoute = void 0;
class CustomRoute {
    constructor(router) {
        this.Route = router;
    }
    handleChildRoute(childRouteClass) {
        return new childRouteClass().Route;
    }
}
exports.CustomRoute = CustomRoute;
