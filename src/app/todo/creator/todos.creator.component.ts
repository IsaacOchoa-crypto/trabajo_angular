import { Component, OnInit, Input } from "@angular/core";
import { IStatus, ITodo } from "../../structures/todos";
import { TodoService } from "../../services/todos.services";

@Component({
    selector: 'todo-creator',
    templateUrl: 'todos.creator.component.html'
})
export class TodosCreatorComponent implements OnInit {
    @Input() id!: string;

    public todo: ITodo = { content: '', status: IStatus.Created };

    constructor(private todos: TodoService) {}

    ngOnInit(): void {
    }

    save() {
        this.todos.add(this.id, this.todo).then(() => {
            this.todo = { content: '', status: IStatus.Created };
        });
    }
}
