import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ListService } from '../services/lists.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('enterState', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  public message = 'Angular Universal';

  constructor(public lists: ListService) { }

  ngOnInit(): void {
  }
}
