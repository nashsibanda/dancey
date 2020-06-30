import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class StringArraySelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentElement: "",
    };

    this.updateCurrentString = this.updateCurrentString.bind(this);
    this.addString = this.addString.bind(this);
    this.removeString = this.removeString.bind(this);
  }

  updateCurrentString(e) {
    e.preventDefault();
    if (e.currentTarget.value) {
      this.setState({ currentElement: e.currentTarget.value });
    } else {
      this.setState({ currentElement: "" });
    }
  }

  addString(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      let array = this.props.array;
      array.push(this.state.currentElement.trim());
      let uniqArray = [...new Set(array)];
      this.props.updateArray(uniqArray);
      this.setState({ currentElement: "" });
    }
  }

  removeString(e, deletedElement) {
    e.preventDefault();
    let array = this.props.array.filter(element => element !== deletedElement);
    this.props.updateArray(array);
  }

  render() {
    return (
      <div className="string-array-select">
        <input
          type="text"
          onKeyPress={this.addString}
          onChange={this.updateCurrentString}
          value={this.state.currentElement}
        ></input>
        <ul className="string-array-list form-string-array-list">
          {this.props.array.map(element => {
            return (
              <li key={element}>
                <button
                  className="big-button"
                  onClick={e => this.removeString(e, element)}
                >
                  <FontAwesomeIcon icon="times" />
                  <span>{element}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
