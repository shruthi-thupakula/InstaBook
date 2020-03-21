import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  Button,
  CardActionArea,
  CardMedia,
  CardActions,
  IconButton,
  Box
} from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
const picture = {
  albumId: 1,
  id: 1,
  title: "accusamus beatae ad facilis cum similique qui sunt",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952"
};
export default class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isLoaded: 0
    };
    this.getPhotos = this.getPhotos.bind(this);
  }

  getPhotos = () => {
    fetch(
      `https://jsonplaceholder.typicode.com/albums/${this.props.match.params.albumId}/photos/?_limit=5_&start=${this.state.isLoaded}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          ...prevState,
          photos: [...prevState.photos, ...data],
          isLoaded: prevState.isLoaded + 5
        }));
      });
  };
  componentDidMount() {
    this.getPhotos();
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.albumId !== prevProps.match.params.albumId) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.getPhotos();
    }
  }

  render() {
    return (
      <div>
        <Link style={{ textDecoration: "none" }} to={`/albums`}>
          <Button size="small" variant="outlined">
            Back to Albums
          </Button>
        </Link>
        <br />
        {/* You are viewing the photos of album {this.props.match.params.albumId} */}
        <div style={{ textAlign: "left" }}>
          {this &&
            this.state &&
            this.state.photos &&
            this.state.photos.map((photo, pIndex) => (
              <Card style={{ margin: 10, maxWidth: "200px" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={picture.thumbnailUrl}
                    title={picture.title}
                  />
                </CardActionArea>
                <CardActions>
                  <IconButton onClick={() => picture.url}>
                    <CloudDownload />
                  </IconButton>
                  <Typography component="body2" variant="body2">
                    {picture.title}
                  </Typography>
                </CardActions>
              </Card>
            ))}
          <Box textAlign="right" mb={2} mr={2}>
            <Button
              onClick={() => this.getPhotos()}
              size="small"
              variant="outlined"
            >
              Load More
            </Button>
          </Box>
        </div>
      </div>
    );
  }
}
