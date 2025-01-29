import React from "react";

const Tags: React.FC = () => {
  const tags: string[] = ["programming", "javascript", "emberjs", "angularjs", "react", "mean", "node", "rails"];

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags.map((tag: string) => (
          <React.Fragment key={tag}>
            <a href="#" className="tag-pill tag-default">
              {tag}
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Tags;
