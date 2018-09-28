import { valsRef } from "../firebase";
import { FETCH_ANSWERS } from "./types";

export const fetchAnswers = () => async dispatch => {
  valsRef.on("value", snapshot => {
    dispatch({
      type: FETCH_ANSWERS,
      payload: snapshot.val()
    });
  });
};