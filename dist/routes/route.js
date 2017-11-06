"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRoute {
    constructor() {
        this.title = "";
        this.scripts = [];
    }
    render(req, res, views, options) {
        res.locals.BASE_URL = "/";
        res.locals.title = this.title;
        res.render(views, options);
    }
}
exports.BaseRoute = BaseRoute;
