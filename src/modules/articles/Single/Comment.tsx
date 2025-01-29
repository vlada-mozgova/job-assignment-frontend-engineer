import { FC } from "react";

export type CommentProps = {
  imgSrc: string;
  author: string;
  date: string;
  text: string;
};

const Comment: FC<CommentProps> = ({ author, date, imgSrc, text }) => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{text}</p>
      </div>
      <div className="card-footer">
        <a href={`/profile/${author}`} className="comment-author">
          <img src={imgSrc} className="comment-author-img" />
        </a>
        &nbsp;
        <a href={`/profile/${author}`} className="comment-author">
          {author}
        </a>
        <span className="date-posted">{date}</span>
        <span className="mod-options">
          <i className="ion-edit" />
          <i className="ion-trash-a" />
        </span>
      </div>
    </div>
  );
};

export default Comment;
