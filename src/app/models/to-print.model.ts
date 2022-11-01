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
