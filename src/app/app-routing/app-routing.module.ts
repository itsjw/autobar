import { HomeComponent } from '../components/home/home.component';
import { ComponentOneComponent } from '../components/component-one/component-one.component';
import { ComponentTwoComponent } from '../components/component-two/component-two.component';
import { ComponentThreeComponent } from '../components/component-three/component-three.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAdminComponent } from '../components/main-admin/main-admin.component'
import {AppComponent} from '../app.component'
import {DashboardComponent} from '../components/dashboard/dashboard.component'
import {ProfileSettingComponent} from '../components/profile-setting/profile-setting.component'

const routes: Routes = [
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
        path:'profile-setting',
        component:ProfileSettingComponent
    },
    { 
        path: 'component-one',
        component: ComponentOneComponent 
    },
    { 
        path: 'component-two',
        component: ComponentTwoComponent 
    },
    { 
        path: 'component-three',
        component: ComponentThreeComponent 
    },
    {
        path: 'main-admin',
        component: MainAdminComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
