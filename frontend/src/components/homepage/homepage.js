import React from "react";
import HeroSection from "./hero_section";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <HeroSection
          openSessionForm={this.props.openSessionForm}
          logoutUser={this.props.logoutUser}
          loggedIn={this.props.loggedIn}
          user={this.props.user}
        />
      </>
    );
  }
}

export default HomePage;
