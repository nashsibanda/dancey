import React, { Component } from "react";
import PersonnelSearchContainer from "../search/personnel_search_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      personnelInputSelector: "",
    };
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSelectField = this.updateSelectField.bind(this);
    this.selectPersonnelField = this.selectPersonnelField.bind(this);
    this.getDefaultArtists = this.getDefaultArtists.bind(this);
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
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateSelectField(field, value) {
    this.setState({ [field]: value });
  }

  selectPersonnelField(field) {
    return e =>
      this.setState({
        personnelInputSelector:
          this.state.personnelInputSelector === field ? "" : field,
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
    this.props.createTrackListing(trackData, this.props.releaseId);
  }

  getDefaultArtists() {
    const { statePersonnel, stateReleases, releaseId } = this.props;
    return releaseId && Object.keys(statePersonnel).length > 0
      ? stateReleases[releaseId].mainArtists.map(
          artistId => statePersonnel[artistId]
        )
      : [];
  }

  render() {
    const {
      title,
      durationMins,
      durationSecs,
      personnelInputSelector,
    } = this.state;
    // const {
    //   statePersonnel,
    //   stateTracks,
    //   stateReleases,
    //   releaseId,
    // } = this.props;

    return (
      <form className="track-form" onSubmit={this.handleSubmit}>
        <div className="form-section">
          <span>Track Details:</span>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            className="title-input"
            onChange={this.updateField("title")}
          />
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
            Add Track
          </button>
        </div>
        <div className="form-section add-personnel-menu">
          <button
            className="link-button"
            onClick={this.selectPersonnelField("mainArtists")}
          >
            <FontAwesomeIcon icon="plus" />
            <span>Add Artist(s)</span>
          </button>
          <button
            className="link-button"
            onClick={this.selectPersonnelField("writers")}
          >
            <FontAwesomeIcon icon="plus" />
            <span>Add Writer(s)</span>
          </button>
          <button
            className="link-button"
            onClick={this.selectPersonnelField("personnel")}
          >
            <FontAwesomeIcon icon="plus" />
            <span>Add Other Credits</span>
          </button>
        </div>
        {personnelInputSelector === "mainArtists" && (
          <div className="form-section">
            <PersonnelSearchContainer
              formUpdate={this.updateSelectField}
              fieldName={"mainArtists"}
              placeholderText={"Main Artist(s)..."}
              defaultSelected={this.getDefaultArtists()}
            />
          </div>
        )}
        {/* TODO ADD PERSONNEL, ARTIST, WRITER INPUTS - USE MATERIAL UI ASYNC DROPDOWNS */}
      </form>
    );
  }
}
