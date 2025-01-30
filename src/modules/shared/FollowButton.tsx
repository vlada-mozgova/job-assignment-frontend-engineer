import React from "react";
import { useAppSelector } from "redux/store";
import { selectUser } from "redux/userSlice";

type FollowButtonProps = {
  author: {
    username: string;
    following: boolean;
  };
  handleFollowAuthor: (username: string, following: boolean) => void;
};

const FollowButton: React.FC<FollowButtonProps> = ({ author, handleFollowAuthor }) => {
  const user = useAppSelector(selectUser);
  //TODO: after implrmenting followers count, update this code to show the followers count of logged in user and not just hide the button
  if (user?.username === author.username) {
    return null;
  }

  return (
    <button
      className="btn btn-sm btn-outline-secondary"
      onClick={() => handleFollowAuthor(author.username, author.following)}
    >
      {author.following ? (
        <>Followed {author.username}</>
      ) : (
        <>
          <i className="ion-plus-round" />
          &nbsp; Follow {author.username}
        </>
      )}
    </button>
  );
};

export default FollowButton;
