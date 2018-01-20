import { Component } from "@angular/core";
import { ErrorService } from "./error.service";
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(errorService) {
        this.errorService = errorService;
        this.displayed = false;
    }
    ErrorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errorService.errorOccured.subscribe(function (error) {
            _this.error = error;
            _this.displayed = true;
        });
    };
    ErrorComponent.prototype.onErrorHandled = function () {
        this.displayed = false;
    };
    ErrorComponent.prototype.isDisplayed = function () {
        if (this.displayed) {
            return 'block';
        }
        return 'none';
    };
    ErrorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-error',
                    templateUrl: './error.component.html',
                    styles: ["\n        .backdrop {\n            background-color: rgba(0,0,0,0.6);\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100vh;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    ErrorComponent.ctorParameters = function () { return [
        { type: ErrorService, },
    ]; };
    return ErrorComponent;
}());
export { ErrorComponent };
