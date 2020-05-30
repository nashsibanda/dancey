import { connect } from "react-redux";
import CommentsIndex from "./comments_index";

const mapStateToProps = state => ({
  stateComments: state.entities.comments,
});

export default connect(mapStateToProps, null)(CommentsIndex);
