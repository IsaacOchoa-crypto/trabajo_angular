import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ILista } from '../structures/lista';
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

    constructor(private lists: ListService, private router: Router) { }

    ngOnInit(): void {
    }

    save() {
        const titleToSave = (this.list.title || '').trim();
        if (!titleToSave) return;

        const newList: ILista = {
            title: titleToSave,
            description: this.list.description || ''
        };

        this.lists.add(newList).then(() => {
            this.list = { title: '', description: '' };
            this.router.navigate(['/']);
        });
    }
}
