import { updateTrack } from "../../actions/track_actions";
import { connect } from "react-redux";
import TrackForm from "./track_form";

const mapStateToProps = state => ({
  stateTracks: state.entities.tracks,
  statePersonnel: state.entities.personnel,
  stateReleases: state.entities.releases,
  getDefaultArtists: (field, trackId) => {
    return Object.keys(state.entities.personnel).length > 0
      ? state.entities.tracks[trackId][field].map(
          artistId => state.entities.personnel[artistId]
        )
      : [];
  },
});

const mapDispatchToProps = dispatch => ({
  submitTrack: (trackData, trackId) =>
    dispatch(updateTrack(trackData, trackId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackForm);
