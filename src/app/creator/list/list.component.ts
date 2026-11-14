import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ITodo } from "../../structures/todos";
import { TodoService } from "../../services/todos.services";

@Component({
    selector: "list",
    templateUrl: "list.component.html"
})
export class ListComponent implements OnInit {
    public listId!: string;
    public todos!: Observable<ITodo[]>;

    tackTodoobject = (id : any,obj: {id:any}) => obj.id;

    constructor(
        private route: ActivatedRoute,
        private todoService: TodoService
    ) {}

    ngOnInit(): void {
        this.listId = this.route.snapshot.params.id;
        this.todos = this.todoService.getFromList(this.listId);
    }
}
