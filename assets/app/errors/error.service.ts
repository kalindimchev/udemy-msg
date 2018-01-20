import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Error } from "./error.model";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable ()
export class ErrorService {
    public errorOccured = new EventEmitter<Error>();
    
    constructor(private http: Http) {
        
    }

    handleError(error: any) {
        this.errorOccured.emit(new Error(error.title, error.error.message)); 
    }

    
}