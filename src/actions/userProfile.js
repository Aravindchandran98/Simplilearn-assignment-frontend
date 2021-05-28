import axios from "axios";
//Action creators
// export const authUser = (username, password) => async (dispatch) => {
export const authUser = (stateObj) => async (dispatch) => {
  //logic for the auth user completely have the axios
  const action = { type: "GET_AUTH", payload: stateObj };
  dispatch(action);
};
