import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { ElectronService } from './providers/electron.service';
import { DatabaseService } from './providers/database.service';
import { ComponentOneComponent } from './components/component-one/component-one.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ComponentOneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ElectronService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
