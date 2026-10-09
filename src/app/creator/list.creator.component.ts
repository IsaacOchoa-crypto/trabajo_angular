import { Component, OnInit } from "@angular/core";
import { ILista } from '../structures/lista'
@Component({
    selector: 'creator',
    templateUrl: 'list.creator.component.html',
})

export class ListCreatorComponent implements OnInit {

    public list: ILista = { title: '' }

    ngOnInit(): void {

    }
    save() {
        console.log(this.list);
    }
}


