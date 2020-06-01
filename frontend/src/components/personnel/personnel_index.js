import React, { Component } from "react";
import PersonnelIndexItem from "./personnel_index_item";

export default class PersonnelIndex extends Component {
  componentDidMount() {
    const { fetchResourcePersonnel, resourceType, resourceId } = this.props;
    fetchResourcePersonnel(resourceType, resourceId);
  }

  render() {
    const { resourcePersonnel, statePersonnel } = this.props;
    return (
      <ul className="personnel-index">
        {resourcePersonnel.length > 0 &&
          resourcePersonnel.map(rPersonnel => {
            const itemPersonnel = statePersonnel[rPersonnel.personnelId];
            return (
              itemPersonnel && (
                <PersonnelIndexItem
                  personnel={itemPersonnel}
                  role={rPersonnel.role}
                  key={rPersonnel._id}
                />
              )
            );
          })}
      </ul>
    );
  }
}
