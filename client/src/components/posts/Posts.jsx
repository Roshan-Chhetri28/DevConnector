import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import { getPosts } from '../../actions/post'
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])
    return (
        loading ? <Spinner /> :
            <>
                <h1 className="large tst-primary">Posts</h1>
                <p className="lead">
                    <i className="fas fa-user"></i>welcome to the Community
                </p>
                <PostForm/>
                <div className='posts'>
                    {posts.map((post, index) => (
                        <PostItem key={post._id} post={post} />
                    ))
                    }
                </div>

            </>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts)
