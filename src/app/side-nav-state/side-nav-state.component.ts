import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavStateComponent {

  private isOpen = new BehaviorSubject<boolean>(false);

  isOpen$ = this.isOpen.asObservable();

  constructor() { }

  toggle() {
    this.isOpen.next(!this.isOpen.value);
  }
}
