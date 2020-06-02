import React, { Component } from "react";
import TracksIndexItemContainer from "./tracks_index_item_container";
import { makeFriendlyTime } from "../../util/formatting_util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class TracksIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoad: false,
      showTrackPersonnel: false,
      loadedTrackPersonnel: false,
    };
    this.toggleTrackPersonnel = this.toggleTrackPersonnel.bind(this);
  }

  componentDidMount() {
    const {
      fetchResourceTracks,
      fetchResourceTracksPersonnel,
      resourceType,
      resourceId,
    } = this.props;
    fetchResourceTracks(resourceType, resourceId);
    if (this.state.showTrackPersonnel && !this.state.loadedTrackPersonnel) {
      fetchResourceTracksPersonnel(resourceType, resourceId);
      this.setState({ initialLoad: true, loadedTrackPersonnel: true });
    } else {
      this.setState({ initialLoad: true });
    }
  }

  toggleTrackPersonnel() {
    const { loadedTrackPersonnel, showTrackPersonnel } = this.state;
    const {
      fetchResourceTracksPersonnel,
      resourceType,
      resourceId,
    } = this.props;
    if (!loadedTrackPersonnel) {
      fetchResourceTracksPersonnel(resourceType, resourceId);
      this.setState({
        showTrackPersonnel: !showTrackPersonnel,
        loadedTrackPersonnel: true,
      });
    } else {
      this.setState({ showTrackPersonnel: !showTrackPersonnel });
    }
  }

  render() {
    const {
      stateTracks,
      tracksLoading,
      hideHeader,
      showEditButtons,
    } = this.props;
    const {
      initialLoad,
      showTrackPersonnel,
      loadedTrackPersonnel,
    } = this.state;

    if (initialLoad && !tracksLoading) {
      const trackListing = this.props.trackListing
        ? this.props.trackListing
        : null;
      let indexTracks, totalDuration;

      if (!!trackListing) {
        indexTracks = trackListing
          .sort((a, b) => a.order - b.order)
          .map(listingItem => stateTracks[listingItem.trackId]);
        totalDuration = indexTracks.reduce(
          (acc, track) => acc + track.duration,
          0
        );
      } else {
        indexTracks = Object.values(stateTracks).sort(
          (a, b) => a.title - b.title
        );
      }
      return (
        <div className="tracks-index-container">
          {!hideHeader && (
            <div className="resource-show-section-header">
              <h2>Track List</h2>
              {showEditButtons && (
                <button className="big-button">
                  <FontAwesomeIcon icon="edit" />
                  <span>Edit Tracks</span>
                </button>
              )}
            </div>
          )}
          <ul className="tracks-index">
            <li className="tracks-index-prefs">
              <button
                className="link-button"
                onClick={this.toggleTrackPersonnel}
              >
                {showTrackPersonnel
                  ? "Hide Track Credits"
                  : "Show Track Credits"}
              </button>
            </li>
            {indexTracks.length > 0 &&
              indexTracks.map((track, index) => {
                return (
                  <TracksIndexItemContainer
                    key={track._id}
                    track={track}
                    ordered={!!trackListing}
                    order={index + 1}
                    showPersonnel={showTrackPersonnel}
                    loadedTrackPersonnel={loadedTrackPersonnel}
                  />
                );
              })}
            {!!trackListing && (
              <li className="tracks-index-item">
                <div className="main-track-details">
                  <span className="tracks-total-duration">
                    {trackListing.length} track
                    {trackListing.length === 1 ? "" : "s"} — Total Duration:{" "}
                    {makeFriendlyTime(totalDuration)}
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
      );
    } else {
      return <p>LOADING</p>;
    }
  }
}
