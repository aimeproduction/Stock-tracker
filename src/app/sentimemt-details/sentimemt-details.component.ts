import { Component, OnInit } from '@angular/core';
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiService} from "../backend/api.service";

/**
 * this interface specifies the structure of the expected data that will come from the api
 * concerning the data and the symbol.
 */
export interface SentimentDetail {
  data:[
    {
      change: number;
      month: number;
      mspr: number;
      symbol: string;
      year: number;
    }]
  symbol: string;
}

/**
 * this interface specifies the structure of the expected data that will come from the api
 * concerning the data to print (change, mspr) without a symbol value.
 */
export interface ToPrint {
  change: number;
  month: number;
  mspr: number;
  symbol: string;
  year: number;
}

@Component({
  selector: 'app-sentimemt-details',
  templateUrl: './sentimemt-details.component.html',
  styleUrls: ['./sentimemt-details.component.css']
})
export class SentimemtDetailsComponent implements OnInit {
  /**
   * @property data to store the data that come from the api.
   * @property symbol, description to store the values of the symbol and the description of the stock.
   */
  data!: SentimentDetail;
  symbol: string = '';
  description: string='';
  /**
   * @property BASEURL, api_key the key for the api and the first part of the url for the requests.
   * @property DATE, data_to_print Time interval of the data to be displayed and an array to store the data to display.
   */
  BASEURL: string = 'https://finnhub.io/api/v1';
  api_key: string = 'bu4f8kn48v6uehqi3cqg';
  DATE: string = '2022-08-01&to=2022-10-31';
  data_to_print: ToPrint[] = [];
  /**
   * @property change_month1, change_month2, and change_month3 to store the change values of the last three months.
   */
  change_month1!: string;
  change_month2!: string;
  change_month3!: string;
  /**
   * @property mspr_month1, mspr_month2, and mspr_month3 to store the mspr values of the last three months.
   */
  mspr_month1!: string;
  mspr_month2!: string;
  mspr_month3!: string;
  temp =''

  constructor(private http: HttpClient, private api: ApiService) {
  }

  ngOnInit(): void {
    this.description = this.api.description_sentiment;
   this.symbol=this.api.symbol_sentiment;
    localStorage.setItem("description", JSON.stringify(this.description));
    this.temp = JSON.parse(<string>localStorage.getItem('description'));
    this.get_data().subscribe((res) => {
        this.data = res;
      },
      error => {
        alert("wrong");
      })
  }

  /**
   * this function get the sentiment details of the last three months of the selected stock by the user.
   */
  get_data(): Observable<SentimentDetail> {
    return this.http.get<SentimentDetail>( `${this.BASEURL}/stock/insider-sentiment?symbol=${this.symbol}&from=${this.DATE}&token=${this.api_key}`).pipe(
      tap((res: SentimentDetail) => {
        this.data=res;
        console.log(this.data);
         this.to_print();
        return res;
      }))
  }

  /**
   * this function check if we have the data of the last three months. If we have the data of the last three
   * months, we displayed these. But if we just have the data of 2 months, we we look for the month that
   * has no data and this month will take the value 'No data'. If we just have the data of 1 month, we look for
   * the month with data and the other months without data will take the value. And if there is no data available
   * for the last 3 months, all the values will be 'No data'
   */
  to_print(){
    for(let i =0; i<this.data.data.length; i++){
        this.data_to_print.push(this.data.data[i]);
    }
    console.log(this.data_to_print)
    if(this.data_to_print.length ==3){
      this.change_month1 = JSON.stringify(this.data_to_print[0].change);
      this.change_month2 = JSON.stringify(this.data_to_print[1].change);
      this.change_month3 = JSON.stringify(this.data_to_print[2].change);
      this.mspr_month1 =   JSON.stringify(this.data_to_print[0].mspr);
      this.mspr_month2 =   JSON.stringify(this.data_to_print[1].mspr);
      this.mspr_month3 =   JSON.stringify(this.data_to_print[2].mspr);
    }
    else if(this.data_to_print.length ==2){
      if(this.data_to_print[0].month ==8 && this.data_to_print[1].month ==9){
        this.change_month1 = JSON.stringify(this.data_to_print[0].change);
        this.change_month2 = JSON.stringify(this.data_to_print[1].change);
        this.change_month3 = 'No data';

        this.mspr_month1 =   JSON.stringify(this.data_to_print[0].mspr);
        this.mspr_month2 =   JSON.stringify(this.data_to_print[1].mspr);
        this.mspr_month3 =   'No data';
      }
      else if(this.data_to_print[0].month ==8 && this.data_to_print[1].month ==10){
        this.change_month1 = JSON.stringify(this.data_to_print[0].change);
        this.change_month2 = 'No data';
        this.change_month3 = JSON.stringify(this.data_to_print[1].change);

        this.mspr_month1 =   JSON.stringify(this.data_to_print[0].mspr);
        this.mspr_month2 =   'No data';
        this.mspr_month3 =   JSON.stringify(this.data_to_print[1].mspr);
      }
      else {
        this.change_month1 = 'No data';
        this.change_month2 = JSON.stringify(this.data_to_print[0].change);
        this.change_month3 = JSON.stringify(this.data_to_print[1].change);

        this.mspr_month1 =   'No data';
        this.mspr_month2 =   JSON.stringify(this.data_to_print[0].mspr);
        this.mspr_month3 =   JSON.stringify(this.data_to_print[1].mspr);
      }
    }
    else if(this.data_to_print.length ==1) {
      if(this.data_to_print[0].month ==8){
        this.change_month1 = JSON.stringify(this.data_to_print[0].change);
        this.change_month2 = 'No data';
        this.change_month3 = 'No data';

        this.mspr_month1 =   JSON.stringify(this.data_to_print[0].mspr);
        this.mspr_month2 =   'No data';
        this.mspr_month3 =   'No data';
      }
      else if(this.data_to_print[0].month ==9){
        this.change_month1 = 'No data';
        this.change_month2 = JSON.stringify(this.data_to_print[0].change);
        this.change_month3 = 'No data';

        this.mspr_month1 =   'No data';
        this.mspr_month2 =   JSON.stringify(this.data_to_print[0].mspr);
        this.mspr_month3 =   'No data';
      }
      else{
        this.change_month1 = 'No data';
        this.change_month2 = 'No data';
        this.change_month3 = JSON.stringify(this.data_to_print[0].change);

        this.mspr_month1 =   'No data';
        this.mspr_month2 =   'No data';
        this.mspr_month3 =   JSON.stringify(this.data_to_print[0].mspr);
      }
    }
    else{
      this.change_month1 = 'No data';
      this.change_month2 = 'No data';
      this.change_month3 = 'No data';

      this.mspr_month1 =   'No data';
      this.mspr_month2 =   'No data';
      this.mspr_month3 =   'No data';
    }
  }
}
