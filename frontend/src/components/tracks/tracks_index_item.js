import React, { Component } from "react";
import { makeFriendlyTime, joinObjectLinks } from "../../util/formatting_util";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../loading/loading_spinner";

export default class TracksIndexItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTrackPersonnel: this.props.showPersonnel,
      trackPersonnelLoaded: this.props.showPersonnel
        ? this.props.showPersonnel
        : false,
    };
    this.toggleTrackPersonnel = this.toggleTrackPersonnel.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showPersonnel !== this.props.showPersonnel) {
      this.setState({ showTrackPersonnel: this.props.showPersonnel });
    }
  }

  toggleTrackPersonnel() {
    const { track, fetchResourcePersonnel, loadedTrackPersonnel } = this.props;
    const { showTrackPersonnel, trackPersonnelLoaded } = this.state;
    if (!trackPersonnelLoaded && !loadedTrackPersonnel) {
      fetchResourcePersonnel("track", track._id);
      this.setState({
        showTrackPersonnel: !showTrackPersonnel,
        trackPersonnelLoaded: true,
      });
    } else {
      this.setState({ showTrackPersonnel: !showTrackPersonnel });
    }
  }

  render() {
    const {
      track,
      statePersonnel,
      ordered,
      order,
      trackPersonnelLoading,
    } = this.props;
    const { title, duration } = track;
    const { showTrackPersonnel } = this.state;
    return (
      <li className="tracks-index-item tracks-index-track-item">
        <div className="main-track-details">
          <span className="track-expand-info">
            <button className="icon-button" onClick={this.toggleTrackPersonnel}>
              <FontAwesomeIcon
                icon={showTrackPersonnel ? "minus-square" : "plus-square"}
              />
            </button>
          </span>
          <span className="track-order">{ordered ? order : "*"}</span>
          <span className="track-title">{title}</span>
          <span className="track-duration">{makeFriendlyTime(duration)}</span>
        </div>
        {showTrackPersonnel &&
          (!trackPersonnelLoading ? (
            <div className="track-personnel-details">
              <div className="track-personnel-main">
                <span>
                  <span className="track-personnel-label">Performed by:</span>
                  {joinObjectLinks(
                    track.mainArtists.map(artist => statePersonnel[artist])
                  )}
                </span>
                <span>
                  <span className="track-personnel-label">Written by:</span>
                  {joinObjectLinks(
                    track.writers.map(writer => statePersonnel[writer])
                  )}
                </span>
              </div>
              <div className="track-personnel-credits">
                <span className="track-personnel-label">Credits:</span>
                {track.personnel.map((personnel, index) => {
                  const personnelObject = statePersonnel[personnel.personnelId];
                  return (
                    <span
                      key={`${personnelObject._id}-${index}`}
                      className="track-personnel-credit"
                    >
                      {personnel.role} —{" "}
                      <Link to={`personnel/${personnelObject._id}`}>
                        {personnelObject.name}
                      </Link>
                    </span>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="track-personnel-details">
              <LoadingSpinner />
            </div>
          ))}
      </li>
    );
  }
}
