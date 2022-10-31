import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

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

export interface DataDetail {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

export interface StockNameData {
  symbol:string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url_stock_name: string ='';
  url_stock_detail: string ='';
  symbol!: string;
  description!: string;
  stockNameData: StockNameData [] = [];
  api_key: string = 'bu4f8kn48v6uehqi3cqg';
  BASEURL: string = 'https://finnhub.io/api/v1';
  public array_data: DataDetail[] = [];
  symbol_sentiment : string= ''
  description_sentiment: string ='';
  constructor(private http: HttpClient) {
  }

  get_symbol(symbol: string, description: string): string{
    this.symbol_sentiment = symbol;
    this.description_sentiment = description;
    console.log('test'+ symbol)
  return symbol;
}

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
