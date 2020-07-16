import React from "react";
import { Link } from "react-router-dom";
import { joinObjectLinks } from "../../util/formatting_util";
import plainRecordImage from "../../assets/plain_record.png";

const ReleaseListItem = props => {
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
    <li className="release-list-item">
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
      <div className="release-list-item-info">
        <div className="release-list-item-title">
          <Link to={`/releases/${_id}`}>{title}</Link>
        </div>
        <div className="release-list-item-details">
          <div className="release-list-item-artist">
            {mainArtists[0] && joinObjectLinks(mainArtists)}
          </div>
          <div className="release-list-item-other-details">
            <div className="release-list-item-details-format-year">
              <span>{releaseYear}</span>
              <span>{format}</span>
            </div>
            <div className="release-list-item-details-country">
              <span>{releaseCountry}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReleaseListItem;
