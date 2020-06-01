import React, { Component } from "react";
import TracksIndexItem from "./tracks_index_item";
import { makeFriendlyTime } from "../../util/formatting_util";

export default class TracksIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoad: false,
    };
  }

  componentDidMount() {
    const { fetchResourceTracks, resourceType, resourceId } = this.props;
    fetchResourceTracks(resourceType, resourceId);
    this.setState({ initialLoad: true });
  }

  render() {
    const { stateTracks, loading } = this.props;

    if (this.state.initialLoad && !loading) {
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
        <ul className="tracks-index">
          {indexTracks.length > 0 &&
            indexTracks.map((track, index) => {
              return (
                <TracksIndexItem
                  key={track._id}
                  track={track}
                  ordered={!!trackListing}
                  order={index + 1}
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
      );
    } else {
      return <p>LOADING</p>;
    }
  }
}
