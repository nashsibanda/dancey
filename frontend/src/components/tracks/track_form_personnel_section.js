import React, { Component } from "react";
import TrackFormPersonnelSelect from "./track_form_personnel_select";
import { makeRandomId } from "../../util/formatting_util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class TrackFormPersonnelSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personnel: {},
      displayPersonnel: {},
    };
    this.addToPersonnel = this.addToPersonnel.bind(this);
    this.removeFromPersonnel = this.removeFromPersonnel.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.personnel !== this.state.personnel) {
  //     const { personnel } = this.state;
  //     const personnelArray =
  //       Object.values(personnel).length > 0 ? Object.values(personnel) : null;
  //     this.props.formUpdate(personnelArray);
  //   }
  // }

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
      const { personnel, displayPersonnel } = this.state;
      delete personnel[id];
      delete displayPersonnel[id];
      this.setState({ personnel, displayPersonnel });
    };
  }

  render() {
    const { personnel, displayPersonnel } = this.state;
    const personnelKeys = Object.keys(personnel);
    return (
      <div className="track-form-personnel-section">
        <TrackFormPersonnelSelect addToPersonnel={this.addToPersonnel} />
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
                <span>{displayPersonnel[key]["personnelDisplay"]}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
