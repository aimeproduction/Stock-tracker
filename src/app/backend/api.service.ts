import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

/**
 * this interface specifies the structure of the expected data that will come from the api
 * concerning the name amd the description.
 */
export interface DataName {
  count: number;
  result: [
    {
      description: string;
      displaySymbol: string;
      symbol: string;
      type: string;
    }
  ]
}

/**
 * this interface specifies the structure of the expected data that will come from the api
 * concerning the data(change, current price etc.) of a stock.
 */
export interface DataDetail {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

/**
 * An interface with exactly the infos that are needed: the symbol and the description
 */
export interface StockNameData {
  symbol:string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * @property symbol, description to store the symbol and the description of a stock.
   * @property api_key, BASEURL the key for the api and the first part of the url for the requests.
   *
   */
  symbol!: string;
  description!: string;
  api_key: string = 'bu4f8kn48v6uehqi3cqg';
  BASEURL: string = 'https://finnhub.io/api/v1';
  symbol_sentiment : string= ''
  description_sentiment: string ='';
  constructor(private http: HttpClient) {
  }

  /**
   * This function retrieves the symbol and description of the stock.
   * This information will then be used to display details of a stock.
   * @param symbol the symbol enter by the user
   * @param description the description of the stock
   */
  get_symbol(symbol: string, description: string): string{
    this.symbol_sentiment = symbol;
    this.description_sentiment = description;
    console.log('test'+ symbol)
  return symbol;
}

  /**
   *  This function search the name and the description of the stock from the api
   *  according to the symbol entered by the user. Then, the retrieved values are stored in the localstorage
   *  as an object with the structure of the interface StockNameData.
   * @param symbol the symbol enter by the user
   */
  get_stock_name(symbol: string): Observable<StockNameData> {
    return this.http.get<DataName>(`${this.BASEURL}/search?q=${symbol}&token=${this.api_key}`)
      .pipe(
        map((response: DataName) => {
          this.symbol = response.result[0].symbol;
          this.get_symbol(this.symbol, this.description);
          this.description = response.result[0].description;
          const current = JSON.parse(<string>localStorage.getItem("stockName")) ?? [];
          current.push(
            {
              symbol: response.result[0].symbol,
              description: response.result[0].description
            }
          );

          localStorage.setItem("stockName", JSON.stringify(current));

            return {
              symbol: response.result[0].symbol,
              description: response.result[0].description
            }
        })
      )
  }

  /**
   * This function get the data from the api according to the symbol entered by the user.
   * Then, the retrieved values are stored in the localstorage as an object with the structure of the interface DataDetail
   * @param symbol
   */
  get_stock_detail(symbol: string): Observable<DataDetail> {
    return this.http.get<DataDetail>(`${this.BASEURL}/quote?symbol=${symbol}&token=${this.api_key}`).pipe(
      tap((res: DataDetail) => {
        const current = JSON.parse(<string>localStorage.getItem("data")) ?? [];
        current.push(res);
        localStorage.setItem("data", JSON.stringify(current));
      }))
  }

  deleteStockDetail(index: number)  {
    const currentDataStockDetail = JSON.parse(<string>localStorage.getItem("data")) as DataDetail [];
    currentDataStockDetail.slice(index, 1);
    localStorage.setItem("data", JSON.stringify(currentDataStockDetail));
  }

  deleteStockName(index: number) {
    const currentStockName = JSON.parse(<string>localStorage.getItem("stockName")) as StockNameData [];
    currentStockName.slice(index, 1);
    localStorage.setItem("stockName", JSON.stringify(currentStockName));
  }


}
