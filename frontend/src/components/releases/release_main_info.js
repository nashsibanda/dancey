import React from "react";
import {
  joinObjectLinks,
  makeReleaseHtmlTitle,
} from "../../util/formatting_util";
import plainRecordImage from "../../assets/plain_record.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import countries from "../../util/validation/countries";
import formats from "../../util/validation/formats";
import { Helmet } from "react-helmet";

export default class ReleaseMainInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      releaseYear: this.props.release.releaseYear || "",
      editYear: false,
      releaseCountry: this.props.release.releaseCountry || "",
      editCountry: false,
      format: this.props.release.format || "",
      editFormat: false,
      mainArtists: null,
      editTitle: false,
      title: this.props.release.title || "",
      editLabel: false,
      label: null,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    const { fetchResourcePersonnel, resourceType, resourceId } = this.props;
    fetchResourcePersonnel(resourceType, resourceId);
  }

  componentDidUpdate(prevProps) {
    if (!this.state.mainArtists && prevProps.loading && !this.props.loading) {
      const { release, statePersonnel } = this.props;
      const mainArtists = release.mainArtists.map(
        artistId => statePersonnel[artistId]
      );
      this.setState({ mainArtists });
    }

    if (!this.state.label && prevProps.loading && !this.props.loading) {
      const { release, statePersonnel } = this.props;
      const label = release.label.map(labelId => statePersonnel[labelId]);
      this.setState({ label });
    }
  }

  toggleForm(field, toggle) {
    return e =>
      this.setState({
        [toggle]: !this.state[toggle],
        [field]: this.props.release[field] || "",
      });
  }

  updateField(field) {
    if (field === "releaseYear") {
      return e =>
        this.setState({
          [field]: parseInt(e.currentTarget.value),
        });
    } else {
      return e => this.setState({ [field]: e.currentTarget.value });
    }
  }

  handleSubmit(field, toggle) {
    return e => {
      e.preventDefault();
      const updateData = {
        [field]: this.state[field],
      };
      this.props.updateRelease(this.props.release._id, updateData);
      this.setState({ [toggle]: false });
    };
  }

  render() {
    const {
      loggedIn,
      release,
      toggleEditButtons,
      showEditButtons,
      loading,
    } = this.props;
    const { images, label, title } = release;
    const {
      editYear,
      releaseYear,
      releaseCountry,
      editCountry,
      editFormat,
      format,
      mainArtists,
    } = this.state;

    const mainImage = images.find(({ mainImage }) => mainImage === true);

    return (
      !loading && (
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
            <button className="big-button">
              <FontAwesomeIcon icon={showEditButtons ? "edit" : "images"} />
              <span>{showEditButtons ? "Edit Images" : "More Images"}</span>
            </button>
          </div>
          <div className="resource-details">
            {loggedIn && (
              <button
                className={
                  "big-button toggle-edit-button " +
                  (showEditButtons ? "edit-mode-on" : "edit-mode-off")
                }
                onClick={toggleEditButtons}
              >
                <FontAwesomeIcon
                  icon={showEditButtons ? "toggle-on" : "toggle-off"}
                />
                <span>
                  {showEditButtons ? "Edit Mode: On" : "Edit Mode: Off"}
                </span>
              </button>
            )}
            {mainArtists && (
              <>
                <h2>
                  {joinObjectLinks(mainArtists)} — {title}
                </h2>
                <Helmet>
                  <title>{makeReleaseHtmlTitle(this.state)}</title>
                </Helmet>
              </>
            )}
            <div>
              <span className="details-label">Label:</span>
              <span className="details-value">{joinObjectLinks(label)}</span>
            </div>
            <div>
              <span className="details-label">Format:</span>
              {editFormat ? (
                <form onSubmit={this.handleSubmit("format", "editFormat")}>
                  <select
                    onChange={this.updateField("format")}
                    value={format}
                    placeholder="Format"
                  >
                    <option disabled value="">
                      Select a release format
                    </option>
                    {formats.map(format => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </select>
                  <button className="icon-button" type="submit">
                    <FontAwesomeIcon icon="save" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={this.toggleForm("format", "editFormat")}
                  >
                    <FontAwesomeIcon icon="undo-alt" />
                  </button>
                </form>
              ) : (
                <span className="details-value">
                  {format}
                  {showEditButtons && (
                    <button
                      className="icon-button"
                      type="button"
                      onClick={this.toggleForm("format", "editFormat")}
                    >
                      <FontAwesomeIcon icon="edit" />
                    </button>
                  )}
                </span>
              )}
            </div>
            <div>
              <span className="details-label">Release Country:</span>
              {editCountry ? (
                <form
                  onSubmit={this.handleSubmit("releaseCountry", "editCountry")}
                >
                  <select
                    onChange={this.updateField("releaseCountry")}
                    value={releaseCountry}
                    placeholder="Release Country"
                  >
                    <option disabled value="">
                      Select a country
                    </option>
                    {Object.keys(countries).map(country => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <button className="icon-button" type="submit">
                    <FontAwesomeIcon icon="save" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={this.toggleForm("releaseCountry", "editCountry")}
                  >
                    <FontAwesomeIcon icon="undo-alt" />
                  </button>
                </form>
              ) : (
                <span className="details-value">
                  {releaseCountry}
                  {showEditButtons && (
                    <button
                      className="icon-button"
                      type="button"
                      onClick={this.toggleForm("releaseCountry", "editCountry")}
                    >
                      <FontAwesomeIcon icon="edit" />
                    </button>
                  )}
                </span>
              )}
            </div>
            <div>
              <span className="details-label">Release Year:</span>
              {editYear ? (
                <form onSubmit={this.handleSubmit("releaseYear", "editYear")}>
                  <input
                    type="number"
                    min="1890"
                    max="2030"
                    value={releaseYear}
                    onChange={this.updateField("releaseYear")}
                  ></input>
                  <button className="icon-button" type="submit">
                    <FontAwesomeIcon icon="save" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={this.toggleForm("releaseYear", "editYear")}
                  >
                    <FontAwesomeIcon icon="undo-alt" />
                  </button>
                </form>
              ) : (
                <span className="details-value">
                  {releaseYear}
                  {showEditButtons && (
                    <button
                      className="icon-button"
                      type="button"
                      onClick={this.toggleForm("releaseYear", "editYear")}
                    >
                      <FontAwesomeIcon icon="edit" />
                    </button>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      )
    );
  }
}
