import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router'
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {
        console.log('signin const')

    }

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
                .subscribe(
                    data => {
                        console.log(data);
                        console.log(data.token)
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userId', data.userId);
                        this.router.navigateByUrl('/');
                    },
                    error => console.log(error)
                );
        this.myForm.reset();
    }

    ngOnInit() {
        console.log('signin init')
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}