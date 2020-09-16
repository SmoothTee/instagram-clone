import React from "react";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutAction } from "../../redux/auth/actions";
import { useTypedSelector } from "../../redux/hooks";
import { Button } from "../Button";

import styles from "./NavBar.module.css";

export const NavBar = () => {
  const dispatch = useDispatch();

  const username = useTypedSelector((state) => state.auth.session?.username);

  return (
    <nav className={styles.nav_bar}>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to={`/profile/${username}`}
      >
        <AiOutlineUser />
      </NavLink>
      <NavLink
        className={styles.link}
        activeClassName={styles.active}
        to="/settings/edit"
      >
        <AiOutlineSetting />
      </NavLink>
      <Button onClick={() => dispatch(logoutAction())}>Log Out</Button>
    </nav>
  );
};
