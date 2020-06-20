import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import { Form } from "react-bootstrap";
import ls from "local-storage";
import "./loginStyle.css";
import Img from "../assets/png.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", selectedOption: "english" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    console.log(this.state.selectedOption.value);
    ls.set("language", this.state.selectedOption);
    if (this.state.selectedOption == null) {
      alert("please select language");
    } else if (this.state.selectedOption != null) {
      const { dispatch } = this.props;
      const { email, password } = this.state;

      dispatch(loginUser(email, password));
    }
  };

  handleChange(e) {
    this.setState({ selectedOption: e.target.value });
    console.log(`Option selected:`, e.target.value);
    // ls.set("language", this.state.selectedOption);
  }

  render() {
    const { classes, loginError, isAuthenticated } = this.props;
    if (isAuthenticated && ls.get("language") && ls.get("UserId")) {
      return <Redirect to="/quizcompetition/dash" />;
    } else {
      return (
        <div>
          <div className="row" id="navbar">
            <div>μMora Mathematics Competition 2020</div>
            <div id="logo">
              <img alt="logo" src={Img} id="logoimg" />
            </div>
          </div>
          <div className="row" id="loginbody">
            <div className="logincontainer">
              <div id="loginbox">
                <div id="signinheader">Sign In</div>
                <input className="logininput" onChange={this.handleEmailChange} type="text" placeholder="Enter Username" name="uname" required></input>
                <input className="logininput" onChange={this.handlePasswordChange} type="password" placeholder="Enter Password" name="psw" required></input>
                {/* 
                <input onChange={this.handlePasswordChange} type="password" placeholder="Enter Password" name="psw" required></input>
                <p></p> */}
                <Form.Control as="select" defaultValue="english" value={this.selectedOption} onChange={this.handleChange}>
                  <option value="english">English</option>
                  <option value="sinhala">සිංහල</option>
                  <option value="tamil">தமிழ்</option>
                </Form.Control>
                <br></br>

                <button onClick={this.handleSubmit} type="submit">
                  Login
                </button>
                {loginError && <div className="errorText">Incorrect email or password.</div>}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
