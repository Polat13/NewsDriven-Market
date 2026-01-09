// Seeded random generator
function seededRandom(seed) {
  const x = Math.sin(seed) * 10;
  return x - Math.floor(x);
}

export function makeFakeImpact(seed = "") {
  let seedCounter = seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  
  return {
    labels: ["D+1", "D+2", "D+3"],
    values: [
      Number(((seededRandom(++seedCounter) - 0.5) * 4).toFixed(2)),
      Number(((seededRandom(++seedCounter) - 0.5) * 4).toFixed(2)),
      Number(((seededRandom(++seedCounter) - 0.5) * 4).toFixed(2)),
    ],
  };
}