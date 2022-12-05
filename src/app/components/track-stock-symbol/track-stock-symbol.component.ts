import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../service/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DataDetail} from "../../models/data-detail.model";
import {StockNameData} from "../../models/stock-name-data.model";

@Component({
  selector: 'app-track-stock-symbol',
  templateUrl: './track-stock-symbol.component.html',
  styleUrls: ['./track-stock-symbol.component.css']
})


export class TrackStockSymbolComponent implements OnInit {
  /**
   * @property form_search, The form that control the value enter by the user.
   * @property errorMessage to print an error when something goes wrong.
   */
  public form_search!: UntypedFormGroup;
  errorMessage: string = ''
  /**
   * @property stored_symbol, an array to store all the symbol enter by the user.
   * @property array_data, an array to store all the data(change, price etc.) from the api.
   * @property stockNameData, an array to store the symbols and the descriptions that are displayed.
   */
 // stored_symbol = [];
  array_data!: DataDetail [];
  stockNameData!: StockNameData [];

  constructor(private fb: UntypedFormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.form_search = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]]
    });
    // this.load_localstorage();

    /**
     * Here we load the data(Name, description, change etc.) stored in the localstorage.
     */
    this.stockNameData = JSON.parse(<string>localStorage.getItem('stockName'));
    this.array_data = JSON.parse(<string>localStorage.getItem('data'));

  }

  /**
   * This function call the function "get_stock_name" from the api.service to make a request with the symbol enter by the user
   * @param symbol the symbol enter by the user
   */
  get_stock_name(symbol: string) {
    this.api.get_stock_name(symbol.toUpperCase()).subscribe({
      next: () => {
        this.stockNameData = JSON.parse(<string>localStorage.getItem('stockName'));
        this.errorMessage = '';
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = "Sorry, it was impossible to load the data for the stock: "+symbol;
      }
    });
  }

  /**
   * function to store the Name of the current stock between the list of stocks in order to print the sentiment details
   */
  get_symbol(symbol: string, description: string) {
    this.api.get_symbol(symbol, description);
  }

  /**
   * This function call the function "get_stock_detail" from the api.service to make a request with the symbol enter by the user.
   * @param symbol the symbol enter by the user.
   */
  get_stock_detail(symbol: string) {
    this.api.get_stock_detail(symbol).subscribe(() => {
      this.array_data = JSON.parse(<string>localStorage.getItem('data'));
      this.errorMessage = '';
    }, error => {
      this.errorMessage = "Sorry, it was impossible to load the data in details.  " + error.message;

    });
  }

 /* /!**
   * this function load the all the symbols stored in the localstorage when this component is displayed.
   *!/
  load_localstorage() {
    let temp = localStorage.getItem('symbol');
    if (temp != null) {
      this.stored_symbol = JSON.parse(temp);
    }
  }*/

  /**
   * this function call two others functions from api.service in order to delete one stock in the list of
   * the displayed stocks through id
   * @param id the id of the stock to delete.
   */
  toggleElement(id: number) {
    this.array_data = this.api.deleteStockDetail(id);
    this.stockNameData = this.api.deleteStockName(id);
    // location.reload();
  }
}
