import React, { Component } from "react";
import LoginFormContainer from "./login_form_container";
import RegisterFormContainer from "./register_form_container";

export default class SessionFormModal extends Component {
  getForm() {
    const { form, warning } = this.props;
    switch (form) {
      case "login":
        return <LoginFormContainer warning={warning} />;
      case "register":
        return <RegisterFormContainer />;
      default:
        return <LoginFormContainer warning={warning} />;
    }
  }

  doNotPropagate(e) {
    e.stopPropagation();
  }

  render() {
    const { show } = this.props;
    return (
      show && (
        <div
          className="session-form-modal"
          onClick={this.props.toggleSessionFormModal}
        >
          <div className="session-form-container" onClick={this.doNotPropagate}>
            {this.getForm()}
          </div>
        </div>
      )
    );
  }
}
