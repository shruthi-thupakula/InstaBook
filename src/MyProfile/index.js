import React from "react";
import {
  CardContent,
  Typography,
  Card,
  Box,
  CardHeader,
  Avatar,
  Grid,
  CardMedia,
  CardActionArea,
  CardActions,
  IconButton
} from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import { getRandomColor } from "../utils";

const picture = {
  albumId: 1,
  id: 1,
  title: "accusamus beatae ad facilis cum similique qui sunt",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952"
};
const PicturesList = () => {
  return (
    <Grid container>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(_ => (
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
    </Grid>
  );
};
export default class Friends extends React.Component {
  constructor() {
    super();
    this.state = { users: [], isLoaded: 0 };
    this.getUser = this.getUser.bind(this);
  }
  async getUser() {
    await fetch(
      `https://jsonplaceholder.typicode.com/users/?_limit=1_&start=${this.state.isLoaded}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
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
            </Box>
            <Box textAlign="center">
              <PicturesList />
            </Box>
          </Card>
        ))}
      </div>
    );
  }
}
