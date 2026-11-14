import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';
import { ListService } from '../services/lists.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('enterState', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateX(-100%)', opacity: 0 }),
          stagger('50ms', [
            animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
          ])
        ], { optional: true })
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
