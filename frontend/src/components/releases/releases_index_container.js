import { fetchAllReleases } from "../../actions/release_actions";
import { connect } from "react-redux";
import ReleasesIndex from "./releases_index";

const mapStateToProps = state => ({
  releases: state.releases,
});

const mapDispatchToProps = dispatch => ({
  fetchAllReleases: () => dispatch(fetchAllReleases()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesIndex);
