import { FETCH_ANSWERS } from "../actions/types";

export default (state = "loading", action) => {
  switch (action.type) {
    case FETCH_ANSWERS:
      return action.payload;
    default:
      return state;
  }
};