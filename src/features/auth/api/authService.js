import { http, setToken, clearToken } from "../../../shared/api/httpClient";

function pickToken(data) {
  return (
    data?.token ||
    data?.accessToken ||
    data?.access_token ||
    data?.jwt ||
    data?.jwtToken ||
    null
  );
}

export const authApi = {
  login: async ({ email, password }) => {
    const data = await http("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const token = pickToken(data);
    if (!token) throw new Error("Login response token bulunamadı (token/accessToken...)");

    setToken(token);
    return data;
  },

  register: async ({ name, email, password }) => {
    const data = await http("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const token = pickToken(data);
    if (!token) throw new Error("Register response token bulunamadı");

    setToken(token);
    return data;
  },

me: async () => {
  try {
    return await http("/users/me");
  } catch {
    clearToken();
    throw new Error("Session expired");
  }
}
}
