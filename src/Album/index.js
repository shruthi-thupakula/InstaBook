import React from "react";
import {
  Typography,
  CardContent,
  CardActions,
  Card,
  Button,
  CardMedia,
  Box
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getRandomColor } from "../utils";

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = { album: [], isLoaded: 0 };
    this.getAlbum = this.getAlbum.bind(this);
  }
  getAlbum = async () => {
    await fetch(
      `https://jsonplaceholder.typicode.com/albums/?_limit=5_&start=${this.state.isLoaded}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          ...prevState,
          album: [...prevState.album, ...data],
          isLoaded: prevState.isLoaded + 5
        }));
      });
  };
  componentDidMount() {
    this.getAlbum();
  }
  render() {
    return (
      <div style={{ textAlign: "left", fontSize: "17px" }}>
        {this &&
          this.state &&
          this.state.album &&
          this.state.album.map((album, pIndex) => (
            <Card style={{ margin: 10 }}>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",

                    flexDirection: "column"
                  }}
                >
                  <CardContent style={{ flex: "1 0 auto" }}>
                    <Typography variant="subtitle1" color="textSecondary">
                      Album
                    </Typography>
                    <Typography component="h5" variant="h5">
                      {album.title}
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  style={{
                    width: "100px",
                    backgroundColor: getRandomColor()
                  }}
                  image={`https://picsum.photos/id/${album.id}/500/500`}
                  title={album.title}
                />
              </Box>
              <CardActions>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/album/${album.id}`}
                >
                  <Button size="small" color="primary">
                    View Pictures
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        <Box textAlign="right" mb={2} mr={2}>
          <Button
            onClick={() => this.getAlbum()}
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
