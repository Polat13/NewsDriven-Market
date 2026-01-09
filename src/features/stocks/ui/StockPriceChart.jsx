import { Line } from "react-chartjs-2";
import { useMemo } from "react";

export default function StockPriceChart({ labels, prices }) {
  // Data object'i her render'da yenisi oluş (Chart.js algılayabilsin)
  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: "Price",
        data: prices,
        tension: 0.25,
        fill: true,
        borderColor: "rgba(59, 130, 246, 1)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(59, 130, 246, 1)",
        pointBorderColor: "rgba(59, 130, 246, 1)",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }), [labels, prices]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 5, // Mobilde az ticket göster
          autoSkip: true,
        },
      },
      y: { ticks: { callback: (v) => `$${v}` } },
    },
  }), []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 overflow-hidden">
      <div className="text-sm font-semibold text-gray-800">Fiyat Grafiği</div>
      <div className="h-64 sm:h-60 mt-3">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
