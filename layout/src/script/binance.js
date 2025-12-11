// получение всех валют


async function getBinanceCoins() {
    const res = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    const data = await res.json();

    const assets = new Set();

    data.symbols.forEach(s => {
        assets.add(s.baseAsset);
        assets.add(s.quoteAsset);
    });

    const list = Array.from(assets);

    console.log("Валют на Binance:", list.length);
    console.log(list);

    return list;
}

getBinanceCoins();

// получение пары

async function getPrice(symbol) {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;

    const res = await fetch(url);
    const data = await res.json();

    console.log(`Пара ${data.symbol}, цена: ${data.price}`);
    return data;
}

// ETH/BTC → ETHBTC
getPrice("ETHBTC");