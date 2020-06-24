import { connect } from "react-redux";
import ImageForm from "./image_form";
import { addResourceImage } from "../../actions/image_actions";

const mapDispatchToState = dispatch => ({
  addImage: (resourceType, resourceId, formData) =>
    dispatch(addResourceImage(resourceType, resourceId, formData)),
});

export default connect(null, mapDispatchToState)(ImageForm);
