import React, { Component } from "react";
import PersonnelRoleFormSection from "./personnel_role_form_section";

export default class PersonnelRoleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personnel: [],
    };
    this.makeCurrentPersonnelForFormSection = this.makeCurrentPersonnelForFormSection.bind(
      this
    );
    this.updatePersonnelField = this.updatePersonnelField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      personnel: this.props.currentPersonnel,
    });
  }

  makeCurrentPersonnelForFormSection() {
    const sectionPersonnelArray = this.props.currentPersonnel.map(personnel => {
      const { personnelIds } = personnel;
      const personnelDisplay = personnelIds.map(id => {
        return this.props.statePersonnel[id]["name"];
      });
      return Object.assign({}, personnel, { personnelDisplay });
    });
    return sectionPersonnelArray;
  }

  updatePersonnelField(value) {
    this.setState({ personnel: value.length > 0 ? value : null });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resourceId, submitPersonnel, toggleForm } = this.props;
    const newRelease = Object.assign({}, { personnel: this.state.personnel });
    // console.log(newRelease);
    submitPersonnel(resourceId, newRelease);
    toggleForm();
  }

  render() {
    return (
      <form className="personnel-role-form" onSubmit={this.handleSubmit}>
        <div className="submit-section">
          <button type="submit" className="big-button">
            Submit
          </button>
        </div>
        <PersonnelRoleFormSection
          currentPersonnel={this.makeCurrentPersonnelForFormSection()}
          formUpdate={this.updatePersonnelField}
        />
      </form>
    );
  }
}
