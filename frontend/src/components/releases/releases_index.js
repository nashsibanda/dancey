import React from "react";
import ReleaseTile from "./release_tile";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../loading/loading_spinner";
import ReleaseListItem from "./release_list_view_item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ReleasesIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoad: false,
      itemsPerPage: this.props.defaultItemsPerPage,
      pageNum: 1,
      tileView: true,
    };

    this.changePageNumber = this.changePageNumber.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.changeIndexViewFormat = this.changeIndexViewFormat.bind(this);
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

  changeIndexViewFormat(bool) {
    return e => this.setState({ tileView: bool });
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
    const { initialLoad, itemsPerPage, pageNum, tileView } = this.state;

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
          {loading && (
            <div>
              <LoadingSpinner />
            </div>
          )}
          <span className="index-view-format-menu">
            <button
              className={`icon-button ${tileView ? "selected" : ""}`}
              onClick={this.changeIndexViewFormat(true)}
              title={"Tile view"}
            >
              <FontAwesomeIcon icon="th" />
            </button>
            <button
              className={`icon-button ${tileView ? "" : "selected"}`}
              onClick={this.changeIndexViewFormat(false)}
              title={"List view"}
            >
              <FontAwesomeIcon icon="th-list" />
            </button>
          </span>
          <span className="index-page-size-select">
            <label>
              Items Per Page
              <select onChange={this.changePageSize} value={itemsPerPage}>
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
              title={"Go to First Page"}
            >
              First
            </button>
            <button
              className="link-button"
              disabled={pageNum === 1}
              onClick={this.changePageNumber(pageNum - 1)}
              title={"Go to Previous Page"}
            >
              Prev
            </button>
            <ul className="page-navigation-numbers">
              <button
                className={`link-button ${pageNum === 1 ? "selected" : ""}`}
                onClick={this.changePageNumber(1)}
                title={"Go to Page 1"}
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
                        title={`Go to Page ${page}`}
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
                  title={`Go to Page ${maxPageNumber}`}
                >
                  {maxPageNumber}
                </button>
              )}
            </ul>
            <button
              className="link-button"
              disabled={pageNum === maxPageNumber}
              onClick={this.changePageNumber(pageNum + 1)}
              title={"Go to Next Page"}
            >
              Next
            </button>
            <button
              className="link-button"
              disabled={pageNum === maxPageNumber}
              onClick={this.changePageNumber(maxPageNumber)}
              title={"Go to Last Page"}
            >
              Last
            </button>
          </span>
        </div>
        <div className="releases-index-items">
          {!initialLoad ? (
            <LoadingSpinner />
          ) : tileView ? (
            <ul className="releases-tiles-index">
              {Object.values(releases).map(release => (
                <ReleaseTile key={release._id} release={release} />
              ))}
            </ul>
          ) : (
            <ul className="releases-list-index">
              {Object.values(releases).map(release => (
                <ReleaseListItem key={release._id} release={release} />
              ))}
            </ul>
          )}
        </div>
        <div className="releases-index-view-options">
          {loading && (
            <div>
              <LoadingSpinner />
            </div>
          )}
          <span className="index-view-format-menu">
            <button
              className={`icon-button ${tileView ? "selected" : ""}`}
              onClick={this.changeIndexViewFormat(true)}
            >
              <FontAwesomeIcon icon="th" />
            </button>
            <button
              className={`icon-button ${tileView ? "" : "selected"}`}
              onClick={this.changeIndexViewFormat(false)}
            >
              <FontAwesomeIcon icon="th-list" />
            </button>
          </span>
          <span className="index-page-size-select">
            <label>
              Items Per Page
              <select onChange={this.changePageSize} value={itemsPerPage}>
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
      </div>
    );
  }
}

export default ReleasesIndex;
