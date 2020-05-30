import TracksIndex from "./tracks_index";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  stateTracks: state.entities.tracks,
});

export default connect(mapStateToProps, null)(TracksIndex);
