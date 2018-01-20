import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
    public message: Message;

    constructor(private messageService: MessageService) {

    }

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe((m: Message) => {
            this.message = m;
            
        })
    }

    onSubmit(form: NgForm) {
        if (this.message) {
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    // result => console.log(result)
                )
            this.message = null;
        } else {
            const message = new Message(form.value.content, 'Max');
            this.messageService.addMessage(message)
                .subscribe(
                    // data => console.log(data),
                    // error => console.log(error)
            );
        }

        form.resetForm();    
    }

    onClear(form: NgForm) {
        this.message = null;
        form.resetForm();
    }
}