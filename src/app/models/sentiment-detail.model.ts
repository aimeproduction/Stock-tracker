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
