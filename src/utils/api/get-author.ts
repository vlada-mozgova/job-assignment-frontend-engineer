import { BASE_URL } from "utils/constants";
import { ProfileAuthor } from "utils/types";

export const getAuthor = async (token: string, username: string): Promise<ProfileAuthor> => {
  const response = await fetch(`${BASE_URL}/api/profiles/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token: ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get author");
  }

  const data = await response.json();
  return data.profile;
};
