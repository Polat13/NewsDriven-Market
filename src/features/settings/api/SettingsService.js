import { http } from "../../../shared/api/httpClient";

export function getMe() {
  return http("/users/me");
}

export function updateMe(payload) {
  return http("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
