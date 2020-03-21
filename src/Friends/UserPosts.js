import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  CardContent,
  Card,
  Button,
  Box,
  Avatar,
  CardHeader
} from "@material-ui/core";
import { AspectRatioRounded } from "@material-ui/icons";

import { getRandomColor } from "../utils";
export default class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoaded: 0
    };
    this.getPosts = this.getPosts.bind(this);
  }
  getPosts = () => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?userId${
        JSON.parse(this.props.match.params.user).id
      }&&_limit=5_&start=${this.state.isLoaded}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          ...prevState,
          posts: [...prevState.posts, ...data],
          isLoaded: prevState.isLoaded + 5
        }));
      });
  };
  componentDidMount() {
    this.getPosts();
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.parse(this.props.match.params.user).id !==
      JSON.parse(prevProps.match.params.user).id
    ) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.getPosts();
    }
  }
  render() {
    const user = JSON.parse(this.props.match.params.user);
    return (
      <div>
        <Card>
          <Box textAlign="right" mt={2} mr={2}>
            <Link style={{ textDecoration: "none" }} to={`/friends`}>
              <Button size="small" variant="outlined">
                Back to Friends List
              </Button>
            </Link>
          </Box>

          <br />
          <Box textAlign="left">
            <CardHeader
              avatar={
                <Avatar style={{ backgroundColor: "green" }}>
                  {user.name.charAt(0)}
                </Avatar>
              }
              title={user.name}
              subheader={user.email}
            />
          </Box>
          {this.state.posts.map(post => (
            <Box key={post.id} style={{ marginLeft: "25px" }} textAlign="left">
              <CardHeader
                avatar={
                  <Avatar
                    fontSize="small"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    <AspectRatioRounded />
                  </Avatar>
                }
                title={post.title}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.body}
                </Typography>
              </CardContent>
            </Box>
          ))}
          <Box textAlign="right" mb={2} mr={2}>
            <Button
              onClick={() => this.getPosts()}
              size="small"
              variant="outlined"
            >
              Load More Posts of the user
            </Button>
          </Box>
        </Card>
      </div>
    );
  }
}
