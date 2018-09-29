import { valsRef } from "../firebase";
import { INCREMENT_ATTEMPTS } from "./types";

export const incrementAttempts = () => async dispatch => {
  valsRef.on("value", snapshot => {
    dispatch({
      type: INCREMENT_ATTEMPTS,
      payload: snapshot.val()
    });
  });
};