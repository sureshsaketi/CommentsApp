import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    username: '',
    comment: '',
    commentsList: [],
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  addNewCommentToCommentList = event => {
    event.preventDefault()
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const {username, comment} = this.state
    const newComment = {
      id: uuidv4(),
      username,
      time: formatDistanceToNow(new Date()),
      comment,
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteCommentFromCommentList = commentId => {
    const {commentsList} = this.state
    const filterCommentsList = commentsList.filter(
      eachComment => eachComment.id !== commentId,
    )
    this.setState({commentsList: filterCommentsList})
  }

  render() {
    const {commentsList} = this.state
    const commentsCount = commentsList.length
    const URL =
      'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png'

    return (
      <>
        <div className="bg-container">
          <h1 className="comments-heading">Comments</h1>
          <div className="upper-container">
            <div>
              <div className="image-container">
                <img src={URL} alt="comments" className="comments-image" />
              </div>
              <p className="tech-text">Say something about 4.0 Technologies</p>
              <form
                className="form-container"
                onSubmit={this.addNewCommentToCommentList}
              >
                <input
                  placeholder="Your Name"
                  className="input"
                  onChange={this.onChangeName}
                />
                <textarea
                  rows="6"
                  cols="44"
                  placeholder="Your Comment"
                  className="comment"
                  onChange={this.onChangeComment}
                />
                <button type="submit" className="add-comment-button">
                  Add Comment
                </button>
              </form>
            </div>
            <div className="image-container-1 ">
              <img src={URL} alt="comments" className="comments-image" />
            </div>
          </div>

          <div className="lower-container">
            <div className="comments-count">
              <div className="count">
                <p>{commentsCount}</p>
              </div>
              <p>Comments</p>
            </div>
            <ul>
              {commentsList.map(eachComment => (
                <CommentItem
                  commentsList={eachComment}
                  key={eachComment.id}
                  updateLikeStatus={this.toggleIsLiked}
                  onDeleteCommentFromCommentList={
                    this.onDeleteCommentFromCommentList
                  }
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}
export default Comments
