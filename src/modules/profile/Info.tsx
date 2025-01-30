import { FC } from "react";
import authorImage from "assets/images/author.svg";
import { ProfileAuthor } from "utils/types";
import { useAppSelector } from "redux/store";
import { selectUser } from "redux/userSlice";
import FollowButton from "modules/shared/FollowButton";

type InfoProps = {
  profile: ProfileAuthor;
  handleFollowAuthor: (username: string, isFavorited: boolean) => Promise<void>;
};

const Info: FC<InfoProps> = ({ profile, handleFollowAuthor }) => {
  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.image || authorImage} className="user-img" />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>

            <FollowButton author={profile} handleFollowAuthor={handleFollowAuthor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
