import React from "react";
import { joinObjectLinks } from "../../util/formatting_util";

export default function ReleaseMainInfo(props) {
  const {
    images,
    mainArtists,
    label,
    format,
    releaseCountry,
    releaseYear,
    title,
  } = props.release;
  const mainImage = images.find(({ mainImage }) => mainImage === true);
  return (
    <div className="release-main-info">
      <div className="release-image">
        <img
          src={mainImage ? mainImage.imageUrl : "/assets/plain_record.png"}
          alt={
            mainImage
              ? mainImage.description
              : "Default album placeholder image - upload a new one!"
          }
        />
        <button>More Images</button>
      </div>
      <div className="release-details">
        <h2>
          {joinObjectLinks(mainArtists)} — {title}
        </h2>
        <div>
          <span className="details-label">Label:</span>
          <span className="details-value">{joinObjectLinks(label)}</span>
        </div>
        <div>
          <span className="details-label">Format:</span>
          <span className="details-value">{format}</span>
        </div>
        <div>
          <span className="details-label">Release Country:</span>
          <span className="details-value">{releaseCountry}</span>
        </div>
        <div>
          <span className="details-label">Release Year:</span>
          <span className="details-value">{releaseYear}</span>
        </div>
      </div>
    </div>
  );
}
