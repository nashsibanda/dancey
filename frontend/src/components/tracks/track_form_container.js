import { createTrack, createTrackListing } from "../../actions/track_actions";
import { connect } from "react-redux";
import TrackForm from "./track_form";

const mapDispatchToProps = dispatch => ({
  createTrackListing: (trackData, releaseId) =>
    dispatch(createTrackListing(trackData, releaseId)),
});

export default connect(null, mapDispatchToProps)(TrackForm);
