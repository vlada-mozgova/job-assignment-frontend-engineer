import { FormValues } from "modules/user/Login";
import { User } from "modules/user/Profile";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export const loginRequest = async (user: FormValues): Promise<User> => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: { email: user.email, password: user.password } }),
  });

  if (!response.ok) {
    throw new Error("Failed to log in");
  }

  const data = await response.json();
  return data.user;
};
