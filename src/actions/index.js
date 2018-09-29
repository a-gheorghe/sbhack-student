import { INCREMENT_ATTEMPTS } from "./types";

export const incrementAttempts = () => async dispatch => {
    dispatch({
      type: INCREMENT_ATTEMPTS,
      //payload: snapshot.val()
    });
};