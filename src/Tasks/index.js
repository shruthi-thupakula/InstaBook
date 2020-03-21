import React from "react";
import {
  Typography,
  CardActionArea,
  CardContent,
  Card,
  Grid,
  CardActions,
  Box,
  Button
} from "@material-ui/core";
import {
  WorkRounded,
  CheckCircleOutline,
  HighlightOffOutlined
} from "@material-ui/icons";
// import { Link } from "react-router-dom";
import { getRandomColor } from "../utils";

export default class Todos extends React.Component {
  constructor() {
    super();
    this.state = { todos: [], isLoaded: 0 };
    this.getTodo = this.getTodo.bind(this);
  }
  async getTodo() {
    await fetch(
      `https://jsonplaceholder.typicode.com/todos/?_limit=6_&start=${this.state.isLoaded}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          ...prevState,
          todos: [...prevState.todos, ...data],
          isLoaded: prevState.isLoaded + 5
        }));
      });
  }
  componentDidMount() {
    this.getTodo();
  }
  render() {
    return (
      <div style={{ textAlign: "left", fontSize: "17px" }}>
        <Grid container>
          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography gutterBottom variant="h6" component="h2">
                Pending
              </Typography>
            </Box>
            {this &&
              this.state &&
              this.state.todos &&
              this.state.todos
                .filter(todo => !todo.completed)
                .map((todo, pIndex) => (
                  <Card
                    style={{
                      backgroundColor: getRandomColor(),
                      margin: 10
                    }}
                  >
                    <CardActionArea>
                      <CardContent style={{ width: 345, height: 100 }}>
                        <WorkRounded />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        />
                        <Typography gutterBottom variant="h6" component="h2">
                          {todo.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      {todo.completed ? (
                        <CheckCircleOutline color="action" />
                      ) : (
                        <HighlightOffOutlined color="error" />
                      )}
                    </CardActions>
                  </Card>
                ))}
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography gutterBottom variant="h6" component="h2">
                Completed
              </Typography>
            </Box>
            {this &&
              this.state &&
              this.state.todos &&
              this.state.todos
                .filter(todo => todo.completed)
                .map((todo, pIndex) => (
                  <Card
                    style={{
                      backgroundColor: getRandomColor(),
                      margin: 10
                    }}
                  >
                    <CardActionArea>
                      <CardContent style={{ width: 345, height: 100 }}>
                        <WorkRounded />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        />
                        <Typography gutterBottom variant="h6" component="h2">
                          {todo.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      {todo.completed ? (
                        <CheckCircleOutline color="action" />
                      ) : (
                        <HighlightOffOutlined color="error" />
                      )}
                    </CardActions>
                  </Card>
                ))}
          </Grid>
        </Grid>
        <Button size="small" variant="outlined" onClick={() => this.getTodo()}>
          Load More
        </Button>
      </div>
    );
  }
}
