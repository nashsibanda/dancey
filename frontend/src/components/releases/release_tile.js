import React from "react";
import { Link } from "react-router-dom";
import { joinObjectLinks } from "../../util/formatting_util";
import plainRecordImage from "../../assets/plain_record.png";

const ReleaseTile = props => {
  const {
    title,
    _id,
    format,
    releaseYear,
    mainArtists,
    releaseCountry,
    images,
  } = props.release;
  const mainImage = images.find(({ mainImage }) => mainImage === true);

  return (
    <li className="release-tile">
      <Link to={`/releases/${_id}`}>
        <img
          src={mainImage ? mainImage.imageUrl : plainRecordImage}
          alt={
            mainImage
              ? mainImage.description
              : "Default album placeholder image - upload a new one!"
          }
        />
      </Link>
      <div className="release-tile-info">
        <div className="release-tile-title">
          <Link to={`/releases/${_id}`}>{title}</Link>
        </div>
        <div className="release-tile-artist">
          {mainArtists[0] && joinObjectLinks(mainArtists)}
        </div>
        <div className="release-tile-details">
          <div className="release-tile-details-format-year">
            <span>{releaseYear}</span>
            <span>{format}</span>
          </div>
          <div className="release-tile-details-country">
            <span>{releaseCountry}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReleaseTile;
