import { config } from "dotenv";
import axios from "axios";
import Period from "./enums/Period";
import Candle from "./models/Candle";

config();

const readMarktPrice = async (): Promise<number> => {
  const result = await axios.get(process.env.PRICES_API);
  const data = result.data;
  const price = data.bitcoin.usd;

  return price;
};

const generateCandles = async () => {
  while (true) {
    // Para saber quantas leituras tem que fazer para gerar uma candle de 5 minutos com leitura de 10 em 10 segundos
    const loopTimes = Period.ONE_MINUTE / Period.TEN_SECONDS;
    const candle = new Candle("BTC", new Date());

    console.log("------------------------");
    console.log("Generating new candle");

    for (let i = 0; i < loopTimes; i++) {
      const price = await readMarktPrice();
      candle.addValue(price);
      console.log(`Market price #${i + 1} of ${loopTimes}`);

      // faz o script esperar por 10 segundos
      await new Promise((r) => setTimeout(r, Period.TEN_SECONDS));
    }

    candle.closeCandle();
    console.log("Candle close");
    console.log(candle.toSimpleObject());
  }
};

generateCandles();
