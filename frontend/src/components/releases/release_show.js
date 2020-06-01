import React, { Component } from "react";
import TracksIndexContainer from "../tracks/tracks_index_container";
import PersonnelIndexContainer from "../personnel/personnel_index_container";
import CommentsSectionContainer from "../comments/comments_section_container";
import ReleaseMainInfo from "./release_main_info";
import ReviewsIndexContainer from "../reviews/reviews_index_container";

export default class ReleaseShow extends Component {
  constructor(props) {
    super(props);

    this.state = { showEditButtons: false };
    this.loadReleaseData = this.loadReleaseData.bind(this);
    this.toggleEditButtons = this.toggleEditButtons.bind(this);
  }

  loadReleaseData() {
    const { fetchRelease, releaseId } = this.props;
    fetchRelease(releaseId);
  }

  componentDidMount() {
    this.loadReleaseData();
  }

  toggleEditButtons() {
    this.setState({ showEditButtons: !this.state.showEditButtons });
  }

  render() {
    const { release, loading, loggedIn, updateRelease } = this.props;
    const { showEditButtons } = this.state;
    if (release && !loading) {
      const { personnel, trackListing, comments, _id } = release;

      return (
        <div className="resource-show-container">
          <ReleaseMainInfo
            release={release}
            loggedIn={loggedIn}
            updateRelease={updateRelease}
            toggleEditButtons={this.toggleEditButtons}
            showEditButtons={showEditButtons}
          />
          <div className="resource-show-body">
            <div className="resource-show-main">
              <div className="release-tracklist">
                <TracksIndexContainer
                  trackListing={trackListing}
                  resourceId={_id}
                  resourceType={"release"}
                  showEditButtons={showEditButtons}
                />
              </div>
              <div className="release-personnel">
                <PersonnelIndexContainer
                  resourcePersonnel={personnel}
                  resourceId={_id}
                  resourceType={"release"}
                  showEditButtons={showEditButtons}
                />
              </div>
              <div className="comments-container">
                <CommentsSectionContainer
                  entityComments={comments}
                  resourceId={_id}
                  resourceType={"release"}
                />
              </div>
            </div>
            <div className="resource-show-aside">
              <div className="reviews-container">
                <ReviewsIndexContainer
                  resourceType={"release"}
                  resourceId={_id}
                  showEditButtons={showEditButtons}
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
