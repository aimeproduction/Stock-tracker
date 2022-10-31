import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrackStockSymbolComponent} from "./components/track-stock-symbol/track-stock-symbol.component";
import {SentimemtDetailsComponent} from "./components/sentimemt-details/sentimemt-details.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'track-stock-symbol',
    pathMatch: 'full'
  },
  {
    path: 'track-stock-symbol',
    component: TrackStockSymbolComponent
  },
  { path: 'sentiment-details',
    component: SentimemtDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
