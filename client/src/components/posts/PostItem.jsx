import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'
const PostItem = ({ deletePost, addLike, removeLike, post: { _id, text, name, avatar, user, likes, comments, date }, auth,
  showActions = true
}) => {
  const postUserId = typeof user === 'object' && user._id ? user._id : user
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${postUserId}`}>
          <img
            className="round-img"
            src={avatar}
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">
          {text}
        </p>
        <p className="post-date">
          Posted on {moment(date).format('DD/MM/YYYY')}
        </p>
        {
          showActions &&
          <>

            <button type="button" onClick={e => {
              addLike(_id)
            }} className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>{'  '}
              {Array.isArray(likes) && likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button type="button" onClick={e => {
              removeLike(_id)
            }} className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{'  '} {Array.isArray(comments) && comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
            </Link>
            {!auth.loading &&
              auth.user &&
              postUserId === auth.user._id && (
                <button
                  type="button"
                  onClick={() => deletePost(_id)}
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
          </>

        }
      </div>
    </div>
  )
}
PostItem.default = {
  showActions: true
}
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
