import { HomeComponent } from '../components/home/home.component';
import { ComponentOneComponent } from '../components/component-one/component-one.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAdminComponent } from '../components/main-admin/main-admin.component'
import {AppComponent} from '../app.component'
import {DashboardComponent} from '../components/dashboard/dashboard.component'
import {ProfileSettingComponent} from '../components/profile-setting/profile-setting.component'

const routes: Routes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: 'home', component: HomeComponent },
    //{ path: 'one', component: ComponentOneComponent },
    //{ path: '**', component: HomeComponent},
    {
        path:'',
        pathMatch:'full',
        redirectTo:'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'main-admin',
        component: MainAdminComponent,
    },
    {
        path:'profile-setting',
        component:ProfileSettingComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
