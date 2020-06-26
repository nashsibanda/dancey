import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageFormContainer from "./image_form_container";
import ImagesGallery from "./images_gallery";

export default class ImagesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewForm: false,
    };
    this.stopClickPropagation = this.stopClickPropagation.bind(this);
    this.toggleNewForm = this.toggleNewForm.bind(this);
  }

  stopClickPropagation(e) {
    e.stopPropagation();
  }

  toggleNewForm() {
    this.setState({ showNewForm: !this.state.showNewForm });
  }

  render() {
    const {
      toggleImageModal,
      resourceType,
      resourceId,
      loggedIn,
      images,
    } = this.props;
    const { showNewForm } = this.state;
    return (
      <div className="images-modal" onClick={toggleImageModal}>
        <div
          className="images-modal-content-wrapper"
          onClick={this.stopClickPropagation}
        >
          {loggedIn && (
            <button
              className="big-button edit-images-button"
              onClick={this.toggleNewForm}
            >
              <FontAwesomeIcon icon={showNewForm ? "times" : "edit"} />
              <span>{showNewForm ? "Cancel" : "Add Images"}</span>
            </button>
          )}
          <button
            className="big-button modal-close-button"
            onClick={toggleImageModal}
          >
            <FontAwesomeIcon icon="times" />
          </button>
          <div className="images-modal-content">
            {showNewForm ? (
              <ImageFormContainer
                resourceType={resourceType}
                resourceId={resourceId}
                toggleForm={this.toggleNewForm}
              />
            ) : (
              <ImagesGallery images={images} loggedIn={loggedIn} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
