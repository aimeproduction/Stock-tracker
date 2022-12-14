import {Component, OnInit} from '@angular/core';
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiService} from "../../service/api.service";
import {SentimentDetail} from "../../models/sentiment-detail.model";
import {ToPrint} from "../../models/to-print.model";

@Component({
  selector: 'app-sentimemt-',
  templateUrl: './sentimemt.component.html',
  styleUrls: ['./sentimemt.component.css']
})
export class SentimemtComponent implements OnInit {
  /**
   * @property data, errorMessage to store the data that come from the api and to print an error when something goes wrong.
   * @property symbol, description to store the values of the symbol and the description of the stock.
   */
  data!: SentimentDetail;
  errorMessage = ''
  symbol: string = '';
  description: string = '';
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
  change_month1!: number;
  change_month2!: number;
  change_month3!: number;
  /**
   * @property mspr_month1, mspr_month2, and mspr_month3 to store the mspr values of the last three months.
   */
  mspr_month1!: number;
  mspr_month2!: number;
  mspr_month3!: number;
  temp = ''

  constructor(private http: HttpClient, private api: ApiService) {
  }

  ngOnInit(): void {
    this.description = this.api.description_sentiment;
    this.symbol = this.api.symbol_sentiment;

    this.get_data().subscribe((res) => {
      this.data = res;
    }, error => {
      this.errorMessage = "Sorry, it was impossible to load the sentiment details.  " + error.message;
    });
    localStorage.setItem("description1", JSON.stringify(this.description));
    this.temp = JSON.parse(<string>localStorage.getItem('description1'));
    console.log(this.temp)
  }

  /**
   * this function get the sentiment details of the last three months of the selected stock by the user.
   */
  get_data(): Observable<SentimentDetail> {
    return this.http.get<SentimentDetail>(`${this.BASEURL}/stock/insider-sentiment?symbol=${this.symbol}&from=${this.DATE}&token=${this.api_key}`).pipe(
      tap((res: SentimentDetail) => {
        this.data = res;
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
  to_print() {
    for (let i = 0; i < this.data.data.length; i++) {
      this.data_to_print.push(this.data.data[i]);
    }
    if (this.data_to_print.length == 3) {
      this.change_month1 = this.data_to_print[0].change;
      this.change_month2 = this.data_to_print[1].change;
      this.change_month3 = this.data_to_print[2].change;
      this.mspr_month1 = this.data_to_print[0].mspr;
      this.mspr_month2 = this.data_to_print[1].mspr;
      this.mspr_month3 = this.data_to_print[2].mspr;
    } else if (this.data_to_print.length == 2) {
      if (this.data_to_print[0].month == 8 && this.data_to_print[1].month == 9) {
        this.change_month1 = this.data_to_print[0].change;
        this.change_month2 = this.data_to_print[1].change;
        this.change_month3 = 0;

        this.mspr_month1 = this.data_to_print[0].mspr;
        this.mspr_month2 = this.data_to_print[1].mspr;
        this.mspr_month3 = 0;
      } else if (this.data_to_print[0].month == 8 && this.data_to_print[1].month == 10) {
        this.change_month1 = this.data_to_print[0].change;
        this.change_month2 = 0;
        this.change_month3 = this.data_to_print[1].change;

        this.mspr_month1 = this.data_to_print[0].mspr;
        this.mspr_month2 = 0;
        this.mspr_month3 = this.data_to_print[1].mspr;
      } else {
        this.change_month1 = 0;
        this.change_month2 = this.data_to_print[0].change;
        this.change_month3 = this.data_to_print[1].change;

        this.mspr_month1 = 0;
        this.mspr_month2 = this.data_to_print[0].mspr;
        this.mspr_month3 = this.data_to_print[1].mspr;
      }
    } else if (this.data_to_print.length == 1) {
      if (this.data_to_print[0].month == 8) {
        this.change_month1 = this.data_to_print[0].change;
        this.change_month2 = 0;
        this.change_month3 = 0;

        this.mspr_month1 = this.data_to_print[0].mspr;
        this.mspr_month2 = 0;
        this.mspr_month3 = 0;
      } else if (this.data_to_print[0].month == 9) {
        this.change_month1 = 0;
        this.change_month2 = this.data_to_print[0].change;
        this.change_month3 = 0;

        this.mspr_month1 = 0;
        this.mspr_month2 = this.data_to_print[0].mspr;
        this.mspr_month3 = 0;
      } else {
        this.change_month1 = 0;
        this.change_month2 = 0;
        this.change_month3 = this.data_to_print[0].change;

        this.mspr_month1 = 0;
        this.mspr_month2 = 0;
        this.mspr_month3 = this.data_to_print[0].mspr;
      }
    } else {
      this.change_month1 = 0;
      this.change_month2 = 0;
      this.change_month3 = 0;

      this.mspr_month1 = 0;
      this.mspr_month2 = 0;
      this.mspr_month3 = 0;
    }
  }
}
