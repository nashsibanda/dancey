import React from "react";
import { Link } from "react-router-dom";
import { joinMainArtistLinks } from "../../util/formatting_util";

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
          <Link to={`/api/releases/${_id}`}>{title}</Link>
        </div>
        <div>{mainArtists[0] && joinMainArtistLinks(mainArtists)}</div>
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
