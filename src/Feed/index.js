import React from "react";
import {
  Typography,
  CardActionArea,
  CardContent,
  CardActions,
  Card,
  Button,
  Grid
} from "@material-ui/core";
import { ShortText } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getRandomColor } from "../utils";
export default class Feed extends React.Component {
  constructor() {
    super();
    this.state = { post: [], isLoaded: 0 };
    this.getPosts = this.getPosts.bind(this);
  }

  async getPosts() {
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/?_limit=6_&start=${this.state.isLoaded}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          ...prevState,
          post: [...prevState.post, ...data],
          isLoaded: prevState.isLoaded + 5
        }));
      });
  }
  componentDidMount() {
    this.getPosts();
  }
  render() {
    return (
      <div style={{ textAlign: "left", fontSize: "17px" }}>
        <Grid container>
          {this &&
            this.state &&
            this.state.post &&
            this.state.post.map((post, pIndex) => (
              <Card
                style={{
                  backgroundColor: getRandomColor(),

                  margin: 10
                }}
              >
                <CardActionArea>
                  <CardContent style={{ width: 345, height: 150 }}>
                    <ShortText />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    />
                    <Typography gutterBottom variant="h6" component="h2">
                      {post.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/post/${JSON.stringify(post)}`}
                  >
                    <Button size="small" color="primary">
                      Read Post
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
        </Grid>{" "}
        <Button onClick={() => this.getPosts()} size="small" variant="outlined">
          Load More Posts
        </Button>
      </div>
    );
  }
}
