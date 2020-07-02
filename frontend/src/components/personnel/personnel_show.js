import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentsSectionContainer from "../comments/comments_section_container";
import ReviewsIndexContainer from "../reviews/reviews_index_container";
import LoadingSpinner from "../loading/loading_spinner";
import PersonnelMainInfoContainer from "./personnel_main_info_container";
import ResourceReleaseIndexContainer from "../releases/resource_release_index_container";

export default class PersonnelShow extends Component {
  constructor(props) {
    super(props);

    this.state = { showEditButtons: false, initialLoad: false };
    this.loadPersonnelData = this.loadPersonnelData.bind(this);
    this.toggleEditButtons = this.toggleEditButtons.bind(this);
  }

  loadPersonnelData() {
    const { fetchPersonnel, personnelId } = this.props;
    fetchPersonnel(personnelId);
  }

  componentDidMount() {
    this.loadPersonnelData();
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
    const { currentPersonnel, loggedIn, updatePersonnel } = this.props;
    const { showEditButtons, initialLoad } = this.state;
    if (currentPersonnel && initialLoad) {
      const { comments, _id } = currentPersonnel;

      return (
        <div className="resource-show-container">
          {loggedIn && (
            <button
              className={
                "big-button toggle-edit-button " +
                (showEditButtons ? "edit-mode-on" : "edit-mode-off")
              }
              onClick={this.toggleEditButtons}
            >
              <FontAwesomeIcon
                icon={showEditButtons ? "toggle-on" : "toggle-off"}
              />
              <span>
                {showEditButtons ? "Edit Mode: On" : "Edit Mode: Off"}
              </span>
            </button>
          )}
          <PersonnelMainInfoContainer
            personnel={currentPersonnel}
            loggedIn={loggedIn}
            resourceId={_id}
            resourceType={"personnel"}
            updatePersonnel={updatePersonnel}
            toggleEditButtons={this.toggleEditButtons}
            showEditButtons={showEditButtons}
          />
          <div className="resource-show-body">
            <div className="resource-show-main">
              <ResourceReleaseIndexContainer
                resourceType={"personnel"}
                resourceId={_id}
                indexTitle={"Discography"}
              />
              <div className="comments-container">
                <CommentsSectionContainer
                  resourceComments={comments}
                  resourceId={_id}
                  resourceType={"personnel"}
                />
              </div>
            </div>
            <div className="resource-show-aside">
              <div className="reviews-container">
                <ReviewsIndexContainer
                  resourceType={"personnel"}
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
