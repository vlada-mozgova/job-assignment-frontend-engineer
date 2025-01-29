import Comment from "modules/articles/Single/Comment";
import { FC } from "react";

const comments = [
  {
    text: "With supporting text below as a natural lead-in to additional content.",
    author: "Jacob Schmidt",
    date: "Dec 29th",
    imgSrc: "http://i.imgur.com/Qr71crq.jpg",
    hasModOptions: false,
  },
  {
    text: "With supporting text below as a natural lead-in to additional content.",
    author: "Jacob Schmidt",
    date: "Dec 29th",
    imgSrc: "http://i.imgur.com/Qr71crq.jpg",
    hasModOptions: true,
  },
];

const Comments: FC = () => {
  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <form className="card comment-form">
        <div className="card-block">
          <textarea className="form-control" placeholder="Write a comment..." rows={3} />
        </div>
        <div className="card-footer">
          <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
          <button className="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>

      {comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </div>
  );
};

export default Comments;
