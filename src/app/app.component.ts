import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router) {
    // Redirigir a otroarchivo.html cuando se cargue el componente
    this.router.navigate(['login']);
  }

  title = 'AngularProject3';
  ngOnInit() {
    /*    console.log('salio a login: ' + this.usuario);*/
    //sessionStorage.clear();
    //this.sharedDataService.refreshUserName('', '');
    this.router.navigate(['login']);
  }
}
