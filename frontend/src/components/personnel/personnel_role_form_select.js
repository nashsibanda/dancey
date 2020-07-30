import React, { Component } from "react";
import PersonnelSearchContainer from "../search/personnel_search_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeRandomId } from "../../util/formatting_util";

export default class PersonnelRoleFormSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: "",
      personnelIds: null,
      personnelDisplay: null,
      showError: false,
      randKey: makeRandomId(),
    };
    this.updateRoleField = this.updateRoleField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.updatePersonnelSelectField = this.updatePersonnelSelectField.bind(
      this
    );
  }

  updatePersonnelSelectField(field, value) {
    let selectedIds, selectedNames;
    if (value) {
      selectedIds = value.map(x => x.value);
      selectedNames = value.map(x => x.label);
    } else {
      selectedIds = null;
      selectedNames = null;
    }
    this.setState({ [field]: selectedIds, personnelDisplay: selectedNames });
  }

  updateRoleField(e) {
    e.preventDefault();
    this.setState({ role: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { role, personnelIds, personnelDisplay } = this.state;
    if (!role || !personnelIds) {
      this.showError();
    } else {
      this.props.addToPersonnel({ role, personnelIds, personnelDisplay });
      this.setState({
        role: "",
        personnelIds: null,
        personnelDisplay: null,
        showError: false,
        randKey: makeRandomId(),
      });
    }
  }

  showError() {
    this.setState({ showError: true }, () => {
      setTimeout(() => {
        this.setState({ showError: false });
      }, 5000);
    });
  }

  render() {
    return (
      <div className="personnel-role-form-select">
        <div>
          <input
            type="text"
            placeholder={
              this.props.labelCatNoForm ? "Catalogue Number..." : "Role..."
            }
            onChange={this.updateRoleField}
            value={this.state.role}
          />
          <PersonnelSearchContainer
            formUpdate={this.updatePersonnelSelectField}
            multiSelect={true}
            fieldName={"personnelIds"}
            placeholderText={
              this.props.labelCatNoForm ? "Label..." : "Search..."
            }
            key={this.state.randKey}
          />
          <button
            type="button"
            className="icon-button"
            onClick={this.handleSubmit}
          >
            <FontAwesomeIcon icon="plus-square" />
          </button>
        </div>
        {this.state.showError && (
          <div>
            <span>
              Make sure you add a role and at least one personnel selection
            </span>
          </div>
        )}
      </div>
    );
  }
}
