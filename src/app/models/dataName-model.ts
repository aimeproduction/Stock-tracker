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
