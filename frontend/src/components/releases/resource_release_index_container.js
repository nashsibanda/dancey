import {
  fetchResourceReleases,
  countResourceReleases,
} from "../../actions/release_actions";
import { connect } from "react-redux";
import ReleasesIndex from "./releases_index";

const mapStateToProps = state => ({
  releases: state.entities.releases,
  loading: state.loading.releases,
  releasesIndexCount: state.ui.releasesIndexCount,
  defaultItemsPerPage: 12,
});

const mapDispatchToProps = dispatch => ({
  fetchReleases: (pageNum, itemsPerPage, resourceType, resourceId) =>
    dispatch(
      fetchResourceReleases(pageNum, itemsPerPage, resourceType, resourceId)
    ),
  getReleasesCount: (resourceType, resourceId) =>
    dispatch(countResourceReleases(resourceType, resourceId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesIndex);
