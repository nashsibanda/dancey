import React from "react";
import ReleaseTile from "./release_tile";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../loading/loading_spinner";

class ReleasesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoad: false,
      itemsPerPage: this.props.defaultItemsPerPage,
      pageNum: 1,
    };

    this.changePageNumber = this.changePageNumber.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentDidMount() {
    const {
      resourceType,
      resourceId,
      fetchReleases,
      getReleasesCount,
    } = this.props;
    const { pageNum, itemsPerPage } = this.state;
    fetchReleases(pageNum, itemsPerPage, resourceType, resourceId);
    getReleasesCount(resourceType, resourceId);
    this.setState({ initialLoad: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageNum !== this.state.pageNum) {
      this.props.fetchReleases(
        this.state.pageNum,
        this.state.itemsPerPage,
        this.props.resourceType,
        this.props.resourceId
      );
    }
    if (prevState.itemsPerPage !== this.state.itemsPerPage) {
      this.setState({ pageNum: 1 }, () => {
        this.props.fetchReleases(
          this.state.pageNum,
          this.state.itemsPerPage,
          this.props.resourceType,
          this.props.resourceId
        );
      });
    }
  }

  changePageNumber(number) {
    return e => this.setState({ pageNum: parseInt(number) });
  }

  changePageSize(e) {
    this.setState({ itemsPerPage: parseInt(e.target.value) });
  }

  render() {
    const {
      mainCatalogue,
      releases,
      indexTitle,
      loading,
      releasesIndexCount,
    } = this.props;
    const { initialLoad, itemsPerPage, pageNum } = this.state;

    const maxPageNumber = Math.ceil(releasesIndexCount / itemsPerPage);
    const pages = [];

    for (let i = 0; i < maxPageNumber; i++) {
      pages.push(i + 1);
    }

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
        <div className="releases-index-view-options">
          <span className="index-page-size-select">
            <label>
              Items Per Page
              <select
                onChange={this.changePageSize}
                defaultValue={itemsPerPage}
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={60}>60</option>
                <option value={96}>96</option>
                <option value={120}>120</option>
                <option value={240}>240</option>
              </select>
            </label>
          </span>
          <span className="index-page-navigation">
            <button
              className="link-button"
              disabled={pageNum === 1}
              onClick={this.changePageNumber(1)}
            >
              First
            </button>
            <button
              className="link-button"
              disabled={pageNum === 1}
              onClick={this.changePageNumber(pageNum - 1)}
            >
              Prev
            </button>
            <ul className="page-navigation-numbers">
              <button
                className={`link-button ${pageNum === 1 ? "selected" : ""}`}
                onClick={this.changePageNumber(1)}
              >
                1
              </button>
              {pageNum !== 1 && pageNum - 1 > 2 && <span>...</span>}
              {pages.map(
                page =>
                  (page === pageNum ||
                    page - pageNum === 1 ||
                    pageNum - page === 1) &&
                  page !== 1 &&
                  page !== maxPageNumber && (
                    <li key={`page-num-${page}`}>
                      <button
                        className={`link-button ${
                          page === pageNum ? "selected" : ""
                        }`}
                        onClick={this.changePageNumber(page)}
                      >
                        {page}
                      </button>
                    </li>
                  )
              )}
              {pageNum !== maxPageNumber &&
                pageNum + 1 !== maxPageNumber &&
                pageNum + 2 !== maxPageNumber && <span>...</span>}
              {maxPageNumber > 1 && (
                <button
                  className={`link-button ${
                    pageNum === maxPageNumber ? "selected" : ""
                  }`}
                  onClick={this.changePageNumber(maxPageNumber)}
                >
                  {maxPageNumber}
                </button>
              )}
            </ul>
            <button
              className="link-button"
              disabled={pageNum === maxPageNumber}
              onClick={this.changePageNumber(pageNum + 1)}
            >
              Next
            </button>
            <button
              className="link-button"
              disabled={pageNum === maxPageNumber}
              onClick={this.changePageNumber(maxPageNumber)}
            >
              Last
            </button>
          </span>
        </div>
        <div className="releases-index-items">
          {!initialLoad ? (
            <LoadingSpinner />
          ) : (
            <>
              {loading && (
                <div>
                  <LoadingSpinner />
                </div>
              )}
              <ul className="releases-index">
                {Object.values(releases).map(release => (
                  <ReleaseTile key={release._id} release={release} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ReleasesIndex;
