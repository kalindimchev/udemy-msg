import { Component } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
var MessageInputComponent = /** @class */ (function () {
    function MessageInputComponent(messageService) {
        this.messageService = messageService;
    }
    MessageInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.messageIsEdit.subscribe(function (m) {
            _this.message = m;
        });
    };
    MessageInputComponent.prototype.onSubmit = function (form) {
        if (this.message) {
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe();
            this.message = null;
        }
        else {
            var message = new Message(form.value.content, 'Max');
            this.messageService.addMessage(message)
                .subscribe();
        }
        form.resetForm();
    };
    MessageInputComponent.prototype.onClear = function (form) {
        this.message = null;
        form.resetForm();
    };
    MessageInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-message-input',
                    templateUrl: './message-input.component.html'
                },] },
    ];
    /** @nocollapse */
    MessageInputComponent.ctorParameters = function () { return [
        { type: MessageService, },
    ]; };
    return MessageInputComponent;
}());
export { MessageInputComponent };
