import {
  fetchAllReleases,
  countAllReleases,
} from "../../actions/release_actions";
import { connect } from "react-redux";
import ReleasesIndex from "./releases_index";

const mapStateToProps = state => ({
  releases: state.entities.releases,
  loading: state.loading.releases,
  mainCatalogue: true,
  releasesIndexCount: state.ui.releasesIndexCount,
  defaultItemsPerPage: 60,
});

const mapDispatchToProps = dispatch => ({
  fetchReleases: (pageNum, itemsPerPage) =>
    dispatch(fetchAllReleases(pageNum, itemsPerPage)),
  getReleasesCount: () => dispatch(countAllReleases()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReleasesIndex);
