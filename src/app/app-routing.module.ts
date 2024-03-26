import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginVolarisComponent } from './login-volaris/login-volaris.component';
import { LandingplusComponent } from './landingplus/landingplus.component';
import { ReportContainerComponent } from './report-container/report-container.component';


const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  // { path: 'query-constructor', component: QueryConstructorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginVolarisComponent },
  { path: 'landing', component: LandingplusComponent },
  { path: 'report', component: ReportContainerComponent }
  // { path: 'app-report-selector', component: ReportSelectorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

