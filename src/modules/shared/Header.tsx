import React from "react";
import { useAppSelector, useAppDispatch } from "redux/store";
import { selectIsLoggedIn, logoutUser } from "redux/userSlice";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/editor">
                  <i className="ion-compose"></i>&nbsp;New Article
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/settings">
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Sign in
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Sign up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
