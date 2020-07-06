import React, { Component } from "react";
import { makeFriendlyTime, joinObjectLinks } from "../../util/formatting_util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../loading/loading_spinner";
import EditTrackFormContainer from "./edit_track_form_container";

export default class TracksIndexItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTrackPersonnel: this.props.showPersonnel,
      trackPersonnelLoaded: false,
      editTrack: false,
    };
    this.toggleTrackPersonnel = this.toggleTrackPersonnel.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.closeEditForm = this.closeEditForm.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showPersonnel !== this.props.showPersonnel) {
      this.setState({
        showTrackPersonnel: this.props.showPersonnel,
      });
    }
    if (
      !this.state.trackPersonnelLoaded &&
      this.state.showTrackPersonnel &&
      !this.props.trackPersonnelLoading
    ) {
      this.setState({ trackPersonnelLoaded: true });
    }
  }

  toggleTrackPersonnel() {
    const { track, fetchResourcePersonnel, loadedTrackPersonnel } = this.props;
    const { showTrackPersonnel, trackPersonnelLoaded } = this.state;
    if (!trackPersonnelLoaded && !loadedTrackPersonnel) {
      fetchResourcePersonnel("track", track._id);
      this.setState({
        showTrackPersonnel: !showTrackPersonnel,
      });
    } else {
      this.setState({ showTrackPersonnel: !showTrackPersonnel });
    }
  }

  toggleEditForm() {
    const { track, fetchResourcePersonnel, loadedTrackPersonnel } = this.props;
    const { editTrack, trackPersonnelLoaded } = this.state;
    if (!trackPersonnelLoaded && !loadedTrackPersonnel) {
      fetchResourcePersonnel("track", track._id);
      this.setState({
        editTrack: !editTrack,
      });
    } else {
      this.setState({ editTrack: !editTrack });
    }
  }

  closeEditForm() {
    this.setState({ editTrack: false, trackPersonnelLoaded: false });
  }

  render() {
    const {
      track,
      statePersonnel,
      ordered,
      order,
      trackPersonnelLoading,
      showEditButtons,
    } = this.props;
    const { title, duration, deleted, personnel, mainArtists, writers } = track;
    const { showTrackPersonnel, trackPersonnelLoaded, editTrack } = this.state;
    const anyCredits =
      personnel.length > 0 || mainArtists.length > 0 || writers.length > 0;

    return (
      <li
        className={`tracks-index-item tracks-index-track-item ${
          deleted ? "deleted" : ""
        }`}
      >
        {editTrack ? (
          !trackPersonnelLoading || trackPersonnelLoaded ? (
            <div>
              <button
                className="big-button white-button"
                onClick={this.toggleEditForm}
              >
                Cancel
              </button>
              <EditTrackFormContainer
                track={track}
                toggleEditForm={this.closeEditForm}
              />
            </div>
          ) : (
            <div className="track-personnel-details">
              <LoadingSpinner />
            </div>
          )
        ) : (
          <div className="main-track-details">
            <span className="track-expand-info">
              <button
                className="icon-button"
                onClick={this.toggleTrackPersonnel}
              >
                <FontAwesomeIcon
                  icon={showTrackPersonnel ? "minus-square" : "plus-square"}
                />
              </button>
            </span>
            <span className="track-order">
              {ordered ? (deleted ? `${order}*` : order) : "*"}
            </span>
            <span className="track-title">
              {title}
              {deleted
                ? " [track deleted from database]"
                : showEditButtons && (
                    <button
                      className="icon-button"
                      onClick={this.toggleEditForm}
                    >
                      <FontAwesomeIcon icon="edit" />
                    </button>
                  )}
            </span>
            <span className="track-duration">
              {deleted
                ? `${makeFriendlyTime(duration)}*`
                : makeFriendlyTime(duration)}
            </span>
          </div>
        )}
        {showTrackPersonnel &&
          !editTrack &&
          (!trackPersonnelLoading || trackPersonnelLoaded ? (
            <div className="track-personnel-details">
              {anyCredits ? (
                <>
                  <div className="track-personnel-main">
                    {mainArtists.length > 0 && (
                      <span>
                        <span className="track-personnel-label">
                          Performed by:
                        </span>
                        {joinObjectLinks(
                          mainArtists.map(artist => statePersonnel[artist])
                        )}
                      </span>
                    )}
                    {writers.length > 0 && (
                      <span>
                        <span className="track-personnel-label">
                          Written by:
                        </span>
                        {joinObjectLinks(
                          writers.map(writer => statePersonnel[writer])
                        )}
                      </span>
                    )}
                  </div>
                  {personnel.length > 0 && (
                    <div className="track-personnel-credits">
                      <span className="track-personnel-label">Credits:</span>
                      {personnel.map((personnel, index) => {
                        const personnelObjects = personnel.personnelIds.map(
                          id => statePersonnel[id]
                        );
                        return (
                          <span
                            key={`${personnel._id}-${index}`}
                            className="track-personnel-credit"
                          >
                            {personnel.role} —{" "}
                            {joinObjectLinks(personnelObjects)}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="track-personnel-main">
                  <span>No track credits added yet...</span>
                </div>
              )}
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
