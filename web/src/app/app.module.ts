import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestApisService } from './services/restApis.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { TableStructure } from './table-structure.directive';
import { LoggerService } from './services/logger.service';
import { FormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';

import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    AppComponent,
    TableStructure
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [RestApisService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
