import { createTrack } from "../../actions/track_actions";
import { connect } from "react-redux";
import TrackForm from "./track_form";

const mapDispatchToProps = dispatch => ({
  createTrack: trackData => dispatch(createTrack(trackData)),
});

export default connect(null, mapDispatchToProps)(TrackForm);
