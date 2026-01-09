import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

export  function AnalysisImpactChart({ labels, values }) {
  // Data object'i her render'da yenisi oluş (Chart.js algılayabilsin)
  const data = useMemo(() => ({
    labels, // ör: ["D+1", "D+2", "D+3"]
    datasets: [
      {
        label: "Getiri (%)",
        data: values, // ör: [1.2, -0.4, 0.9]
        backgroundColor: "rgba(59, 130, 246, 0.8)", // blue-500
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }), [labels, values]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          maxTicksLimit: 3, // Mobilde az ticket göster
          autoSkip: true,
        },
      },
      y: { ticks: { callback: (v) => `${v}%` } },
    },
  }), []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 overflow-hidden">
      <div className="text-sm font-semibold text-gray-800">Haber Etkisi</div>
      <div className="h-56 sm:h-52 mt-3">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default AnalysisImpactChart;