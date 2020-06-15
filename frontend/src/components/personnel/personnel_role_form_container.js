import { connect } from "react-redux";
import PersonnelRoleForm from "./personnel_role_form";
import { updateRelease } from "../../actions/release_actions";

const mapStateToProps = state => ({
  statePersonnel: state.entities.personnel,
  loading: state.loading.personnel,
});

const mapDispatchToProps = dispatch => ({
  submitPersonnel: (id, updateData) => dispatch(updateRelease(id, updateData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelRoleForm);
