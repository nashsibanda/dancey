import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class ImageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      filename: "",
      description: "",
      mainImage: false,
    };

    this.updateImageFile = this.updateImageFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateMainImage = this.updateMainImage.bind(this);
  }

  updateImageFile(e) {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  }

  updateDescription(e) {
    this.setState({ description: e.target.value });
  }

  updateMainImage(e) {
    this.setState({ mainImage: !this.state.mainImage });
  }

  handleSubmit(e) {
    const { file, description, mainImage } = this.state;
    const { resourceType, resourceId, addImage } = this.props;
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("mainImage", JSON.stringify(mainImage));
    addImage(resourceType, resourceId, formData);
  }

  render() {
    const { description, mainImage } = this.state;
    return (
      <form className="image-form" onSubmit={this.handleSubmit}>
        <input
          type="file"
          className="image-file-input"
          id="custom-file"
          onChange={this.updateImageFile}
        />
        <input
          type="text"
          placeholder="Description..."
          value={description}
          onChange={this.updateDescription}
        />
        <label>
          <input
            type="checkbox"
            checked={mainImage}
            onChange={this.updateMainImage}
          />
          Make this the main image?
        </label>
        <button className="big-button" type="submit">
          <FontAwesomeIcon icon="save" />
          <span>Save Image</span>
        </button>
      </form>
    );
  }
}
