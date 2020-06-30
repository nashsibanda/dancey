import { connect } from "react-redux";
import PersonnelShow from "./personnel_show";
import {
  fetchOnePersonnel,
  updatePersonnel,
} from "../../actions/personnel_actions";

const mapStateToProps = (state, { match }) => {
  const personnelId = match.params.personnelId;
  const { personnel, tracks, comments, releases, reviews } = state.entities;
  return {
    personnelId,
    currentPersonnel: state.entities.personnel[personnelId],
    personnel,
    tracks,
    comments,
    releases,
    reviews,
    loading: state.loading.personnel,
    loggedIn: state.session.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPersonnel: id => dispatch(fetchOnePersonnel(id)),
  updatePersonnel: (id, updateData) =>
    dispatch(updatePersonnel(id, updateData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelShow);
