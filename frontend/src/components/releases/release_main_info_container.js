import ReleaseMainInfo from "./release_main_info";
import { connect } from "react-redux";
import { fetchResourcePersonnel } from "../../actions/personnel_actions";

const mapStateToProps = state => ({
  loading: state.loading.personnel,
  statePersonnel: state.entities.personnel,
});

const mapDispatchToProps = dispatch => ({
  fetchResourcePersonnel: (resourceType, resourceId) =>
    dispatch(fetchResourcePersonnel(resourceType, resourceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseMainInfo);
