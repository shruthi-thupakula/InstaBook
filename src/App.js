import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { TopNavBar } from "./components/TopNav";
import { SideBar } from "./components/SideBar";
import { CssBaseline } from "@material-ui/core";
import clsx from "clsx";
import {
  PhotoLibraryRounded,
  AspectRatioRounded,
  PeopleRounded,
  WorkRounded,
  AccountCircleRounded,
  PowerSettingsNewRounded
} from "@material-ui/icons";
import Feed from "./Feed/index.js";
import Album from "./Album/index.js";
import Friends from "./Friends/index.js";
import Tasks from "./Tasks/index.js";
import Myprofile from "./MyProfile/index.js";
import PostComments from "./Feed/PostComments";
import photos from "./Album/Photos";
import UserPosts from "./Friends/UserPosts";
import Login from "./Login/index.js";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export const menu = [
  {
    text: "Albums",
    icon: <PhotoLibraryRounded />,
    path: "/albums",
    component: Album
  },
  {
    text: "Feed",
    icon: <AspectRatioRounded />,
    path: "/feed",
    component: Feed
  },
  {
    text: "Friends",
    icon: <PeopleRounded />,
    path: "/friends",
    component: Friends
  },
  {
    text: "Tasks",
    icon: <WorkRounded />,
    path: "/tasks",
    component: Tasks
  },
  {
    text: "My Profile",
    icon: <AccountCircleRounded />,
    path: "/myProfile",
    component: Myprofile
  }
];

export const logoutItem = {
  text: "Logout",
  icon: <PowerSettingsNewRounded />
};

export const secondMenu = [];

function App() {
  const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = useState({
    isLoggedIn: false,
    email: "test@test.com",
    password: "password"
  });

  // const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChangeLoginState = status => {
    setState(prevState => ({
      ...prevState,
      isLoggedIn: status
    }));
  };

  return state.isLoggedIn ? (
    <Router>
      <div className="App">
        {/* <Route path="/login" component={Login} /> */}
        {/* {!location.pathname.includes("login") && ( */}
        <div className={classes.root}>
          <CssBaseline />
          <TopNavBar
            theme={theme}
            classes={classes}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
            open={true}
          />
          <SideBar
            classes={classes}
            theme={theme}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
            open={open}
            handleChangeLoginState={handleChangeLoginState}
          />
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: true
            })}
          >
            <div className={classes.drawerHeader} />
            <Switch>
              <Route
                path="/"
                exact
                render={props => <Redirect {...props} to={"/albums"} />}
              />
              <Route path="/post/:post" component={PostComments} />
              <Route path="/album/:albumId" component={photos} />
              <Route path="/user/:user" component={UserPosts} />
              {/* <Route path="/login" component={Login} /> */}

              {menu.map((menuItem, index) => (
                <Route
                  key={index}
                  path={menuItem.path}
                  component={menuItem.component}
                />
              ))}
            </Switch>
          </main>
        </div>
        {/* )} */}
      </div>
    </Router>
  ) : (
    <Login handleChangeLoginState={handleChangeLoginState} data={state} />
  );
}

export default App;
