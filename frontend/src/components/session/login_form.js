import React from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentUser === true) {
      this.props.history.push("/releases");
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`} className={error.name}>
            {error.message}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <button type="submit">Log In</button>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
