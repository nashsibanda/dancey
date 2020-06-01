import React from "react";
import { joinObjectLinks } from "../../util/formatting_util";
import plainRecordImage from "../../assets/plain_record.png";

export default class ReleaseMainInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      releaseYear: this.props.release.releaseYear,
      editYear: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  toggleForm(form) {
    return e => this.setState({ [form]: !this.state[form] });
  }

  updateField(field) {
    if (field === "releaseYear") {
      return e => this.setState({ [field]: parseInt(e.currentTarget.value) });
    } else {
      return e => this.setState({ [field]: e.currentTarget.value });
    }
  }

  handleSubmit(field) {
    return e => {
      e.preventDefault();
      const updateData = {
        [field]: this.state[field],
      };
      this.props.updateRelease(this.props.release._id, updateData);
    };
  }

  render() {
    const {
      loggedIn,
      release,
      toggleEditButtons,
      showEditButtons,
    } = this.props;
    const {
      images,
      mainArtists,
      label,
      format,
      releaseCountry,
      title,
    } = release;
    const { editYear, releaseYear } = this.state;

    const mainImage = images.find(({ mainImage }) => mainImage === true);

    return (
      <div className="resource-main-info">
        <div className="resource-image">
          <img
            src={mainImage ? mainImage.imageUrl : plainRecordImage}
            className={mainImage ? "" : "default-image"}
            alt={
              mainImage
                ? mainImage.description
                : "Default album placeholder image - upload a new one!"
            }
          />
          <button className="big-button">More Images</button>
        </div>
        <div className="resource-details">
          {loggedIn && (
            <button
              className="big-button toggle-edit-button"
              onClick={toggleEditButtons}
            >
              {showEditButtons ? "Finish Editing" : "Edit this Release"}
            </button>
          )}
          <h2>
            {joinObjectLinks(mainArtists)} — {title}
          </h2>
          <div>
            <span className="details-label">Label:</span>
            <span className="details-value">{joinObjectLinks(label)}</span>
          </div>
          <div>
            <span className="details-label">Format:</span>
            <span className="details-value">{format}</span>
          </div>
          <div>
            <span className="details-label">Release Country:</span>
            <span className="details-value">{releaseCountry}</span>
          </div>
          <div>
            <span className="details-label">Release Year:</span>
            {editYear ? (
              <form onSubmit={this.handleSubmit("releaseYear")}>
                <input
                  type="number"
                  min="1890"
                  max="2030"
                  value={releaseYear}
                  onChange={this.updateField("releaseYear")}
                ></input>
                <button type="submit">Submit</button>
                <button type="button" onClick={this.toggleForm("editYear")}>
                  Cancel
                </button>
              </form>
            ) : (
              <span className="details-value">
                {releaseYear}
                {loggedIn && (
                  <button type="button" onClick={this.toggleForm("editYear")}>
                    Edit
                  </button>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}
