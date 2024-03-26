import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteDataService } from '../Services/reporte-data.service';

@Component({
  selector: 'app-report-container',
  templateUrl: './report-container.component.html',
  styleUrl: './report-container.component.css'
})


export class ReportContainerComponent{

  constructor(
    private route: ActivatedRoute,
    private reporteDataService: ReporteDataService) {
      this.loadInfo();
  }

  loadInfo(){
    const reporte = this.reporteDataService.getReporteGUID();
    const wors = this.reporteDataService.getworkspaceGUID();

    console.log(reporte)
    console.log(wors)
  }

}


