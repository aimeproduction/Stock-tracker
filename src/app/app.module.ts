import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackStockSymbolComponent } from './components/track-stock-symbol/track-stock-symbol.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SentimemtDetailsComponent } from './components/sentimemt-details/sentimemt-details.component';
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    AppComponent,
    TrackStockSymbolComponent,
    SentimemtDetailsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
