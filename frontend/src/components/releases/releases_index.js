import React from "react";
import ReleaseTile from "./release_tile";

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
        {Object.values(this.props.releases).map(release => (
          <ReleaseTile key={release._id} release={release} />
        ))}
      </ul>
    );
  }
}

export default ReleasesIndex;
