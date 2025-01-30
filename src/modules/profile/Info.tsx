import { FC } from "react";
import { ProfileAuthor } from "utils/types";
import FollowButton from "modules/shared/FollowButton";
import AuthorImage from "modules/shared/AuthorImage";

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
            <AuthorImage username={profile.username} image={profile.image} />
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
