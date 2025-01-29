import { BASE_URL } from "../constants";
import { ProfileAuthor } from "../types";

export const followAuthor = async (token: string, username: string, isFollowed: boolean): Promise<ProfileAuthor> => {
  const method = isFollowed ? "DELETE" : "POST";
  const url = `${BASE_URL}/api/profiles/${username}/follow`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to follow author: ${errorData.message}`);
  }

  const data = await response.json();
  return data.profile;
};
