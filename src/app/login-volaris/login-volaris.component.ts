import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../app/data-service.service';
import { SeguridadService } from '../Services/seguridad.service';
import * as CryptoJS from 'crypto-js';
import { modelUsuario } from '../../model/usuario';
import { SharedDataService } from '../Services/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-volaris',
  templateUrl: './login-volaris.component.html',
  styleUrl: './login-volaris.component.css'
})
export class LoginVolarisComponent {
  hide = true;
  theme: string = "";
  errMsg: string = "";
  okMsg: string = "";
  tipoPwd: string = "password";
  tiempoMsg: number = 2100;
  resultado: any;
  usuario!: modelUsuario;
  //grls: modelG;
  //mail: modelMail;
  sysN: string = "";
  isAlive: any;
  infoWeb: any;

  constructor(
    private dataService: DataServiceService,
    //private authService: AuthServiceService,
    private seguridadService: SeguridadService,
    private router: Router,
    //private blobService: BlobServiceService,
    private sharedDataService: SharedDataService,
    private _snackBar: MatSnackBar,
  ) {
    sessionStorage.clear();
    //authService.logOut();
  }

  ngOnInit() {
    /*    console.log('salio a login: ' + this.usuario);*/
    sessionStorage.clear();
    this.sharedDataService.refreshUserName('', '');

  }

  fnKeyPress(t: string, ev: { key: any; charCode: number; }) {
    //console.log(ev)
    this.errMsg = "";
    if (!this.dataService.validKey(t, ev)) {
      this.errMsg = "Caracter inválido!";
      setTimeout(() => {
        this.errMsg = "";
      }, this.tiempoMsg);
      return false;
    }
    else {
      if (ev.key == "Enter") {
        var u = <HTMLInputElement>document.getElementById("txtUsr");
    var p = <HTMLInputElement>document.getElementById("txtPwd");
        this.fnValidarLogin(u.value, p.value, u.value);
      }
      return true;
    }
  }

  fnValidarLogin(u: string, p: string, r: string) {
    //console.log(u);
    //console.log(p);
    //console.log(r);

    //setTimeout(() => {
    //  this.router.navigate(['home']);
    //}, 1000);

    if (u.length < 1) {
    this._snackBar.open('Usuario inválido!', 'Cerrar', {
      duration: 3000,
      panelClass: ['clsLblOk', 'clsLblError']
    });      
    }
    if (p.length < 1) {
      this._snackBar.open('Contraseña inválida!', 'Cerrar', {
        duration: 3000, 
        panelClass: ['clsLblOk', 'clsLblError'] 
      });
    }

    // this.blobService.obtenerTableClient();

    this.seguridadService.generalLogin(CryptoJS.MD5(u).toString(), CryptoJS.MD5(p).toString(), r).subscribe(
      rows => {
        this.resultado = rows
      },
      error => this.errMsg = <any>error,
      () => this.fnLoginResult(p));


  }

  fnRecuperarPwd(user: string) {
    console.log('TODO ' + user);
  }

  fnLoginResult(p: string | any[]) {
    //console.log(this.resultado);



    if (this.resultado) {
      var aux = JSON.stringify(this.resultado[0]);
      //console.log(aux);
      if (!aux) {
        this._snackBar.open('Usuario y/o contraseña erroneos!', 'Cerrar', {
          duration: 3000, 
          panelClass: ['clsLblOk', 'clsLblError'] 
        });
        return;
      }
      if (aux.substring(0, 4) == '{"":') {
        this._snackBar.open('Usuario y/o contraseña erroneos!', 'Cerrar', {
          duration: 3000, 
          panelClass: ['clsLblOk', 'clsLblError'] 
        });
        return;
      }



      this.usuario = this.resultado[0];

      //console.log(this.resultado[0]);

      var fecId = Date.now();
      this.okMsg = "Bienvenido: " + this.usuario.UsuarioNombre;

      sessionStorage.setItem('sisUserName', this.usuario.UsuarioNombre);
      ////console.log('UsuarioNombreyyy: ' + this.usuario.UsuarioNombre)

      sessionStorage.setItem('sisUserWeb', this.usuario.UsuarioEntra);
      ////console.log('sisUserWebyyy: ' + this.usuario.UsuarioEntra)

      sessionStorage.setItem('sisUserId', this.usuario.UsuarioId.toString());
      ////console.log('UsuarioIdyyyy: ' + this.usuario.UsuarioId)

      sessionStorage.setItem('sisRol', this.usuario.Rol.toString());
      //console.log('Rolyyyy: ' + this.usuario.Rol)



      //this.authService.login();

      setTimeout(() => {
        this.sharedDataService.refreshUserName(this.usuario.UsuarioNombre, this.usuario.Rol);
        this.router.navigate(['landing']);
      }, 1000);
    }
    else {
      this._snackBar.open('Usuario y/o contraseña erroneos!', 'Cerrar', {
          duration: 3000, 
          panelClass: ['clsLblOk', 'clsLblError'] 
        });
      return;
    }
  }

  
}

