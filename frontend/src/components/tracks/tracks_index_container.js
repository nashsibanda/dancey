import TracksIndex from "./tracks_index";
import { connect } from "react-redux";
import { fetchResourceTracks } from "../../actions/track_actions";

const mapStateToProps = state => ({
  stateTracks: state.entities.tracks,
  loading: state.loading.tracks,
});

const mapDispatchToProps = dispatch => ({
  fetchResourceTracks: (resourceType, resourceId) =>
    dispatch(fetchResourceTracks(resourceType, resourceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksIndex);
