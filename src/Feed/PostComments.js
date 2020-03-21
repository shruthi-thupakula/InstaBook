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
import { QuestionAnswer } from "@material-ui/icons";

import { getRandomColor } from "../utils";
export default class PostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      isLoaded: 0
    };
    this.getComments = this.getComments.bind(this);
  }
  getComments = () => {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${
        JSON.parse(this.props.match.params.post).id
      }/comments/?_limit=5_&start=${this.state.isLoaded}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          ...prevState,
          comments: [...prevState.comments, ...data],
          isLoaded: prevState.isLoaded + 5
        }));
      });
  };
  componentDidMount() {
    this.getComments();
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.parse(this.props.match.params.post).id !==
      JSON.parse(prevProps.match.params.post).id
    ) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.getComments();
    }
  }
  render() {
    const post = JSON.parse(this.props.match.params.post);
    return (
      <div>
        <Card>
          <Box textAlign="right" mt={2} mr={2}>
            <Link style={{ textDecoration: "none" }} to={`/feed`}>
              <Button size="small" variant="outlined">
                Back to Posts
              </Button>
            </Link>
          </Box>
          <br />
          <CardContent>
            <Box textAlign="center">
              <Typography variant="h6" color="textPrimary" component="p">
                {post.title}
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary" component="p">
              {post.body}
            </Typography>
          </CardContent>
          <Box textAlign="left">
            <CardHeader
              avatar={
                <Avatar style={{ backgroundColor: "green" }}>
                  <QuestionAnswer />
                </Avatar>
              }
              title="Comments"
              subheader="Others view on this post"
            />
          </Box>
          {this.state.comments.map(comment => (
            <Box
              key={comment.id}
              style={{ marginLeft: "25px" }}
              textAlign="left"
            >
              <CardHeader
                avatar={
                  <Avatar
                    fontSize="small"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {comment.name.charAt(0)}
                  </Avatar>
                }
                title={comment.name}
                subheader={comment.email}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {comment.body}
                </Typography>
              </CardContent>
            </Box>
          ))}
          <Box textAlign="right" mb={2} mr={2}>
            <Button
              onClick={() => this.getComments()}
              size="small"
              variant="outlined"
            >
              Load More Comments
            </Button>
          </Box>
        </Card>
      </div>
    );
  }
}
