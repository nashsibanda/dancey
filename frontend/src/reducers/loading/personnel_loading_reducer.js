import {
  PERSONNEL_LOADING_ON,
  PERSONNEL_LOADING_OFF,
} from "../../actions/loading_actions";

const PersonnelLoadingReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case PERSONNEL_LOADING_ON:
      return true;
    case PERSONNEL_LOADING_OFF:
      return false;
    default:
      return state;
  }
};

export default PersonnelLoadingReducer;
