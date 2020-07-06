import React, { Component } from "react";
import PersonnelRoleFormSection from "../personnel/personnel_role_form_section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class LabelCatalogueNumberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: [],
      loaded: false,
    };
    this.makeCurrentLabelForFormSection = this.makeCurrentLabelForFormSection.bind(
      this
    );
    this.updateLabelField = this.updateLabelField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const componentLabel = this.props.currentLabel.map(labelObj => {
      return {
        personnelIds: labelObj.labelIds,
        role: labelObj.catalogueNumber,
      };
    });
    this.setState({
      label: componentLabel,
      loaded: true,
    });
  }

  makeCurrentLabelForFormSection() {
    const sectionLabelArray = this.state.label.map(label => {
      const { personnelIds } = label;
      const personnelDisplay = personnelIds.map(id => {
        return this.props.statePersonnel[id]["name"];
      });
      return Object.assign({}, label, { personnelDisplay: personnelDisplay });
    });
    return sectionLabelArray;
  }

  updateLabelField(value) {
    this.setState({ label: value.length > 0 ? value : null });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resourceId, submitLabel, toggleForm } = this.props;
    const newLabel = this.state.label.map(labelObj => {
      return {
        labelIds: labelObj.personnelIds,
        catalogueNumber: labelObj.role,
      };
    });
    const newRelease = Object.assign({}, { label: newLabel });
    submitLabel(resourceId, newRelease);
    toggleForm();
  }

  render() {
    return (
      this.state.loaded && (
        <form
          className="personnel-role-form resource-main-info-form"
          onSubmit={this.handleSubmit}
        >
          <PersonnelRoleFormSection
            currentPersonnel={this.makeCurrentLabelForFormSection()}
            formUpdate={this.updateLabelField}
            labelCatNoForm={true}
          />
          <button className="icon-button" type="submit">
            <FontAwesomeIcon icon="save" />
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={this.props.toggleForm}
          >
            <FontAwesomeIcon icon="undo-alt" />
          </button>
        </form>
      )
    );
  }
}