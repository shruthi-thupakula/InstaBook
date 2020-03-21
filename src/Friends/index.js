import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  CardContent,
  Typography,
  Card,
  Box,
  CardHeader,
  Avatar
} from "@material-ui/core";
import { getRandomColor } from "../utils";

export default class Friends extends React.Component {
  constructor() {
    super();
    this.state = { users: [], isLoaded: 0 };
    this.getUser = this.getUser.bind(this);
  }
  async getUser() {
    await fetch(
      `https://jsonplaceholder.typicode.com/users/?_limit=5_&start=${this.state.isLoaded}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          ...prevState,
          users: [...prevState.users, ...data],
          isLoaded: prevState.isLoaded + 5
        }));
      });
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <div style={{ textAlign: "left", fontSize: "17px" }}>
        {// this && */}
        // this.state &&
        // this.state.user &&
        this.state.users.map((user, pIndex) => (
          <Card key={pIndex} style={{ margin: "15px" }}>
            <Box display="flex" justifyContent="space-between">
              <Box
                key={user.username}
                style={{ marginLeft: "25px" }}
                textAlign="left"
              >
                <CardHeader
                  avatar={
                    <Avatar
                      fontSize="small"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                  }
                  title={user.name}
                  subheader={user.email}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    @{user.username}
                  </Typography>
                </CardContent>
              </Box>
              <Link
                style={{ textDecoration: "none" }}
                to={`/user/${JSON.stringify(user)}`}
              >
                <Box textAlign="right" mt={6} mr={2}>
                  <Button size="small" variant="outlined">
                    View his Posts
                  </Button>
                </Box>
              </Link>
            </Box>
          </Card>
        ))}
        <Box textAlign="right" mb={2} mr={2}>
          <Button
            onClick={() => this.getUser()}
            size="small"
            variant="outlined"
          >
            Load More
          </Button>
        </Box>
      </div>
    );
  }
}
