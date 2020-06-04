import { createTrack, createTrackListing } from "../../actions/track_actions";
import { connect } from "react-redux";
import TrackForm from "./track_form";

const mapStateToProps = state => ({
  stateTracks: state.entities.tracks,
  statePersonnel: state.entities.personnel,
  stateReleases: state.entities.releases,
});

const mapDispatchToProps = dispatch => ({
  createTrack: trackData => dispatch(createTrack(trackData)),
  createTrackListing: (trackData, releaseId) =>
    dispatch(createTrackListing(trackData, releaseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackForm);
