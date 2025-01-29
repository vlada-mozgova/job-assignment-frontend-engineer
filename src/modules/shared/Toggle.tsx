import React from "react";

type ToggleProps = {
  isGlobalFeed: boolean;
  onToggleFeed: (isGlobal: boolean) => void;
  tabs: string[];
};

const Toggle: React.FC<ToggleProps> = ({ isGlobalFeed, onToggleFeed, tabs }) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a className={`nav-link ${!isGlobalFeed ? "active" : ""}`} href="#" onClick={() => onToggleFeed(false)}>
            {tabs[0]}
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${isGlobalFeed ? "active" : ""}`} href="#" onClick={() => onToggleFeed(true)}>
            {tabs[1]}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Toggle;
