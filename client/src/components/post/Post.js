import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import Spinner from '../layout/Spinner'
import { useParams, Link } from 'react-router-dom'

const Post = ({getPost, post: {post, loading}}) => {
    let param = useParams()
    useEffect(()=>{
        getPost(param.id)
    }, [getPost])
  return (
    <div>
      
    </div>
  )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state=>({
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)
