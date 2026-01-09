// Seeded random generator: aynı seed her zaman aynı sonuç verir
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function makeFakeSeries(days = 30, start = 150, seed = "") {
  const labels = [];
  const prices = [];

  let p = start;
  let seedCounter = seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    labels.push(d.toISOString().slice(0, 10)); // YYYY-MM-DD
    seedCounter++;
    const randomValue = seededRandom(seedCounter);
    p = Math.max(1, p + (randomValue - 0.5) * 3); // seed-based dalgalanma
    prices.push(Number(p.toFixed(2)));
  }

  return { labels, prices };
}
