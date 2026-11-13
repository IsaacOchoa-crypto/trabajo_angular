import { Component, Input, OnInit } from "@angular/core";
import { ITodo, IStatus } from "../../structures/todos"; 
import { trigger, state, style, animate, transition } from "@angular/animations";

@Component({
    selector: 'todo-card',
    templateUrl: './todo.card.component.html',
    animations: [
        trigger('statusAnimation', [
            state('0, void', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            state('1', style({
                transform: 'translateX(-100%)',
                opacity: 0
            })),
            transition('0 => 1', [
                animate(200, style({transform: 'translateX(0)', opacity: 0})),
                animate(200)    
            ])
        ]),
        trigger('pressAnimation', [
            state('up, void', style({
                transform: 'translateX(0)'
            })),
            state('down', style({
                transform: 'translateX(-100px)'
            })),
            transition('up <=> down', [
                animate(100, style({transform: 'translateX(0)'})),
                animate(100)
            ])
        ])
    ]
})
export class TodosCardComponent implements OnInit {
    @Input() todo!: ITodo;
    public press: string = 'up';

    ngOnInit(): void {
    }

    completed() {
        this.todo.status = IStatus.Completed; 
    }
}
