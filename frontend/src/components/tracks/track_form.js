import React, { Component } from "react";
import PersonnelSearchContainer from "../search/personnel_search_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import analogSides from "../../util/validation/analog_sides";

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
      _id: null,
      showMainArtistsField: false,
      showWritersField: false,
      showPersonnelField: false,
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
    this.getDefaultArtists = this.getDefaultArtists.bind(this);
    this.addSide = this.addSide.bind(this);
    this.getSideLabels = this.getSideLabels.bind(this);
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
    this.setState({ [field]: value });
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
      this.props.submitTrack(trackData, this.props.releaseId);
    }
  }

  getDefaultArtists() {
    const { statePersonnel, stateReleases, releaseId } = this.props;
    return releaseId && Object.keys(statePersonnel).length > 0
      ? stateReleases[releaseId].mainArtists.map(
          artistId => statePersonnel[artistId]
        )
      : [];
  }

  addSide() {
    const newSides = this.state.numberOfSides + 1;
    this.setState({
      numberOfSides: newSides,
      sideLabels: this.getSideLabels(newSides),
    });
  }

  render() {
    const {
      title,
      durationMins,
      durationSecs,
      personnelInputSelector,
      sideOrDisc,
      order,
      sideLabels,
      showMainArtistsField,
      showPersonnelField,
      showWritersField,
    } = this.state;
    const {
      releaseFormat,
      //   statePersonnel,
      //   stateTracks,
      //   stateReleases,
      //   releaseId,
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
          <div>
            <div>Duration</div>
            <div>
              <input
                type="number"
                placeholder="MM"
                value={durationMins}
                min={0}
                onChange={this.updateField("durationMins")}
                className="time-input"
              />
              {" : "}
              <input
                type="number"
                placeholder="SS"
                value={durationSecs}
                required
                min={1}
                max={59}
                className="time-input"
                onChange={this.updateField("durationSecs")}
              />
            </div>
          </div>
          <button type="submit" className="big-button">
            Add Track
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
            <span>Main Artists:</span>
            <PersonnelSearchContainer
              formUpdate={this.updateSelectField}
              fieldName={"mainArtists"}
              placeholderText={"Main Artist(s)..."}
              defaultSelected={this.getDefaultArtists()}
            />
          </div>
        )}
        {showWritersField && (
          <div className="form-section">
            <span>Writers:</span>
            <PersonnelSearchContainer
              formUpdate={this.updateSelectField}
              fieldName={"writers"}
              placeholderText={"Writer(s)..."}
            />
          </div>
        )}
        {/* TODO ADD PERSONNEL, ARTIST, WRITER INPUTS - USE ASYNC SELECT */}
      </form>
    );
  }
}
