import { connect } from "react-redux";
import { logout, toggleSessionFormModal } from "../../actions/session_actions";
import NavBar from "./navbar";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  toggleSessionFormModal: () => dispatch(toggleSessionFormModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
