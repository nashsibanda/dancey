import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ImageInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: this.props.currentImage.description,
      mainImage: this.props.currentImage.mainImage,
      alreadyMainImage: this.props.currentImage.mainImage,
    };

    this.updateDescription = this.updateDescription.bind(this);
    this.updateMainImage = this.updateMainImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateDescription(e) {
    this.setState({ description: e.target.value });
  }

  updateMainImage(e) {
    this.setState({ mainImage: !this.state.mainImage });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { description, mainImage } = this.state;
    const {
      editResourceImageInfo,
      resourceType,
      resourceId,
      currentImage,
      toggleEditForm,
    } = this.props;
    const imageData = {
      description,
      mainImage,
    };
    editResourceImageInfo(
      resourceType,
      resourceId,
      currentImage._id,
      imageData
    );
    toggleEditForm();
  }

  deleteImage() {
    const {
      deleteResourceImage,
      resourceType,
      resourceId,
      currentImage,
      toggleEditForm,
    } = this.props;
    deleteResourceImage(resourceType, resourceId, currentImage._id);
    toggleEditForm();
  }

  render() {
    const { description, mainImage, alreadyMainImage } = this.state;
    return (
      <form className="image-info-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Description..."
          value={description}
          onChange={this.updateDescription}
        />
        {alreadyMainImage ? (
          <div>
            <span>
              This is currently the main image for this{" "}
              {this.props.resourceType}
            </span>
          </div>
        ) : (
          <label>
            <input
              type="checkbox"
              checked={mainImage}
              onChange={this.updateMainImage}
            />
            {`Make this the main image?`}
          </label>
        )}
        <div className="submit-buttons">
          <button type="submit" className="big-button">
            <FontAwesomeIcon icon="save" />
            <span>Update Image</span>
          </button>
          {alreadyMainImage ? (
            <span>
              You can't delete the main image. Select/upload a different main
              image first
            </span>
          ) : (
            <button type="button" className="big-button">
              <FontAwesomeIcon icon="times" />
              <span>Delete Image</span>
            </button>
          )}
        </div>
      </form>
    );
  }
}
