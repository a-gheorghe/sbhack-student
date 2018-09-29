import { INCREMENT_ATTEMPTS } from "../actions/types";

export default (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_ATTEMPTS:
      return state + 1;
    default:
      return state;
  }
};