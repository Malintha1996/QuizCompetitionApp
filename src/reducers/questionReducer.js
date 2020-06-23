import CHANGEQ_REQUEST from "../actions/"
export default (
    state = {
        userid: ls.get("UserId"), //auth().currentUser.uid, //
        lang: "english", //default
        questions: [],
        question: "",
        number: 0,
        selected: "",
        timeup: true,
        early: true,
    },
    action
  ) => {
    switch (action.type) {
      case CHANGEQ_REQUEST:
        return {
          ...state,
          question:questions[number],
          number:action.number
        };
      default:
        return state;
    }
  };
  