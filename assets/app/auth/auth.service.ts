import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { User } from "./user.model";
import { ErrorService } from '../errors/error.service';
import { Observable } from 'rxjs/Rx';

import 'rxjs/Rx';

@Injectable ()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {
        
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'})
        
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
                    .map((response: Response) => response.json())
                    .catch((error: Response) => {
                        this.errorService.handleError(error.json());
                        return Observable.throw(error);
                    });

    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'})
        console.log(body);

        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
                    .map((response: Response) => response.json())
                    .catch((error: Response) => {
                        this.errorService.handleError(error.json());
                        return Observable.throw(error);
                    });

    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}