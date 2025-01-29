import React, { useState, useEffect } from "react";
import { useAppSelector } from "redux/store";
import { selectIsLoggedIn } from "redux/userSlice";
import { ProfileAuthor } from "utils/types";
import Info from "modules/profile/Info";
import { useParams } from "react-router-dom";
import Profile from "modules/profile/Profile";
import { getAuthor } from "utils/api/get-author";
import { followAuthor } from "utils/api/follow-author";

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileAuthor>();

  const userToken: string | undefined = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (userToken && username) {
      const fetchData = async () => {
        const response = await getAuthor(userToken, username);
        setProfile(response);
      };
      fetchData();
    }
  }, [username]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleFollowAuthor = async (username: string, isFavorited: boolean) => {
    const res = await followAuthor(userToken!, username, isFavorited);
    setProfile({ ...res });
  };

  return (
    <div className="profile-page">
      <Info profile={profile} handleFollowAuthor={handleFollowAuthor} />
      <Profile username={username || ""} />
    </div>
  );
};

export default ProfilePage;
