import React, { Component } from "react";
import PersonnelIndexItem from "./personnel_index_item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner from "../loading/loading_spinner";
import PersonnelRoleFormContainer from "./personnel_role_form_container";

export default class PersonnelIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPersonnelRoleForm: false,
      initialLoad: false,
    };
    this.togglePersonnelRoleForm = this.togglePersonnelRoleForm.bind(this);
  }

  componentDidMount() {
    const { fetchResourcePersonnel, resourceType, resourceId } = this.props;
    fetchResourcePersonnel(resourceType, resourceId);
    this.setState({ initialLoad: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resourcePersonnel !== this.props.resourcePersonnel) {
      const { fetchResourcePersonnel, resourceType, resourceId } = this.props;
      fetchResourcePersonnel(resourceType, resourceId);
    }
  }

  togglePersonnelRoleForm() {
    this.setState({ showPersonnelRoleForm: !this.state.showPersonnelRoleForm });
  }

  render() {
    const {
      resourcePersonnel,
      statePersonnel,
      showEditButtons,
      hideHeader,
      loading,
      resourceId,
    } = this.props;
    const { showPersonnelRoleForm, initialLoad } = this.state;

    return (
      <div className="personnel-index-container">
        {!hideHeader && (
          <div className="resource-show-section-header">
            <h2>Personnel</h2>
            {showEditButtons &&
              (showPersonnelRoleForm ? (
                <button
                  className="big-button"
                  onClick={this.togglePersonnelRoleForm}
                >
                  <FontAwesomeIcon icon="edit" />
                  <span>Cancel</span>
                </button>
              ) : (
                <button
                  className="big-button"
                  onClick={this.togglePersonnelRoleForm}
                >
                  <FontAwesomeIcon icon="edit" />
                  <span>Edit Personnel</span>
                </button>
              ))}
          </div>
        )}
        <ul className="personnel-index">
          {loading ? (
            <li className="personnel-index-item">
              <LoadingSpinner />
            </li>
          ) : showPersonnelRoleForm ? (
            <PersonnelRoleFormContainer
              currentPersonnel={resourcePersonnel}
              resourceId={resourceId}
              toggleForm={this.togglePersonnelRoleForm}
            />
          ) : (
            initialLoad &&
            resourcePersonnel.length > 0 &&
            resourcePersonnel.map((rPersonnel, index) => {
              const itemPersonnel = rPersonnel.personnelIds.map(
                id => statePersonnel[id]
              );
              return (
                itemPersonnel[0] && (
                  <PersonnelIndexItem
                    personnel={itemPersonnel}
                    role={rPersonnel.role}
                    key={`${rPersonnel._id}-personnelIndex-${index}`}
                  />
                )
              );
            })
          )}
        </ul>
      </div>
    );
  }
}
