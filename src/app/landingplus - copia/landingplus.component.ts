import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-landingplus',
  templateUrl: './landingplus.component.html',
  styleUrls: ['./landingplus.component.css']
})
export class LandingplusComponent implements OnInit {
  vuelo = [1, 2, 3, 4, 5, 6, 7]; 
  avion = [1, 2, 3, 4, 5, 6]; 
  pasajero = [1, 2, 3, 4, 5]; 
  tripulacion = [1, 2, 3, 4];
  pageSize = 4; 
  totalvuelo = this.vuelo.length; 
  totalavion = this.avion.length; 
  totalpasajero = this.pasajero.length; 
  totaltripulacion = this.tripulacion.length; 
  paginatedvuelo: any[] = []; 
  paginatedavion: any[] = []; 
  paginatedpasajero: any[] = []; 
  paginatedtripulacion: any[] = []; 

  usuarioNombre: string | null = null;
  rolNombre: string | null = null;

  constructor() {
    this.paginatedavion = this.avion.slice(0, this.pageSize);
    this.paginatedvuelo = this.vuelo.slice(0, this.pageSize);
    this.paginatedpasajero = this.pasajero.slice(0, this.pageSize);
    this.paginatedtripulacion = this.tripulacion.slice(0, this.pageSize);
  }

  ngOnInit() {
    this.usuarioNombre = sessionStorage.getItem('sisUserName');
    this.rolNombre = sessionStorage.getItem('sisRol');
  }

  shouldShowReportDivDerma(): boolean {
    return this.rolNombre === 'Rol1'; 
  }

  shouldShowReportDivFarma(): boolean {
    return this.rolNombre === 'Rol2';
  }

  public refreshName() { this.usuarioNombre = sessionStorage.getItem('sisUserName'); }

  sendPharmaFilter() {
    sessionStorage.setItem('origen', 'ATV Pharma');
  }

  sendDermaFilter() {
    sessionStorage.setItem('origen', 'ATV Dermo');
  }


  onPageChange(event: PageEvent, tab: string) {
    let startIndex = 0;
    let endIndex = 0;
    let totalItems = 0;
    let paginatedItems: any[] = [];

    switch (tab) {
      case 'vuelo':
        startIndex = event.pageIndex * this.pageSize;
        endIndex = startIndex + this.pageSize;
        paginatedItems = this.vuelo.slice(startIndex, endIndex);
        totalItems = this.totalvuelo;
        break;
      case 'avion':
        startIndex = event.pageIndex * this.pageSize;
        endIndex = startIndex + this.pageSize;
        paginatedItems = this.avion.slice(startIndex, endIndex);
        totalItems = this.totalavion;
        break;
      case 'pasajero':
        startIndex = event.pageIndex * this.pageSize;
        endIndex = startIndex + this.pageSize;
        paginatedItems = this.pasajero.slice(startIndex, endIndex);
        totalItems = this.totalpasajero;
        break;
      case 'tripulacion':
        startIndex = event.pageIndex * this.pageSize;
        endIndex = startIndex + this.pageSize;
        paginatedItems = this.tripulacion.slice(startIndex, endIndex);
        totalItems = this.totaltripulacion;
        break;
    }

    switch (tab) {
      case 'vuelo':
        this.paginatedvuelo = paginatedItems;
        this.totalvuelo = totalItems;
        break;
      case 'avion':
        this.paginatedavion = paginatedItems;
        this.totalavion = totalItems;
        break;
      case 'pasajero':
        this.paginatedpasajero = paginatedItems;
        this.totalpasajero = totalItems;
        break;
      case 'tripulacion':
        this.paginatedtripulacion = paginatedItems;
        this.totaltripulacion = totalItems;
        break;
    }
  }

  refreshPage() {
    location.reload();
  }
}
