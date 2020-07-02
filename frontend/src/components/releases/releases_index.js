import React from "react";
import ReleaseTile from "./release_tile";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../loading/loading_spinner";

class ReleasesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // initialLoad: false;
    };
  }

  componentDidMount() {
    const { resourceType, resourceId } = this.props;
    this.props.fetchReleases(resourceType, resourceId);
  }

  render() {
    const { mainCatalogue, releases, indexTitle, loading } = this.props;
    return (
      <div className="releases-index-container">
        {!mainCatalogue && (
          <div className="resource-show-section-header">
            <h2>{indexTitle}</h2>
          </div>
        )}
        {mainCatalogue && (
          <Helmet>
            <title>Releases — dancey</title>
          </Helmet>
        )}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ul className="releases-index">
            {Object.values(releases).map(release => (
              <ReleaseTile key={release._id} release={release} />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default ReleasesIndex;
