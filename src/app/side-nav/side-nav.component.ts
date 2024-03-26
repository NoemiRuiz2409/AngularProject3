import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideNavStateComponent } from '../side-nav-state/side-nav-state.component';; // Asegúrate de importar correctamente el servicio
import { trigger, state, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations: [
    trigger('fadeSlideInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('700ms ease-out')
      ]),
      transition(':leave', [
        animate('700ms ease-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})


export class SideNavComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private sideNavStateService: SideNavStateComponent) { }

  ngOnInit(): void {
    this.subscription = this.sideNavStateService.isOpen$.subscribe(
      isOpen => this.isOpen = isOpen
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

