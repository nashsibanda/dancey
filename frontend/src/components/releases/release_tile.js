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
      <img
        src={mainImage ? mainImage.imageUrl : plainRecordImage}
        alt={
          mainImage
            ? mainImage.description
            : "Default album placeholder image - upload a new one!"
        }
      />
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
