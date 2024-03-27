import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReporteDataService } from '../Services/reporte-data.service';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-report-container',
  templateUrl: './report-container.component.html',
  styleUrl: './report-container.component.css'
})


export class ReportContainerComponent{

  usuarioId: string | null = null;
  usuarioNombre: string | null = null;
  rolNombre: string | null = null;

  constructor(
    private actRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private reporteDataService: ReporteDataService) {
      this.loadInfo();
  }

  private myHost = this.dataService.myGlobalUrl;

  ngOnInit() {
    this.usuarioId = sessionStorage.getItem('sisUserId');
    this.usuarioNombre = sessionStorage.getItem('sisUserName');
    this.rolNombre = sessionStorage.getItem('sisRol');
  }

  loadInfo(){
    const reporte = this.reporteDataService.getReporteGUID();
    const wors = this.reporteDataService.getworkspaceGUID();

    console.log(reporte)
    console.log(wors)
  }

  refreshPage() {
    location.reload();
  }
}


