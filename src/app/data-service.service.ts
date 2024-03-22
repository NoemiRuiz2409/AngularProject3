import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
//import pckg from '../../package.json';

import { MatDialog } from '@angular/material/dialog';
// import { getPackedSettings } from 'http2';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  //private urlProduccion = 'biknoblochback.azurewebsites.net';

  private urlProduccion = 'back.azurewebsites.net/';
  private urlProduccionPort = '';
  private urlProduccionPage = '/Handler.aspx';
  private urlProduccionProtocol = 'https://';

  private urlLocalDev = 'localhost';
  private urlLocalDevPort = ':44307';
  private urlLocalDevPaage = '/Handler.aspx';
  private urlLocalProtocol = 'https://';


  public sTerr: number = 2100;

  public myGlobalHost = this.urlLocalDev;
  public myGlobalPort = this.urlLocalDevPort;
  public myGlobalPage = this.urlLocalDevPaage;
  public myGlobalProtocol = this.urlLocalProtocol;

  // public myGlobalHost = this.urlProduccion;
  // public myGlobalPort = this.urlProduccionPort;
  // public myGlobalPage = this.urlProduccionPage;
  // public myGlobalProtocol = this.urlProduccionProtocol;

  public myGlobalUrl = this.myGlobalProtocol + this.myGlobalHost + this.myGlobalPort + this.myGlobalPage;

  constructor(
    private http: HttpClient, public dialog: MatDialog, private generalsnackBar: MatSnackBar
  ) { }
  validKey(t: string, e: { key: string; charCode: number; }) {
    //console.log(t);
    //console.log(e.charCode);
    var esBorradoFlechaTab = false;
    var esNumero = false;
    var esLetraMinuscula = false;
    var esLetraMayuscula = false;
    var esAcentoMinuscula = false;
    var esAcentoMayuscula = false;
    var esEspacio = false;
    var esEnter = false;
    if (e.key == "Dead") {
      return false;
    }
    //if(e.charCode==46 || e.charCode==8 || e.charCode==37 || e.charCode==39 || e.charCode==9) //--> NO USAR SOLO CHARCODE!! ya que significan otra cosa
    if (e.key == "Delete" || e.key == "Backspace" || e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "Tab")
      esBorradoFlechaTab = true;
    if (e.charCode >= 48 && e.charCode <= 57)
      esNumero = true;
    if ((e.charCode >= 65 && e.charCode <= 90) || e.key == 'Ñ' || e.charCode == 209)
      esLetraMayuscula = true;
    if ((e.charCode >= 97 && e.charCode <= 122 && e.key != "+") || e.key == 'ñ' || e.charCode == 241)
      esLetraMinuscula = true;
    if (e.key == 'Á' || e.charCode == 193 || e.key == 'É' || e.charCode == 201 || e.key == 'Í' || e.charCode == 205 || e.key == 'Ó' || e.charCode == 211 || e.key == 'Ú' || e.charCode == 218)
      esAcentoMayuscula = true;
    if (e.key == 'á' || e.charCode == 225 || e.key == 'é' || e.charCode == 233 || e.key == 'í' || e.charCode == 237 || e.key == 'ó' || e.charCode == 243 || e.key == 'ú' || e.charCode == 250)
      esAcentoMinuscula = true;
    if (e.key == ' ' || e.charCode == 32)
      esEspacio = true;
    if (e.key == 'Enter' || e.charCode == 13)
      esEnter = true;

    if (t == 'NUMERO' || t == 'TEL') {
      if (!esBorradoFlechaTab && !esNumero && !esEnter)
        return false;
    }
    if (t == 'DECIMAL') {
      if (!esBorradoFlechaTab && !esNumero && !esEnter) {
        if (e.key == "." || e.charCode == 46 || e.key == "_" || e.charCode == 95)
          return true;
        else
          return false;
      }
    }
    if (t == 'PTO') {
      if (!esBorradoFlechaTab && !esNumero && !esEnter) {
        if (e.key == "_" || e.charCode == 95)
          return true;
        else
          return false;
      }
    }
    if (t == 'IP') {
      if (!esBorradoFlechaTab && !esNumero && !esEnter) {
        if (e.key == "." || e.charCode == 46 || e.key == "-" || e.charCode == 45 || e.key == "_" || e.charCode == 95)
          return true;
        else
          return false;
      }
    }
    if (t == 'PISO') {
      if (!esBorradoFlechaTab && !esNumero && !esEnter) {
        if (e.key == "." || e.charCode == 46 || e.key == "-" || e.charCode == 45 || e.key == "_" || e.charCode == 95 || e.key == "+" || e.charCode == 43 ||
          e.key == ":" || e.charCode == 58 || e.key == "*" || e.charCode == 42 || e.key == "P" || e.charCode == 80 || e.key == "H" || e.charCode == 72)
          return true;
        else
          return false;
      }
    }
    if (t == 'COORD') {
      if (!esBorradoFlechaTab && !esNumero && !esEnter) {
        if (e.key == "." || e.charCode == 46 || e.key == "-" || e.charCode == 45 || e.key == "_" || e.charCode == 95)
          return true;
        else
          return false;
      }
    }
    if (t == 'TEXTO' || t == 'PWD' || t == 'ID' || t == 'NOMBRE') {
      if (!esBorradoFlechaTab && !esNumero && !esLetraMayuscula && !esLetraMinuscula && !esAcentoMayuscula && !esAcentoMinuscula && !esEspacio && !esEnter) {
        if (e.key == "$" || e.key == "&" || e.key == "=" || e.key == "+" || e.key == "/" || e.key == "#" || e.key == "@" || e.key == "." || e.key == "," || e.key == ":" || e.key == ";" || e.key == "*" || e.key == "-" || e.key == "%" || e.key == "!" || e.key == "?" || e.key == "(" || e.key == ")" || e.key == "[" || e.key == "]" || e.key == "_"
          || e.charCode == 36 || e.charCode == 38 || e.charCode == 61 || e.charCode == 43 || e.charCode == 47 || e.charCode == 35 || e.charCode == 64 || e.charCode == 46 || e.charCode == 44 || e.charCode == 58 || e.charCode == 59 || e.charCode == 42 || e.charCode == 45 || e.charCode == 37 || e.charCode == 33 || e.charCode == 63 || e.charCode == 40 || e.charCode == 41 || e.charCode == 91 || e.charCode == 93 || e.charCode == 95)
          return true;
        else
          return false;
      }
    }
    if (t == 'MAIL') {
      if (!esBorradoFlechaTab && !esNumero && !esLetraMayuscula && !esLetraMinuscula && !esEspacio && !esEnter) {
        if (e.key == "." || e.charCode == 46 || e.key == "+" || e.charCode == 43 || e.key == "-" || e.charCode == 45 || e.key == "_" || e.charCode == 95 || e.key == "@" || e.charCode == 64)
          return true;
        else
          return false;
      }
    }
    if (t == 'URL') {
      if (!esBorradoFlechaTab && !esNumero && !esLetraMayuscula && !esLetraMinuscula && !esEspacio && !esEnter) {
        if (e.key == "$" || e.key == "&" || e.key == "=" || e.key == "+" || e.key == "/" || e.key == "#" || e.key == "@" || e.key == "." || e.key == "," || e.key == ":" || e.key == ";" || e.key == "*" || e.key == "-" || e.key == "%" || e.key == "!" || e.key == "?" || e.key == "(" || e.key == ")" || e.key == "[" || e.key == "]" || e.key == "_"
          || e.charCode == 36 || e.charCode == 38 || e.charCode == 61 || e.charCode == 43 || e.charCode == 47 || e.charCode == 35 || e.charCode == 64 || e.charCode == 46 || e.charCode == 44 || e.charCode == 58 || e.charCode == 59 || e.charCode == 42 || e.charCode == 45 || e.charCode == 37 || e.charCode == 33 || e.charCode == 63 || e.charCode == 40 || e.charCode == 41 || e.charCode == 91 || e.charCode == 93 || e.charCode == 95)
          return true;
        else
          return false;
      }
    }
    if (t == 'FILE') {
      if (!esBorradoFlechaTab && !esNumero && !esLetraMayuscula && !esLetraMinuscula && !esAcentoMayuscula && !esAcentoMinuscula && !esEspacio && !esEnter) {
        if (e.key == "$" || e.key == "&" || e.key == "=" || e.key == "+" || e.key == "/" || e.key == "#" || e.key == "@" || e.key == "." || e.key == "," || e.key == ";" || e.key == "-" || e.key == "!" || e.key == "(" || e.key == ")" || e.key == "[" || e.key == "]" || e.key == "_"
          || e.charCode == 36 || e.charCode == 38 || e.charCode == 61 || e.charCode == 43 || e.charCode == 47 || e.charCode == 35 || e.charCode == 64 || e.charCode == 46 || e.charCode == 44 || e.charCode == 59 || e.charCode == 45 || e.charCode == 33 || e.charCode == 40 || e.charCode == 41 || e.charCode == 91 || e.charCode == 93 || e.charCode == 95)
          return true;
        else
          return false;
      }
    }
    return true;
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DataService message */
  public log(message: any) {
    console.log(message);
  }

  fnGeneralError(message: string, point: string, action: string, timeToShow: number) {
    console.log(point + ' ' + action + '' + message);
    this.openSnackBar(message, action, timeToShow, 'snackbarErrorWebBilling');
  }

  fnGeneralSuccess(message: string, point: string, action: string, timeToShow: number) {
    this.openSnackBar(message, action, timeToShow, 'snackbarSuccessWebBilling');
  }

  openSnackBar(message: string, action: string, time: number, classs: string) {
    this.generalsnackBar.open(message, action, {
      duration: time,
      panelClass: classs,
    });
  }

}
