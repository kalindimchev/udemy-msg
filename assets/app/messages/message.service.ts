import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { Message } from "./message.model";
import { Observable } from 'rxjs/Rx';
import { ErrorService } from '../errors/error.service'
import 'rxjs/Rx';

@Injectable ()
export class MessageService {
    private messages: Message[] = [];
    public messageIsEdit = new EventEmitter<Message>();
    
    constructor(private http: Http, private errorService: ErrorService) {
        
    }

    getToken() {
        return localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    }

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        
        return this.http.post('https://udemy-msg.herokuapp.com/message' + this.getToken(), body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.obj.content, 
                                            result.obj.user.firstName, 
                                            result.obj._id, 
                                            result.obj.user._id);                
                this.messages.push(message);


                return message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error);

            });
    }

    getMessages() {
        return this.http.get('https://udemy-msg.herokuapp.com/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                console.log(messages);
                let transformedMessages: Array<Message> = [];
                messages.forEach(m => {
                    transformedMessages.push(new Message(m.content, 
                                                        m.user.firstName, 
                                                        m._id, 
                                                        m.user._id));
                })

                this.messages = transformedMessages;
                console.log(this.messages);
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error);

            });
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.patch('https://udemy-msg.herokuapp.com/message/' + message.messageId + this.getToken(), body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error);

            });
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);

        return this.http.delete('https://udemy-msg.herokuapp.com/message/' + message.messageId + this.getToken())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error);

            });
    }
}