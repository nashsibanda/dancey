import { RECEIVE_RELEASE } from "../../actions/release_actions";

const PersonnelReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RELEASE:
      const releasePersonnelOutput = {};
      action.release.personnel.forEach(({ personnelId }) => {
        releasePersonnelOutput[personnelId._id] = personnelId;
      });
      return releasePersonnelOutput;
    default:
      return state;
  }
};

export default PersonnelReducer;
