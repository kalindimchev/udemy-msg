import { Injectable, EventEmitter } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Message } from "./message.model";
import { Observable } from 'rxjs/Rx';
import { ErrorService } from '../errors/error.service';
import 'rxjs/Rx';
var MessageService = /** @class */ (function () {
    function MessageService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
        this.messages = [];
        this.messageIsEdit = new EventEmitter();
    }
    MessageService.prototype.getToken = function () {
        return localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    };
    MessageService.prototype.addMessage = function (message) {
        var _this = this;
        var body = JSON.stringify(message);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('http://udemy-msg.herokuapp.com/message' + this.getToken(), body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            var message = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user._id);
            _this.messages.push(message);
            return message;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error);
        });
    };
    MessageService.prototype.getMessages = function () {
        var _this = this;
        return this.http.get('http://udemy-msg.herokuapp.com/message')
            .map(function (response) {
            var messages = response.json().obj;
            console.log(messages);
            var transformedMessages = [];
            messages.forEach(function (m) {
                transformedMessages.push(new Message(m.content, m.user.firstName, m._id, m.user._id));
            });
            _this.messages = transformedMessages;
            console.log(_this.messages);
            return transformedMessages;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error);
        });
    };
    MessageService.prototype.editMessage = function (message) {
        this.messageIsEdit.emit(message);
    };
    MessageService.prototype.updateMessage = function (message) {
        var _this = this;
        var body = JSON.stringify(message);
        var headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.patch('http://udemy-msg.herokuapp.com/message/' + message.messageId + this.getToken(), body, { headers: headers })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error);
        });
    };
    MessageService.prototype.deleteMessage = function (message) {
        var _this = this;
        this.messages.splice(this.messages.indexOf(message), 1);
        return this.http.delete('http://udemy-msg.herokuapp.com/message/' + message.messageId + this.getToken())
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error);
        });
    };
    MessageService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MessageService.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrorService, },
    ]; };
    return MessageService;
}());
export { MessageService };
