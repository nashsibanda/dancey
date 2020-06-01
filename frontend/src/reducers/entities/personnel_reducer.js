import {
  RECEIVE_PERSONNEL,
  RECEIVE_ONE_PERSONNEL,
} from "../../actions/personnel_actions";

const PersonnelReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PERSONNEL:
      const personnelOutput = {};
      action.personnel.forEach(personnel => {
        personnelOutput[personnel._id] = personnel;
      });
      return Object.assign({}, state, personnelOutput);
    case RECEIVE_ONE_PERSONNEL:
      const { personnel } = action;
      return Object.assign({}, state, { [personnel._id]: personnel });
    default:
      return state;
  }
};

export default PersonnelReducer;
