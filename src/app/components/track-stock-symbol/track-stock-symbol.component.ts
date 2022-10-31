import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../service/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DataDetail} from "../../models/dataDetail-model";
import {StockNameData} from "../../models/stockNameData-model";

@Component({
  selector: 'app-track-stock-symbol',
  templateUrl: './track-stock-symbol.component.html',
  styleUrls: ['./track-stock-symbol.component.css']
})
export class TrackStockSymbolComponent implements OnInit {
  data!: boolean;
  symbol!: string;
  public form_search!: FormGroup;
  stored_symbol = [];
  array_data!: DataDetail [];
  stockNameData!: StockNameData [];

  constructor(private fb: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {

    this.form_search = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]]
    });
    this.load_localstorage();
    this.symbol = this.form_search.controls['search'].value;
      this.stockNameData = JSON.parse(<string>localStorage.getItem('stockName'));

      this.array_data = JSON.parse(<string>localStorage.getItem('data'));

  }


  get_stock_name(symbol: string) {
    //this.symbol = symbol;
    this.api.get_stock_name(symbol.toUpperCase()).subscribe({
      next: () => {
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

  /**
   * function to get the Name of the current stock between the list of stocks in order to print the sentiment details
    */
   get_symbol(symbol: string, description: string){
     this.api.get_symbol(symbol, description);
   }

  /**
   * This function call the function "get_stock_detail" from the api.service to make a request with the symbol enter by the user
   * @param symbol the symbol enter by the user
   */
  get_stock_detail(symbol: string) {
    this.api.get_stock_detail(symbol).subscribe(() => {
        this.array_data =  JSON.parse(<string>localStorage.getItem('data'));
        console.log(this.array_data);
      }, error => {
      });
  }

  /**
   * this function load the all the symbols stored in the localstorage when this component is displayed.
   */
  load_localstorage(){
    let temp = localStorage.getItem('symbol');
    if (temp != null) {
      this.stored_symbol = JSON.parse(temp);
    }
  }

  /**
   * this function call two others functions from api.service in order to delete one stock in the list of
   * the displayed stocks through id
   * @param id the id of the stock to delete.
   */
  toggleElement(id: number) {
    this.array_data = this.api.deleteStockDetail(id);
    this.stockNameData = this.api.deleteStockName(id);
  }
}
