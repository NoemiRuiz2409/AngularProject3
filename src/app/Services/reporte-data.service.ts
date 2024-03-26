import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteDataService {

  private reporteGUID !: String;
  private workspaceGUID !: String;

  constructor() { }

    setReporteGUID (newReporteGUID: String){
      this.reporteGUID = newReporteGUID;
    }
    getReporteGUID () {
      return this.reporteGUID;
    }

    setworkspaceGUID (newworkspaceGUID: String){
      this.workspaceGUID = newworkspaceGUID;
    }
    getworkspaceGUID () {
      return this.workspaceGUID;
    }

}
