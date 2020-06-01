import { connect } from "react-redux";
import CommentsIndex from "./comments_index";

const mapStateToProps = state => ({
  stateComments: state.entities.comments,
  loggedIn: state.session.isAuthenticated,
});

export default connect(mapStateToProps, null)(CommentsIndex);
