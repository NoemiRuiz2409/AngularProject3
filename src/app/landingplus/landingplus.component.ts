import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { Cards } from '../Interfaces/cards'
import { ReportContainerComponent } from '../report-container/report-container.component';
import { ReporteDataService } from '../Services/reporte-data.service';

@Component({
  selector: 'app-landingplus',
  templateUrl: './landingplus.component.html',
  styleUrls: ['./landingplus.component.css']
})
export class LandingplusComponent implements OnInit {

  cards_repo: Cards[] = [];
  totalcards: number = 0;
  paginatedcard: Cards[] = [];

  pageSize = 4;

  usuarioId: string | null = null;
  usuarioNombre: string | null = null;
  rolNombre: string | null = null;

  constructor(
    private actRoute: ActivatedRoute,
    private dataService: DataServiceService,
    private http: HttpClient,
    private router: Router,
    private reporteDataService: ReporteDataService,
  ) {}

  private myHost = this.dataService.myGlobalUrl;

  ngOnInit() {
    this.usuarioId = sessionStorage.getItem('sisUserId');
    this.usuarioNombre = sessionStorage.getItem('sisUserName');
    this.rolNombre = sessionStorage.getItem('sisRol');

    this.actRoute.params.subscribe(params => {
      const objParam = [{ 'usuarioId': this.usuarioId }];

      this.http.get<Cards[]>(this.myHost + '?pg=getUsuarioCards&postData=' + JSON.stringify(objParam)).subscribe(result => {
        this.cards_repo = result;
        console.log("Datos de las tarjetas:");
        console.log(this.cards_repo);
        this.groupCardsByCategory(); // Llamada después de poblar cards_repo
        this.totalcards = this.cards_repo.length;
      });
    });
  }

  groupedCards: Map<string, Cards[]> = new Map<string, Cards[]>();

groupCardsByCategory() {
  this.groupedCards = new Map<string, Cards[]>();
  for (let card of this.cards_repo) {
    const categoryKey = card.CategoriaNombre.toString(); // Convertir a tipo primitivo string
    if (!this.groupedCards.has(categoryKey)) {
      this.groupedCards.set(categoryKey, []);
    }
    this.groupedCards.get(categoryKey)?.push(card);
  }
}

getCardsForCategory(categoryKey: string): Cards[] {
  return this.groupedCards.get(categoryKey) || [];
}

getCategoryKeys(): string[] {
  return Array.from(this.groupedCards.keys());
}


  public refreshName() { this.usuarioNombre = sessionStorage.getItem('sisUserName'); }

  sendPharmaFilter() {
    sessionStorage.setItem('origen', 'ATV Pharma');
  }

  sendDermaFilter() {
    sessionStorage.setItem('origen', 'ATV Dermo');
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedItems = this.cards_repo.slice(startIndex, endIndex);
    this.paginatedcard = paginatedItems;
    this.totalcards = this.cards_repo.length;
  }

  refreshPage() {
    location.reload();
  }

  redirect(RepGUID: Cards){
    this.reporteDataService.setReporteGUID(RepGUID.ReporteGUID)
    this.reporteDataService.setworkspaceGUID(RepGUID.WorkspaceGUID)

    this.router.navigate(['/report']);
  }
}
