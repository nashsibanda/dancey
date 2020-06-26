import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageFormContainer from "./image_form_container";

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
    const { images, loggedIn } = this.props;
    const { displayedImageIndex, showEditForm } = this.state;
    return showEditForm ? (
      <ImageFormContainer />
    ) : (
      <div className="images-gallery">
        <div className="gallery-displayed-image-container">
          <img
            src={images[displayedImageIndex].imageUrl}
            alt={images[displayedImageIndex].description}
            className="gallery-displayed-image"
          ></img>
          {images[displayedImageIndex].description && (
            <div className="image-description">
              <span>{images[displayedImageIndex].description}</span>
            </div>
          )}
        </div>
        <div className="gallery-navigation-buttons">
          <button
            className="big-button"
            onClick={this.decrementDisplayedImageIndex}
          >
            <span>Previous</span>
          </button>
          {loggedIn && (
            <button className="big-button">
              <FontAwesomeIcon icon="edit" />
              <span>Edit Image Info</span>
            </button>
          )}
          <button
            className="big-button"
            onClick={this.incrementDisplayedImageIndex}
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
    );
  }
}
