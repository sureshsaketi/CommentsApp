import './index.css'

const CommentItem = props => {
  const {commentsList, updateLikeStatus, onDeleteCommentFromCommentList} = props
  const {id, username, time, comment, initialClassName, isLiked} = commentsList
  const initial = username ? username[0].toUpperCase() : ''

  const onClickLikeButton = () => {
    updateLikeStatus(id)
  }
  const onDeleteComment = () => {
    onDeleteCommentFromCommentList(id)
  }
  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeClassName = isLiked ? 'liked-text-color' : ''
  return (
    <li className="comment">
      <div className="cont-1">
        <div className={initialClassName}>
          <p className="initial-name">{initial}</p>
        </div>
        <button
          type="button"
          className="like-icon-button"
          onClick={onClickLikeButton}
        >
          <img src={likeImage} alt="like" className="like-icon" />
        </button>
      </div>

      <div className="cont-2">
        <div className="username-time-container">
          <p className="username">{username} </p>
          <p className="time">{time} ago</p>
        </div>
        <p className="comment-text">{comment}</p>
        <div className="like-delete-container">
          <p className={`like-text ${likeClassName}`}>Like</p>
          <button
            type="button"
            data-testid="delete"
            className="like-icon-button"
            onClick={onDeleteComment}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}
export default CommentItem
