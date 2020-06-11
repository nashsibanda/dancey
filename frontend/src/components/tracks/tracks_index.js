import React, { Component } from "react";
import TracksIndexItemContainer from "./tracks_index_item_container";
import { makeFriendlyTime } from "../../util/formatting_util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../loading/loading_spinner";
import TrackListingFormContainer from "./track_listing_form_container";
import analogSides from "../../util/validation/analog_sides";
import plainRecordImage from "../../assets/plain_record.png";

export default class TracksIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoad: false,
      showTrackPersonnel: false,
      loadedTrackPersonnel: false,
      sortRule: !!this.props.trackListing ? "trackOrderAsc" : "alphaAsc",
      showMainEditMenu: true,
      showNewTrackForm: false,
      numberOfSides: null,
      letterSides: null,
      sideLabels: [],
    };
    this.toggleTrackPersonnel = this.toggleTrackPersonnel.bind(this);
    this.makeIndexTracks = this.makeIndexTracks.bind(this);
    this.toggleEditSection = this.toggleEditSection.bind(this);
    this.makeSectionedTracks = this.makeSectionedTracks.bind(this);
  }

  componentDidMount() {
    const {
      fetchResourceTracks,
      fetchResourceTracksPersonnel,
      resourceType,
      resourceId,
      releaseFormat,
    } = this.props;
    fetchResourceTracks(resourceType, resourceId);
    if (this.state.showTrackPersonnel && !this.state.loadedTrackPersonnel) {
      fetchResourceTracksPersonnel(resourceType, resourceId);
      this.setState({ loadedTrackPersonnel: true });
    }
    if (releaseFormat) {
      this.setState(
        {
          numberOfSides: this.getNumberOfSides(),
          letterSides: ["LP", "Cassette"].includes(this.props.releaseFormat),
        },
        () => {
          this.setState({ sideLabels: this.getSideLabels() });
        }
      );
    }
  }

  getSideLabels(numberOfLabels = this.state.numberOfSides) {
    return this.state.letterSides
      ? analogSides.slice(0, numberOfLabels)
      : [...Array(numberOfLabels).keys()].map(x => x + 1);
  }

  componentDidUpdate(prevProps) {
    if (
      !this.state.initialLoad &&
      prevProps.tracksLoading &&
      !this.props.tracksLoading
    ) {
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

  makeIndexTracks(trackListing = this.props.trackListing) {
    const { stateTracks } = this.props;
    switch (this.state.sortRule) {
      case "trackOrderAsc":
        return trackListing
          .sort((a, b) => a.order - b.order)
          .map(listingItem => stateTracks[listingItem.trackId]);
      case "trackOrderDesc":
        return trackListing
          .sort((a, b) => b.order - a.order)
          .map(listingItem => stateTracks[listingItem.trackId]);
      case "alphaAsc":
        return Object.values(stateTracks).sort((a, b) => a.title - b.title);
      case "alphaDesc":
        return Object.values(stateTracks).sort((a, b) => b.title - a.title);
      default:
        return [];
    }
  }

  makeSectionedTracks() {
    const sectionedTracks = [];
    this.state.sideLabels.forEach((label, index) => {
      const sectionListings = this.props.trackListing.filter(
        listing => parseInt(listing.sideOrDisc) === index + 1
      );
      sectionedTracks.push(this.makeIndexTracks(sectionListings));
    });
    return sectionedTracks;
  }

  getNumberOfSides() {
    return this.props.trackListing
      .map(listing => listing.sideOrDisc)
      .reduce((acc, curr) => (acc > curr ? acc : curr), 0);
  }

  toggleEditSection(field) {
    return e => this.setState({ [field]: !this.state[field] });
  }

  render() {
    const {
      hideHeader,
      showEditButtons,
      trackListing,
      resourceId,
      releaseFormat,
    } = this.props;
    const {
      initialLoad,
      showTrackPersonnel,
      loadedTrackPersonnel,
      showMainEditMenu,
      showNewTrackForm,
      numberOfSides,
      letterSides,
      sideLabels,
    } = this.state;
    const indexTracks = numberOfSides
      ? this.makeSectionedTracks()
      : this.makeIndexTracks();

    if (true) {
      return (
        <div className="tracks-index-container">
          {!hideHeader && (
            <div className="resource-show-section-header">
              <h2>Track List</h2>
              {showEditButtons && (
                <button
                  className="big-button"
                  onClick={this.toggleEditSection("showMainEditMenu")}
                >
                  <FontAwesomeIcon icon="edit" />
                  <span>Edit Tracks</span>
                </button>
              )}
            </div>
          )}
          <ul className="tracks-index">
            {/* Add and Edit Menu */}
            {showEditButtons && showMainEditMenu && (
              <>
                <div className="tracks-index-item tracks-index-menu-row">
                  <button
                    className="big-button"
                    onClick={this.toggleEditSection("showNewTrackForm")}
                  >
                    <FontAwesomeIcon icon="plus" />
                    <span>Add Track</span>
                  </button>
                </div>
                {showNewTrackForm && (
                  <div className="tracks-index-item tracks-index-form-row">
                    <TrackListingFormContainer
                      releaseId={resourceId}
                      releaseFormat={releaseFormat}
                      numberOfSides={numberOfSides}
                      letterSides={letterSides}
                    />
                  </div>
                )}
              </>
            )}
            {/* Tracks List Header Row */}
            <div className="tracks-index-item tracks-index-header-row">
              <div className="main-track-details tracks-index-column-titles">
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
                <span className="track-order">{!!trackListing ? "#" : ""}</span>
                <span className="track-title">Title</span>
                <span className="track-duration">Duration</span>
              </div>
            </div>
            {/* Tracks List */}
            {initialLoad ? (
              numberOfSides ? (
                <>
                  {indexTracks.length > 0 &&
                    indexTracks.map((section, index) => {
                      return (
                        <>
                          <li className="tracks-index-item tracks-index-side-row">
                            <span>
                              <img
                                src={plainRecordImage}
                                className={"default-image record-side-icon"}
                              />
                              {letterSides ? "Side " : "Disc "}
                              {sideLabels[index]}
                            </span>
                            <span className="track-duration">
                              {makeFriendlyTime(
                                section.reduce(
                                  (acc, track) => acc + track.duration,
                                  0
                                )
                              )}
                            </span>
                          </li>
                          {section.map((track, index) => {
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
                        </>
                      );
                    })}

                  {!!trackListing && (
                    <li className="tracks-index-item tracks-index-header-row">
                      <div className="main-track-details">
                        <span className="tracks-total-duration">
                          {trackListing.length} track
                          {trackListing.length === 1 ? "" : "s"} — Total
                          Duration:{" "}
                          {makeFriendlyTime(
                            this.makeIndexTracks().reduce(
                              (acc, track) => acc + track.duration,
                              0
                            )
                          )}
                        </span>
                      </div>
                    </li>
                  )}
                </>
              ) : (
                <>
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
                    <li className="tracks-index-item tracks-index-header-row">
                      <div className="main-track-details">
                        <span className="tracks-total-duration">
                          {trackListing.length} track
                          {trackListing.length === 1 ? "" : "s"} — Total
                          Duration:{" "}
                          {makeFriendlyTime(
                            indexTracks.reduce(
                              (acc, track) => acc + track.duration,
                              0
                            )
                          )}
                        </span>
                      </div>
                    </li>
                  )}
                </>
              )
            ) : (
              /* Loading Spinner */
              <>
                <li className="tracks-index-item">
                  <LoadingSpinner />
                </li>
                <li className="tracks-index-item tracks-index-header-row">
                  Loading...
                </li>
              </>
            )}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="tracks-index-container">
          <LoadingSpinner />
        </div>
      );
    }
  }
}
