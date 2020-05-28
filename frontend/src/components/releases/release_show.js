import React, { Component } from "react";
import { joinObjectLinks } from "../../util/formatting_util";

export default class ReleaseShow extends Component {
  constructor(props) {
    super(props);

    // this.state = {};
    this.loadReleaseData = this.loadReleaseData.bind(this);
  }

  loadReleaseData() {
    const { fetchRelease, releaseId } = this.props;
    fetchRelease(releaseId);
  }

  componentDidMount() {
    this.loadReleaseData();
  }

  render() {
    if (this.props.release) {
      const { release } = this.props;
      const {
        images,
        label,
        mainArtists,
        personnel,
        releaseCountry,
        releaseYear,
        reviews,
        title,
        trackListing,
        format,
      } = release;

      const mainImage = images.find(({ mainImage }) => mainImage === true);
      return (
        <div className="release-show-container">
          <div className="release-main-info">
            <div className="release-image">
              <img
                src={
                  mainImage ? mainImage.imageUrl : "/assets/plain_record.png"
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
          <div className="release-tracklist"></div>
          <div className="release-personnel"></div>
        </div>
      );
    } else {
      return <p>LOADING</p>;
    }
  }
}
