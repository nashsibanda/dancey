import React from "react";
import plainRecordImage from "../../assets/plain_record.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import countries from "../../util/validation/countries";
import { Helmet } from "react-helmet";
import ImagesModalContainer from "../images/images_modal_container";
import LoadingSpinner from "../loading/loading_spinner";
import moment from "moment";
import StringArraySelect from "../util/string_array_select";

export default class PersonnelMainInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateOfBirth:
        moment(this.props.personnel.dateOfBirth).format("Y-MM-DD") || "",
      editDateOfBirth: false,
      countryOfOrigin: this.props.personnel.countryOfOrigin || "",
      editCountry: false,
      alsoKnownAs:
        this.props.personnel.alsoKnownAs.length > 0
          ? this.props.personnel.alsoKnownAs
          : [],
      editName: false,
      name: this.props.personnel.name || "",
      editLabel: false,
      showImageModal: false,
      editAlsoKnownAs: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.updateField = this.updateField.bind(this);
    this.updateSelectField = this.updateSelectField.bind(this);
    this.toggleImageModal = this.toggleImageModal.bind(this);
    this.updateAlsoKnownAs = this.updateAlsoKnownAs.bind(this);
  }

  // componentDidMount() {
  //   const { fetchResourcePersonnel, resourceType, resourceId } = this.props;
  //   fetchResourcePersonnel(resourceType, resourceId);
  // }

  // componentDidUpdate(prevProps) {
  //   if (
  //     (prevProps.loadingPersonnel && !this.props.loadingPersonnel) ||
  //     prevProps.release.alsoKnownAs !== this.props.personnel.alsoKnownAs
  //   ) {
  //     const { release, statePersonnel } = this.props;
  //     const alsoKnownAs = release.alsoKnownAs.map(
  //       artistId => statePersonnel[artistId]
  //     );
  //     this.setState({ alsoKnownAs });
  //   }

  //   if (
  //     (prevProps.loadingPersonnel && !this.props.loadingPersonnel) ||
  //     prevProps.release.label !== this.props.personnel.label
  //   ) {
  //     const { release, statePersonnel } = this.props;
  //     const label = release.label.map(labelId => statePersonnel[labelId]);
  //     this.setState({ label });
  //   }
  // }

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
    if (field === "dateOfBirth") {
      return e =>
        this.setState({
          [field]: parseInt(e.currentTarget.value),
        });
    } else {
      return e => this.setState({ [field]: e.currentTarget.value });
    }
  }

  updateAlsoKnownAs(array) {
    this.setState({ alsoKnownAs: array });
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
      this.props.updatePersonnel(this.props.personnel._id, updateData);
      this.setState({ [toggle]: false });
    };
  }

  render() {
    const { personnel, showEditButtons, loadingPersonnel } = this.props;
    const { images, name, _id } = personnel;
    const {
      editDateOfBirth,
      dateOfBirth,
      countryOfOrigin,
      editCountry,
      alsoKnownAs,
      showImageModal,
      editAlsoKnownAs,
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
        {loadingPersonnel ? (
          <div className="resource-details">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="resource-details">
            {alsoKnownAs && (
              <div className="resource-heading">
                <h2>{name}</h2>
                <Helmet>
                  <title>{name}</title>
                </Helmet>
              </div>
            )}
            <div>
              <span className="details-label">Also Known As:</span>
              {editAlsoKnownAs ? (
                <form
                  className="resource-main-info-form"
                  onSubmit={this.handleSubmit("alsoKnownAs", "editAlsoKnownAs")}
                >
                  <StringArraySelect
                    array={alsoKnownAs}
                    updateArray={this.updateAlsoKnownAs}
                  />
                  <button className="icon-button" type="submit">
                    <FontAwesomeIcon icon="save" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={this.toggleForm("editAlsoKnownAs")}
                  >
                    <FontAwesomeIcon icon="undo-alt" />
                  </button>
                </form>
              ) : (
                <span className="details-value">
                  {alsoKnownAs && (
                    <span>
                      {alsoKnownAs.length > 0 ? alsoKnownAs.join(", ") : "N/A"}
                    </span>
                  )}
                  {showEditButtons && (
                    <button
                      className="icon-button"
                      type="button"
                      onClick={this.toggleForm("editAlsoKnownAs")}
                    >
                      <FontAwesomeIcon icon="edit" />
                    </button>
                  )}
                </span>
              )}
            </div>
            <div>
              <span className="details-label">Country Of Origin:</span>
              {editCountry ? (
                <form
                  className="resource-main-info-form"
                  onSubmit={this.handleSubmit("countryOfOrigin", "editCountry")}
                >
                  <select
                    onChange={this.updateField("countryOfOrigin")}
                    value={countryOfOrigin}
                    placeholder="Country Of Origin"
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
                  {countryOfOrigin && <span>{countryOfOrigin}</span>}
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
              <span className="details-label">Date of Birth:</span>
              {editDateOfBirth ? (
                <form
                  className="resource-main-info-form"
                  onSubmit={this.handleSubmit("dateOfBirth", "editDateOfBirth")}
                >
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={this.updateField("dateOfBirth")}
                  ></input>
                  <button className="icon-button" type="submit">
                    <FontAwesomeIcon icon="save" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={this.toggleForm("editDateOfBirth")}
                  >
                    <FontAwesomeIcon icon="undo-alt" />
                  </button>
                </form>
              ) : (
                <span className="details-value">
                  {dateOfBirth && (
                    <span>{moment(dateOfBirth).format("LL")}</span>
                  )}
                  {showEditButtons && (
                    <button
                      className="icon-button"
                      type="button"
                      onClick={this.toggleForm("editDateOfBirth")}
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
