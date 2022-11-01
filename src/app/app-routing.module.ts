import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TrackStockSymbolComponent} from "./components/track-stock-symbol/track-stock-symbol.component";
import {SentimemtComponent} from "./components/sentimemt/sentimemt.component";


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
  { path: 'sentiment/:symbol',
    component: SentimemtComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
