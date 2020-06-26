import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageInfoFormContainer from "./image_info_form_container";

export default class ImagesGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedImageIndex: this.props.selectedImage
        ? this.props.selectedImage
        : this.props.images.findIndex(img => img.mainImage),
      showEditForm: false,
    };

    this.incrementDisplayedImageIndex = this.incrementDisplayedImageIndex.bind(
      this
    );
    this.decrementDisplayedImageIndex = this.decrementDisplayedImageIndex.bind(
      this
    );
    this.setDisplayedImageIndex = this.setDisplayedImageIndex.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
  }

  toggleEditForm() {
    this.setState({ showEditForm: !this.state.showEditForm });
  }

  incrementDisplayedImageIndex() {
    const { images } = this.props;
    const { displayedImageIndex } = this.state;
    this.setState({
      displayedImageIndex: (displayedImageIndex + 1) % images.length,
    });
  }

  decrementDisplayedImageIndex() {
    const { images } = this.props;
    const { displayedImageIndex } = this.state;
    this.setState({
      displayedImageIndex:
        displayedImageIndex === 0
          ? images.length - 1
          : (displayedImageIndex - 1) % images.length,
    });
  }

  setDisplayedImageIndex(index) {
    return e =>
      this.setState({
        displayedImageIndex: index,
      });
  }

  render() {
    const { images, loggedIn, resourceId, resourceType } = this.props;
    const { displayedImageIndex, showEditForm } = this.state;
    return images.length > 0 ? (
      <div className="images-gallery">
        <div className="gallery-displayed-image-container">
          <img
            src={images[displayedImageIndex].imageUrl}
            alt={images[displayedImageIndex].description}
            className="gallery-displayed-image"
          ></img>
          {showEditForm ? (
            <div className="image-description">
              <ImageInfoFormContainer
                resourceType={resourceType}
                resourceId={resourceId}
                currentImage={images[displayedImageIndex]}
                toggleEditForm={this.toggleEditForm}
                decrement={this.decrementDisplayedImageIndex}
              />
            </div>
          ) : (
            images[displayedImageIndex].description && (
              <div className="image-description">
                <span className="description-text">
                  {images[displayedImageIndex].description}
                </span>
              </div>
            )
          )}
        </div>
        <div className="gallery-navigation-buttons">
          <button
            className={`big-button ${showEditForm ? "disabled" : ""}`}
            onClick={this.decrementDisplayedImageIndex}
            disabled={showEditForm}
          >
            <span>Prev</span>
          </button>
          {loggedIn && (
            <button className="big-button" onClick={this.toggleEditForm}>
              <FontAwesomeIcon icon={showEditForm ? "times" : "edit"} />
              <span>{showEditForm ? "Cancel" : "Edit Image"}</span>
            </button>
          )}
          <button
            className={`big-button ${showEditForm ? "disabled" : ""}`}
            onClick={this.incrementDisplayedImageIndex}
            disabled={showEditForm}
          >
            <span>Next</span>
          </button>
        </div>
        <div className="gallery-thumbnail-index">
          {images.map((image, index) => (
            <img
              src={image.imageUrl}
              key={`${index}-${image._id}`}
              alt={image.description}
              className={`gallery-thumbnail ${
                displayedImageIndex === index ? "selected" : ""
              }`}
              onClick={this.setDisplayedImageIndex(index)}
            ></img>
          ))}
        </div>
      </div>
    ) : (
      <div className="images-gallery">
        <h2>No Images</h2>
      </div>
    );
  }
}
