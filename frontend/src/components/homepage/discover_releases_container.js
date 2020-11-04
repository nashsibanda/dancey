import { fetchRandomReleases } from "../../actions/release_actions";
import { connect } from "react-redux";
import DiscoverReleases from "./discover_releases";

const mapStateToProps = state => ({
  releases: state.entities.releases,
  loading: state.loading.releases,
});

const mapDispatchToProps = dispatch => ({
  fetchReleases: (withImages, numberOfRecords) =>
    dispatch(fetchRandomReleases(withImages, numberOfRecords)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverReleases);
