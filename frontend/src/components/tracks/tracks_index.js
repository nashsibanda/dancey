import React, { Component } from "react";
import TracksIndexItem from "./tracks_index_item";
import { makeFriendlyTime } from "../../util/formatting_util";

export default class TracksIndex extends Component {
  render() {
    const { stateTracks, releaseTracks } = this.props;
    const totalDuration = releaseTracks.reduce(
      (acc, track) => acc + track.trackId.duration,
      0
    );
    return (
      <ul className="tracks-index">
        {releaseTracks.length > 0 &&
          releaseTracks
            .sort((a, b) => a.order - b.order)
            .map(rTrack => {
              const itemTrack = stateTracks[rTrack.trackId._id];
              return (
                itemTrack && (
                  <TracksIndexItem
                    key={itemTrack._id}
                    track={itemTrack}
                    order={rTrack.order}
                  />
                )
              );
            })}
        <li className="tracks-index-item">
          <div className="main-track-details">
            <span className="tracks-total-duration">
              {releaseTracks.length} tracks — Total Duration:{" "}
              {makeFriendlyTime(totalDuration)}
            </span>
          </div>
        </li>
      </ul>
    );
  }
}
