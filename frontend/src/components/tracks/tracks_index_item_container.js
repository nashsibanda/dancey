import { connect } from "react-redux";
import { fetchResourcePersonnel } from "../../actions/personnel_actions";
import TracksIndexItem from "./tracks_index_item";

const mapStateToProps = state => ({
  trackPersonnelLoading: state.loading.trackPersonnel,
  statePersonnel: state.entities.personnel,
});

const mapDispatchToProps = dispatch => ({
  fetchResourcePersonnel: (resourceType, resourceId) =>
    dispatch(fetchResourcePersonnel(resourceType, resourceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksIndexItem);
