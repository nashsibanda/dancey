import { fetchOneRelease } from "../../actions/release_actions";
import { connect } from "react-redux";
import ReleaseShow from "./release_show";

const mapStateToProps = (state, { match }) => {
  const releaseId = match.params.releaseId;
  const { personnel, tracks, comments, releases, reviews } = state.entities;
  return {
    releaseId,
    release: state.entities.releases[releaseId],
    personnel,
    tracks,
    comments,
    releases,
    reviews,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchRelease: id => dispatch(fetchOneRelease(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseShow);
