import React from "react";
import LoadingSpinner from "../loading/loading_spinner";
import ReleaseTile from "../releases/release_tile";

class DiscoverReleases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoad: false,
    };
  }

  componentDidMount() {
    const { fetchReleases } = this.props;
    fetchReleases(true, 10);
    this.setState({ initialLoad: true });
  }

  render() {
    const { releases, loading } = this.props;
    const { initialLoad } = this.state;

    return (
      <div className="discover releases-index-container">
        <div className="resource-show-section-header">
          <h2>Discover Releases</h2>
        </div>
        <div className="discover releases-index-items">
          {!initialLoad || loading ? (
            <LoadingSpinner />
          ) : (
            <ul className="releases-tiles-index">
              {Object.values(releases).map(release => (
                <ReleaseTile key={release._id} release={release} />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default DiscoverReleases;
