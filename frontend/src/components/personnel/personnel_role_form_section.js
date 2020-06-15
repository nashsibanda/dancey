import React, { Component } from "react";
import PersonnelRoleFormSelect from "./personnel_role_form_select";
import { makeRandomId, joinObjectLinks } from "../../util/formatting_util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class PersonnelRoleFormSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personnel: {},
      displayPersonnel: {},
    };
    this.addToPersonnel = this.addToPersonnel.bind(this);
    this.removeFromPersonnel = this.removeFromPersonnel.bind(this);
    this.displayPersonnelLinks = this.displayPersonnelLinks.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.personnel !== this.state.personnel) {
      const { personnel } = this.state;
      const personnelArray = Object.values(personnel);
      this.props.formUpdate(personnelArray);
    }
  }

  addToPersonnel(newPersonnel) {
    const randId = makeRandomId();
    const { role, personnelIds, personnelDisplay } = newPersonnel;
    this.setState({
      personnel: Object.assign({}, this.state.personnel, {
        [randId]: { role, personnelIds },
      }),
      displayPersonnel: Object.assign({}, this.state.displayPersonnel, {
        [randId]: { role, personnelDisplay },
      }),
    });
  }

  removeFromPersonnel(id) {
    return e => {
      const lessPersonnel = Object.assign({}, this.state.personnel);
      const lessDisplayPersonnel = Object.assign(
        {},
        this.state.displayPersonnel
      );
      delete lessPersonnel[id];
      delete lessDisplayPersonnel[id];
      this.setState({
        personnel: lessPersonnel,
        displayPersonnel: lessDisplayPersonnel,
      });
    };
  }

  displayPersonnelLinks(key) {
    const { personnel, displayPersonnel } = this.state;
    const objectsForLinks = displayPersonnel[key]["personnelDisplay"].map(
      (x, i) => {
        return {
          _id: personnel[key]["personnelIds"][i],
          name: x,
        };
      }
    );
    return joinObjectLinks(objectsForLinks, true);
  }

  render() {
    const { personnel, displayPersonnel } = this.state;
    const personnelKeys = Object.keys(personnel);
    return (
      <div className="personnel-role-form-section">
        <PersonnelRoleFormSelect addToPersonnel={this.addToPersonnel} />
        <ul className="selected-personnel-list">
          {personnelKeys.length > 0 &&
            personnelKeys.map(key => (
              <li key={key} className="track-form-selected-personnel">
                <button
                  type="button"
                  onClick={this.removeFromPersonnel(key)}
                  className="link-button"
                >
                  <FontAwesomeIcon icon="times" />
                  <span>Remove</span>
                </button>
                <span>{displayPersonnel[key]["role"]}</span>
                <span>{this.displayPersonnelLinks(key)}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
