import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/landingPage/info/info.component';
import { UserComponent } from './components/landingPage/user/user.component';
import { UserPortalComponent } from './components/user-portal/user-portal.component';
import { AdminPortalComponent } from './components/admin-portal/admin-portal.component';

const routes: Routes = [
{
  path: "",
  component: UserComponent
},
{
  path: 'user',
  component: UserPortalComponent
},
{
  path: 'admin',
  component: AdminPortalComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
