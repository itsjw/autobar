import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonHeaderComponent } from './components/common-header/common-header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ProfileSettingComponent } from './components/profile-setting/profile-setting.component';
import { DaterangepickerDirective } from './components/date-picket.directive';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { ElectronService } from './providers/electron.service';
import { DatabaseService } from './providers/database.service';
import { ComponentOneComponent } from './components/component-one/component-one.component';
import { ComponentTwoComponent } from './components/component-two/component-two.component';
import { ComponentThreeComponent } from './components/component-three/component-three.component';

import { MainAdminComponent } from './components/main-admin/main-admin.component'
import { ComponentDialogComponent } from 'app/components/component-dialog/component-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComponentOneComponent,
    ComponentTwoComponent,
    ComponentThreeComponent,
    MainAdminComponent, ComponentDialogComponent,
    CommonHeaderComponent, DashboardComponent, ProfileSettingComponent, DaterangepickerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ChartsModule,
  ],
  providers: [ElectronService, DatabaseService],
  entryComponents: [ComponentDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
