import { Component, OnInit } from "@angular/core";
import { IStatus, ITodo } from "../../structures/todos";
import { TodoService } from "../../services/todos.services";

@Component({
    selector: 'todo-creator',
    templateUrl: 'todos.creator.component.html'
})
export class TodosCreatorComponent implements OnInit {
    public todo: ITodo = { content: '', status: IStatus.Created };
    constructor (private todos : TodoService){}
    ngOnInit(): void {
    }

    save() {
    }
}
