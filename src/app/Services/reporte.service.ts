import { Injectable, Inject } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscriber, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DataServiceService } from '../data-service.service';


//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    //'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(
    private dataServiceGeneral: DataServiceService,
    httpClient: HttpClient,
    // @Inject('BASE_URL') baseUrl: string,
    private httpCliente: HttpClient,
    private httpClienModule: HttpClientModule
  ) { }


  private myHost = this.dataServiceGeneral.myGlobalUrl;

  urlReportesGetReportes = this.myHost + "?pg=getReportes";
  urlReportesGetReportesUsuario = this.myHost + "?pg=getReportesUsuario";
  urlReportesGetReportesReciente = this.myHost + "?pg=getReportesReciente";


  public getReportes(){
    var objParam = [];
    var obj = {
      // NOTA: No se va a enviar ningun parametro
      // 'userWeb': UserWeb,
      // 'web': Web,
      // 'userEntra': UserEntra,
    }

    return this.httpCliente.post<any>(this.urlReportesGetReportes, httpOptions).pipe(
      tap((data: any) => this.dataServiceGeneral.log(`${data}`)),
      catchError(this.dataServiceGeneral.handleError<string>('getReportes'))
    );

  }

  public getReportesUsuario(usuarioId: number){
    var objParam = [];
    var obj = {
      'usuarioId ': usuarioId
      // NOTA: No se va a enviar ningun parametro
      // 'userWeb': UserWeb,
      // 'web': Web,
      // 'userEntra': UserEntra,
    }

    objParam.push(obj);

    return this.httpCliente.post<any>(this.urlReportesGetReportesUsuario + '&postData=' + JSON.stringify(objParam), objParam[0], httpOptions).pipe(
      tap((data: any) => this.dataServiceGeneral.log(`${data}`)),
      catchError(this.dataServiceGeneral.handleError<string>('getReportesUsuario'))
    );

  }

  public getReportesReciente(usuarioId: number){
    var objParam = [];
    var obj = {
      'usuarioId ': usuarioId
      // NOTA: No se va a enviar ningun parametro
      // 'userWeb': UserWeb,
      // 'web': Web,
      // 'userEntra': UserEntra,
    }

    objParam.push(obj);

    return this.httpCliente.post<any>(this.urlReportesGetReportesReciente + '&postData=' + JSON.stringify(objParam), objParam[0], httpOptions).pipe(
      tap((data: any) => this.dataServiceGeneral.log(`${data}`)),
      catchError(this.dataServiceGeneral.handleError<string>('getReportesReciente'))
    );

  }

}
