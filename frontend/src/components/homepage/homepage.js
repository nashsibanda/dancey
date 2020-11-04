import React from "react";
import DiscoverReleasesContainer from "./discover_releases_container";
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
        <DiscoverReleasesContainer />
      </>
    );
  }
}

export default HomePage;
