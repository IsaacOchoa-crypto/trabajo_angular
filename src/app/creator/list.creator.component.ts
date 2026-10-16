import { Component, OnInit } from "@angular/core";
import { ILista } from '../structures/lista'
import { ListService } from '../services/lists.services';

@Component({
    selector: 'creator',
    templateUrl: 'list.creator.component.html'
})
export class ListCreatorComponent implements OnInit {

    public list: ILista = {
        title: '',
        description: ''
    };

    constructor(private lists: ListService) { }

    ngOnInit(): void {

    }

    save() {
        this.lists.add(this.list).then(console.log);
    }
}
