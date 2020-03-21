import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { menu } from "../App";
import { useLocation } from "react-router-dom";

export const TopNavBar = props => {
  const { classes, open } = props;

  const location = useLocation();
  const _getName = () => {
    const currentMenuItem = menu.find(menuItem =>
      location.pathname.includes(menuItem.path)
    );

    if (currentMenuItem) {
      return currentMenuItem.text;
    } else return "Insta Book";
  };
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          {_getName()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
