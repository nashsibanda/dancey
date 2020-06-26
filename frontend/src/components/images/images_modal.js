import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageFormContainer from "./image_form_container";

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
    const { toggleImageModal, resourceType, resourceId, loggedIn } = this.props;
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
              <FontAwesomeIcon icon="edit" />
              <span>Edit Images</span>
            </button>
          )}
          <button
            className="big-button modal-close-button"
            onClick={toggleImageModal}
          >
            <FontAwesomeIcon icon="times" />
          </button>
          <div className="images-modal-content">
            {this.state.showNewForm ? (
              <ImageFormContainer
                resourceType={resourceType}
                resourceId={resourceId}
                toggleNewForm={this.toggleNewForm}
              />
            ) : (
              <h2>NOT</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}
