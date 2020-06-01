import { connect } from "react-redux";
import PersonnelIndex from "./personnel_index";
import { fetchResourcePersonnel } from "../../actions/personnel_actions";

const mapStateToProps = state => ({
  statePersonnel: state.entities.personnel,
});

const mapDispatchToProps = dispatch => ({
  fetchResourcePersonnel: (resourceType, resourceId) =>
    dispatch(fetchResourcePersonnel(resourceType, resourceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelIndex);
