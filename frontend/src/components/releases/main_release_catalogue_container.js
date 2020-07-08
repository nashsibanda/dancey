import { fetchAllReleases } from "../../actions/release_actions";
import { connect } from "react-redux";
import ReleasesIndex from "./releases_index";

const mapStateToProps = state => ({
  releases: state.entities.releases,
  loading: state.loading.releases,
  mainCatalogue: true,
});

const mapDispatchToProps = dispatch => ({
  fetchReleases: () => dispatch(fetchAllReleases()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesIndex);
