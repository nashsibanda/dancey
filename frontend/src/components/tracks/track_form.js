import React, { Component } from "react";

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
      showPersonnelDetails: false,
    };
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    }
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
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
    this.props.createTrack(trackData);
  }

  render() {
    const { style } = this.props;
    const { title, durationMins, durationSecs } = this.state;
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
        <div className="form-section">
          {/* TODO ADD PERSONNEL, ARTIST, WRITER INPUTS - USE MATERIAL UI ASYNC DROPDOWNS */}
        </div>
      </form>
    );
  }
}
