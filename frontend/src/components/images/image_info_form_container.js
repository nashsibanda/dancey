import { connect } from "react-redux";
import ImageInfoForm from "./image_info_form";
const {
  editResourceImageInfo,
  deleteResourceImage,
} = require("../../actions/image_actions");

const mapDispatchToProps = dispatch => ({
  editResourceImageInfo: (resourceType, resourceId, imageObjectId, imageData) =>
    dispatch(
      editResourceImageInfo(resourceType, resourceId, imageObjectId, imageData)
    ),
  deleteResourceImage: (resourceType, resourceId, imageObjectId) =>
    dispatch(deleteResourceImage(resourceType, resourceId, imageObjectId)),
});

export default connect(null, mapDispatchToProps)(ImageInfoForm);
