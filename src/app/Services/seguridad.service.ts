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
export class SeguridadService {

  constructor(
    private dataServiceGeneral: DataServiceService,
    httpClient: HttpClient,
    // @Inject('BASE_URL') baseUrl: string,
    private httpCliente: HttpClient,
    private httpClienModule: HttpClientModule
  ) { }

  private myHost = this.dataServiceGeneral.myGlobalUrl;

  urlSeguridadLogin = this.myHost + "?pg=generalLogin";
  urlSeguridadAgregaUsuario = this.myHost + "?pg=generalAgregaUsuario";
  urlSeguridadActualizaUsaurio = this.myHost + "?pg=generalActualizaUsuario";
  urlSeguridadEliminaUsuario = this.myHost + "?pg=generalEliminaUsuario";
  urlSeguridadExisteUsuario = this.myHost + "?pg=generalExisteUsuario";
  urlSeguridadPowerBIApi = this.myHost + "?pg=generalPowerBI";


  public generalLogin(UserWeb: string, Web: string, UserEntra: string): Observable<string> {
    console.log('usr: ' + UserWeb);
    console.log('Web: ' + Web);
    console.log('userEntra: ' + UserEntra);  
    var objParam = [];
    var obj = {
      'userWeb': UserWeb,
      'web': Web,
      'userEntra': UserEntra,
    }


    objParam.push(obj);

    const postData = new FormData();
    postData.append('userWeb', UserWeb);
    postData.append('web', Web);
    postData.append('userEntra', UserEntra);

    const params = new HttpParams();

    params.set('userWeb', UserWeb);
    params.set('web', Web);
    params.set('userEntra', UserWeb);

    return this.httpCliente.post<any>(this.urlSeguridadLogin + '&postData=' + JSON.stringify(objParam), objParam[0], httpOptions).pipe(
      tap((data: any) => this.dataServiceGeneral.log(`${data}`)),
      catchError(this.dataServiceGeneral.handleError<string>('generalLogin'))
    );
  }

  public async generalPowerBiApi(wsId: string, rptId: string): Promise<string> {
  try {
    const objParam = [
      {
        'wsId': wsId,
        'rptId': rptId
      }
    ];

    console.log('send call');

    const postData = new FormData();
    postData.append('wsId', wsId);
    postData.append('rptId', rptId);

    const params = new HttpParams();
    params.set('wsId', wsId);
    params.set('rptId', rptId);

    const response = await this.httpCliente.post<any>(this.urlSeguridadPowerBIApi + '&postData=' + JSON.stringify(objParam), objParam[0], httpOptions).toPromise();
    this.dataServiceGeneral.log(`${response}`);

    console.log(response);

    return response;

    } catch (error) {
    console.log(error);
    catchError(this.dataServiceGeneral.handleError<string>('generalPowerBiApi'));
    return '';
  }
}



}
