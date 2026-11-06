import { Component, OnInit, Input } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { IStatus, ITodo } from "../../structures/todos";
import { TodoService } from "../../services/todos.services";

@Component({
    selector: 'todo-creator',
    templateUrl: 'todos.creator.component.html',
    animations: [
        trigger('openClose', [
            state('collapsed, void', style({ height: '0px', opacity: 0 })),
            state('expanded', style({ height: '*', opacity: 1 })),
            transition('collapsed <=> expanded', [animate('300ms ease-in-out')])
        ])
    ]
})
export class TodosCreatorComponent implements OnInit {
    @Input() id!: string;
    public formState: string = 'collapsed';

    public todo: ITodo = { content: '', status: IStatus.Created };

    constructor(private todos: TodoService) {}

    ngOnInit(): void {
    }

    save() {
        this.todos.add(this.id, this.todo).then(() => {
            this.todo = { content: '', status: IStatus.Created };
        });
    }

    toggleForm() {
        this.formState = this.formState === 'collapsed' ? 'expanded' : 'collapsed';
    }

    label(): string {
        return this.formState === 'collapsed' ? 'Agregar nuevo pendiente' : 'Ocultar nuevo pendiente';
    }
    icon(): string {
        return this.formState === 'collapsed' ? 'fa fa-plus' : 'fa-caret-up';
    }
}
