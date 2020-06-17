import React, { Component } from "react";
import { db, storage } from "../../firebase/firebase";
import { Form, Button } from "react-bootstrap";
// let admin = require("firebase-admin");

class QuestionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      question: {
        description: "",
        images: "",
      },
    };
    this.questioncol = "questions";
    this.usercol = "users";
    this.getQuestion = this.getQuestion.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
    this.setFlag = this.setFlag.bind(this);
    this.select = this.select.bind(this);
  }
  componentDidUpdate(oldProps) {
    let id = this.props.question;
    if (oldProps.question !== id && id) {
      this.getQuestion(id);
      this.setState({ id: id });
    }
  }
  getQuestion(id) {
    db.collection(this.questioncol)
      .doc(id)
      .get()
      .then((question) => {
        console.log(question.data());
        storage
          .ref(question.data().image)
          .getDownloadURL()
          .then((url) => {
            let data = question.data();
            data.image = url;
            this.setState({ question: data });
          });
      });
    db.collection(this.usercol)
      .doc(this.props.user)
      .onSnapshot((questions) => {
        let q = questions.data().questions[this.props.number + 1]; //add one for zero indexing
        this.setState({ selected: q.selected, flag: q.flag });
        console.log(this.state);
      });
  }
  saveAnswer(number) {
    // code to save answer to db
    let field = "questions." + (this.props.number + 1) + ".selected"; //add one for zero indexing
    db.collection(this.usercol)
      .doc(this.props.user)
      .update({ [field]: this.state.selected })
      .then(this.props.changeQuestion(number)); // make array if multiple answers
  }
  setFlag(number) {
    let field = "questions." + (this.props.number + 1) + ".flag";
    let flag = this.state.flag;
    db.collection(this.usercol)
      .doc(this.props.user)
      .update({ [field]: !flag });
  }
  select(choice) {
    this.setState({ selected: choice }); //.saveAnswer(choice);
  }

  render() {
    let choices;
    if (this.state.question.choices) {
      choices = this.state.question.choices.map((choice, key) => <Form.Check key={key} type="radio" onClick={() => this.select(choice)} label={choice.text} defaultChecked={choice.text === this.state.selected.text ? true : false} />);
    }
    return (
      // create the question base
      <div key={this.props.id}>
        <div>
          <h1>Question {this.props.number + 1}</h1>
        </div>
        <p>Q {this.state.question.description}</p>
        <img alt="question" className="img-fluid" src={this.state.question.image}></img>
        <Form> {choices}</Form>
        <div className="flex">
          <Button onClick={() => this.saveAnswer(this.props.number - 1)}>Prev</Button>
          <Button className="ml-3 mr-3" onClick={() => this.setFlag(this.props.number)}>
            Flag: {this.state.flag ? "Yes" : "No"}
          </Button>
          <Button onClick={() => this.saveAnswer(this.props.number + 1)}>Next</Button>
        </div>
      </div>
    );
  }
}
export default QuestionPage;
