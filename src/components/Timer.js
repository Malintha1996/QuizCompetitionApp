import React, { Component, Fragment } from "react";
import { MiniFooter } from "./Navbar";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: "Loading...",
    };
  }
  componentDidMount() {
    this.myInterval = setInterval(() => {
      var deadline = new Date("june 28, 2020 15:54:25").getTime();
      var now = new Date().getTime();
      var t = deadline - now;

      var days = ("0" + Math.floor(t / (1000 * 60 * 60 * 24))).slice(-2);
      var hours = ("0" + Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).slice(-2);
      var minutes = ("0" + Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))).slice(-2);
      var seconds = ("0" + Math.floor((t % (1000 * 60)) / 1000)).slice(-2);

      var display = days + " : " + hours + " : " + minutes + "  : " + seconds;
      if (t < 0) {
        display = "Competition has started";
      }

      this.setState((prevState) => ({
        count: display,
      }));
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  render() {
    const { count } = this.state;
    return (
      <Fragment>
        <div className="timercolumn">
          <div id="timerbox">
            <p id="caption">μMora Mathematics Competition starts in</p>
            <p id="demo">{count}</p>
            <p> Days : Hours : Minutes : Seconds </p>
            <a className="link" href="/login">
              Test Round
            </a>
          </div>
          <MiniFooter></MiniFooter>
        </div>
      </Fragment>
    );
  }
}
export default Timer;
