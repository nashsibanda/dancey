import { connect } from "react-redux";
import CommentsSection from "./comments_section";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
});

export default connect(mapStateToProps, null)(CommentsSection);
