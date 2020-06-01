import React from "react";
import ReleaseTile from "./release_tile";
import { Helmet } from "react-helmet";

class ReleasesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAllReleases();
  }

  render() {
    return (
      <ul className="releases-index">
        <Helmet>
          <title>Releases — dancey</title>
        </Helmet>
        {Object.values(this.props.releases).map(release => (
          <ReleaseTile key={release._id} release={release} />
        ))}
      </ul>
    );
  }
}

export default ReleasesIndex;
