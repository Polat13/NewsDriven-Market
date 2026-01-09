import { create } from "zustand";
import { authApi } from "../api/authService";
import { getToken, clearToken } from "../../../shared/api/httpClient";

function getErrorMessage(e, fallback) {
  return (
    e?.response?.data?.message ||
    e?.data?.message ||
    e?.message ||
    fallback
  );
}

export const useAuthStore = create((set, get) => ({
  user: null,
  status: "idle",
  error: null,

  async bootstrap() {
    const { status } = get();

    if (status !== "idle") return;

    const token = getToken();
    if (!token) {
      set({ user: null, status: "guest", error: null });
      return;
    }

    set({ status: "loading", error: null });

    try {
      const data = await authApi.me();
      const userData = data?.user || data;

      const current = get();
      if (current.status === "authed") return;

      set({ user: userData, status: "authed", error: null });
    } catch (e) {
      clearToken();

      const current = get();
      if (current.status === "guest") return;

      set({
        user: null,
        status: "guest",
        error: getErrorMessage(e, "Auth failed"),
      });
    }
  },

  async login(payload) {
    const { status } = get();
    if (status === "loading") return;

    set({ status: "loading", error: null });

    try {
      await authApi.login(payload);
      const me = await authApi.me();
      const userData = me?.user || me;

      set({ user: userData, status: "authed", error: null });
    } catch (e) {
      clearToken();
      set({
        user: null,
        status: "error",
        error: getErrorMessage(e, "Login failed"),
      });
      throw e;
    }
  },

  async register(payload) {
    const { status } = get();
    if (status === "loading") return;

    set({ status: "loading", error: null });

    try {
      await authApi.register(payload);
      const me = await authApi.me();
      const userData = me?.user || me;

      set({ user: userData, status: "authed", error: null });
    } catch (e) {
      clearToken();
      set({
        user: null,
        status: "error",
        error: getErrorMessage(e, "Register failed"),
      });
      throw e;
    }
  },

  async logout() {
    try {
      await authApi.logout();
    } finally {
      clearToken();

      const current = get();
      if (current.status === "guest") return;

      set({ user: null, status: "guest", error: null });
    }
  },
}));
