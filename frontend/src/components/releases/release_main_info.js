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
import ImagesModalContainer from "../images/images_modal_container";
import LoadingSpinner from "../loading/loading_spinner";
import LabelCatalogueNumberFormContainer from "./label_catalogue_number_form_container";

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
      showImageModal: false,
      initialLoad: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.updateField = this.updateField.bind(this);
    this.getDefaultPersonnel = this.getDefaultPersonnel.bind(this);
    this.updateSelectField = this.updateSelectField.bind(this);
    this.toggleImageModal = this.toggleImageModal.bind(this);
  }

  componentDidMount() {
    const { fetchResourcePersonnel, resourceType, resourceId } = this.props;
    fetchResourcePersonnel(resourceType, resourceId);
    this.setState({ initialLoad: true });
  }

  toggleForm(toggle) {
    return e =>
      this.setState({
        [toggle]: !this.state[toggle],
      });
  }

  toggleImageModal(e) {
    e.preventDefault();
    this.setState({ showImageModal: !this.state.showImageModal });
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
    const {
      release,
      showEditButtons,
      loadingPersonnel,
      statePersonnel,
    } = this.props;
    const { images, _id } = release;
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
      showImageModal,
      editTitle,
      title,
      editMainArtists,
      initialLoad,
    } = this.state;

    const mainImage = images.find(({ mainImage }) => mainImage === true);

    return (
      <div className="resource-main-info">
        <div className="resource-image">
          <img
            src={mainImage ? mainImage.imageUrl : plainRecordImage}
            className={mainImage ? "main-image" : "main-image default-image"}
            alt={
              mainImage
                ? mainImage.description
                : "Default album placeholder image - upload a new one!"
            }
            onClick={this.toggleImageModal}
          />
          <button className="big-button" onClick={this.toggleImageModal}>
            <FontAwesomeIcon icon="images" />
            <span>More Images</span>
          </button>
          {showImageModal && (
            <ImagesModalContainer
              toggleImageModal={this.toggleImageModal}
              resourceType={"release"}
              resourceId={_id}
              images={images}
            />
          )}
        </div>
        {loadingPersonnel || !initialLoad ? (
          <div className="resource-details">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="resource-details">
            {mainArtists && (
              <div className="resource-heading">
                <span>
                  <div>
                    {editMainArtists ? (
                      <form
                        className="resource-main-info-form"
                        onSubmit={this.handleSubmit(
                          "mainArtists",
                          "editMainArtists"
                        )}
                      >
                        <PersonnelSearchContainer
                          formUpdate={this.updateSelectField}
                          multiSelect={true}
                          fieldName={"mainArtists"}
                          placeholderText={"Label(s)..."}
                          defaultSelected={this.getDefaultPersonnel(
                            "mainArtists"
                          )}
                        />
                        <button className="icon-button" type="submit">
                          <FontAwesomeIcon icon="save" />
                        </button>
                        <button
                          className="icon-button"
                          type="button"
                          onClick={this.toggleForm("editMainArtists")}
                        >
                          <FontAwesomeIcon icon="undo-alt" />
                        </button>
                      </form>
                    ) : (
                      <span className="resource-title-value">
                        {mainArtists.length > 0 && (
                          <h2>
                            {Object.values(statePersonnel).length > 0 &&
                              joinObjectLinks(
                                release.mainArtists.map(
                                  mainArtistId => statePersonnel[mainArtistId]
                                )
                              )}
                          </h2>
                        )}
                        {showEditButtons && (
                          <button
                            className="icon-button"
                            type="button"
                            onClick={this.toggleForm("editMainArtists")}
                          >
                            <FontAwesomeIcon icon="edit" />
                            <span>Edit Main Artists</span>
                          </button>
                        )}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2>—</h2>
                  </div>
                  <div>
                    {editTitle ? (
                      <form
                        className="resource-main-info-form heading-form"
                        onSubmit={this.handleSubmit("title", "editTitle")}
                      >
                        <input
                          type="text"
                          className="resource-title-input"
                          onChange={this.updateField("title")}
                          value={title}
                        />
                        <div>
                          <button className="icon-button" type="submit">
                            <FontAwesomeIcon icon="save" />
                          </button>
                          <button
                            className="icon-button"
                            type="button"
                            onClick={this.toggleForm("editTitle")}
                          >
                            <FontAwesomeIcon icon="undo-alt" />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <span className="resource-title-value">
                        <h2>{release.title}</h2>
                        {showEditButtons && (
                          <button
                            className="icon-button"
                            type="button"
                            onClick={this.toggleForm("editTitle")}
                          >
                            <FontAwesomeIcon icon="edit" />
                            <span>Edit Title</span>
                          </button>
                        )}
                      </span>
                    )}
                  </div>
                </span>
                <Helmet>
                  <title>
                    {Object.values(statePersonnel).length > 0 &&
                      makeReleaseHtmlTitle(
                        release.mainArtists.map(
                          labelId => statePersonnel[labelId]
                        ),
                        this.state
                      )}
                  </title>
                </Helmet>
              </div>
            )}
            <div>
              <span className="details-label">Label:</span>
              {editLabel ? (
                <LabelCatalogueNumberFormContainer
                  toggleForm={this.toggleForm("editLabel")}
                  resourceId={_id}
                  currentLabel={release.label}
                />
              ) : (
                <span className="details-value">
                  {label.length > 0 && (
                    <>
                      {Object.values(statePersonnel).length > 0 &&
                        release.label.map((labelObj, index) => (
                          <div
                            key={`labelIds-${index}`}
                            className="label-value-div"
                          >
                            {joinObjectLinks(
                              labelObj.labelIds.map(id => statePersonnel[id])
                            )}{" "}
                            — {labelObj.catalogueNumber}
                          </div>
                        ))}
                    </>
                  )}
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
                  {format && <span>{release.format}</span>}
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
                  className="resource-main-info-form"
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
                  {releaseCountry && <span>{release.releaseCountry}</span>}
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
                  {releaseYear && <span>{release.releaseYear}</span>}
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
        )}
      </div>
    );
  }
}
