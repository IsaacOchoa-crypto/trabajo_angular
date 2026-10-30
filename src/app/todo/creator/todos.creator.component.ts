import { Component, OnInit } from "@angular/core";
import { IStatus, ITodo } from "../../structures/todos";

@Component({
    selector: 'todo-creator',
    templateUrl: 'todos.creator.component.html'
})
export class TodosCreatorComponent implements OnInit {
    public todo: ITodo = { content: '', status: IStatus.Created };

    ngOnInit(): void {
    }

    save() {
    }
}
