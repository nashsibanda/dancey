import React from "react";
import { withRouter } from "react-router-dom";
import LoadingSpinner from "../loading/loading_spinner";

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
    const { warning, loading } = this.props;
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="session-form">
        {warning && (
          <h2 className="login-form-warning">
            You must be logged in to do this.
          </h2>
        )}
        <input
          type="email"
          value={email}
          onChange={this.update("email")}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={this.update("password")}
          placeholder="Password"
          required
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button className="big-button" type="submit">
            Log In
          </button>
        )}
        {this.renderErrors()}
      </form>
    );
  }
}

export default withRouter(LoginForm);
