import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginVolarisComponent } from './login-volaris/login-volaris.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { LandingplusComponent } from './landingplus/landingplus.component';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReportContainerComponent } from './report-container/report-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginVolarisComponent,
    LandingplusComponent,
    ReportContainerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatGridListModule,
    MatCardModule,
    ScrollingModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      //{ path: 'home', component: LandingplusComponent, pathMatch: 'full' },
      //{ path: 'counter', component: CounterComponent },
      //{ path: 'fetch-data', component: FetchDataComponent },
      { path: '', component: LoginVolarisComponent, pathMatch: 'full' },
      { path: 'login', component: LoginVolarisComponent },
      //{ path: 'reportSelector', component: ReportSelectorComponent },
      //{ path: 'app-nav-menu', component: NavMenuComponent },
      //{ path: 'landing', component: LandingplusComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      //{ path: 'reportContainer', component: ReportContainerComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    ]),
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
