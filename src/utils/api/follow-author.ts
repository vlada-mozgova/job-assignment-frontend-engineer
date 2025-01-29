import { BASE_URL } from "utils/constants";
import { Profile } from "utils/types";

export const followAuthor = async (token: string, username: string, isFollowed: boolean): Promise<Profile> => {
  const response = await fetch(`${BASE_URL}/api/profiles/${username}/follow`, {
    method: isFollowed ? "DELETE" : "POST",
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
