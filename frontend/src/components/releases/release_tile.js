import React from "react";
import { Link } from "react-router-dom";
import { joinObjectLinks } from "../../util/formatting_util";

const ReleaseTile = props => {
  const {
    title,
    _id,
    format,
    releaseYear,
    mainArtists,
    releaseCountry,
  } = props.release;
  return (
    <li className="release-tile">
      <img src="/assets/plain_record.png" />
      <div className="release-tile-info">
        <div>
          <Link to={`/releases/${_id}`}>{title}</Link>
        </div>
        <div>{mainArtists[0] && joinObjectLinks(mainArtists)}</div>
        <div>
          <span>{releaseYear}</span>
          <span>{format}</span>
          <span>{releaseCountry}</span>
        </div>
      </div>
    </li>
  );
};

export default ReleaseTile;
