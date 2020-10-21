import React from "react";
import { useCallback, useState, useMemo } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import logo from "./static/taptap2.png";
import MQTTClient from "./mqttClient";

const useStyles = makeStyles((theme) => ({
  playButton: {
    minHeight: "70px",
    minWidth: "200px",
    marginTop: "10px",
  },
  greenTableRow: {
    marginTop: "10px",
    color: "#00FF00",
  },
  redTableRow: {
    marginTop: "10px",
    color: "#FF0000",
  },
}));

function App() {
  const [userStates, setUserStates] = useState([]);
  const onMessageReceived = useCallback((topic, message) => {
    // message is Buffer
    console.log(topic);
    const msg = message.toString();
    console.log(msg);
    const time = parseInt(msg.slice(0, -1));
    const didWin = !!parseInt(msg.slice(-1));
    setUserStates((uStates) => [...uStates, { time, didWin }]);
  }, []);
  const mqttClient = useMemo(
    () => new MQTTClient("/mambo/chili/estudio6/res", onMessageReceived),
    []
  );
  const getRandomSequence = useCallback(() => {
    const sequence = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * Math.floor(5))
    );
    return sequence.join("");
  }, []);

  const classes = useStyles();
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <img alt="logo" style={{ width: 600 }} src={logo} />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            className={classes.playButton}
            onClick={() => {
              const msg = getRandomSequence();
              console.log(msg);
              mqttClient.publish("/mambo/chili/estudio6/seq", msg);
              console.log("published");
            }}
          >
            Play
          </Button>
        </Grid>
        <Grid item>
          {userStates.map((uState, index) => {
            const sty = uState.didWin
              ? classes.greenTableRow
              : classes.redTableRow;
            const txt = uState.didWin ? "WON!" : "LOST :(";
            return (
              <div key={index} className={sty}>
                User time: {uState.time / 1000} - {txt}
              </div>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
