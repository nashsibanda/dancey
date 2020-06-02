import React, { Component } from "react";
import PersonnelIndexItem from "./personnel_index_item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class PersonnelIndex extends Component {
  componentDidMount() {
    const { fetchResourcePersonnel, resourceType, resourceId } = this.props;
    fetchResourcePersonnel(resourceType, resourceId);
  }

  render() {
    const {
      resourcePersonnel,
      statePersonnel,
      showEditButtons,
      hideHeader,
    } = this.props;
    return (
      <div className="personnel-index-container">
        {!hideHeader && (
          <div className="resource-show-section-header">
            <h2>Personnel</h2>
            {showEditButtons && (
              <button className="big-button">
                <FontAwesomeIcon icon="edit" />
                <span>Edit Personnel</span>
              </button>
            )}
          </div>
        )}
        <ul className="personnel-index">
          {resourcePersonnel.length > 0 &&
            resourcePersonnel.map((rPersonnel, index) => {
              const itemPersonnel = statePersonnel[rPersonnel.personnelId];
              return (
                itemPersonnel && (
                  <PersonnelIndexItem
                    personnel={itemPersonnel}
                    role={rPersonnel.role}
                    key={`${rPersonnel._id}-personnelIndex-${index}`}
                  />
                )
              );
            })}
        </ul>
      </div>
    );
  }
}
