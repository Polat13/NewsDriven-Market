import { http } from "../../../shared/api/httpClient";

export const newsApi = {
  list: ({ symbol = "", from, to, page = 1, limit = 30 } = {}) => {
    const params = new URLSearchParams();
    if (symbol) params.set("symbol", symbol);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    params.set("page", String(page));
    params.set("limit", String(limit));

    return http(`/news?${params.toString()}`);
  },

  detail: (id) => http(`/news/${id}`),
};
