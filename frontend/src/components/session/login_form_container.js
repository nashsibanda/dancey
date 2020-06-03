import { login } from "../../actions/session_actions";
import { connect } from "react-redux";
import LoginForm from "./login_form";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  errors: state.errors.session,
  loading: state.loading.session,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
