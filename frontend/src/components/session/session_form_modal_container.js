import { toggleSessionFormModal } from "../../actions/session_actions";
import { connect } from "react-redux";
import SessionFormModal from "./session_form_modal";

const mapStateToProps = state => ({
  show: state.ui.showSessionFormModal,
});

const mapDispatchToProps = dispatch => ({
  toggleSessionFormModal: () => dispatch(toggleSessionFormModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionFormModal);
