import { FC } from "react";
import authorImage from "assets/images/author.svg";
import { ProfileAuthor } from "utils/types";
import { useAppSelector } from "redux/store";
import { selectUser } from "redux/userSlice";

type InfoProps = {
  profile: ProfileAuthor;
  handleFollowAuthor: (username: string, isFavorited: boolean) => Promise<void>;
};

const Info: FC<InfoProps> = ({ profile, handleFollowAuthor }) => {
  const user = useAppSelector(selectUser);

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.image || authorImage} className="user-img" />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            {user?.username != profile.username && (
              <button
                className="btn btn-sm btn-outline-secondary action-btn"
                onClick={() => handleFollowAuthor(profile.username, profile.following)}
              >
                {profile.following ? (
                  <>Followed {profile.username}</>
                ) : (
                  <>
                    <i className="ion-plus-round" />
                    &nbsp; Follow {profile.username}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
