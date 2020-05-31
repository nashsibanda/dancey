import React, { Component } from "react";
import TracksIndexContainer from "../tracks/tracks_index_container";
import PersonnelIndexContainer from "../personnel/personnel_index_container";
import CommentsIndexContainer from "../comments/comments_index_container";
import ReleaseMainInfo from "./release_main_info";
import ReviewsIndexContainer from "../reviews/reviews_index_container";

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
      const { personnel, reviews, trackListing, comments, _id } = release;

      return (
        <div className="resource-show-container">
          <ReleaseMainInfo release={release} />
          <div className="resource-show-body">
            <div className="resource-show-main">
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
                  parentCommentId={null}
                />
              </div>
            </div>
            <div className="resource-show-aside">
              <div className="reviews-container">
                <h2>Reviews</h2>
                <ReviewsIndexContainer
                  entityReviews={reviews}
                  resourceType={"release"}
                  resourceId={_id}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <p>LOADING</p>;
    }
  }
}
