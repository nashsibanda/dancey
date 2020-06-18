import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import autosize from "autosize";
import ReactStars from "react-rating-stars-component";

export default class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: this.props.review ? this.props.review.body : "",
      rating: this.props.review ? this.props.review.rating : 0,
    };
    this.textareaRef = React.createRef();
    this.updateBody = this.updateBody.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const node = this.textareaRef.current;
    autosize(node);
  }

  updateBody(e) {
    this.setState({ body: e.target.value });
  }

  updateRating(value) {
    this.setState({ rating: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { submitReview, hideReviewForm } = this.props;
    submitReview(this.props, this.state);
    if (hideReviewForm) hideReviewForm();
  }

  render() {
    const { body, rating } = this.state;
    return (
      <form className="review-form" onSubmit={this.handleSubmit}>
        <textarea
          placeholder="Enter review text..."
          value={body}
          onChange={this.updateBody}
          ref={this.textareaRef}
          rows="5"
        ></textarea>
        <div className="ratings-section">
          <ReactStars
            value={rating}
            size={18}
            half={false}
            edit={true}
            className={"rating-stars"}
            onChange={this.updateRating}
          />
          <span>{rating === 0 ? "Add a Rating" : `${rating} / 5 Stars`}</span>
        </div>
        <button className="big-button" type="submit">
          <FontAwesomeIcon icon="save" />
          <span>Save Review</span>
        </button>
      </form>
    );
  }
}
