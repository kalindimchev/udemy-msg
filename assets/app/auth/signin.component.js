import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user.model';
var SigninComponent = /** @class */ (function () {
    function SigninComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        console.log('signin const');
    }
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(function (data) {
            console.log(data);
            console.log(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            _this.router.navigateByUrl('/');
        }, function (error) { return console.log(error); });
        this.myForm.reset();
    };
    SigninComponent.prototype.ngOnInit = function () {
        console.log('signin init');
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    };
    SigninComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-signin',
                    templateUrl: './signin.component.html'
                },] },
    ];
    /** @nocollapse */
    SigninComponent.ctorParameters = function () { return [
        { type: AuthService, },
        { type: Router, },
    ]; };
    return SigninComponent;
}());
export { SigninComponent };
