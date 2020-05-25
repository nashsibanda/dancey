import { register } from "../../actions/session_actions";
import { connect } from "react-redux";
import RegisterForm from "./register_form";

const mapStateToProps = state => ({
  loggedIn: state.session.loggedIn,
  errors: state.errors.session,
});

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
