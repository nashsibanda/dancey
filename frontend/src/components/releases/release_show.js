import React, { Component } from "react";
import TracksIndexContainer from "../tracks/tracks_index_container";
import PersonnelIndexContainer from "../personnel/personnel_index_container";
import CommentsSectionContainer from "../comments/comments_section_container";
import ReviewsIndexContainer from "../reviews/reviews_index_container";
import { Helmet } from "react-helmet";
import { makeReleaseHtmlTitle } from "../../util/formatting_util";
import LoadingSpinner from "../loading/loading_spinner";
import ReleaseMainInfoContainer from "./release_main_info_container";

export default class ReleaseShow extends Component {
  constructor(props) {
    super(props);

    this.state = { showEditButtons: true, initialLoad: false };
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

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading) {
      this.setState({ initialLoad: true });
    }
  }

  toggleEditButtons() {
    this.setState({ showEditButtons: !this.state.showEditButtons });
  }

  render() {
    const { release, loggedIn, updateRelease } = this.props;
    const { showEditButtons, initialLoad } = this.state;
    if (release && initialLoad) {
      const { personnel, trackListing, comments, _id } = release;

      return (
        <div className="resource-show-container">
          <Helmet>
            <title>{makeReleaseHtmlTitle(release)}</title>
          </Helmet>
          <ReleaseMainInfoContainer
            release={release}
            loggedIn={loggedIn}
            resourceId={_id}
            resourceType={"release"}
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
      return (
        <div className="resource-show-container">
          <LoadingSpinner />
        </div>
      );
    }
  }
}
