import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService, StockNameData} from "../backend/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {forkJoin} from "rxjs";

export interface DataDetail {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

export interface DataName {
  count: number;
  result: [
{
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}]
}


@Component({
  selector: 'app-track-stock-symbol',
  templateUrl: './track-stock-symbol.component.html',
  styleUrls: ['./track-stock-symbol.component.css']
})
export class TrackStockSymbolComponent implements OnInit {
  data!: boolean;
  symbol!: string;
  //symbol: string = '';
  public form_search!: FormGroup;
  //api_key: string = 'bu4f8kn48v6uehqi3cqg'
  store_symbol: string[] =[];
  stored_symbol = [];
  stock_description = '';
  visible = true;
  array_data!: DataDetail [];
  stockNameData!: StockNameData [];
  symbol_sentiment : string= ''

  constructor(private fb: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {

    this.form_search = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]]
    });
    this.load_localstorage();
    this.symbol = this.form_search.controls['search'].value;

      //null || undefined. If yes return []
      this.stockNameData = JSON.parse(<string>localStorage.getItem('stockName'));

      this.array_data = JSON.parse(<string>localStorage.getItem('data'));

    //this.data = (this.stockNameData.length && this.array_data.length) > 0;

  }


  get_stock_name(symbol: string) {
    //this.symbol = symbol;
    this.api.get_stock_name(symbol.toUpperCase()).subscribe({
      next: (res) => {
        this.stockNameData = JSON.parse(<string>localStorage.getItem('stockName'));
      },
      error: (err: HttpErrorResponse) => {
        console.log("Sorry, it was impossible to load the name" + err.message);
      }
    });

    /**this.store_symbol.push(this.symbol)
    localStorage.setItem('symbol', JSON.stringify(this.store_symbol));
    this.load_localstorage();**/
  }

  // function to get the Name of the current stock between the list of stocks in order to print the sentiment details
   get_symbol(symbol: string, description: string){
     this.api.get_symbol(symbol, description);
   }
  get_stock_detail(symbol: string) {
    this.api.get_stock_detail(symbol).subscribe((res) => {
        this.array_data =  JSON.parse(<string>localStorage.getItem('data'));
        console.log(this.array_data);
      },
      error => {
        console.log("Sorry, it was impossible to load the data");
      });
  }

  load_localstorage(){
    let temp = localStorage.getItem('symbol');
    if (temp != null) {
      this.stored_symbol = JSON.parse(temp);
    }
    console.log("les valeurs:" +this.stored_symbol);
  }

  toggleElement(id: number) {
    console.log("Hallo....")
    this.api.deleteStockDetail(id);
    this.api.deleteStockName(id);

    this.stockNameData = JSON.parse(<string>localStorage.getItem('stockName'));

    this.array_data = JSON.parse(<string>localStorage.getItem('data'));
  }
}
