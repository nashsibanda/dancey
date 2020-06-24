import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ImagesModal extends Component {
  constructor(props) {
    super(props);
    this.stopClickPropagation = this.stopClickPropagation.bind(this);
  }

  stopClickPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const { toggleImageModal } = this.props;
    return (
      <div className="images-modal" onClick={toggleImageModal}>
        <div
          className="images-modal-content-wrapper"
          onClick={this.stopClickPropagation}
        >
          <button
            className="big-button modal-close-button"
            onClick={toggleImageModal}
          >
            <FontAwesomeIcon icon="times" />
          </button>
          <div className="images-modal-content">
            <h2>Images in here!</h2>
          </div>
        </div>
      </div>
    );
  }
}
