import { connect } from "react-redux";
import LabelCatalogueNumberForm from "./label_catalogue_number_form";
import { updateRelease } from "../../actions/release_actions";

const mapStateToProps = state => ({
  statePersonnel: state.entities.personnel,
});

const mapDispatchToProps = dispatch => ({
  submitLabel: (id, updateData) => dispatch(updateRelease(id, updateData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelCatalogueNumberForm);
