import TracksIndex from "./tracks_index";
import { connect } from "react-redux";
import { fetchResourceTracks } from "../../actions/track_actions";
import { fetchResourceTracksPersonnel } from "../../actions/personnel_actions";

const mapStateToProps = state => ({
  stateTracks: state.entities.tracks,
  statePersonnel: state.entities.personnel,
  tracksLoading: state.loading.tracks,
  tracksPersonnelLoading: state.loading.tracksPersonnel,
});

const mapDispatchToProps = dispatch => ({
  fetchResourceTracks: (resourceType, resourceId) =>
    dispatch(fetchResourceTracks(resourceType, resourceId)),
  fetchResourceTracksPersonnel: (resourceType, resourceId) =>
    dispatch(fetchResourceTracksPersonnel(resourceType, resourceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksIndex);
