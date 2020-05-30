import React, { Component } from "react";
import TracksIndexItem from "./tracks_index_item";

export default class TracksIndex extends Component {
  render() {
    const { stateTracks, releaseTracks } = this.props;
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
      </ul>
    );
  }
}
