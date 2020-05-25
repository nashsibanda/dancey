import React from "react";
import { withRouter } from "react-router-dom";
import countries from "../../util/validation/countries";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={this.update("email")}
            placeholder="Email"
          />
          <input
            type="text"
            value={username}
            onChange={this.update("username")}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={this.update("password")}
            placeholder="Password"
          />
          <input
            type="password"
            value={confPassword}
            onChange={this.update("confPassword")}
            placeholder="Confirm Password"
          />
          <input
            type="text"
            value={firstName}
            onChange={this.update("firstName")}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={this.update("lastName")}
            placeholder="Last Name"
          />
          <select
            onChange={this.update("location")}
            value={location}
            placeholder="Country"
          >
            <option disabled value="">
              Select a country
            </option>
            {Object.keys(countries).map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
          {this.renderErrors()}
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
