import React from "react";
// import { useEffect, useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import logo from "./static/taptap2.png";

const useStyles = makeStyles((theme) => ({
  playButton: {
    minHeight: "70px",
    minWidth: "200px",
    marginTop: "10px",
  },
}));

function App() {
  // const [date, setDate] = useState(null);
  // useEffect(() => {
  //   async function getDate() {
  //     const res = await fetch("/api/date");
  //     const newDate = await res.text();
  //     setDate(newDate);
  //   }
  //   getDate();
  // }, []);
  const classes = useStyles();
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <img alt="logo" style={{ width: 500 }} src={logo} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            className={classes.playButton}
          >
            Play
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
