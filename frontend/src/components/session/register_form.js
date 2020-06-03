import React from "react";
import { withRouter } from "react-router-dom";
import countries from "../../util/validation/countries";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../loading/loading_spinner";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      confPassword: "",
      firstName: "",
      lastName: "",
      location: "",
    };

    this.update = this.update.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedIn === true) {
      this.props.history.push("/releases");
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      username,
      email,
      firstName,
      lastName,
      location,
      password,
      confPassword,
    } = this.state;
    let user = {
      email,
      username,
      firstName,
      lastName,
      location,
      password,
      confPassword,
    };

    this.props.register(user, this.props.history);
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
    const { loading } = this.props;
    const {
      username,
      email,
      firstName,
      lastName,
      location,
      password,
      confPassword,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="session-form">
        <input
          type="email"
          value={email}
          onChange={this.update("email")}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={username}
          onChange={this.update("username")}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={this.update("password")}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confPassword}
          onChange={this.update("confPassword")}
          placeholder="Confirm Password"
          required
        />
        <input
          type="text"
          value={firstName}
          onChange={this.update("firstName")}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={this.update("lastName")}
          placeholder="Last Name"
          required
        />
        <select
          onChange={this.update("location")}
          value={location}
          placeholder="Country"
        >
          <option disabled value="">
            Country of Residence
          </option>
          {Object.keys(countries).map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button className="big-button" type="submit">
            Register New Account
          </button>
        )}
        {this.renderErrors()}
      </form>
    );
  }
}

export default withRouter(RegisterForm);
