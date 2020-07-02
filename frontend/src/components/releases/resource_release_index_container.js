import { fetchResourceReleases } from "../../actions/release_actions";
import { connect } from "react-redux";
import ReleasesIndex from "./releases_index";

const mapStateToProps = state => ({
  releases: state.entities.releases,
  loading: state.loading.releases,
});

const mapDispatchToProps = dispatch => ({
  fetchReleases: (resourceType, resourceId) =>
    dispatch(fetchResourceReleases(resourceType, resourceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesIndex);
