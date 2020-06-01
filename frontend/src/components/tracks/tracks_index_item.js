import React from "react";
import { makeFriendlyTime } from "../../util/formatting_util";

export default function TracksIndexItem(props) {
  const { title, duration } = props.track;
  return (
    <li className="tracks-index-item">
      <div className="main-track-details">
        {props.ordered && <span className="track-order">{props.order}</span>}
        <span className="track-title">{title}</span>
        <span className="track-duration">{makeFriendlyTime(duration)}</span>
      </div>
    </li>
  );
}
