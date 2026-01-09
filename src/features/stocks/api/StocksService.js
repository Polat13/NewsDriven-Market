import { API_CONFIG } from "../../../shared/config/api.config";
import { http } from "../../../shared/api/httpClient";

const MOCK_STOCKS = {
  items: [
    { symbol: "AAPL", name: "Apple Inc" },
    { symbol: "MSFT", name: "Microsoft" },
    { symbol: "TSLA", name: "Tesla" },
  ],
};

export const stocksApi = {
  list: async () => {
    // 🧪 MOCK MODE
    if (API_CONFIG.MODE === "mock") {
      return new Promise((resolve) =>
        setTimeout(() => resolve(MOCK_STOCKS), 400)
      );
    } 

    // 🌍 REAL BACKEND
    return http("/stocks");
  },
};
