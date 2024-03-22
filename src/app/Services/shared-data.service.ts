import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private userNameSource = new BehaviorSubject<string | null>(null);
  private userRol = new BehaviorSubject<string | null>(null);
  currentUserName = this.userNameSource.asObservable();
  currentRol = this.userRol.asObservable();

  constructor() { }

  refreshUserName(userName: string | null, userRol: string | null) {
    this.userNameSource.next(userName);
    this.userRol.next(userRol);
  }
}