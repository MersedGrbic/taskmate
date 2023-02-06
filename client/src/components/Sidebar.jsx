import React from "react";
import { FaBars } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import shapeOne from "../images/shape_one.svg";
import shapeTwo from "../images/shape_two.svg";
import shapeThree from "../images/shape_three.svg";
import shapeFour from "../images/shape_four.svg";
import shapeFive from "../images/shape_five.svg";
import shapeSix from "../images/shape_six.svg";
import shapeSeven from "../images/shape_seven.svg";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const [isActive, setIsActive] = React.useState(0);
  const [wideSideBar, setWideSideBar] = React.useState(false);
  const setActiveLink = (num) => {
    setIsActive(num);
  };
  const setWideNavBar = () => {
    setWideSideBar((prevState) => !prevState);
  };

  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: shapeOne,
    },
    {
      path: "/about",
      name: "About",
      icon: shapeTwo,
    },
    {
      path: "/mylist",
      name: "My List",
      icon: shapeThree,
    },
    {
      path: "/friends ",
      name: "Friends",
      icon: shapeFour,
    },
    {
      path: "/history",
      name: "History",
      icon: shapeFive,
    },
    {
      path: "/myprofile",
      name: "My Profile",
      icon: shapeSix,
    },
    {
      path: "/savednotes",
      name: "Saved notes & comments",
      icon: shapeSeven,
    },
  ];
  return (
    <div className="nav-container" style={{ width: wideSideBar ? "" : "40px" }}>
      <div className="sidebar">
        <div className="top-section">
          {wideSideBar && (
            <div className="logo">
              <div className="logo-icon">
                <div className="logo-icon-two"></div>
              </div>
              <h1 className="">taskmate</h1>
            </div>
          )}
          <FaBars className="hamburger-button" onClick={setWideNavBar} />
        </div>
        {menuItem.map((item, index) => {
          if (wideSideBar) {
            return (
              <NavLink
                to={item.path}
                key={index}
                className={index == isActive ? "links active-link" : "links"}
                onClick={() => setActiveLink(index)}
              >
                <img className="link-img" src={item.icon} />
                <p>{item.name}</p>
              </NavLink>
            );
          } else {
            return (
              <NavLink
                to={item.path}
                key={index}
                className={index == isActive ? "links active-link" : "links"}
                style={{ width: "28px" }}
                onClick={() => setActiveLink(index)}
              >
                <img className="link-img" src={item.icon} />
              </NavLink>
            );
          }
        })}
        <LogoutButton />
      </div>
    </div>
  );
};
export default Sidebar;
