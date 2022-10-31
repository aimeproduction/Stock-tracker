import { Component, OnInit } from '@angular/core';
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiService} from "../backend/api.service";

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
  url_sentiment_detail: string = '';
  data!: SentimentDetail;
  symbol: string = '';
  description: string='';
  api_key: string = 'bu4f8kn48v6uehqi3cqg';
  data_to_print: ToPrint[] = [];
  change_month1!: string;
  change_month2!: string;
  change_month3!: string;
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

  get_data(): Observable<SentimentDetail> {
    this.url_sentiment_detail = 'https://finnhub.io/api/v1//stock/insider-sentiment?symbol='+ this.symbol+'&from=2015-01-01&to=2022-03-01&token='+ this.api_key;
    return this.http.get<SentimentDetail>(this.url_sentiment_detail).pipe(
      tap((res: SentimentDetail) => {
        this.data=res;
        console.log(this.data);
         this.to_print();
        return res;
      }))
  }
  to_print(){
    for(let i =0; i<this.data.data.length; i++){
      if(this.data.data[i].year === 2022){
        this.data_to_print.push(this.data.data[i]);
      }
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
      if(this.data_to_print[0].month ==1 && this.data_to_print[1].month ==2){
        this.change_month1 = JSON.stringify(this.data_to_print[0].change);
        this.change_month2 = JSON.stringify(this.data_to_print[1].change);
        this.change_month3 = 'No data';

        this.mspr_month1 =   JSON.stringify(this.data_to_print[0].mspr);
        this.mspr_month2 =   JSON.stringify(this.data_to_print[1].mspr);
        this.mspr_month3 =   'No data';
      }
      else if(this.data_to_print[0].month ==1 && this.data_to_print[1].month ==3){
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
      if(this.data_to_print[0].month ==1){
        this.change_month1 = JSON.stringify(this.data_to_print[0].change);
        this.change_month2 = 'No data';
        this.change_month3 = 'No data';

        this.mspr_month1 =   JSON.stringify(this.data_to_print[0].mspr);
        this.mspr_month2 =   'No data';
        this.mspr_month3 =   'No data';
      }
      else if(this.data_to_print[0].month ==2){
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
