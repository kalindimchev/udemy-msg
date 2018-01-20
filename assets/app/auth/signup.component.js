import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from './auth.service';
import { User } from './user.model';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService) {
        this.authService = authService;
        console.log('signup const');
    }
    SignupComponent.prototype.onSubmit = function () {
        var user = new User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
        console.log(user);
        this.authService.signup(user)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
        this.myForm.reset();
    };
    SignupComponent.prototype.ngOnInit = function () {
        console.log('signup init');
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    };
    SignupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-signup',
                    templateUrl: './signup.component.html'
                },] },
    ];
    /** @nocollapse */
    SignupComponent.ctorParameters = function () { return [
        { type: AuthService, },
    ]; };
    return SignupComponent;
}());
export { SignupComponent };
