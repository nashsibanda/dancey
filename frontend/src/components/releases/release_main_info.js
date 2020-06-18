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
import PersonnelSearchContainer from "../search/personnel_search_container";

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
      mainArtists:
        this.props.release.mainArtists.length > 0
          ? this.props.release.mainArtists
          : [],
      editTitle: false,
      title: this.props.release.title || "",
      editLabel: false,
      label:
        this.props.release.label.length > 0 ? this.props.release.label : [],
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.updateField = this.updateField.bind(this);
    this.getDefaultPersonnel = this.getDefaultPersonnel.bind(this);
    this.updateSelectField = this.updateSelectField.bind(this);
  }

  componentDidMount() {
    const { fetchResourcePersonnel, resourceType, resourceId } = this.props;
    fetchResourcePersonnel(resourceType, resourceId);
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.loadingPersonnel && !this.props.loadingPersonnel) ||
      prevProps.release.mainArtists !== this.props.release.mainArtists
    ) {
      const { release, statePersonnel } = this.props;
      const mainArtists = release.mainArtists.map(
        artistId => statePersonnel[artistId]
      );
      this.setState({ mainArtists });
    }

    if (
      (prevProps.loadingPersonnel && !this.props.loadingPersonnel) ||
      prevProps.release.label !== this.props.release.label
    ) {
      const { release, statePersonnel } = this.props;
      const label = release.label.map(labelId => statePersonnel[labelId]);
      this.setState({ label });
    }
  }

  toggleForm(toggle) {
    return e =>
      this.setState({
        [toggle]: !this.state[toggle],
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

  updateSelectField(field, value) {
    const selectedIds = value ? value.map(x => x.value) : null;
    this.setState({ [field]: selectedIds });
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

  getDefaultPersonnel(field) {
    const { release, statePersonnel } = this.props;
    return Object.keys(statePersonnel).length > 0
      ? release[field].map(artistId => statePersonnel[artistId])
      : [];
  }

  render() {
    const { release, showEditButtons, loadingPersonnel } = this.props;
    const { images, title } = release;
    const {
      editYear,
      releaseYear,
      releaseCountry,
      editCountry,
      editFormat,
      format,
      mainArtists,
      editLabel,
      label,
    } = this.state;

    const mainImage = images.find(({ mainImage }) => mainImage === true);

    return (
      !loadingPersonnel && (
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
            {mainArtists && (
              <div className="resource-heading">
                <h2>
                  {joinObjectLinks(mainArtists)} — {title}
                </h2>
                <Helmet>
                  <title>{makeReleaseHtmlTitle(this.state)}</title>
                </Helmet>
              </div>
            )}
            <div>
              <span className="details-label">Label:</span>
              {editLabel ? (
                <form
                  className="resource-main-info-form"
                  onSubmit={this.handleSubmit("label", "editLabel")}
                >
                  <PersonnelSearchContainer
                    formUpdate={this.updateSelectField}
                    fieldName={"label"}
                    placeholderText={"Label(s)..."}
                    defaultSelected={this.getDefaultPersonnel("label")}
                  />
                  <button className="icon-button" type="submit">
                    <FontAwesomeIcon icon="save" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={this.toggleForm("editLabel")}
                  >
                    <FontAwesomeIcon icon="undo-alt" />
                  </button>
                </form>
              ) : (
                <span className="details-value">
                  {label.length > 0 && <span>{joinObjectLinks(label)}</span>}
                  {showEditButtons && (
                    <button
                      className="icon-button"
                      type="button"
                      onClick={this.toggleForm("editLabel")}
                    >
                      <FontAwesomeIcon icon="edit" />
                    </button>
                  )}
                </span>
              )}
            </div>
            <div>
              <span className="details-label">Format:</span>
              {editFormat ? (
                <form
                  className="resource-main-info-form"
                  onSubmit={this.handleSubmit("format", "editFormat")}
                >
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
                    onClick={this.toggleForm("editFormat")}
                  >
                    <FontAwesomeIcon icon="undo-alt" />
                  </button>
                </form>
              ) : (
                <span className="details-value">
                  {format && <span>{format}</span>}
                  {showEditButtons && (
                    <button
                      className="icon-button"
                      type="button"
                      onClick={this.toggleForm("editFormat")}
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
                    onClick={this.toggleForm("editCountry")}
                  >
                    <FontAwesomeIcon icon="undo-alt" />
                  </button>
                </form>
              ) : (
                <span className="details-value">
                  {releaseCountry && <span>{releaseCountry}</span>}
                  {showEditButtons && (
                    <button
                      className="icon-button"
                      type="button"
                      onClick={this.toggleForm("editCountry")}
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
                <form
                  className="resource-main-info-form"
                  onSubmit={this.handleSubmit("releaseYear", "editYear")}
                >
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
                    onClick={this.toggleForm("editYear")}
                  >
                    <FontAwesomeIcon icon="undo-alt" />
                  </button>
                </form>
              ) : (
                <span className="details-value">
                  {releaseYear && <span>{releaseYear}</span>}
                  {showEditButtons && (
                    <button
                      className="icon-button"
                      type="button"
                      onClick={this.toggleForm("editYear")}
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
