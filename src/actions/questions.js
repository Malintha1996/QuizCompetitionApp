export const CHANGEQ_REQUEST = "CHANGEQ_REQUEST";
const changeQuestionReq = (num) => {
    return {
      type: CHANGEQ_REQUEST,
      number: num
    };
  };

export const changeQuestion = (num) => (dispatch) => {
    dispatch(changeQuestionReq());
};
