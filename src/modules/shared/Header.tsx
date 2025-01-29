import React from "react";
import { useAppSelector, useAppDispatch } from "redux/store";
import { selectIsLoggedIn, logoutUser } from "redux/userSlice";

type NavItem = {
  label: string;
  link: string;
  icon?: string;
  onClick?: () => void;
};

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const userToken: string | undefined = useAppSelector(selectIsLoggedIn);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
  };

  const navItems: NavItem[] = userToken
    ? [
        { label: "Home", link: "/" },
        { label: "New Article", link: "/editor", icon: "ion-compose" },
        { label: "Settings", link: "/settings", icon: "ion-gear-a" },
        { label: "Logout", link: "/", onClick: handleLogout },
      ]
    : [
        { label: "Home", link: "/" },
        { label: "Sign in", link: "/login" },
        { label: "Sign up", link: "/register" },
      ];

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          {navItems.map((item: NavItem, index: number) => (
            <li className="nav-item" key={index}>
              <a className="nav-link" href={item.link} onClick={item.onClick}>
                {item.icon && <i className={item.icon}></i>} {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
