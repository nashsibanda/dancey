import { connect } from "react-redux";
import { logout, toggleSessionFormModal } from "../../actions/session_actions";
import HeroSection from "./hero_section";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  user: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  toggleSessionFormModal: () => dispatch(toggleSessionFormModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroSection);
