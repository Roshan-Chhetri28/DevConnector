import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import Spinner from '../layout/Spinner'
import { useParams, Link } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading } }) => {
    let param = useParams()
    useEffect(() => {
        getPost(param.id)
    }, [getPost, param.id])
    return (loading || post == null ? <Spinner /> :
        <>
            <Link to='/posts' className='btn'> <i className="fa-solid fa-arrow-left"></i> Back to posts</Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id}/>
            <div className="comments"> {post.comments.map(comment=><CommentItem key={comment._id} comment={comment} postId={post._id}/>)} </div>
        </>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
