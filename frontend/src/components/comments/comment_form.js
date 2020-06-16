import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import autosize from "autosize";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
    };
    this.textareaRef = React.createRef();
    this.updateBody = this.updateBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const node = this.textareaRef.current;
    autosize(node);
  }

  updateBody(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      resourceId,
      resourceType,
      parentCommentId,
      createNewComment,
      currentUser,
      hideCommentForm,
    } = this.props;
    const { body } = this.state;
    const commentData = {
      resourceType,
      resourceId,
      body,
      parentCommentId,
      userId: currentUser.id,
      username: currentUser.username,
    };
    createNewComment(commentData);
    hideCommentForm();
  }

  render() {
    const { body } = this.state;
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <textarea
          placeholder="Enter comment text..."
          value={body}
          onChange={this.updateBody}
          ref={this.textareaRef}
          rows="1"
        ></textarea>
        <button className="big-button" type="submit">
          <FontAwesomeIcon icon="save" />
          <span>Save Comment</span>
        </button>
      </form>
    );
  }
}
