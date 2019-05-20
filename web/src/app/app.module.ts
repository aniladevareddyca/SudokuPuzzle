import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RestApisService } from './services/restApis.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { TableStructure } from './table-structure.directive';
import { LoggerService } from './services/logger.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TableStructure
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [RestApisService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
