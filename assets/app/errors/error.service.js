import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Error } from "./error.model";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
var ErrorService = /** @class */ (function () {
    function ErrorService(http) {
        this.http = http;
        this.errorOccured = new EventEmitter();
    }
    ErrorService.prototype.handleError = function (error) {
        this.errorOccured.emit(new Error(error.title, error.error.message));
    };
    ErrorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ErrorService.ctorParameters = function () { return [
        { type: Http, },
    ]; };
    return ErrorService;
}());
export { ErrorService };
