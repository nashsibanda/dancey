import { connect } from "react-redux";
import ImagesModal from "./images_modal";

const mapStateToProps = state => ({
  loggedIn: state.session.authenticated,
});

export default connect(mapStateToProps, null)(ImagesModal);
