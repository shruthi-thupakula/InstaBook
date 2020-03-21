import React, { useState } from "react";
import { Box, Container, Grid, Button, TextField } from "@material-ui/core";

export default function Login({ data, handleChangeLoginState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = e => {
    if (e.target.value) setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    if (e.target.value) setPassword(e.target.value);
  };
  const handleSignIn = () => {
    if (email === data.email && password === data.password) {
      handleChangeLoginState(true);
    } else {
      alert("Invalid Email/Password");
    }
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Container maxWidth="lg">
              <Box style={{ paddingTop: "120px" }}>
                <Box
                  style={{
                    fontSize: "52px",
                    fontWeight: "bold",

                    fontFamily: "Squada One",
                    color: "#ed1a1a"
                  }}
                  mt={2}
                >
                  <img
                    alt="instaBookLogo"
                    src="data:image/png;base64,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 "
                  />
                </Box>
                <Box
                  style={{
                    fontSize: "20px",
                    fontWeight: "600"
                  }}
                  mt={5}
                  mr={18}
                >
                  Sign in
                </Box>
                <form>
                  <Box mt={2}>
                    <label>
                      <TextField
                        value={email}
                        onChange={handleEmailChange}
                        id="Email"
                        label="Email Address"
                        variant="outlined"
                      />
                      <br />
                    </label>
                    <br />
                    <label>
                      <TextField
                        value={password}
                        onChange={handlePasswordChange}
                        id="Password"
                        label="Password"
                        variant="outlined"
                        type="password"
                      />
                    </label>
                  </Box>
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={handleSignIn}
                    >
                      Sign in
                    </Button>
                  </Box>{" "}
                </form>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
