import React, { Component } from "react";
import PersonnelSearchContainer from "../search/personnel_search_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import analogSides from "../../util/validation/analog_sides";
import PersonnelRoleFormSection from "../personnel/personnel_role_form_section";

export default class TrackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      durationMins: "",
      durationSecs: "",
      mainArtists: null,
      personnel: null,
      writers: null,
      originalVersion: "",
      _id: this.props.track ? this.props.track._id : null,
      showMainArtistsField: true,
      showWritersField: true,
      showPersonnelField: true,
      sideOrDisc: "",
      order: "",
      numberOfSides: this.props.numberOfSides,
      sideLabels: [],
      letterSides: this.props.letterSides,
    };
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSelectField = this.updateSelectField.bind(this);
    this.showPersonnelField = this.showPersonnelField.bind(this);
    this.addSide = this.addSide.bind(this);
    this.getSideLabels = this.getSideLabels.bind(this);
    this.updatePersonnelField = this.updatePersonnelField.bind(this);
  }

  componentDidMount() {
    if (this.props.track) {
      const {
        title,
        duration,
        personnel,
        originalVersion,
        mainArtists,
        writers,
        _id,
      } = this.props.track;
      this.setState({
        title,
        personnel,
        originalVersion,
        mainArtists,
        writers,
        durationMins: parseInt(duration / 60),
        durationSecs: duration % 60,
        _id,
      });
    } else if (this.props.releaseId) {
      const { stateReleases, releaseId } = this.props;
      this.setState({ mainArtists: stateReleases[releaseId].mainArtists });
    }
    if (this.props.releaseFormat) {
      this.setState({ sideLabels: this.getSideLabels() });
    }
  }

  getSideLabels(numberOfLabels = this.state.numberOfSides) {
    return this.props.letterSides
      ? analogSides.slice(0, numberOfLabels)
      : [...Array(numberOfLabels).keys()].map(x => x + 1);
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateSelectField(field, value) {
    const selectedIds = value ? value.map(x => x.value) : null;
    this.setState({ [field]: selectedIds });
  }

  updatePersonnelField(value) {
    this.setState({ personnel: value.length > 0 ? value : null });
  }

  showPersonnelField(field) {
    return e =>
      this.setState({
        [field]: !this.state[field],
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      title,
      durationMins,
      durationSecs,
      mainArtists,
      personnel,
      writers,
      originalVersion,
      _id,
      sideOrDisc,
      order,
    } = this.state;
    const trackData = {
      title,
      duration: parseInt(durationMins) * 60 + parseInt(durationSecs),
      ...(!!mainArtists && { mainArtists }),
      ...(!!personnel && { personnel }),
      ...(!!writers && { writers }),
      ...(!!originalVersion && { originalVersion }),
      ...(!!_id && { _id }),
    };
    if (!_id) {
      const trackReleaseData = {
        track: trackData,
        trackListing: { order, sideOrDisc },
      };
      this.props.submitTrack(trackReleaseData, this.props.releaseId);
    } else {
      this.props.submitTrack(trackData, _id);
      this.props.toggleEditForm();
    }
  }

  addSide() {
    const newSides = this.state.numberOfSides + 1;
    this.setState({
      numberOfSides: newSides,
      sideLabels: this.getSideLabels(newSides),
    });
  }

  makeCurrentPersonnelForFormSection(currentPersonnel) {
    const sectionPersonnelArray = currentPersonnel.map(personnel => {
      const { personnelIds } = personnel;
      const personnelDisplay = personnelIds.map(id => {
        return this.props.statePersonnel[id]["name"];
      });
      return Object.assign({}, personnel, { personnelDisplay });
    });
    return sectionPersonnelArray;
  }

  render() {
    const {
      title,
      durationMins,
      durationSecs,
      order,
      sideLabels,
      showMainArtistsField,
      showPersonnelField,
      showWritersField,
      _id,
    } = this.state;
    const {
      releaseFormat,
      getDefaultArtists,
      releaseId,
      //   statePersonnel,
      //   stateTracks,
      //   stateReleases,
    } = this.props;

    return (
      <form className="track-form" onSubmit={this.handleSubmit}>
        <div className="form-section">
          {/* <span>Track Details:</span> */}
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            className="title-input"
            onChange={this.updateField("title")}
          />
          {!_id && (
            <div className="track-number">
              <div>Track Number</div>
              <button
                className="link-button"
                type="button"
                onClick={this.addSide}
              >
                <FontAwesomeIcon icon="plus" />
                <span>Add Side</span>
              </button>
              <div>
                <select
                  className="track-side-input"
                  onChange={this.updateField("sideOrDisc")}
                  defaultValue={""}
                >
                  <option disabled value="">
                    Side
                  </option>
                  {sideLabels.length > 0 &&
                    sideLabels.map((side, index) => (
                      <option
                        value={index + 1}
                        key={`${releaseFormat}${side}${index}`}
                      >
                        {side}
                      </option>
                    ))}
                </select>
                <input
                  type="number"
                  placeholder="No."
                  value={order}
                  min={1}
                  required
                  className="track-number-input"
                  onChange={this.updateField("order")}
                />
              </div>
            </div>
          )}
          <div>
            <div>Duration</div>
            <div>
              <input
                type="number"
                placeholder="MM"
                value={durationMins}
                onChange={this.updateField("durationMins")}
                className="time-input"
              />
              {" : "}
              <input
                type="number"
                placeholder="SS"
                value={durationSecs}
                required
                max={59}
                className="time-input"
                onChange={this.updateField("durationSecs")}
              />
            </div>
          </div>
          <button type="submit" className="big-button">
            {_id ? "Update Track" : "Add Track"}
          </button>
        </div>
        <div className="form-section add-personnel-menu">
          <button
            className="link-button"
            type="button"
            onClick={this.showPersonnelField("showMainArtistsField")}
          >
            <FontAwesomeIcon icon={showMainArtistsField ? "minus" : "plus"} />
            <span>{showMainArtistsField ? "Ignore" : "Add"} Artist(s)</span>
          </button>
          <button
            className="link-button"
            type="button"
            onClick={this.showPersonnelField("showWritersField")}
          >
            <FontAwesomeIcon icon={showWritersField ? "minus" : "plus"} />
            <span>{showWritersField ? "Ignore" : "Add"} Writer(s)</span>
          </button>
          <button
            className="link-button"
            type="button"
            onClick={this.showPersonnelField("showPersonnelField")}
          >
            <FontAwesomeIcon icon={showPersonnelField ? "minus" : "plus"} />
            <span>{showPersonnelField ? "Ignore" : "Add"} Other Credits</span>
          </button>
        </div>
        {showMainArtistsField && (
          <div className="form-section">
            <span>Main Artist(s):</span>
            <PersonnelSearchContainer
              formUpdate={this.updateSelectField}
              multiSelect={true}
              fieldName={"mainArtists"}
              placeholderText={"Main Artist(s)..."}
              defaultSelected={
                _id
                  ? getDefaultArtists("mainArtists", _id)
                  : getDefaultArtists("mainArtists", releaseId)
              }
            />
          </div>
        )}
        {showWritersField && (
          <div className="form-section">
            <span>Writer(s):</span>
            <PersonnelSearchContainer
              formUpdate={this.updateSelectField}
              multiSelect={true}
              fieldName={"writers"}
              placeholderText={"Writer(s)..."}
              defaultSelected={_id ? getDefaultArtists("writers", _id) : ""}
            />
          </div>
        )}
        {showPersonnelField && (
          <div className="form-section personnel-section">
            <span>Other Credit(s):</span>
            <PersonnelRoleFormSection
              currentPersonnel={
                _id
                  ? this.makeCurrentPersonnelForFormSection(
                      this.props.track.personnel
                    )
                  : []
              }
              formUpdate={this.updatePersonnelField}
            />
          </div>
        )}
      </form>
    );
  }
}
