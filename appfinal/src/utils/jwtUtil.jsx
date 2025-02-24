import { jwtDecode } from "jwt-decode";

const getPayload = (token, key) => {
  if (!token) {
    return null;
  }
  const payload = jwtDecode(token);
  return key ? payload[key] : payload;
};

export { getPayload };
