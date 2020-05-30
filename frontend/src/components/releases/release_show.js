import React, { Component } from "react";
import { joinObjectLinks } from "../../util/formatting_util";
import TracksIndexContainer from "../tracks/tracks_index_container";
import PersonnelIndexContainer from "../personnel/personnel_index_container";
import CommentsIndexContainer from "../comments/comments_index_container";

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
    const { release, loading } = this.props;
    if (release && !loading) {
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
        comments,
        _id,
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
          <div className="release-tracklist">
            <h2>Track List</h2>
            <TracksIndexContainer
              releaseTracks={trackListing}
              releaseId={_id}
            />
            <button>Add a track...</button>
          </div>
          <div className="release-personnel">
            <h2>Personnel</h2>
            <PersonnelIndexContainer
              releasePersonnel={personnel}
              releaseId={_id}
            />
          </div>
          <div className="comments-container">
            <h2>Comments</h2>
            <CommentsIndexContainer
              entityComments={comments}
              indentLevel={0}
              resourceId={_id}
              resourceType={"release"}
            />
          </div>
        </div>
      );
    } else {
      return <p>LOADING</p>;
    }
  }
}
