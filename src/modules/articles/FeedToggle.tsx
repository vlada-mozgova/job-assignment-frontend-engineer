import React from "react";

type FeedToggleProps = {
  isGlobalFeed: boolean;
  onToggleFeed: (isGlobal: boolean) => void;
};

const FeedToggle: React.FC<FeedToggleProps> = ({ isGlobalFeed, onToggleFeed }) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a className={`nav-link ${!isGlobalFeed ? "active" : ""}`} href="#" onClick={() => onToggleFeed(false)}>
            Your Feed
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${isGlobalFeed ? "active" : ""}`} href="#" onClick={() => onToggleFeed(true)}>
            Global Feed
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FeedToggle;
