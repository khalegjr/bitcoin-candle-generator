import CandleColor from "../enums/CandleColor";

export default class Candle {
  low: number;
  high: number;
  open: number;
  close: number;
  color: CandleColor;
  initialDateTime: Date;
  finalDateTime: Date;
  values: number[];
  currency: string;

  constructor(currency: string, initialDateTime: Date) {
    this.currency = currency;
    this.initialDateTime = initialDateTime;
    this.low = Infinity;
    this.high = 0;
    this.close = 0;
    this.open = 0;
    this.values = [];
    this.color = CandleColor.UNDETERMINED;
  }
}
