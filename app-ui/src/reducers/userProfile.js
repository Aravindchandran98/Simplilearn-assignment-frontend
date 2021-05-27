export default function userProfile(state = [], action) {
  switch (action.type) {
    case "GET_AUTH":
      return action.payload;

    // case "":
    //   return state;

    default:
      return state;
  }
}
